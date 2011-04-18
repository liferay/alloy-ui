/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.alloy.taglib.liferay.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseAutoCompleteTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getAlwaysShowContainer() {
		return _alwaysShowContainer;
	}

	public java.lang.String getTest() {
		return _test;
	}

	public boolean getApplyLocalFilter() {
		return _applyLocalFilter;
	}

	public boolean getAutoHighlight() {
		return _autoHighlight;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public boolean getButton() {
		return _button;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Object getDataSource() {
		return _dataSource;
	}

	public java.lang.String getDataSourceType() {
		return _dataSourceType;
	}

	public java.lang.String getDelimChar() {
		return _delimChar;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public boolean getFocused() {
		return _focused;
	}

	public boolean getForceSelection() {
		return _forceSelection;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getAutocompleteId() {
		return _autocompleteId;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.Object getMatchKey() {
		return _matchKey;
	}

	public java.lang.Object getMaxResultsDisplayed() {
		return _maxResultsDisplayed;
	}

	public java.lang.Object getMinQueryLength() {
		return _minQueryLength;
	}

	public java.lang.Object getQueryDelay() {
		return _queryDelay;
	}

	public java.lang.Object getQueryInterval() {
		return _queryInterval;
	}

	public boolean getQueryMatchCase() {
		return _queryMatchCase;
	}

	public boolean getQueryMatchContains() {
		return _queryMatchContains;
	}

	public boolean getQueryQuestionMark() {
		return _queryQuestionMark;
	}

	public java.lang.Object getRender() {
		return _render;
	}

	public boolean getRendered() {
		return _rendered;
	}

	public java.lang.Object getSchema() {
		return _schema;
	}

	public java.lang.String getSchemaType() {
		return _schemaType;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public boolean getSuppressInputUpdate() {
		return _suppressInputUpdate;
	}

	public java.lang.Object getTabIndex() {
		return _tabIndex;
	}

	public boolean getTypeAhead() {
		return _typeAhead;
	}

	public java.lang.Object getTypeAheadDelay() {
		return _typeAheadDelay;
	}

	public java.lang.String getUniqueName() {
		return _uniqueName;
	}

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterAlwaysShowContainerChange() {
		return _afterAlwaysShowContainerChange;
	}

	public java.lang.Object getAfterApplyLocalFilterChange() {
		return _afterApplyLocalFilterChange;
	}

	public java.lang.Object getAfterAutoHighlightChange() {
		return _afterAutoHighlightChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterButtonChange() {
		return _afterButtonChange;
	}

	public java.lang.Object getAfterContainerCollapse() {
		return _afterContainerCollapse;
	}

	public java.lang.Object getAfterContainerExpand() {
		return _afterContainerExpand;
	}

	public java.lang.Object getAfterContainerPopulate() {
		return _afterContainerPopulate;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterDataError() {
		return _afterDataError;
	}

	public java.lang.Object getAfterDataRequest() {
		return _afterDataRequest;
	}

	public java.lang.Object getAfterDataReturn() {
		return _afterDataReturn;
	}

	public java.lang.Object getAfterDataSourceChange() {
		return _afterDataSourceChange;
	}

	public java.lang.Object getAfterDataSourceTypeChange() {
		return _afterDataSourceTypeChange;
	}

	public java.lang.Object getAfterDelimCharChange() {
		return _afterDelimCharChange;
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

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterForceSelectionChange() {
		return _afterForceSelectionChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
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

	public java.lang.Object getAfterInputChange() {
		return _afterInputChange;
	}

	public java.lang.Object getAfterItemArrowFrom() {
		return _afterItemArrowFrom;
	}

	public java.lang.Object getAfterItemArrowTo() {
		return _afterItemArrowTo;
	}

	public java.lang.Object getAfterItemMouseOut() {
		return _afterItemMouseOut;
	}

	public java.lang.Object getAfterItemMouseOver() {
		return _afterItemMouseOver;
	}

	public java.lang.Object getAfterItemSelect() {
		return _afterItemSelect;
	}

	public java.lang.Object getAfterMatchKeyChange() {
		return _afterMatchKeyChange;
	}

	public java.lang.Object getAfterMaxResultsDisplayedChange() {
		return _afterMaxResultsDisplayedChange;
	}

	public java.lang.Object getAfterMinQueryLengthChange() {
		return _afterMinQueryLengthChange;
	}

	public java.lang.Object getAfterQueryDelayChange() {
		return _afterQueryDelayChange;
	}

	public java.lang.Object getAfterQueryIntervalChange() {
		return _afterQueryIntervalChange;
	}

	public java.lang.Object getAfterQueryMatchCaseChange() {
		return _afterQueryMatchCaseChange;
	}

	public java.lang.Object getAfterQueryMatchContainsChange() {
		return _afterQueryMatchContainsChange;
	}

	public java.lang.Object getAfterQueryQuestionMarkChange() {
		return _afterQueryQuestionMarkChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSchemaChange() {
		return _afterSchemaChange;
	}

	public java.lang.Object getAfterSchemaTypeChange() {
		return _afterSchemaTypeChange;
	}

	public java.lang.Object getAfterSelectionEnforce() {
		return _afterSelectionEnforce;
	}

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterSuppressInputUpdateChange() {
		return _afterSuppressInputUpdateChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.Object getAfterTextboxBlur() {
		return _afterTextboxBlur;
	}

	public java.lang.Object getAfterTextboxChange() {
		return _afterTextboxChange;
	}

	public java.lang.Object getAfterTextboxFocus() {
		return _afterTextboxFocus;
	}

	public java.lang.Object getAfterTextboxKey() {
		return _afterTextboxKey;
	}

	public java.lang.Object getAfterTypeAhead() {
		return _afterTypeAhead;
	}

	public java.lang.Object getAfterTypeAheadChange() {
		return _afterTypeAheadChange;
	}

	public java.lang.Object getAfterTypeAheadDelayChange() {
		return _afterTypeAheadDelayChange;
	}

	public java.lang.Object getAfterUniqueNameChange() {
		return _afterUniqueNameChange;
	}

	public java.lang.Object getAfterUnmatchedItemSelect() {
		return _afterUnmatchedItemSelect;
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

	public java.lang.Object getOnAlwaysShowContainerChange() {
		return _onAlwaysShowContainerChange;
	}

	public java.lang.Object getOnApplyLocalFilterChange() {
		return _onApplyLocalFilterChange;
	}

	public java.lang.Object getOnAutoHighlightChange() {
		return _onAutoHighlightChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnButtonChange() {
		return _onButtonChange;
	}

	public java.lang.Object getOnContainerCollapse() {
		return _onContainerCollapse;
	}

	public java.lang.Object getOnContainerExpand() {
		return _onContainerExpand;
	}

	public java.lang.Object getOnContainerPopulate() {
		return _onContainerPopulate;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnDataError() {
		return _onDataError;
	}

	public java.lang.Object getOnDataRequest() {
		return _onDataRequest;
	}

	public java.lang.Object getOnDataReturn() {
		return _onDataReturn;
	}

	public java.lang.Object getOnDataSourceChange() {
		return _onDataSourceChange;
	}

	public java.lang.Object getOnDataSourceTypeChange() {
		return _onDataSourceTypeChange;
	}

	public java.lang.Object getOnDelimCharChange() {
		return _onDelimCharChange;
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

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnForceSelectionChange() {
		return _onForceSelectionChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
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

	public java.lang.Object getOnInputChange() {
		return _onInputChange;
	}

	public java.lang.Object getOnItemArrowFrom() {
		return _onItemArrowFrom;
	}

	public java.lang.Object getOnItemArrowTo() {
		return _onItemArrowTo;
	}

	public java.lang.Object getOnItemMouseOut() {
		return _onItemMouseOut;
	}

	public java.lang.Object getOnItemMouseOver() {
		return _onItemMouseOver;
	}

	public java.lang.Object getOnItemSelect() {
		return _onItemSelect;
	}

	public java.lang.Object getOnMatchKeyChange() {
		return _onMatchKeyChange;
	}

	public java.lang.Object getOnMaxResultsDisplayedChange() {
		return _onMaxResultsDisplayedChange;
	}

	public java.lang.Object getOnMinQueryLengthChange() {
		return _onMinQueryLengthChange;
	}

	public java.lang.Object getOnQueryDelayChange() {
		return _onQueryDelayChange;
	}

	public java.lang.Object getOnQueryIntervalChange() {
		return _onQueryIntervalChange;
	}

	public java.lang.Object getOnQueryMatchCaseChange() {
		return _onQueryMatchCaseChange;
	}

	public java.lang.Object getOnQueryMatchContainsChange() {
		return _onQueryMatchContainsChange;
	}

	public java.lang.Object getOnQueryQuestionMarkChange() {
		return _onQueryQuestionMarkChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSchemaChange() {
		return _onSchemaChange;
	}

	public java.lang.Object getOnSchemaTypeChange() {
		return _onSchemaTypeChange;
	}

	public java.lang.Object getOnSelectionEnforce() {
		return _onSelectionEnforce;
	}

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnSuppressInputUpdateChange() {
		return _onSuppressInputUpdateChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.Object getOnTextboxBlur() {
		return _onTextboxBlur;
	}

	public java.lang.Object getOnTextboxChange() {
		return _onTextboxChange;
	}

	public java.lang.Object getOnTextboxFocus() {
		return _onTextboxFocus;
	}

	public java.lang.Object getOnTextboxKey() {
		return _onTextboxKey;
	}

	public java.lang.Object getOnTypeAhead() {
		return _onTypeAhead;
	}

	public java.lang.Object getOnTypeAheadChange() {
		return _onTypeAheadChange;
	}

	public java.lang.Object getOnTypeAheadDelayChange() {
		return _onTypeAheadDelayChange;
	}

	public java.lang.Object getOnUniqueNameChange() {
		return _onUniqueNameChange;
	}

	public java.lang.Object getOnUnmatchedItemSelect() {
		return _onUnmatchedItemSelect;
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

	public void setAlwaysShowContainer(java.lang.String alwaysShowContainer) {
		_alwaysShowContainer = alwaysShowContainer;

		setScopedAttribute("alwaysShowContainer", alwaysShowContainer);
	}

	public void setTest(java.lang.String test) {
		_test = test;

		setScopedAttribute("test", test);
	}

	public void setApplyLocalFilter(boolean applyLocalFilter) {
		_applyLocalFilter = applyLocalFilter;

		setScopedAttribute("applyLocalFilter", applyLocalFilter);
	}

	public void setAutoHighlight(boolean autoHighlight) {
		_autoHighlight = autoHighlight;

		setScopedAttribute("autoHighlight", autoHighlight);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setButton(boolean button) {
		_button = button;

		setScopedAttribute("button", button);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setDataSource(java.lang.Object dataSource) {
		_dataSource = dataSource;

		setScopedAttribute("dataSource", dataSource);
	}

	public void setDataSourceType(java.lang.String dataSourceType) {
		_dataSourceType = dataSourceType;

		setScopedAttribute("dataSourceType", dataSourceType);
	}

	public void setDelimChar(java.lang.String delimChar) {
		_delimChar = delimChar;

		setScopedAttribute("delimChar", delimChar);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setForceSelection(boolean forceSelection) {
		_forceSelection = forceSelection;

		setScopedAttribute("forceSelection", forceSelection);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setAutocompleteId(java.lang.String autocompleteId) {
		_autocompleteId = autocompleteId;

		setScopedAttribute("autocompleteId", autocompleteId);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInput(java.lang.String input) {
		_input = input;

		setScopedAttribute("input", input);
	}

	public void setMatchKey(java.lang.Object matchKey) {
		_matchKey = matchKey;

		setScopedAttribute("matchKey", matchKey);
	}

	public void setMaxResultsDisplayed(java.lang.Object maxResultsDisplayed) {
		_maxResultsDisplayed = maxResultsDisplayed;

		setScopedAttribute("maxResultsDisplayed", maxResultsDisplayed);
	}

	public void setMinQueryLength(java.lang.Object minQueryLength) {
		_minQueryLength = minQueryLength;

		setScopedAttribute("minQueryLength", minQueryLength);
	}

	public void setQueryDelay(java.lang.Object queryDelay) {
		_queryDelay = queryDelay;

		setScopedAttribute("queryDelay", queryDelay);
	}

	public void setQueryInterval(java.lang.Object queryInterval) {
		_queryInterval = queryInterval;

		setScopedAttribute("queryInterval", queryInterval);
	}

	public void setQueryMatchCase(boolean queryMatchCase) {
		_queryMatchCase = queryMatchCase;

		setScopedAttribute("queryMatchCase", queryMatchCase);
	}

	public void setQueryMatchContains(boolean queryMatchContains) {
		_queryMatchContains = queryMatchContains;

		setScopedAttribute("queryMatchContains", queryMatchContains);
	}

	public void setQueryQuestionMark(boolean queryQuestionMark) {
		_queryQuestionMark = queryQuestionMark;

		setScopedAttribute("queryQuestionMark", queryQuestionMark);
	}

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSchema(java.lang.Object schema) {
		_schema = schema;

		setScopedAttribute("schema", schema);
	}

	public void setSchemaType(java.lang.String schemaType) {
		_schemaType = schemaType;

		setScopedAttribute("schemaType", schemaType);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setSuppressInputUpdate(boolean suppressInputUpdate) {
		_suppressInputUpdate = suppressInputUpdate;

		setScopedAttribute("suppressInputUpdate", suppressInputUpdate);
	}

	public void setTabIndex(java.lang.Object tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTypeAhead(boolean typeAhead) {
		_typeAhead = typeAhead;

		setScopedAttribute("typeAhead", typeAhead);
	}

	public void setTypeAheadDelay(java.lang.Object typeAheadDelay) {
		_typeAheadDelay = typeAheadDelay;

		setScopedAttribute("typeAheadDelay", typeAheadDelay);
	}

	public void setUniqueName(java.lang.String uniqueName) {
		_uniqueName = uniqueName;

		setScopedAttribute("uniqueName", uniqueName);
	}

	public void setVisible(boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterAlwaysShowContainerChange(java.lang.Object afterAlwaysShowContainerChange) {
		_afterAlwaysShowContainerChange = afterAlwaysShowContainerChange;

		setScopedAttribute("afterAlwaysShowContainerChange", afterAlwaysShowContainerChange);
	}

	public void setAfterApplyLocalFilterChange(java.lang.Object afterApplyLocalFilterChange) {
		_afterApplyLocalFilterChange = afterApplyLocalFilterChange;

		setScopedAttribute("afterApplyLocalFilterChange", afterApplyLocalFilterChange);
	}

	public void setAfterAutoHighlightChange(java.lang.Object afterAutoHighlightChange) {
		_afterAutoHighlightChange = afterAutoHighlightChange;

		setScopedAttribute("afterAutoHighlightChange", afterAutoHighlightChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonChange(java.lang.Object afterButtonChange) {
		_afterButtonChange = afterButtonChange;

		setScopedAttribute("afterButtonChange", afterButtonChange);
	}

	public void setAfterContainerCollapse(java.lang.Object afterContainerCollapse) {
		_afterContainerCollapse = afterContainerCollapse;

		setScopedAttribute("afterContainerCollapse", afterContainerCollapse);
	}

	public void setAfterContainerExpand(java.lang.Object afterContainerExpand) {
		_afterContainerExpand = afterContainerExpand;

		setScopedAttribute("afterContainerExpand", afterContainerExpand);
	}

	public void setAfterContainerPopulate(java.lang.Object afterContainerPopulate) {
		_afterContainerPopulate = afterContainerPopulate;

		setScopedAttribute("afterContainerPopulate", afterContainerPopulate);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDataError(java.lang.Object afterDataError) {
		_afterDataError = afterDataError;

		setScopedAttribute("afterDataError", afterDataError);
	}

	public void setAfterDataRequest(java.lang.Object afterDataRequest) {
		_afterDataRequest = afterDataRequest;

		setScopedAttribute("afterDataRequest", afterDataRequest);
	}

	public void setAfterDataReturn(java.lang.Object afterDataReturn) {
		_afterDataReturn = afterDataReturn;

		setScopedAttribute("afterDataReturn", afterDataReturn);
	}

	public void setAfterDataSourceChange(java.lang.Object afterDataSourceChange) {
		_afterDataSourceChange = afterDataSourceChange;

		setScopedAttribute("afterDataSourceChange", afterDataSourceChange);
	}

	public void setAfterDataSourceTypeChange(java.lang.Object afterDataSourceTypeChange) {
		_afterDataSourceTypeChange = afterDataSourceTypeChange;

		setScopedAttribute("afterDataSourceTypeChange", afterDataSourceTypeChange);
	}

	public void setAfterDelimCharChange(java.lang.Object afterDelimCharChange) {
		_afterDelimCharChange = afterDelimCharChange;

		setScopedAttribute("afterDelimCharChange", afterDelimCharChange);
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

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterForceSelectionChange(java.lang.Object afterForceSelectionChange) {
		_afterForceSelectionChange = afterForceSelectionChange;

		setScopedAttribute("afterForceSelectionChange", afterForceSelectionChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
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

	public void setAfterInputChange(java.lang.Object afterInputChange) {
		_afterInputChange = afterInputChange;

		setScopedAttribute("afterInputChange", afterInputChange);
	}

	public void setAfterItemArrowFrom(java.lang.Object afterItemArrowFrom) {
		_afterItemArrowFrom = afterItemArrowFrom;

		setScopedAttribute("afterItemArrowFrom", afterItemArrowFrom);
	}

	public void setAfterItemArrowTo(java.lang.Object afterItemArrowTo) {
		_afterItemArrowTo = afterItemArrowTo;

		setScopedAttribute("afterItemArrowTo", afterItemArrowTo);
	}

	public void setAfterItemMouseOut(java.lang.Object afterItemMouseOut) {
		_afterItemMouseOut = afterItemMouseOut;

		setScopedAttribute("afterItemMouseOut", afterItemMouseOut);
	}

	public void setAfterItemMouseOver(java.lang.Object afterItemMouseOver) {
		_afterItemMouseOver = afterItemMouseOver;

		setScopedAttribute("afterItemMouseOver", afterItemMouseOver);
	}

	public void setAfterItemSelect(java.lang.Object afterItemSelect) {
		_afterItemSelect = afterItemSelect;

		setScopedAttribute("afterItemSelect", afterItemSelect);
	}

	public void setAfterMatchKeyChange(java.lang.Object afterMatchKeyChange) {
		_afterMatchKeyChange = afterMatchKeyChange;

		setScopedAttribute("afterMatchKeyChange", afterMatchKeyChange);
	}

	public void setAfterMaxResultsDisplayedChange(java.lang.Object afterMaxResultsDisplayedChange) {
		_afterMaxResultsDisplayedChange = afterMaxResultsDisplayedChange;

		setScopedAttribute("afterMaxResultsDisplayedChange", afterMaxResultsDisplayedChange);
	}

	public void setAfterMinQueryLengthChange(java.lang.Object afterMinQueryLengthChange) {
		_afterMinQueryLengthChange = afterMinQueryLengthChange;

		setScopedAttribute("afterMinQueryLengthChange", afterMinQueryLengthChange);
	}

	public void setAfterQueryDelayChange(java.lang.Object afterQueryDelayChange) {
		_afterQueryDelayChange = afterQueryDelayChange;

		setScopedAttribute("afterQueryDelayChange", afterQueryDelayChange);
	}

	public void setAfterQueryIntervalChange(java.lang.Object afterQueryIntervalChange) {
		_afterQueryIntervalChange = afterQueryIntervalChange;

		setScopedAttribute("afterQueryIntervalChange", afterQueryIntervalChange);
	}

	public void setAfterQueryMatchCaseChange(java.lang.Object afterQueryMatchCaseChange) {
		_afterQueryMatchCaseChange = afterQueryMatchCaseChange;

		setScopedAttribute("afterQueryMatchCaseChange", afterQueryMatchCaseChange);
	}

	public void setAfterQueryMatchContainsChange(java.lang.Object afterQueryMatchContainsChange) {
		_afterQueryMatchContainsChange = afterQueryMatchContainsChange;

		setScopedAttribute("afterQueryMatchContainsChange", afterQueryMatchContainsChange);
	}

	public void setAfterQueryQuestionMarkChange(java.lang.Object afterQueryQuestionMarkChange) {
		_afterQueryQuestionMarkChange = afterQueryQuestionMarkChange;

		setScopedAttribute("afterQueryQuestionMarkChange", afterQueryQuestionMarkChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSchemaChange(java.lang.Object afterSchemaChange) {
		_afterSchemaChange = afterSchemaChange;

		setScopedAttribute("afterSchemaChange", afterSchemaChange);
	}

	public void setAfterSchemaTypeChange(java.lang.Object afterSchemaTypeChange) {
		_afterSchemaTypeChange = afterSchemaTypeChange;

		setScopedAttribute("afterSchemaTypeChange", afterSchemaTypeChange);
	}

	public void setAfterSelectionEnforce(java.lang.Object afterSelectionEnforce) {
		_afterSelectionEnforce = afterSelectionEnforce;

		setScopedAttribute("afterSelectionEnforce", afterSelectionEnforce);
	}

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterSuppressInputUpdateChange(java.lang.Object afterSuppressInputUpdateChange) {
		_afterSuppressInputUpdateChange = afterSuppressInputUpdateChange;

		setScopedAttribute("afterSuppressInputUpdateChange", afterSuppressInputUpdateChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTextboxBlur(java.lang.Object afterTextboxBlur) {
		_afterTextboxBlur = afterTextboxBlur;

		setScopedAttribute("afterTextboxBlur", afterTextboxBlur);
	}

	public void setAfterTextboxChange(java.lang.Object afterTextboxChange) {
		_afterTextboxChange = afterTextboxChange;

		setScopedAttribute("afterTextboxChange", afterTextboxChange);
	}

	public void setAfterTextboxFocus(java.lang.Object afterTextboxFocus) {
		_afterTextboxFocus = afterTextboxFocus;

		setScopedAttribute("afterTextboxFocus", afterTextboxFocus);
	}

	public void setAfterTextboxKey(java.lang.Object afterTextboxKey) {
		_afterTextboxKey = afterTextboxKey;

		setScopedAttribute("afterTextboxKey", afterTextboxKey);
	}

	public void setAfterTypeAhead(java.lang.Object afterTypeAhead) {
		_afterTypeAhead = afterTypeAhead;

		setScopedAttribute("afterTypeAhead", afterTypeAhead);
	}

	public void setAfterTypeAheadChange(java.lang.Object afterTypeAheadChange) {
		_afterTypeAheadChange = afterTypeAheadChange;

		setScopedAttribute("afterTypeAheadChange", afterTypeAheadChange);
	}

	public void setAfterTypeAheadDelayChange(java.lang.Object afterTypeAheadDelayChange) {
		_afterTypeAheadDelayChange = afterTypeAheadDelayChange;

		setScopedAttribute("afterTypeAheadDelayChange", afterTypeAheadDelayChange);
	}

	public void setAfterUniqueNameChange(java.lang.Object afterUniqueNameChange) {
		_afterUniqueNameChange = afterUniqueNameChange;

		setScopedAttribute("afterUniqueNameChange", afterUniqueNameChange);
	}

	public void setAfterUnmatchedItemSelect(java.lang.Object afterUnmatchedItemSelect) {
		_afterUnmatchedItemSelect = afterUnmatchedItemSelect;

		setScopedAttribute("afterUnmatchedItemSelect", afterUnmatchedItemSelect);
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

	public void setOnAlwaysShowContainerChange(java.lang.Object onAlwaysShowContainerChange) {
		_onAlwaysShowContainerChange = onAlwaysShowContainerChange;

		setScopedAttribute("onAlwaysShowContainerChange", onAlwaysShowContainerChange);
	}

	public void setOnApplyLocalFilterChange(java.lang.Object onApplyLocalFilterChange) {
		_onApplyLocalFilterChange = onApplyLocalFilterChange;

		setScopedAttribute("onApplyLocalFilterChange", onApplyLocalFilterChange);
	}

	public void setOnAutoHighlightChange(java.lang.Object onAutoHighlightChange) {
		_onAutoHighlightChange = onAutoHighlightChange;

		setScopedAttribute("onAutoHighlightChange", onAutoHighlightChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonChange(java.lang.Object onButtonChange) {
		_onButtonChange = onButtonChange;

		setScopedAttribute("onButtonChange", onButtonChange);
	}

	public void setOnContainerCollapse(java.lang.Object onContainerCollapse) {
		_onContainerCollapse = onContainerCollapse;

		setScopedAttribute("onContainerCollapse", onContainerCollapse);
	}

	public void setOnContainerExpand(java.lang.Object onContainerExpand) {
		_onContainerExpand = onContainerExpand;

		setScopedAttribute("onContainerExpand", onContainerExpand);
	}

	public void setOnContainerPopulate(java.lang.Object onContainerPopulate) {
		_onContainerPopulate = onContainerPopulate;

		setScopedAttribute("onContainerPopulate", onContainerPopulate);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDataError(java.lang.Object onDataError) {
		_onDataError = onDataError;

		setScopedAttribute("onDataError", onDataError);
	}

	public void setOnDataRequest(java.lang.Object onDataRequest) {
		_onDataRequest = onDataRequest;

		setScopedAttribute("onDataRequest", onDataRequest);
	}

	public void setOnDataReturn(java.lang.Object onDataReturn) {
		_onDataReturn = onDataReturn;

		setScopedAttribute("onDataReturn", onDataReturn);
	}

	public void setOnDataSourceChange(java.lang.Object onDataSourceChange) {
		_onDataSourceChange = onDataSourceChange;

		setScopedAttribute("onDataSourceChange", onDataSourceChange);
	}

	public void setOnDataSourceTypeChange(java.lang.Object onDataSourceTypeChange) {
		_onDataSourceTypeChange = onDataSourceTypeChange;

		setScopedAttribute("onDataSourceTypeChange", onDataSourceTypeChange);
	}

	public void setOnDelimCharChange(java.lang.Object onDelimCharChange) {
		_onDelimCharChange = onDelimCharChange;

		setScopedAttribute("onDelimCharChange", onDelimCharChange);
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

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnForceSelectionChange(java.lang.Object onForceSelectionChange) {
		_onForceSelectionChange = onForceSelectionChange;

		setScopedAttribute("onForceSelectionChange", onForceSelectionChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
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

	public void setOnInputChange(java.lang.Object onInputChange) {
		_onInputChange = onInputChange;

		setScopedAttribute("onInputChange", onInputChange);
	}

	public void setOnItemArrowFrom(java.lang.Object onItemArrowFrom) {
		_onItemArrowFrom = onItemArrowFrom;

		setScopedAttribute("onItemArrowFrom", onItemArrowFrom);
	}

	public void setOnItemArrowTo(java.lang.Object onItemArrowTo) {
		_onItemArrowTo = onItemArrowTo;

		setScopedAttribute("onItemArrowTo", onItemArrowTo);
	}

	public void setOnItemMouseOut(java.lang.Object onItemMouseOut) {
		_onItemMouseOut = onItemMouseOut;

		setScopedAttribute("onItemMouseOut", onItemMouseOut);
	}

	public void setOnItemMouseOver(java.lang.Object onItemMouseOver) {
		_onItemMouseOver = onItemMouseOver;

		setScopedAttribute("onItemMouseOver", onItemMouseOver);
	}

	public void setOnItemSelect(java.lang.Object onItemSelect) {
		_onItemSelect = onItemSelect;

		setScopedAttribute("onItemSelect", onItemSelect);
	}

	public void setOnMatchKeyChange(java.lang.Object onMatchKeyChange) {
		_onMatchKeyChange = onMatchKeyChange;

		setScopedAttribute("onMatchKeyChange", onMatchKeyChange);
	}

	public void setOnMaxResultsDisplayedChange(java.lang.Object onMaxResultsDisplayedChange) {
		_onMaxResultsDisplayedChange = onMaxResultsDisplayedChange;

		setScopedAttribute("onMaxResultsDisplayedChange", onMaxResultsDisplayedChange);
	}

	public void setOnMinQueryLengthChange(java.lang.Object onMinQueryLengthChange) {
		_onMinQueryLengthChange = onMinQueryLengthChange;

		setScopedAttribute("onMinQueryLengthChange", onMinQueryLengthChange);
	}

	public void setOnQueryDelayChange(java.lang.Object onQueryDelayChange) {
		_onQueryDelayChange = onQueryDelayChange;

		setScopedAttribute("onQueryDelayChange", onQueryDelayChange);
	}

	public void setOnQueryIntervalChange(java.lang.Object onQueryIntervalChange) {
		_onQueryIntervalChange = onQueryIntervalChange;

		setScopedAttribute("onQueryIntervalChange", onQueryIntervalChange);
	}

	public void setOnQueryMatchCaseChange(java.lang.Object onQueryMatchCaseChange) {
		_onQueryMatchCaseChange = onQueryMatchCaseChange;

		setScopedAttribute("onQueryMatchCaseChange", onQueryMatchCaseChange);
	}

	public void setOnQueryMatchContainsChange(java.lang.Object onQueryMatchContainsChange) {
		_onQueryMatchContainsChange = onQueryMatchContainsChange;

		setScopedAttribute("onQueryMatchContainsChange", onQueryMatchContainsChange);
	}

	public void setOnQueryQuestionMarkChange(java.lang.Object onQueryQuestionMarkChange) {
		_onQueryQuestionMarkChange = onQueryQuestionMarkChange;

		setScopedAttribute("onQueryQuestionMarkChange", onQueryQuestionMarkChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSchemaChange(java.lang.Object onSchemaChange) {
		_onSchemaChange = onSchemaChange;

		setScopedAttribute("onSchemaChange", onSchemaChange);
	}

	public void setOnSchemaTypeChange(java.lang.Object onSchemaTypeChange) {
		_onSchemaTypeChange = onSchemaTypeChange;

		setScopedAttribute("onSchemaTypeChange", onSchemaTypeChange);
	}

	public void setOnSelectionEnforce(java.lang.Object onSelectionEnforce) {
		_onSelectionEnforce = onSelectionEnforce;

		setScopedAttribute("onSelectionEnforce", onSelectionEnforce);
	}

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnSuppressInputUpdateChange(java.lang.Object onSuppressInputUpdateChange) {
		_onSuppressInputUpdateChange = onSuppressInputUpdateChange;

		setScopedAttribute("onSuppressInputUpdateChange", onSuppressInputUpdateChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTextboxBlur(java.lang.Object onTextboxBlur) {
		_onTextboxBlur = onTextboxBlur;

		setScopedAttribute("onTextboxBlur", onTextboxBlur);
	}

	public void setOnTextboxChange(java.lang.Object onTextboxChange) {
		_onTextboxChange = onTextboxChange;

		setScopedAttribute("onTextboxChange", onTextboxChange);
	}

	public void setOnTextboxFocus(java.lang.Object onTextboxFocus) {
		_onTextboxFocus = onTextboxFocus;

		setScopedAttribute("onTextboxFocus", onTextboxFocus);
	}

	public void setOnTextboxKey(java.lang.Object onTextboxKey) {
		_onTextboxKey = onTextboxKey;

		setScopedAttribute("onTextboxKey", onTextboxKey);
	}

	public void setOnTypeAhead(java.lang.Object onTypeAhead) {
		_onTypeAhead = onTypeAhead;

		setScopedAttribute("onTypeAhead", onTypeAhead);
	}

	public void setOnTypeAheadChange(java.lang.Object onTypeAheadChange) {
		_onTypeAheadChange = onTypeAheadChange;

		setScopedAttribute("onTypeAheadChange", onTypeAheadChange);
	}

	public void setOnTypeAheadDelayChange(java.lang.Object onTypeAheadDelayChange) {
		_onTypeAheadDelayChange = onTypeAheadDelayChange;

		setScopedAttribute("onTypeAheadDelayChange", onTypeAheadDelayChange);
	}

	public void setOnUniqueNameChange(java.lang.Object onUniqueNameChange) {
		_onUniqueNameChange = onUniqueNameChange;

		setScopedAttribute("onUniqueNameChange", onUniqueNameChange);
	}

	public void setOnUnmatchedItemSelect(java.lang.Object onUnmatchedItemSelect) {
		_onUnmatchedItemSelect = onUnmatchedItemSelect;

		setScopedAttribute("onUnmatchedItemSelect", onUnmatchedItemSelect);
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

	protected void cleanUp() {
		_alwaysShowContainer = null;
		_test = null;
		_applyLocalFilter = true;
		_autoHighlight = true;
		_boundingBox = null;
		_button = true;
		_contentBox = null;
		_cssClass = null;
		_dataSource = null;
		_dataSourceType = null;
		_delimChar = null;
		_destroyed = false;
		_disabled = false;
		_focused = false;
		_forceSelection = false;
		_height = null;
		_hideClass = "yui3-aui-helper-hidden";
		_autocompleteId = null;
		_initialized = false;
		_input = null;
		_matchKey = null;
		_maxResultsDisplayed = 10;
		_minQueryLength = 1;
		_queryDelay = 0.2;
		_queryInterval = 0.5;
		_queryMatchCase = false;
		_queryMatchContains = false;
		_queryQuestionMark = true;
		_render = null;
		_rendered = false;
		_schema = null;
		_schemaType = "array";
		_srcNode = null;
		_strings = null;
		_suppressInputUpdate = false;
		_tabIndex = 0;
		_typeAhead = false;
		_typeAheadDelay = 0.2;
		_uniqueName = null;
		_visible = true;
		_width = null;
		_afterAlwaysShowContainerChange = null;
		_afterApplyLocalFilterChange = null;
		_afterAutoHighlightChange = null;
		_afterBoundingBoxChange = null;
		_afterButtonChange = null;
		_afterContainerCollapse = null;
		_afterContainerExpand = null;
		_afterContainerPopulate = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterDataError = null;
		_afterDataRequest = null;
		_afterDataReturn = null;
		_afterDataSourceChange = null;
		_afterDataSourceTypeChange = null;
		_afterDelimCharChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterFocusedChange = null;
		_afterForceSelectionChange = null;
		_afterHeightChange = null;
		_afterHideClassChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterInputChange = null;
		_afterItemArrowFrom = null;
		_afterItemArrowTo = null;
		_afterItemMouseOut = null;
		_afterItemMouseOver = null;
		_afterItemSelect = null;
		_afterMatchKeyChange = null;
		_afterMaxResultsDisplayedChange = null;
		_afterMinQueryLengthChange = null;
		_afterQueryDelayChange = null;
		_afterQueryIntervalChange = null;
		_afterQueryMatchCaseChange = null;
		_afterQueryMatchContainsChange = null;
		_afterQueryQuestionMarkChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSchemaChange = null;
		_afterSchemaTypeChange = null;
		_afterSelectionEnforce = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterSuppressInputUpdateChange = null;
		_afterTabIndexChange = null;
		_afterTextboxBlur = null;
		_afterTextboxChange = null;
		_afterTextboxFocus = null;
		_afterTextboxKey = null;
		_afterTypeAhead = null;
		_afterTypeAheadChange = null;
		_afterTypeAheadDelayChange = null;
		_afterUniqueNameChange = null;
		_afterUnmatchedItemSelect = null;
		_afterVisibleChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_onAlwaysShowContainerChange = null;
		_onApplyLocalFilterChange = null;
		_onAutoHighlightChange = null;
		_onBoundingBoxChange = null;
		_onButtonChange = null;
		_onContainerCollapse = null;
		_onContainerExpand = null;
		_onContainerPopulate = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onDataError = null;
		_onDataRequest = null;
		_onDataReturn = null;
		_onDataSourceChange = null;
		_onDataSourceTypeChange = null;
		_onDelimCharChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onFocusedChange = null;
		_onForceSelectionChange = null;
		_onHeightChange = null;
		_onHideClassChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onInputChange = null;
		_onItemArrowFrom = null;
		_onItemArrowTo = null;
		_onItemMouseOut = null;
		_onItemMouseOver = null;
		_onItemSelect = null;
		_onMatchKeyChange = null;
		_onMaxResultsDisplayedChange = null;
		_onMinQueryLengthChange = null;
		_onQueryDelayChange = null;
		_onQueryIntervalChange = null;
		_onQueryMatchCaseChange = null;
		_onQueryMatchContainsChange = null;
		_onQueryQuestionMarkChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSchemaChange = null;
		_onSchemaTypeChange = null;
		_onSelectionEnforce = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onSuppressInputUpdateChange = null;
		_onTabIndexChange = null;
		_onTextboxBlur = null;
		_onTextboxChange = null;
		_onTextboxFocus = null;
		_onTextboxKey = null;
		_onTypeAhead = null;
		_onTypeAheadChange = null;
		_onTypeAheadDelayChange = null;
		_onUniqueNameChange = null;
		_onUnmatchedItemSelect = null;
		_onVisibleChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "alwaysShowContainer", _alwaysShowContainer);
		setNamespacedAttribute(request, "test", _test);
		setNamespacedAttribute(request, "applyLocalFilter", _applyLocalFilter);
		setNamespacedAttribute(request, "autoHighlight", _autoHighlight);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "button", _button);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "dataSource", _dataSource);
		setNamespacedAttribute(request, "dataSourceType", _dataSourceType);
		setNamespacedAttribute(request, "delimChar", _delimChar);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "forceSelection", _forceSelection);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "autocompleteId", _autocompleteId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "input", _input);
		setNamespacedAttribute(request, "matchKey", _matchKey);
		setNamespacedAttribute(request, "maxResultsDisplayed", _maxResultsDisplayed);
		setNamespacedAttribute(request, "minQueryLength", _minQueryLength);
		setNamespacedAttribute(request, "queryDelay", _queryDelay);
		setNamespacedAttribute(request, "queryInterval", _queryInterval);
		setNamespacedAttribute(request, "queryMatchCase", _queryMatchCase);
		setNamespacedAttribute(request, "queryMatchContains", _queryMatchContains);
		setNamespacedAttribute(request, "queryQuestionMark", _queryQuestionMark);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "schema", _schema);
		setNamespacedAttribute(request, "schemaType", _schemaType);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "suppressInputUpdate", _suppressInputUpdate);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "typeAhead", _typeAhead);
		setNamespacedAttribute(request, "typeAheadDelay", _typeAheadDelay);
		setNamespacedAttribute(request, "uniqueName", _uniqueName);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterAlwaysShowContainerChange", _afterAlwaysShowContainerChange);
		setNamespacedAttribute(request, "afterApplyLocalFilterChange", _afterApplyLocalFilterChange);
		setNamespacedAttribute(request, "afterAutoHighlightChange", _afterAutoHighlightChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterButtonChange", _afterButtonChange);
		setNamespacedAttribute(request, "afterContainerCollapse", _afterContainerCollapse);
		setNamespacedAttribute(request, "afterContainerExpand", _afterContainerExpand);
		setNamespacedAttribute(request, "afterContainerPopulate", _afterContainerPopulate);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDataError", _afterDataError);
		setNamespacedAttribute(request, "afterDataRequest", _afterDataRequest);
		setNamespacedAttribute(request, "afterDataReturn", _afterDataReturn);
		setNamespacedAttribute(request, "afterDataSourceChange", _afterDataSourceChange);
		setNamespacedAttribute(request, "afterDataSourceTypeChange", _afterDataSourceTypeChange);
		setNamespacedAttribute(request, "afterDelimCharChange", _afterDelimCharChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterForceSelectionChange", _afterForceSelectionChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputChange", _afterInputChange);
		setNamespacedAttribute(request, "afterItemArrowFrom", _afterItemArrowFrom);
		setNamespacedAttribute(request, "afterItemArrowTo", _afterItemArrowTo);
		setNamespacedAttribute(request, "afterItemMouseOut", _afterItemMouseOut);
		setNamespacedAttribute(request, "afterItemMouseOver", _afterItemMouseOver);
		setNamespacedAttribute(request, "afterItemSelect", _afterItemSelect);
		setNamespacedAttribute(request, "afterMatchKeyChange", _afterMatchKeyChange);
		setNamespacedAttribute(request, "afterMaxResultsDisplayedChange", _afterMaxResultsDisplayedChange);
		setNamespacedAttribute(request, "afterMinQueryLengthChange", _afterMinQueryLengthChange);
		setNamespacedAttribute(request, "afterQueryDelayChange", _afterQueryDelayChange);
		setNamespacedAttribute(request, "afterQueryIntervalChange", _afterQueryIntervalChange);
		setNamespacedAttribute(request, "afterQueryMatchCaseChange", _afterQueryMatchCaseChange);
		setNamespacedAttribute(request, "afterQueryMatchContainsChange", _afterQueryMatchContainsChange);
		setNamespacedAttribute(request, "afterQueryQuestionMarkChange", _afterQueryQuestionMarkChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSchemaChange", _afterSchemaChange);
		setNamespacedAttribute(request, "afterSchemaTypeChange", _afterSchemaTypeChange);
		setNamespacedAttribute(request, "afterSelectionEnforce", _afterSelectionEnforce);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterSuppressInputUpdateChange", _afterSuppressInputUpdateChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTextboxBlur", _afterTextboxBlur);
		setNamespacedAttribute(request, "afterTextboxChange", _afterTextboxChange);
		setNamespacedAttribute(request, "afterTextboxFocus", _afterTextboxFocus);
		setNamespacedAttribute(request, "afterTextboxKey", _afterTextboxKey);
		setNamespacedAttribute(request, "afterTypeAhead", _afterTypeAhead);
		setNamespacedAttribute(request, "afterTypeAheadChange", _afterTypeAheadChange);
		setNamespacedAttribute(request, "afterTypeAheadDelayChange", _afterTypeAheadDelayChange);
		setNamespacedAttribute(request, "afterUniqueNameChange", _afterUniqueNameChange);
		setNamespacedAttribute(request, "afterUnmatchedItemSelect", _afterUnmatchedItemSelect);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onAlwaysShowContainerChange", _onAlwaysShowContainerChange);
		setNamespacedAttribute(request, "onApplyLocalFilterChange", _onApplyLocalFilterChange);
		setNamespacedAttribute(request, "onAutoHighlightChange", _onAutoHighlightChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onButtonChange", _onButtonChange);
		setNamespacedAttribute(request, "onContainerCollapse", _onContainerCollapse);
		setNamespacedAttribute(request, "onContainerExpand", _onContainerExpand);
		setNamespacedAttribute(request, "onContainerPopulate", _onContainerPopulate);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDataError", _onDataError);
		setNamespacedAttribute(request, "onDataRequest", _onDataRequest);
		setNamespacedAttribute(request, "onDataReturn", _onDataReturn);
		setNamespacedAttribute(request, "onDataSourceChange", _onDataSourceChange);
		setNamespacedAttribute(request, "onDataSourceTypeChange", _onDataSourceTypeChange);
		setNamespacedAttribute(request, "onDelimCharChange", _onDelimCharChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onForceSelectionChange", _onForceSelectionChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputChange", _onInputChange);
		setNamespacedAttribute(request, "onItemArrowFrom", _onItemArrowFrom);
		setNamespacedAttribute(request, "onItemArrowTo", _onItemArrowTo);
		setNamespacedAttribute(request, "onItemMouseOut", _onItemMouseOut);
		setNamespacedAttribute(request, "onItemMouseOver", _onItemMouseOver);
		setNamespacedAttribute(request, "onItemSelect", _onItemSelect);
		setNamespacedAttribute(request, "onMatchKeyChange", _onMatchKeyChange);
		setNamespacedAttribute(request, "onMaxResultsDisplayedChange", _onMaxResultsDisplayedChange);
		setNamespacedAttribute(request, "onMinQueryLengthChange", _onMinQueryLengthChange);
		setNamespacedAttribute(request, "onQueryDelayChange", _onQueryDelayChange);
		setNamespacedAttribute(request, "onQueryIntervalChange", _onQueryIntervalChange);
		setNamespacedAttribute(request, "onQueryMatchCaseChange", _onQueryMatchCaseChange);
		setNamespacedAttribute(request, "onQueryMatchContainsChange", _onQueryMatchContainsChange);
		setNamespacedAttribute(request, "onQueryQuestionMarkChange", _onQueryQuestionMarkChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSchemaChange", _onSchemaChange);
		setNamespacedAttribute(request, "onSchemaTypeChange", _onSchemaTypeChange);
		setNamespacedAttribute(request, "onSelectionEnforce", _onSelectionEnforce);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onSuppressInputUpdateChange", _onSuppressInputUpdateChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTextboxBlur", _onTextboxBlur);
		setNamespacedAttribute(request, "onTextboxChange", _onTextboxChange);
		setNamespacedAttribute(request, "onTextboxFocus", _onTextboxFocus);
		setNamespacedAttribute(request, "onTextboxKey", _onTextboxKey);
		setNamespacedAttribute(request, "onTypeAhead", _onTypeAhead);
		setNamespacedAttribute(request, "onTypeAheadChange", _onTypeAheadChange);
		setNamespacedAttribute(request, "onTypeAheadDelayChange", _onTypeAheadDelayChange);
		setNamespacedAttribute(request, "onUniqueNameChange", _onUniqueNameChange);
		setNamespacedAttribute(request, "onUnmatchedItemSelect", _onUnmatchedItemSelect);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "liferay:auto-complete:";

	private static final String _PAGE =
		"/html/taglib/liferay/auto_complete/page.jsp";

	protected java.lang.String _alwaysShowContainer;
	protected java.lang.String _test;
	protected boolean _applyLocalFilter;
	protected boolean _autoHighlight;
	protected java.lang.String _boundingBox;
	protected boolean _button;
	protected java.lang.String _contentBox;
	protected java.lang.String _cssClass;
	protected java.lang.Object _dataSource;
	protected java.lang.String _dataSourceType;
	protected java.lang.String _delimChar;
	protected boolean _destroyed;
	protected boolean _disabled;
	protected boolean _focused;
	protected boolean _forceSelection;
	protected java.lang.Object _height;
	protected java.lang.String _hideClass;
	protected java.lang.String _autocompleteId;
	protected boolean _initialized;
	protected java.lang.String _input;
	protected java.lang.Object _matchKey;
	protected java.lang.Object _maxResultsDisplayed;
	protected java.lang.Object _minQueryLength;
	protected java.lang.Object _queryDelay;
	protected java.lang.Object _queryInterval;
	protected boolean _queryMatchCase;
	protected boolean _queryMatchContains;
	protected boolean _queryQuestionMark;
	protected java.lang.Object _render;
	protected boolean _rendered;
	protected java.lang.Object _schema;
	protected java.lang.String _schemaType;
	protected java.lang.String _srcNode;
	protected java.lang.Object _strings;
	protected boolean _suppressInputUpdate;
	protected java.lang.Object _tabIndex;
	protected boolean _typeAhead;
	protected java.lang.Object _typeAheadDelay;
	protected java.lang.String _uniqueName;
	protected boolean _visible;
	protected java.lang.Object _width;
	protected java.lang.Object _afterAlwaysShowContainerChange;
	protected java.lang.Object _afterApplyLocalFilterChange;
	protected java.lang.Object _afterAutoHighlightChange;
	protected java.lang.Object _afterBoundingBoxChange;
	protected java.lang.Object _afterButtonChange;
	protected java.lang.Object _afterContainerCollapse;
	protected java.lang.Object _afterContainerExpand;
	protected java.lang.Object _afterContainerPopulate;
	protected java.lang.Object _afterContentBoxChange;
	protected java.lang.Object _afterCssClassChange;
	protected java.lang.Object _afterDataError;
	protected java.lang.Object _afterDataRequest;
	protected java.lang.Object _afterDataReturn;
	protected java.lang.Object _afterDataSourceChange;
	protected java.lang.Object _afterDataSourceTypeChange;
	protected java.lang.Object _afterDelimCharChange;
	protected java.lang.Object _afterDestroy;
	protected java.lang.Object _afterDestroyedChange;
	protected java.lang.Object _afterDisabledChange;
	protected java.lang.Object _afterFocusedChange;
	protected java.lang.Object _afterForceSelectionChange;
	protected java.lang.Object _afterHeightChange;
	protected java.lang.Object _afterHideClassChange;
	protected java.lang.Object _afterIdChange;
	protected java.lang.Object _afterInit;
	protected java.lang.Object _afterInitializedChange;
	protected java.lang.Object _afterInputChange;
	protected java.lang.Object _afterItemArrowFrom;
	protected java.lang.Object _afterItemArrowTo;
	protected java.lang.Object _afterItemMouseOut;
	protected java.lang.Object _afterItemMouseOver;
	protected java.lang.Object _afterItemSelect;
	protected java.lang.Object _afterMatchKeyChange;
	protected java.lang.Object _afterMaxResultsDisplayedChange;
	protected java.lang.Object _afterMinQueryLengthChange;
	protected java.lang.Object _afterQueryDelayChange;
	protected java.lang.Object _afterQueryIntervalChange;
	protected java.lang.Object _afterQueryMatchCaseChange;
	protected java.lang.Object _afterQueryMatchContainsChange;
	protected java.lang.Object _afterQueryQuestionMarkChange;
	protected java.lang.Object _afterRenderChange;
	protected java.lang.Object _afterRenderedChange;
	protected java.lang.Object _afterSchemaChange;
	protected java.lang.Object _afterSchemaTypeChange;
	protected java.lang.Object _afterSelectionEnforce;
	protected java.lang.Object _afterSrcNodeChange;
	protected java.lang.Object _afterStringsChange;
	protected java.lang.Object _afterSuppressInputUpdateChange;
	protected java.lang.Object _afterTabIndexChange;
	protected java.lang.Object _afterTextboxBlur;
	protected java.lang.Object _afterTextboxChange;
	protected java.lang.Object _afterTextboxFocus;
	protected java.lang.Object _afterTextboxKey;
	protected java.lang.Object _afterTypeAhead;
	protected java.lang.Object _afterTypeAheadChange;
	protected java.lang.Object _afterTypeAheadDelayChange;
	protected java.lang.Object _afterUniqueNameChange;
	protected java.lang.Object _afterUnmatchedItemSelect;
	protected java.lang.Object _afterVisibleChange;
	protected java.lang.Object _afterContentUpdate;
	protected java.lang.Object _afterRender;
	protected java.lang.Object _afterWidthChange;
	protected java.lang.Object _onAlwaysShowContainerChange;
	protected java.lang.Object _onApplyLocalFilterChange;
	protected java.lang.Object _onAutoHighlightChange;
	protected java.lang.Object _onBoundingBoxChange;
	protected java.lang.Object _onButtonChange;
	protected java.lang.Object _onContainerCollapse;
	protected java.lang.Object _onContainerExpand;
	protected java.lang.Object _onContainerPopulate;
	protected java.lang.Object _onContentBoxChange;
	protected java.lang.Object _onCssClassChange;
	protected java.lang.Object _onDataError;
	protected java.lang.Object _onDataRequest;
	protected java.lang.Object _onDataReturn;
	protected java.lang.Object _onDataSourceChange;
	protected java.lang.Object _onDataSourceTypeChange;
	protected java.lang.Object _onDelimCharChange;
	protected java.lang.Object _onDestroy;
	protected java.lang.Object _onDestroyedChange;
	protected java.lang.Object _onDisabledChange;
	protected java.lang.Object _onFocusedChange;
	protected java.lang.Object _onForceSelectionChange;
	protected java.lang.Object _onHeightChange;
	protected java.lang.Object _onHideClassChange;
	protected java.lang.Object _onIdChange;
	protected java.lang.Object _onInit;
	protected java.lang.Object _onInitializedChange;
	protected java.lang.Object _onInputChange;
	protected java.lang.Object _onItemArrowFrom;
	protected java.lang.Object _onItemArrowTo;
	protected java.lang.Object _onItemMouseOut;
	protected java.lang.Object _onItemMouseOver;
	protected java.lang.Object _onItemSelect;
	protected java.lang.Object _onMatchKeyChange;
	protected java.lang.Object _onMaxResultsDisplayedChange;
	protected java.lang.Object _onMinQueryLengthChange;
	protected java.lang.Object _onQueryDelayChange;
	protected java.lang.Object _onQueryIntervalChange;
	protected java.lang.Object _onQueryMatchCaseChange;
	protected java.lang.Object _onQueryMatchContainsChange;
	protected java.lang.Object _onQueryQuestionMarkChange;
	protected java.lang.Object _onRenderChange;
	protected java.lang.Object _onRenderedChange;
	protected java.lang.Object _onSchemaChange;
	protected java.lang.Object _onSchemaTypeChange;
	protected java.lang.Object _onSelectionEnforce;
	protected java.lang.Object _onSrcNodeChange;
	protected java.lang.Object _onStringsChange;
	protected java.lang.Object _onSuppressInputUpdateChange;
	protected java.lang.Object _onTabIndexChange;
	protected java.lang.Object _onTextboxBlur;
	protected java.lang.Object _onTextboxChange;
	protected java.lang.Object _onTextboxFocus;
	protected java.lang.Object _onTextboxKey;
	protected java.lang.Object _onTypeAhead;
	protected java.lang.Object _onTypeAheadChange;
	protected java.lang.Object _onTypeAheadDelayChange;
	protected java.lang.Object _onUniqueNameChange;
	protected java.lang.Object _onUnmatchedItemSelect;
	protected java.lang.Object _onVisibleChange;
	protected java.lang.Object _onContentUpdate;
	protected java.lang.Object _onRender;
	protected java.lang.Object _onWidthChange;

}