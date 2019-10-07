const IS_PROD = process.env['NODE_ENV'] === 'production';

const presets = ['next/babel'];
const plugins = [
  [
    'babel-plugin-styled-components',
    {
      ssr: true,
      displayName: IS_PROD ? false : true,
    },
  ],
];

module.exports = { presets, plugins };
