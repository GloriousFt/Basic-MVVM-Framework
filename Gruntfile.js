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
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', ['concat']);
    grunt.registerTask('production', ['concat', 'uglify']);
};
