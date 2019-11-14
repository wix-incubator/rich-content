const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const PATHS = {
  monorepo_root: path.join(__dirname, '..', '..', '..'),
  root: path.join(__dirname, '..'),
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

module.exports = env => ({
  entry: [require.resolve('./polyfills'), path.resolve(PATHS.src, 'index.js')],
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    symlinks: false,
    alias: {
      'wix-rich-content-common': path.resolve(PATHS.monorepo_root, 'packages', 'common', 'web'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /styles\.global\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.global.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        issuer: /\.(css|sass|js|jsx)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf|svg|woff2)$/,
        issuer: /\.(s)?css$/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.js(x)?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
          {
            loader: 'react-svg-loader',
            query: JSON.stringify({
              jsx: true,
              svgo: {
                plugins: [
                  { cleanupIDs: false },
                  { removeViewBox: false },
                  { removeDimensions: true },
                ],
              },
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Rich Content Editor',
      favicon: './public/favicon.ico',
      template: './public/index.html',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/wix-rich-content-plugin-html/dist/statics/',
        to: 'static/',
      },
    ]),
    new DotenvWebpackPlugin({
      path: path.resolve(PATHS.monorepo_root, '.env'),
    }),
    new MonacoWebpackPlugin({
      languages: ['json'],
      features: [
        'bracketMatching',
        'caretOperations',
        'clipboard',
        'codeAction',
        'comment',
        'contextmenu',
        'coreCommands',
        'cursorUndo',
        'find',
        'folding',
        'format',
        'gotoError',
        'gotoLine',
        'hover',
        'inPlaceReplace',
        'inspectTokens',
        'linesOperations',
        'links',
        'multicursor',
        'parameterHints',
        'referenceSearch',
        'rename',
        'smartSelect',
        'suggest',
        'transpose',
        'wordHighlighter',
        'wordOperations',
        'wordPartOperations',
      ],
    }),
  ],
});
