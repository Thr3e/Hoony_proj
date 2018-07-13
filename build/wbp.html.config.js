const htmlWebpackPlugin = require('html-webpack-plugin')


exports.config = [
    new htmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        chunks: ["main"],
        filename: "index.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/beds.html",
        inject: true,
        chunks: ["pages"],
        filename: "static/pages/beds.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/ljh_carts.html",
        inject: true,
        chunks: ["carts"],
        filename: "static/pages/ljh_carts.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/ljh_login.html",
        inject: true,
        chunks: ["login"],
        filename: "static/pages/ljh_login.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/more.html",
        inject: true,
        chunks: ["pages"],
        filename: "static/pages/more.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/sofas.html",
        inject: true,
        chunks: ["pages"],
        filename: "static/pages/sofas.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/tables.html",
        inject: true,
        chunks: ["pages"],
        filename: "static/pages/tables.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/storage.html",
        inject: true,
        chunks: ["pages"],
        filename: "static/pages/storage.html"
    }),
    new htmlWebpackPlugin({
        template: "./src/pages/ljh_userinfo.html",
        inject: true,
        chunks: ["userinfo"],
        filename: "static/pages/ljh_userinfo.html"
    }),
    new htmlWebpackPlugin({
        template:"./src/pages/hcx_detail.html",
        inject:true,
        chunks:["detail"],
        filename:"static/pages/hcx_detail.html"
    })
]