require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var FlowDesigner = require('./FlowDesigner');

var _data = {
    nodes: [
        {
            id: 1, x: 100, y: 100, width: 50, height: 50, data: { type: 'begin', title: '开始节点' } 
        },
        {
            id: 2, x: 200, y: 200, data: { type: 'normal', title: '普通节点' }
        },
        {
            id: 3, x: 300, y: 200, data: { type: 'parallel', title: '并行节点' }
        },
        {
            id: 4, x: 400, y: 200, data: { type: 'auto', title: '自动节点' }
        },
        {
            id: 5, x: 500, y: 200, data: { type: 'cancel', title: '取消节点' }
        },
        {
            id: 6, x: 600, y: 200, data: { type: 'subflow', title: '子流程' }
        },
        {
            id: 7, x: 700, y: 100, data: { type: 'end', title: '结束节点' }
        }
    ],
    links: [
        {target: 1, source: 2},
        {target: 2, source: 3},
        {target: 3, source: 4},
        {target: 4, source: 5},
        {target: 5, source: 6},
        {target: 6, source: 7},
        {target: 1, source: 7}
    ]
};

znui.react.createApplication({
    render: <div className="components">
        <FlowDesigner data={_data} />
    </div>
});