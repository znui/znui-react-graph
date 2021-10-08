"use strict";

var React = znui.React || require('react'); //var ReactDOM = znui.ReactDOM || require('react-dom');


module.exports = React.createClass({
  displayName: 'Link',
  getDefaultProps: function getDefaultProps() {
    return {
      highLightStyle: {
        'stroke': '#f0ad4e',
        'strokeWidth': '1px'
      },
      lineStyle: {
        'stroke': '#D0E4FF',
        'strokeWidth': '1px'
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      uuid: this.props.id || zn.uuid(),
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      marker: '',
      lineStyle: this.props.lineStyle,
      svgStyle: {},
      zIndex: 0
    };
  },
  componentDidMount: function componentDidMount() {
    this.highLight(false);
    this.props.onLinkDidMount && this.props.onLinkDidMount(this);
  },
  setTarget: function setTarget(value) {
    if (value) {
      this._target = value;
      value.setLink(this.state.uuid, this);
    }
  },
  setSource: function setSource(value) {
    if (value) {
      this._source = value;
      value.setLink(this.state.uuid, this);
    }
  },
  getId: function getId() {
    return this.state.uuid;
  },
  reset: function reset(targetPosition, sourcePosition) {
    var _bound = this.__calculateSVGBound(targetPosition, sourcePosition);

    if (_bound) {
      if (_bound.left == 0 && _bound.top == 0) {
        _bound.width = 0;
        _bound.height = 0;
      }

      this.setState({
        svgStyle: _bound
      });
    }
  },
  __getDirection: function __getDirection(x, y, x1, y1) {
    var flag = 0;
    var x = x - x1 <= 0 ? x : x1;
    var y = y - y1 <= 0 ? y : y1;

    if (x != x1 && y != y1) {
      flag = 1;
    }

    if (x == x1 && y != y1) {
      flag = 2;
    }

    if (x == x1 && y == y1) {
      flag = 3;
    }

    if (x != x1 && y == y1) {
      flag = 4;
    }

    return flag;
  },
  highLight: function highLight(_highLight) {
    var _lineStyle = {};

    if (_highLight) {
      _lineStyle = this.props.highLightStyle;
    } else {
      _lineStyle = this.props.lineStyle;
    }

    this._highLight = _highLight;
    this.setState({
      lineStyle: _lineStyle
    });
  },
  __calculateSVGBound: function __calculateSVGBound(targetPosition, sourcePosition) {
    var _xy1 = targetPosition || !!this._target && this._target.getCenterXY();

    var _xy2 = sourcePosition || !!this._source && this._source.getCenterXY();

    if (!_xy1 || !_xy2) {
      return;
    }

    var _minSize = this.props.minSize || 10,
        _dir = this.__getDirection(_xy1.x, _xy1.y, _xy2.x, _xy2.y);

    var _x = 0,
        _y = 0,
        _width = 0,
        _height = 0;
    var _x1 = 0,
        _y1 = 0,
        _x2 = 0,
        _y2 = 0;

    switch (_dir) {
      case 1:
        _x = _xy1.x;
        _y = _xy1.y;
        _width = _xy2.x - _xy1.x;
        _height = _xy2.y - _xy1.y;
        _width < _minSize && (_width = _minSize);
        _height < _minSize && (_height = _minSize);
        _x1 = 0;
        _y1 = 0;
        _x2 = _width;
        _y2 = _height;
        break;

      case 2:
        _x = _xy2.x;
        _y = _xy1.y;
        _width = _xy1.x - _xy2.x;
        _height = _xy2.y - _xy1.y;
        _width < _minSize && (_width = _minSize);
        _height < _minSize && (_height = _minSize);
        _x1 = 0;
        _y1 = _height;
        _x2 = _width;
        _y2 = 0;
        break;

      case 3:
        _x = _xy2.x;
        _y = _xy2.y;
        _width = _xy1.x - _xy2.x;
        _height = _xy1.y - _xy2.y;
        _width < _minSize && (_width = _minSize);
        _height < _minSize && (_height = _minSize);
        _x1 = 0;
        _y1 = 0;
        _x2 = _width;
        _y2 = _height;
        break;

      case 4:
        _x = _xy1.x;
        _y = _xy2.y;
        _width = _xy2.x - _xy1.x;
        _height = _xy1.y - _xy2.y;
        _width < _minSize && (_width = _minSize);
        _height < _minSize && (_height = _minSize);
        _x1 = 0;
        _y1 = _height;
        _x2 = _width;
        _y2 = 0;
        break;
    }

    this.setState({
      x1: _x1,
      y1: _y1,
      x2: _x2,
      y2: _y2
    }); //console.log(this.drawLineArrow(_x1, _y1, _x2, _y2));

    return {
      left: _x,
      top: _y,
      width: _width,
      height: _height
    };
  },
  drawLineArrow: function drawLineArrow(x1, y1, x2, y2) {
    var path;
    var slopy, cosy, siny;
    var Par = 10.0;
    var x3, y3;
    slopy = Math.atan2(y1 - y2, x1 - x2);
    cosy = Math.cos(slopy);
    siny = Math.sin(slopy);
    path = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;
    x3 = (Number(x1) + Number(x2)) / 2;
    y3 = (Number(y1) + Number(y2)) / 2;
    path += " M" + x3 + "," + y3;
    path += " L" + (Number(x3) + Number(Par * cosy - Par / 2.0 * siny)) + "," + (Number(y3) + Number(Par * siny + Par / 2.0 * cosy));
    path += " M" + (Number(x3) + Number(Par * cosy + Par / 2.0 * siny) + "," + (Number(y3) - Number(Par / 2.0 * cosy - Par * siny)));
    path += " L" + x3 + "," + y3;
    return path;
  },
  __getPath: function __getPath() {
    var _state = this.state;
    return "M" + _state.x1 + "," + _state.y1 + " L" + (_state.x1 + _state.x2) / 2 + "," + (_state.y1 + _state.y2) / 2 + " L" + _state.x2 + "," + _state.y2;
  },
  render: function render() {
    /*
    <defs>
    	<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="3" orient="auto" markerUnits="strokeWidth">
    		<path d="M0,0 L0,6 L9,3 z" fill="#f00" />
    	</marker>
    </defs>
    		return (
    	<svg className="zr-link" version="1.1" xmlns="http://www.w3.org/2000/svg" style={this.state.svgStyle}>
    		<defs>
    			<marker id="Triangle" viewBox="0 0 20 20" refX="0" refY="10" markerUnits="strokeWidth" markerWidth="20" markerHeight="20" orient="auto">
    				<path d="M 0 0 L 20 10 L 0 20 z"/>
    			</marker>
    		</defs>
    		<path className="line" d={'M '+this.state.x1+' '+ this.state.y1 +' L ' + this.state.x2 + ' ' + this.state.y2} stroke="red" markerMid='Triangle'/>
    	 </svg>
    	 <line className="line" markerEnd="url(#ancestor-arrow)" x1={this.state.x1} y1={this.state.y1} x2={this.state.x2} y2={this.state.y2} style={this.state.lineStyle}></line>
    );
    */
    return /*#__PURE__*/React.createElement("svg", {
      className: "zr-graph-link",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: znui.react.style(this.state.svgStyle)
    }, /*#__PURE__*/React.createElement("marker", {
      id: "ancestor-arrow",
      markerUnits: "strokeWidth",
      markerWidth: "12",
      markerHeight: "12",
      viewBox: "0 0 12 12",
      refX: "35",
      refY: "6",
      orient: "auto"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2,2 L12,6 L2,10 L4,6 L2,2",
      fill: "#38f"
    })), /*#__PURE__*/React.createElement("path", {
      className: "line ancestor root",
      d: this.__getPath(),
      markerMid: "url(#ancestor-arrow)",
      style: this.state.lineStyle
    }));
  }
});