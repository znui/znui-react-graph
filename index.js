require('znui-react');
var _name = require('./package.json').name,
    _exports = znui.react.loadedComponents[_name];
if(process && process.env && process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'development') {
        if(!_exports){
            require('./__/dist/development/index.style.bundle.css');
            _exports = znui.react.loadedComponents[name] = require('./__/build/index');
        }
    }else{
        if(!_exports){
            require('./__/dist/production/index.style.bundle.css');
            _exports = znui.react.loadedComponents[name] = require('./__/dist/production/index.bundle.js');
        }
    }
}else {
    if(!_exports){
        require('./__/dist/production/index.style.bundle.css');
        _exports = znui.react.loadedComponents[name] = require('./__/dist/production/index.bundle.js');
    }
}
zn.info('component loaded: ', _name);
module.exports = _exports;