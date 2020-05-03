import path from 'path';
const svgr = require('@svgr/rollup').default;
const IS_DEV_ENV = process.env.NODE_ENV === 'development';

const resolve = () => {
  const resolve = require('rollup-plugin-node-resolve');
  return resolve({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};

const resolveAlias = () => {
  const alias = require('@rollup/plugin-alias');
  return alias({
    entries: {
      'draft-js': '@wix/draft-js',
    },
  });
};

const copy = () => {
  const copy = require('rollup-plugin-copy');
  const targets = [{ src: 'statics', dest: 'dist' }];
  if (process.env.MODULE_NAME === 'plugin-gallery') {
    targets.push({
      src: '../../../node_modules/pro-gallery/dist/statics/media',
      dest: 'dist',
    });
  }

  return copy({
    targets,
    copyOnce: true,
  });
};

const babel = () => {
  const babel = require('rollup-plugin-babel');
  return babel({
    configFile: path.resolve(__dirname, 'babel.config.js'),
    include: ['src/**'],
    runtimeHelpers: true,
  });
};

const typescript = () => {
  const typescript = require('rollup-plugin-typescript2');
  return typescript({ useTsconfigDeclarationDir: true, clean: true });
};

const commonjs = () => {
  const commonjs = require('rollup-plugin-commonjs');
  const named = [
    {
      path: 'node_modules/image-client-api/dist/imageClientSDK.js',
      exportList: ['getScaleToFillImageURL', 'getScaleToFitImageURL'],
    },
    {
      path: 'node_modules/immutable/dist/immutable.js',
      exportList: ['List', 'OrderedSet', 'Map'],
    },
    {
      path: 'node_modules/draft-js/lib/Draft.js',
      exportList: [
        'SelectionState',
        'Modifier',
        'EditorState',
        'AtomicBlockUtils',
        'RichUtils',
        'convertToRaw',
        'convertFromRaw',
        'getVisibleSelectionRect',
        'DefaultDraftBlockRenderMap',
        'KeyBindingUtil',
        'genKey',
        'ContentBlock',
        'BlockMapBuilder',
        'CharacterMetadata',
        'ContentState',
        'Entity',
        'RawDraftContentState',
        'EditorChangeType',
        'convertFromHTML',
      ],
    },
  ];

  const relativePath = '../../../';

  const namedExports = {};
  named.forEach(({ path, exportList }) => {
    namedExports[path] = exportList;
    namedExports[relativePath + path] = exportList;
  });
  return commonjs({ namedExports });
};

const json = () => {
  const json = require('rollup-plugin-json');
  return json({
    include: [
      'statics/**',
      'node_modules/**',
      '../../../node_modules/**',
      '../../../packages/**/package.json',
    ],
  });
};

const postcss = shouldExtract => {
  const postcss = require('rollup-plugin-postcss');
  const postcssExclude = require('postcss-exclude-files').default;
  const postcssURL = require('postcss-url');
  const postcssRTL = require('postcss-rtl');
  return postcss({
    minimize: {
      reduceIdents: false,
      safe: true,
    },
    modules: {
      generateScopedName: IS_DEV_ENV ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
    },
    extract: shouldExtract && 'dist/styles.min.css',
    plugins: [
      postcssExclude({
        filter: '**/*.rtlignore.scss',
        plugins: [postcssRTL()],
      }),
      postcssURL({
        url: asset => asset.url.replace('../', '/statics/'),
      }),
    ],
  });
};

const replace = () => {
  const replacePlugin = require('rollup-plugin-replace');
  return replacePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });
};

const uglify = () => {
  const uglifyPlugin = require('rollup-plugin-terser').terser;
  return uglifyPlugin({
    mangle: false,
    sourcemap: {
      filename: 'out.js',
      url: 'out.js.map',
    },
  });
};

const visualizer = () => {
  const visualizer = require('rollup-plugin-visualizer');
  return visualizer({
    sourcemaps: true,
  });
};

let _plugins = [svgr(), resolveAlias(), resolve(), copy(), babel(), commonjs(), json()];

if (!IS_DEV_ENV) {
  _plugins = [..._plugins, replace(), uglify()];
}

if (process.env.MODULE_ANALYZE_EDITOR || process.env.MODULE_ANALYZE_VIEWER) {
  _plugins = [..._plugins, visualizer()];
}

if (process.env.MODULE_NAME === 'wrapper') {
  _plugins = [..._plugins, typescript()];
}

const plugins = shouldExtractCss => {
  _plugins.push(postcss(shouldExtractCss));
  return _plugins;
};
export { plugins };
