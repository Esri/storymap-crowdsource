var Config = require('./config/');

module.exports = function(grunt) {

  // Add loader for Grunt plugins
  require("matchdep").filterDev(["grunt-*"]).forEach(grunt.loadNpmTasks);

  var configDev = new Config({
    mode: 'dev'
  });
  var configDist = new Config({
    mode: 'dist'
  });

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist/'],
      build: ['build/']
    },

    compass: {
      options: {

      },
      dev: {
        options: {
          importPath: 'node_modules/calcite-web/dist/sass/',
          sassDir: 'src/stylesheets',
          cssDir: 'build/stylesheets'
        }
      },
      dist: {
        options: {
          importPath: 'node_modules/calcite-web/dist/sass/',
          sassDir: 'src/stylesheets',
          cssDir: 'dist/stylesheets',
          outputStyle: 'compressed'
        }
      }
    },

    concurrent: {
      devWatch: ['nodemon:dev','watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    copy: {
      requireDist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/lib/require/index.js'],
          dest: 'dist/javascript/require/',
          rename: function(dest,src){
            return dest + src.replace('index.js','require.js');
          }
        }]
      },
      requireDev: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/lib/require/index.js'],
          dest: 'src/javascript/require/',
          rename: function(dest,src){
            return dest + src.replace('index.js','require.js');
          }
        }]
      },
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
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        },
        script: 'server.js'
      },
      dist: {
        options: {
          env: {
            MODE: 'dist'
          }
        },
        script: 'server.js'
      }
    },

    open: {
      options: {
        delay: 2000
      },
      dev: {
        path: 'http://localhost:' + configDev.server.manifest.connections[0].port
      },
      dist: {
        path: 'http://localhost:' + configDist.server.manifest.connections[0].port
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
      compass: {
        files: ['src/stylesheets/**/*.scss'],
        tasks: ['compass:dev']
      },
      jshint: {
        files: ['src/javascript/**/*.js'],
        tasks: ['jshint']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['.rebooted','resources/','build/stylesheets/**/*','src/javascript/**/*.js']
      }
    }

  });

  // Grunt tasks
  grunt.registerTask('default', [
    'jshint',
    'copy:requireDev',
    'compass:dev',
    'open:dev',
    'concurrent:devWatch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'copy:requireDist',
    'copy:resources',
    'swig:dist',
    'compass:dist',
    'requirejs',
    'open:dist',
    'nodemon:dist'
  ]);

};