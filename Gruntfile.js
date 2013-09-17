'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['assets/scss/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            livereload: {
                options: { livereload: true },
                files: ['assets/css/style.css', 'assets/js/*.js', '*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // sass and scss
        sass: {
            dist: {
                options: {
                    sourcemap: true,
                    style: 'compressed',
                    precision: '2',
                    compass: true,
                    cache: 'delete/'
                },
                files: {
                    // 'assets/scss/style.scss':'assets/css/style.css',
                    // 'assets/scss/no-mq.scss':'assets/css/no-mq.css'
                    'assets/css/style.css':'assets/scss/style.scss',
                    'assets/css/no-mq.css':'assets/scss/no-mq.scss'
                }
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true,
                ignores: ['assets/js/source/selectivizr.js']
            },
            all: [
                'Gruntfile.js',
                'assets/js/source/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'assets/js/script.js.map',
                    sourceMappingURL: 'script.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/script.min.js': [
                        'assets/js/source/*.js'
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'assets/js/app.js.map',
                    sourceMappingURL: 'app.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/app.min.js': [
                        'assets/js/source/app.js'
                    ]
                }
            },
            app: {
                options: {
                    sourceMap: 'assets/js/ie.js.map',
                    sourceMappingURL: 'ie.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/ie.min.js': [
                        'assets/js/source/selectivizr.js',
                        'assets/js/source/ie.js'
                    ]
                }
            }
        }

    });


    // register task
    grunt.registerTask('default', ['watch']);

};
