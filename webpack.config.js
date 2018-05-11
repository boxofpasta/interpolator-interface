const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
      rules: [{
          test: /\.(s*)css$/,
          oneOf: [
            {
              resourceQuery: /^\?raw$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }, 
            {
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                  }, 
                  'sass-loader'
                ]
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]
  };