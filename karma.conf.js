/*global module*/

var dbg = process.argv.some(function(x){ return x === '--debug'; });
var reporters = dbg ? ['kjhtml'] : ['progress', 'junit', 'coverage'];
var buildConfig = require('./config/gruntfile-config');

module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: buildConfig.fileLists.vendorScripts
                .concat(buildConfig.fileLists.testFrameworkScripts)
                .concat([
                    'src/app/ztimer.js',
                    'src/app/**/*.js'
                ]),

        // list of files to exclude
        exclude: [
            'src/app/ztimer.config.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/app/**/*.controller.js' : 'coverage',
            'src/app/**/*.service.js' : 'coverage'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,

        // Reporter option for code coverage.
        coverageReporter: {
            dir: buildConfig.paths.coverage,
            reporters: [
              { type: 'html', subdir: 'html' },
              { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
            ]
        },

        // Reporter options for junit test reports
        junitReporter: {
          outputDir: buildConfig.paths.reports,
          outputFile: 'junit.xml',
          useBrowserName: false
        },

        // web server port
        port: 9999,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !dbg
    });
};
