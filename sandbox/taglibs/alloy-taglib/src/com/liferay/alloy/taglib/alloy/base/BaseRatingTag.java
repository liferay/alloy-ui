package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseRatingTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseRatingTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Object getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getCanReset() {
		return _canReset;
	}

	public java.lang.Object getContentBox() {
		return _contentBox;
	}

	public java.lang.Object getCssClass() {
		return _cssClass;
	}

	public java.lang.String getDefaultSelected() {
		return _defaultSelected;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public java.lang.Object getElements() {
		return _elements;
	}

	public java.lang.String getFocused() {
		return _focused;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.Object getHiddenInput() {
		return _hiddenInput;
	}

	public java.lang.Object getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getRatingId() {
		return _ratingId;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.Object getInputName() {
		return _inputName;
	}

	public java.lang.Object getLabel() {
		return _label;
	}

	public java.lang.Object getLabelNode() {
		return _labelNode;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.String getSelectedIndex() {
		return _selectedIndex;
	}

	public java.lang.String getShowTitle() {
		return _showTitle;
	}

	public java.lang.String getSize() {
		return _size;
	}

	public java.lang.Object getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.String getTabIndex() {
		return _tabIndex;
	}

	public java.lang.Object getTitle() {
		return _title;
	}

	public java.lang.Object getRatingValue() {
		return _ratingValue;
	}

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCanResetChange() {
		return _afterCanResetChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterDefaultSelectedChange() {
		return _afterDefaultSelectedChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterDisabledChange() {
		return _afterDisabledChange;
	}

	public java.lang.Object getAfterElementsChange() {
		return _afterElementsChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHiddenInputChange() {
		return _afterHiddenInputChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.Object getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterInputNameChange() {
		return _afterInputNameChange;
	}

	public java.lang.Object getAfterItemClick() {
		return _afterItemClick;
	}

	public java.lang.Object getAfterItemOut() {
		return _afterItemOut;
	}

	public java.lang.Object getAfterItemSelect() {
		return _afterItemSelect;
	}

	public java.lang.Object getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.Object getAfterLabelNodeChange() {
		return _afterLabelNodeChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSelectedIndexChange() {
		return _afterSelectedIndexChange;
	}

	public java.lang.Object getAfterShowTitleChange() {
		return _afterShowTitleChange;
	}

	public java.lang.Object getAfterSizeChange() {
		return _afterSizeChange;
	}

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.Object getAfterTitleChange() {
		return _afterTitleChange;
	}

	public java.lang.Object getAfterValueChange() {
		return _afterValueChange;
	}

	public java.lang.Object getAfterVisibleChange() {
		return _afterVisibleChange;
	}

	public java.lang.Object getAfterContentUpdate() {
		return _afterContentUpdate;
	}

	public java.lang.Object getAfterRender() {
		return _afterRender;
	}

	public java.lang.Object getAfterWidthChange() {
		return _afterWidthChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnCanResetChange() {
		return _onCanResetChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnDefaultSelectedChange() {
		return _onDefaultSelectedChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnDisabledChange() {
		return _onDisabledChange;
	}

	public java.lang.Object getOnElementsChange() {
		return _onElementsChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHiddenInputChange() {
		return _onHiddenInputChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.Object getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnInputNameChange() {
		return _onInputNameChange;
	}

	public java.lang.Object getOnItemClick() {
		return _onItemClick;
	}

	public java.lang.Object getOnItemOut() {
		return _onItemOut;
	}

	public java.lang.Object getOnItemSelect() {
		return _onItemSelect;
	}

	public java.lang.Object getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.Object getOnLabelNodeChange() {
		return _onLabelNodeChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSelectedIndexChange() {
		return _onSelectedIndexChange;
	}

	public java.lang.Object getOnShowTitleChange() {
		return _onShowTitleChange;
	}

	public java.lang.Object getOnSizeChange() {
		return _onSizeChange;
	}

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.Object getOnTitleChange() {
		return _onTitleChange;
	}

	public java.lang.Object getOnValueChange() {
		return _onValueChange;
	}

	public java.lang.Object getOnVisibleChange() {
		return _onVisibleChange;
	}

	public java.lang.Object getOnContentUpdate() {
		return _onContentUpdate;
	}

	public java.lang.Object getOnRender() {
		return _onRender;
	}

	public java.lang.Object getOnWidthChange() {
		return _onWidthChange;
	}

	public void setBoundingBox(java.lang.Object boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCanReset(java.lang.String canReset) {
		_canReset = canReset;

		setScopedAttribute("canReset", canReset);
	}

	public void setContentBox(java.lang.Object contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.Object cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setDefaultSelected(java.lang.String defaultSelected) {
		_defaultSelected = defaultSelected;

		setScopedAttribute("defaultSelected", defaultSelected);
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.String disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setElements(java.lang.Object elements) {
		_elements = elements;

		setScopedAttribute("elements", elements);
	}

	public void setFocused(java.lang.String focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHiddenInput(java.lang.Object hiddenInput) {
		_hiddenInput = hiddenInput;

		setScopedAttribute("hiddenInput", hiddenInput);
	}

	public void setHideClass(java.lang.Object hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setRatingId(java.lang.Object ratingId) {
		_ratingId = ratingId;

		setScopedAttribute("ratingId", ratingId);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInputName(java.lang.Object inputName) {
		_inputName = inputName;

		setScopedAttribute("inputName", inputName);
	}

	public void setLabel(java.lang.Object label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setLabelNode(java.lang.Object labelNode) {
		_labelNode = labelNode;

		setScopedAttribute("labelNode", labelNode);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectedIndex(java.lang.String selectedIndex) {
		_selectedIndex = selectedIndex;

		setScopedAttribute("selectedIndex", selectedIndex);
	}

	public void setShowTitle(java.lang.String showTitle) {
		_showTitle = showTitle;

		setScopedAttribute("showTitle", showTitle);
	}

	public void setSize(java.lang.String size) {
		_size = size;

		setScopedAttribute("size", size);
	}

	public void setSrcNode(java.lang.Object srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.String tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTitle(java.lang.Object title) {
		_title = title;

		setScopedAttribute("title", title);
	}

	public void setRatingValue(java.lang.Object ratingValue) {
		_ratingValue = ratingValue;

		setScopedAttribute("ratingValue", ratingValue);
	}

	public void setVisible(java.lang.String visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterCanResetChange(java.lang.Object afterCanResetChange) {
		_afterCanResetChange = afterCanResetChange;

		setScopedAttribute("afterCanResetChange", afterCanResetChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDefaultSelectedChange(java.lang.Object afterDefaultSelectedChange) {
		_afterDefaultSelectedChange = afterDefaultSelectedChange;

		setScopedAttribute("afterDefaultSelectedChange", afterDefaultSelectedChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDisabledChange(java.lang.Object afterDisabledChange) {
		_afterDisabledChange = afterDisabledChange;

		setScopedAttribute("afterDisabledChange", afterDisabledChange);
	}

	public void setAfterElementsChange(java.lang.Object afterElementsChange) {
		_afterElementsChange = afterElementsChange;

		setScopedAttribute("afterElementsChange", afterElementsChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHiddenInputChange(java.lang.Object afterHiddenInputChange) {
		_afterHiddenInputChange = afterHiddenInputChange;

		setScopedAttribute("afterHiddenInputChange", afterHiddenInputChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterIdChange(java.lang.Object afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterInputNameChange(java.lang.Object afterInputNameChange) {
		_afterInputNameChange = afterInputNameChange;

		setScopedAttribute("afterInputNameChange", afterInputNameChange);
	}

	public void setAfterItemClick(java.lang.Object afterItemClick) {
		_afterItemClick = afterItemClick;

		setScopedAttribute("afterItemClick", afterItemClick);
	}

	public void setAfterItemOut(java.lang.Object afterItemOut) {
		_afterItemOut = afterItemOut;

		setScopedAttribute("afterItemOut", afterItemOut);
	}

	public void setAfterItemSelect(java.lang.Object afterItemSelect) {
		_afterItemSelect = afterItemSelect;

		setScopedAttribute("afterItemSelect", afterItemSelect);
	}

	public void setAfterLabelChange(java.lang.Object afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterLabelNodeChange(java.lang.Object afterLabelNodeChange) {
		_afterLabelNodeChange = afterLabelNodeChange;

		setScopedAttribute("afterLabelNodeChange", afterLabelNodeChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectedIndexChange(java.lang.Object afterSelectedIndexChange) {
		_afterSelectedIndexChange = afterSelectedIndexChange;

		setScopedAttribute("afterSelectedIndexChange", afterSelectedIndexChange);
	}

	public void setAfterShowTitleChange(java.lang.Object afterShowTitleChange) {
		_afterShowTitleChange = afterShowTitleChange;

		setScopedAttribute("afterShowTitleChange", afterShowTitleChange);
	}

	public void setAfterSizeChange(java.lang.Object afterSizeChange) {
		_afterSizeChange = afterSizeChange;

		setScopedAttribute("afterSizeChange", afterSizeChange);
	}

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTitleChange(java.lang.Object afterTitleChange) {
		_afterTitleChange = afterTitleChange;

		setScopedAttribute("afterTitleChange", afterTitleChange);
	}

	public void setAfterValueChange(java.lang.Object afterValueChange) {
		_afterValueChange = afterValueChange;

		setScopedAttribute("afterValueChange", afterValueChange);
	}

	public void setAfterVisibleChange(java.lang.Object afterVisibleChange) {
		_afterVisibleChange = afterVisibleChange;

		setScopedAttribute("afterVisibleChange", afterVisibleChange);
	}

	public void setAfterContentUpdate(java.lang.Object afterContentUpdate) {
		_afterContentUpdate = afterContentUpdate;

		setScopedAttribute("afterContentUpdate", afterContentUpdate);
	}

	public void setAfterRender(java.lang.Object afterRender) {
		_afterRender = afterRender;

		setScopedAttribute("afterRender", afterRender);
	}

	public void setAfterWidthChange(java.lang.Object afterWidthChange) {
		_afterWidthChange = afterWidthChange;

		setScopedAttribute("afterWidthChange", afterWidthChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnCanResetChange(java.lang.Object onCanResetChange) {
		_onCanResetChange = onCanResetChange;

		setScopedAttribute("onCanResetChange", onCanResetChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDefaultSelectedChange(java.lang.Object onDefaultSelectedChange) {
		_onDefaultSelectedChange = onDefaultSelectedChange;

		setScopedAttribute("onDefaultSelectedChange", onDefaultSelectedChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDisabledChange(java.lang.Object onDisabledChange) {
		_onDisabledChange = onDisabledChange;

		setScopedAttribute("onDisabledChange", onDisabledChange);
	}

	public void setOnElementsChange(java.lang.Object onElementsChange) {
		_onElementsChange = onElementsChange;

		setScopedAttribute("onElementsChange", onElementsChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHiddenInputChange(java.lang.Object onHiddenInputChange) {
		_onHiddenInputChange = onHiddenInputChange;

		setScopedAttribute("onHiddenInputChange", onHiddenInputChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnIdChange(java.lang.Object onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnInputNameChange(java.lang.Object onInputNameChange) {
		_onInputNameChange = onInputNameChange;

		setScopedAttribute("onInputNameChange", onInputNameChange);
	}

	public void setOnItemClick(java.lang.Object onItemClick) {
		_onItemClick = onItemClick;

		setScopedAttribute("onItemClick", onItemClick);
	}

	public void setOnItemOut(java.lang.Object onItemOut) {
		_onItemOut = onItemOut;

		setScopedAttribute("onItemOut", onItemOut);
	}

	public void setOnItemSelect(java.lang.Object onItemSelect) {
		_onItemSelect = onItemSelect;

		setScopedAttribute("onItemSelect", onItemSelect);
	}

	public void setOnLabelChange(java.lang.Object onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnLabelNodeChange(java.lang.Object onLabelNodeChange) {
		_onLabelNodeChange = onLabelNodeChange;

		setScopedAttribute("onLabelNodeChange", onLabelNodeChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectedIndexChange(java.lang.Object onSelectedIndexChange) {
		_onSelectedIndexChange = onSelectedIndexChange;

		setScopedAttribute("onSelectedIndexChange", onSelectedIndexChange);
	}

	public void setOnShowTitleChange(java.lang.Object onShowTitleChange) {
		_onShowTitleChange = onShowTitleChange;

		setScopedAttribute("onShowTitleChange", onShowTitleChange);
	}

	public void setOnSizeChange(java.lang.Object onSizeChange) {
		_onSizeChange = onSizeChange;

		setScopedAttribute("onSizeChange", onSizeChange);
	}

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTitleChange(java.lang.Object onTitleChange) {
		_onTitleChange = onTitleChange;

		setScopedAttribute("onTitleChange", onTitleChange);
	}

	public void setOnValueChange(java.lang.Object onValueChange) {
		_onValueChange = onValueChange;

		setScopedAttribute("onValueChange", onValueChange);
	}

	public void setOnVisibleChange(java.lang.Object onVisibleChange) {
		_onVisibleChange = onVisibleChange;

		setScopedAttribute("onVisibleChange", onVisibleChange);
	}

	public void setOnContentUpdate(java.lang.Object onContentUpdate) {
		_onContentUpdate = onContentUpdate;

		setScopedAttribute("onContentUpdate", onContentUpdate);
	}

	public void setOnRender(java.lang.Object onRender) {
		_onRender = onRender;

		setScopedAttribute("onRender", onRender);
	}

	public void setOnWidthChange(java.lang.Object onWidthChange) {
		_onWidthChange = onWidthChange;

		setScopedAttribute("onWidthChange", onWidthChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "canReset", _canReset);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "defaultSelected", _defaultSelected);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "elements", _elements);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hiddenInput", _hiddenInput);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "ratingId", _ratingId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "inputName", _inputName);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "labelNode", _labelNode);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectedIndex", _selectedIndex);
		setNamespacedAttribute(request, "showTitle", _showTitle);
		setNamespacedAttribute(request, "size", _size);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "title", _title);
		setNamespacedAttribute(request, "ratingValue", _ratingValue);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCanResetChange", _afterCanResetChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDefaultSelectedChange", _afterDefaultSelectedChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterElementsChange", _afterElementsChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHiddenInputChange", _afterHiddenInputChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputNameChange", _afterInputNameChange);
		setNamespacedAttribute(request, "afterItemClick", _afterItemClick);
		setNamespacedAttribute(request, "afterItemOut", _afterItemOut);
		setNamespacedAttribute(request, "afterItemSelect", _afterItemSelect);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterLabelNodeChange", _afterLabelNodeChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectedIndexChange", _afterSelectedIndexChange);
		setNamespacedAttribute(request, "afterShowTitleChange", _afterShowTitleChange);
		setNamespacedAttribute(request, "afterSizeChange", _afterSizeChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTitleChange", _afterTitleChange);
		setNamespacedAttribute(request, "afterValueChange", _afterValueChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCanResetChange", _onCanResetChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDefaultSelectedChange", _onDefaultSelectedChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onElementsChange", _onElementsChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHiddenInputChange", _onHiddenInputChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputNameChange", _onInputNameChange);
		setNamespacedAttribute(request, "onItemClick", _onItemClick);
		setNamespacedAttribute(request, "onItemOut", _onItemOut);
		setNamespacedAttribute(request, "onItemSelect", _onItemSelect);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onLabelNodeChange", _onLabelNodeChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectedIndexChange", _onSelectedIndexChange);
		setNamespacedAttribute(request, "onShowTitleChange", _onShowTitleChange);
		setNamespacedAttribute(request, "onSizeChange", _onSizeChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTitleChange", _onTitleChange);
		setNamespacedAttribute(request, "onValueChange", _onValueChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:rating:";

	private static final String _PAGE =
		"/html/taglib/alloy/rating/page.jsp";

	private java.lang.Object _boundingBox;
	private java.lang.String _canReset;
	private java.lang.Object _contentBox;
	private java.lang.Object _cssClass;
	private java.lang.String _defaultSelected;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.Object _elements;
	private java.lang.String _focused;
	private java.lang.Object _height;
	private java.lang.Object _hiddenInput;
	private java.lang.Object _hideClass;
	private java.lang.Object _ratingId;
	private java.lang.String _initialized;
	private java.lang.Object _inputName;
	private java.lang.Object _label;
	private java.lang.Object _labelNode;
	private java.lang.String _render;
	private java.lang.String _rendered;
	private java.lang.String _selectedIndex;
	private java.lang.String _showTitle;
	private java.lang.String _size;
	private java.lang.Object _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.Object _title;
	private java.lang.Object _ratingValue;
	private java.lang.String _visible;
	private java.lang.Object _width;
	private java.lang.Object _afterBoundingBoxChange;
	private java.lang.Object _afterCanResetChange;
	private java.lang.Object _afterContentBoxChange;
	private java.lang.Object _afterCssClassChange;
	private java.lang.Object _afterDefaultSelectedChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterDisabledChange;
	private java.lang.Object _afterElementsChange;
	private java.lang.Object _afterFocusedChange;
	private java.lang.Object _afterHeightChange;
	private java.lang.Object _afterHiddenInputChange;
	private java.lang.Object _afterHideClassChange;
	private java.lang.Object _afterIdChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterInputNameChange;
	private java.lang.Object _afterItemClick;
	private java.lang.Object _afterItemOut;
	private java.lang.Object _afterItemSelect;
	private java.lang.Object _afterLabelChange;
	private java.lang.Object _afterLabelNodeChange;
	private java.lang.Object _afterRenderChange;
	private java.lang.Object _afterRenderedChange;
	private java.lang.Object _afterSelectedIndexChange;
	private java.lang.Object _afterShowTitleChange;
	private java.lang.Object _afterSizeChange;
	private java.lang.Object _afterSrcNodeChange;
	private java.lang.Object _afterStringsChange;
	private java.lang.Object _afterTabIndexChange;
	private java.lang.Object _afterTitleChange;
	private java.lang.Object _afterValueChange;
	private java.lang.Object _afterVisibleChange;
	private java.lang.Object _afterContentUpdate;
	private java.lang.Object _afterRender;
	private java.lang.Object _afterWidthChange;
	private java.lang.Object _onBoundingBoxChange;
	private java.lang.Object _onCanResetChange;
	private java.lang.Object _onContentBoxChange;
	private java.lang.Object _onCssClassChange;
	private java.lang.Object _onDefaultSelectedChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onDisabledChange;
	private java.lang.Object _onElementsChange;
	private java.lang.Object _onFocusedChange;
	private java.lang.Object _onHeightChange;
	private java.lang.Object _onHiddenInputChange;
	private java.lang.Object _onHideClassChange;
	private java.lang.Object _onIdChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onInputNameChange;
	private java.lang.Object _onItemClick;
	private java.lang.Object _onItemOut;
	private java.lang.Object _onItemSelect;
	private java.lang.Object _onLabelChange;
	private java.lang.Object _onLabelNodeChange;
	private java.lang.Object _onRenderChange;
	private java.lang.Object _onRenderedChange;
	private java.lang.Object _onSelectedIndexChange;
	private java.lang.Object _onShowTitleChange;
	private java.lang.Object _onSizeChange;
	private java.lang.Object _onSrcNodeChange;
	private java.lang.Object _onStringsChange;
	private java.lang.Object _onTabIndexChange;
	private java.lang.Object _onTitleChange;
	private java.lang.Object _onValueChange;
	private java.lang.Object _onVisibleChange;
	private java.lang.Object _onContentUpdate;
	private java.lang.Object _onRender;
	private java.lang.Object _onWidthChange;

}
