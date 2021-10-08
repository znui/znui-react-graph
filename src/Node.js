var React = znui.React || require('react');
var Link = require('./Link');

module.exports = React.createClass({
	displayName:'Node',
	getDefaultProps: function (){
		return {
			draggable: true,
			editable: true,
			data: {},
			x: 0,
			y: 0
		};
	},
	getInitialState: function(){
		this._links = {};
		this._nodes = {};
		return {
			uuid: this.props.id || zn.uuid(),
			highLight: false
		}
	},
	componentDidMount:function(){
		var _source = this._dom;
		this._x = this.props.x;
		this._y = this.props.y;
		this._parentPosition = zn.dom.getPosition(this._dom.parentNode);
		if(this.props.draggable){
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
	getCenterXY: function (){
		var _position =  zn.dom.getPosition(this._dom);
	    var _halfWidth = _position.width / 2.0,
	        _halfHeight = _position.height / 2.0,
	        _x = 0, _y = 0;

		if(!this.props.draggable){
			_x = _position.x - this._parentPosition.x + _halfWidth;
			_y = _position.y - this._parentPosition.y + _halfHeight;
		} else {
			_x = this._x + _halfWidth;
	        _y = this._y + _halfHeight;
			if(this.props.parent){
				_x = _x + this.props.parent._x;
				_y = _y + this.props.parent._y;
			}
		}

	    return {
	        x: _x,
	        y: _y
	    };
	},
    setLink: function (id, link){
        this._links[id] = link;
    },
    getLink: function (id){
        return this._links[id];
    },
    deleteLink: function (id){
        this._links[id] = null;
        delete this._links[id];
    },
	setNode: function (key, node){
		this._nodes[key] = node;
	},
	addNode: function (node){
		var _node = null;

		if(node){
			_node = <Node {...node}/>;
			this._nodes[_node.state.uuid] = _node;
			React.render(_node, this._dom);
		}
	},
	__onNodeDragStart: function (event, data){
		var _dom = this._dom;
		this._oldZIndex = _dom.style.zIndex;
        _dom.style.zIndex = 10;
		this._startVector = {
			x: data.mouseX,
			y: data.mouseY
		}
		if(event.target.className.indexOf('manual-connect')!=-1){
			return this.__createLine(event, data), false;
		}
	},
	__createLine: function (event, data){
		if(!this._dragTemp){
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
				onDragStart: function (event, data){

				},
				onDrag: function (event, data){
					var _mouse = zn.dom.getPosition(_dragTemp);
					_temp.reset(_start, {
						x: _mouse.x - _basePosition.x,
						y: _mouse.y - _basePosition.y
					});
				},
				onDragEnd: function (event, data){
					_self.clearTempLink();
					var _uuid = _self.findNode.call(_self, document.elementFromPoint(data.mouseX, data.mouseY));
					if(_uuid){
						if(_uuid!==_self.getId()){
							_self.props.canvas.addLink(_self.getId(), _uuid);
						}
					}else {
						_self.props.onNodeEditDragEnd && _self.props.onNodeEditDragEnd(_self, data);
					}
				}
			});
			document.body.appendChild(this._dragTemp);
		}
	},
	findNode: function (dom){
		if(!dom||dom===document.body){ return; }
		var _className = dom.className;
		if(!_className){ return this.findNode(dom.parentNode); }
		if(_className == 'zr-graph-flow-canvas'){
			return;
		}
		if(!_className.indexOf){
			return;
		}
		if(_className.indexOf('zr-graph-node') !== -1){
			return dom.getAttribute('data-id');
		} else {
			return this.findNode(dom.parentNode);
		}
	},
	clearTempLink: function (){
		if(this._dragTemp){
			document.body.removeChild(this._dragTemp);
			this._dragTemp = null;
		}
		this.props.canvas.refs.temp.reset({x:0,y:0}, {x:0,y:0});
	},
	__onConnectMouseUp: function (){
		this.clearTempLink();
	},
	__onNodeDragEnd: function (event, data){
		var _dx = Math.abs(this._startVector.x - data.mouseX),
			_dy = Math.abs(this._startVector.y - data.mouseY);

		if(this._dom){
			this._dom.style.zIndex = this._oldZIndex;
		}
		if(_dx<5&&_dy<5){
			this.props.onClick && this.props.onClick(event, this);
			return false;
		}
		this.props.onNodeDragEnd && this.props.onNodeDragEnd(event, data, this);
	},
	__onNodeDrag: function (event, data){
		this._x = data.currX;
		this._y = data.currY;
		this.__onLinkReset();
        this.__scanChild();
		!!this.onNodeDrag && this.onNodeDrag(event, data);
	},
	__onLinkReset: function () {
		var _links = this._links;
        for(var key in _links){
            _links[key].reset();
        }
	},
	__scanChild: function () {
		var _nodes = this._nodes;
        for(var key in _nodes){
            _nodes[key].__onLinkReset();
        }
	},
	highLight: function (highLight){
		this.setState({
			highLight: (highLight!==undefined?highLight:true)
		});
	},
	__onMouseOver: function (event){
		for(var key in this._links){
			this._links[key].highLight(true);
		}
	},
	__onMouseOut: function (event){
		for(var key in this._links){
			this._links[key].highLight(false);
		}
		this.setState({
			highLight: false
		});
	},
	__editableRender: function (){
		if(this.props.editable){
			return <i className="manual-connect" onMouseUp={this.__onConnectMouseUp} />;
		}
	},
	__onDomClick: function (event){
		
	},
	__onContextMenu: function (event){
		event.stopPropagation();
		return this.props.onContextMenu && this.props.onContextMenu(event, this);
	},
	getId: function (){
		return this.state.uuid;
	},
	render:function(){
		return (
			<div ref={(ref)=>this._dom = ref} style={this.props.style}
				className={znui.react.classname('zr-graph-node', this.props.className)}
				data-id={this.getId()}
				data-highlight={this.state.highLight}
				data-selected={this.props.selected}
				onClick={this.__onDomClick}
				onContextMenu={this.__onContextMenu} >
				{this.props.render && this.props.render(this.props.data, this)}
				{this.__editableRender()}
			</div>
		);
	}
});
