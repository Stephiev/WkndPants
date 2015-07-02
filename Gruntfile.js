module.exports = function(grunt) {

  //task automation
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-autoprefixer');
  //linting
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //might need to add grunt-concurrent to run nodemon and watch simulatneously in one tab
  //Testing
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({

    //linting
    jshint: {
      options: {
        node: true
      },

      //linting server side tests
      mocha: {
        src: ['backend/test/pants_routes_test.js'],
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
    mochaTest: {
      test: {
        options: {
        },
        src:['backend/test/pants_routes_test.js']
      }
    }
  });

  grunt.registerTask('test', ['jshint:mocha', 'jshint:server', 'mochaTest']);
  grunt.registerTask('linter', ['jshint']);
  grunt.registerTask('serve:dev', [ 'concurrent:nodemonWatch' ]);
};
