'use strict'

module.exports = [
  {
    mode: 'production',
    entry: {
      vk: './src/content/networks/vk.js',
      fb: './src/content/networks/facebook.js',
      tw: './src/content/networks/twitter.js',
      ok: './src/content/networks/odnoklassniki.js',
      yt: './src/content/networks/youtube.js',
      reddit: './src/content/networks/reddit.js'
    },

    output: {
      path: __dirname,
      filename: './asocial/content/[name].js'
    }
  },
  {
    mode: 'production',
    entry: './src/options/options.js',

    output: {
      path: __dirname,
      filename: './asocial/options/options.js'
    }
  },
  {
    mode: 'production',
    entry: './src/background.js',

    output: {
      path: __dirname,
      filename: './asocial/background/background.js'
    }
  }
]
