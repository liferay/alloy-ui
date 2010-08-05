package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseTextboxlistTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseTextboxlistTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Boolean getAlwaysShowContainer() {
		return _alwaysShowContainer;
	}

	public java.lang.Boolean getApplyLocalFilter() {
		return _applyLocalFilter;
	}

	public java.lang.Boolean getAutoHighlight() {
		return _autoHighlight;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.Boolean getButton() {
		return _button;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.String getDataSource() {
		return _dataSource;
	}

	public java.lang.String getDataSourceType() {
		return _dataSourceType;
	}

	public java.lang.String getDelimChar() {
		return _delimChar;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Boolean getDisabled() {
		return _disabled;
	}

	public java.lang.Boolean getFocused() {
		return _focused;
	}

	public java.lang.Boolean getForceSelection() {
		return _forceSelection;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getTextboxlistId() {
		return _textboxlistId;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.String getMatchKey() {
		return _matchKey;
	}

	public java.lang.Number getMaxResultsDisplayed() {
		return _maxResultsDisplayed;
	}

	public java.lang.Number getMinQueryLength() {
		return _minQueryLength;
	}

	public java.lang.Number getQueryDelay() {
		return _queryDelay;
	}

	public java.lang.Number getQueryInterval() {
		return _queryInterval;
	}

	public java.lang.Boolean getQueryMatchCase() {
		return _queryMatchCase;
	}

	public java.lang.Boolean getQueryMatchContains() {
		return _queryMatchContains;
	}

	public java.lang.Boolean getQueryQuestionMark() {
		return _queryQuestionMark;
	}

	public java.lang.Boolean getRender() {
		return _render;
	}

	public java.lang.Boolean getRendered() {
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

	public java.lang.Boolean getSuppressInputUpdate() {
		return _suppressInputUpdate;
	}

	public java.lang.Number getTabIndex() {
		return _tabIndex;
	}

	public java.lang.Boolean getTypeAhead() {
		return _typeAhead;
	}

	public java.lang.Number getTypeAheadDelay() {
		return _typeAheadDelay;
	}

	public java.lang.String getUniqueName() {
		return _uniqueName;
	}

	public java.lang.Boolean getVisible() {
		return _visible;
	}

	public java.lang.String getWidth() {
		return _width;
	}

	public java.lang.String getAfterAlwaysShowContainerChange() {
		return _afterAlwaysShowContainerChange;
	}

	public java.lang.String getAfterApplyLocalFilterChange() {
		return _afterApplyLocalFilterChange;
	}

	public java.lang.String getAfterAutoHighlightChange() {
		return _afterAutoHighlightChange;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterButtonChange() {
		return _afterButtonChange;
	}

	public java.lang.String getAfterContainerCollapse() {
		return _afterContainerCollapse;
	}

	public java.lang.String getAfterContainerExpand() {
		return _afterContainerExpand;
	}

	public java.lang.String getAfterContainerPopulate() {
		return _afterContainerPopulate;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.String getAfterDataError() {
		return _afterDataError;
	}

	public java.lang.String getAfterDataRequest() {
		return _afterDataRequest;
	}

	public java.lang.String getAfterDataReturn() {
		return _afterDataReturn;
	}

	public java.lang.String getAfterDataSourceChange() {
		return _afterDataSourceChange;
	}

	public java.lang.String getAfterDataSourceTypeChange() {
		return _afterDataSourceTypeChange;
	}

	public java.lang.String getAfterDelimCharChange() {
		return _afterDelimCharChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterDisabledChange() {
		return _afterDisabledChange;
	}

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterForceSelectionChange() {
		return _afterForceSelectionChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHideClassChange() {
		return _afterHideClassChange;
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

	public java.lang.String getAfterInputChange() {
		return _afterInputChange;
	}

	public java.lang.String getAfterItemArrowFrom() {
		return _afterItemArrowFrom;
	}

	public java.lang.String getAfterItemArrowTo() {
		return _afterItemArrowTo;
	}

	public java.lang.String getAfterItemMouseOut() {
		return _afterItemMouseOut;
	}

	public java.lang.String getAfterItemMouseOver() {
		return _afterItemMouseOver;
	}

	public java.lang.String getAfterItemSelect() {
		return _afterItemSelect;
	}

	public java.lang.String getAfterMatchKeyChange() {
		return _afterMatchKeyChange;
	}

	public java.lang.String getAfterMaxResultsDisplayedChange() {
		return _afterMaxResultsDisplayedChange;
	}

	public java.lang.String getAfterMinQueryLengthChange() {
		return _afterMinQueryLengthChange;
	}

	public java.lang.String getAfterQueryDelayChange() {
		return _afterQueryDelayChange;
	}

	public java.lang.String getAfterQueryIntervalChange() {
		return _afterQueryIntervalChange;
	}

	public java.lang.String getAfterQueryMatchCaseChange() {
		return _afterQueryMatchCaseChange;
	}

	public java.lang.String getAfterQueryMatchContainsChange() {
		return _afterQueryMatchContainsChange;
	}

	public java.lang.String getAfterQueryQuestionMarkChange() {
		return _afterQueryQuestionMarkChange;
	}

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterSchemaChange() {
		return _afterSchemaChange;
	}

	public java.lang.String getAfterSchemaTypeChange() {
		return _afterSchemaTypeChange;
	}

	public java.lang.String getAfterSelectionEnforce() {
		return _afterSelectionEnforce;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterSuppressInputUpdateChange() {
		return _afterSuppressInputUpdateChange;
	}

	public java.lang.String getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.String getAfterTextboxBlur() {
		return _afterTextboxBlur;
	}

	public java.lang.String getAfterTextboxChange() {
		return _afterTextboxChange;
	}

	public java.lang.String getAfterTextboxFocus() {
		return _afterTextboxFocus;
	}

	public java.lang.String getAfterTextboxKey() {
		return _afterTextboxKey;
	}

	public java.lang.String getAfterTypeAhead() {
		return _afterTypeAhead;
	}

	public java.lang.String getAfterTypeAheadChange() {
		return _afterTypeAheadChange;
	}

	public java.lang.String getAfterTypeAheadDelayChange() {
		return _afterTypeAheadDelayChange;
	}

	public java.lang.String getAfterUniqueNameChange() {
		return _afterUniqueNameChange;
	}

	public java.lang.String getAfterUnmatchedItemSelect() {
		return _afterUnmatchedItemSelect;
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

	public java.lang.String getOnAlwaysShowContainerChange() {
		return _onAlwaysShowContainerChange;
	}

	public java.lang.String getOnApplyLocalFilterChange() {
		return _onApplyLocalFilterChange;
	}

	public java.lang.String getOnAutoHighlightChange() {
		return _onAutoHighlightChange;
	}

	public java.lang.String getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.String getOnButtonChange() {
		return _onButtonChange;
	}

	public java.lang.String getOnContainerCollapse() {
		return _onContainerCollapse;
	}

	public java.lang.String getOnContainerExpand() {
		return _onContainerExpand;
	}

	public java.lang.String getOnContainerPopulate() {
		return _onContainerPopulate;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.String getOnDataError() {
		return _onDataError;
	}

	public java.lang.String getOnDataRequest() {
		return _onDataRequest;
	}

	public java.lang.String getOnDataReturn() {
		return _onDataReturn;
	}

	public java.lang.String getOnDataSourceChange() {
		return _onDataSourceChange;
	}

	public java.lang.String getOnDataSourceTypeChange() {
		return _onDataSourceTypeChange;
	}

	public java.lang.String getOnDelimCharChange() {
		return _onDelimCharChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnDisabledChange() {
		return _onDisabledChange;
	}

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnForceSelectionChange() {
		return _onForceSelectionChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHideClassChange() {
		return _onHideClassChange;
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

	public java.lang.String getOnInputChange() {
		return _onInputChange;
	}

	public java.lang.String getOnItemArrowFrom() {
		return _onItemArrowFrom;
	}

	public java.lang.String getOnItemArrowTo() {
		return _onItemArrowTo;
	}

	public java.lang.String getOnItemMouseOut() {
		return _onItemMouseOut;
	}

	public java.lang.String getOnItemMouseOver() {
		return _onItemMouseOver;
	}

	public java.lang.String getOnItemSelect() {
		return _onItemSelect;
	}

	public java.lang.String getOnMatchKeyChange() {
		return _onMatchKeyChange;
	}

	public java.lang.String getOnMaxResultsDisplayedChange() {
		return _onMaxResultsDisplayedChange;
	}

	public java.lang.String getOnMinQueryLengthChange() {
		return _onMinQueryLengthChange;
	}

	public java.lang.String getOnQueryDelayChange() {
		return _onQueryDelayChange;
	}

	public java.lang.String getOnQueryIntervalChange() {
		return _onQueryIntervalChange;
	}

	public java.lang.String getOnQueryMatchCaseChange() {
		return _onQueryMatchCaseChange;
	}

	public java.lang.String getOnQueryMatchContainsChange() {
		return _onQueryMatchContainsChange;
	}

	public java.lang.String getOnQueryQuestionMarkChange() {
		return _onQueryQuestionMarkChange;
	}

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnSchemaChange() {
		return _onSchemaChange;
	}

	public java.lang.String getOnSchemaTypeChange() {
		return _onSchemaTypeChange;
	}

	public java.lang.String getOnSelectionEnforce() {
		return _onSelectionEnforce;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnSuppressInputUpdateChange() {
		return _onSuppressInputUpdateChange;
	}

	public java.lang.String getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.String getOnTextboxBlur() {
		return _onTextboxBlur;
	}

	public java.lang.String getOnTextboxChange() {
		return _onTextboxChange;
	}

	public java.lang.String getOnTextboxFocus() {
		return _onTextboxFocus;
	}

	public java.lang.String getOnTextboxKey() {
		return _onTextboxKey;
	}

	public java.lang.String getOnTypeAhead() {
		return _onTypeAhead;
	}

	public java.lang.String getOnTypeAheadChange() {
		return _onTypeAheadChange;
	}

	public java.lang.String getOnTypeAheadDelayChange() {
		return _onTypeAheadDelayChange;
	}

	public java.lang.String getOnUniqueNameChange() {
		return _onUniqueNameChange;
	}

	public java.lang.String getOnUnmatchedItemSelect() {
		return _onUnmatchedItemSelect;
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

	public void setAlwaysShowContainer(java.lang.Boolean alwaysShowContainer) {
		_alwaysShowContainer = alwaysShowContainer;

		setScopedAttribute("alwaysShowContainer", alwaysShowContainer);
	}

	public void setApplyLocalFilter(java.lang.Boolean applyLocalFilter) {
		_applyLocalFilter = applyLocalFilter;

		setScopedAttribute("applyLocalFilter", applyLocalFilter);
	}

	public void setAutoHighlight(java.lang.Boolean autoHighlight) {
		_autoHighlight = autoHighlight;

		setScopedAttribute("autoHighlight", autoHighlight);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setButton(java.lang.Boolean button) {
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

	public void setDataSource(java.lang.String dataSource) {
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

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.Boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFocused(java.lang.Boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setForceSelection(java.lang.Boolean forceSelection) {
		_forceSelection = forceSelection;

		setScopedAttribute("forceSelection", forceSelection);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setTextboxlistId(java.lang.String textboxlistId) {
		_textboxlistId = textboxlistId;

		setScopedAttribute("textboxlistId", textboxlistId);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInput(java.lang.String input) {
		_input = input;

		setScopedAttribute("input", input);
	}

	public void setMatchKey(java.lang.String matchKey) {
		_matchKey = matchKey;

		setScopedAttribute("matchKey", matchKey);
	}

	public void setMaxResultsDisplayed(java.lang.Number maxResultsDisplayed) {
		_maxResultsDisplayed = maxResultsDisplayed;

		setScopedAttribute("maxResultsDisplayed", maxResultsDisplayed);
	}

	public void setMinQueryLength(java.lang.Number minQueryLength) {
		_minQueryLength = minQueryLength;

		setScopedAttribute("minQueryLength", minQueryLength);
	}

	public void setQueryDelay(java.lang.Number queryDelay) {
		_queryDelay = queryDelay;

		setScopedAttribute("queryDelay", queryDelay);
	}

	public void setQueryInterval(java.lang.Number queryInterval) {
		_queryInterval = queryInterval;

		setScopedAttribute("queryInterval", queryInterval);
	}

	public void setQueryMatchCase(java.lang.Boolean queryMatchCase) {
		_queryMatchCase = queryMatchCase;

		setScopedAttribute("queryMatchCase", queryMatchCase);
	}

	public void setQueryMatchContains(java.lang.Boolean queryMatchContains) {
		_queryMatchContains = queryMatchContains;

		setScopedAttribute("queryMatchContains", queryMatchContains);
	}

	public void setQueryQuestionMark(java.lang.Boolean queryQuestionMark) {
		_queryQuestionMark = queryQuestionMark;

		setScopedAttribute("queryQuestionMark", queryQuestionMark);
	}

	public void setRender(java.lang.Boolean render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.Boolean rendered) {
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

	public void setSuppressInputUpdate(java.lang.Boolean suppressInputUpdate) {
		_suppressInputUpdate = suppressInputUpdate;

		setScopedAttribute("suppressInputUpdate", suppressInputUpdate);
	}

	public void setTabIndex(java.lang.Number tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTypeAhead(java.lang.Boolean typeAhead) {
		_typeAhead = typeAhead;

		setScopedAttribute("typeAhead", typeAhead);
	}

	public void setTypeAheadDelay(java.lang.Number typeAheadDelay) {
		_typeAheadDelay = typeAheadDelay;

		setScopedAttribute("typeAheadDelay", typeAheadDelay);
	}

	public void setUniqueName(java.lang.String uniqueName) {
		_uniqueName = uniqueName;

		setScopedAttribute("uniqueName", uniqueName);
	}

	public void setVisible(java.lang.Boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.String width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterAlwaysShowContainerChange(java.lang.String afterAlwaysShowContainerChange) {
		_afterAlwaysShowContainerChange = afterAlwaysShowContainerChange;

		setScopedAttribute("afterAlwaysShowContainerChange", afterAlwaysShowContainerChange);
	}

	public void setAfterApplyLocalFilterChange(java.lang.String afterApplyLocalFilterChange) {
		_afterApplyLocalFilterChange = afterApplyLocalFilterChange;

		setScopedAttribute("afterApplyLocalFilterChange", afterApplyLocalFilterChange);
	}

	public void setAfterAutoHighlightChange(java.lang.String afterAutoHighlightChange) {
		_afterAutoHighlightChange = afterAutoHighlightChange;

		setScopedAttribute("afterAutoHighlightChange", afterAutoHighlightChange);
	}

	public void setAfterBoundingBoxChange(java.lang.String afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonChange(java.lang.String afterButtonChange) {
		_afterButtonChange = afterButtonChange;

		setScopedAttribute("afterButtonChange", afterButtonChange);
	}

	public void setAfterContainerCollapse(java.lang.String afterContainerCollapse) {
		_afterContainerCollapse = afterContainerCollapse;

		setScopedAttribute("afterContainerCollapse", afterContainerCollapse);
	}

	public void setAfterContainerExpand(java.lang.String afterContainerExpand) {
		_afterContainerExpand = afterContainerExpand;

		setScopedAttribute("afterContainerExpand", afterContainerExpand);
	}

	public void setAfterContainerPopulate(java.lang.String afterContainerPopulate) {
		_afterContainerPopulate = afterContainerPopulate;

		setScopedAttribute("afterContainerPopulate", afterContainerPopulate);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDataError(java.lang.String afterDataError) {
		_afterDataError = afterDataError;

		setScopedAttribute("afterDataError", afterDataError);
	}

	public void setAfterDataRequest(java.lang.String afterDataRequest) {
		_afterDataRequest = afterDataRequest;

		setScopedAttribute("afterDataRequest", afterDataRequest);
	}

	public void setAfterDataReturn(java.lang.String afterDataReturn) {
		_afterDataReturn = afterDataReturn;

		setScopedAttribute("afterDataReturn", afterDataReturn);
	}

	public void setAfterDataSourceChange(java.lang.String afterDataSourceChange) {
		_afterDataSourceChange = afterDataSourceChange;

		setScopedAttribute("afterDataSourceChange", afterDataSourceChange);
	}

	public void setAfterDataSourceTypeChange(java.lang.String afterDataSourceTypeChange) {
		_afterDataSourceTypeChange = afterDataSourceTypeChange;

		setScopedAttribute("afterDataSourceTypeChange", afterDataSourceTypeChange);
	}

	public void setAfterDelimCharChange(java.lang.String afterDelimCharChange) {
		_afterDelimCharChange = afterDelimCharChange;

		setScopedAttribute("afterDelimCharChange", afterDelimCharChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDisabledChange(java.lang.String afterDisabledChange) {
		_afterDisabledChange = afterDisabledChange;

		setScopedAttribute("afterDisabledChange", afterDisabledChange);
	}

	public void setAfterFocusedChange(java.lang.String afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterForceSelectionChange(java.lang.String afterForceSelectionChange) {
		_afterForceSelectionChange = afterForceSelectionChange;

		setScopedAttribute("afterForceSelectionChange", afterForceSelectionChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.String afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
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

	public void setAfterInputChange(java.lang.String afterInputChange) {
		_afterInputChange = afterInputChange;

		setScopedAttribute("afterInputChange", afterInputChange);
	}

	public void setAfterItemArrowFrom(java.lang.String afterItemArrowFrom) {
		_afterItemArrowFrom = afterItemArrowFrom;

		setScopedAttribute("afterItemArrowFrom", afterItemArrowFrom);
	}

	public void setAfterItemArrowTo(java.lang.String afterItemArrowTo) {
		_afterItemArrowTo = afterItemArrowTo;

		setScopedAttribute("afterItemArrowTo", afterItemArrowTo);
	}

	public void setAfterItemMouseOut(java.lang.String afterItemMouseOut) {
		_afterItemMouseOut = afterItemMouseOut;

		setScopedAttribute("afterItemMouseOut", afterItemMouseOut);
	}

	public void setAfterItemMouseOver(java.lang.String afterItemMouseOver) {
		_afterItemMouseOver = afterItemMouseOver;

		setScopedAttribute("afterItemMouseOver", afterItemMouseOver);
	}

	public void setAfterItemSelect(java.lang.String afterItemSelect) {
		_afterItemSelect = afterItemSelect;

		setScopedAttribute("afterItemSelect", afterItemSelect);
	}

	public void setAfterMatchKeyChange(java.lang.String afterMatchKeyChange) {
		_afterMatchKeyChange = afterMatchKeyChange;

		setScopedAttribute("afterMatchKeyChange", afterMatchKeyChange);
	}

	public void setAfterMaxResultsDisplayedChange(java.lang.String afterMaxResultsDisplayedChange) {
		_afterMaxResultsDisplayedChange = afterMaxResultsDisplayedChange;

		setScopedAttribute("afterMaxResultsDisplayedChange", afterMaxResultsDisplayedChange);
	}

	public void setAfterMinQueryLengthChange(java.lang.String afterMinQueryLengthChange) {
		_afterMinQueryLengthChange = afterMinQueryLengthChange;

		setScopedAttribute("afterMinQueryLengthChange", afterMinQueryLengthChange);
	}

	public void setAfterQueryDelayChange(java.lang.String afterQueryDelayChange) {
		_afterQueryDelayChange = afterQueryDelayChange;

		setScopedAttribute("afterQueryDelayChange", afterQueryDelayChange);
	}

	public void setAfterQueryIntervalChange(java.lang.String afterQueryIntervalChange) {
		_afterQueryIntervalChange = afterQueryIntervalChange;

		setScopedAttribute("afterQueryIntervalChange", afterQueryIntervalChange);
	}

	public void setAfterQueryMatchCaseChange(java.lang.String afterQueryMatchCaseChange) {
		_afterQueryMatchCaseChange = afterQueryMatchCaseChange;

		setScopedAttribute("afterQueryMatchCaseChange", afterQueryMatchCaseChange);
	}

	public void setAfterQueryMatchContainsChange(java.lang.String afterQueryMatchContainsChange) {
		_afterQueryMatchContainsChange = afterQueryMatchContainsChange;

		setScopedAttribute("afterQueryMatchContainsChange", afterQueryMatchContainsChange);
	}

	public void setAfterQueryQuestionMarkChange(java.lang.String afterQueryQuestionMarkChange) {
		_afterQueryQuestionMarkChange = afterQueryQuestionMarkChange;

		setScopedAttribute("afterQueryQuestionMarkChange", afterQueryQuestionMarkChange);
	}

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSchemaChange(java.lang.String afterSchemaChange) {
		_afterSchemaChange = afterSchemaChange;

		setScopedAttribute("afterSchemaChange", afterSchemaChange);
	}

	public void setAfterSchemaTypeChange(java.lang.String afterSchemaTypeChange) {
		_afterSchemaTypeChange = afterSchemaTypeChange;

		setScopedAttribute("afterSchemaTypeChange", afterSchemaTypeChange);
	}

	public void setAfterSelectionEnforce(java.lang.String afterSelectionEnforce) {
		_afterSelectionEnforce = afterSelectionEnforce;

		setScopedAttribute("afterSelectionEnforce", afterSelectionEnforce);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterSuppressInputUpdateChange(java.lang.String afterSuppressInputUpdateChange) {
		_afterSuppressInputUpdateChange = afterSuppressInputUpdateChange;

		setScopedAttribute("afterSuppressInputUpdateChange", afterSuppressInputUpdateChange);
	}

	public void setAfterTabIndexChange(java.lang.String afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTextboxBlur(java.lang.String afterTextboxBlur) {
		_afterTextboxBlur = afterTextboxBlur;

		setScopedAttribute("afterTextboxBlur", afterTextboxBlur);
	}

	public void setAfterTextboxChange(java.lang.String afterTextboxChange) {
		_afterTextboxChange = afterTextboxChange;

		setScopedAttribute("afterTextboxChange", afterTextboxChange);
	}

	public void setAfterTextboxFocus(java.lang.String afterTextboxFocus) {
		_afterTextboxFocus = afterTextboxFocus;

		setScopedAttribute("afterTextboxFocus", afterTextboxFocus);
	}

	public void setAfterTextboxKey(java.lang.String afterTextboxKey) {
		_afterTextboxKey = afterTextboxKey;

		setScopedAttribute("afterTextboxKey", afterTextboxKey);
	}

	public void setAfterTypeAhead(java.lang.String afterTypeAhead) {
		_afterTypeAhead = afterTypeAhead;

		setScopedAttribute("afterTypeAhead", afterTypeAhead);
	}

	public void setAfterTypeAheadChange(java.lang.String afterTypeAheadChange) {
		_afterTypeAheadChange = afterTypeAheadChange;

		setScopedAttribute("afterTypeAheadChange", afterTypeAheadChange);
	}

	public void setAfterTypeAheadDelayChange(java.lang.String afterTypeAheadDelayChange) {
		_afterTypeAheadDelayChange = afterTypeAheadDelayChange;

		setScopedAttribute("afterTypeAheadDelayChange", afterTypeAheadDelayChange);
	}

	public void setAfterUniqueNameChange(java.lang.String afterUniqueNameChange) {
		_afterUniqueNameChange = afterUniqueNameChange;

		setScopedAttribute("afterUniqueNameChange", afterUniqueNameChange);
	}

	public void setAfterUnmatchedItemSelect(java.lang.String afterUnmatchedItemSelect) {
		_afterUnmatchedItemSelect = afterUnmatchedItemSelect;

		setScopedAttribute("afterUnmatchedItemSelect", afterUnmatchedItemSelect);
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

	public void setOnAlwaysShowContainerChange(java.lang.String onAlwaysShowContainerChange) {
		_onAlwaysShowContainerChange = onAlwaysShowContainerChange;

		setScopedAttribute("onAlwaysShowContainerChange", onAlwaysShowContainerChange);
	}

	public void setOnApplyLocalFilterChange(java.lang.String onApplyLocalFilterChange) {
		_onApplyLocalFilterChange = onApplyLocalFilterChange;

		setScopedAttribute("onApplyLocalFilterChange", onApplyLocalFilterChange);
	}

	public void setOnAutoHighlightChange(java.lang.String onAutoHighlightChange) {
		_onAutoHighlightChange = onAutoHighlightChange;

		setScopedAttribute("onAutoHighlightChange", onAutoHighlightChange);
	}

	public void setOnBoundingBoxChange(java.lang.String onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonChange(java.lang.String onButtonChange) {
		_onButtonChange = onButtonChange;

		setScopedAttribute("onButtonChange", onButtonChange);
	}

	public void setOnContainerCollapse(java.lang.String onContainerCollapse) {
		_onContainerCollapse = onContainerCollapse;

		setScopedAttribute("onContainerCollapse", onContainerCollapse);
	}

	public void setOnContainerExpand(java.lang.String onContainerExpand) {
		_onContainerExpand = onContainerExpand;

		setScopedAttribute("onContainerExpand", onContainerExpand);
	}

	public void setOnContainerPopulate(java.lang.String onContainerPopulate) {
		_onContainerPopulate = onContainerPopulate;

		setScopedAttribute("onContainerPopulate", onContainerPopulate);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDataError(java.lang.String onDataError) {
		_onDataError = onDataError;

		setScopedAttribute("onDataError", onDataError);
	}

	public void setOnDataRequest(java.lang.String onDataRequest) {
		_onDataRequest = onDataRequest;

		setScopedAttribute("onDataRequest", onDataRequest);
	}

	public void setOnDataReturn(java.lang.String onDataReturn) {
		_onDataReturn = onDataReturn;

		setScopedAttribute("onDataReturn", onDataReturn);
	}

	public void setOnDataSourceChange(java.lang.String onDataSourceChange) {
		_onDataSourceChange = onDataSourceChange;

		setScopedAttribute("onDataSourceChange", onDataSourceChange);
	}

	public void setOnDataSourceTypeChange(java.lang.String onDataSourceTypeChange) {
		_onDataSourceTypeChange = onDataSourceTypeChange;

		setScopedAttribute("onDataSourceTypeChange", onDataSourceTypeChange);
	}

	public void setOnDelimCharChange(java.lang.String onDelimCharChange) {
		_onDelimCharChange = onDelimCharChange;

		setScopedAttribute("onDelimCharChange", onDelimCharChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDisabledChange(java.lang.String onDisabledChange) {
		_onDisabledChange = onDisabledChange;

		setScopedAttribute("onDisabledChange", onDisabledChange);
	}

	public void setOnFocusedChange(java.lang.String onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnForceSelectionChange(java.lang.String onForceSelectionChange) {
		_onForceSelectionChange = onForceSelectionChange;

		setScopedAttribute("onForceSelectionChange", onForceSelectionChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.String onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
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

	public void setOnInputChange(java.lang.String onInputChange) {
		_onInputChange = onInputChange;

		setScopedAttribute("onInputChange", onInputChange);
	}

	public void setOnItemArrowFrom(java.lang.String onItemArrowFrom) {
		_onItemArrowFrom = onItemArrowFrom;

		setScopedAttribute("onItemArrowFrom", onItemArrowFrom);
	}

	public void setOnItemArrowTo(java.lang.String onItemArrowTo) {
		_onItemArrowTo = onItemArrowTo;

		setScopedAttribute("onItemArrowTo", onItemArrowTo);
	}

	public void setOnItemMouseOut(java.lang.String onItemMouseOut) {
		_onItemMouseOut = onItemMouseOut;

		setScopedAttribute("onItemMouseOut", onItemMouseOut);
	}

	public void setOnItemMouseOver(java.lang.String onItemMouseOver) {
		_onItemMouseOver = onItemMouseOver;

		setScopedAttribute("onItemMouseOver", onItemMouseOver);
	}

	public void setOnItemSelect(java.lang.String onItemSelect) {
		_onItemSelect = onItemSelect;

		setScopedAttribute("onItemSelect", onItemSelect);
	}

	public void setOnMatchKeyChange(java.lang.String onMatchKeyChange) {
		_onMatchKeyChange = onMatchKeyChange;

		setScopedAttribute("onMatchKeyChange", onMatchKeyChange);
	}

	public void setOnMaxResultsDisplayedChange(java.lang.String onMaxResultsDisplayedChange) {
		_onMaxResultsDisplayedChange = onMaxResultsDisplayedChange;

		setScopedAttribute("onMaxResultsDisplayedChange", onMaxResultsDisplayedChange);
	}

	public void setOnMinQueryLengthChange(java.lang.String onMinQueryLengthChange) {
		_onMinQueryLengthChange = onMinQueryLengthChange;

		setScopedAttribute("onMinQueryLengthChange", onMinQueryLengthChange);
	}

	public void setOnQueryDelayChange(java.lang.String onQueryDelayChange) {
		_onQueryDelayChange = onQueryDelayChange;

		setScopedAttribute("onQueryDelayChange", onQueryDelayChange);
	}

	public void setOnQueryIntervalChange(java.lang.String onQueryIntervalChange) {
		_onQueryIntervalChange = onQueryIntervalChange;

		setScopedAttribute("onQueryIntervalChange", onQueryIntervalChange);
	}

	public void setOnQueryMatchCaseChange(java.lang.String onQueryMatchCaseChange) {
		_onQueryMatchCaseChange = onQueryMatchCaseChange;

		setScopedAttribute("onQueryMatchCaseChange", onQueryMatchCaseChange);
	}

	public void setOnQueryMatchContainsChange(java.lang.String onQueryMatchContainsChange) {
		_onQueryMatchContainsChange = onQueryMatchContainsChange;

		setScopedAttribute("onQueryMatchContainsChange", onQueryMatchContainsChange);
	}

	public void setOnQueryQuestionMarkChange(java.lang.String onQueryQuestionMarkChange) {
		_onQueryQuestionMarkChange = onQueryQuestionMarkChange;

		setScopedAttribute("onQueryQuestionMarkChange", onQueryQuestionMarkChange);
	}

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSchemaChange(java.lang.String onSchemaChange) {
		_onSchemaChange = onSchemaChange;

		setScopedAttribute("onSchemaChange", onSchemaChange);
	}

	public void setOnSchemaTypeChange(java.lang.String onSchemaTypeChange) {
		_onSchemaTypeChange = onSchemaTypeChange;

		setScopedAttribute("onSchemaTypeChange", onSchemaTypeChange);
	}

	public void setOnSelectionEnforce(java.lang.String onSelectionEnforce) {
		_onSelectionEnforce = onSelectionEnforce;

		setScopedAttribute("onSelectionEnforce", onSelectionEnforce);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnSuppressInputUpdateChange(java.lang.String onSuppressInputUpdateChange) {
		_onSuppressInputUpdateChange = onSuppressInputUpdateChange;

		setScopedAttribute("onSuppressInputUpdateChange", onSuppressInputUpdateChange);
	}

	public void setOnTabIndexChange(java.lang.String onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTextboxBlur(java.lang.String onTextboxBlur) {
		_onTextboxBlur = onTextboxBlur;

		setScopedAttribute("onTextboxBlur", onTextboxBlur);
	}

	public void setOnTextboxChange(java.lang.String onTextboxChange) {
		_onTextboxChange = onTextboxChange;

		setScopedAttribute("onTextboxChange", onTextboxChange);
	}

	public void setOnTextboxFocus(java.lang.String onTextboxFocus) {
		_onTextboxFocus = onTextboxFocus;

		setScopedAttribute("onTextboxFocus", onTextboxFocus);
	}

	public void setOnTextboxKey(java.lang.String onTextboxKey) {
		_onTextboxKey = onTextboxKey;

		setScopedAttribute("onTextboxKey", onTextboxKey);
	}

	public void setOnTypeAhead(java.lang.String onTypeAhead) {
		_onTypeAhead = onTypeAhead;

		setScopedAttribute("onTypeAhead", onTypeAhead);
	}

	public void setOnTypeAheadChange(java.lang.String onTypeAheadChange) {
		_onTypeAheadChange = onTypeAheadChange;

		setScopedAttribute("onTypeAheadChange", onTypeAheadChange);
	}

	public void setOnTypeAheadDelayChange(java.lang.String onTypeAheadDelayChange) {
		_onTypeAheadDelayChange = onTypeAheadDelayChange;

		setScopedAttribute("onTypeAheadDelayChange", onTypeAheadDelayChange);
	}

	public void setOnUniqueNameChange(java.lang.String onUniqueNameChange) {
		_onUniqueNameChange = onUniqueNameChange;

		setScopedAttribute("onUniqueNameChange", onUniqueNameChange);
	}

	public void setOnUnmatchedItemSelect(java.lang.String onUnmatchedItemSelect) {
		_onUnmatchedItemSelect = onUnmatchedItemSelect;

		setScopedAttribute("onUnmatchedItemSelect", onUnmatchedItemSelect);
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
		setNamespacedAttribute(request, "alwaysShowContainer", _alwaysShowContainer);
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
		setNamespacedAttribute(request, "textboxlistId", _textboxlistId);
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:textboxlist:";

	private static final String _PAGE =
		"/html/taglib/alloy/textboxlist/page.jsp";

	private java.lang.Boolean _alwaysShowContainer;
	private java.lang.Boolean _applyLocalFilter;
	private java.lang.Boolean _autoHighlight;
	private java.lang.String _boundingBox;
	private java.lang.Boolean _button;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.String _dataSource;
	private java.lang.String _dataSourceType;
	private java.lang.String _delimChar;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _disabled;
	private java.lang.Boolean _focused;
	private java.lang.Boolean _forceSelection;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.String _textboxlistId;
	private java.lang.Boolean _initialized;
	private java.lang.String _input;
	private java.lang.String _matchKey;
	private java.lang.Number _maxResultsDisplayed;
	private java.lang.Number _minQueryLength;
	private java.lang.Number _queryDelay;
	private java.lang.Number _queryInterval;
	private java.lang.Boolean _queryMatchCase;
	private java.lang.Boolean _queryMatchContains;
	private java.lang.Boolean _queryQuestionMark;
	private java.lang.Boolean _render;
	private java.lang.Boolean _rendered;
	private java.lang.Object _schema;
	private java.lang.String _schemaType;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.Boolean _suppressInputUpdate;
	private java.lang.Number _tabIndex;
	private java.lang.Boolean _typeAhead;
	private java.lang.Number _typeAheadDelay;
	private java.lang.String _uniqueName;
	private java.lang.Boolean _visible;
	private java.lang.String _width;
	private java.lang.String _afterAlwaysShowContainerChange;
	private java.lang.String _afterApplyLocalFilterChange;
	private java.lang.String _afterAutoHighlightChange;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterButtonChange;
	private java.lang.String _afterContainerCollapse;
	private java.lang.String _afterContainerExpand;
	private java.lang.String _afterContainerPopulate;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDataError;
	private java.lang.String _afterDataRequest;
	private java.lang.String _afterDataReturn;
	private java.lang.String _afterDataSourceChange;
	private java.lang.String _afterDataSourceTypeChange;
	private java.lang.String _afterDelimCharChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterForceSelectionChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterInputChange;
	private java.lang.String _afterItemArrowFrom;
	private java.lang.String _afterItemArrowTo;
	private java.lang.String _afterItemMouseOut;
	private java.lang.String _afterItemMouseOver;
	private java.lang.String _afterItemSelect;
	private java.lang.String _afterMatchKeyChange;
	private java.lang.String _afterMaxResultsDisplayedChange;
	private java.lang.String _afterMinQueryLengthChange;
	private java.lang.String _afterQueryDelayChange;
	private java.lang.String _afterQueryIntervalChange;
	private java.lang.String _afterQueryMatchCaseChange;
	private java.lang.String _afterQueryMatchContainsChange;
	private java.lang.String _afterQueryQuestionMarkChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSchemaChange;
	private java.lang.String _afterSchemaTypeChange;
	private java.lang.String _afterSelectionEnforce;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterSuppressInputUpdateChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterTextboxBlur;
	private java.lang.String _afterTextboxChange;
	private java.lang.String _afterTextboxFocus;
	private java.lang.String _afterTextboxKey;
	private java.lang.String _afterTypeAhead;
	private java.lang.String _afterTypeAheadChange;
	private java.lang.String _afterTypeAheadDelayChange;
	private java.lang.String _afterUniqueNameChange;
	private java.lang.String _afterUnmatchedItemSelect;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _onAlwaysShowContainerChange;
	private java.lang.String _onApplyLocalFilterChange;
	private java.lang.String _onAutoHighlightChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onButtonChange;
	private java.lang.String _onContainerCollapse;
	private java.lang.String _onContainerExpand;
	private java.lang.String _onContainerPopulate;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDataError;
	private java.lang.String _onDataRequest;
	private java.lang.String _onDataReturn;
	private java.lang.String _onDataSourceChange;
	private java.lang.String _onDataSourceTypeChange;
	private java.lang.String _onDelimCharChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onForceSelectionChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onInputChange;
	private java.lang.String _onItemArrowFrom;
	private java.lang.String _onItemArrowTo;
	private java.lang.String _onItemMouseOut;
	private java.lang.String _onItemMouseOver;
	private java.lang.String _onItemSelect;
	private java.lang.String _onMatchKeyChange;
	private java.lang.String _onMaxResultsDisplayedChange;
	private java.lang.String _onMinQueryLengthChange;
	private java.lang.String _onQueryDelayChange;
	private java.lang.String _onQueryIntervalChange;
	private java.lang.String _onQueryMatchCaseChange;
	private java.lang.String _onQueryMatchContainsChange;
	private java.lang.String _onQueryQuestionMarkChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSchemaChange;
	private java.lang.String _onSchemaTypeChange;
	private java.lang.String _onSelectionEnforce;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onSuppressInputUpdateChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onTextboxBlur;
	private java.lang.String _onTextboxChange;
	private java.lang.String _onTextboxFocus;
	private java.lang.String _onTextboxKey;
	private java.lang.String _onTypeAhead;
	private java.lang.String _onTypeAheadChange;
	private java.lang.String _onTypeAheadDelayChange;
	private java.lang.String _onUniqueNameChange;
	private java.lang.String _onUnmatchedItemSelect;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;

}
