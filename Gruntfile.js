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

    clean: {
      dist: [ 'dist/' ],
      build: [ 'build/' ]
    },

    concurrent: {
      devWatch: [ 'nodemon:dev','watch' ],
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
        path: 'http://localhost:' + configDev.server.manifest.connections[ 0 ].port
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

    sass: {
      dev: {
        files: {
          'build/app/storymaps/Core.css': 'src/app/storymaps/Core.scss'
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
      options: {
        livereload: true,
      },
      swig: {
        files: [ 'src/*.swig' ],
        tasks: [ 'swig:dev' ]
      },
      sass: {
        files: [ 'src/app/**/*.scss' ],
        tasks: [ 'sass:dev' ]
      },
      jshint: {
        files: [ 'src/app/**/*.js' ],
        tasks: [ 'jshint' ]
      },
      otherFiles: {
        files: ['.rebooted']
      }
    }

  });

  // Grunt tasks
  grunt.registerTask('default', [
    'clean:build',
    'jshint',
    'swig:dev',
    'sass:dev',
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
