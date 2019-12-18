if(!znui){
    require('znui-react/index.all.js');
}
znui.react.fixCreateReactClass(require('react'), require('create-react-class'));
module.exports = {
    'Node': require('./Node'),
    'Link': require('./Link'),
    'FlowCanvas': require('./FlowCanvas')
};