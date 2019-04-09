module.exports = {
    entry: {
        site: './site.js'
    },
    output: {
        filename: '[name].entry.js',
        path: __dirname + '/js'
    },
    devtool: 'source-map',
    mode: 'development'
};
