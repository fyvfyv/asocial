'use strict';

module.exports = [
    {
        entry: {
            vk: './src/content/networks/vk.js',
            fb: './src/content/networks/facebook.js',
            tw: './src/content/networks/twitter.js',
            ok: './src/content/networks/odnoklassniki.js'
        },

        output: {
            filename: 'asocial/content/[name].js'
        }
    },
    {
        entry: './src/options/options.js',

        output: {
            filename: 'asocial/options/options.js'
        }
    },
    {
        entry: './src/background.js',

        output: {
            filename: 'asocial/background/background.js'
        }
    }
];
