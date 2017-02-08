module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
            },
            dist: {
                src: ['src/*.js', 'src/**/*.js'], //Grunt mini match for your scripts to concatenate
                dest: 'dist/optimus_demo.js' //where to output the script
            }
        },

        uglify: {
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        requirejs: {
            web: {
                options: {
                    findNestedDependencies: true,
                    optimize: 'none',
                    baseUrl: 'src',
                    paths: {
                        // OPTIMUS : 'provider'
                    },
                    include: [
                        'OPTIMUS',
                        '../bower_components/requirejs/require'
                    ],
                    out: 'dist/optimus_dist.js',
                    onModuleBundleComplete: function (data) {
                        var fs = require('fs'),
                            amdclean = require('amdclean'),
                            outputFile = data.path;

                        fs.writeFileSync(outputFile, amdclean.clean({
                            filePath: outputFile,
                            transformAMDChecks: false,
                            globalModules: [
                                'OPTIMUS'
                            ]
                        }));
                    },
                    wrap: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', 'build "optimus" javascripts for development', ['requirejs:web']);
    grunt.registerTask('production', ['concat', 'uglify']);
};
