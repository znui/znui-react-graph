require('znui-react');
if(process && process.env && process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'development') {
        require('./__/dist/development/index.style.bundle.css');
        module.exports = require('./__/build/index');
    }else{
        require('./__/dist/production/index.style.bundle.css');
        module.exports = require('./__/dist/production/index.bundle.js');
    }
}else {
    require('./__/dist/production/index.style.bundle.css');
    module.exports = require('./__/dist/production/index.bundle.js');
}