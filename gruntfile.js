/*global module, require*/

module.exports = function (grunt) {
    'use strict';

    var dbg = grunt.option('dbg');

    require('load-grunt-tasks')(grunt);

    var gruntConfig = {
        // Output paths
        paths: require('./config/gruntfile-config').paths,

        // Cleanup
        clean: require('./config/gruntfile-clean'),

        // Checks
        jshint: require('./config/gruntfile-jshint'),
        bootlint: require('./config/gruntfile-bootlint'),
        htmlhint: require('./config/gruntfile-htmlhint'),
        sasslint: require('./config/gruntfile-sasslint'),
        yamllint: require('./config/gruntfile-yamllint'),
        karma: require('./config/gruntfile-karma'),

        // Build
        ngtemplates: require('./config/gruntfile-ngtemplates'),
        uglify: require('./config/gruntfile-uglify'),
        sass: require('./config/gruntfile-sass'),
        copy: require('./config/gruntfile-copy'),

        // Release
        release: require('./config/gruntfile-release')
    };

    gruntConfig.uglify.options.sourceMap = dbg;
    gruntConfig.sass.options.sourceMap = dbg;

    grunt.initConfig(gruntConfig);

    grunt.registerTask('check', [
        'jshint',
        'bootlint',
        'htmlhint',
        'sasslint',
        'yamllint',
        'karma'
    ]);

    grunt.registerTask('build', [
        'sass',
        'ngtemplates',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('default', [
        'clean',
        'check',
        'build',
        'clean:temp'
    ]);
};
