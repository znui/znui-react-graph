require('znui-react');
require('./__/dist/production/index.style.bundle.css');
module.exports = znui.react.loadedComponents[require('./package.json').name] = require('./__/dist/production/index.bundle.js');