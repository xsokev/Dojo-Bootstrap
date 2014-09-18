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
    'selenium-launch': {
      options: {
        port: 4444,
        jarDir: 'vendor/selenium/',
        jar: 'selenium-server-standalone-2.42.2.jar'
        // TODO:
        // jar: 'selenium-server-standalone-2.43.1.jar'
      }
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
  grunt.loadNpmTasks('grunt-se-launch');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['selenium-launch', 'intern:complete']);
};
