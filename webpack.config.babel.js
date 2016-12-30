/**
 * webpack 配置文件
 * todo: chunk 配置
 */
import path from "path";
import fs from "fs";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin';
import extend from './extend';
import webpackMd5Hash from 'webpack-md5-hash';

const DEBUG = !process.argv.includes('--release');
const TOSERVER = process.argv.includes('--toserver');
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};

const AUTOPREFIXER_BROWSERS = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

let serverUrl = TOSERVER ? 'http://a/b/c/' : '';//cdn等静态服务器地址

let htmlConf = { //根据模板插入css/js等生成最终HTML
    filename: '', //生成的html存放路径，相对于path
    template: '', //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: [],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
    }
};

let entryConf = [
    ...(DEBUG ? [
        "webpack-dev-server/client?http://localhost:8080", //代码热替换
        "webpack/hot/dev-server", //代码热替换
    ] : [])
];

let pageBase = "./pages";
let componentBase = 'app/component';

/**
 * html生成配置
 * @type {Array}
 */
let htmlConfs = [];

/**
 * 入口文件配置, pages/a/b.html 对应的入口是 a_b
 * @type {Array}
 */
let entrys = [];

let pages = fs.readdirSync(path.resolve(__dirname, pageBase));

// pages.forEach(page=> {
//     let htmlPage = fs.readdirSync(path.join(__dirname, pageBase, './' + page));
//     htmlPage.forEach(html=> {
//         let entryName = page + '_' + html.replace(path.extname(html), '');
//         htmlConfs.push(new HtmlWebpackPlugin(extend({}, htmlConf, {
//             filename: './' + page + '/' + html,
//             template: pageBase + '/' + page + '/' + html, //html模板路径
//             chunks: ['vendor', entryName]
//         })));
//         entrys[entryName] = entryConf.concat(componentBase + '/' + page + '/' + html.replace(path.extname(html), ''));
//     })
// });

pages.forEach(html=> {
        let entryName = html.replace(path.extname(html), '');
        htmlConfs.push(new HtmlWebpackPlugin(extend({}, htmlConf, {
            filename: './' + html,
            template: pageBase + '/' + html, //html模板路径
            chunks: ['vendor', entryName]
        })));
        entrys[entryName] = entryConf.concat('apps/' + html.replace(path.extname(html), '') + '/main.js');
});

export default {
    /**
     * 页面逻辑入口配置
     * 同一个模块, 可以使用两个入口
     */
    entry: extend({
        /**
         * 公共模块
         */
        vendor: ['babel-polyfill']  //es6补丁
    }, entrys, {

        //其他自定义配置
    }),
    /**
     * webpack dev server 启动配置
     */
    devServer: {
        historyApiFallback: true,
        hot: true,
        watch: true,
        inline: true,
        port: 8080,
    },
    /**
     * 输出
     */
    output: {
        filename: DEBUG ? '/[name]_[chunkhash:8].js' : 'scripts/[name]_[chunkhash:8].js',
        chunkFilename: "[chunkhash].js",
        publicPath: DEBUG ? '' : serverUrl || './',
        path: DEBUG ? '' : './dist'
    },
    /**
     * 选择一个开发工具辅助开发
     *  @see // http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: DEBUG ? 'cheap-module-source-map' : false,
    /**
     * 模块配置
     */
    module: {
        /**
         * 加载器配置
         */
        loaders: [
            /**
             * 支持es6
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            /**
             * 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
             * 10k以下的base64处理
             */
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: `url-loader?name=${DEBUG ? '[path][name].[ext]' : './statistic/[sha512:hash:base64:8].[ext]&limit=10000'}`,
            },
            /**
             * 文件加载器，处理文件静态资源
             */
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: `file-loader?name=${DEBUG ? '[path][name].[ext]' : './statistic/[sha512:hash:base64:8].[ext]&limit=10000'}`,
            },
            ...(DEBUG ? [{
                    test: /\.css$/,
                    loader: "style!css?sourceMap!postcss"
                },
                    /**
                     * 支持sass less postCss处理
                     */
                    {
                        test: /\.(scss|less)$/,
                        loader: "style!css?sourceMap!postcss!sass"
                    },
                ] : [
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss')
                    },
                    {
                        test: /\.(less|scss)$/,
                        loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss!less')
                    }
                ]
            ),
        ]
    },
    /**
     * 路径解析配置
     */
    resolve: {
        /**
         * 根路径配置
         * eg. require('lib/md5')  require('src/index')
         */
        root: [path.resolve(__dirname)],
        /**
         * 别名配置
         * eg. require('zepto')
         */
        alias: {
            "kevent": path.resolve(__dirname, "./lib/kEvent")
        },
        /**
         * 模块路径
         * 数组中路径的查找方式类似nodejs的node_modules
         * eg. require('Home')
         */
        modulesDirectories: ['node_modules']
    },
    /**
     * 所需插件
     */
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */DEBUG ? "/vendor_[hash:8].js" : 'scripts/vendor_[hash:8].js'),//抽取公共模块
        new webpack.DefinePlugin({...GLOBALS, 'process.env.BROWSER': true}), //全局变量
        new webpackMd5Hash(),//md5 hash
        ...htmlConfs,//页面
        /**
         * 使用 hash 需要指定顺序,指定模块顺序
         */
        new webpack.optimize.OccurrenceOrderPlugin(),//
        ...(!DEBUG ? [
            /**
             * 去重
             */
            new webpack.optimize.DedupePlugin(),
            /**
             * 压缩
             */
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                    screw_ie8: true
                },
            }),
            /**
             * css合并压缩
             * 当allChunks指定为false时，css loader必须指定怎么处理
             * additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
             * 第一个参数`notExtractLoader`，一般是使用style-loader
             * @see https://github.com/webpack/extract-text-webpack-plugin
             */
            new ExtractTextPlugin('styles/[name]_[chunkhash:8].css', {
                allChunks: false
            })
        ] : [
            /**
             * 代码热替换,无需刷新浏览器更新对应模块
             */
            new webpack.HotModuleReplacementPlugin(),
        ]),
    ],
    /**
     * postcss配置
     * @param bundler
     * @returns {*[]}
     */
    postcss: function plugins(bundler) {
        return [
            require('postcss-import')({addDependencyTo: bundler}),
            require('precss')(),
            require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS}),
        ];
    },
};
