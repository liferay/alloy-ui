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

java.lang.Boolean _alwaysVisible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:alwaysVisible"), true);
java.lang.Object _containers = (java.lang.Object)request.getAttribute("alloy:paginator:containers");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:destroyed"), false);
java.lang.Object _firstPageLink = (java.lang.Object)request.getAttribute("alloy:paginator:firstPageLink");
java.lang.Object _firstPageLinkLabel = (java.lang.Object)request.getAttribute("alloy:paginator:firstPageLinkLabel");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:paginator:initialized"), false);
java.lang.Object _lastPageLink = (java.lang.Object)request.getAttribute("alloy:paginator:lastPageLink");
java.lang.Object _lastPageLinkLabel = (java.lang.Object)request.getAttribute("alloy:paginator:lastPageLinkLabel");
java.lang.Number _maxPageLinks = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:maxPageLinks"), 10);
java.lang.Object _nextPageLink = (java.lang.Object)request.getAttribute("alloy:paginator:nextPageLink");
java.lang.Object _nextPageLinkLabel = (java.lang.Object)request.getAttribute("alloy:paginator:nextPageLinkLabel");
java.lang.Number _page = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:page"), 1);
java.lang.Object _pageContainerTemplate = (java.lang.Object)request.getAttribute("alloy:paginator:pageContainerTemplate");
java.lang.Object _pageLinkContent = (java.lang.Object)request.getAttribute("alloy:paginator:pageLinkContent");
java.lang.Object _pageLinkTemplate = (java.lang.Object)request.getAttribute("alloy:paginator:pageLinkTemplate");
java.lang.Object _pageReportEl = (java.lang.Object)request.getAttribute("alloy:paginator:pageReportEl");
java.lang.Object _pageReportLabelTemplate = (java.lang.Object)request.getAttribute("alloy:paginator:pageReportLabelTemplate");
java.lang.Object _prevPageLink = (java.lang.Object)request.getAttribute("alloy:paginator:prevPageLink");
java.lang.Object _prevPageLinkLabel = (java.lang.Object)request.getAttribute("alloy:paginator:prevPageLinkLabel");
java.lang.Number _rowsPerPage = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:rowsPerPage"), 1);
java.lang.Object _rowsPerPageEl = (java.lang.Object)request.getAttribute("alloy:paginator:rowsPerPageEl");
java.lang.Object _rowsPerPageOptions = (java.lang.Object)request.getAttribute("alloy:paginator:rowsPerPageOptions");
java.lang.Object _state = (java.lang.Object)request.getAttribute("alloy:paginator:state");
java.lang.Object _template = (java.lang.Object)request.getAttribute("alloy:paginator:template");
java.lang.Number _total = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:total"), 0);
java.lang.Object _totalEl = (java.lang.Object)request.getAttribute("alloy:paginator:totalEl");
java.lang.Object _totalLabel = (java.lang.Object)request.getAttribute("alloy:paginator:totalLabel");
java.lang.Number _totalPages = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:paginator:totalPages"), 0);
java.lang.Object _afterAlwaysVisibleChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterAlwaysVisibleChange");
java.lang.Object _afterContainersChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterContainersChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:paginator:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterDestroyedChange");
java.lang.Object _afterFirstPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterFirstPageLinkChange");
java.lang.Object _afterFirstPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterFirstPageLinkLabelChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:paginator:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterInitializedChange");
java.lang.Object _afterLastPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterLastPageLinkChange");
java.lang.Object _afterLastPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterLastPageLinkLabelChange");
java.lang.Object _afterMaxPageLinksChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterMaxPageLinksChange");
java.lang.Object _afterNextPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterNextPageLinkChange");
java.lang.Object _afterNextPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterNextPageLinkLabelChange");
java.lang.Object _afterPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageChange");
java.lang.Object _afterPageContainerTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageContainerTemplateChange");
java.lang.Object _afterPageLinkContentChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageLinkContentChange");
java.lang.Object _afterPageLinkTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageLinkTemplateChange");
java.lang.Object _afterPageReportElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageReportElChange");
java.lang.Object _afterPageReportLabelTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageReportLabelTemplateChange");
java.lang.Object _afterPrevPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPrevPageLinkChange");
java.lang.Object _afterPrevPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPrevPageLinkLabelChange");
java.lang.Object _afterRowsPerPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageChange");
java.lang.Object _afterRowsPerPageElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageElChange");
java.lang.Object _afterRowsPerPageOptionsChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageOptionsChange");
java.lang.Object _afterStateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterStateChange");
java.lang.Object _afterTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTemplateChange");
java.lang.Object _afterTotalChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalChange");
java.lang.Object _afterTotalElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalElChange");
java.lang.Object _afterTotalLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalLabelChange");
java.lang.Object _afterTotalPagesChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalPagesChange");
java.lang.Object _onAlwaysVisibleChange = (java.lang.Object)request.getAttribute("alloy:paginator:onAlwaysVisibleChange");
java.lang.Object _onContainersChange = (java.lang.Object)request.getAttribute("alloy:paginator:onContainersChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:paginator:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:paginator:onDestroyedChange");
java.lang.Object _onFirstPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onFirstPageLinkChange");
java.lang.Object _onFirstPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onFirstPageLinkLabelChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:paginator:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:paginator:onInitializedChange");
java.lang.Object _onLastPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onLastPageLinkChange");
java.lang.Object _onLastPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onLastPageLinkLabelChange");
java.lang.Object _onMaxPageLinksChange = (java.lang.Object)request.getAttribute("alloy:paginator:onMaxPageLinksChange");
java.lang.Object _onNextPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onNextPageLinkChange");
java.lang.Object _onNextPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onNextPageLinkLabelChange");
java.lang.Object _onPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageChange");
java.lang.Object _onPageContainerTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageContainerTemplateChange");
java.lang.Object _onPageLinkContentChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageLinkContentChange");
java.lang.Object _onPageLinkTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageLinkTemplateChange");
java.lang.Object _onPageReportElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageReportElChange");
java.lang.Object _onPageReportLabelTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageReportLabelTemplateChange");
java.lang.Object _onPrevPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPrevPageLinkChange");
java.lang.Object _onPrevPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPrevPageLinkLabelChange");
java.lang.Object _onRowsPerPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageChange");
java.lang.Object _onRowsPerPageElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageElChange");
java.lang.Object _onRowsPerPageOptionsChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageOptionsChange");
java.lang.Object _onStateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onStateChange");
java.lang.Object _onTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTemplateChange");
java.lang.Object _onTotalChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalChange");
java.lang.Object _onTotalElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalElChange");
java.lang.Object _onTotalLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalLabelChange");
java.lang.Object _onTotalPagesChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalPagesChange");
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