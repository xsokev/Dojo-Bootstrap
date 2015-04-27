/*jshint node:true */
module.exports = function (grunt) {
  var secrets;
  try {
    secrets = grunt.file.readJSON('secrets.json');
  } catch (e) {
    // swallow for travis where environment variables are
    // set in .travis.yml
    secrets = {};
  }
  grunt.initConfig({
    intern: {
      options: {
        runType: 'runner'
      },
      complete: {
        options: {
          config: 'tests/intern'
        }
      },
      fast: {
        options: {
          config: 'tests/intern-watch'
        }
      },
      sauce: {
        options: {
          sauceUsername: secrets.sauceUsername,
          sauceAccessKey: secrets.sauceAccessKey,
          config: 'tests/intern-sauce'
        }
      }
    },
    selenium: {
      options: {
        jar: 'vendor/selenium/selenium-server-standalone-2.45.0.jar',
        port: 4444
      },
      main: {
        // Target-specific file lists and/or options go here.
      },
    },
    watch: {
      dev: {
        files: ['*.js', 'tests/**'],
        tasks: ['intern:fast']
      }
    }
  });

  // Loading using a local git copy
  grunt.loadNpmTasks('intern');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-selenium-simple');

  // Register tasks
  grunt.registerTask('default', ['selenium', 'watch']);
  grunt.registerTask('test', ['selenium', 'intern:complete']);
  grunt.registerTask('travis', ['intern:sauce']);
};
