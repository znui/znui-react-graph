require('znui-react');
require('./__/dist/development/index.style.bundle.css');
var _name = require('./package.json').name;
module.exports = znui.react.loadedComponents[_name] = require('./__/build/index.js');