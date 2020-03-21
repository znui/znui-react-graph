require('./FlowDesigner.less');
var React = znui.React || require('react');
var graph = require('../../src/index');

var NODE_TYPES = {
	'begin': '开始节点',
	'end': '结束节点',
	'normal': '普通节点',
	'parallel': '并行节点',
	'auto': '自动节点',
	'cancel': '取消节点',
	'subflow': '子流程'
}, TYPE_ARRAY = ['begin', 'normal', 'parallel', 'auto', 'cancel', 'subflow', 'end'].map(function (index){
	return { text: NODE_TYPES[index], value: index };
});

module.exports = React.createClass({
	displayName:'FlowDesigner',
	getInitialState: function () {
		return {
			info: {},
			json_schema: this.props.data || {},
			schemas: null,
			toolBarItems: [
				{ tooltip: '初始化流程画布', name: 'workflow.schema.init', icon: 'faPaintBrush' },
				{ tooltip: '保存画布', name: 'workflow.schema.save', icon: 'faFloppyO' },
				{ tooltip: '生成流程定义', name: 'workflow.schema.define', icon: 'fa-code-fork' }
			],
			subToolbarItems: [
				{ tooltip: '删除节点', name: 'workflow.schema.node.delete', icon: 'fa-remove' },
				{ text: '编辑节点', name: 'workflow.schema.node.define.edit', icon: 'fa-edit' }
			]
		};
	},
	__onToolbarClick: function (obj, nodeProps){
		switch (obj.name) {
			case 'workflow.schema.init':
				this.setState({
					json_schema: {
						nodes: [
							{ x: 100, y: 100, data: { title: '开始', type: 'begin' } }
						],
						links: []
					}
				});
				break;
			case 'workflow.schema.node.delete':
				this.__onRemoveNode(nodeProps);
				break;
		}
	},
	__onRemoveNode: function (nodeProps){
		this.refs.flowcanvas.deleteNodeById(nodeProps.id);
	},
	__onNodeTypeClick: function (event, node, props){
		//event.stopPropagation();
		console.log('xxx');
	},
	__nodeRender: function (data, node){
		return <div className="wf-node">
			<div className={"node-type type-"+data.type} onClick={(event)=>this.__onNodeTypeClick(event, node, data)}>
				{NODE_TYPES[data.type]}
				<i className="action fa fa-ellipsis-v" />
			</div>
			<div className="node-title">{data.title}</div>
		</div>;
	},
	__onNodeDragEnd: function (){
		//this.__save();
	},
	__onNodeEditDragEnd: function (node, data){
		var _parentPosition = node._parentPosition,
			_vector = {
				x: data.currX - _parentPosition.x,
				y: data.currY - _parentPosition.y
			};

			_vector.data = {
				title: '普通节点',
				type: 'normal'
			};
			node.props.canvas.addNode(_vector, node);
	},

	getParent: function (target){
		if(target.classList.contains('wf-node')){
			return target;
		}else {
			return this.getParent(target.parentNode);
		}
	},
	__onNodeClick: function (event, node, props){
		if(this.props.disabled){ return; }
		var _actions = [
			{ tooltip: '删除节点', name: 'workflow.schema.node.delete', icon: 'fa-remove' }
		];
		if(this.state.schemas && this.state.schemas.length){
			//_actions.push({ text: '编辑节点', name: 'workflow.schema.node.define.edit', icon: 'fa-edit' });
		}
		this.setState({
			currData: props,
			subToolbarItems: _actions
		});
	},
	render:function(){
		return (
			<div className={znui.react.classname("zr-graph-flow-designer", this.props.className)} style={this.props.style}>
				<div className="tool-bars" onClick={(event)=>event.stopPropagation()}>
					{
						this.state.toolBarItems.map(function (item, index){
							return <span className="btn" key={index} onClick={()=>this.__onToolbarClick(item)}>{item.tooltip}<i className={"fa " + item.icon} /></span>
						}.bind(this))
					}
					<i className="separator" />
					{
						this.state.currData && this.state.subToolbarItems.map(function (item, index){
							return <span className="btn" key={index} onClick={()=>this.__onToolbarClick(item, this.state.currData)}>{item.tooltip}<i className={"fa " + item.icon} /></span>
						}.bind(this))
					}
				</div>
				<graph.FlowCanvas
					ref="flowcanvas"
					onNodeEditDragEnd={this.__onNodeEditDragEnd}
					onNodeDragEnd={this.__onNodeDragEnd}
					onNodeClick={this.__onNodeClick}
					nodeRender={this.__nodeRender}
					data={this.state.json_schema} />
			</div>
		);
	}
});
