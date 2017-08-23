YUI.add("aui-layout-builder",function(e,t){var n=e.getClassName("layout","builder","layout","container"),r='<div class="'+n+'"></div>';e.LayoutBuilder=e.Base.create("layout-builder",e.Base,[e.LayoutBuilderAddCol,e.LayoutBuilderMove,e.LayoutBuilderRemoveRow,e.LayoutBuilderResizeCol,e.LayoutBuilderAddRow],{_layoutContainer:null,initializer:function(){var t=this.get("container"),n=this.get("layout");this._createLayoutContainer(t),n.addTarget(this),this._eventHandles=[this.after("layoutChange",e.bind(this._afterLayoutChange,this)),this.on("moveStart",e.bind(this._afterLayoutMoveStart,this)),this.on("moveEnd",e.bind(this._afterLayoutMoveEnd,this))],n.draw(this._layoutContainer),this._layoutContainer.unselectable()},destructor:function(){(new e.EventHandle(this._eventHandles)).detach(),this.get("container").empty()},_afterLayoutMoveEnd:function(){this.isResizeColsEnabled&&this.set("enableResizeCols",!0),this.isRemoveRowsEnabled&&this.set("enableRemoveRows",!0),this.isAddRowsEnabled&&this.set("enableAddRows",!0)},_afterLayoutMoveStart:function(){this.isResizeColsEnabled=this.get("enableResizeCols"),this.isRemoveRowsEnabled=this.get("enableRemoveRows"),this.isAddRowsEnabled=this.get("enableAddRows"),this.isResizeColsEnabled&&this.set("enableResizeCols",!1),this.isRemoveRowsEnabled&&this.set("enableRemoveRows",!1),this.isAddRowsEnabled&&this.set("enableAddRows",!1)},_afterLayoutChange:function(e){var t=e.newVal,n=e.prevVal;this._layoutContainer.empty(),n.removeTarget(this),t.addTarget(this),t.draw(this._layoutContainer)},_createLayoutContainer:function(t){this._layoutContainer=t.one("."+n),this._layoutContainer||(this._layoutContainer=e.Node.create(r),t.prepend(this._layoutContainer))}},{ATTRS:{container:{setter:e.one,validator:function(t){return e.Lang.isString(t)||e.instanceOf(t,e.Node)},writeOnce:"initOnly"},layout:{validator:function(t){return e.instanceOf(t,e.Layout)},valueFn:function(){return new e.Layout}},strings:{value:{addColumn:"Add Column",addRow:"Add Row",pasteHere:"Paste Here"},writeOnce:!0}}})},"3.1.0-deprecated.23",{requires:["aui-classnamemanager","aui-layout","aui-layout-builder-add-col","aui-layout-builder-add-row","aui-layout-builder-move","aui-layout-builder-remove-row","aui-layout-builder-resize-col","aui-node-base","base-build","node-event-delegate","node-screen","node-style"]});
