YUI.add("aui-tree-node",function(e,t){var n=e.Lang,r=n.isString,i=n.isBoolean,s=n.isFunction,o=function(t){return t instanceof e.TreeNode},u=function(t){return t instanceof e.TreeView},a=e.getClassName,f=a("glyphicon"),l=a("tree","collapsed"),c=a("tree","container"),h=a("tree","expanded"),p=a("tree","hitarea"),d=a("tree","icon"),v=a("tree","label"),m=a("tree","node"),g=a("tree","node","content"),y=a("tree","node","content","invalid"),b=a("tree","node","hidden","hitarea"),w=a("tree","node","leaf"),E=a("tree","node","over"),S=a("tree","node","selected"),x=a("glyphicon","folder","close"),T=a("glyphicon","folder","open"),N=a("glyphicon","plus"),C=a("glyphicon","minus"),k=a("glyphicon","file"),L=a("glyphicon","refresh"),A=a("glyphicon","ok","sign"),O=a("glyphicon","check"),M='<span tabindex="0" class="'+p+'"></span>',_='<span class="'+d+'"></span>',D='<span class="'+v+'"></span>',P="<ul></ul>",H='<li class="'+m+'"></li>',B='<div class="'+g+'"></div>',j=e.Component.create({NAME:"tree-node",ATTRS:{boundingBox:{valueFn:function(){return e.Node.create(H)}},contentBox:{valueFn:function(){return e.Node.create(B)}},cssClasses:{value:{file:{iconCheck:[f,O].join(" "),iconCollapsed:[f,x].join(" "),iconExpanded:[f,T].join(" "),iconHitAreaCollapsed:[p,N].join(" "),iconHitAreaExpanded:[p,C].join(" "),iconLeaf:[f,k].join(" "),iconLoading:[f,L].join(" "),iconUncheck:[f,O].join(" ")},normal:{iconCheck:[f,O].join(" "),iconHitAreaCollapsed:[p,N].join(" "),iconHitAreaExpanded:[p,C].join(" "),iconLoading:[f,L].join(" "),iconUncheck:[f,O].join(" ")}}},draggable:{value:!0,validator:i},ownerTree:{value:null},label:{value:"",validator:r},expanded:{value:!1,validator:i},id:{validator:r,valueFn:function(){return e.guid()}},leaf:{value:!0,setter:function(e){return e&&this.get("children").length?!1:e},validator:i},nextSibling:{getter:"_getSibling",value:null,validator:o},prevSibling:{getter:"_getSibling",value:null,validator:o},parentNode:{value:null,validator:function(e){return o(e)||u(e)}},labelEl:{setter:e.one,valueFn:function(){var t=this.get("label");return e.Node.create(D).html(t).unselectable()}},hitAreaEl:{setter:e.one,valueFn:function(){return e.Node.create(M)}},alwaysShowHitArea:{value:!0,validator:i},iconEl:{setter:e.one,valueFn:function(){return e.Node.create(_)}},tabIndex:{value:null},rendered:{validator:i,value:!1}},AUGMENTS:[e.TreeData,e.TreeViewIO,e.TreeViewPaginator],EXTENDS:e.Base,prototype:{BOUNDING_TEMPLATE:H,CONTENT_TEMPLATE:B,initializer:function(){var e=this,t=e.get("boundingBox");t.setData("tree-node",e),e._syncTreeNodeBBId(),e._uiSetDraggable(e.get("draggable")),e._uiSetExpanded(e.get("expanded")),e._uiSetLeaf(e.get("leaf"))},bindUI:function(){var e=this;e.after({childrenChange:e._afterSetChildren,draggableChange:e._afterDraggableChange,expandedChange:e._afterExpandedChange,idChange:e._afterSetId,leafChange:e._afterLeafChange,loadingChange:e._afterLoadingChange})},render:function(e){var t=this;t.get("rendered")||(t.renderUI(),t.bindUI(),t.syncUI(),t.set("rendered",!0));if(e){var n=t.get("boundingBox"),r=t.get("paginator");n.appendTo(e),r&&n.insertBefore(r.element)}},renderUI:function(){var e=this;e._renderBoundingBox(),e._renderContentBox()},syncUI:function(){var e=this;e._syncIconUI()},_afterDraggableChange:function(e){var t=this;t._uiSetDraggable(e.newVal),t._syncIconUI()},_afterExpandedChange:function(e){var t=this;t._uiSetExpanded(e.newVal),t._syncIconUI()},_afterLeafChange:function(e){var t=this;t._uiSetLeaf(e.newVal),t._syncIconUI()},_afterLoadingChange:function(){var e=this;e._syncIconUI()},_afterSetChildren:function(){var e=this;e._syncIconUI()},_renderContentBox:function(){var e=this,t=e.get("contentBox");if(!e.isLeaf()){var n=e.get("expanded");t.addClass(n?h:l),n&&e.expand()}return t},_renderBoundingBox:function(){var e=this,t=e.get("boundingBox"),n=e.get("contentBox");n.append(e.get("iconEl")),n.append(e.get("labelEl")),t.append(n);var r=e.get("container");return r&&(e.get("expanded")||r.hide(),t.append(r)),t},_createNodeContainer:function(){var t=this,n=t.get("container")||e.Node.create(P);return n.addClass(c),t.set("container",n),n},_syncHitArea:function(){var e=this;e.get("alwaysShowHitArea")||e.getChildrenLength()?e.showHitArea():e.hideHitArea()},_syncIconUI:function(){var e=this,t=e.get("ownerTree");if(t){var n=t.get("type"),r=e.get("cssClasses."+n);if(!r)return;var i=e.get("expanded"),s=e.get("iconEl"),o=e.get("hitAreaEl"),u=e.isLeaf()?r.iconLeaf:i?r.iconExpanded:r.iconCollapsed,a=i?r.iconHitAreaExpanded:r.iconHitAreaCollapsed;e.get("loading")&&(u=r.iconLoading),s.setAttribute("className",u||""),o.setAttribute("className",a||"")}e._syncHitArea()},appendChild:function(){var t=this;t.isLeaf()||e.TreeNode.superclass.appendChild.apply(t,arguments)},collapse:function(){var e=this;e.set("expanded",!1)},collapseAll:function(){var t=this;e.TreeNode.superclass.collapseAll.apply(t,arguments),t.collapse()},contains:function(e){return e.isAncestor(this)},expand:function(){var e=this;e.set("expanded",!0)},expandAll:function(){var t=this;e.TreeNode.superclass.expandAll.apply(t,arguments),t.expand()},getDepth:function(){var e=this,t=0,n=e.get("parentNode");while(n)++t,n=n.get("parentNode");return t},hasChildNodes:function(){var t=this;return!t.isLeaf()&&e.TreeNode.superclass.hasChildNodes.apply(this,arguments)},isSelected:function(){return this.get("contentBox").hasClass(S)},isLeaf:function(){var e=this;return e.get("leaf")},isAncestor:function(e){var t=this,n=t.get("parentNode");while(n){if(n===e)return!0;n=n.get("parentNode")}return!1},toggle:function(){var e=this;e.get("expanded")?e.collapse():e.expand()},select:function(){var e=this,t=e.get("ownerTree");t&&t.set("lastSelected",e),e.get("contentBox").addClass(S),e.fire("select")},unselect:function(){var e=this;e.get("contentBox").removeClass(S),e.fire("unselect")},over:function(){this.get("contentBox").addClass(E)},out:function(){this.get("contentBox").removeClass(E)},showHitArea:function(){var e=this,t=e.get("hitAreaEl");t.removeClass(b)},hideHitArea
:function(){var e=this,t=e.get("hitAreaEl");t.addClass(b)},_syncTreeNodeBBId:function(){var e=this;e.get("boundingBox").attr("id",e.get("id"))},_getSibling:function(e,t){var n=this,r="_"+t,i=n[r];return i!==null&&!o(i)&&(i=null,n[r]=i),i},_uiSetDraggable:function(e){var t=this,n=t.get("contentBox");n.toggleClass(y,!e)},_uiSetExpanded:function(e){var t=this;if(!t.isLeaf()){var n=t.get("container"),r=t.get("contentBox"),i=t.get("ownerTree"),s=r.one("."+p);e?(r.replaceClass(l,h),!i&&s&&s.replaceClass(N,C),n&&n.show()):(r.replaceClass(h,l),!i&&s&&s.replaceClass(C,N),n&&n.hide())}},_uiSetLeaf:function(e){var t=this,n=t.get("contentBox");e?(t.get("container").remove(),t.get("hitAreaEl").remove()):(n.prepend(t.get("hitAreaEl")),t._createNodeContainer(),t._uiSetExpanded(t.get("expanded"))),n.toggleClass(w,e)}}});e.TreeNode=j;var F=e.Component.create({NAME:"tree-node-io",ATTRS:{loading:{value:!1,validator:i},loaded:{value:!1,validator:i},cache:{value:!0,validator:i},leaf:{value:!1,validator:i}},AUGMENTS:[e.TreeViewPaginator,e.TreeViewIO],EXTENDS:e.TreeNode,prototype:{bindUI:function(){var t=this;e.TreeNodeIO.superclass.bindUI.apply(this,arguments),t.on("ioRequestSuccess",t._onIOSuccess,t)},syncUI:function(){e.TreeNodeIO.superclass.syncUI.apply(this,arguments)},expand:function(){var t=this,n=t.get("cache"),r=t.get("io"),i=t.get("loaded"),s=t.get("loading");n||t.set("loaded",!1),r&&!i&&!s&&!t.hasChildNodes()&&!t.isLeaf()?(n||t.empty(),t.initIO()):e.TreeNodeIO.superclass.expand.apply(this,arguments)},_inheritOwnerTreeAttrs:function(){var t=this,n=t.get("ownerTree");if(n){if(!t.get("io")){var r=e.clone(n.get("io"),!0,function(e){return s(e)&&(e.defaultFn||e.wrappedFn)?!1:!0});t.set("io",r)}if(!t.get("paginator")){var i=n.get("paginator"),o=e.clone(i);o&&o.element&&(o.element=i.element.clone()),t.set("paginator",o)}}},_onIOSuccess:function(){var e=this;e.expand()}}});e.TreeNodeIO=F;var I=a("tree","node","checkbox"),q=a("tree","node","checkbox","container"),R=a("tree","node","checked"),U='<span class="'+q+'"></span>',z='<input class="'+I+'" type="checkbox" />',W=e.Component.create({NAME:"tree-node-check",ATTRS:{checked:{value:!1,validator:i},checkName:{value:"tree-node-check",validator:r},checkContainerEl:{setter:e.one,valueFn:function(){return e.Node.create(U)}},checkEl:{setter:e.one,valueFn:function(){var t=this.get("checkName");return e.Node.create(z).attr("name",t)}}},EXTENDS:e.TreeNodeIO,prototype:{renderUI:function(){var t=this;e.TreeNodeCheck.superclass.renderUI.apply(t,arguments);var n=t.get("labelEl"),r=t.get("checkEl"),i=t.get("checkContainerEl");r.hide(),i.append(r),n.placeBefore(i),t.isChecked()&&t.check(),t._uiSetChecked(t.get("checked"))},bindUI:function(){var t=this,n=t.get("contentBox"),r=t.get("labelEl");e.TreeNodeCheck.superclass.bindUI.apply(t,arguments),t.after("checkedChange",e.bind(t._afterCheckedChange,t)),n.delegate("click",e.bind(t.toggleCheck,t),"."+q),n.delegate("click",e.bind(t.toggleCheck,t),"."+v),r.swallowEvent("dblclick")},check:function(e){var t=this;t.set("checked",!0,{originalTarget:e})},uncheck:function(e){var t=this;t.set("checked",!1,{originalTarget:e})},toggleCheck:function(){var e=this,t=e.get("checkEl"),n=t.attr("checked");n?e.uncheck():e.check()},isChecked:function(){var e=this;return e.get("checked")},_syncIconCheckUI:function(){var e=this,t=e.get("ownerTree");if(t){var n=t.get("type"),r=e.get("cssClasses."+n);if(!r)return;var i=e.get("checkContainerEl"),s=e.isChecked();i.removeClass(s?r.iconUncheck:r.iconCheck),i.addClass(s?r.iconCheck:r.iconUncheck)}},_afterCheckedChange:function(e){var t=this;t._uiSetChecked(e.newVal)},_uiSetChecked:function(e){var t=this;t._syncIconCheckUI(),t.get("checkEl").attr("checked",e?"checked":""),t.get("contentBox").toggleClass(R,e)}}});e.TreeNodeCheck=W;var X=a("tree","node","child","unchecked"),V=function(t){return t instanceof e.TreeNodeCheck},$=e.Component.create({NAME:"tree-node-task",EXTENDS:e.TreeNodeCheck,prototype:{check:function(t){var n=this,r=n.get("contentBox");t=t||n,n.isLeaf()||n.eachChildren(function(e){V(e)&&e.check(t)}),n._uncheckedAncestorChildRemoveClass(),r.removeClass(X),e.TreeNodeTask.superclass.check.call(this,t)},uncheck:function(t){var n=this,r=n.get("contentBox");t=t||n,n.isLeaf()||n.eachChildren(function(n){n instanceof e.TreeNodeCheck&&n.uncheck(t)}),n._uncheckedAncestorChildAddClass(),r.removeClass(X),e.TreeNodeTask.superclass.uncheck.call(this,t)},_uncheckedAncestorChildAddClass:function(){var e=this;e.eachParent(function(e){V(e)&&e.isChecked()&&e.get("contentBox").addClass(X)})},_uncheckedAncestorChildRemoveClass:function(){var t=this,n,r,i;t.eachParent(function(s){V(s)&&!i&&(n=s.getChildren(),i=e.Array.some(n,function(e){if(e!==t&&!e.isChecked())return!0;r=e.get("contentBox").hasClass(X);if(r)return!0}),i||s.get("contentBox").removeClass(X))})}}});e.TreeNodeTask=$;var J=a("tree","node","radio"),K=function(t){return t instanceof e.TreeNodeRadio},Q=e.Component.create({NAME:"tree-node-radio",ATTRS:{cssClasses:{value:{file:{iconCheck:[f,A].join(" "),iconCollapsed:[f,x].join(" "),iconExpanded:[f,T].join(" "),iconHitAreaCollapsed:[p,N].join(" "),iconHitAreaExpanded:[p,C].join(" "),iconLeaf:[f,k].join(" "),iconLoading:[f,L].join(" "),iconUncheck:[f,A].join(" ")},normal:{iconCheck:[f,A].join(" "),iconHitAreaCollapsed:[p,N].join(" "),iconHitAreaExpanded:[p,C].join(" "),iconLoading:[f,L].join(" "),iconUncheck:[f,A].join(" ")}}}},EXTENDS:e.TreeNodeCheck,prototype:{renderUI:function(){var t=this;e.TreeNodeRadio.superclass.renderUI.apply(t,arguments),t.get("contentBox").addClass(J)},check:function(){var t=this;t._uncheckNodesRadio(),e.TreeNodeRadio.superclass.check.apply(this,arguments)},_uncheckNodesRadio:function(t){var n=this,r;if(t)r=t.get("children");else{var i=n.get("ownerTree");if(!i)return;r=i.get("children")}e.Array.each(r,function(e){e.isLeaf()||n._uncheckNodesRadio(e),K(e)&&e.uncheck()})}}});e.TreeNodeRadio=Q,e.TreeNode.nodeTypes={radio:e.TreeNodeRadio,task:e.TreeNodeTask,check:e.TreeNodeCheck,node:e.
TreeNode,io:e.TreeNodeIO}},"3.0.3-deprecated.10",{requires:["json","querystring-stringify","aui-tree-data","aui-tree-io","aui-tree-paginator","event-key"]});
