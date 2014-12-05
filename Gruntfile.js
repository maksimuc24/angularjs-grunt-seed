module.exports = function(grunt) {
   
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

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
                tasks: ["concat:js"],
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
                options: {
                },
                files: {
                  'tmp/default_options': ['<%= homepage.dev.dest %>'],
                },
              }
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

    grunt.loadTasks("tasks");
   
   // url for Livereload description
   //https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
    grunt.registerTask('dev', ['clean:dev', 'concat', 'homepage:dev', 'ngtemplates:dev', 'copyto:dev','tbp_win8encode','watch']);
    grunt.registerTask('dist', ['clean:dist', 'concat', 'uglify', 'cssmin', 'homepage:dist','ngtemplates:dist','copyto:dist']);

    //run dev or dist Task
    grunt.registerTask('default', 'dev');
};
