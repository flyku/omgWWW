/**
 * webpack 配置文件
 * todo: chunk 配置
 */
import path from "path";
import webpack from "webpack";

export default {
    /**
     * 页面逻辑入口配置
     */
    entry: {},
    /**
     * 选择一个开发工具辅助开发
     *  @see // http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: 'eval-source-map',
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
        modulesDirectories: ['bower_components', 'node_modules']
    },
    /**
     * 所需插件
     */
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
        /**
         * 使用 hash 需要指定顺序,指定模块顺序
         */
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
};
