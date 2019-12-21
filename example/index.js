
require('znui-react');
var React = require('react');
var ReactDOM = require('react-dom');

var graph = require('../src/index.js');
require('./index.less');
console.log(graph);
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
ReactDOM.render(
    <div>
        <graph.FlowCanvas data={_data} />
    </div>,
    document.getElementById('container'),
);

