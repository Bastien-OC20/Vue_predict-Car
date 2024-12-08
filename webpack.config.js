// webpack.config.js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ... autres configurations
  plugins: [
    new ESLintPlugin({
      // Ne pas inclure 'extensions'
      extensions: ['js', 'vue'], // Cette option doit être retirée si elle cause des erreurs
    }),
  ],
};