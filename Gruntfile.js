module.exports = function(grunt) {

  //build process
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //reset build directory
  grunt.loadNpmTasks('grunt-contrib-clean');
  //task automation
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-autoprefixer');
  //linting
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //might need to add grunt-concurrent to run nodemon and watch simulatneously in one tab
  //Testing
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    //main build process
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      //front-end tests build process
      karma_test: {
        entry: __dirname + '/app/test/karma_tests/test_entry.js',
        output: {
          path: 'app/test/karma_tests/build/',
          file: 'bundle.js'
        }
      }
    },
    //converts sass/scss to css
    sass: {
      dist: {
        files: {
          'app/stylesheet/application.css': 'app/stylesheet/scss/application.scss'
        }
      }
    },
    //copies static files to build directory
    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      },

      css: {
        cwd: 'app/',
        expand: true,
        flatten: true,
        src: 'stylesheet/application.css',
        dest: 'build/',
        filter: 'isFile'

      },
       img: {
        cwd: 'app/',
        expand: true,
        flatten: true,
        src: 'stylesheet/seattle.jpg',
        dest: 'build/',
        filter: 'isFile'

      }
    },
    //resets build directory
    clean: {
      dev: {
        src: ['build/', 'app/test/karma_tests/build/']
      }
    },
    //linting
    jshint: {
      options: {
        node: true
      },
      //linting client side tests
      jasmine: {
        src: ['app/test/karma_tests/*test.js'],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true,
            expect: true
          }
        }
      },
      //linting server side tests
      mocha: {
        src: ['backend/test/tours_routes_test.js'],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        }
      },
      //linting client side
      client: {
        src: ['app/**/!(bundle).js'],
        options: {
          globals: {
            document: true,
            angular: true,
            L: true,
            navigator: true,
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true,
            expect: true,
            alert: true,
            window: true
          }
        }
      },
      //linting server side
      server: {
        src: ['Gruntfile.js', 'server.js', 'backend/models/**/*.js', 'routes/**/*.js']
      }
    },

    //task automation
    watch: {
      js: {
        files: ['app/js/**/*.js'],
        tasks: ['build'],
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['copy:html'],
      },
      css: {
        files: ['app/**/*.scss'],
        tasks: ['sass', 'autoprefixer:sass'],
      }
    },
    //not sure if/how this works. check with Stefan
    nodemon: {
      dev: {
        script: 'server.js',
      }
    },
    concurrent: {
      nodemonWatch: ['nodemon:dev', 'watch'],
    },
    autoprefixer: {
      sass: {
        src: 'app/stylesheet/application.css',
        dest: 'build/application.css'
      }
    },
    //Tests
    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    },

    mochaTest: {
      test: {
        options: {
        },
        src:['backend/test/tours_routes_test.js']
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'sass', 'copy:html', 'autoprefixer:sass', 'copy:img']);
  grunt.registerTask('test:server', ['jshint:mocha', 'jshint:server',
                                     'mochaTest']);
  grunt.registerTask('test:client', ['jshint:client', 'jshint:jasmine',
                                     'webpack:karma_test', 'karma:test']);
  grunt.registerTask('test', ['test:server', 'test:client']);

  grunt.registerTask('build:test', ['webpack:karma_test']);
  grunt.registerTask('build', ['build:dev', 'build:test']);

  grunt.registerTask('linter', ['jshint']);
  grunt.registerTask('serve:dev', [ 'build:dev', 'concurrent:nodemonWatch' ]);
};
