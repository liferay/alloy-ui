<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:scopedAttributes");

java.lang.Boolean _alwaysVisible = (java.lang.Boolean)request.getAttribute("alloy:paginator:alwaysVisible");
java.lang.String _containers = (java.lang.String)request.getAttribute("alloy:paginator:containers");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:paginator:destroyed");
java.lang.String _firstPageLink = (java.lang.String)request.getAttribute("alloy:paginator:firstPageLink");
java.lang.String _firstPageLinkLabel = (java.lang.String)request.getAttribute("alloy:paginator:firstPageLinkLabel");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:paginator:initialized");
java.lang.String _lastPageLink = (java.lang.String)request.getAttribute("alloy:paginator:lastPageLink");
java.lang.String _lastPageLinkLabel = (java.lang.String)request.getAttribute("alloy:paginator:lastPageLinkLabel");
java.lang.Number _maxPageLinks = (java.lang.Number)request.getAttribute("alloy:paginator:maxPageLinks");
java.lang.String _nextPageLink = (java.lang.String)request.getAttribute("alloy:paginator:nextPageLink");
java.lang.String _nextPageLinkLabel = (java.lang.String)request.getAttribute("alloy:paginator:nextPageLinkLabel");
java.lang.Number _page = (java.lang.Number)request.getAttribute("alloy:paginator:page");
java.lang.String _pageContainerTemplate = (java.lang.String)request.getAttribute("alloy:paginator:pageContainerTemplate");
java.lang.String _pageLinkContent = (java.lang.String)request.getAttribute("alloy:paginator:pageLinkContent");
java.lang.String _pageLinkTemplate = (java.lang.String)request.getAttribute("alloy:paginator:pageLinkTemplate");
java.lang.String _pageReportEl = (java.lang.String)request.getAttribute("alloy:paginator:pageReportEl");
java.lang.String _pageReportLabelTemplate = (java.lang.String)request.getAttribute("alloy:paginator:pageReportLabelTemplate");
java.lang.String _prevPageLink = (java.lang.String)request.getAttribute("alloy:paginator:prevPageLink");
java.lang.String _prevPageLinkLabel = (java.lang.String)request.getAttribute("alloy:paginator:prevPageLinkLabel");
java.lang.Number _rowsPerPage = (java.lang.Number)request.getAttribute("alloy:paginator:rowsPerPage");
java.lang.String _rowsPerPageEl = (java.lang.String)request.getAttribute("alloy:paginator:rowsPerPageEl");
java.lang.String _rowsPerPageOptions = (java.lang.String)request.getAttribute("alloy:paginator:rowsPerPageOptions");
java.lang.Object _state = (java.lang.Object)request.getAttribute("alloy:paginator:state");
java.lang.String _template = (java.lang.String)request.getAttribute("alloy:paginator:template");
java.lang.Number _total = (java.lang.Number)request.getAttribute("alloy:paginator:total");
java.lang.String _totalEl = (java.lang.String)request.getAttribute("alloy:paginator:totalEl");
java.lang.String _totalLabel = (java.lang.String)request.getAttribute("alloy:paginator:totalLabel");
java.lang.Number _totalPages = (java.lang.Number)request.getAttribute("alloy:paginator:totalPages");
java.lang.String _afterAlwaysVisibleChange = (java.lang.String)request.getAttribute("alloy:paginator:afterAlwaysVisibleChange");
java.lang.String _afterContainersChange = (java.lang.String)request.getAttribute("alloy:paginator:afterContainersChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:paginator:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:paginator:afterDestroyedChange");
java.lang.String _afterFirstPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:afterFirstPageLinkChange");
java.lang.String _afterFirstPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:afterFirstPageLinkLabelChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:paginator:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:paginator:afterInitializedChange");
java.lang.String _afterLastPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:afterLastPageLinkChange");
java.lang.String _afterLastPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:afterLastPageLinkLabelChange");
java.lang.String _afterMaxPageLinksChange = (java.lang.String)request.getAttribute("alloy:paginator:afterMaxPageLinksChange");
java.lang.String _afterNextPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:afterNextPageLinkChange");
java.lang.String _afterNextPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:afterNextPageLinkLabelChange");
java.lang.String _afterPageChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageChange");
java.lang.String _afterPageContainerTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageContainerTemplateChange");
java.lang.String _afterPageLinkContentChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageLinkContentChange");
java.lang.String _afterPageLinkTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageLinkTemplateChange");
java.lang.String _afterPageReportElChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageReportElChange");
java.lang.String _afterPageReportLabelTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPageReportLabelTemplateChange");
java.lang.String _afterPrevPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPrevPageLinkChange");
java.lang.String _afterPrevPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:afterPrevPageLinkLabelChange");
java.lang.String _afterRowsPerPageChange = (java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageChange");
java.lang.String _afterRowsPerPageElChange = (java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageElChange");
java.lang.String _afterRowsPerPageOptionsChange = (java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageOptionsChange");
java.lang.String _afterStateChange = (java.lang.String)request.getAttribute("alloy:paginator:afterStateChange");
java.lang.String _afterTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:afterTemplateChange");
java.lang.String _afterTotalChange = (java.lang.String)request.getAttribute("alloy:paginator:afterTotalChange");
java.lang.String _afterTotalElChange = (java.lang.String)request.getAttribute("alloy:paginator:afterTotalElChange");
java.lang.String _afterTotalLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:afterTotalLabelChange");
java.lang.String _afterTotalPagesChange = (java.lang.String)request.getAttribute("alloy:paginator:afterTotalPagesChange");
java.lang.String _onAlwaysVisibleChange = (java.lang.String)request.getAttribute("alloy:paginator:onAlwaysVisibleChange");
java.lang.String _onContainersChange = (java.lang.String)request.getAttribute("alloy:paginator:onContainersChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:paginator:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:paginator:onDestroyedChange");
java.lang.String _onFirstPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:onFirstPageLinkChange");
java.lang.String _onFirstPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:onFirstPageLinkLabelChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:paginator:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:paginator:onInitializedChange");
java.lang.String _onLastPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:onLastPageLinkChange");
java.lang.String _onLastPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:onLastPageLinkLabelChange");
java.lang.String _onMaxPageLinksChange = (java.lang.String)request.getAttribute("alloy:paginator:onMaxPageLinksChange");
java.lang.String _onNextPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:onNextPageLinkChange");
java.lang.String _onNextPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:onNextPageLinkLabelChange");
java.lang.String _onPageChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageChange");
java.lang.String _onPageContainerTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageContainerTemplateChange");
java.lang.String _onPageLinkContentChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageLinkContentChange");
java.lang.String _onPageLinkTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageLinkTemplateChange");
java.lang.String _onPageReportElChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageReportElChange");
java.lang.String _onPageReportLabelTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:onPageReportLabelTemplateChange");
java.lang.String _onPrevPageLinkChange = (java.lang.String)request.getAttribute("alloy:paginator:onPrevPageLinkChange");
java.lang.String _onPrevPageLinkLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:onPrevPageLinkLabelChange");
java.lang.String _onRowsPerPageChange = (java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageChange");
java.lang.String _onRowsPerPageElChange = (java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageElChange");
java.lang.String _onRowsPerPageOptionsChange = (java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageOptionsChange");
java.lang.String _onStateChange = (java.lang.String)request.getAttribute("alloy:paginator:onStateChange");
java.lang.String _onTemplateChange = (java.lang.String)request.getAttribute("alloy:paginator:onTemplateChange");
java.lang.String _onTotalChange = (java.lang.String)request.getAttribute("alloy:paginator:onTotalChange");
java.lang.String _onTotalElChange = (java.lang.String)request.getAttribute("alloy:paginator:onTotalElChange");
java.lang.String _onTotalLabelChange = (java.lang.String)request.getAttribute("alloy:paginator:onTotalLabelChange");
java.lang.String _onTotalPagesChange = (java.lang.String)request.getAttribute("alloy:paginator:onTotalPagesChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_alwaysVisible != null) {
	scopedAttributes.put("alwaysVisible", _alwaysVisible);
}

if (_containers != null) {
	scopedAttributes.put("containers", _containers);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_firstPageLink != null) {
	scopedAttributes.put("firstPageLink", _firstPageLink);
}

if (_firstPageLinkLabel != null) {
	scopedAttributes.put("firstPageLinkLabel", _firstPageLinkLabel);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_lastPageLink != null) {
	scopedAttributes.put("lastPageLink", _lastPageLink);
}

if (_lastPageLinkLabel != null) {
	scopedAttributes.put("lastPageLinkLabel", _lastPageLinkLabel);
}

if (_maxPageLinks != null) {
	scopedAttributes.put("maxPageLinks", _maxPageLinks);
}

if (_nextPageLink != null) {
	scopedAttributes.put("nextPageLink", _nextPageLink);
}

if (_nextPageLinkLabel != null) {
	scopedAttributes.put("nextPageLinkLabel", _nextPageLinkLabel);
}

if (_page != null) {
	scopedAttributes.put("page", _page);
}

if (_pageContainerTemplate != null) {
	scopedAttributes.put("pageContainerTemplate", _pageContainerTemplate);
}

if (_pageLinkContent != null) {
	scopedAttributes.put("pageLinkContent", _pageLinkContent);
}

if (_pageLinkTemplate != null) {
	scopedAttributes.put("pageLinkTemplate", _pageLinkTemplate);
}

if (_pageReportEl != null) {
	scopedAttributes.put("pageReportEl", _pageReportEl);
}

if (_pageReportLabelTemplate != null) {
	scopedAttributes.put("pageReportLabelTemplate", _pageReportLabelTemplate);
}

if (_prevPageLink != null) {
	scopedAttributes.put("prevPageLink", _prevPageLink);
}

if (_prevPageLinkLabel != null) {
	scopedAttributes.put("prevPageLinkLabel", _prevPageLinkLabel);
}

if (_rowsPerPage != null) {
	scopedAttributes.put("rowsPerPage", _rowsPerPage);
}

if (_rowsPerPageEl != null) {
	scopedAttributes.put("rowsPerPageEl", _rowsPerPageEl);
}

if (_rowsPerPageOptions != null) {
	scopedAttributes.put("rowsPerPageOptions", _rowsPerPageOptions);
}

if (_state != null) {
	scopedAttributes.put("state", _state);
}

if (_template != null) {
	scopedAttributes.put("template", _template);
}

if (_total != null) {
	scopedAttributes.put("total", _total);
}

if (_totalEl != null) {
	scopedAttributes.put("totalEl", _totalEl);
}

if (_totalLabel != null) {
	scopedAttributes.put("totalLabel", _totalLabel);
}

if (_totalPages != null) {
	scopedAttributes.put("totalPages", _totalPages);
}

if (_afterAlwaysVisibleChange != null) {
	scopedAttributes.put("afterAlwaysVisibleChange", _afterAlwaysVisibleChange);
}

if (_afterContainersChange != null) {
	scopedAttributes.put("afterContainersChange", _afterContainersChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterFirstPageLinkChange != null) {
	scopedAttributes.put("afterFirstPageLinkChange", _afterFirstPageLinkChange);
}

if (_afterFirstPageLinkLabelChange != null) {
	scopedAttributes.put("afterFirstPageLinkLabelChange", _afterFirstPageLinkLabelChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterLastPageLinkChange != null) {
	scopedAttributes.put("afterLastPageLinkChange", _afterLastPageLinkChange);
}

if (_afterLastPageLinkLabelChange != null) {
	scopedAttributes.put("afterLastPageLinkLabelChange", _afterLastPageLinkLabelChange);
}

if (_afterMaxPageLinksChange != null) {
	scopedAttributes.put("afterMaxPageLinksChange", _afterMaxPageLinksChange);
}

if (_afterNextPageLinkChange != null) {
	scopedAttributes.put("afterNextPageLinkChange", _afterNextPageLinkChange);
}

if (_afterNextPageLinkLabelChange != null) {
	scopedAttributes.put("afterNextPageLinkLabelChange", _afterNextPageLinkLabelChange);
}

if (_afterPageChange != null) {
	scopedAttributes.put("afterPageChange", _afterPageChange);
}

if (_afterPageContainerTemplateChange != null) {
	scopedAttributes.put("afterPageContainerTemplateChange", _afterPageContainerTemplateChange);
}

if (_afterPageLinkContentChange != null) {
	scopedAttributes.put("afterPageLinkContentChange", _afterPageLinkContentChange);
}

if (_afterPageLinkTemplateChange != null) {
	scopedAttributes.put("afterPageLinkTemplateChange", _afterPageLinkTemplateChange);
}

if (_afterPageReportElChange != null) {
	scopedAttributes.put("afterPageReportElChange", _afterPageReportElChange);
}

if (_afterPageReportLabelTemplateChange != null) {
	scopedAttributes.put("afterPageReportLabelTemplateChange", _afterPageReportLabelTemplateChange);
}

if (_afterPrevPageLinkChange != null) {
	scopedAttributes.put("afterPrevPageLinkChange", _afterPrevPageLinkChange);
}

if (_afterPrevPageLinkLabelChange != null) {
	scopedAttributes.put("afterPrevPageLinkLabelChange", _afterPrevPageLinkLabelChange);
}

if (_afterRowsPerPageChange != null) {
	scopedAttributes.put("afterRowsPerPageChange", _afterRowsPerPageChange);
}

if (_afterRowsPerPageElChange != null) {
	scopedAttributes.put("afterRowsPerPageElChange", _afterRowsPerPageElChange);
}

if (_afterRowsPerPageOptionsChange != null) {
	scopedAttributes.put("afterRowsPerPageOptionsChange", _afterRowsPerPageOptionsChange);
}

if (_afterStateChange != null) {
	scopedAttributes.put("afterStateChange", _afterStateChange);
}

if (_afterTemplateChange != null) {
	scopedAttributes.put("afterTemplateChange", _afterTemplateChange);
}

if (_afterTotalChange != null) {
	scopedAttributes.put("afterTotalChange", _afterTotalChange);
}

if (_afterTotalElChange != null) {
	scopedAttributes.put("afterTotalElChange", _afterTotalElChange);
}

if (_afterTotalLabelChange != null) {
	scopedAttributes.put("afterTotalLabelChange", _afterTotalLabelChange);
}

if (_afterTotalPagesChange != null) {
	scopedAttributes.put("afterTotalPagesChange", _afterTotalPagesChange);
}

if (_onAlwaysVisibleChange != null) {
	scopedAttributes.put("onAlwaysVisibleChange", _onAlwaysVisibleChange);
}

if (_onContainersChange != null) {
	scopedAttributes.put("onContainersChange", _onContainersChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onFirstPageLinkChange != null) {
	scopedAttributes.put("onFirstPageLinkChange", _onFirstPageLinkChange);
}

if (_onFirstPageLinkLabelChange != null) {
	scopedAttributes.put("onFirstPageLinkLabelChange", _onFirstPageLinkLabelChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onLastPageLinkChange != null) {
	scopedAttributes.put("onLastPageLinkChange", _onLastPageLinkChange);
}

if (_onLastPageLinkLabelChange != null) {
	scopedAttributes.put("onLastPageLinkLabelChange", _onLastPageLinkLabelChange);
}

if (_onMaxPageLinksChange != null) {
	scopedAttributes.put("onMaxPageLinksChange", _onMaxPageLinksChange);
}

if (_onNextPageLinkChange != null) {
	scopedAttributes.put("onNextPageLinkChange", _onNextPageLinkChange);
}

if (_onNextPageLinkLabelChange != null) {
	scopedAttributes.put("onNextPageLinkLabelChange", _onNextPageLinkLabelChange);
}

if (_onPageChange != null) {
	scopedAttributes.put("onPageChange", _onPageChange);
}

if (_onPageContainerTemplateChange != null) {
	scopedAttributes.put("onPageContainerTemplateChange", _onPageContainerTemplateChange);
}

if (_onPageLinkContentChange != null) {
	scopedAttributes.put("onPageLinkContentChange", _onPageLinkContentChange);
}

if (_onPageLinkTemplateChange != null) {
	scopedAttributes.put("onPageLinkTemplateChange", _onPageLinkTemplateChange);
}

if (_onPageReportElChange != null) {
	scopedAttributes.put("onPageReportElChange", _onPageReportElChange);
}

if (_onPageReportLabelTemplateChange != null) {
	scopedAttributes.put("onPageReportLabelTemplateChange", _onPageReportLabelTemplateChange);
}

if (_onPrevPageLinkChange != null) {
	scopedAttributes.put("onPrevPageLinkChange", _onPrevPageLinkChange);
}

if (_onPrevPageLinkLabelChange != null) {
	scopedAttributes.put("onPrevPageLinkLabelChange", _onPrevPageLinkLabelChange);
}

if (_onRowsPerPageChange != null) {
	scopedAttributes.put("onRowsPerPageChange", _onRowsPerPageChange);
}

if (_onRowsPerPageElChange != null) {
	scopedAttributes.put("onRowsPerPageElChange", _onRowsPerPageElChange);
}

if (_onRowsPerPageOptionsChange != null) {
	scopedAttributes.put("onRowsPerPageOptionsChange", _onRowsPerPageOptionsChange);
}

if (_onStateChange != null) {
	scopedAttributes.put("onStateChange", _onStateChange);
}

if (_onTemplateChange != null) {
	scopedAttributes.put("onTemplateChange", _onTemplateChange);
}

if (_onTotalChange != null) {
	scopedAttributes.put("onTotalChange", _onTotalChange);
}

if (_onTotalElChange != null) {
	scopedAttributes.put("onTotalElChange", _onTotalElChange);
}

if (_onTotalLabelChange != null) {
	scopedAttributes.put("onTotalLabelChange", _onTotalLabelChange);
}

if (_onTotalPagesChange != null) {
	scopedAttributes.put("onTotalPagesChange", _onTotalPagesChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>