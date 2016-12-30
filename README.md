# 基于新技术的架构demo


## 环境配置
### nodejs
安装nodejs, 并执行 `npm i`

### bower
全局安装bower `npm i -g bower`, 并执行 `bower i` 安装依赖的包

## webpack
打包和提供测试服务。

## css
### postCss
### less
### sass

## es6

## 如何开始
### 启动服务
```
npm start
```
在浏览器中输入 `http://localhost:9527` 即可查看。

### 打包

打包后的项目在 dist 目录。

打包后的文件包括html文件, js, css以及图片等静态资源。

打包后文件夹结构:
```
 +a
    + index.html
    + b.html
 +b 
    + index.html
    + xx.html
 scripts
    + a_index_[hash].js
    + a_b_[hash].js
    + b_index_[hash].js
    + b_xx_[hash].js
 styles
    + a_index_[hash].css
    + a_b_[hash].css
    + b_index_[hash].css
    + b_xx_[hash].css
 statistic
    + [hash].xxx
```

#### publish
```
npm run publish
```
此类打包html中的路径会使用相对路径。

#### toserver
```
npm run toserver
```
此类打包html中的路径会使用配置的服务端路径。

### 测试
```
npm test
```

测试框架 mocha chai sinon,使用 karma 驱动。

### 多页面配置

页面需按类别在 `pages` 文件夹下创建文件, 可使文件夹名称对应cms中栏目名称。webpack中会根据页面文件夹和页面名称生成页面的入口配置以及页面生成配置。

#### js模块入口
`pages/a/b.html` 的入口应该是 `app/component/a/b.js`, 所以,请手动创建此文件。
