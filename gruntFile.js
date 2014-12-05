"use strict";

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    sass:{
      compile: {
        files: {
          'public/css/main.css':'public/scss/main.scss'
        }
      }
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'public/',
        src: ['**/*.html', 'css/**/*.css'],
        expand: true,
        dest: 'build'
      }
    },

    browserify: {
      dev: {
        require : { jquery : 'jquery-browserify' },
        src: ['public/js**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*test.js'],
        dest: 'test/test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    jshint: {
      all: ['public/js**/*.js'],
      options: {
        jshintrc: true
      }
    },

    watch: {
      sass: {
        files: {'public/css/main.css':'public/scss/main.scss'},
        tasks: ['sass:dev']
      },
      express: {
        files:  [ 'server.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      },
      app: {
        files: [ 'public/js**/*.js' ],
        tasks: [ 'browserify:dev' ]
      },
      test: {
        files: [ 'public/js**/*.js', 'test/front-end/**/*.js'],
        tasks: [ 'build:dev', 'browserify:frontEndTest', 'karma:unit']
      }
    }

  });
  grunt.registerTask('build:dev', ['sass', 'clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['test', 'watch']);
};
