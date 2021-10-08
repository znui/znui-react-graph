(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FlowCanvas.js":
/*!***********************!*\
  !*** ./FlowCanvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var ReactDOM = znui.ReactDOM || __webpack_require__(/*! react-dom */ "react-dom");

var Node = __webpack_require__(/*! ./Node */ "./Node.js");

var Link = __webpack_require__(/*! ./Link */ "./Link.js");

module.exports = React.createClass({
  displayName: 'FlowCanvas',
  getInitialState: function getInitialState() {
    return {
      nodes: [],
      links: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._dom = ReactDOM.findDOMNode(this);
    this.setData(this.props.data);

    this.__initDragDrop(this._dom);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      this.setData(this.props.data);
    }
  },
  __initDragDrop: function __initDragDrop(target) {
    target.ondragover = function (event) {
      event.preventDefault(); //console.log('drag-over');

      this.props.onDragOver && this.props.onDragOver(event);
      return true;
    }.bind(this);

    target.ondragenter = function (event) {
      //console.log('drag-enter');
      this.props.onDragEnter && this.props.onDragEnter(event);
      return true;
    }.bind(this);

    target.ondrop = function (event) {
      this.props.onDrop && this.props.onDrop(event, JSON.parse(event.dataTransfer.getData("data") || '{}'));
      return false;
    }.bind(this);
  },
  __onNodeDidMount: function __onNodeDidMount(node) {
    this._nodes[node.getId()] = node;
  },
  __onNodeDrag: function __onNodeDrag() {},
  __onNodeDragEnd: function __onNodeDragEnd(event, data, node) {
    var _data = this.state.nodes[node.props.index];

    if (_data) {
      _data.x = data.currX;
      _data.y = data.currY;
      this.props.onNodeDragEnd && this.props.onNodeDragEnd(event, data, node);
    }
  },
  __onLinkDidMount: function __onLinkDidMount(link) {
    var _target = this._nodes[link.props.target],
        _source = this._nodes[link.props.source];
    this._links[link.getId()] = link;
    link.setTarget(_target);
    link.setSource(_source);
    link.reset();
  },
  getData: function getData() {
    return {
      nodes: this.state.nodes,
      links: this.state.links
    };
  },
  setData: function setData(data) {
    if (data) {
      var _obj = {};

      if (data.nodes) {
        _obj.nodes = data.nodes;
      }

      if (data.links) {
        _obj.links = data.links;
      }

      if (Object.keys(_obj).length) {
        this._nodes = {};
        this._links = {};
        this.setState(_obj);
      }
    }

    return this;
  },
  addLink: function addLink(target, source) {
    this.state.links.push({
      target: target,
      source: source
    });
    this.forceUpdate();
  },
  deleteLink: function deleteLink(link) {
    this.state.links.splice(this.state.links.indexOf(link), 1);
    this.forceUpdate();
  },
  updateNode: function updateNode(node) {
    this.state.nodes.map(function (item, index) {
      if (node === item) {
        return node;
      }

      return item;
    });
    this.forceUpdate();
  },
  addNode: function addNode(node, from) {
    node.id = zn.uuid();
    this.state.nodes.push(node);

    if (from) {
      this.state.links.push({
        target: node.id,
        source: from.getId()
      });
    }

    this.forceUpdate();
  },
  deleteNodeById: function deleteNodeById(id) {
    var _nodeId = null;
    this.state.nodes = this.state.nodes.filter(function (node, index) {
      if (node.id !== id) {
        return true;
      } else {
        _nodeId = node.id;
        return false;
      }
    });

    if (_nodeId) {
      this.state.links = this.state.links.filter(function (link, index) {
        if (link.source == _nodeId || link.target == _nodeId) {
          return false;
        } else {
          return true;
        }
      });
    }

    this.forceUpdate();
  },
  updateNodeById: function updateNodeById(id, info) {
    this.state.nodes.forEach(function (node, index) {
      if (node.id === id) {
        zn.extend(node, info);
      }
    });
    this.forceUpdate();
  },
  deleteNode: function deleteNode(node) {
    this.state.nodes.splice(this.state.nodes.indexOf(node), 1);
    this.forceUpdate();
  },
  filterNode: function filterNode(filter) {
    this.setState({
      nodes: this.state.nodes.filter(filter || function () {})
    });
  },
  searchNode: function searchNode(handler) {
    if (!this.__nodes) {
      this.__nodes = this.state.nodes.slice(0);
    }

    this.setState({
      nodes: this.__nodes.filter(handler)
    });
  },
  __onNodeClick: function __onNodeClick(event, node, data) {
    this.setState({
      selectNode: data
    });
    this.props.onNodeClick && this.props.onNodeClick(event, node, data, this);
  },
  render: function render() {
    //zn.debug('FlowCanvas data: ', this.state);
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-graph-flow-canvas", this.props.className),
      style: this.props.style
    }, (this.state.nodes || []).map(function (node, index) {
      var _this = this;

      node.id = node.id || zn.uuid();
      return /*#__PURE__*/React.createElement(Node, _extends({}, node, {
        key: node.id,
        index: index,
        canvas: this,
        className: this.props.nodeClassName,
        selected: this.state.selectNode === node ? true : false,
        editable: this.props.editable || node.editable,
        draggable: this.props.draggable || node.draggable,
        render: this.props.nodeRender,
        onContextMenu: this.props.onNodeContextMenu,
        onNodeEditDragEnd: this.props.onNodeEditDragEnd,
        onNodeDidMount: this.__onNodeDidMount,
        onNodeDrag: this.__onNodeDrag,
        onNodeDragEnd: this.__onNodeDragEnd,
        onClick: function onClick(event, instance) {
          return _this.__onNodeClick(event, instance, node);
        }
      }));
    }.bind(this)), this.state.links.map(function (link, index) {
      link.id = link.id || zn.uuid();
      return /*#__PURE__*/React.createElement(Link, _extends({}, link, {
        key: link.id,
        render: this.props.linkRender,
        onLinkDidMount: this.__onLinkDidMount
      }));
    }.bind(this)), /*#__PURE__*/React.createElement(Link, {
      ref: "temp"
    }));
  }
});

/***/ }),

/***/ "./Link.js":
/*!*****************!*\
  !*** ./Link.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react"); //var ReactDOM = znui.ReactDOM || require('react-dom');


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

/***/ }),

/***/ "./Node.js":
/*!*****************!*\
  !*** ./Node.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

var Link = __webpack_require__(/*! ./Link */ "./Link.js");

module.exports = React.createClass({
  displayName: 'Node',
  getDefaultProps: function getDefaultProps() {
    return {
      draggable: true,
      editable: true,
      data: {},
      x: 0,
      y: 0
    };
  },
  getInitialState: function getInitialState() {
    this._links = {};
    this._nodes = {};
    return {
      uuid: this.props.id || zn.uuid(),
      highLight: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _source = this._dom;
    this._x = this.props.x;
    this._y = this.props.y;
    this._parentPosition = zn.dom.getPosition(this._dom.parentNode);

    if (this.props.draggable) {
      zn.draggable.create(_source, {
        start: [this.props.x, this.props.y],
        onDragStart: this.__onNodeDragStart,
        onDrag: this.__onNodeDrag,
        onDragEnd: this.__onNodeDragEnd
      });
    }

    zn.dom.on(_source, 'mouseover', this.__onMouseOver);
    zn.dom.on(_source, 'mouseout', this.__onMouseOut);
    this.props.onNodeDidMount && this.props.onNodeDidMount(this);
  },
  getCenterXY: function getCenterXY() {
    var _position = zn.dom.getPosition(this._dom);

    var _halfWidth = _position.width / 2.0,
        _halfHeight = _position.height / 2.0,
        _x = 0,
        _y = 0;

    if (!this.props.draggable) {
      _x = _position.x - this._parentPosition.x + _halfWidth;
      _y = _position.y - this._parentPosition.y + _halfHeight;
    } else {
      _x = this._x + _halfWidth;
      _y = this._y + _halfHeight;

      if (this.props.parent) {
        _x = _x + this.props.parent._x;
        _y = _y + this.props.parent._y;
      }
    }

    return {
      x: _x,
      y: _y
    };
  },
  setLink: function setLink(id, link) {
    this._links[id] = link;
  },
  getLink: function getLink(id) {
    return this._links[id];
  },
  deleteLink: function deleteLink(id) {
    this._links[id] = null;
    delete this._links[id];
  },
  setNode: function setNode(key, node) {
    this._nodes[key] = node;
  },
  addNode: function addNode(node) {
    var _node = null;

    if (node) {
      _node = /*#__PURE__*/React.createElement(Node, node);
      this._nodes[_node.state.uuid] = _node;
      React.render(_node, this._dom);
    }
  },
  __onNodeDragStart: function __onNodeDragStart(event, data) {
    var _dom = this._dom;
    this._oldZIndex = _dom.style.zIndex;
    _dom.style.zIndex = 10;
    this._startVector = {
      x: data.mouseX,
      y: data.mouseY
    };

    if (event.target.className.indexOf('manual-connect') != -1) {
      return this.__createLine(event, data), false;
    }
  },
  __createLine: function __createLine(event, data) {
    if (!this._dragTemp) {
      var _self = this;

      var _dragTemp = this._dragTemp = document.createElement('div');

      _dragTemp.className = "zr-graph-node-line-temp";
      zn.dom.setStyles(this._dragTemp, {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: '#800010'
      });

      var _start = this.getCenterXY(),
          _startMouse = zn.dom.getPosition(event.target),
          _basePosition = this._parentPosition;

      var _temp = this.props.canvas.refs.temp;
      zn.draggable.create(this._dragTemp, {
        event: event,
        start: [_startMouse.x, _startMouse.y],
        onDragStart: function onDragStart(event, data) {},
        onDrag: function onDrag(event, data) {
          var _mouse = zn.dom.getPosition(_dragTemp);

          _temp.reset(_start, {
            x: _mouse.x - _basePosition.x,
            y: _mouse.y - _basePosition.y
          });
        },
        onDragEnd: function onDragEnd(event, data) {
          _self.clearTempLink();

          var _uuid = _self.findNode.call(_self, document.elementFromPoint(data.mouseX, data.mouseY));

          if (_uuid) {
            if (_uuid !== _self.getId()) {
              _self.props.canvas.addLink(_self.getId(), _uuid);
            }
          } else {
            _self.props.onNodeEditDragEnd && _self.props.onNodeEditDragEnd(_self, data);
          }
        }
      });
      document.body.appendChild(this._dragTemp);
    }
  },
  findNode: function findNode(dom) {
    if (!dom || dom === document.body) {
      return;
    }

    var _className = dom.className;

    if (!_className) {
      return this.findNode(dom.parentNode);
    }

    if (_className == 'zr-graph-flow-canvas') {
      return;
    }

    if (!_className.indexOf) {
      return;
    }

    if (_className.indexOf('zr-graph-node') !== -1) {
      return dom.getAttribute('data-id');
    } else {
      return this.findNode(dom.parentNode);
    }
  },
  clearTempLink: function clearTempLink() {
    if (this._dragTemp) {
      document.body.removeChild(this._dragTemp);
      this._dragTemp = null;
    }

    this.props.canvas.refs.temp.reset({
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    });
  },
  __onConnectMouseUp: function __onConnectMouseUp() {
    this.clearTempLink();
  },
  __onNodeDragEnd: function __onNodeDragEnd(event, data) {
    var _dx = Math.abs(this._startVector.x - data.mouseX),
        _dy = Math.abs(this._startVector.y - data.mouseY);

    if (this._dom) {
      this._dom.style.zIndex = this._oldZIndex;
    }

    if (_dx < 5 && _dy < 5) {
      this.props.onClick && this.props.onClick(event, this);
      return false;
    }

    this.props.onNodeDragEnd && this.props.onNodeDragEnd(event, data, this);
  },
  __onNodeDrag: function __onNodeDrag(event, data) {
    this._x = data.currX;
    this._y = data.currY;

    this.__onLinkReset();

    this.__scanChild();

    !!this.onNodeDrag && this.onNodeDrag(event, data);
  },
  __onLinkReset: function __onLinkReset() {
    var _links = this._links;

    for (var key in _links) {
      _links[key].reset();
    }
  },
  __scanChild: function __scanChild() {
    var _nodes = this._nodes;

    for (var key in _nodes) {
      _nodes[key].__onLinkReset();
    }
  },
  highLight: function highLight(_highLight) {
    this.setState({
      highLight: _highLight !== undefined ? _highLight : true
    });
  },
  __onMouseOver: function __onMouseOver(event) {
    for (var key in this._links) {
      this._links[key].highLight(true);
    }
  },
  __onMouseOut: function __onMouseOut(event) {
    for (var key in this._links) {
      this._links[key].highLight(false);
    }

    this.setState({
      highLight: false
    });
  },
  __editableRender: function __editableRender() {
    if (this.props.editable) {
      return /*#__PURE__*/React.createElement("i", {
        className: "manual-connect",
        onMouseUp: this.__onConnectMouseUp
      });
    }
  },
  __onDomClick: function __onDomClick(event) {},
  __onContextMenu: function __onContextMenu(event) {
    event.stopPropagation();
    return this.props.onContextMenu && this.props.onContextMenu(event, this);
  },
  getId: function getId() {
    return this.state.uuid;
  },
  render: function render() {
    var _this = this;

    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(_ref) {
        return _this._dom = _ref;
      },
      style: this.props.style,
      className: znui.react.classname('zr-graph-node', this.props.className),
      "data-id": this.getId(),
      "data-highlight": this.state.highLight,
      "data-selected": this.props.selected,
      onClick: this.__onDomClick,
      onContextMenu: this.__onContextMenu
    }, this.props.render && this.props.render(this.props.data, this), this.__editableRender());
  }
});

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'Node': __webpack_require__(/*! ./Node */ "./Node.js"),
  'Link': __webpack_require__(/*! ./Link */ "./Link.js"),
  'FlowCanvas': __webpack_require__(/*! ./FlowCanvas */ "./FlowCanvas.js")
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["ReactDOM"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vRmxvd0NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9MaW5rLmpzIiwid2VicGFjazovLy8uL05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIl0sIm5hbWVzIjpbIlJlYWN0Iiwiem51aSIsInJlcXVpcmUiLCJSZWFjdERPTSIsIk5vZGUiLCJMaW5rIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJub2RlcyIsImxpbmtzIiwiY29tcG9uZW50RGlkTW91bnQiLCJfZG9tIiwiZmluZERPTU5vZGUiLCJzZXREYXRhIiwicHJvcHMiLCJkYXRhIiwiX19pbml0RHJhZ0Ryb3AiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJ0YXJnZXQiLCJvbmRyYWdvdmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRHJhZ092ZXIiLCJiaW5kIiwib25kcmFnZW50ZXIiLCJvbkRyYWdFbnRlciIsIm9uZHJvcCIsIm9uRHJvcCIsIkpTT04iLCJwYXJzZSIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJfX29uTm9kZURpZE1vdW50Iiwibm9kZSIsIl9ub2RlcyIsImdldElkIiwiX19vbk5vZGVEcmFnIiwiX19vbk5vZGVEcmFnRW5kIiwiX2RhdGEiLCJzdGF0ZSIsImluZGV4IiwieCIsImN1cnJYIiwieSIsImN1cnJZIiwib25Ob2RlRHJhZ0VuZCIsIl9fb25MaW5rRGlkTW91bnQiLCJsaW5rIiwiX3RhcmdldCIsIl9zb3VyY2UiLCJzb3VyY2UiLCJfbGlua3MiLCJzZXRUYXJnZXQiLCJzZXRTb3VyY2UiLCJyZXNldCIsIl9vYmoiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwic2V0U3RhdGUiLCJhZGRMaW5rIiwicHVzaCIsImZvcmNlVXBkYXRlIiwiZGVsZXRlTGluayIsInNwbGljZSIsImluZGV4T2YiLCJ1cGRhdGVOb2RlIiwibWFwIiwiaXRlbSIsImFkZE5vZGUiLCJmcm9tIiwiaWQiLCJ6biIsInV1aWQiLCJkZWxldGVOb2RlQnlJZCIsIl9ub2RlSWQiLCJmaWx0ZXIiLCJ1cGRhdGVOb2RlQnlJZCIsImluZm8iLCJmb3JFYWNoIiwiZXh0ZW5kIiwiZGVsZXRlTm9kZSIsImZpbHRlck5vZGUiLCJzZWFyY2hOb2RlIiwiaGFuZGxlciIsIl9fbm9kZXMiLCJzbGljZSIsIl9fb25Ob2RlQ2xpY2siLCJzZWxlY3ROb2RlIiwib25Ob2RlQ2xpY2siLCJyZW5kZXIiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwibm9kZUNsYXNzTmFtZSIsImVkaXRhYmxlIiwiZHJhZ2dhYmxlIiwibm9kZVJlbmRlciIsIm9uTm9kZUNvbnRleHRNZW51Iiwib25Ob2RlRWRpdERyYWdFbmQiLCJpbnN0YW5jZSIsImxpbmtSZW5kZXIiLCJnZXREZWZhdWx0UHJvcHMiLCJoaWdoTGlnaHRTdHlsZSIsImxpbmVTdHlsZSIsIngxIiwieTEiLCJ4MiIsInkyIiwibWFya2VyIiwic3ZnU3R5bGUiLCJ6SW5kZXgiLCJoaWdoTGlnaHQiLCJvbkxpbmtEaWRNb3VudCIsInZhbHVlIiwic2V0TGluayIsInRhcmdldFBvc2l0aW9uIiwic291cmNlUG9zaXRpb24iLCJfYm91bmQiLCJfX2NhbGN1bGF0ZVNWR0JvdW5kIiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiX19nZXREaXJlY3Rpb24iLCJmbGFnIiwiX2xpbmVTdHlsZSIsIl9oaWdoTGlnaHQiLCJfeHkxIiwiZ2V0Q2VudGVyWFkiLCJfeHkyIiwiX21pblNpemUiLCJtaW5TaXplIiwiX2RpciIsIl94IiwiX3kiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX3gxIiwiX3kxIiwiX3gyIiwiX3kyIiwiZHJhd0xpbmVBcnJvdyIsInBhdGgiLCJzbG9weSIsImNvc3kiLCJzaW55IiwiUGFyIiwieDMiLCJ5MyIsIk1hdGgiLCJhdGFuMiIsImNvcyIsInNpbiIsIk51bWJlciIsIl9fZ2V0UGF0aCIsIl9zdGF0ZSIsIl9wYXJlbnRQb3NpdGlvbiIsImRvbSIsImdldFBvc2l0aW9uIiwicGFyZW50Tm9kZSIsImNyZWF0ZSIsInN0YXJ0Iiwib25EcmFnU3RhcnQiLCJfX29uTm9kZURyYWdTdGFydCIsIm9uRHJhZyIsIm9uRHJhZ0VuZCIsIm9uIiwiX19vbk1vdXNlT3ZlciIsIl9fb25Nb3VzZU91dCIsIm9uTm9kZURpZE1vdW50IiwiX3Bvc2l0aW9uIiwiX2hhbGZXaWR0aCIsIl9oYWxmSGVpZ2h0IiwicGFyZW50IiwiZ2V0TGluayIsInNldE5vZGUiLCJrZXkiLCJfbm9kZSIsIl9vbGRaSW5kZXgiLCJfc3RhcnRWZWN0b3IiLCJtb3VzZVgiLCJtb3VzZVkiLCJfX2NyZWF0ZUxpbmUiLCJfZHJhZ1RlbXAiLCJfc2VsZiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFN0eWxlcyIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsIl9zdGFydCIsIl9zdGFydE1vdXNlIiwiX2Jhc2VQb3NpdGlvbiIsIl90ZW1wIiwiY2FudmFzIiwicmVmcyIsInRlbXAiLCJfbW91c2UiLCJjbGVhclRlbXBMaW5rIiwiX3V1aWQiLCJmaW5kTm9kZSIsImNhbGwiLCJlbGVtZW50RnJvbVBvaW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiX2NsYXNzTmFtZSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUNoaWxkIiwiX19vbkNvbm5lY3RNb3VzZVVwIiwiX2R4IiwiYWJzIiwiX2R5Iiwib25DbGljayIsIl9fb25MaW5rUmVzZXQiLCJfX3NjYW5DaGlsZCIsIm9uTm9kZURyYWciLCJ1bmRlZmluZWQiLCJfX2VkaXRhYmxlUmVuZGVyIiwiX19vbkRvbUNsaWNrIiwiX19vbkNvbnRleHRNZW51Iiwic3RvcFByb3BhZ2F0aW9u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QjtBQUtDLGFBQU8sRUFBRSxLQUFLTCxZQUxmO0FBTUMsbUJBQWEsRUFBRSxLQUFLQztBQU5yQixPQU9FLEtBQUtqTixLQUFMLENBQVc4RSxNQUFYLElBQXFCLEtBQUs5RSxLQUFMLENBQVc4RSxNQUFYLENBQWtCLEtBQUs5RSxLQUFMLENBQVdDLElBQTdCLEVBQW1DLElBQW5DLENBUHZCLEVBUUUsS0FBSzhNLGdCQUFMLEVBUkYsQ0FERDtBQVlBO0FBblBpQyxDQUFsQixDQUFqQixDOzs7Ozs7Ozs7OztBQ0hBMU4sTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2IsVUFBUUwsbUJBQU8sQ0FBQyx5QkFBRCxDQURGO0FBRWIsVUFBUUEsbUJBQU8sQ0FBQyx5QkFBRCxDQUZGO0FBR2IsZ0JBQWNBLG1CQUFPLENBQUMscUNBQUQ7QUFIUixDQUFqQixDOzs7Ozs7Ozs7OztBQ0FBLGFBQWEsZ0NBQWdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBL0MsYUFBYSxtQ0FBbUMsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gem51aS5SZWFjdERPTSB8fCByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBOb2RlID0gcmVxdWlyZSgnLi9Ob2RlJyk7XG52YXIgTGluayA9IHJlcXVpcmUoJy4vTGluaycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0Zsb3dDYW52YXMnLFxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bm9kZXM6IFtdLFxuXHRcdFx0bGlua3M6IFtdXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuX2RvbSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLnByb3BzLmRhdGEpO1xuXHRcdHRoaXMuX19pbml0RHJhZ0Ryb3AodGhpcy5fZG9tKTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAocHJldlByb3BzLCBwcmV2U3RhdGUpe1xuXHRcdGlmKHByZXZQcm9wcy5kYXRhIT10aGlzLnByb3BzLmRhdGEpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHRoaXMucHJvcHMuZGF0YSk7XG5cdFx0fVxuXHR9LFxuXHRfX2luaXREcmFnRHJvcDogZnVuY3Rpb24gKHRhcmdldCl7XG4gICAgICAgIHRhcmdldC5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdkcmFnLW92ZXInKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25EcmFnT3ZlciAmJiB0aGlzLnByb3BzLm9uRHJhZ092ZXIoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICB0YXJnZXQub25kcmFnZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnZHJhZy1lbnRlcicpO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkRyYWdFbnRlciAmJiB0aGlzLnByb3BzLm9uRHJhZ0VudGVyKGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGFyZ2V0Lm9uZHJvcCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRHJvcCAmJiB0aGlzLnByb3BzLm9uRHJvcChldmVudCwgSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcImRhdGFcIil8fCd7fScpKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXHR9LFxuXHRfX29uTm9kZURpZE1vdW50OiBmdW5jdGlvbiAobm9kZSl7XG5cdFx0dGhpcy5fbm9kZXNbbm9kZS5nZXRJZCgpXSA9IG5vZGU7XG5cdH0sXG5cdF9fb25Ob2RlRHJhZzogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0X19vbk5vZGVEcmFnRW5kOiBmdW5jdGlvbiAoZXZlbnQsIGRhdGEsIG5vZGUpe1xuXHRcdHZhciBfZGF0YSA9IHRoaXMuc3RhdGUubm9kZXNbbm9kZS5wcm9wcy5pbmRleF07XG5cdFx0aWYoX2RhdGEpe1xuXHRcdFx0X2RhdGEueCA9IGRhdGEuY3Vyclg7XG5cdFx0XHRfZGF0YS55ID0gZGF0YS5jdXJyWTtcblx0XHRcdHRoaXMucHJvcHMub25Ob2RlRHJhZ0VuZCAmJiB0aGlzLnByb3BzLm9uTm9kZURyYWdFbmQoZXZlbnQsIGRhdGEsIG5vZGUpO1xuXHRcdH1cblx0fSxcblx0X19vbkxpbmtEaWRNb3VudDogZnVuY3Rpb24gKGxpbmspe1xuXHRcdHZhciBfdGFyZ2V0ID0gdGhpcy5fbm9kZXNbbGluay5wcm9wcy50YXJnZXRdLFxuXHRcdFx0X3NvdXJjZSA9IHRoaXMuX25vZGVzW2xpbmsucHJvcHMuc291cmNlXTtcblx0XHR0aGlzLl9saW5rc1tsaW5rLmdldElkKCldID0gbGluaztcblx0XHRsaW5rLnNldFRhcmdldChfdGFyZ2V0KTtcblx0XHRsaW5rLnNldFNvdXJjZShfc291cmNlKTtcblx0XHRsaW5rLnJlc2V0KCk7XG5cdH0sXG5cdGdldERhdGE6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRub2RlczogdGhpcy5zdGF0ZS5ub2Rlcyxcblx0XHRcdGxpbmtzOiB0aGlzLnN0YXRlLmxpbmtzXG5cdFx0fTtcblx0fSxcblx0c2V0RGF0YTogZnVuY3Rpb24gKGRhdGEpe1xuXHRcdGlmKGRhdGEpe1xuXHRcdFx0dmFyIF9vYmogPSB7fTtcblx0XHRcdGlmKGRhdGEubm9kZXMpe1xuXHRcdFx0XHRfb2JqLm5vZGVzID0gZGF0YS5ub2Rlcztcblx0XHRcdH1cblx0XHRcdGlmKGRhdGEubGlua3Mpe1xuXHRcdFx0XHRfb2JqLmxpbmtzID0gZGF0YS5saW5rcztcblx0XHRcdH1cblx0XHRcdGlmKE9iamVjdC5rZXlzKF9vYmopLmxlbmd0aCl7XG5cdFx0XHRcdHRoaXMuX25vZGVzID0ge307XG5cdFx0XHRcdHRoaXMuX2xpbmtzID0ge307XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdGFkZExpbms6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSl7XG5cdFx0dGhpcy5zdGF0ZS5saW5rcy5wdXNoKHsgdGFyZ2V0OiB0YXJnZXQsIHNvdXJjZTogc291cmNlIH0pO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0ZGVsZXRlTGluazogZnVuY3Rpb24gKGxpbmspe1xuXHRcdHRoaXMuc3RhdGUubGlua3Muc3BsaWNlKHRoaXMuc3RhdGUubGlua3MuaW5kZXhPZihsaW5rKSwgMSk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHR1cGRhdGVOb2RlOiBmdW5jdGlvbiAobm9kZSl7XG5cdFx0dGhpcy5zdGF0ZS5ub2Rlcy5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KXtcblx0XHRcdGlmKG5vZGU9PT1pdGVtKXtcblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9KTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdGFkZE5vZGU6IGZ1bmN0aW9uIChub2RlLCBmcm9tKXtcblx0XHRub2RlLmlkID0gem4udXVpZCgpO1xuXHRcdHRoaXMuc3RhdGUubm9kZXMucHVzaChub2RlKTtcblx0XHRpZihmcm9tKXtcblx0XHRcdHRoaXMuc3RhdGUubGlua3MucHVzaCh7IHRhcmdldDogbm9kZS5pZCwgc291cmNlOiBmcm9tLmdldElkKCkgfSk7XG5cdFx0fVxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0ZGVsZXRlTm9kZUJ5SWQ6IGZ1bmN0aW9uIChpZCl7XG5cdFx0dmFyIF9ub2RlSWQgPSBudWxsO1xuXHRcdHRoaXMuc3RhdGUubm9kZXMgPSB0aGlzLnN0YXRlLm5vZGVzLmZpbHRlcihmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcblx0XHRcdGlmKG5vZGUuaWQgIT09IGlkKXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0X25vZGVJZCA9IG5vZGUuaWQ7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmKF9ub2RlSWQpe1xuXHRcdFx0dGhpcy5zdGF0ZS5saW5rcyA9IHRoaXMuc3RhdGUubGlua3MuZmlsdGVyKGZ1bmN0aW9uIChsaW5rLCBpbmRleCl7XG5cdFx0XHRcdGlmKGxpbmsuc291cmNlID09IF9ub2RlSWQgfHwgbGluay50YXJnZXQgPT0gX25vZGVJZCl7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0dXBkYXRlTm9kZUJ5SWQ6IGZ1bmN0aW9uIChpZCwgaW5mbyl7XG5cdFx0dGhpcy5zdGF0ZS5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuXHRcdFx0aWYobm9kZS5pZCA9PT0gaWQpe1xuXHRcdFx0XHR6bi5leHRlbmQobm9kZSwgaW5mbyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdGRlbGV0ZU5vZGU6IGZ1bmN0aW9uIChub2RlKXtcblx0XHR0aGlzLnN0YXRlLm5vZGVzLnNwbGljZSh0aGlzLnN0YXRlLm5vZGVzLmluZGV4T2Yobm9kZSksIDEpO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0ZmlsdGVyTm9kZTogZnVuY3Rpb24gKGZpbHRlcikge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bm9kZXM6IHRoaXMuc3RhdGUubm9kZXMuZmlsdGVyKGZpbHRlcnx8ZnVuY3Rpb24gKCl7fSlcblx0XHR9KTtcblx0fSxcblx0c2VhcmNoTm9kZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRpZighdGhpcy5fX25vZGVzKXtcblx0XHRcdHRoaXMuX19ub2RlcyA9IHRoaXMuc3RhdGUubm9kZXMuc2xpY2UoMCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoeyBub2RlczogdGhpcy5fX25vZGVzLmZpbHRlcihoYW5kbGVyKSB9KTtcblx0fSxcblx0X19vbk5vZGVDbGljazogZnVuY3Rpb24gKGV2ZW50LCBub2RlLCBkYXRhKXtcblx0XHR0aGlzLnNldFN0YXRlKHsgc2VsZWN0Tm9kZTogZGF0YSB9KTtcblx0XHR0aGlzLnByb3BzLm9uTm9kZUNsaWNrICYmIHRoaXMucHJvcHMub25Ob2RlQ2xpY2soZXZlbnQsIG5vZGUsIGRhdGEsIHRoaXMpO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHQvL3puLmRlYnVnKCdGbG93Q2FudmFzIGRhdGE6ICcsIHRoaXMuc3RhdGUpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1ncmFwaC1mbG93LWNhbnZhc1wiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdCh0aGlzLnN0YXRlLm5vZGVzfHxbXSkubWFwKGZ1bmN0aW9uIChub2RlLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRub2RlLmlkID0gbm9kZS5pZCB8fCB6bi51dWlkKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gPE5vZGUgey4uLm5vZGV9XG5cdFx0XHRcdFx0XHRcdFx0XHRrZXk9e25vZGUuaWR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleD17aW5kZXh9XG5cdFx0XHRcdFx0XHRcdFx0XHRjYW52YXM9e3RoaXN9XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMucHJvcHMubm9kZUNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdE5vZGU9PT1ub2RlP3RydWU6ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZXx8bm9kZS5lZGl0YWJsZX1cblx0XHRcdFx0XHRcdFx0XHRcdGRyYWdnYWJsZT17dGhpcy5wcm9wcy5kcmFnZ2FibGV8fG5vZGUuZHJhZ2dhYmxlfVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZGVyPXt0aGlzLnByb3BzLm5vZGVSZW5kZXJ9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNvbnRleHRNZW51PXt0aGlzLnByb3BzLm9uTm9kZUNvbnRleHRNZW51fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25Ob2RlRWRpdERyYWdFbmQ9e3RoaXMucHJvcHMub25Ob2RlRWRpdERyYWdFbmR9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbk5vZGVEaWRNb3VudD17dGhpcy5fX29uTm9kZURpZE1vdW50fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25Ob2RlRHJhZz17dGhpcy5fX29uTm9kZURyYWd9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbk5vZGVEcmFnRW5kPXt0aGlzLl9fb25Ob2RlRHJhZ0VuZH1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eyhldmVudCwgaW5zdGFuY2UpPT50aGlzLl9fb25Ob2RlQ2xpY2soZXZlbnQsIGluc3RhbmNlLCBub2RlKX0gLz47XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmxpbmtzLm1hcChmdW5jdGlvbiAobGluaywgaW5kZXgpe1xuXHRcdFx0XHRcdFx0bGluay5pZCA9IGxpbmsuaWQgfHwgem4udXVpZCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIDxMaW5rIHsuLi5saW5rfVxuXHRcdFx0XHRcdFx0XHRcdFx0a2V5PXtsaW5rLmlkfVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZGVyPXt0aGlzLnByb3BzLmxpbmtSZW5kZXJ9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkxpbmtEaWRNb3VudD17dGhpcy5fX29uTGlua0RpZE1vdW50fSAvPjtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdH1cblx0XHRcdFx0PExpbmsgcmVmPVwidGVtcFwiIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbi8vdmFyIFJlYWN0RE9NID0gem51aS5SZWFjdERPTSB8fCByZXF1aXJlKCdyZWFjdC1kb20nKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0xpbmsnLFxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRoaWdoTGlnaHRTdHlsZToge1xuXHRcdFx0XHQnc3Ryb2tlJzogJyNmMGFkNGUnLFxuXHRcdFx0XHQnc3Ryb2tlV2lkdGgnOiAnMXB4J1xuXHRcdFx0fSxcblx0XHRcdGxpbmVTdHlsZToge1xuXHRcdFx0XHQnc3Ryb2tlJzogJyNEMEU0RkYnLFxuXHRcdFx0XHQnc3Ryb2tlV2lkdGgnOiAnMXB4J1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHR1dWlkOiB0aGlzLnByb3BzLmlkIHx8IHpuLnV1aWQoKSxcblx0XHRcdHgxOiAwLFxuXHRcdFx0eTE6IDAsXG5cdFx0XHR4MjogMCxcblx0XHRcdHkyOiAwLFxuXHRcdFx0bWFya2VyOiAnJyxcblx0XHRcdGxpbmVTdHlsZTogdGhpcy5wcm9wcy5saW5lU3R5bGUsXG5cdFx0XHRzdmdTdHlsZToge1xuXG5cdFx0XHR9LFxuXHRcdFx0ekluZGV4OiAwXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuaGlnaExpZ2h0KGZhbHNlKTtcblx0XHR0aGlzLnByb3BzLm9uTGlua0RpZE1vdW50ICYmIHRoaXMucHJvcHMub25MaW5rRGlkTW91bnQodGhpcyk7XG5cdH0sXG5cdHNldFRhcmdldDogZnVuY3Rpb24gKHZhbHVlKXtcbiAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZS5zZXRMaW5rKHRoaXMuc3RhdGUudXVpZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldFNvdXJjZTogZnVuY3Rpb24gKHZhbHVlKXtcbiAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgdGhpcy5fc291cmNlID0gdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZS5zZXRMaW5rKHRoaXMuc3RhdGUudXVpZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXHRnZXRJZDogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudXVpZDtcblx0fSxcblx0cmVzZXQ6IGZ1bmN0aW9uICh0YXJnZXRQb3NpdGlvbiwgc291cmNlUG9zaXRpb24pe1xuXHRcdHZhciBfYm91bmQgPSB0aGlzLl9fY2FsY3VsYXRlU1ZHQm91bmQodGFyZ2V0UG9zaXRpb24sIHNvdXJjZVBvc2l0aW9uKTtcblx0XHRpZihfYm91bmQpe1xuXHRcdFx0aWYoX2JvdW5kLmxlZnQgPT0gMCAmJiBfYm91bmQudG9wID09MCl7XG5cdFx0XHRcdF9ib3VuZC53aWR0aCA9IDA7XG5cdFx0XHRcdF9ib3VuZC5oZWlnaHQgPSAwO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHN2Z1N0eWxlOiBfYm91bmQgfSk7XG5cdFx0fVxuXHR9LFxuXHRfX2dldERpcmVjdGlvbjogZnVuY3Rpb24gKHgsIHksIHgxLCB5MSl7XG4gICAgICAgIHZhciBmbGFnID0gMDtcbiAgICAgICAgdmFyIHggPSAoKHggLSB4MSkgPD0gMCkgPyB4IDogeDE7XG4gICAgICAgIHZhciB5ID0gKCh5IC0geTEpIDw9IDApID8geSA6IHkxO1xuICAgICAgICBpZiAoeCAhPSB4MSAmJiB5ICE9IHkxKSB7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCA9PSB4MSAmJiB5ICE9IHkxKSB7XG4gICAgICAgICAgICBmbGFnID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCA9PSB4MSAmJiB5ID09IHkxKSB7XG4gICAgICAgICAgICBmbGFnID0gMztcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAhPSB4MSAmJiB5ID09IHkxKSB7XG4gICAgICAgICAgICBmbGFnID0gNDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxhZztcbiAgICB9LFxuXHRoaWdoTGlnaHQ6IGZ1bmN0aW9uIChoaWdoTGlnaHQpe1xuXHRcdHZhciBfbGluZVN0eWxlID0ge307XG5cdFx0aWYoaGlnaExpZ2h0KXtcblx0XHRcdF9saW5lU3R5bGUgPSB0aGlzLnByb3BzLmhpZ2hMaWdodFN0eWxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfbGluZVN0eWxlID0gdGhpcy5wcm9wcy5saW5lU3R5bGU7XG5cdFx0fVxuXHRcdHRoaXMuX2hpZ2hMaWdodCA9IGhpZ2hMaWdodDtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGxpbmVTdHlsZTogX2xpbmVTdHlsZVxuXHRcdH0pO1xuXHR9LFxuICAgIF9fY2FsY3VsYXRlU1ZHQm91bmQ6IGZ1bmN0aW9uICh0YXJnZXRQb3NpdGlvbiwgc291cmNlUG9zaXRpb24pe1xuXHRcdHZhciBfeHkxID0gdGFyZ2V0UG9zaXRpb24gfHwgKCEhdGhpcy5fdGFyZ2V0JiZ0aGlzLl90YXJnZXQuZ2V0Q2VudGVyWFkoKSk7XG5cdFx0dmFyIF94eTIgPSBzb3VyY2VQb3NpdGlvbiB8fCAoISF0aGlzLl9zb3VyY2UmJnRoaXMuX3NvdXJjZS5nZXRDZW50ZXJYWSgpKTtcblx0XHRpZighX3h5MSB8fCAhX3h5MikgeyByZXR1cm47IH1cblx0XHR2YXIgX21pblNpemUgPSB0aGlzLnByb3BzLm1pblNpemUgfHwgMTAsXG4gICAgICAgICAgICBfZGlyID0gdGhpcy5fX2dldERpcmVjdGlvbihfeHkxLngsIF94eTEueSwgX3h5Mi54LCBfeHkyLnkpO1xuXG4gICAgICAgIHZhciBfeCA9IDAsIF95ID0gMCwgX3dpZHRoID0gMCwgX2hlaWdodCA9IDA7XG4gICAgICAgIHZhciBfeDEgPSAwLCBfeTEgPSAwLCBfeDIgPSAwLCBfeTIgPSAwO1xuICAgICAgICBzd2l0Y2goX2Rpcil7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX3ggPSBfeHkxLng7XG4gICAgICAgICAgICAgICAgX3kgPSBfeHkxLnk7XG4gICAgICAgICAgICAgICAgX3dpZHRoID0gX3h5Mi54IC0gX3h5MS54O1xuICAgICAgICAgICAgICAgIF9oZWlnaHQgPSBfeHkyLnkgLSBfeHkxLnk7XG5cblx0XHRcdFx0KF93aWR0aDxfbWluU2l6ZSkmJihfd2lkdGggPSBfbWluU2l6ZSk7XG5cdFx0XHRcdChfaGVpZ2h0PF9taW5TaXplKSYmKF9oZWlnaHQgPSBfbWluU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBfeDEgPSAwO1xuICAgICAgICAgICAgICAgIF95MSA9IDA7XG4gICAgICAgICAgICAgICAgX3gyID0gX3dpZHRoO1xuICAgICAgICAgICAgICAgIF95MiA9IF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgX3ggPSBfeHkyLng7XG4gICAgICAgICAgICAgICAgX3kgPSBfeHkxLnk7XG4gICAgICAgICAgICAgICAgX3dpZHRoID0gX3h5MS54IC0gX3h5Mi54O1xuICAgICAgICAgICAgICAgIF9oZWlnaHQgPSBfeHkyLnkgLSBfeHkxLnk7XG5cblx0XHRcdFx0KF93aWR0aDxfbWluU2l6ZSkmJihfd2lkdGggPSBfbWluU2l6ZSk7XG5cdFx0XHRcdChfaGVpZ2h0PF9taW5TaXplKSYmKF9oZWlnaHQgPSBfbWluU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBfeDEgPSAwO1xuICAgICAgICAgICAgICAgIF95MSA9IF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgX3gyID0gX3dpZHRoO1xuICAgICAgICAgICAgICAgIF95MiA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgX3ggPSBfeHkyLng7XG4gICAgICAgICAgICAgICAgX3kgPSBfeHkyLnk7XG4gICAgICAgICAgICAgICAgX3dpZHRoID0gX3h5MS54IC0gX3h5Mi54O1xuICAgICAgICAgICAgICAgIF9oZWlnaHQgPSBfeHkxLnkgLSBfeHkyLnk7XG5cblx0XHRcdFx0KF93aWR0aDxfbWluU2l6ZSkmJihfd2lkdGggPSBfbWluU2l6ZSk7XG5cdFx0XHRcdChfaGVpZ2h0PF9taW5TaXplKSYmKF9oZWlnaHQgPSBfbWluU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBfeDEgPSAwO1xuICAgICAgICAgICAgICAgIF95MSA9IDA7XG4gICAgICAgICAgICAgICAgX3gyID0gX3dpZHRoO1xuICAgICAgICAgICAgICAgIF95MiA9IF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgX3ggPSBfeHkxLng7XG4gICAgICAgICAgICAgICAgX3kgPSBfeHkyLnk7XG4gICAgICAgICAgICAgICAgX3dpZHRoID0gX3h5Mi54IC0gX3h5MS54O1xuICAgICAgICAgICAgICAgIF9oZWlnaHQgPSBfeHkxLnkgLSBfeHkyLnk7XG5cblx0XHRcdFx0KF93aWR0aDxfbWluU2l6ZSkmJihfd2lkdGggPSBfbWluU2l6ZSk7XG5cdFx0XHRcdChfaGVpZ2h0PF9taW5TaXplKSYmKF9oZWlnaHQgPSBfbWluU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICBfeDEgPSAwO1xuICAgICAgICAgICAgICAgIF95MSA9IF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgX3gyID0gX3dpZHRoO1xuICAgICAgICAgICAgICAgIF95MiA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0eDE6IF94MSxcblx0XHRcdHkxOiBfeTEsXG5cdFx0XHR4MjogX3gyLFxuXHRcdFx0eTI6IF95MlxuXHRcdH0pO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmRyYXdMaW5lQXJyb3coX3gxLCBfeTEsIF94MiwgX3kyKSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGVmdDogX3gsXG5cdFx0XHR0b3A6IF95LFxuXHRcdFx0d2lkdGg6IF93aWR0aCxcblx0XHRcdGhlaWdodDogX2hlaWdodFxuXHRcdH07XG4gICAgfSxcblx0ZHJhd0xpbmVBcnJvdzogZnVuY3Rpb24gKHgxLHkxLHgyLHkyKXtcblx0XHR2YXIgcGF0aDtcbiAgICAgIFx0dmFyIHNsb3B5LGNvc3ksc2lueTtcbiAgICAgIFx0dmFyIFBhcj0xMC4wO1xuICAgICAgXHR2YXIgeDMseTM7XG4gICAgICBcdHNsb3B5PU1hdGguYXRhbjIoKHkxLXkyKSwoeDEteDIpKTtcbiAgICAgIFx0Y29zeT1NYXRoLmNvcyhzbG9weSk7XG4gICAgICBcdHNpbnk9TWF0aC5zaW4oc2xvcHkpO1xuXG4gICAgICBcdHBhdGg9XCJNXCIreDErXCIsXCIreTErXCIgTFwiK3gyK1wiLFwiK3kyO1xuXG4gICAgICBcdHgzPShOdW1iZXIoeDEpK051bWJlcih4MikpLzI7XG4gICAgICBcdHkzPShOdW1iZXIoeTEpK051bWJlcih5MikpLzI7XG5cbiAgICAgIFx0cGF0aCArPVwiIE1cIit4MytcIixcIit5MztcblxuICAgICAgXHRwYXRoICs9XCIgTFwiKyhOdW1iZXIoeDMpK051bWJlcihQYXIqY29zeS0oUGFyLzIuMCpzaW55KSkpK1wiLFwiKyhOdW1iZXIoeTMpK051bWJlcihQYXIqc2lueSsoUGFyLzIuMCpjb3N5KSkpO1xuXG4gICAgICBcdHBhdGggKz1cIiBNXCIrKE51bWJlcih4MykrTnVtYmVyKFBhcipjb3N5K1Bhci8yLjAqc2lueSkrXCIsXCIrIChOdW1iZXIoeTMpLU51bWJlcihQYXIvMi4wKmNvc3ktUGFyKnNpbnkpKSk7XG4gICAgICBcdHBhdGggKz1cIiBMXCIreDMrXCIsXCIreTM7XG5cbiAgICAgIFx0cmV0dXJuIHBhdGg7XG5cdH0sXG5cdF9fZ2V0UGF0aDogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG5cdFx0cmV0dXJuIFwiTVwiICsgX3N0YXRlLngxICsgXCIsXCIgKyBfc3RhdGUueTEgKyBcIiBMXCIgKyAoX3N0YXRlLngxICsgX3N0YXRlLngyKS8yICsgXCIsXCIgKyAoX3N0YXRlLnkxICsgX3N0YXRlLnkyKS8yICsgXCIgTFwiICsgX3N0YXRlLngyICsgXCIsXCIgKyBfc3RhdGUueTI7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdC8qXG5cdFx0PGRlZnM+XG5cdFx0XHQ8bWFya2VyIGlkPVwiYXJyb3dcIiBtYXJrZXJXaWR0aD1cIjEwXCIgbWFya2VySGVpZ2h0PVwiMTBcIiByZWZ4PVwiMFwiIHJlZnk9XCIzXCIgb3JpZW50PVwiYXV0b1wiIG1hcmtlclVuaXRzPVwic3Ryb2tlV2lkdGhcIj5cblx0XHRcdFx0PHBhdGggZD1cIk0wLDAgTDAsNiBMOSwzIHpcIiBmaWxsPVwiI2YwMFwiIC8+XG5cdFx0XHQ8L21hcmtlcj5cblx0XHQ8L2RlZnM+XG5cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cInpyLWxpbmtcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPXt0aGlzLnN0YXRlLnN2Z1N0eWxlfT5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0PG1hcmtlciBpZD1cIlRyaWFuZ2xlXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJlZlg9XCIwXCIgcmVmWT1cIjEwXCIgbWFya2VyVW5pdHM9XCJzdHJva2VXaWR0aFwiIG1hcmtlcldpZHRoPVwiMjBcIiBtYXJrZXJIZWlnaHQ9XCIyMFwiIG9yaWVudD1cImF1dG9cIj5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNIDAgMCBMIDIwIDEwIEwgMCAyMCB6XCIvPlxuXHRcdFx0XHRcdDwvbWFya2VyPlxuXHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdDxwYXRoIGNsYXNzTmFtZT1cImxpbmVcIiBkPXsnTSAnK3RoaXMuc3RhdGUueDErJyAnKyB0aGlzLnN0YXRlLnkxICsnIEwgJyArIHRoaXMuc3RhdGUueDIgKyAnICcgKyB0aGlzLnN0YXRlLnkyfSBzdHJva2U9XCJyZWRcIiBtYXJrZXJNaWQ9J1RyaWFuZ2xlJy8+XG5cdFx0XHQgPC9zdmc+XG5cdFx0XHQgPGxpbmUgY2xhc3NOYW1lPVwibGluZVwiIG1hcmtlckVuZD1cInVybCgjYW5jZXN0b3ItYXJyb3cpXCIgeDE9e3RoaXMuc3RhdGUueDF9IHkxPXt0aGlzLnN0YXRlLnkxfSB4Mj17dGhpcy5zdGF0ZS54Mn0geTI9e3RoaXMuc3RhdGUueTJ9IHN0eWxlPXt0aGlzLnN0YXRlLmxpbmVTdHlsZX0+PC9saW5lPlxuXHRcdCk7XG5cdFx0Ki9cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cInpyLWdyYXBoLWxpbmtcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPXt6bnVpLnJlYWN0LnN0eWxlKHRoaXMuc3RhdGUuc3ZnU3R5bGUpfT5cblx0XHRcdFx0PG1hcmtlciBpZD1cImFuY2VzdG9yLWFycm93XCIgbWFya2VyVW5pdHM9XCJzdHJva2VXaWR0aFwiIG1hcmtlcldpZHRoPVwiMTJcIiBtYXJrZXJIZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMTIgMTJcIiByZWZYPVwiMzVcIiByZWZZPVwiNlwiIG9yaWVudD1cImF1dG9cIj5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTIsMiBMMTIsNiBMMiwxMCBMNCw2IEwyLDJcIiBmaWxsPVwiIzM4ZlwiPjwvcGF0aD5cblx0XHRcdFx0PC9tYXJrZXI+XG5cdFx0XHRcdDxwYXRoIGNsYXNzTmFtZT1cImxpbmUgYW5jZXN0b3Igcm9vdFwiIGQ9e3RoaXMuX19nZXRQYXRoKCl9IG1hcmtlck1pZD1cInVybCgjYW5jZXN0b3ItYXJyb3cpXCIgc3R5bGU9e3RoaXMuc3RhdGUubGluZVN0eWxlfT48L3BhdGg+XG5cdFx0XHQ8L3N2Zz5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBMaW5rID0gcmVxdWlyZSgnLi9MaW5rJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonTm9kZScsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRyYWdnYWJsZTogdHJ1ZSxcblx0XHRcdGVkaXRhYmxlOiB0cnVlLFxuXHRcdFx0ZGF0YToge30sXG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogMFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcblx0XHR0aGlzLl9saW5rcyA9IHt9O1xuXHRcdHRoaXMuX25vZGVzID0ge307XG5cdFx0cmV0dXJuIHtcblx0XHRcdHV1aWQ6IHRoaXMucHJvcHMuaWQgfHwgem4udXVpZCgpLFxuXHRcdFx0aGlnaExpZ2h0OiBmYWxzZVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgX3NvdXJjZSA9IHRoaXMuX2RvbTtcblx0XHR0aGlzLl94ID0gdGhpcy5wcm9wcy54O1xuXHRcdHRoaXMuX3kgPSB0aGlzLnByb3BzLnk7XG5cdFx0dGhpcy5fcGFyZW50UG9zaXRpb24gPSB6bi5kb20uZ2V0UG9zaXRpb24odGhpcy5fZG9tLnBhcmVudE5vZGUpO1xuXHRcdGlmKHRoaXMucHJvcHMuZHJhZ2dhYmxlKXtcblx0XHRcdHpuLmRyYWdnYWJsZS5jcmVhdGUoX3NvdXJjZSwge1xuXHRcdFx0XHRzdGFydDogW3RoaXMucHJvcHMueCwgdGhpcy5wcm9wcy55XSxcblx0XHRcdFx0b25EcmFnU3RhcnQ6IHRoaXMuX19vbk5vZGVEcmFnU3RhcnQsXG5cdFx0XHRcdG9uRHJhZzogdGhpcy5fX29uTm9kZURyYWcsXG5cdFx0XHRcdG9uRHJhZ0VuZDogdGhpcy5fX29uTm9kZURyYWdFbmRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHpuLmRvbS5vbihfc291cmNlLCAnbW91c2VvdmVyJywgdGhpcy5fX29uTW91c2VPdmVyKTtcblx0XHR6bi5kb20ub24oX3NvdXJjZSwgJ21vdXNlb3V0JywgdGhpcy5fX29uTW91c2VPdXQpO1xuXG5cdFx0dGhpcy5wcm9wcy5vbk5vZGVEaWRNb3VudCAmJiB0aGlzLnByb3BzLm9uTm9kZURpZE1vdW50KHRoaXMpO1xuXHR9LFxuXHRnZXRDZW50ZXJYWTogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9wb3NpdGlvbiA9ICB6bi5kb20uZ2V0UG9zaXRpb24odGhpcy5fZG9tKTtcblx0ICAgIHZhciBfaGFsZldpZHRoID0gX3Bvc2l0aW9uLndpZHRoIC8gMi4wLFxuXHQgICAgICAgIF9oYWxmSGVpZ2h0ID0gX3Bvc2l0aW9uLmhlaWdodCAvIDIuMCxcblx0ICAgICAgICBfeCA9IDAsIF95ID0gMDtcblxuXHRcdGlmKCF0aGlzLnByb3BzLmRyYWdnYWJsZSl7XG5cdFx0XHRfeCA9IF9wb3NpdGlvbi54IC0gdGhpcy5fcGFyZW50UG9zaXRpb24ueCArIF9oYWxmV2lkdGg7XG5cdFx0XHRfeSA9IF9wb3NpdGlvbi55IC0gdGhpcy5fcGFyZW50UG9zaXRpb24ueSArIF9oYWxmSGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfeCA9IHRoaXMuX3ggKyBfaGFsZldpZHRoO1xuXHQgICAgICAgIF95ID0gdGhpcy5feSArIF9oYWxmSGVpZ2h0O1xuXHRcdFx0aWYodGhpcy5wcm9wcy5wYXJlbnQpe1xuXHRcdFx0XHRfeCA9IF94ICsgdGhpcy5wcm9wcy5wYXJlbnQuX3g7XG5cdFx0XHRcdF95ID0gX3kgKyB0aGlzLnByb3BzLnBhcmVudC5feTtcblx0XHRcdH1cblx0XHR9XG5cblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgeDogX3gsXG5cdCAgICAgICAgeTogX3lcblx0ICAgIH07XG5cdH0sXG4gICAgc2V0TGluazogZnVuY3Rpb24gKGlkLCBsaW5rKXtcbiAgICAgICAgdGhpcy5fbGlua3NbaWRdID0gbGluaztcbiAgICB9LFxuICAgIGdldExpbms6IGZ1bmN0aW9uIChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5rc1tpZF07XG4gICAgfSxcbiAgICBkZWxldGVMaW5rOiBmdW5jdGlvbiAoaWQpe1xuICAgICAgICB0aGlzLl9saW5rc1tpZF0gPSBudWxsO1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlua3NbaWRdO1xuICAgIH0sXG5cdHNldE5vZGU6IGZ1bmN0aW9uIChrZXksIG5vZGUpe1xuXHRcdHRoaXMuX25vZGVzW2tleV0gPSBub2RlO1xuXHR9LFxuXHRhZGROb2RlOiBmdW5jdGlvbiAobm9kZSl7XG5cdFx0dmFyIF9ub2RlID0gbnVsbDtcblxuXHRcdGlmKG5vZGUpe1xuXHRcdFx0X25vZGUgPSA8Tm9kZSB7Li4ubm9kZX0vPjtcblx0XHRcdHRoaXMuX25vZGVzW19ub2RlLnN0YXRlLnV1aWRdID0gX25vZGU7XG5cdFx0XHRSZWFjdC5yZW5kZXIoX25vZGUsIHRoaXMuX2RvbSk7XG5cdFx0fVxuXHR9LFxuXHRfX29uTm9kZURyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50LCBkYXRhKXtcblx0XHR2YXIgX2RvbSA9IHRoaXMuX2RvbTtcblx0XHR0aGlzLl9vbGRaSW5kZXggPSBfZG9tLnN0eWxlLnpJbmRleDtcbiAgICAgICAgX2RvbS5zdHlsZS56SW5kZXggPSAxMDtcblx0XHR0aGlzLl9zdGFydFZlY3RvciA9IHtcblx0XHRcdHg6IGRhdGEubW91c2VYLFxuXHRcdFx0eTogZGF0YS5tb3VzZVlcblx0XHR9XG5cdFx0aWYoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdtYW51YWwtY29ubmVjdCcpIT0tMSl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fX2NyZWF0ZUxpbmUoZXZlbnQsIGRhdGEpLCBmYWxzZTtcblx0XHR9XG5cdH0sXG5cdF9fY3JlYXRlTGluZTogZnVuY3Rpb24gKGV2ZW50LCBkYXRhKXtcblx0XHRpZighdGhpcy5fZHJhZ1RlbXApe1xuXHRcdFx0dmFyIF9zZWxmID0gdGhpcztcblx0XHRcdHZhciBfZHJhZ1RlbXAgPSB0aGlzLl9kcmFnVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0X2RyYWdUZW1wLmNsYXNzTmFtZSA9IFwienItZ3JhcGgtbm9kZS1saW5lLXRlbXBcIjtcblx0XHRcdHpuLmRvbS5zZXRTdHlsZXModGhpcy5fZHJhZ1RlbXAsIHtcblx0XHRcdFx0d2lkdGg6IDgsXG5cdFx0XHRcdGhlaWdodDogOCxcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiA1LFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjODAwMDEwJ1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciBfc3RhcnQgPSB0aGlzLmdldENlbnRlclhZKCksXG5cdFx0XHRcdF9zdGFydE1vdXNlID0gem4uZG9tLmdldFBvc2l0aW9uKGV2ZW50LnRhcmdldCksXG5cdFx0XHRcdF9iYXNlUG9zaXRpb24gPSB0aGlzLl9wYXJlbnRQb3NpdGlvbjtcblx0XHRcdHZhciBfdGVtcCA9IHRoaXMucHJvcHMuY2FudmFzLnJlZnMudGVtcDtcblx0XHRcdHpuLmRyYWdnYWJsZS5jcmVhdGUodGhpcy5fZHJhZ1RlbXAsIHtcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxuXHRcdFx0XHRzdGFydDogW19zdGFydE1vdXNlLngsIF9zdGFydE1vdXNlLnldLFxuXHRcdFx0XHRvbkRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50LCBkYXRhKXtcblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkRyYWc6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cdFx0XHRcdFx0dmFyIF9tb3VzZSA9IHpuLmRvbS5nZXRQb3NpdGlvbihfZHJhZ1RlbXApO1xuXHRcdFx0XHRcdF90ZW1wLnJlc2V0KF9zdGFydCwge1xuXHRcdFx0XHRcdFx0eDogX21vdXNlLnggLSBfYmFzZVBvc2l0aW9uLngsXG5cdFx0XHRcdFx0XHR5OiBfbW91c2UueSAtIF9iYXNlUG9zaXRpb24ueVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkRyYWdFbmQ6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cdFx0XHRcdFx0X3NlbGYuY2xlYXJUZW1wTGluaygpO1xuXHRcdFx0XHRcdHZhciBfdXVpZCA9IF9zZWxmLmZpbmROb2RlLmNhbGwoX3NlbGYsIGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZGF0YS5tb3VzZVgsIGRhdGEubW91c2VZKSk7XG5cdFx0XHRcdFx0aWYoX3V1aWQpe1xuXHRcdFx0XHRcdFx0aWYoX3V1aWQhPT1fc2VsZi5nZXRJZCgpKXtcblx0XHRcdFx0XHRcdFx0X3NlbGYucHJvcHMuY2FudmFzLmFkZExpbmsoX3NlbGYuZ2V0SWQoKSwgX3V1aWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdF9zZWxmLnByb3BzLm9uTm9kZUVkaXREcmFnRW5kICYmIF9zZWxmLnByb3BzLm9uTm9kZUVkaXREcmFnRW5kKF9zZWxmLCBkYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9kcmFnVGVtcCk7XG5cdFx0fVxuXHR9LFxuXHRmaW5kTm9kZTogZnVuY3Rpb24gKGRvbSl7XG5cdFx0aWYoIWRvbXx8ZG9tPT09ZG9jdW1lbnQuYm9keSl7IHJldHVybjsgfVxuXHRcdHZhciBfY2xhc3NOYW1lID0gZG9tLmNsYXNzTmFtZTtcblx0XHRpZighX2NsYXNzTmFtZSl7IHJldHVybiB0aGlzLmZpbmROb2RlKGRvbS5wYXJlbnROb2RlKTsgfVxuXHRcdGlmKF9jbGFzc05hbWUgPT0gJ3pyLWdyYXBoLWZsb3ctY2FudmFzJyl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmKCFfY2xhc3NOYW1lLmluZGV4T2Ype1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZihfY2xhc3NOYW1lLmluZGV4T2YoJ3pyLWdyYXBoLW5vZGUnKSAhPT0gLTEpe1xuXHRcdFx0cmV0dXJuIGRvbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmluZE5vZGUoZG9tLnBhcmVudE5vZGUpO1xuXHRcdH1cblx0fSxcblx0Y2xlYXJUZW1wTGluazogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5fZHJhZ1RlbXApe1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9kcmFnVGVtcCk7XG5cdFx0XHR0aGlzLl9kcmFnVGVtcCA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMuY2FudmFzLnJlZnMudGVtcC5yZXNldCh7eDowLHk6MH0sIHt4OjAseTowfSk7XG5cdH0sXG5cdF9fb25Db25uZWN0TW91c2VVcDogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5jbGVhclRlbXBMaW5rKCk7XG5cdH0sXG5cdF9fb25Ob2RlRHJhZ0VuZDogZnVuY3Rpb24gKGV2ZW50LCBkYXRhKXtcblx0XHR2YXIgX2R4ID0gTWF0aC5hYnModGhpcy5fc3RhcnRWZWN0b3IueCAtIGRhdGEubW91c2VYKSxcblx0XHRcdF9keSA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0VmVjdG9yLnkgLSBkYXRhLm1vdXNlWSk7XG5cblx0XHRpZih0aGlzLl9kb20pe1xuXHRcdFx0dGhpcy5fZG9tLnN0eWxlLnpJbmRleCA9IHRoaXMuX29sZFpJbmRleDtcblx0XHR9XG5cdFx0aWYoX2R4PDUmJl9keTw1KXtcblx0XHRcdHRoaXMucHJvcHMub25DbGljayAmJiB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQsIHRoaXMpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uTm9kZURyYWdFbmQgJiYgdGhpcy5wcm9wcy5vbk5vZGVEcmFnRW5kKGV2ZW50LCBkYXRhLCB0aGlzKTtcblx0fSxcblx0X19vbk5vZGVEcmFnOiBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpe1xuXHRcdHRoaXMuX3ggPSBkYXRhLmN1cnJYO1xuXHRcdHRoaXMuX3kgPSBkYXRhLmN1cnJZO1xuXHRcdHRoaXMuX19vbkxpbmtSZXNldCgpO1xuICAgICAgICB0aGlzLl9fc2NhbkNoaWxkKCk7XG5cdFx0ISF0aGlzLm9uTm9kZURyYWcgJiYgdGhpcy5vbk5vZGVEcmFnKGV2ZW50LCBkYXRhKTtcblx0fSxcblx0X19vbkxpbmtSZXNldDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfbGlua3MgPSB0aGlzLl9saW5rcztcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gX2xpbmtzKXtcbiAgICAgICAgICAgIF9saW5rc1trZXldLnJlc2V0KCk7XG4gICAgICAgIH1cblx0fSxcblx0X19zY2FuQ2hpbGQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX25vZGVzID0gdGhpcy5fbm9kZXM7XG4gICAgICAgIGZvcih2YXIga2V5IGluIF9ub2Rlcyl7XG4gICAgICAgICAgICBfbm9kZXNba2V5XS5fX29uTGlua1Jlc2V0KCk7XG4gICAgICAgIH1cblx0fSxcblx0aGlnaExpZ2h0OiBmdW5jdGlvbiAoaGlnaExpZ2h0KXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhpZ2hMaWdodDogKGhpZ2hMaWdodCE9PXVuZGVmaW5lZD9oaWdoTGlnaHQ6dHJ1ZSlcblx0XHR9KTtcblx0fSxcblx0X19vbk1vdXNlT3ZlcjogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRmb3IodmFyIGtleSBpbiB0aGlzLl9saW5rcyl7XG5cdFx0XHR0aGlzLl9saW5rc1trZXldLmhpZ2hMaWdodCh0cnVlKTtcblx0XHR9XG5cdH0sXG5cdF9fb25Nb3VzZU91dDogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRmb3IodmFyIGtleSBpbiB0aGlzLl9saW5rcyl7XG5cdFx0XHR0aGlzLl9saW5rc1trZXldLmhpZ2hMaWdodChmYWxzZSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGlnaExpZ2h0OiBmYWxzZVxuXHRcdH0pO1xuXHR9LFxuXHRfX2VkaXRhYmxlUmVuZGVyOiBmdW5jdGlvbiAoKXtcblx0XHRpZih0aGlzLnByb3BzLmVkaXRhYmxlKXtcblx0XHRcdHJldHVybiA8aSBjbGFzc05hbWU9XCJtYW51YWwtY29ubmVjdFwiIG9uTW91c2VVcD17dGhpcy5fX29uQ29ubmVjdE1vdXNlVXB9IC8+O1xuXHRcdH1cblx0fSxcblx0X19vbkRvbUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpe1xuXHRcdFxuXHR9LFxuXHRfX29uQ29udGV4dE1lbnU6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMub25Db250ZXh0TWVudSAmJiB0aGlzLnByb3BzLm9uQ29udGV4dE1lbnUoZXZlbnQsIHRoaXMpO1xuXHR9LFxuXHRnZXRJZDogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUudXVpZDtcblx0fSxcblx0cmVuZGVyOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXsocmVmKT0+dGhpcy5fZG9tID0gcmVmfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cblx0XHRcdFx0Y2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZSgnenItZ3JhcGgtbm9kZScsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cblx0XHRcdFx0ZGF0YS1pZD17dGhpcy5nZXRJZCgpfVxuXHRcdFx0XHRkYXRhLWhpZ2hsaWdodD17dGhpcy5zdGF0ZS5oaWdoTGlnaHR9XG5cdFx0XHRcdGRhdGEtc2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWR9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuX19vbkRvbUNsaWNrfVxuXHRcdFx0XHRvbkNvbnRleHRNZW51PXt0aGlzLl9fb25Db250ZXh0TWVudX0gPlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5yZW5kZXIgJiYgdGhpcy5wcm9wcy5yZW5kZXIodGhpcy5wcm9wcy5kYXRhLCB0aGlzKX1cblx0XHRcdFx0e3RoaXMuX19lZGl0YWJsZVJlbmRlcigpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnTm9kZSc6IHJlcXVpcmUoJy4vTm9kZScpLFxuICAgICdMaW5rJzogcmVxdWlyZSgnLi9MaW5rJyksXG4gICAgJ0Zsb3dDYW52YXMnOiByZXF1aXJlKCcuL0Zsb3dDYW52YXMnKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RET01cIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==