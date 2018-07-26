const path = require('path');
module.exports = {
  entry: './assets/js/index.js',
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: ['node_modules', 'layouts', 'static', 'assets/css']
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js'
  }
};
