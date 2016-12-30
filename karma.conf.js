// Karma configuration
// Generated on Tue Jun 28 2016 17:24:01 GMT+0800 (CST)
import webpackConfig from './webpack.config.babel.test'

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            'test/**/!(jquery).js'
        ],

        // list of files to exclude, 这里exclude之后会彻底不加载,如果把node_module加入,会导致mocha.js加载不上
        exclude: [],

        // karma 插件
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-sinon',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha-reporter'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/!(jquery).js': ['webpack', 'sourcemap']
        },

        // 不显示 `webpack` 打包日志信息
        webpackMiddleware: {
            noInfo: true
        },

        // `webpack` 配置
        webpack: webpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    })
};
