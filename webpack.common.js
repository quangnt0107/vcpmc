const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const SRC_DIR = path.resolve(__dirname, "src/view");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const VENDOR_LIBS = [
  "axios",
  "moment",
  "react",
  "react-dom",
  "react-loadable",
  // 'bootstrap',
  "jquery",
  "react-router",
  "react-router-dom",
  // 'recompose',
];
module.exports = {
  entry: {
    bundle: path.join(__dirname, "./src/view/index.tsx"),
    vendor: VENDOR_LIBS,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: ["/node_modules/", "/build/"],
      },
      {
        /*bien dich soure map sang ts*/
        enforce: "pre",
        test: /\.js?$/,
        loader: "source-map-loader",
      },
      {
        loader: "file-loader",
        test: /\.gz$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2|\.eot$|.ttf$|\.wav$|\.mp3$|\.icon$|\?[a-z0-9]+?$/,
        query: {
          name: "[name]-[md5:hash:8].[ext]",
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [
                // __dirname
                path.resolve(__dirname, "src/view/shared/"),
                path.resolve(__dirname, "src/view/"),
                // path.resolve(__dirname, "src/modules"),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: SRC_DIR + "/index.html",
      // favicon: SRC_DIR + '/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.ProvidePlugin({
      // inject ES5 modules as global vars
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
    }),
    new CopyWebpackPlugin([
      { from: "src/assets/images", to: "src/assets/images" },
    ]),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [new TsConfigPathsPlugin(/* { tsconfig, compiler } */)],
    // alias: {
    //     "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
    // }
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[chunkhash].[chunkhash].js",
    chunkFilename: "[chunkhash].bundle.js",
    publicPath: "/",
  },
};
