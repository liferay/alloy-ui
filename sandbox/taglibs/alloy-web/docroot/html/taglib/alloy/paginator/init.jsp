<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:paginator:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _alwaysVisible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:alwaysVisible"));
java.lang.String _containers = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:containers"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:destroyed"));
java.lang.String _firstPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:firstPageLink"));
java.lang.String _firstPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:firstPageLinkLabel"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:initialized"));
java.lang.String _lastPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:lastPageLink"));
java.lang.String _lastPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:lastPageLinkLabel"));
java.lang.Number _maxPageLinks = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:maxPageLinks"));
java.lang.String _nextPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:nextPageLink"));
java.lang.String _nextPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:nextPageLinkLabel"));
java.lang.Number _page = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:page"));
java.lang.String _pageContainerTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageContainerTemplate"));
java.lang.String _pageLinkContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageLinkContent"));
java.lang.String _pageLinkTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageLinkTemplate"));
java.lang.String _pageReportEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageReportEl"));
java.lang.String _pageReportLabelTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageReportLabelTemplate"));
java.lang.String _prevPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:prevPageLink"));
java.lang.String _prevPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:prevPageLinkLabel"));
java.lang.Number _rowsPerPage = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:rowsPerPage"));
java.lang.String _rowsPerPageEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:rowsPerPageEl"));
java.lang.String _rowsPerPageOptions = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:rowsPerPageOptions"));
java.lang.Object _state = (java.lang.Object)request.getAttribute("alloy:paginator:state");
java.lang.String _template = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:template"));
java.lang.Number _total = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:total"));
java.lang.String _totalEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:totalEl"));
java.lang.String _totalLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:totalLabel"));
java.lang.Number _totalPages = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:totalPages"));
java.lang.String _afterAlwaysVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterAlwaysVisibleChange"));
java.lang.String _afterContainersChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterContainersChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterDestroyedChange"));
java.lang.String _afterFirstPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterFirstPageLinkChange"));
java.lang.String _afterFirstPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterFirstPageLinkLabelChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterInitializedChange"));
java.lang.String _afterLastPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterLastPageLinkChange"));
java.lang.String _afterLastPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterLastPageLinkLabelChange"));
java.lang.String _afterMaxPageLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterMaxPageLinksChange"));
java.lang.String _afterNextPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterNextPageLinkChange"));
java.lang.String _afterNextPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterNextPageLinkLabelChange"));
java.lang.String _afterPageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageChange"));
java.lang.String _afterPageContainerTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageContainerTemplateChange"));
java.lang.String _afterPageLinkContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageLinkContentChange"));
java.lang.String _afterPageLinkTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageLinkTemplateChange"));
java.lang.String _afterPageReportElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageReportElChange"));
java.lang.String _afterPageReportLabelTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPageReportLabelTemplateChange"));
java.lang.String _afterPrevPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPrevPageLinkChange"));
java.lang.String _afterPrevPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterPrevPageLinkLabelChange"));
java.lang.String _afterRowsPerPageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageChange"));
java.lang.String _afterRowsPerPageElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageElChange"));
java.lang.String _afterRowsPerPageOptionsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterRowsPerPageOptionsChange"));
java.lang.String _afterStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterStateChange"));
java.lang.String _afterTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterTemplateChange"));
java.lang.String _afterTotalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterTotalChange"));
java.lang.String _afterTotalElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterTotalElChange"));
java.lang.String _afterTotalLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterTotalLabelChange"));
java.lang.String _afterTotalPagesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:afterTotalPagesChange"));
java.lang.String _onAlwaysVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onAlwaysVisibleChange"));
java.lang.String _onContainersChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onContainersChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onDestroyedChange"));
java.lang.String _onFirstPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onFirstPageLinkChange"));
java.lang.String _onFirstPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onFirstPageLinkLabelChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onInitializedChange"));
java.lang.String _onLastPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onLastPageLinkChange"));
java.lang.String _onLastPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onLastPageLinkLabelChange"));
java.lang.String _onMaxPageLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onMaxPageLinksChange"));
java.lang.String _onNextPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onNextPageLinkChange"));
java.lang.String _onNextPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onNextPageLinkLabelChange"));
java.lang.String _onPageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageChange"));
java.lang.String _onPageContainerTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageContainerTemplateChange"));
java.lang.String _onPageLinkContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageLinkContentChange"));
java.lang.String _onPageLinkTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageLinkTemplateChange"));
java.lang.String _onPageReportElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageReportElChange"));
java.lang.String _onPageReportLabelTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPageReportLabelTemplateChange"));
java.lang.String _onPrevPageLinkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPrevPageLinkChange"));
java.lang.String _onPrevPageLinkLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onPrevPageLinkLabelChange"));
java.lang.String _onRowsPerPageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageChange"));
java.lang.String _onRowsPerPageElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageElChange"));
java.lang.String _onRowsPerPageOptionsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onRowsPerPageOptionsChange"));
java.lang.String _onStateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onStateChange"));
java.lang.String _onTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onTemplateChange"));
java.lang.String _onTotalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onTotalChange"));
java.lang.String _onTotalElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onTotalElChange"));
java.lang.String _onTotalLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onTotalLabelChange"));
java.lang.String _onTotalPagesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:onTotalPagesChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:paginator:alwaysVisible") != null) {
	scopedAttributes.put("alwaysVisible", _alwaysVisible);
}

if (request.getAttribute("alloy:paginator:containers") != null) {
	scopedAttributes.put("containers", _containers);
}

if (request.getAttribute("alloy:paginator:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:paginator:firstPageLink") != null) {
	scopedAttributes.put("firstPageLink", _firstPageLink);
}

if (request.getAttribute("alloy:paginator:firstPageLinkLabel") != null) {
	scopedAttributes.put("firstPageLinkLabel", _firstPageLinkLabel);
}

if (request.getAttribute("alloy:paginator:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:paginator:lastPageLink") != null) {
	scopedAttributes.put("lastPageLink", _lastPageLink);
}

if (request.getAttribute("alloy:paginator:lastPageLinkLabel") != null) {
	scopedAttributes.put("lastPageLinkLabel", _lastPageLinkLabel);
}

if (request.getAttribute("alloy:paginator:maxPageLinks") != null) {
	scopedAttributes.put("maxPageLinks", _maxPageLinks);
}

if (request.getAttribute("alloy:paginator:nextPageLink") != null) {
	scopedAttributes.put("nextPageLink", _nextPageLink);
}

if (request.getAttribute("alloy:paginator:nextPageLinkLabel") != null) {
	scopedAttributes.put("nextPageLinkLabel", _nextPageLinkLabel);
}

if (request.getAttribute("alloy:paginator:page") != null) {
	scopedAttributes.put("page", _page);
}

if (request.getAttribute("alloy:paginator:pageContainerTemplate") != null) {
	scopedAttributes.put("pageContainerTemplate", _pageContainerTemplate);
}

if (request.getAttribute("alloy:paginator:pageLinkContent") != null) {
	scopedAttributes.put("pageLinkContent", _pageLinkContent);
}

if (request.getAttribute("alloy:paginator:pageLinkTemplate") != null) {
	scopedAttributes.put("pageLinkTemplate", _pageLinkTemplate);
}

if (request.getAttribute("alloy:paginator:pageReportEl") != null) {
	scopedAttributes.put("pageReportEl", _pageReportEl);
}

if (request.getAttribute("alloy:paginator:pageReportLabelTemplate") != null) {
	scopedAttributes.put("pageReportLabelTemplate", _pageReportLabelTemplate);
}

if (request.getAttribute("alloy:paginator:prevPageLink") != null) {
	scopedAttributes.put("prevPageLink", _prevPageLink);
}

if (request.getAttribute("alloy:paginator:prevPageLinkLabel") != null) {
	scopedAttributes.put("prevPageLinkLabel", _prevPageLinkLabel);
}

if (request.getAttribute("alloy:paginator:rowsPerPage") != null) {
	scopedAttributes.put("rowsPerPage", _rowsPerPage);
}

if (request.getAttribute("alloy:paginator:rowsPerPageEl") != null) {
	scopedAttributes.put("rowsPerPageEl", _rowsPerPageEl);
}

if (request.getAttribute("alloy:paginator:rowsPerPageOptions") != null) {
	scopedAttributes.put("rowsPerPageOptions", _rowsPerPageOptions);
}

if (request.getAttribute("alloy:paginator:state") != null) {
	scopedAttributes.put("state", _state);
}

if (request.getAttribute("alloy:paginator:template") != null) {
	scopedAttributes.put("template", _template);
}

if (request.getAttribute("alloy:paginator:total") != null) {
	scopedAttributes.put("total", _total);
}

if (request.getAttribute("alloy:paginator:totalEl") != null) {
	scopedAttributes.put("totalEl", _totalEl);
}

if (request.getAttribute("alloy:paginator:totalLabel") != null) {
	scopedAttributes.put("totalLabel", _totalLabel);
}

if (request.getAttribute("alloy:paginator:totalPages") != null) {
	scopedAttributes.put("totalPages", _totalPages);
}

if (request.getAttribute("alloy:paginator:afterAlwaysVisibleChange") != null) {
	scopedAttributes.put("afterAlwaysVisibleChange", _afterAlwaysVisibleChange);
}

if (request.getAttribute("alloy:paginator:afterContainersChange") != null) {
	scopedAttributes.put("afterContainersChange", _afterContainersChange);
}

if (request.getAttribute("alloy:paginator:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:paginator:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:paginator:afterFirstPageLinkChange") != null) {
	scopedAttributes.put("afterFirstPageLinkChange", _afterFirstPageLinkChange);
}

if (request.getAttribute("alloy:paginator:afterFirstPageLinkLabelChange") != null) {
	scopedAttributes.put("afterFirstPageLinkLabelChange", _afterFirstPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:paginator:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:paginator:afterLastPageLinkChange") != null) {
	scopedAttributes.put("afterLastPageLinkChange", _afterLastPageLinkChange);
}

if (request.getAttribute("alloy:paginator:afterLastPageLinkLabelChange") != null) {
	scopedAttributes.put("afterLastPageLinkLabelChange", _afterLastPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:afterMaxPageLinksChange") != null) {
	scopedAttributes.put("afterMaxPageLinksChange", _afterMaxPageLinksChange);
}

if (request.getAttribute("alloy:paginator:afterNextPageLinkChange") != null) {
	scopedAttributes.put("afterNextPageLinkChange", _afterNextPageLinkChange);
}

if (request.getAttribute("alloy:paginator:afterNextPageLinkLabelChange") != null) {
	scopedAttributes.put("afterNextPageLinkLabelChange", _afterNextPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:afterPageChange") != null) {
	scopedAttributes.put("afterPageChange", _afterPageChange);
}

if (request.getAttribute("alloy:paginator:afterPageContainerTemplateChange") != null) {
	scopedAttributes.put("afterPageContainerTemplateChange", _afterPageContainerTemplateChange);
}

if (request.getAttribute("alloy:paginator:afterPageLinkContentChange") != null) {
	scopedAttributes.put("afterPageLinkContentChange", _afterPageLinkContentChange);
}

if (request.getAttribute("alloy:paginator:afterPageLinkTemplateChange") != null) {
	scopedAttributes.put("afterPageLinkTemplateChange", _afterPageLinkTemplateChange);
}

if (request.getAttribute("alloy:paginator:afterPageReportElChange") != null) {
	scopedAttributes.put("afterPageReportElChange", _afterPageReportElChange);
}

if (request.getAttribute("alloy:paginator:afterPageReportLabelTemplateChange") != null) {
	scopedAttributes.put("afterPageReportLabelTemplateChange", _afterPageReportLabelTemplateChange);
}

if (request.getAttribute("alloy:paginator:afterPrevPageLinkChange") != null) {
	scopedAttributes.put("afterPrevPageLinkChange", _afterPrevPageLinkChange);
}

if (request.getAttribute("alloy:paginator:afterPrevPageLinkLabelChange") != null) {
	scopedAttributes.put("afterPrevPageLinkLabelChange", _afterPrevPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:afterRowsPerPageChange") != null) {
	scopedAttributes.put("afterRowsPerPageChange", _afterRowsPerPageChange);
}

if (request.getAttribute("alloy:paginator:afterRowsPerPageElChange") != null) {
	scopedAttributes.put("afterRowsPerPageElChange", _afterRowsPerPageElChange);
}

if (request.getAttribute("alloy:paginator:afterRowsPerPageOptionsChange") != null) {
	scopedAttributes.put("afterRowsPerPageOptionsChange", _afterRowsPerPageOptionsChange);
}

if (request.getAttribute("alloy:paginator:afterStateChange") != null) {
	scopedAttributes.put("afterStateChange", _afterStateChange);
}

if (request.getAttribute("alloy:paginator:afterTemplateChange") != null) {
	scopedAttributes.put("afterTemplateChange", _afterTemplateChange);
}

if (request.getAttribute("alloy:paginator:afterTotalChange") != null) {
	scopedAttributes.put("afterTotalChange", _afterTotalChange);
}

if (request.getAttribute("alloy:paginator:afterTotalElChange") != null) {
	scopedAttributes.put("afterTotalElChange", _afterTotalElChange);
}

if (request.getAttribute("alloy:paginator:afterTotalLabelChange") != null) {
	scopedAttributes.put("afterTotalLabelChange", _afterTotalLabelChange);
}

if (request.getAttribute("alloy:paginator:afterTotalPagesChange") != null) {
	scopedAttributes.put("afterTotalPagesChange", _afterTotalPagesChange);
}

if (request.getAttribute("alloy:paginator:onAlwaysVisibleChange") != null) {
	scopedAttributes.put("onAlwaysVisibleChange", _onAlwaysVisibleChange);
}

if (request.getAttribute("alloy:paginator:onContainersChange") != null) {
	scopedAttributes.put("onContainersChange", _onContainersChange);
}

if (request.getAttribute("alloy:paginator:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:paginator:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:paginator:onFirstPageLinkChange") != null) {
	scopedAttributes.put("onFirstPageLinkChange", _onFirstPageLinkChange);
}

if (request.getAttribute("alloy:paginator:onFirstPageLinkLabelChange") != null) {
	scopedAttributes.put("onFirstPageLinkLabelChange", _onFirstPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:paginator:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:paginator:onLastPageLinkChange") != null) {
	scopedAttributes.put("onLastPageLinkChange", _onLastPageLinkChange);
}

if (request.getAttribute("alloy:paginator:onLastPageLinkLabelChange") != null) {
	scopedAttributes.put("onLastPageLinkLabelChange", _onLastPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:onMaxPageLinksChange") != null) {
	scopedAttributes.put("onMaxPageLinksChange", _onMaxPageLinksChange);
}

if (request.getAttribute("alloy:paginator:onNextPageLinkChange") != null) {
	scopedAttributes.put("onNextPageLinkChange", _onNextPageLinkChange);
}

if (request.getAttribute("alloy:paginator:onNextPageLinkLabelChange") != null) {
	scopedAttributes.put("onNextPageLinkLabelChange", _onNextPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:onPageChange") != null) {
	scopedAttributes.put("onPageChange", _onPageChange);
}

if (request.getAttribute("alloy:paginator:onPageContainerTemplateChange") != null) {
	scopedAttributes.put("onPageContainerTemplateChange", _onPageContainerTemplateChange);
}

if (request.getAttribute("alloy:paginator:onPageLinkContentChange") != null) {
	scopedAttributes.put("onPageLinkContentChange", _onPageLinkContentChange);
}

if (request.getAttribute("alloy:paginator:onPageLinkTemplateChange") != null) {
	scopedAttributes.put("onPageLinkTemplateChange", _onPageLinkTemplateChange);
}

if (request.getAttribute("alloy:paginator:onPageReportElChange") != null) {
	scopedAttributes.put("onPageReportElChange", _onPageReportElChange);
}

if (request.getAttribute("alloy:paginator:onPageReportLabelTemplateChange") != null) {
	scopedAttributes.put("onPageReportLabelTemplateChange", _onPageReportLabelTemplateChange);
}

if (request.getAttribute("alloy:paginator:onPrevPageLinkChange") != null) {
	scopedAttributes.put("onPrevPageLinkChange", _onPrevPageLinkChange);
}

if (request.getAttribute("alloy:paginator:onPrevPageLinkLabelChange") != null) {
	scopedAttributes.put("onPrevPageLinkLabelChange", _onPrevPageLinkLabelChange);
}

if (request.getAttribute("alloy:paginator:onRowsPerPageChange") != null) {
	scopedAttributes.put("onRowsPerPageChange", _onRowsPerPageChange);
}

if (request.getAttribute("alloy:paginator:onRowsPerPageElChange") != null) {
	scopedAttributes.put("onRowsPerPageElChange", _onRowsPerPageElChange);
}

if (request.getAttribute("alloy:paginator:onRowsPerPageOptionsChange") != null) {
	scopedAttributes.put("onRowsPerPageOptionsChange", _onRowsPerPageOptionsChange);
}

if (request.getAttribute("alloy:paginator:onStateChange") != null) {
	scopedAttributes.put("onStateChange", _onStateChange);
}

if (request.getAttribute("alloy:paginator:onTemplateChange") != null) {
	scopedAttributes.put("onTemplateChange", _onTemplateChange);
}

if (request.getAttribute("alloy:paginator:onTotalChange") != null) {
	scopedAttributes.put("onTotalChange", _onTotalChange);
}

if (request.getAttribute("alloy:paginator:onTotalElChange") != null) {
	scopedAttributes.put("onTotalElChange", _onTotalElChange);
}

if (request.getAttribute("alloy:paginator:onTotalLabelChange") != null) {
	scopedAttributes.put("onTotalLabelChange", _onTotalLabelChange);
}

if (request.getAttribute("alloy:paginator:onTotalPagesChange") != null) {
	scopedAttributes.put("onTotalPagesChange", _onTotalPagesChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>