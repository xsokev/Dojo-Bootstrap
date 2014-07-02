/*jshint node:true */
module.exports = function (grunt) {
  grunt.initConfig({
    intern: {
      runner: {
        options: {
          config: 'tests/intern',
          runType: 'runner'
        }
      }
    },
    'selenium-launch': {
      options: {
        port: 4444,
        jarDir: 'vendor/selenium/',
        jar: 'selenium-server-standalone-2.42.2.jar'
      }
    }
  });

  // Loading using a local git copy
  grunt.loadNpmTasks('intern');
  grunt.loadNpmTasks('grunt-se-launch');

  // Register a test task
  grunt.registerTask('test', ['selenium-launch', 'intern:runner']);

  // By default we just test
  grunt.registerTask('default', ['test']);
};
