/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint quote-props: [2, "as-needed"]*/
/*eslint prefer-arrow-callback: 0*/
var Config = require('./config/');

module.exports = function (grunt) {

  var configDev = new Config({
    mode: 'dev'
  });
  var configDist = new Config({
    mode: 'dist'
  });

  // Add loader for Grunt plugins
  require('matchdep').filterDev([ 'grunt-*' ]).forEach(grunt.loadNpmTasks);
  // Write temp file so grunt does not fail to read
  grunt.file.write('build/app/themes/default.css','DEFAULT_THEME_CSS_APPENDED_HERE');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        sourceMaps: true
      },
      dev: {
        options: {
          modules: 'amd'
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['app/**/*.babel.js','!app/config.babel.js','!app/commonConfig.babel.js','!app/main-config.babel.js'],
          dest: 'build/',
          ext: '.js'
        }]
      },
      devConfig: {
        options: {
          modules: 'ignore'
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['app/config.babel.js','app/commonConfig.babel.js','app/main-config.babel.js'],
          dest: 'build/',
          ext: '.js'
        }]
      }
    },

    browserSync: {
      dist: {
        bsFiles: {
          src: 'dist/'
        },
        options: {
          server: {
            baseDir: './dist'
          },
          port: 4000,
          ui: {
            port: 5000,
            weinre: {
              port: 5050
            }
          }
        }
      }
    },

    clean: {
      dist: [ 'dist/' ],
      build: [ 'build/' ]
    },

    concat: {
      options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
        + '<%= grunt.template.today("yyyy-mm-dd, hh:MM:ss TT") %> - '
        + 'This application is released under the Apache License V2.0 by Esri http://www.esri.com/ - '
        + 'https://github.com/Esri/crowdsource-storytelling-template-js */'
			},
			viewerJS: {
				src: ['dist/app/main-app.min.js'],
				dest: 'dist/app/main-app.min.js'
			},
      viewerCSS: {
				src: ['dist/app/main-app.min.css'],
				dest: 'dist/app/main-app.min.css'
			}
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      devWatch: [ 'nodemon:dev', 'watch' ]
    },

    copy: {
      calciteIcons: {
        files: [ {
          expand: true,
          cwd: 'src/app/themes/',
          src: [ 'calcite-bootstrap/fonts/' ],
          dest: 'dist/app/themes'
        } ]
      },
      resources: {
        files: [ {
          expand: true,
          cwd: 'src/',
          src: [ 'resources/**' ],
          dest: 'dist/'
        } ]
      }
    },

    cssmin: {
      calcite: {
        files: {
          'dist/app/themes/calcite-bootstrap/calcite-bootstrap.min.css': ['src/app/themes/calcite-bootstrap/calcite-bootstrap.css']
        }
      }
    },

    eslint: {
      options: {
          configFile: '.eslintrc'
      },
      target: ['src/app/**/*.js']
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeIgnored: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          watch: [ '*.js', './config/server/**/*.js' ],
          ext: 'js,html',
          env: {
            MODE: 'dev'
          },
          callback: function (nodemon) {

            nodemon.on('restart', function () {

              console.log('restart');
              setTimeout(function () {

                grunt.file.write('.rebooted', 'rebooted');

              }, 1000);

            });

          }
        },
        script: 'server.js'
      },
      dist: {
        options: {
          MODE: 'dist'
        },
        script: 'server.js'
      }
    },

    open: {
      options: {
        delay: 3000
      },
      dev: {
        path: 'http://localhost:' + configDev.server.manifest.connections[ 0 ].port
      },
      dist: {
        path: 'http://localhost:4000'
      }
    },

    'regex-replace': {
      distHtml: {
        src: ['dist/index.html'],
        actions: [
          {
            name: 'Remore htmlmin:ignore tags',
						search: '<!-- htmlmin:ignore -->',
						replace: '',
						flags: 'g'
          }
        ]
      },
      defaultLayout: {
        src: ['build/app/config.js'],
        actions: [
          {
            name: 'Add Scroll CSS Layout String',
						search: 'SCROLL_LAYOUT_CSS_APPENDED_HERE',
						replace: function() {
              return grunt.file.read('build/app/layouts/scroll.css').trim();
            },
						flags: 'g'
          }
        ]
      },
      defaultTheme: {
        src: ['build/app/config.js'],
        actions: [
          {
            name: 'Add Default CSS Theme String',
						search: 'DEFAULT_THEME_CSS_APPENDED_HERE',
						replace: function() {
              return grunt.file.read('build/app/themes/default.css').trim();
            },
						flags: 'g'
          }
        ]
      },
      i18nAlias: {
        src: ['dist/app/main-config.min.js'],
        actions: [
          {
            name: 'Remove i18n Alias',
						search: 'i18n:"dojo/i18n"',
						replace: '',
						flags: 'g'
          }
        ]
      },
      i18nPlugin: {
        src: ['dist/**/*.js'],
        actions: [
          {
            name: 'Replace i18n! with dojo/i18n!',
						search: 'i18n!',
						replace: 'dojo/i18n!',
						flags: 'g'
          }
        ]
      }
    },

    requirejs: {
      options: {
        baseUrl: 'src/',
        paths: {
          /* Ignore modules of the following packages */
          dojo: 'empty:',
          esri: 'empty:',
          dijit: 'empty:',
          dojox: 'empty:',
          translations: 'empty:',
          babel: '../build/app',
          lib: 'lib',
          jquery: 'lib/jquery/dist/jquery',
          velocity: 'lib/velocity/velocity',
          react: 'lib/react/build/react-with-addons',
          reactDom: 'lib/react/build/react-dom',
          // AMD Plugins
          i18n: 'lib/i18n/i18n'
        },
        inlineText: true,
				separateCSS: true
      },
      viewerJS: {
        options: {
          name: '../config/requireBuilds/viewerJS',
          out: 'dist/app/main-app.min.js'
        }
      }
    },

    sass: {
      options: {
        includePaths: ['src/app/components','src/lib/bourbon/app/assets/stylesheets']
      },
      dev: {
        files: {
          'build/app/components/crowdsource/CrowdsourceApp.css': 'src/app/components/crowdsource/CrowdsourceApp.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          'dist/app/main-app.min.css': 'src/app/components/crowdsource/CrowdsourceApp.scss'
        }
      },
      layouts: {
        options: {
          includePaths: ['src/app/components','src/lib/bourbon/app/assets/stylesheets'],
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          'build/app/layouts/scroll.css': 'src/app/components/crowdsource/styles/layouts/scroll/Scroll.scss'
        }
      },
      themes: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: [ {
          expand: true,
          cwd: 'src/',
          src: [ 'app/themes/**/*.scss' ],
          dest: 'build/',
          ext: '.css'
        } ]
      }
    },

    swig: {
      dev: {
        options: {
          data: configDev
        },
        dest: 'build/index.html',
        src: [ 'src/index.swig' ]
      },
      dist: {
        options: {
          data: configDist
        },
        dest: 'dist/index.html',
        src: [ 'src/index.swig' ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
        + '<%= grunt.template.today("yyyy-mm-dd, hh:MM:ss TT") %> - '
        + 'This application is released under the Apache License V2.0 by Esri http://www.esri.com/ - '
        + 'https://github.com/Esri/crowdsource-storytelling-template-js */',
        mangle: {
          except: ['define','require']
        }
      },
      distConfig: {
        files: [{
          'dist/app/config.min.js': ['build/app/config.js'],
          'dist/app/commonConfig.min.js': ['build/app/commonConfig.js'],
          'dist/app/main-config.min.js': ['build/app/main-config.js']
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      babel: {
        files: [ 'src/app/**/*.babel.js' ],
        tasks: [ 'babel','sass:themes','sass:layouts','regex-replace:defaultLayout','regex-replace:defaultTheme' ]
      },
      eslint: {
        files: [ 'src/app/**/*.js' ],
        tasks: [ 'eslint' ]
      },
      sass: {
        files: [ 'src/app/components/**/*.scss','!src/app/components/crowdsource/styles/layouts/**/*.scss' ],
        tasks: [ 'sass:dev' ]
      },
      layouts: {
        files: ['src/app/components/crowdsource/styles/layouts/**/*.scss'],
        tasks: [ 'babel','sass:layouts','sass:themes','regex-replace:defaultLayout','regex-replace:defaultTheme' ]
      },
      themes: {
        files: [ 'src/app/themes/**/*.scss' ],
        tasks: [ 'babel','sass:themes','sass:layouts','regex-replace:defaultTheme','regex-replace:defaultLayout' ]
      },
      swig: {
        files: [ 'src/*.swig' ],
        tasks: [ 'swig:dev' ]
      },
      otherFiles: {
        files: ['.rebooted', 'src/app/**/*.html']
      }
    }

  });

  // Grunt tasks
  grunt.registerTask('default', [
    'eslint',
    'clean:build',
    'swig:dev',
    'babel',
    'sass:themes',
    'sass:layouts',
    'regex-replace:defaultTheme',
    'regex-replace:defaultLayout',
    'sass:dev',
    'open:dev',
    'concurrent:devWatch'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'clean:dist',
    'copy:calciteIcons',
    'copy:resources',
    'cssmin:calcite',
    'swig:dist',
    'htmlmin:dist',
    'regex-replace:distHtml',
    'sass:dist',
    'babel',
    'sass:themes',
    'sass:layouts',
    'regex-replace:defaultTheme',
    'regex-replace:defaultLayout',
    'requirejs',
    'uglify',
    'concat:viewerJS',
    'concat:viewerCSS',
    'regex-replace:i18nAlias',
    'regex-replace:i18nPlugin'
  ]);

  grunt.registerTask('test', [
    'build',
    'browserSync:dist'
  ]);

};
