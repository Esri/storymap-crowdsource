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

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserSync: {
      dev: {
        bsFiles: {
          src : [ 'src/*.html','src/app/**/*.js','src/resources/','build/' ]
        },
        options: {
          proxy: 'localhost:' + configDev.server.manifest.connections[ 0 ].port,
          port: 4000,
          ui: {
            port: 5000,
            weinre: {
              port: 5050
            }
          },
          open: false
        }
      },
      dist: {
        bsFiles: {
          src : 'dist/'
        },
        options: {
          server: {
            baseDir: './dist'
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
      build: [ 'build/' ]
    },

    concurrent: {
      devWatch: [ 'nodemon:dev','watch','browserSync:dev' ],
      options: {
        logConcurrentOutput: true
      }
    },

    copy: {
      resources: {
        files: [ {
          expand: true,
          cwd: 'src/',
          src: [ 'resources/**' ],
          dest: 'dist/'
        } ]
      }
    },

    jshint: {
      files: [ 'src/app/**/*.js' ],
      options: {jshintrc: '.jshintrc'}
    },

    nodemon: {
      dev: {
        options: {
          watch: [ '*.js','./config/server/**/*.js' ],
          ext: 'js,html',
          env: {
            MODE: 'dev'
          },
          callback: function (nodemon) {

            nodemon.on('restart',function () {

              console.log('restart');
              setTimeout(function () {

                require('fs').writeFileSync('.rebooted', 'rebooted');

              }, 1000);

            });

          }
        },
        script: 'server.js'
      }
    },

    open: {
      options: {
        delay: 3000
      },
      dev: {
        path: 'http://localhost:4000'
      }
    },

    requirejs: {
      options: {
        baseUrl: 'src/'
      },
      viewer: {
        options: {
          name: '../config/require/builds/app',
          out: 'dist/javascript/app.min.js'
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

    watch: {
      swig: {
        files: [ 'src/*.swig' ],
        tasks: [ 'swig:dev' ]
      },
      jshint: {
        files: [ 'src/app/**/*.js' ],
        tasks: [ 'jshint' ]
      }
    }

  });

  // Grunt tasks
  grunt.registerTask('default', [
    'clean:build',
    'jshint',
    'swig:dev',
    'open:dev',
    'concurrent:devWatch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'copy:resources',
    'swig:dist',
    'requirejs',
    'browserSync:dist'
  ]);

};
