module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.jsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@app': './src',
          '@assets': './assets',
        },
      },
    ],
  ],
}
