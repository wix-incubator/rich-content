const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

const output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].bundle.js',
  chunkFilename: '[chunkhash].bundle.js',
  publicPath: '/',
};

const common = {
  mode: 'development',
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
    },
  },
};

const babelRule = {
  test: /\.js(x)?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      compact: true,
      rootMode: 'upward',
    },
  },
};

const scssRule = topLoader => ({
  test: /\.scss$/,
  use: [
    topLoader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          localIdentName: '[name]_[local]',
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
});

const urlRule = {
  test: /\.(woff|eot|ttf|svg|woff2)$/,
  issuer: /\.(s)?css$/,
  use: ['url-loader'],
};

const typescriptRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'happypack/loader?id=ts',
};

const happyPackPlugin = new HappyPack({
  id: 'ts',
  loaders: [
    {
      path: 'ts-loader',
      query: { happyPackMode: true },
    },
  ],
});

const config = [
  {
    ...common,
    name: 'client',
    entry: {
      index: './src/client/index',
    },
    output,
    plugins: [happyPackPlugin, new LoadablePlugin()],
    module: {
      rules: [
        babelRule,
        scssRule({
          loader: 'style-loader',
        }),
        urlRule,
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        typescriptRule,
      ],
    },
  },
  {
    ...common,
    name: 'server',
    entry: {
      renderer: './src/server/renderer',
    },
    output: {
      ...output,
      libraryTarget: 'commonjs2',
      publicPath: '/static/',
    },
    target: 'node',
    externals: ['@loadable/component', nodeExternals({ whitelist: [/.css/, /^wix-rich-content/] })],
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      happyPackPlugin,
      new LoadablePlugin(),
    ],
    module: {
      rules: [
        babelRule,
        scssRule(MiniCssExtractPlugin.loader),
        urlRule,
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        typescriptRule,
      ],
    },
  },
];

module.exports = config;
