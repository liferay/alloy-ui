<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:date-picker-select:align");
java.lang.String _appendOrder = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:appendOrder"));
java.lang.String _baseName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:baseName"));
java.lang.String _datepickerselectBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:boundingBox"));
java.lang.String _buttonNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode"));
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:cancellableHide"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:cssClass"));
java.lang.Number _currentDay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:currentDay"));
java.lang.Number _currentMonth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:currentMonth"));
java.lang.String _currentNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:currentNode"));
java.lang.Number _currentYear = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:currentYear"));
java.lang.String _dateFormat = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dateFormat"));
java.lang.String _dates = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dates"));
java.lang.String _dayNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode"));
java.lang.String _dayNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:fillHeight"));
java.lang.Number _firstDayOfWeek = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:firstDayOfWeek"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:hideClass"));
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:hideDelay"));
java.lang.String _hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:hideOn"));
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:hideOnDocumentClick"));
java.lang.String _datepickerselectId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:initialized"));
java.lang.String _maxDate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:maxDate"));
java.lang.String _minDate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:minDate"));
java.lang.String _monthNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode"));
java.lang.String _monthNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName"));
java.lang.Boolean _populateDay = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateDay"));
java.lang.Boolean _populateMonth = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateMonth"));
java.lang.Boolean _populateYear = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateYear"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:rendered"));
java.lang.Boolean _selectMultipleDates = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:selectMultipleDates"));
java.lang.String _selectWrapperNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode"));
java.lang.Boolean _setValue = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:setValue"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:shim"));
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:showDelay"));
java.lang.String _showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:showOn"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:srcNode"));
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:stack"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:date-picker-select:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:tabIndex"));
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:y"));
java.lang.String _yearNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode"));
java.lang.String _yearNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName"));
java.lang.String _yearRange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearRange"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterAlignChange"));
java.lang.String _afterAppendOrderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange"));
java.lang.String _afterBaseNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterBaseNameChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange"));
java.lang.String _afterButtonNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange"));
java.lang.String _afterCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCancellableHideChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCssClassChange"));
java.lang.String _afterCurrentDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentDayChange"));
java.lang.String _afterCurrentMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentMonthChange"));
java.lang.String _afterCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentNodeChange"));
java.lang.String _afterCurrentYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentYearChange"));
java.lang.String _afterDateFormatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDateFormatChange"));
java.lang.String _afterDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDatesChange"));
java.lang.String _afterDayNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeChange"));
java.lang.String _afterDayNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterFillHeightChange"));
java.lang.String _afterFirstDayOfWeekChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterFirstDayOfWeekChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideClassChange"));
java.lang.String _afterHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideDelayChange"));
java.lang.String _afterHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideOnChange"));
java.lang.String _afterHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideOnDocumentClickChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterInitializedChange"));
java.lang.String _afterMaxDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMaxDateChange"));
java.lang.String _afterMinDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMinDateChange"));
java.lang.String _afterMonthNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange"));
java.lang.String _afterMonthNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange"));
java.lang.String _afterPopulateDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange"));
java.lang.String _afterPopulateMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange"));
java.lang.String _afterPopulateYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderedChange"));
java.lang.String _afterSelectMultipleDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSelectMultipleDatesChange"));
java.lang.String _afterSelectWrapperNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange"));
java.lang.String _afterSetValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSetValueChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterShimChange"));
java.lang.String _afterShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterShowDelayChange"));
java.lang.String _afterShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterShowOnChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange"));
java.lang.String _afterStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterStackChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterTabIndexChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYChange"));
java.lang.String _afterYearNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeChange"));
java.lang.String _afterYearNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange"));
java.lang.String _afterYearRangeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearRangeChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onAlignChange"));
java.lang.String _onAppendOrderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onAppendOrderChange"));
java.lang.String _onBaseNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onBaseNameChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange"));
java.lang.String _onButtonNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onButtonNodeChange"));
java.lang.String _onCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCancellableHideChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCssClassChange"));
java.lang.String _onCurrentDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentDayChange"));
java.lang.String _onCurrentMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentMonthChange"));
java.lang.String _onCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentNodeChange"));
java.lang.String _onCurrentYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentYearChange"));
java.lang.String _onDateFormatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDateFormatChange"));
java.lang.String _onDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDatesChange"));
java.lang.String _onDayNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeChange"));
java.lang.String _onDayNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onFillHeightChange"));
java.lang.String _onFirstDayOfWeekChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onFirstDayOfWeekChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHideClassChange"));
java.lang.String _onHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHideDelayChange"));
java.lang.String _onHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHideOnChange"));
java.lang.String _onHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHideOnDocumentClickChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onInitializedChange"));
java.lang.String _onMaxDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMaxDateChange"));
java.lang.String _onMinDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMinDateChange"));
java.lang.String _onMonthNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeChange"));
java.lang.String _onMonthNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange"));
java.lang.String _onPopulateDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateDayChange"));
java.lang.String _onPopulateMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange"));
java.lang.String _onPopulateYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateYearChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderedChange"));
java.lang.String _onSelectMultipleDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSelectMultipleDatesChange"));
java.lang.String _onSelectWrapperNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange"));
java.lang.String _onSetValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSetValueChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onShimChange"));
java.lang.String _onShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onShowDelayChange"));
java.lang.String _onShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onShowOnChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSrcNodeChange"));
java.lang.String _onStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onStackChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onTabIndexChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYChange"));
java.lang.String _onYearNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeChange"));
java.lang.String _onYearNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange"));
java.lang.String _onYearRangeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearRangeChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:date-picker-select:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:date-picker-select:appendOrder") != null) {
	scopedAttributes.put("appendOrder", _appendOrder);
}

if (request.getAttribute("alloy:date-picker-select:baseName") != null) {
	scopedAttributes.put("baseName", _baseName);
}

if (request.getAttribute("alloy:date-picker-select:datepickerselectBodyContent") != null) {
	scopedAttributes.put("datepickerselectBodyContent", _datepickerselectBodyContent);
}

if (request.getAttribute("alloy:date-picker-select:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:date-picker-select:buttonNode") != null) {
	scopedAttributes.put("buttonNode", _buttonNode);
}

if (request.getAttribute("alloy:date-picker-select:cancellableHide") != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (request.getAttribute("alloy:date-picker-select:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:date-picker-select:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:date-picker-select:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:date-picker-select:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:date-picker-select:currentDay") != null) {
	scopedAttributes.put("currentDay", _currentDay);
}

if (request.getAttribute("alloy:date-picker-select:currentMonth") != null) {
	scopedAttributes.put("currentMonth", _currentMonth);
}

if (request.getAttribute("alloy:date-picker-select:currentNode") != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (request.getAttribute("alloy:date-picker-select:currentYear") != null) {
	scopedAttributes.put("currentYear", _currentYear);
}

if (request.getAttribute("alloy:date-picker-select:dateFormat") != null) {
	scopedAttributes.put("dateFormat", _dateFormat);
}

if (request.getAttribute("alloy:date-picker-select:dates") != null) {
	scopedAttributes.put("dates", _dates);
}

if (request.getAttribute("alloy:date-picker-select:dayNode") != null) {
	scopedAttributes.put("dayNode", _dayNode);
}

if (request.getAttribute("alloy:date-picker-select:dayNodeName") != null) {
	scopedAttributes.put("dayNodeName", _dayNodeName);
}

if (request.getAttribute("alloy:date-picker-select:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:date-picker-select:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:date-picker-select:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:date-picker-select:firstDayOfWeek") != null) {
	scopedAttributes.put("firstDayOfWeek", _firstDayOfWeek);
}

if (request.getAttribute("alloy:date-picker-select:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:date-picker-select:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:date-picker-select:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:date-picker-select:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:date-picker-select:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:date-picker-select:hideDelay") != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (request.getAttribute("alloy:date-picker-select:hideOn") != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (request.getAttribute("alloy:date-picker-select:hideOnDocumentClick") != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (request.getAttribute("alloy:date-picker-select:datepickerselectId") != null) {
	scopedAttributes.put("datepickerselectId", _datepickerselectId);
}

if (request.getAttribute("alloy:date-picker-select:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:date-picker-select:maxDate") != null) {
	scopedAttributes.put("maxDate", _maxDate);
}

if (request.getAttribute("alloy:date-picker-select:minDate") != null) {
	scopedAttributes.put("minDate", _minDate);
}

if (request.getAttribute("alloy:date-picker-select:monthNode") != null) {
	scopedAttributes.put("monthNode", _monthNode);
}

if (request.getAttribute("alloy:date-picker-select:monthNodeName") != null) {
	scopedAttributes.put("monthNodeName", _monthNodeName);
}

if (request.getAttribute("alloy:date-picker-select:populateDay") != null) {
	scopedAttributes.put("populateDay", _populateDay);
}

if (request.getAttribute("alloy:date-picker-select:populateMonth") != null) {
	scopedAttributes.put("populateMonth", _populateMonth);
}

if (request.getAttribute("alloy:date-picker-select:populateYear") != null) {
	scopedAttributes.put("populateYear", _populateYear);
}

if (request.getAttribute("alloy:date-picker-select:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:date-picker-select:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:date-picker-select:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:date-picker-select:selectMultipleDates") != null) {
	scopedAttributes.put("selectMultipleDates", _selectMultipleDates);
}

if (request.getAttribute("alloy:date-picker-select:selectWrapperNode") != null) {
	scopedAttributes.put("selectWrapperNode", _selectWrapperNode);
}

if (request.getAttribute("alloy:date-picker-select:setValue") != null) {
	scopedAttributes.put("setValue", _setValue);
}

if (request.getAttribute("alloy:date-picker-select:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:date-picker-select:showDelay") != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (request.getAttribute("alloy:date-picker-select:showOn") != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (request.getAttribute("alloy:date-picker-select:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:date-picker-select:stack") != null) {
	scopedAttributes.put("stack", _stack);
}

if (request.getAttribute("alloy:date-picker-select:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:date-picker-select:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:date-picker-select:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:date-picker-select:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:date-picker-select:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:date-picker-select:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:date-picker-select:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:date-picker-select:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:date-picker-select:yearNode") != null) {
	scopedAttributes.put("yearNode", _yearNode);
}

if (request.getAttribute("alloy:date-picker-select:yearNodeName") != null) {
	scopedAttributes.put("yearNodeName", _yearNodeName);
}

if (request.getAttribute("alloy:date-picker-select:yearRange") != null) {
	scopedAttributes.put("yearRange", _yearRange);
}

if (request.getAttribute("alloy:date-picker-select:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:date-picker-select:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:date-picker-select:afterAppendOrderChange") != null) {
	scopedAttributes.put("afterAppendOrderChange", _afterAppendOrderChange);
}

if (request.getAttribute("alloy:date-picker-select:afterBaseNameChange") != null) {
	scopedAttributes.put("afterBaseNameChange", _afterBaseNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:afterButtonNodeChange") != null) {
	scopedAttributes.put("afterButtonNodeChange", _afterButtonNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCancellableHideChange") != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:date-picker-select:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:date-picker-select:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCurrentDayChange") != null) {
	scopedAttributes.put("afterCurrentDayChange", _afterCurrentDayChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCurrentMonthChange") != null) {
	scopedAttributes.put("afterCurrentMonthChange", _afterCurrentMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCurrentNodeChange") != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCurrentYearChange") != null) {
	scopedAttributes.put("afterCurrentYearChange", _afterCurrentYearChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDateFormatChange") != null) {
	scopedAttributes.put("afterDateFormatChange", _afterDateFormatChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDatesChange") != null) {
	scopedAttributes.put("afterDatesChange", _afterDatesChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDayNodeChange") != null) {
	scopedAttributes.put("afterDayNodeChange", _afterDayNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange") != null) {
	scopedAttributes.put("afterDayNodeNameChange", _afterDayNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:date-picker-select:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:date-picker-select:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:afterFirstDayOfWeekChange") != null) {
	scopedAttributes.put("afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
}

if (request.getAttribute("alloy:date-picker-select:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHideDelayChange") != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHideOnChange") != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHideOnDocumentClickChange") != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:date-picker-select:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:date-picker-select:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:date-picker-select:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMaxDateChange") != null) {
	scopedAttributes.put("afterMaxDateChange", _afterMaxDateChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMinDateChange") != null) {
	scopedAttributes.put("afterMinDateChange", _afterMinDateChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMonthNodeChange") != null) {
	scopedAttributes.put("afterMonthNodeChange", _afterMonthNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange") != null) {
	scopedAttributes.put("afterMonthNodeNameChange", _afterMonthNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateDayChange") != null) {
	scopedAttributes.put("afterPopulateDayChange", _afterPopulateDayChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange") != null) {
	scopedAttributes.put("afterPopulateMonthChange", _afterPopulateMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateYearChange") != null) {
	scopedAttributes.put("afterPopulateYearChange", _afterPopulateYearChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:date-picker-select:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:date-picker-select:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSelectMultipleDatesChange") != null) {
	scopedAttributes.put("afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange") != null) {
	scopedAttributes.put("afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSetValueChange") != null) {
	scopedAttributes.put("afterSetValueChange", _afterSetValueChange);
}

if (request.getAttribute("alloy:date-picker-select:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:date-picker-select:afterShowDelayChange") != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (request.getAttribute("alloy:date-picker-select:afterShowOnChange") != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterStackChange") != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (request.getAttribute("alloy:date-picker-select:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:date-picker-select:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:date-picker-select:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:date-picker-select:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:date-picker-select:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:date-picker-select:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:date-picker-select:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:date-picker-select:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:date-picker-select:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearNodeChange") != null) {
	scopedAttributes.put("afterYearNodeChange", _afterYearNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange") != null) {
	scopedAttributes.put("afterYearNodeNameChange", _afterYearNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearRangeChange") != null) {
	scopedAttributes.put("afterYearRangeChange", _afterYearRangeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:date-picker-select:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:date-picker-select:onAppendOrderChange") != null) {
	scopedAttributes.put("onAppendOrderChange", _onAppendOrderChange);
}

if (request.getAttribute("alloy:date-picker-select:onBaseNameChange") != null) {
	scopedAttributes.put("onBaseNameChange", _onBaseNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:date-picker-select:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:onButtonNodeChange") != null) {
	scopedAttributes.put("onButtonNodeChange", _onButtonNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onCancellableHideChange") != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (request.getAttribute("alloy:date-picker-select:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:date-picker-select:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:date-picker-select:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:date-picker-select:onCurrentDayChange") != null) {
	scopedAttributes.put("onCurrentDayChange", _onCurrentDayChange);
}

if (request.getAttribute("alloy:date-picker-select:onCurrentMonthChange") != null) {
	scopedAttributes.put("onCurrentMonthChange", _onCurrentMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:onCurrentNodeChange") != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onCurrentYearChange") != null) {
	scopedAttributes.put("onCurrentYearChange", _onCurrentYearChange);
}

if (request.getAttribute("alloy:date-picker-select:onDateFormatChange") != null) {
	scopedAttributes.put("onDateFormatChange", _onDateFormatChange);
}

if (request.getAttribute("alloy:date-picker-select:onDatesChange") != null) {
	scopedAttributes.put("onDatesChange", _onDatesChange);
}

if (request.getAttribute("alloy:date-picker-select:onDayNodeChange") != null) {
	scopedAttributes.put("onDayNodeChange", _onDayNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onDayNodeNameChange") != null) {
	scopedAttributes.put("onDayNodeNameChange", _onDayNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:date-picker-select:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:date-picker-select:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:date-picker-select:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:onFirstDayOfWeekChange") != null) {
	scopedAttributes.put("onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
}

if (request.getAttribute("alloy:date-picker-select:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:date-picker-select:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:date-picker-select:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:date-picker-select:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:date-picker-select:onHideDelayChange") != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (request.getAttribute("alloy:date-picker-select:onHideOnChange") != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (request.getAttribute("alloy:date-picker-select:onHideOnDocumentClickChange") != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:date-picker-select:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:date-picker-select:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:date-picker-select:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:date-picker-select:onMaxDateChange") != null) {
	scopedAttributes.put("onMaxDateChange", _onMaxDateChange);
}

if (request.getAttribute("alloy:date-picker-select:onMinDateChange") != null) {
	scopedAttributes.put("onMinDateChange", _onMinDateChange);
}

if (request.getAttribute("alloy:date-picker-select:onMonthNodeChange") != null) {
	scopedAttributes.put("onMonthNodeChange", _onMonthNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange") != null) {
	scopedAttributes.put("onMonthNodeNameChange", _onMonthNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateDayChange") != null) {
	scopedAttributes.put("onPopulateDayChange", _onPopulateDayChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateMonthChange") != null) {
	scopedAttributes.put("onPopulateMonthChange", _onPopulateMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateYearChange") != null) {
	scopedAttributes.put("onPopulateYearChange", _onPopulateYearChange);
}

if (request.getAttribute("alloy:date-picker-select:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:date-picker-select:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:date-picker-select:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:date-picker-select:onSelectMultipleDatesChange") != null) {
	scopedAttributes.put("onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
}

if (request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange") != null) {
	scopedAttributes.put("onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onSetValueChange") != null) {
	scopedAttributes.put("onSetValueChange", _onSetValueChange);
}

if (request.getAttribute("alloy:date-picker-select:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:date-picker-select:onShowDelayChange") != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (request.getAttribute("alloy:date-picker-select:onShowOnChange") != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (request.getAttribute("alloy:date-picker-select:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onStackChange") != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (request.getAttribute("alloy:date-picker-select:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:date-picker-select:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:date-picker-select:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:date-picker-select:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:date-picker-select:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:date-picker-select:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:date-picker-select:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:date-picker-select:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:date-picker-select:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:date-picker-select:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearNodeChange") != null) {
	scopedAttributes.put("onYearNodeChange", _onYearNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearNodeNameChange") != null) {
	scopedAttributes.put("onYearNodeNameChange", _onYearNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearRangeChange") != null) {
	scopedAttributes.put("onYearRangeChange", _onYearRangeChange);
}

if (request.getAttribute("alloy:date-picker-select:onZIndexChange") != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>