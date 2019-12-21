var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var optimizeCss = require('optimize-css-assets-webpack-plugin');
var path = require('path');
var argv = process.argv;
var uglifyIndex = argv.indexOf('--uglify'),
    minimizer = [];

if(uglifyIndex!=-1){
    minimizer.push(new UglifyJsPlugin({
        uglifyOptions: {
            compress: false
        }
    }));
    minimizer.push(new optimizeCss({ }));
}

module.exports = {
    context: path.join(process.cwd(), 'src'),
    mode: 'production',
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "znui-react": "zr"
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        //chunkFilename: '[name].js',
        filename: '[name].js',
        //library: "friendly",
        libraryTarget: "this"
        //libraryExport: "default"
    },
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        //wrappedContextCritical: true,
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        }
                    ]
                })
            },
			{
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    { loader: 'file-loader' },
                    { loader: 'url-loader' }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: "[name].css", disable: false, allChunks: true }),
        new optimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    optimization: {
        minimizer: minimizer
    }
};
