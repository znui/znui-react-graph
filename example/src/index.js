require('znui-react');
require('../../src/index.less');
require('./index.less');
var React = znui.React || require('react');
var graph = require('../../src/index');
var _data = {
    nodes: [
        {
            id: 1, x: 100, y: 100, width: 50, height: 50
        },
        {
            id: 2, x: 200, y: 200
        },
        {
            id: 3, x: 300, y: 300
        }
    ],
    links: [
        {target: 1, source: 2}
    ]
};

znui.react.createApplication({
    render: <div className="components">
        <graph.FlowCanvas data={_data} />
    </div>
});