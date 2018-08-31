/**
 * Created by Administrator on 2018/6/10.
 */
//    webpack是基于node进行构建的，所以webpack的配置文件中，任何合法的node代码都是支持的
const path=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')
const VueLoaderPlugin=require('vue-loader/lib/plugin')
module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[     //所有webpack插件的配置节点
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),  //指定模板页面
            filename:'index.html'       //指定生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{    //配置所有第三方loader模块的
        rules:[
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},  //配置Babel来转换高级的ES语法
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=232960&name=[hash:8]-[name].[ext]'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}
        ]
    },
    //resolve:{
    //    alias:{     //修改Vue被导入时候的包的路径
    //        "vue$":"vue/dist/vue.js"
    //    }
    //}
}