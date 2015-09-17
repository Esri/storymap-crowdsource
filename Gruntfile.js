var Config = require('./config/');

module.exports = function(grunt) {

  // Add loader for Grunt plugins
  require('matchdep').filterDev(['grunt-*']).forEach(grunt.loadNpmTasks);

  var configDev = new Config({
    mode: 'dev'
  });
  var configDist = new Config({
    mode: 'dist'
  });

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserSync: {
      dev: {
        bsFiles: {
          src : ['.rebooted','src/javascript/**/*.js','src/resources/','build/']
        },
        options: {
          proxy: 'localhost:' + configDev.server.manifest.connections[0].port,
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
      dist: ['dist/'],
      build: ['build/']
    },

    concurrent: {
      devWatch: ['nodemon:dev','watch','browserSync:dev'],
      options: {
        logConcurrentOutput: true
      }
    },

    copy: {
      resources: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['resources/**'],
          dest: 'dist/'
        }]
      }
    },

    jshint: {
      files: ['src/javascript/**/*.js','!src/javascript/require/require.js'],
      options: {jshintrc: '.jshintrc'}
    },

    nodemon: {
      dev: {
        options: {
          watch: ['server.js','src/index.swig','./config','./config/require/builds'],
          ext: 'js,swig',
          env: {
            MODE: 'development'
          },
          callback: function(nodemon){
            nodemon.on('restart',function(){
              console.log('restart');
              setTimeout(function() {
                // require('fs').writeFileSync('.rebooted', 'rebooted');
                // require('fs').writeFileSync('build/rebooted.js', 'console.log("rebooted");');
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
        baseUrl: 'src/',
        paths: configDist.require.paths,
        shim: configDist.require.shim
      },
      viewer: {
        options: {
          name: '../config/require/builds/app',
          out: 'dist/javascript/app.js'
        }
      }
    },

    swig: {
      options: {
        data: configDist
      },
      dist: {
        dest: 'dist/index.html',
        src: ['src/index.swig']
      }
    },

    watch: {
      jshint: {
        files: ['src/javascript/**/*.js'],
        tasks: ['jshint']
      }
    }

  });

  // Grunt tasks
  grunt.registerTask('default', [
    'clean:build',
    'jshint',
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