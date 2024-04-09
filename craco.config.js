const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        configure: (webpackConfig, { env, paths }) => {
            paths.appBuild = 'dist'
            webpackConfig.devtool = webpackConfig.mode === "production" ? false : 'inline-source-map';
            // webpackConfig.module.rules = webpackConfig.mode === "production" ? [
            //     ...webpackConfig.module.rules,
            //     {
            //         test: /\.css$/,
            //         use: [
            //             {
            //                 loader: MiniCssExtractPlugin.loader,
            //                 options: {
            //                     publicPath: "../../",
            //                 },
            //             },
            //             "css-loader",
            //         ],
            //     }
            // ] : [...webpackConfig.module.rules]

            // webpackConfig.module.rules[1].oneOf[5].use[0].options = webpackConfig.mode === "production" ? {
            //     publicPath: "../../",
            // } : {}
            console.log('配置', webpackConfig.module.rules[1].oneOf[5].use[1].options)
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'),
                //output.publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
                publicPath: webpackConfig.mode === "production" ? '/web/dist/' : '/'
            }
            return webpackConfig
        }
    }
}