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
    zn.debug('FlowCanvas data: ', this.state);
    return React.createElement("div", {
      className: znui.react.classname("zr-graph-flow-canvas", this.props.className),
      style: this.props.style
    }, (this.state.nodes || []).map(function (node, index) {
      var _this = this;

      node.id = node.id || zn.uuid();
      return React.createElement(Node, _extends({}, node, {
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
      return React.createElement(Link, _extends({}, link, {
        key: link.id,
        render: this.props.linkRender,
        onLinkDidMount: this.__onLinkDidMount
      }));
    }.bind(this)), React.createElement(Link, {
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

var React = znui.React || __webpack_require__(/*! react */ "react");

module.exports = React.createClass({
  displayName: 'Link',
  getDefaultProps: function getDefaultProps() {
    return {
      highLightStyle: {
        'stroke': '#f0ad4e',
        'strokeWidth': '1px'
      },
      lineStyle: {
        'stroke': '#E26965',
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

    var _minSize = this.props.minSize || 2,
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
    );
    */
    return React.createElement("svg", {
      className: "zr-graph-link",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: this.state.svgStyle
    }, React.createElement("defs", null, React.createElement("marker", {
      id: "Triangle",
      markerWidth: "20",
      markerHeight: "20",
      refX: "0",
      refY: "4",
      orient: "auto",
      markerUnits: "strokeWidth",
      viewBox: "0 0 50 50"
    }, React.createElement("path", {
      d: "M0,0 L0,6 L9,3 z",
      fill: "#f00"
    }))), React.createElement("line", {
      className: "line",
      markerStart: "url(#Triangle)",
      x1: this.state.x1,
      y1: this.state.y1,
      x2: this.state.x2,
      y2: this.state.y2,
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
    var _source = this._dom,
        _self = this;

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
    var _node = null,
        _key;

    if (node) {
      _node = React.createElement(Node, node);
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

    if (_className.indexOf('zr-node') !== -1) {
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
      return React.createElement("i", {
        className: "manual-connect",
        onMouseUp: this.__onConnectMouseUp
      });
    }
  },
  __onContextMenu: function __onContextMenu(event) {
    event.stopPropagation();
    return this.props.onContextMenu && this.props.onContextMenu(event, this);
  },
  getId: function getId() {
    return this.state.uuid;
  },
  render: function render() {
    var _this = this;

    return React.createElement("div", {
      ref: function ref(_ref) {
        return _this._dom = _ref;
      },
      style: this.props.style,
      className: znui.react.classname('zr-graph-node', this.props.className),
      "data-id": this.getId(),
      "data-highlight": this.state.highLight,
      "data-selected": this.props.selected,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vRmxvd0NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9MaW5rLmpzIiwid2VicGFjazovLy8uL05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIl0sIm5hbWVzIjpbIlJlYWN0Iiwiem51aSIsInJlcXVpcmUiLCJSZWFjdERPTSIsIk5vZGUiLCJMaW5rIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUNsYXNzIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJub2RlcyIsImxpbmtzIiwiY29tcG9uZW50RGlkTW91bnQiLCJfZG9tIiwiZmluZERPTU5vZGUiLCJzZXREYXRhIiwicHJvcHMiLCJkYXRhIiwiX19pbml0RHJhZ0Ryb3AiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJ0YXJnZXQiLCJvbmRyYWdvdmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRHJhZ092ZXIiLCJiaW5kIiwib25kcmFnZW50ZXIiLCJvbkRyYWdFbnRlciIsIm9uZHJvcCIsIm9uRHJvcCIsIkpTT04iLCJwYXJzZSIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJfX29uTm9kZURpZE1vdW50Iiwibm9kZSIsIl9ub2RlcyIsImdldElkIiwiX19vbk5vZGVEcmFnIiwiX19vbk5vZGVEcmFnRW5kIiwiX2RhdGEiLCJzdGF0ZSIsImluZGV4IiwieCIsImN1cnJYIiwieSIsImN1cnJZIiwib25Ob2RlRHJhZ0VuZCIsIl9fb25MaW5rRGlkTW91bnQiLCJsaW5rIiwiX3RhcmdldCIsIl9zb3VyY2UiLCJzb3VyY2UiLCJfbGlua3MiLCJzZXRUYXJnZXQiLCJzZXRTb3VyY2UiLCJyZXNldCIsIl9vYmoiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwic2V0U3RhdGUiLCJhZGRMaW5rIiwicHVzaCIsImZvcmNlVXBkYXRlIiwiZGVsZXRlTGluayIsInNwbGljZSIsImluZGV4T2YiLCJ1cGRhdGVOb2RlIiwibWFwIiwiaXRlbSIsImFkZE5vZGUiLCJmcm9tIiwiaWQiLCJ6biIsInV1aWQiLCJkZWxldGVOb2RlQnlJZCIsIl9ub2RlSWQiLCJmaWx0ZXIiLCJ1cGRhdGVOb2RlQnlJZCIsImluZm8iLCJmb3JFYWNoIiwiZXh0ZW5kIiwiZGVsZXRlTm9kZSIsImZpbHRlck5vZGUiLCJzZWFyY2hOb2RlIiwiaGFuZGxlciIsIl9fbm9kZXMiLCJzbGljZSIsIl9fb25Ob2RlQ2xpY2siLCJzZWxlY3ROb2RlIiwib25Ob2RlQ2xpY2siLCJyZW5kZXIiLCJkZWJ1ZyIsInJlYWN0IiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJub2RlQ2xhc3NOYW1lIiwiZWRpdGFibGUiLCJkcmFnZ2FibGUiLCJub2RlUmVuZGVyIiwib25Ob2RlQ29udGV4dE1lbnUiLCJvbk5vZGVFZGl0RHJhZ0VuZCIsImluc3RhbmNlIiwibGlua1JlbmRlciIsImdldERlZmF1bHRQcm9wcyIsImhpZ2hMaWdodFN0eWxlIiwibGluZVN0eWxlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJtYXJrZXIiLCJzdmdTdHlsZSIsInpJbmRleCIsImhpZ2hMaWdodCIsIm9uTGlua0RpZE1vdW50IiwidmFsdWUiLCJzZXRMaW5rIiwidGFyZ2V0UG9zaXRpb24iLCJzb3VyY2VQb3NpdGlvbiIsIl9ib3VuZCIsIl9fY2FsY3VsYXRlU1ZHQm91bmQiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJfX2dldERpcmVjdGlvbiIsImZsYWciLCJfbGluZVN0eWxlIiwiX2hpZ2hMaWdodCIsIl94eTEiLCJnZXRDZW50ZXJYWSIsIl94eTIiLCJfbWluU2l6ZSIsIm1pblNpemUiLCJfZGlyIiwiX3giLCJfeSIsIl93aWR0aCIsIl9oZWlnaHQiLCJfeDEiLCJfeTEiLCJfeDIiLCJfeTIiLCJkcmF3TGluZUFycm93IiwicGF0aCIsInNsb3B5IiwiY29zeSIsInNpbnkiLCJQYXIiLCJ4MyIsInkzIiwiTWF0aCIsImF0YW4yIiwiY29zIiwic2luIiwiTnVtYmVyIiwiX3NlbGYiLCJfcGFyZW50UG9zaXRpb24iLCJkb20iLCJnZXRQb3NpdGlvbiIsInBhcmVudE5vZGUiLCJjcmVhdGUiLCJzdGFydCIsIm9uRHJhZ1N0YXJ0IiwiX19vbk5vZGVEcmFnU3RhcnQiLCJvbkRyYWciLCJvbkRyYWdFbmQiLCJvbiIsIl9fb25Nb3VzZU92ZXIiLCJfX29uTW91c2VPdXQiLCJvbk5vZGVEaWRNb3VudCIsIl9wb3NpdGlvbiIsIl9oYWxmV2lkdGgiLCJfaGFsZkhlaWdodCIsInBhcmVudCIsImdldExpbmsiLCJzZXROb2RlIiwia2V5IiwiX25vZGUiLCJfa2V5IiwiX29sZFpJbmRleCIsIl9zdGFydFZlY3RvciIsIm1vdXNlWCIsIm1vdXNlWSIsIl9fY3JlYXRlTGluZSIsIl9kcmFnVGVtcCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFN0eWxlcyIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsIl9zdGFydCIsIl9zdGFydE1vdXNlIiwiX2Jhc2VQb3NpdGlvbiIsIl90ZW1wIiwiY2FudmFzIiwicmVmcyIsInRlbXAiLCJfbW91c2UiLCJjbGVhclRlbXBMaW5rIiwiX3V1aWQiLCJmaW5kTm9kZSIsImNhbGwiLCJlbGVtZW50RnJvbVBvaW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiX2NsYXNzTmFtZSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUNoaWxkIiwiX19vbkNvbm5lY3RNb3VzZVVwIiwiX2R4IiwiYWJzIiwiX2R5Iiwib25DbGljayIsIl9fb25MaW5rUmVzZXQiLCJfX3NjYW5DaGlsZCIsIm9uTm9kZURyYWciLCJ1bmRlZmluZWQiLCJfX2VkaXRhYmxlUmVuZGVyIiwiX19vbkNvbnRleHRNZW51Iiwic3RvcFByb3BhZ2F0aW9uIiwib25Db250ZXh0TWVudSIsInJl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QUFRQSxtQkFBTyxDQUFDLHlCQUFELENBRkY7QUFHYixnQkFBY0EsbUJBQU8sQ0FBQyxxQ0FBRDtBQUhSLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDQUEsYUFBYSxnQ0FBZ0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0EvQyxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSB6bnVpLlJlYWN0RE9NIHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKTtcbnZhciBMaW5rID0gcmVxdWlyZSgnLi9MaW5rJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRmxvd0NhbnZhcycsXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRub2RlczogW10sXG5cdFx0XHRsaW5rczogW11cblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5fZG9tID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMucHJvcHMuZGF0YSk7XG5cdFx0dGhpcy5fX2luaXREcmFnRHJvcCh0aGlzLl9kb20pO1xuXHR9LFxuXHRjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uIChwcmV2UHJvcHMsIHByZXZTdGF0ZSl7XG5cdFx0aWYocHJldlByb3BzLmRhdGEhPXRoaXMucHJvcHMuZGF0YSl7XG5cdFx0XHR0aGlzLnNldERhdGEodGhpcy5wcm9wcy5kYXRhKTtcblx0XHR9XG5cdH0sXG5cdF9faW5pdERyYWdEcm9wOiBmdW5jdGlvbiAodGFyZ2V0KXtcbiAgICAgICAgdGFyZ2V0Lm9uZHJhZ292ZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vY29uc29sZS5sb2coJ2RyYWctb3ZlcicpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRyYWdPdmVyICYmIHRoaXMucHJvcHMub25EcmFnT3ZlcihldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRhcmdldC5vbmRyYWdlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdkcmFnLWVudGVyJyk7XG5cdFx0XHR0aGlzLnByb3BzLm9uRHJhZ0VudGVyICYmIHRoaXMucHJvcHMub25EcmFnRW50ZXIoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICB0YXJnZXQub25kcm9wID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdHRoaXMucHJvcHMub25Ecm9wICYmIHRoaXMucHJvcHMub25Ecm9wKGV2ZW50LCBKU09OLnBhcnNlKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwiZGF0YVwiKXx8J3t9JykpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cdH0sXG5cdF9fb25Ob2RlRGlkTW91bnQ6IGZ1bmN0aW9uIChub2RlKXtcblx0XHR0aGlzLl9ub2Rlc1tub2RlLmdldElkKCldID0gbm9kZTtcblx0fSxcblx0X19vbk5vZGVEcmFnOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHRfX29uTm9kZURyYWdFbmQ6IGZ1bmN0aW9uIChldmVudCwgZGF0YSwgbm9kZSl7XG5cdFx0dmFyIF9kYXRhID0gdGhpcy5zdGF0ZS5ub2Rlc1tub2RlLnByb3BzLmluZGV4XTtcblx0XHRpZihfZGF0YSl7XG5cdFx0XHRfZGF0YS54ID0gZGF0YS5jdXJyWDtcblx0XHRcdF9kYXRhLnkgPSBkYXRhLmN1cnJZO1xuXHRcdFx0dGhpcy5wcm9wcy5vbk5vZGVEcmFnRW5kICYmIHRoaXMucHJvcHMub25Ob2RlRHJhZ0VuZChldmVudCwgZGF0YSwgbm9kZSk7XG5cdFx0fVxuXHR9LFxuXHRfX29uTGlua0RpZE1vdW50OiBmdW5jdGlvbiAobGluayl7XG5cdFx0dmFyIF90YXJnZXQgPSB0aGlzLl9ub2Rlc1tsaW5rLnByb3BzLnRhcmdldF0sXG5cdFx0XHRfc291cmNlID0gdGhpcy5fbm9kZXNbbGluay5wcm9wcy5zb3VyY2VdO1xuXHRcdHRoaXMuX2xpbmtzW2xpbmsuZ2V0SWQoKV0gPSBsaW5rO1xuXHRcdGxpbmsuc2V0VGFyZ2V0KF90YXJnZXQpO1xuXHRcdGxpbmsuc2V0U291cmNlKF9zb3VyY2UpO1xuXHRcdGxpbmsucmVzZXQoKTtcblx0fSxcblx0Z2V0RGF0YTogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5vZGVzOiB0aGlzLnN0YXRlLm5vZGVzLFxuXHRcdFx0bGlua3M6IHRoaXMuc3RhdGUubGlua3Ncblx0XHR9O1xuXHR9LFxuXHRzZXREYXRhOiBmdW5jdGlvbiAoZGF0YSl7XG5cdFx0aWYoZGF0YSl7XG5cdFx0XHR2YXIgX29iaiA9IHt9O1xuXHRcdFx0aWYoZGF0YS5ub2Rlcyl7XG5cdFx0XHRcdF9vYmoubm9kZXMgPSBkYXRhLm5vZGVzO1xuXHRcdFx0fVxuXHRcdFx0aWYoZGF0YS5saW5rcyl7XG5cdFx0XHRcdF9vYmoubGlua3MgPSBkYXRhLmxpbmtzO1xuXHRcdFx0fVxuXHRcdFx0aWYoT2JqZWN0LmtleXMoX29iaikubGVuZ3RoKXtcblx0XHRcdFx0dGhpcy5fbm9kZXMgPSB7fTtcblx0XHRcdFx0dGhpcy5fbGlua3MgPSB7fTtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZShfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblx0YWRkTGluazogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKXtcblx0XHR0aGlzLnN0YXRlLmxpbmtzLnB1c2goeyB0YXJnZXQ6IHRhcmdldCwgc291cmNlOiBzb3VyY2UgfSk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRkZWxldGVMaW5rOiBmdW5jdGlvbiAobGluayl7XG5cdFx0dGhpcy5zdGF0ZS5saW5rcy5zcGxpY2UodGhpcy5zdGF0ZS5saW5rcy5pbmRleE9mKGxpbmspLCAxKTtcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XG5cdH0sXG5cdHVwZGF0ZU5vZGU6IGZ1bmN0aW9uIChub2RlKXtcblx0XHR0aGlzLnN0YXRlLm5vZGVzLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpe1xuXHRcdFx0aWYobm9kZT09PWl0ZW0pe1xuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0pO1xuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0YWRkTm9kZTogZnVuY3Rpb24gKG5vZGUsIGZyb20pe1xuXHRcdG5vZGUuaWQgPSB6bi51dWlkKCk7XG5cdFx0dGhpcy5zdGF0ZS5ub2Rlcy5wdXNoKG5vZGUpO1xuXHRcdGlmKGZyb20pe1xuXHRcdFx0dGhpcy5zdGF0ZS5saW5rcy5wdXNoKHsgdGFyZ2V0OiBub2RlLmlkLCBzb3VyY2U6IGZyb20uZ2V0SWQoKSB9KTtcblx0XHR9XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRkZWxldGVOb2RlQnlJZDogZnVuY3Rpb24gKGlkKXtcblx0XHR2YXIgX25vZGVJZCA9IG51bGw7XG5cdFx0dGhpcy5zdGF0ZS5ub2RlcyA9IHRoaXMuc3RhdGUubm9kZXMuZmlsdGVyKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuXHRcdFx0aWYobm9kZS5pZCAhPT0gaWQpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRfbm9kZUlkID0gbm9kZS5pZDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYoX25vZGVJZCl7XG5cdFx0XHR0aGlzLnN0YXRlLmxpbmtzID0gdGhpcy5zdGF0ZS5saW5rcy5maWx0ZXIoZnVuY3Rpb24gKGxpbmssIGluZGV4KXtcblx0XHRcdFx0aWYobGluay5zb3VyY2UgPT0gX25vZGVJZCB8fCBsaW5rLnRhcmdldCA9PSBfbm9kZUlkKXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHR1cGRhdGVOb2RlQnlJZDogZnVuY3Rpb24gKGlkLCBpbmZvKXtcblx0XHR0aGlzLnN0YXRlLm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG5cdFx0XHRpZihub2RlLmlkID09PSBpZCl7XG5cdFx0XHRcdHpuLmV4dGVuZChub2RlLCBpbmZvKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcblx0fSxcblx0ZGVsZXRlTm9kZTogZnVuY3Rpb24gKG5vZGUpe1xuXHRcdHRoaXMuc3RhdGUubm9kZXMuc3BsaWNlKHRoaXMuc3RhdGUubm9kZXMuaW5kZXhPZihub2RlKSwgMSk7XG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xuXHR9LFxuXHRmaWx0ZXJOb2RlOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRub2RlczogdGhpcy5zdGF0ZS5ub2Rlcy5maWx0ZXIoZmlsdGVyfHxmdW5jdGlvbiAoKXt9KVxuXHRcdH0pO1xuXHR9LFxuXHRzZWFyY2hOb2RlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdGlmKCF0aGlzLl9fbm9kZXMpe1xuXHRcdFx0dGhpcy5fX25vZGVzID0gdGhpcy5zdGF0ZS5ub2Rlcy5zbGljZSgwKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IG5vZGVzOiB0aGlzLl9fbm9kZXMuZmlsdGVyKGhhbmRsZXIpIH0pO1xuXHR9LFxuXHRfX29uTm9kZUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUsIGRhdGEpe1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBzZWxlY3ROb2RlOiBkYXRhIH0pO1xuXHRcdHRoaXMucHJvcHMub25Ob2RlQ2xpY2sgJiYgdGhpcy5wcm9wcy5vbk5vZGVDbGljayhldmVudCwgbm9kZSwgZGF0YSwgdGhpcyk7XG5cdH0sXG5cdHJlbmRlcjpmdW5jdGlvbigpe1xuXHRcdHpuLmRlYnVnKCdGbG93Q2FudmFzIGRhdGE6ICcsIHRoaXMuc3RhdGUpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1ncmFwaC1mbG93LWNhbnZhc1wiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdCh0aGlzLnN0YXRlLm5vZGVzfHxbXSkubWFwKGZ1bmN0aW9uIChub2RlLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRub2RlLmlkID0gbm9kZS5pZCB8fCB6bi51dWlkKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gPE5vZGUgey4uLm5vZGV9XG5cdFx0XHRcdFx0XHRcdFx0XHRrZXk9e25vZGUuaWR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleD17aW5kZXh9XG5cdFx0XHRcdFx0XHRcdFx0XHRjYW52YXM9e3RoaXN9XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e3RoaXMucHJvcHMubm9kZUNsYXNzTmFtZX1cblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdE5vZGU9PT1ub2RlP3RydWU6ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZXx8bm9kZS5lZGl0YWJsZX1cblx0XHRcdFx0XHRcdFx0XHRcdGRyYWdnYWJsZT17dGhpcy5wcm9wcy5kcmFnZ2FibGV8fG5vZGUuZHJhZ2dhYmxlfVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZGVyPXt0aGlzLnByb3BzLm5vZGVSZW5kZXJ9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNvbnRleHRNZW51PXt0aGlzLnByb3BzLm9uTm9kZUNvbnRleHRNZW51fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25Ob2RlRWRpdERyYWdFbmQ9e3RoaXMucHJvcHMub25Ob2RlRWRpdERyYWdFbmR9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbk5vZGVEaWRNb3VudD17dGhpcy5fX29uTm9kZURpZE1vdW50fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25Ob2RlRHJhZz17dGhpcy5fX29uTm9kZURyYWd9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbk5vZGVEcmFnRW5kPXt0aGlzLl9fb25Ob2RlRHJhZ0VuZH1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eyhldmVudCwgaW5zdGFuY2UpPT50aGlzLl9fb25Ob2RlQ2xpY2soZXZlbnQsIGluc3RhbmNlLCBub2RlKX0gLz47XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnN0YXRlLmxpbmtzLm1hcChmdW5jdGlvbiAobGluaywgaW5kZXgpe1xuXHRcdFx0XHRcdFx0bGluay5pZCA9IGxpbmsuaWQgfHwgem4udXVpZCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIDxMaW5rIHsuLi5saW5rfVxuXHRcdFx0XHRcdFx0XHRcdFx0a2V5PXtsaW5rLmlkfVxuXHRcdFx0XHRcdFx0XHRcdFx0cmVuZGVyPXt0aGlzLnByb3BzLmxpbmtSZW5kZXJ9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkxpbmtEaWRNb3VudD17dGhpcy5fX29uTGlua0RpZE1vdW50fSAvPjtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdH1cblx0XHRcdFx0PExpbmsgcmVmPVwidGVtcFwiIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnTGluaycsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhpZ2hMaWdodFN0eWxlOiB7XG5cdFx0XHRcdCdzdHJva2UnOiAnI2YwYWQ0ZScsXG5cdFx0XHRcdCdzdHJva2VXaWR0aCc6ICcxcHgnXG5cdFx0XHR9LFxuXHRcdFx0bGluZVN0eWxlOiB7XG5cdFx0XHRcdCdzdHJva2UnOiAnI0UyNjk2NScsXG5cdFx0XHRcdCdzdHJva2VXaWR0aCc6ICcxcHgnXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHV1aWQ6IHRoaXMucHJvcHMuaWQgfHwgem4udXVpZCgpLFxuXHRcdFx0eDE6IDAsXG5cdFx0XHR5MTogMCxcblx0XHRcdHgyOiAwLFxuXHRcdFx0eTI6IDAsXG5cdFx0XHRtYXJrZXI6ICcnLFxuXHRcdFx0bGluZVN0eWxlOiB0aGlzLnByb3BzLmxpbmVTdHlsZSxcblx0XHRcdHN2Z1N0eWxlOiB7XG5cblx0XHRcdH0sXG5cdFx0XHR6SW5kZXg6IDBcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5oaWdoTGlnaHQoZmFsc2UpO1xuXHRcdHRoaXMucHJvcHMub25MaW5rRGlkTW91bnQgJiYgdGhpcy5wcm9wcy5vbkxpbmtEaWRNb3VudCh0aGlzKTtcblx0fSxcblx0c2V0VGFyZ2V0OiBmdW5jdGlvbiAodmFsdWUpe1xuICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlLnNldExpbmsodGhpcy5zdGF0ZS51dWlkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0U291cmNlOiBmdW5jdGlvbiAodmFsdWUpe1xuICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlLnNldExpbmsodGhpcy5zdGF0ZS51dWlkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cdGdldElkOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS51dWlkO1xuXHR9LFxuXHRyZXNldDogZnVuY3Rpb24gKHRhcmdldFBvc2l0aW9uLCBzb3VyY2VQb3NpdGlvbil7XG5cdFx0dmFyIF9ib3VuZCA9IHRoaXMuX19jYWxjdWxhdGVTVkdCb3VuZCh0YXJnZXRQb3NpdGlvbiwgc291cmNlUG9zaXRpb24pO1xuXHRcdGlmKF9ib3VuZCl7XG5cdFx0XHRpZihfYm91bmQubGVmdCA9PSAwICYmIF9ib3VuZC50b3AgPT0wKXtcblx0XHRcdFx0X2JvdW5kLndpZHRoID0gMDtcblx0XHRcdFx0X2JvdW5kLmhlaWdodCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgc3ZnU3R5bGU6IF9ib3VuZCB9KTtcblx0XHR9XG5cdH0sXG5cdF9fZ2V0RGlyZWN0aW9uOiBmdW5jdGlvbiAoeCwgeSwgeDEsIHkxKXtcbiAgICAgICAgdmFyIGZsYWcgPSAwO1xuICAgICAgICB2YXIgeCA9ICgoeCAtIHgxKSA8PSAwKSA/IHggOiB4MTtcbiAgICAgICAgdmFyIHkgPSAoKHkgLSB5MSkgPD0gMCkgPyB5IDogeTE7XG4gICAgICAgIGlmICh4ICE9IHgxICYmIHkgIT0geTEpIHtcbiAgICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ID09IHgxICYmIHkgIT0geTEpIHtcbiAgICAgICAgICAgIGZsYWcgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ID09IHgxICYmIHkgPT0geTEpIHtcbiAgICAgICAgICAgIGZsYWcgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ICE9IHgxICYmIHkgPT0geTEpIHtcbiAgICAgICAgICAgIGZsYWcgPSA0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbGFnO1xuICAgIH0sXG5cdGhpZ2hMaWdodDogZnVuY3Rpb24gKGhpZ2hMaWdodCl7XG5cdFx0dmFyIF9saW5lU3R5bGUgPSB7fTtcblx0XHRpZihoaWdoTGlnaHQpe1xuXHRcdFx0X2xpbmVTdHlsZSA9IHRoaXMucHJvcHMuaGlnaExpZ2h0U3R5bGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9saW5lU3R5bGUgPSB0aGlzLnByb3BzLmxpbmVTdHlsZTtcblx0XHR9XG5cdFx0dGhpcy5faGlnaExpZ2h0ID0gaGlnaExpZ2h0O1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bGluZVN0eWxlOiBfbGluZVN0eWxlXG5cdFx0fSk7XG5cdH0sXG4gICAgX19jYWxjdWxhdGVTVkdCb3VuZDogZnVuY3Rpb24gKHRhcmdldFBvc2l0aW9uLCBzb3VyY2VQb3NpdGlvbil7XG5cdFx0dmFyIF94eTEgPSB0YXJnZXRQb3NpdGlvbiB8fCAoISF0aGlzLl90YXJnZXQmJnRoaXMuX3RhcmdldC5nZXRDZW50ZXJYWSgpKTtcblx0XHR2YXIgX3h5MiA9IHNvdXJjZVBvc2l0aW9uIHx8ICghIXRoaXMuX3NvdXJjZSYmdGhpcy5fc291cmNlLmdldENlbnRlclhZKCkpO1xuXHRcdGlmKCFfeHkxIHx8ICFfeHkyKSB7IHJldHVybjsgfVxuXHRcdHZhciBfbWluU2l6ZSA9IHRoaXMucHJvcHMubWluU2l6ZSB8fCAyLFxuICAgICAgICAgICAgX2RpciA9IHRoaXMuX19nZXREaXJlY3Rpb24oX3h5MS54LCBfeHkxLnksIF94eTIueCwgX3h5Mi55KTtcblxuICAgICAgICB2YXIgX3ggPSAwLCBfeSA9IDAsIF93aWR0aCA9IDAsIF9oZWlnaHQgPSAwO1xuICAgICAgICB2YXIgX3gxID0gMCwgX3kxID0gMCwgX3gyID0gMCwgX3kyID0gMDtcbiAgICAgICAgc3dpdGNoKF9kaXIpe1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIF94ID0gX3h5MS54O1xuICAgICAgICAgICAgICAgIF95ID0gX3h5MS55O1xuICAgICAgICAgICAgICAgIF93aWR0aCA9IF94eTIueCAtIF94eTEueDtcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gX3h5Mi55IC0gX3h5MS55O1xuXG5cdFx0XHRcdChfd2lkdGg8X21pblNpemUpJiYoX3dpZHRoID0gX21pblNpemUpO1xuXHRcdFx0XHQoX2hlaWdodDxfbWluU2l6ZSkmJihfaGVpZ2h0ID0gX21pblNpemUpO1xuXG4gICAgICAgICAgICAgICAgX3gxID0gMDtcbiAgICAgICAgICAgICAgICBfeTEgPSAwO1xuICAgICAgICAgICAgICAgIF94MiA9IF93aWR0aDtcbiAgICAgICAgICAgICAgICBfeTIgPSBfaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF94ID0gX3h5Mi54O1xuICAgICAgICAgICAgICAgIF95ID0gX3h5MS55O1xuICAgICAgICAgICAgICAgIF93aWR0aCA9IF94eTEueCAtIF94eTIueDtcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gX3h5Mi55IC0gX3h5MS55O1xuXG5cdFx0XHRcdChfd2lkdGg8X21pblNpemUpJiYoX3dpZHRoID0gX21pblNpemUpO1xuXHRcdFx0XHQoX2hlaWdodDxfbWluU2l6ZSkmJihfaGVpZ2h0ID0gX21pblNpemUpO1xuXG4gICAgICAgICAgICAgICAgX3gxID0gMDtcbiAgICAgICAgICAgICAgICBfeTEgPSBfaGVpZ2h0O1xuICAgICAgICAgICAgICAgIF94MiA9IF93aWR0aDtcbiAgICAgICAgICAgICAgICBfeTIgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF94ID0gX3h5Mi54O1xuICAgICAgICAgICAgICAgIF95ID0gX3h5Mi55O1xuICAgICAgICAgICAgICAgIF93aWR0aCA9IF94eTEueCAtIF94eTIueDtcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gX3h5MS55IC0gX3h5Mi55O1xuXG5cdFx0XHRcdChfd2lkdGg8X21pblNpemUpJiYoX3dpZHRoID0gX21pblNpemUpO1xuXHRcdFx0XHQoX2hlaWdodDxfbWluU2l6ZSkmJihfaGVpZ2h0ID0gX21pblNpemUpO1xuXG4gICAgICAgICAgICAgICAgX3gxID0gMDtcbiAgICAgICAgICAgICAgICBfeTEgPSAwO1xuICAgICAgICAgICAgICAgIF94MiA9IF93aWR0aDtcbiAgICAgICAgICAgICAgICBfeTIgPSBfaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIF94ID0gX3h5MS54O1xuICAgICAgICAgICAgICAgIF95ID0gX3h5Mi55O1xuICAgICAgICAgICAgICAgIF93aWR0aCA9IF94eTIueCAtIF94eTEueDtcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gX3h5MS55IC0gX3h5Mi55O1xuXG5cdFx0XHRcdChfd2lkdGg8X21pblNpemUpJiYoX3dpZHRoID0gX21pblNpemUpO1xuXHRcdFx0XHQoX2hlaWdodDxfbWluU2l6ZSkmJihfaGVpZ2h0ID0gX21pblNpemUpO1xuXG4gICAgICAgICAgICAgICAgX3gxID0gMDtcbiAgICAgICAgICAgICAgICBfeTEgPSBfaGVpZ2h0O1xuICAgICAgICAgICAgICAgIF94MiA9IF93aWR0aDtcbiAgICAgICAgICAgICAgICBfeTIgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHgxOiBfeDEsXG5cdFx0XHR5MTogX3kxLFxuXHRcdFx0eDI6IF94Mixcblx0XHRcdHkyOiBfeTJcblx0XHR9KTtcblxuXHRcdC8vY29uc29sZS5sb2codGhpcy5kcmF3TGluZUFycm93KF94MSwgX3kxLCBfeDIsIF95MikpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGxlZnQ6IF94LFxuXHRcdFx0dG9wOiBfeSxcblx0XHRcdHdpZHRoOiBfd2lkdGgsXG5cdFx0XHRoZWlnaHQ6IF9oZWlnaHRcblx0XHR9O1xuICAgIH0sXG5cdGRyYXdMaW5lQXJyb3c6IGZ1bmN0aW9uICh4MSx5MSx4Mix5Mil7XG5cdFx0dmFyIHBhdGg7XG4gICAgICBcdHZhciBzbG9weSxjb3N5LHNpbnk7XG4gICAgICBcdHZhciBQYXI9MTAuMDtcbiAgICAgIFx0dmFyIHgzLHkzO1xuICAgICAgXHRzbG9weT1NYXRoLmF0YW4yKCh5MS15MiksKHgxLXgyKSk7XG4gICAgICBcdGNvc3k9TWF0aC5jb3Moc2xvcHkpO1xuICAgICAgXHRzaW55PU1hdGguc2luKHNsb3B5KTtcblxuICAgICAgXHRwYXRoPVwiTVwiK3gxK1wiLFwiK3kxK1wiIExcIit4MitcIixcIit5MjtcblxuICAgICAgXHR4Mz0oTnVtYmVyKHgxKStOdW1iZXIoeDIpKS8yO1xuICAgICAgXHR5Mz0oTnVtYmVyKHkxKStOdW1iZXIoeTIpKS8yO1xuXG4gICAgICBcdHBhdGggKz1cIiBNXCIreDMrXCIsXCIreTM7XG5cbiAgICAgIFx0cGF0aCArPVwiIExcIisoTnVtYmVyKHgzKStOdW1iZXIoUGFyKmNvc3ktKFBhci8yLjAqc2lueSkpKStcIixcIisoTnVtYmVyKHkzKStOdW1iZXIoUGFyKnNpbnkrKFBhci8yLjAqY29zeSkpKTtcblxuICAgICAgXHRwYXRoICs9XCIgTVwiKyhOdW1iZXIoeDMpK051bWJlcihQYXIqY29zeStQYXIvMi4wKnNpbnkpK1wiLFwiKyAoTnVtYmVyKHkzKS1OdW1iZXIoUGFyLzIuMCpjb3N5LVBhcipzaW55KSkpO1xuICAgICAgXHRwYXRoICs9XCIgTFwiK3gzK1wiLFwiK3kzO1xuXG4gICAgICBcdHJldHVybiBwYXRoO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHQvKlxuXHRcdDxkZWZzPlxuXHRcdFx0PG1hcmtlciBpZD1cImFycm93XCIgbWFya2VyV2lkdGg9XCIxMFwiIG1hcmtlckhlaWdodD1cIjEwXCIgcmVmeD1cIjBcIiByZWZ5PVwiM1wiIG9yaWVudD1cImF1dG9cIiBtYXJrZXJVbml0cz1cInN0cm9rZVdpZHRoXCI+XG5cdFx0XHRcdDxwYXRoIGQ9XCJNMCwwIEwwLDYgTDksMyB6XCIgZmlsbD1cIiNmMDBcIiAvPlxuXHRcdFx0PC9tYXJrZXI+XG5cdFx0PC9kZWZzPlxuXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJ6ci1saW5rXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT17dGhpcy5zdGF0ZS5zdmdTdHlsZX0+XG5cdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHRcdDxtYXJrZXIgaWQ9XCJUcmlhbmdsZVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByZWZYPVwiMFwiIHJlZlk9XCIxMFwiIG1hcmtlclVuaXRzPVwic3Ryb2tlV2lkdGhcIiBtYXJrZXJXaWR0aD1cIjIwXCIgbWFya2VySGVpZ2h0PVwiMjBcIiBvcmllbnQ9XCJhdXRvXCI+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTSAwIDAgTCAyMCAxMCBMIDAgMjAgelwiLz5cblx0XHRcdFx0XHQ8L21hcmtlcj5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8cGF0aCBjbGFzc05hbWU9XCJsaW5lXCIgZD17J00gJyt0aGlzLnN0YXRlLngxKycgJysgdGhpcy5zdGF0ZS55MSArJyBMICcgKyB0aGlzLnN0YXRlLngyICsgJyAnICsgdGhpcy5zdGF0ZS55Mn0gc3Ryb2tlPVwicmVkXCIgbWFya2VyTWlkPSdUcmlhbmdsZScvPlxuXHRcdFx0IDwvc3ZnPlxuXHRcdCk7XG5cdFx0Ki9cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJ6ci1ncmFwaC1saW5rXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT17dGhpcy5zdGF0ZS5zdmdTdHlsZX0+XG5cdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHQgICAgPG1hcmtlciBpZD1cIlRyaWFuZ2xlXCIgbWFya2VyV2lkdGg9XCIyMFwiIG1hcmtlckhlaWdodD1cIjIwXCIgcmVmWD1cIjBcIiByZWZZPVwiNFwiIG9yaWVudD1cImF1dG9cIiBtYXJrZXJVbml0cz1cInN0cm9rZVdpZHRoXCIgdmlld0JveD1cIjAgMCA1MCA1MFwiPlxuXHRcdFx0XHQgICAgICBcdDxwYXRoIGQ9XCJNMCwwIEwwLDYgTDksMyB6XCIgZmlsbD1cIiNmMDBcIiAvPlxuXHRcdFx0XHQgICAgPC9tYXJrZXI+XG5cdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0PGxpbmUgY2xhc3NOYW1lPVwibGluZVwiIG1hcmtlclN0YXJ0PVwidXJsKCNUcmlhbmdsZSlcIiB4MT17dGhpcy5zdGF0ZS54MX0geTE9e3RoaXMuc3RhdGUueTF9IHgyPXt0aGlzLnN0YXRlLngyfSB5Mj17dGhpcy5zdGF0ZS55Mn0gc3R5bGU9e3RoaXMuc3RhdGUubGluZVN0eWxlfT48L2xpbmU+XG5cdFx0XHQ8L3N2Zz5cblx0XHQpO1xuXHR9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBMaW5rID0gcmVxdWlyZSgnLi9MaW5rJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonTm9kZScsXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRyYWdnYWJsZTogdHJ1ZSxcblx0XHRcdGVkaXRhYmxlOiB0cnVlLFxuXHRcdFx0ZGF0YToge30sXG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogMFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcblx0XHR0aGlzLl9saW5rcyA9IHt9O1xuXHRcdHRoaXMuX25vZGVzID0ge307XG5cdFx0cmV0dXJuIHtcblx0XHRcdHV1aWQ6IHRoaXMucHJvcHMuaWQgfHwgem4udXVpZCgpLFxuXHRcdFx0aGlnaExpZ2h0OiBmYWxzZVxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR2YXIgX3NvdXJjZSA9IHRoaXMuX2RvbSxcblx0XHRcdF9zZWxmID0gdGhpcztcblx0XHR0aGlzLl94ID0gdGhpcy5wcm9wcy54O1xuXHRcdHRoaXMuX3kgPSB0aGlzLnByb3BzLnk7XG5cdFx0dGhpcy5fcGFyZW50UG9zaXRpb24gPSB6bi5kb20uZ2V0UG9zaXRpb24odGhpcy5fZG9tLnBhcmVudE5vZGUpO1xuXHRcdGlmKHRoaXMucHJvcHMuZHJhZ2dhYmxlKXtcblx0XHRcdHpuLmRyYWdnYWJsZS5jcmVhdGUoX3NvdXJjZSwge1xuXHRcdFx0XHRzdGFydDogW3RoaXMucHJvcHMueCwgdGhpcy5wcm9wcy55XSxcblx0XHRcdFx0b25EcmFnU3RhcnQ6IHRoaXMuX19vbk5vZGVEcmFnU3RhcnQsXG5cdFx0XHRcdG9uRHJhZzogdGhpcy5fX29uTm9kZURyYWcsXG5cdFx0XHRcdG9uRHJhZ0VuZDogdGhpcy5fX29uTm9kZURyYWdFbmRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHpuLmRvbS5vbihfc291cmNlLCAnbW91c2VvdmVyJywgdGhpcy5fX29uTW91c2VPdmVyKTtcblx0XHR6bi5kb20ub24oX3NvdXJjZSwgJ21vdXNlb3V0JywgdGhpcy5fX29uTW91c2VPdXQpO1xuXG5cdFx0dGhpcy5wcm9wcy5vbk5vZGVEaWRNb3VudCAmJiB0aGlzLnByb3BzLm9uTm9kZURpZE1vdW50KHRoaXMpO1xuXHR9LFxuXHRnZXRDZW50ZXJYWTogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9wb3NpdGlvbiA9ICB6bi5kb20uZ2V0UG9zaXRpb24odGhpcy5fZG9tKTtcblx0ICAgIHZhciBfaGFsZldpZHRoID0gX3Bvc2l0aW9uLndpZHRoIC8gMi4wLFxuXHQgICAgICAgIF9oYWxmSGVpZ2h0ID0gX3Bvc2l0aW9uLmhlaWdodCAvIDIuMCxcblx0ICAgICAgICBfeCA9IDAsIF95ID0gMDtcblxuXHRcdGlmKCF0aGlzLnByb3BzLmRyYWdnYWJsZSl7XG5cdFx0XHRfeCA9IF9wb3NpdGlvbi54IC0gdGhpcy5fcGFyZW50UG9zaXRpb24ueCArIF9oYWxmV2lkdGg7XG5cdFx0XHRfeSA9IF9wb3NpdGlvbi55IC0gdGhpcy5fcGFyZW50UG9zaXRpb24ueSArIF9oYWxmSGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfeCA9IHRoaXMuX3ggKyBfaGFsZldpZHRoO1xuXHQgICAgICAgIF95ID0gdGhpcy5feSArIF9oYWxmSGVpZ2h0O1xuXHRcdFx0aWYodGhpcy5wcm9wcy5wYXJlbnQpe1xuXHRcdFx0XHRfeCA9IF94ICsgdGhpcy5wcm9wcy5wYXJlbnQuX3g7XG5cdFx0XHRcdF95ID0gX3kgKyB0aGlzLnByb3BzLnBhcmVudC5feTtcblx0XHRcdH1cblx0XHR9XG5cblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgeDogX3gsXG5cdCAgICAgICAgeTogX3lcblx0ICAgIH07XG5cdH0sXG4gICAgc2V0TGluazogZnVuY3Rpb24gKGlkLCBsaW5rKXtcbiAgICAgICAgdGhpcy5fbGlua3NbaWRdID0gbGluaztcbiAgICB9LFxuICAgIGdldExpbms6IGZ1bmN0aW9uIChpZCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5rc1tpZF07XG4gICAgfSxcbiAgICBkZWxldGVMaW5rOiBmdW5jdGlvbiAoaWQpe1xuICAgICAgICB0aGlzLl9saW5rc1tpZF0gPSBudWxsO1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlua3NbaWRdO1xuICAgIH0sXG5cdHNldE5vZGU6IGZ1bmN0aW9uIChrZXksIG5vZGUpe1xuXHRcdHRoaXMuX25vZGVzW2tleV0gPSBub2RlO1xuXHR9LFxuXHRhZGROb2RlOiBmdW5jdGlvbiAobm9kZSl7XG5cdFx0dmFyIF9ub2RlID0gbnVsbCxcblx0XHRcdF9rZXk7XG5cblx0XHRpZihub2RlKXtcblx0XHRcdF9ub2RlID0gPE5vZGUgey4uLm5vZGV9Lz47XG5cdFx0XHR0aGlzLl9ub2Rlc1tfbm9kZS5zdGF0ZS51dWlkXSA9IF9ub2RlO1xuXHRcdFx0UmVhY3QucmVuZGVyKF9ub2RlLCB0aGlzLl9kb20pO1xuXHRcdH1cblx0fSxcblx0X19vbk5vZGVEcmFnU3RhcnQ6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cdFx0dmFyIF9kb20gPSB0aGlzLl9kb207XG5cdFx0dGhpcy5fb2xkWkluZGV4ID0gX2RvbS5zdHlsZS56SW5kZXg7XG4gICAgICAgIF9kb20uc3R5bGUuekluZGV4ID0gMTA7XG5cdFx0dGhpcy5fc3RhcnRWZWN0b3IgPSB7XG5cdFx0XHR4OiBkYXRhLm1vdXNlWCxcblx0XHRcdHk6IGRhdGEubW91c2VZXG5cdFx0fVxuXHRcdGlmKGV2ZW50LnRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignbWFudWFsLWNvbm5lY3QnKSE9LTEpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX19jcmVhdGVMaW5lKGV2ZW50LCBkYXRhKSwgZmFsc2U7XG5cdFx0fVxuXHR9LFxuXHRfX2NyZWF0ZUxpbmU6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cdFx0aWYoIXRoaXMuX2RyYWdUZW1wKXtcblx0XHRcdHZhciBfc2VsZiA9IHRoaXM7XG5cdFx0XHR2YXIgX2RyYWdUZW1wID0gdGhpcy5fZHJhZ1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdF9kcmFnVGVtcC5jbGFzc05hbWUgPSBcInpyLWdyYXBoLW5vZGUtbGluZS10ZW1wXCI7XG5cdFx0XHR6bi5kb20uc2V0U3R5bGVzKHRoaXMuX2RyYWdUZW1wLCB7XG5cdFx0XHRcdHdpZHRoOiA4LFxuXHRcdFx0XHRoZWlnaHQ6IDgsXG5cdFx0XHRcdGJvcmRlclJhZGl1czogNSxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiAnIzgwMDAxMCdcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgX3N0YXJ0ID0gdGhpcy5nZXRDZW50ZXJYWSgpLFxuXHRcdFx0XHRfc3RhcnRNb3VzZSA9IHpuLmRvbS5nZXRQb3NpdGlvbihldmVudC50YXJnZXQpLFxuXHRcdFx0XHRfYmFzZVBvc2l0aW9uID0gdGhpcy5fcGFyZW50UG9zaXRpb247XG5cdFx0XHR2YXIgX3RlbXAgPSB0aGlzLnByb3BzLmNhbnZhcy5yZWZzLnRlbXA7XG5cdFx0XHR6bi5kcmFnZ2FibGUuY3JlYXRlKHRoaXMuX2RyYWdUZW1wLCB7XG5cdFx0XHRcdGV2ZW50OiBldmVudCxcblx0XHRcdFx0c3RhcnQ6IFtfc3RhcnRNb3VzZS54LCBfc3RhcnRNb3VzZS55XSxcblx0XHRcdFx0b25EcmFnU3RhcnQ6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cblx0XHRcdFx0fSxcblx0XHRcdFx0b25EcmFnOiBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpe1xuXHRcdFx0XHRcdHZhciBfbW91c2UgPSB6bi5kb20uZ2V0UG9zaXRpb24oX2RyYWdUZW1wKTtcblx0XHRcdFx0XHRfdGVtcC5yZXNldChfc3RhcnQsIHtcblx0XHRcdFx0XHRcdHg6IF9tb3VzZS54IC0gX2Jhc2VQb3NpdGlvbi54LFxuXHRcdFx0XHRcdFx0eTogX21vdXNlLnkgLSBfYmFzZVBvc2l0aW9uLnlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0b25EcmFnRW5kOiBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpe1xuXHRcdFx0XHRcdF9zZWxmLmNsZWFyVGVtcExpbmsoKTtcblx0XHRcdFx0XHR2YXIgX3V1aWQgPSBfc2VsZi5maW5kTm9kZS5jYWxsKF9zZWxmLCBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGRhdGEubW91c2VYLCBkYXRhLm1vdXNlWSkpO1xuXHRcdFx0XHRcdGlmKF91dWlkKXtcblx0XHRcdFx0XHRcdGlmKF91dWlkIT09X3NlbGYuZ2V0SWQoKSl7XG5cdFx0XHRcdFx0XHRcdF9zZWxmLnByb3BzLmNhbnZhcy5hZGRMaW5rKF9zZWxmLmdldElkKCksIF91dWlkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5wcm9wcy5vbk5vZGVFZGl0RHJhZ0VuZCAmJiBfc2VsZi5wcm9wcy5vbk5vZGVFZGl0RHJhZ0VuZChfc2VsZiwgZGF0YSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZHJhZ1RlbXApO1xuXHRcdH1cblx0fSxcblx0ZmluZE5vZGU6IGZ1bmN0aW9uIChkb20pe1xuXHRcdGlmKCFkb218fGRvbT09PWRvY3VtZW50LmJvZHkpeyByZXR1cm47IH1cblx0XHR2YXIgX2NsYXNzTmFtZSA9IGRvbS5jbGFzc05hbWU7XG5cdFx0aWYoIV9jbGFzc05hbWUpeyByZXR1cm4gdGhpcy5maW5kTm9kZShkb20ucGFyZW50Tm9kZSk7IH1cblx0XHRpZihfY2xhc3NOYW1lID09ICd6ci1ncmFwaC1mbG93LWNhbnZhcycpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZighX2NsYXNzTmFtZS5pbmRleE9mKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYoX2NsYXNzTmFtZS5pbmRleE9mKCd6ci1ub2RlJykgIT09IC0xKXtcblx0XHRcdHJldHVybiBkb20uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLmZpbmROb2RlKGRvbS5wYXJlbnROb2RlKTtcblx0XHR9XG5cdH0sXG5cdGNsZWFyVGVtcExpbms6IGZ1bmN0aW9uICgpe1xuXHRcdGlmKHRoaXMuX2RyYWdUZW1wKXtcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZHJhZ1RlbXApO1xuXHRcdFx0dGhpcy5fZHJhZ1RlbXAgPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLmNhbnZhcy5yZWZzLnRlbXAucmVzZXQoe3g6MCx5OjB9LCB7eDowLHk6MH0pO1xuXHR9LFxuXHRfX29uQ29ubmVjdE1vdXNlVXA6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuY2xlYXJUZW1wTGluaygpO1xuXHR9LFxuXHRfX29uTm9kZURyYWdFbmQ6IGZ1bmN0aW9uIChldmVudCwgZGF0YSl7XG5cdFx0dmFyIF9keCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0VmVjdG9yLnggLSBkYXRhLm1vdXNlWCksXG5cdFx0XHRfZHkgPSBNYXRoLmFicyh0aGlzLl9zdGFydFZlY3Rvci55IC0gZGF0YS5tb3VzZVkpO1xuXG5cdFx0aWYodGhpcy5fZG9tKXtcblx0XHRcdHRoaXMuX2RvbS5zdHlsZS56SW5kZXggPSB0aGlzLl9vbGRaSW5kZXg7XG5cdFx0fVxuXHRcdGlmKF9keDw1JiZfZHk8NSl7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sgJiYgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50LCB0aGlzKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbk5vZGVEcmFnRW5kICYmIHRoaXMucHJvcHMub25Ob2RlRHJhZ0VuZChldmVudCwgZGF0YSwgdGhpcyk7XG5cdH0sXG5cdF9fb25Ob2RlRHJhZzogZnVuY3Rpb24gKGV2ZW50LCBkYXRhKXtcblx0XHR0aGlzLl94ID0gZGF0YS5jdXJyWDtcblx0XHR0aGlzLl95ID0gZGF0YS5jdXJyWTtcblx0XHR0aGlzLl9fb25MaW5rUmVzZXQoKTtcbiAgICAgICAgdGhpcy5fX3NjYW5DaGlsZCgpO1xuXHRcdCEhdGhpcy5vbk5vZGVEcmFnICYmIHRoaXMub25Ob2RlRHJhZyhldmVudCwgZGF0YSk7XG5cdH0sXG5cdF9fb25MaW5rUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX2xpbmtzID0gdGhpcy5fbGlua3M7XG4gICAgICAgIGZvcih2YXIga2V5IGluIF9saW5rcyl7XG4gICAgICAgICAgICBfbGlua3Nba2V5XS5yZXNldCgpO1xuICAgICAgICB9XG5cdH0sXG5cdF9fc2NhbkNoaWxkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9ub2RlcyA9IHRoaXMuX25vZGVzO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBfbm9kZXMpe1xuICAgICAgICAgICAgX25vZGVzW2tleV0uX19vbkxpbmtSZXNldCgpO1xuICAgICAgICB9XG5cdH0sXG5cdGhpZ2hMaWdodDogZnVuY3Rpb24gKGhpZ2hMaWdodCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRoaWdoTGlnaHQ6IChoaWdoTGlnaHQhPT11bmRlZmluZWQ/aGlnaExpZ2h0OnRydWUpXG5cdFx0fSk7XG5cdH0sXG5cdF9fb25Nb3VzZU92ZXI6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0Zm9yKHZhciBrZXkgaW4gdGhpcy5fbGlua3Mpe1xuXHRcdFx0dGhpcy5fbGlua3Nba2V5XS5oaWdoTGlnaHQodHJ1ZSk7XG5cdFx0fVxuXHR9LFxuXHRfX29uTW91c2VPdXQ6IGZ1bmN0aW9uIChldmVudCl7XG5cdFx0Zm9yKHZhciBrZXkgaW4gdGhpcy5fbGlua3Mpe1xuXHRcdFx0dGhpcy5fbGlua3Nba2V5XS5oaWdoTGlnaHQoZmFsc2UpO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhpZ2hMaWdodDogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0X19lZGl0YWJsZVJlbmRlcjogZnVuY3Rpb24gKCl7XG5cdFx0aWYodGhpcy5wcm9wcy5lZGl0YWJsZSl7XG5cdFx0XHRyZXR1cm4gPGkgY2xhc3NOYW1lPVwibWFudWFsLWNvbm5lY3RcIiBvbk1vdXNlVXA9e3RoaXMuX19vbkNvbm5lY3RNb3VzZVVwfSAvPjtcblx0XHR9XG5cdH0sXG5cdF9fb25Db250ZXh0TWVudTogZnVuY3Rpb24gKGV2ZW50KXtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNvbnRleHRNZW51ICYmIHRoaXMucHJvcHMub25Db250ZXh0TWVudShldmVudCwgdGhpcyk7XG5cdH0sXG5cdGdldElkOiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS51dWlkO1xuXHR9LFxuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiByZWY9eyhyZWYpPT50aGlzLl9kb20gPSByZWZ9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuXHRcdFx0XHRjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKCd6ci1ncmFwaC1ub2RlJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuXHRcdFx0XHRkYXRhLWlkPXt0aGlzLmdldElkKCl9XG5cdFx0XHRcdGRhdGEtaGlnaGxpZ2h0PXt0aGlzLnN0YXRlLmhpZ2hMaWdodH1cblx0XHRcdFx0ZGF0YS1zZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZH1cblx0XHRcdFx0b25Db250ZXh0TWVudT17dGhpcy5fX29uQ29udGV4dE1lbnV9ID5cblx0XHRcdFx0e3RoaXMucHJvcHMucmVuZGVyICYmIHRoaXMucHJvcHMucmVuZGVyKHRoaXMucHJvcHMuZGF0YSwgdGhpcyl9XG5cdFx0XHRcdHt0aGlzLl9fZWRpdGFibGVSZW5kZXIoKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ05vZGUnOiByZXF1aXJlKCcuL05vZGUnKSxcbiAgICAnTGluayc6IHJlcXVpcmUoJy4vTGluaycpLFxuICAgICdGbG93Q2FudmFzJzogcmVxdWlyZSgnLi9GbG93Q2FudmFzJylcbn07IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0RE9NXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=