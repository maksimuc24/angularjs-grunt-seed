module.exports = function(grunt) {

            grunt.initConfig({
                        pkg: grunt.file.readJSON("package.json"),

                        jshint: {
                                    files: ['Gruntfile.js', 'specs/*.js'],
                                    options: {
                                                // options here to override JSHint defaults
                                                globals: {
                                                            jQuery: true,
                                                            console: true,
                                                            module: true,
                                                            document: true
                                                }
                                    }

                        },
                        protractor: {
                                    options: {
                                                keepAlive: true,
                                                configFile: "protractor.conf.js"
                                    },
                                    singlerun: {},
                                    auto: {
                                                keepAlive: true,
                                                options: {
                                                            args: {
                                                                        seleniumPort: 4444
                                                            }
                                                }
                                    }
                        },
                        shell: {
                                    options: {
                                                stdout: true
                                    },
                                    protractor_install: {
                                                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
                                    },
                                    npm_install: {
                                                command: 'npm install'
                                    }
                        },

                        meta: {
                                    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
                        },

                        clean: {
                                    dev: {
                                                src: ['dev']
                                    },
                                    dist: {
                                                src: ['dist']
                                    }
                        },

                        concat: {
                                    js: {
                                                src: [
                                                            'vendor/js/angular.js',
                                                            'vendor/js/**/*.js',
                                                            'src/js/**/*.js'
                                                ],
                                                dest: 'dev/app.js',
                                                separator: ";"
                                    },

                                    css: {
                                                src: ['vendor/css/**/*.css', 'src/css/**/*.css'],
                                                dest: 'dev/app.css'
                                    }
                        },

                        cssmin: {
                                    compress: {
                                                files: {
                                                            "dist/app.min.css": "<%= concat.css.dest %>"
                                                }
                                    }
                        },

                        uglify: {
                                    js: {
                                                src: '<%= concat.js.dest %>',
                                                dest: 'dist/app.min.js'
                                    }
                        },

                        watch: {
                                    js: {
                                                files: ["<%= concat.js.src %>"],
                                                tasks: ["concat:js", "ngdocs"],
                                                options: {
                                                            livereload: true
                                                }
                                    },
                                    css: {
                                                files: ["<%= concat.css.src %>"],
                                                tasks: ["concat:css"],
                                                options: {
                                                            livereload: true
                                                }
                                    },
                                    homepage: {
                                                files: ["<%= homepage.template %>"],
                                                tasks: ["homepage:dev"],
                                                options: {
                                                            livereload: true
                                                }
                                    },
                                    copy_dir: {
                                                files: ["src/copy-dir/**/*"],
                                                tasks: ["copyto"],
                                                options: {
                                                            livereload: true
                                                }
                                    }
                        },

                        ngtemplates: {
                                    dev: {
                                                options: {
                                                            base: "src",
                                                            module: "app",
                                                            htmlmin: {
                                                                        collapseBooleanAttributes: true,
                                                                        collapseWhitespace: true,
                                                                        removeAttributeQuotes: true,
                                                                        removeComments: true,
                                                                        removeEmptyAttributes: true,
                                                                        removeRedundantAttributes: true,
                                                                        removeScriptTypeAttributes: true,
                                                                        removeStyleLinkTypeAttributes: true
                                                            },
                                                            url: function(file) {
                                                                        return file.replace('src/', '');
                                                            }
                                                },
                                                src: "src/templates/**/*.html",
                                                dest: "dev/templates.js"
                                    },

                                    dist: {
                                                options: {
                                                            base: "src",
                                                            module: "app",
                                                            htmlmin: {
                                                                        collapseBooleanAttributes: true,
                                                                        collapseWhitespace: true,
                                                                        removeAttributeQuotes: true,
                                                                        removeComments: true,
                                                                        removeEmptyAttributes: true,
                                                                        removeRedundantAttributes: true,
                                                                        removeScriptTypeAttributes: true,
                                                                        removeStyleLinkTypeAttributes: true
                                                            },
                                                            url: function(file) {
                                                                        return file.replace('src/', '');
                                                            }
                                                },
                                                src: "src/templates/**/*.html",
                                                dest: "dist/templates.js"
                                    }
                        },

                        // Configuration to be run (and then tested).
                        copyto: {
                                    dev: {
                                                files: [{
                                                            cwd: 'src/copy-dir/',
                                                            src: ['**/*'],
                                                            dest: 'dev/',
                                                            expand: true
                                                }]
                                    },
                                    dist: {
                                                files: [{
                                                            cwd: 'src/copy-dir/',
                                                            src: ['**/*'],
                                                            dest: 'dist/',
                                                            expand: true
                                                }]
                                    }
                        },

                        homepage: {
                                    template: "src/index.us",
                                    dev: {
                                                dest: "dev/index.html",
                                                context: {
                                                            js: "app.js",
                                                            css: "app.css"
                                                }
                                    },
                                    dist: {
                                                dest: 'dist/index.html',
                                                context: {
                                                            js: 'app.min.js',
                                                            css: 'app.min.css'
                                                }
                                    }
                        },
                        // Configuration to be run (and then tested).
                        tbp_win8encode: {
                                    default_options: {
                                                options: {},
                                                files: {
                                                            'tmp/default_options': ['<%= homepage.dev.dest %>'],
                                                },
                                    }
                        },
                        ngdocs: {
                                    options: {
                                                scripts: ['angular.js', '../src.js'],
                                                html5Mode: false
                                    },
                                    all: ['src/**/**/*.js']
                        },
            });


            grunt.loadNpmTasks('grunt-contrib-clean');
            grunt.loadNpmTasks('grunt-contrib-cssmin');
            grunt.loadNpmTasks('grunt-contrib-concat');
            grunt.loadNpmTasks('grunt-contrib-uglify');
            grunt.loadNpmTasks('grunt-contrib-watch');
            grunt.loadNpmTasks('grunt-angular-templates');
            grunt.loadNpmTasks('grunt-copy-to');
            grunt.loadNpmTasks('grunt-tbp-win8encode');
            grunt.loadNpmTasks('grunt-ngdocs');
            grunt.loadNpmTasks('grunt-protractor-runner');
            grunt.loadNpmTasks('grunt-contrib-jshint');
            grunt.loadNpmTasks('grunt-shell-spawn');


            grunt.loadTasks("tasks");

            // url for Livereload description
            //https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
            grunt.registerTask('dev', ['clean:dev',
                        'concat',
                        'homepage:dev',
                        'ngtemplates:dev',
                        'copyto:dev',
                        'tbp_win8encode',
                        'ngdocs',
                        'jshint',
                        'protractor:singlerun',
                        'watch'

            ]);
            grunt.registerTask('install', ['shell:npm_install', 'shell:protractor_install']);
            grunt.registerTask('dist', ['clean:dist', 'concat', 'uglify', 'cssmin', 'homepage:dist', 'ngtemplates:dist', 'copyto:dist']);

            //run dev or dist Task
            grunt.registerTask('default', 'dev');
};
