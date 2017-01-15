let path = require('path');
let defer = require('config/defer').deferConfig;

module.exports = {
    handlers: [
        'static',
        'logger',
        'templates',
        'errors',
        'bodyParser',
        'app',
        'api'
    ],
    template: {
        // template.root uses config.root
        root: defer(function(cfg) {
            return path.join(cfg.root, 'handlers');
        }),
        basedir: path.join(process.cwd(), 'templates')
    },
    root:     process.cwd()
};