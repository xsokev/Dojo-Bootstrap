module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        swig: {
            dev: {
                init: {
                    autoescape: true
                },
                dest: ".",
                src: ['src/*.swig'],
                generateSitemap: false,
                generateRobotstxt: false,
                baseUrl: 'http://localhost:8000',
                production: false,
                sitemap_priorities: {
                    '_DEFAULT_': '0.5',
                    'index.html': '0.8',
                    'subpage.html': '0.7'
                },
                modules: ['Affix', 'Alert', 'Button', 'Carousel', 'Collapse', 'DatePicker', 'Dropdown', 'Marquee', 'Modal', 'Popover', 'Scrollspy', 'Tab', 'Tooltip', 'Typeahead']
            },
            prod: {
                init: {
                    autoescape: true
                },
                dest: ".",
                src: ['src/*.swig'],
                generateSitemap: true,
                generateRobotstxt: true,
                baseUrl: 'http://xsokev.github.io/Dojo-Bootstrap',
                production: true,
                ga_account_id: 'UA-5131920-5',
                robots_directive: 'Disallow /',
                sitemap_priorities: {
                    'index.html': '1.0'
                },
                modules: ['Affix', 'Alert', 'Button', 'Carousel', 'Collapse', 'DatePicker', 'Dropdown', 'Marquee', 'Modal', 'Popover', 'Scrollspy', 'Tab', 'Tooltip', 'Typeahead']
            }
        },
        less: {
            dev: {
                files: {
                    "css/styles.css": "src/less/styles.less"
                }
            },
            prod: {
                options: {
                    cleancss: true
                },
                files: {
                    "css/styles.css": "src/less/styles.less"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-swig');

    // Default task(s).
//    grunt.registerTask('default', ['uglify', 'concat']);
    grunt.registerTask('dev', ['swig:dev', 'less:dev']);
    grunt.registerTask('default', ['swig:prod', 'less:prod']);

};