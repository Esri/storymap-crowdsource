/*eslint-env node*/
/*eslint no-console: 0*/
/*eslint quote-props: [2, "as-needed"]*/
/*eslint prefer-arrow-callback: 0*/
var Path = require('path');
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
  grunt.file.write('build/app/themes/stacked/default.css','DEFAULT_THEME_CSS_APPENDED_HERE');

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
          https: {
            key: './config/server/dev_ssl/key.pem',
            cert: './config/server/dev_ssl/cert.pem'
          },
          port: 8000,
          ui: {
            port: 9000,
            weinre: {
              port: 9090
            }
          }
        }
      }
    },

    clean: {
      dist: [ 'dist/' ],
      build: [ 'build/' ],
      fontsSrc: ['src/resources/fonts/google/'],
      fontsDist: ['dist/resources/fonts/google/css']
    },

    concat: {
      options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
        + '<%= grunt.template.today("yyyy-mm-dd, hh:MM:ss TT") %> - '
        + 'This application is released under the Apache License V2.0 by Esri http://www.esri.com/ - '
        + 'https://github.com/Esri/crowdsource-storytelling-template-js */'
			},
      config: {
        src: ['build/app/config.js'],
        dest: 'dist/app/config.js'
      },
      builderJS: {
				src: ['dist/app/main-app-builder.min.js'],
				dest: 'dist/app/main-app-builder.min.js'
			},
			viewerJS: {
				src: ['dist/app/main-app.min.js'],
				dest: 'dist/app/main-app.min.js'
			},
      viewerCSS: {
        files: [ {
          expand: true,
          cwd: 'dist/',
          src: [ 'app/*.min.css' ],
          dest: 'dist/'
        } ]
			}
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      devWatch: [ 'nodemon:dev', 'watch' ]
    },

    copy: {
      resources: {
        files: [ {
          expand: true,
          cwd: 'src/',
          src: [ 'resources/**' ],
          dest: 'dist/'
        } ]
      },
      oauthCallback: {
        files: {
          'dist/oauth-callback.html': 'src/oauth-callback.html'
        }
      }
    },

    eslint: {
      options: {
          configFile: '.eslintrc'
      },
      target: ['src/app/**/*.js']
    },

    googlefonts: configDev.fonts.getGoogleFontsConfig(),

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
        script: 'config/server/server.js'
      }
    },

    open: {
      options: {
        delay: 3000
      },
      dev: {
        path: 'https://localhost:4000'
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
      defaultFonts: {
        src: ['build/app/store/reducers/app/layout/Layout.js'],
        actions: [
          {
            name: 'Add Font CSS to default config',
						search: 'DEFAULT_FONT_CSS_APPENDED_HERE',
						replace: function() {
              return grunt.file.read('build/resources/fonts/google/css/Font.css').trim();
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
      },
      stylesheetQuotes: {
        src: ['build/**/*.css'],
        actions: [
          {
            name: 'Replace double quotes with single quotes',
						search: '\"',
						replace: '\'',
						flags: 'g'
          }
        ]
      }
    },

    requirejs: {
      options: {
        baseUrl: 'src/',
        paths: {
          // Ignore modules of the following packages
          dojo: 'empty:',
          esri: 'empty:',
          dijit: 'empty:',
          dojox: 'empty:',
          translations: 'empty:',
          // Package
          babel: '../build/app',
          lib: 'lib',
          jquery: 'lib/jquery/dist/jquery.min',
          velocity: 'lib/velocity/velocity.min',
          react: 'lib/react/react-with-addons.min',
          reactDom: 'lib/react/react-dom.min',
          reactRedux: 'lib/react-redux/index',
          redux: 'lib/redux/index',
          bootstrap: 'lib/bootstrap-sass/assets/javascripts/bootstrap',
          EventEmitter: 'lib/eventEmitter/EventEmitter.min',
          clipboard: 'lib/clipboard/dist/clipboard.min',
          Autolinker: 'lib/Autolinker.js/dist/Autolinker.min',
          autosize: 'lib/autosize/dist/autosize.min',
          // AMD Plugins
          mode: '../build/app/utils/amd/plugins/AppMode',
          i18n: 'lib/i18n/i18n'
        },
        inlineText: true,
				separateCSS: true,
				preserveLicenseComments: false
      },
      viewerJS: {
        options: {
          name: '../config/requireBuilds/main-app',
          out: 'dist/app/main-app.min.js'
        }
      },
      builderJS: {
        options: {
          config: {
            mode: 'isBuilder'
          },
          name: '../config/requireBuilds/main-app',
          out: 'dist/app/main-app-builder.min.js'
        }
      }
    },

    sass: {
      options: {
        includePaths: ['src/app/components/',
        'src/lib/bourbon/app/assets/stylesheets/',
        'src/lib/calcite-bootstrap/sass/',
        'src/lib/bootstrap-sass/assets/stylesheets/',
        'src/lib/']
      },
      dev: {
        files: {
          'build/app/components/crowdsource/viewer/CrowdsourceApp.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp.scss',
          'build/app/components/crowdsource/builder/CrowdsourceApp-builder.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder.scss',
          'build/app/components/crowdsource/viewer/CrowdsourceApp-calcite.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp-calcite.scss',
          'build/app/components/crowdsource/builder/CrowdsourceApp-builder-calcite.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder-calcite.scss',
          'build/app/components/crowdsource/viewer/CrowdsourceApp-bootstrap.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp-bootstrap.scss',
          'build/app/components/crowdsource/builder/CrowdsourceApp-builder-bootstrap.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder-bootstrap.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          'dist/app/main-app.min.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp.scss',
          'dist/app/main-app-builder.min.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder.scss',
          'dist/app/main-app-calcite.min.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp-calcite.scss',
          'dist/app/main-app-builder-calcite.min.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder-calcite.scss',
          'dist/app/main-app-bootstrap.min.css': 'src/app/components/crowdsource/viewer/CrowdsourceApp-bootstrap.scss',
          'dist/app/main-app-builder-bootstrap.min.css': 'src/app/components/crowdsource/builder/CrowdsourceApp-builder-bootstrap.scss'
        }
      },
      fonts: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        files: {
          'build/resources/fonts/google/css/Font.css': 'src/resources/fonts/google/css/Fonts.scss'
        }
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
          'dist/app/commonConfig.min.js': ['build/app/commonConfig.js'],
          'dist/app/main-config.min.js': ['build/app/main-config.js']
        }]
      }
    },

    watch: {
      options: {
        livereload: {
          port: 8888,
          key: grunt.file.read('config/server/dev_ssl/key.pem'),
          cert: grunt.file.read('config/server/dev_ssl/cert.pem')
        }
      },
      babel: {
        files: [ 'src/app/**/*.babel.js' ],
        tasks: ['babelAndAppend']
      },
      eslint: {
        files: [ 'src/app/**/*.js' ],
        tasks: [ 'eslint' ]
      },
      sass: {
        files: [ 'src/app/components/**/*.scss' ],
        tasks: [ 'sass:dev' ]
      },
      fonts: {
        files: ['src/resources/fonts/google/**/*.scss'],
        tasks: ['babelAndAppend']
      },
      swig: {
        files: [ 'src/*.swig' ],
        tasks: [ 'swig:dev' ]
      },
      otherFiles: {
        files: ['.rebooted', 'src/app/**/*.html']
      }
    },

    concatFontStyle: {
      files: [ 'src/resources/fonts/google/css/*.scss' ]
    }

  });

  grunt.registerMultiTask('concatFontStyle','Add default styles to google font stylesheets',function(){
    var files = this.filesSrc;
    var fontImportFile = false;
    var importString = '';

    files.map(function(file) {
      var name = Path.basename(file,'.scss');
      var newFileName = Path.join(Path.dirname(file),'_' + Path.basename(file));

      if (!fontImportFile) {
        fontImportFile = Path.join(Path.dirname(file),'Fonts.scss');
      }
      importString = importString + '\n@import "' + name + '";';

      var styles = grunt.file.read(file).trim() + '\n\n'  + configDev.fonts.getFontSassString(name).trim();

      grunt.file.delete(file);
      grunt.file.write(newFileName,styles);
    });
    grunt.file.write(fontImportFile,importString);
  });

  // Grunt tasks
  grunt.registerTask('default', [
    'eslint',
    'clean:build',
    'clean:fontsSrc',
    'googlefonts',
    'concatFontStyle',
    'swig:dev',
    'babelAndAppend',
    'sass:dev',
    'open:dev',
    'concurrent:devWatch'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'clean:dist',
    'clean:fontsSrc',
    'googlefonts',
    'concatFontStyle',
    'copy:resources',
    'copy:oauthCallback',
    'swig:dist',
    'htmlmin:dist',
    'regex-replace:distHtml',
    'sass:dist',
    'babelAndAppend',
    'requirejs',
    'uglify',
    'concat',
    'clean:fontsDist',
    'regex-replace:i18nAlias',
    'regex-replace:i18nPlugin'
  ]);

  grunt.registerTask('test', [
    'build',
    'browserSync:dist'
  ]);

  grunt.registerTask('babelAndAppend', [
    'babel',
    'sass:fonts',
    'regex-replace:stylesheetQuotes',
    'regex-replace:defaultFonts'
  ]);
};
