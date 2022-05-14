const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');
const env = process.env.NODE_ENV;
const appIndexJs = './src/index.tsx';

config.entry = {
    main: [
        env === 'development' &&
            require.resolve('react-dev-utils/webpackHotDevClient'),
        appIndexJs,
    ].filter(Boolean),

    // NOTE to make separate js file
    // background: './src/serviceWorker.ts',
};
config.output.filename = 'static/js/[name].js';
config.optimization.runtimeChunk = false;

// NOTE to support modules with mjs extension (ex SheetJS)
config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
});
