var fs = require('fs')
var path = require('path')
var extend = require('./extend');
var DEBUG = true;

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
        "webpack-dev-server/client?http://localhost:9527", //代码热替换
        "webpack/hot/dev-server", //代码热替换
    ] : []),
    'babel-polyfill',//es6补丁
];

let pageBase = "./pages";
let htmlConfs = [];
let entrys = [];

let pages = fs.readdirSync(path.resolve(__dirname, pageBase));

pages.forEach(page=> {
    let htmlpage = fs.readdirSync(path.join(__dirname, pageBase, './' + page));
    htmlpage.forEach(html=> {
        console.log(page, html);
        let entryName = page + '_' + html.replace(path.extname(html), '');
        htmlConfs.push(extend({}, htmlConf, {
            filename: DEBUG ? './' + page + '/' + html : './dist/' + page + '/' + html,
            template: './pages/' + page + '/' + html, //html模板路径
            chunks: [entryName]
        }));
        entrys[entryName] = entryConf.concat('app/component/'+page + '/' + html.replace(path.extname(html), ''));
    })
});

console.log(htmlConfs);
console.log(entrys);
