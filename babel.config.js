/* eslint global-require: off */

const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [require('react-hot-loader/babel')];

const plugins = [
  require('@loadable/babel-plugin'),
  require('@babel/plugin-transform-runtime'),
  [require('@babel/plugin-proposal-decorators'), { legacy: true }],
  require('@babel/plugin-proposal-export-default-from'),
  require('@babel/plugin-proposal-class-properties'),
  require('@babel/plugin-proposal-object-rest-spread'),
  require('@babel/plugin-transform-async-to-generator'),
  require('@babel/plugin-syntax-dynamic-import')
];

const cssModules = (test = false) => [
  'react-css-modules',
  {
    filetypes: {
      '.scss': {
        syntax: 'postcss-scss',
        plugins: ['postcss-nested']
      }
    },
    generateScopedName: test ? '[local]' : '[name]__[local]__[hash:base64:5]',
    webpackHotModuleReloading: true,
    autoResolveMultipleImports: true
  }
];

module.exports = api => {
  const development = api.env(developmentEnvironments);
  const test = api.env(['test']);

  return {
    presets: [
      [require('@babel/preset-env'), { targets: 'last 2 versions, ie 11' }],
      require('@babel/preset-react'),
      require('@babel/preset-flow')
    ],

    plugins: [
      ...plugins,

      cssModules(test),

      ...(development ? developmentPlugins : [])
    ]
  };
};
