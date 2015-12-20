'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    sass:{
      compile: {
        files: {
          'public/css/main.css':'public/scss/main.scss',
          'public/css/port.css':'public/scss/port.scss'
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

    express: {
      options: {
        output: 'listening'
      },

      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/'],
        tasks: ['express:dev']
    },

    livereload: {
      files: ['/public'],
      options: {
        livereload: true
      }
    }
  }
  });
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['test', 'watch']);
  grunt.registerTask('server', ['express:dev', 'watch']);
};
