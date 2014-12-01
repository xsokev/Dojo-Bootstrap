/*jshint node:true */
module.exports = function (grunt) {
  grunt.initConfig({
    intern: {
      complete: {
        options: {
          config: 'tests/intern',
          runType: 'runner'
        }
      },
      fast: {
        options: {
          config: 'tests/intern-watch',
          runType: 'runner'
        }
      }
    },
    selenium: {
      options: {
        jar: 'vendor/selenium/selenium-server-standalone-2.44.0.jar',
        port: 4444
      },
      main: {
        // Target-specific file lists and/or options go here.
      },
    },
    watch: {
      dev: {
        files: ['*.js', 'tests/**'],
        tasks: ['selenium-launch', 'intern:fast']
      }
    }
  });

  // Loading using a local git copy
  grunt.loadNpmTasks('intern');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-selenium-simple');

  // Register tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['selenium', 'intern:complete']);
};
