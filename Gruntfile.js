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
                baseUrl: '',
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
        },
				htmlmin: {
					dist: {
						options: {
							removeComments: true,
							collapseWhitespace: true
						},
						files: {
							'./index.html': './index.html',
							'./affix.html': './affix.html',
							'./alert.html': './alert.html',
							'./button.html': './button.html',
							'./carousel.html': './carousel.html',
							'./collapse.html': './collapse.html',
							'./datepicker.html': './datepicker.html',
							'./dropdown.html': './dropdown.html',
							'./marquee.html': './marquee.html',
							'./modal.html': './modal.html',
							'./popover.html': './popover.html',
							'./scrollspy.html': './scrollspy.html',
							'./tab.html': './tab.html',
							'./tooltip.html': './tooltip.html',
							'./typeahead.html': './typeahead.html',
						}
					}
				}
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-swig');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
//    grunt.registerTask('default', ['uglify', 'concat']);
    grunt.registerTask('min', ['htmlmin:dist']);
    grunt.registerTask('css', ['less:dev']);
    grunt.registerTask('html', ['swig:dev']);
    grunt.registerTask('dev', ['swig:dev', 'less:dev']);
    grunt.registerTask('default', ['swig:prod', 'less:prod', 'htmlmin:dist']);

};