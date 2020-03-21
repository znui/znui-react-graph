# znui-react-graph
React Graph Component

[![npm](https://img.shields.io/npm/v/znui-react-graph.svg)](https://www.npmjs.com/package/znui-react-graph)
[![npm](https://img.shields.io/npm/dm/znui-react-graph.svg)](https://www.npmjs.com/package/znui-react-graph)

## Demo

[Take a look at the demo](https://znui.github.io/znui-react-graph/example/www/index.html)

## Installation

```bash
npm install znui-react-graph -s
```

## Usage

```javascript

var React = require('react');
var graph = require('znui-react-graph');
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

```

## Preiview

<img src="https://znui.github.io/znui-react-graph/example/images/workflow.png" />

## License

MIT