package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseDialogTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseDialogTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getDialogBodyContent() {
		return _dialogBodyContent;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getButtons() {
		return _buttons;
	}

	public java.lang.Boolean getClose() {
		return _close;
	}

	public java.lang.Boolean getCollapsed() {
		return _collapsed;
	}

	public java.lang.Boolean getCollapsible() {
		return _collapsible;
	}

	public java.lang.Object getConstrain2view() {
		return _constrain2view;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Boolean getDestroyOnClose() {
		return _destroyOnClose;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Boolean getDisabled() {
		return _disabled;
	}

	public java.lang.String getDragInstance() {
		return _dragInstance;
	}

	public java.lang.Boolean getDraggable() {
		return _draggable;
	}

	public java.lang.Boolean getFocused() {
		return _focused;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getIcons() {
		return _icons;
	}

	public java.lang.String getDialogId() {
		return _dialogId;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Boolean getModal() {
		return _modal;
	}

	public java.lang.Boolean getRender() {
		return _render;
	}

	public java.lang.Boolean getRendered() {
		return _rendered;
	}

	public java.lang.Boolean getResizable() {
		return _resizable;
	}

	public java.lang.String getResizableInstance() {
		return _resizableInstance;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.Boolean getStack() {
		return _stack;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Number getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getTitle() {
		return _title;
	}

	public java.lang.Boolean getVisible() {
		return _visible;
	}

	public java.lang.String getWidth() {
		return _width;
	}

	public java.lang.String getAfterBodyContentChange() {
		return _afterBodyContentChange;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterButtonsChange() {
		return _afterButtonsChange;
	}

	public java.lang.String getAfterCloseChange() {
		return _afterCloseChange;
	}

	public java.lang.String getAfterCollapsedChange() {
		return _afterCollapsedChange;
	}

	public java.lang.String getAfterCollapsibleChange() {
		return _afterCollapsibleChange;
	}

	public java.lang.String getAfterConstrain2viewChange() {
		return _afterConstrain2viewChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyOnCloseChange() {
		return _afterDestroyOnCloseChange;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterDisabledChange() {
		return _afterDisabledChange;
	}

	public java.lang.String getAfterDragInstanceChange() {
		return _afterDragInstanceChange;
	}

	public java.lang.String getAfterDraggableChange() {
		return _afterDraggableChange;
	}

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.String getAfterIconsChange() {
		return _afterIconsChange;
	}

	public java.lang.String getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterModalChange() {
		return _afterModalChange;
	}

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterResizableChange() {
		return _afterResizableChange;
	}

	public java.lang.String getAfterResizableInstanceChange() {
		return _afterResizableInstanceChange;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.String getAfterStackChange() {
		return _afterStackChange;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.String getAfterTitleChange() {
		return _afterTitleChange;
	}

	public java.lang.String getAfterVisibleChange() {
		return _afterVisibleChange;
	}

	public java.lang.String getAfterContentUpdate() {
		return _afterContentUpdate;
	}

	public java.lang.String getAfterRender() {
		return _afterRender;
	}

	public java.lang.String getAfterWidthChange() {
		return _afterWidthChange;
	}

	public java.lang.String getOnBodyContentChange() {
		return _onBodyContentChange;
	}

	public java.lang.String getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.String getOnButtonsChange() {
		return _onButtonsChange;
	}

	public java.lang.String getOnCloseChange() {
		return _onCloseChange;
	}

	public java.lang.String getOnCollapsedChange() {
		return _onCollapsedChange;
	}

	public java.lang.String getOnCollapsibleChange() {
		return _onCollapsibleChange;
	}

	public java.lang.String getOnConstrain2viewChange() {
		return _onConstrain2viewChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyOnCloseChange() {
		return _onDestroyOnCloseChange;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnDisabledChange() {
		return _onDisabledChange;
	}

	public java.lang.String getOnDragInstanceChange() {
		return _onDragInstanceChange;
	}

	public java.lang.String getOnDraggableChange() {
		return _onDraggableChange;
	}

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.String getOnIconsChange() {
		return _onIconsChange;
	}

	public java.lang.String getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnModalChange() {
		return _onModalChange;
	}

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnResizableChange() {
		return _onResizableChange;
	}

	public java.lang.String getOnResizableInstanceChange() {
		return _onResizableInstanceChange;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.String getOnStackChange() {
		return _onStackChange;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.String getOnTitleChange() {
		return _onTitleChange;
	}

	public java.lang.String getOnVisibleChange() {
		return _onVisibleChange;
	}

	public java.lang.String getOnContentUpdate() {
		return _onContentUpdate;
	}

	public java.lang.String getOnRender() {
		return _onRender;
	}

	public java.lang.String getOnWidthChange() {
		return _onWidthChange;
	}

	public void setDialogBodyContent(java.lang.String dialogBodyContent) {
		_dialogBodyContent = dialogBodyContent;

		setScopedAttribute("dialogBodyContent", dialogBodyContent);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setButtons(java.lang.String buttons) {
		_buttons = buttons;

		setScopedAttribute("buttons", buttons);
	}

	public void setClose(java.lang.Boolean close) {
		_close = close;

		setScopedAttribute("close", close);
	}

	public void setCollapsed(java.lang.Boolean collapsed) {
		_collapsed = collapsed;

		setScopedAttribute("collapsed", collapsed);
	}

	public void setCollapsible(java.lang.Boolean collapsible) {
		_collapsible = collapsible;

		setScopedAttribute("collapsible", collapsible);
	}

	public void setConstrain2view(java.lang.Object constrain2view) {
		_constrain2view = constrain2view;

		setScopedAttribute("constrain2view", constrain2view);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setDestroyOnClose(java.lang.Boolean destroyOnClose) {
		_destroyOnClose = destroyOnClose;

		setScopedAttribute("destroyOnClose", destroyOnClose);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.Boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setDragInstance(java.lang.String dragInstance) {
		_dragInstance = dragInstance;

		setScopedAttribute("dragInstance", dragInstance);
	}

	public void setDraggable(java.lang.Boolean draggable) {
		_draggable = draggable;

		setScopedAttribute("draggable", draggable);
	}

	public void setFocused(java.lang.Boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setIcons(java.lang.String icons) {
		_icons = icons;

		setScopedAttribute("icons", icons);
	}

	public void setDialogId(java.lang.String dialogId) {
		_dialogId = dialogId;

		setScopedAttribute("dialogId", dialogId);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setModal(java.lang.Boolean modal) {
		_modal = modal;

		setScopedAttribute("modal", modal);
	}

	public void setRender(java.lang.Boolean render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.Boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setResizable(java.lang.Boolean resizable) {
		_resizable = resizable;

		setScopedAttribute("resizable", resizable);
	}

	public void setResizableInstance(java.lang.String resizableInstance) {
		_resizableInstance = resizableInstance;

		setScopedAttribute("resizableInstance", resizableInstance);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStack(java.lang.Boolean stack) {
		_stack = stack;

		setScopedAttribute("stack", stack);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.Number tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTitle(java.lang.String title) {
		_title = title;

		setScopedAttribute("title", title);
	}

	public void setVisible(java.lang.Boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.String width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterBodyContentChange(java.lang.String afterBodyContentChange) {
		_afterBodyContentChange = afterBodyContentChange;

		setScopedAttribute("afterBodyContentChange", afterBodyContentChange);
	}

	public void setAfterBoundingBoxChange(java.lang.String afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonsChange(java.lang.String afterButtonsChange) {
		_afterButtonsChange = afterButtonsChange;

		setScopedAttribute("afterButtonsChange", afterButtonsChange);
	}

	public void setAfterCloseChange(java.lang.String afterCloseChange) {
		_afterCloseChange = afterCloseChange;

		setScopedAttribute("afterCloseChange", afterCloseChange);
	}

	public void setAfterCollapsedChange(java.lang.String afterCollapsedChange) {
		_afterCollapsedChange = afterCollapsedChange;

		setScopedAttribute("afterCollapsedChange", afterCollapsedChange);
	}

	public void setAfterCollapsibleChange(java.lang.String afterCollapsibleChange) {
		_afterCollapsibleChange = afterCollapsibleChange;

		setScopedAttribute("afterCollapsibleChange", afterCollapsibleChange);
	}

	public void setAfterConstrain2viewChange(java.lang.String afterConstrain2viewChange) {
		_afterConstrain2viewChange = afterConstrain2viewChange;

		setScopedAttribute("afterConstrain2viewChange", afterConstrain2viewChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyOnCloseChange(java.lang.String afterDestroyOnCloseChange) {
		_afterDestroyOnCloseChange = afterDestroyOnCloseChange;

		setScopedAttribute("afterDestroyOnCloseChange", afterDestroyOnCloseChange);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDisabledChange(java.lang.String afterDisabledChange) {
		_afterDisabledChange = afterDisabledChange;

		setScopedAttribute("afterDisabledChange", afterDisabledChange);
	}

	public void setAfterDragInstanceChange(java.lang.String afterDragInstanceChange) {
		_afterDragInstanceChange = afterDragInstanceChange;

		setScopedAttribute("afterDragInstanceChange", afterDragInstanceChange);
	}

	public void setAfterDraggableChange(java.lang.String afterDraggableChange) {
		_afterDraggableChange = afterDraggableChange;

		setScopedAttribute("afterDraggableChange", afterDraggableChange);
	}

	public void setAfterFocusedChange(java.lang.String afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.String afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterIconsChange(java.lang.String afterIconsChange) {
		_afterIconsChange = afterIconsChange;

		setScopedAttribute("afterIconsChange", afterIconsChange);
	}

	public void setAfterIdChange(java.lang.String afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterModalChange(java.lang.String afterModalChange) {
		_afterModalChange = afterModalChange;

		setScopedAttribute("afterModalChange", afterModalChange);
	}

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterResizableChange(java.lang.String afterResizableChange) {
		_afterResizableChange = afterResizableChange;

		setScopedAttribute("afterResizableChange", afterResizableChange);
	}

	public void setAfterResizableInstanceChange(java.lang.String afterResizableInstanceChange) {
		_afterResizableInstanceChange = afterResizableInstanceChange;

		setScopedAttribute("afterResizableInstanceChange", afterResizableInstanceChange);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStackChange(java.lang.String afterStackChange) {
		_afterStackChange = afterStackChange;

		setScopedAttribute("afterStackChange", afterStackChange);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.String afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTitleChange(java.lang.String afterTitleChange) {
		_afterTitleChange = afterTitleChange;

		setScopedAttribute("afterTitleChange", afterTitleChange);
	}

	public void setAfterVisibleChange(java.lang.String afterVisibleChange) {
		_afterVisibleChange = afterVisibleChange;

		setScopedAttribute("afterVisibleChange", afterVisibleChange);
	}

	public void setAfterContentUpdate(java.lang.String afterContentUpdate) {
		_afterContentUpdate = afterContentUpdate;

		setScopedAttribute("afterContentUpdate", afterContentUpdate);
	}

	public void setAfterRender(java.lang.String afterRender) {
		_afterRender = afterRender;

		setScopedAttribute("afterRender", afterRender);
	}

	public void setAfterWidthChange(java.lang.String afterWidthChange) {
		_afterWidthChange = afterWidthChange;

		setScopedAttribute("afterWidthChange", afterWidthChange);
	}

	public void setOnBodyContentChange(java.lang.String onBodyContentChange) {
		_onBodyContentChange = onBodyContentChange;

		setScopedAttribute("onBodyContentChange", onBodyContentChange);
	}

	public void setOnBoundingBoxChange(java.lang.String onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonsChange(java.lang.String onButtonsChange) {
		_onButtonsChange = onButtonsChange;

		setScopedAttribute("onButtonsChange", onButtonsChange);
	}

	public void setOnCloseChange(java.lang.String onCloseChange) {
		_onCloseChange = onCloseChange;

		setScopedAttribute("onCloseChange", onCloseChange);
	}

	public void setOnCollapsedChange(java.lang.String onCollapsedChange) {
		_onCollapsedChange = onCollapsedChange;

		setScopedAttribute("onCollapsedChange", onCollapsedChange);
	}

	public void setOnCollapsibleChange(java.lang.String onCollapsibleChange) {
		_onCollapsibleChange = onCollapsibleChange;

		setScopedAttribute("onCollapsibleChange", onCollapsibleChange);
	}

	public void setOnConstrain2viewChange(java.lang.String onConstrain2viewChange) {
		_onConstrain2viewChange = onConstrain2viewChange;

		setScopedAttribute("onConstrain2viewChange", onConstrain2viewChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyOnCloseChange(java.lang.String onDestroyOnCloseChange) {
		_onDestroyOnCloseChange = onDestroyOnCloseChange;

		setScopedAttribute("onDestroyOnCloseChange", onDestroyOnCloseChange);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDisabledChange(java.lang.String onDisabledChange) {
		_onDisabledChange = onDisabledChange;

		setScopedAttribute("onDisabledChange", onDisabledChange);
	}

	public void setOnDragInstanceChange(java.lang.String onDragInstanceChange) {
		_onDragInstanceChange = onDragInstanceChange;

		setScopedAttribute("onDragInstanceChange", onDragInstanceChange);
	}

	public void setOnDraggableChange(java.lang.String onDraggableChange) {
		_onDraggableChange = onDraggableChange;

		setScopedAttribute("onDraggableChange", onDraggableChange);
	}

	public void setOnFocusedChange(java.lang.String onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.String onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnIconsChange(java.lang.String onIconsChange) {
		_onIconsChange = onIconsChange;

		setScopedAttribute("onIconsChange", onIconsChange);
	}

	public void setOnIdChange(java.lang.String onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnModalChange(java.lang.String onModalChange) {
		_onModalChange = onModalChange;

		setScopedAttribute("onModalChange", onModalChange);
	}

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnResizableChange(java.lang.String onResizableChange) {
		_onResizableChange = onResizableChange;

		setScopedAttribute("onResizableChange", onResizableChange);
	}

	public void setOnResizableInstanceChange(java.lang.String onResizableInstanceChange) {
		_onResizableInstanceChange = onResizableInstanceChange;

		setScopedAttribute("onResizableInstanceChange", onResizableInstanceChange);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStackChange(java.lang.String onStackChange) {
		_onStackChange = onStackChange;

		setScopedAttribute("onStackChange", onStackChange);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.String onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTitleChange(java.lang.String onTitleChange) {
		_onTitleChange = onTitleChange;

		setScopedAttribute("onTitleChange", onTitleChange);
	}

	public void setOnVisibleChange(java.lang.String onVisibleChange) {
		_onVisibleChange = onVisibleChange;

		setScopedAttribute("onVisibleChange", onVisibleChange);
	}

	public void setOnContentUpdate(java.lang.String onContentUpdate) {
		_onContentUpdate = onContentUpdate;

		setScopedAttribute("onContentUpdate", onContentUpdate);
	}

	public void setOnRender(java.lang.String onRender) {
		_onRender = onRender;

		setScopedAttribute("onRender", onRender);
	}

	public void setOnWidthChange(java.lang.String onWidthChange) {
		_onWidthChange = onWidthChange;

		setScopedAttribute("onWidthChange", onWidthChange);
	}


	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "dialogBodyContent", _dialogBodyContent);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "buttons", _buttons);
		setNamespacedAttribute(request, "close", _close);
		setNamespacedAttribute(request, "collapsed", _collapsed);
		setNamespacedAttribute(request, "collapsible", _collapsible);
		setNamespacedAttribute(request, "constrain2view", _constrain2view);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "destroyOnClose", _destroyOnClose);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "dragInstance", _dragInstance);
		setNamespacedAttribute(request, "draggable", _draggable);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "icons", _icons);
		setNamespacedAttribute(request, "dialogId", _dialogId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "modal", _modal);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "resizable", _resizable);
		setNamespacedAttribute(request, "resizableInstance", _resizableInstance);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "stack", _stack);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "title", _title);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterBodyContentChange", _afterBodyContentChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterButtonsChange", _afterButtonsChange);
		setNamespacedAttribute(request, "afterCloseChange", _afterCloseChange);
		setNamespacedAttribute(request, "afterCollapsedChange", _afterCollapsedChange);
		setNamespacedAttribute(request, "afterCollapsibleChange", _afterCollapsibleChange);
		setNamespacedAttribute(request, "afterConstrain2viewChange", _afterConstrain2viewChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyOnCloseChange", _afterDestroyOnCloseChange);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterDragInstanceChange", _afterDragInstanceChange);
		setNamespacedAttribute(request, "afterDraggableChange", _afterDraggableChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIconsChange", _afterIconsChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterModalChange", _afterModalChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterResizableChange", _afterResizableChange);
		setNamespacedAttribute(request, "afterResizableInstanceChange", _afterResizableInstanceChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStackChange", _afterStackChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTitleChange", _afterTitleChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onBodyContentChange", _onBodyContentChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onButtonsChange", _onButtonsChange);
		setNamespacedAttribute(request, "onCloseChange", _onCloseChange);
		setNamespacedAttribute(request, "onCollapsedChange", _onCollapsedChange);
		setNamespacedAttribute(request, "onCollapsibleChange", _onCollapsibleChange);
		setNamespacedAttribute(request, "onConstrain2viewChange", _onConstrain2viewChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyOnCloseChange", _onDestroyOnCloseChange);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onDragInstanceChange", _onDragInstanceChange);
		setNamespacedAttribute(request, "onDraggableChange", _onDraggableChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIconsChange", _onIconsChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onModalChange", _onModalChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onResizableChange", _onResizableChange);
		setNamespacedAttribute(request, "onResizableInstanceChange", _onResizableInstanceChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStackChange", _onStackChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTitleChange", _onTitleChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:dialog:";

	private static final String _PAGE =
		"/html/taglib/alloy/dialog/page.jsp";

	private java.lang.String _dialogBodyContent;
	private java.lang.String _boundingBox;
	private java.lang.String _buttons;
	private java.lang.Boolean _close;
	private java.lang.Boolean _collapsed;
	private java.lang.Boolean _collapsible;
	private java.lang.Object _constrain2view;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.Boolean _destroyOnClose;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _disabled;
	private java.lang.String _dragInstance;
	private java.lang.Boolean _draggable;
	private java.lang.Boolean _focused;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.String _icons;
	private java.lang.String _dialogId;
	private java.lang.Boolean _initialized;
	private java.lang.Boolean _modal;
	private java.lang.Boolean _render;
	private java.lang.Boolean _rendered;
	private java.lang.Boolean _resizable;
	private java.lang.String _resizableInstance;
	private java.lang.String _srcNode;
	private java.lang.Boolean _stack;
	private java.lang.Object _strings;
	private java.lang.Number _tabIndex;
	private java.lang.String _title;
	private java.lang.Boolean _visible;
	private java.lang.String _width;
	private java.lang.String _afterBodyContentChange;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterButtonsChange;
	private java.lang.String _afterCloseChange;
	private java.lang.String _afterCollapsedChange;
	private java.lang.String _afterCollapsibleChange;
	private java.lang.String _afterConstrain2viewChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyOnCloseChange;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterDragInstanceChange;
	private java.lang.String _afterDraggableChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIconsChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterModalChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterResizableChange;
	private java.lang.String _afterResizableInstanceChange;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStackChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterTitleChange;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _onBodyContentChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onButtonsChange;
	private java.lang.String _onCloseChange;
	private java.lang.String _onCollapsedChange;
	private java.lang.String _onCollapsibleChange;
	private java.lang.String _onConstrain2viewChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyOnCloseChange;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onDragInstanceChange;
	private java.lang.String _onDraggableChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIconsChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onModalChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onResizableChange;
	private java.lang.String _onResizableInstanceChange;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStackChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onTitleChange;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;

}
