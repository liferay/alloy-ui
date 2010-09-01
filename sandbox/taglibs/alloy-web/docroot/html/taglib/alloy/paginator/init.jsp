<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:paginator:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:paginator:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:paginator:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

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

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useJavaScript")));
boolean useMarkup = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useMarkup")));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

_updateOptions(options, "alwaysVisible", _alwaysVisible);
_updateOptions(options, "containers", _containers);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "firstPageLink", _firstPageLink);
_updateOptions(options, "firstPageLinkLabel", _firstPageLinkLabel);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "lastPageLink", _lastPageLink);
_updateOptions(options, "lastPageLinkLabel", _lastPageLinkLabel);
_updateOptions(options, "maxPageLinks", _maxPageLinks);
_updateOptions(options, "nextPageLink", _nextPageLink);
_updateOptions(options, "nextPageLinkLabel", _nextPageLinkLabel);
_updateOptions(options, "page", _page);
_updateOptions(options, "pageContainerTemplate", _pageContainerTemplate);
_updateOptions(options, "pageLinkContent", _pageLinkContent);
_updateOptions(options, "pageLinkTemplate", _pageLinkTemplate);
_updateOptions(options, "pageReportEl", _pageReportEl);
_updateOptions(options, "pageReportLabelTemplate", _pageReportLabelTemplate);
_updateOptions(options, "prevPageLink", _prevPageLink);
_updateOptions(options, "prevPageLinkLabel", _prevPageLinkLabel);
_updateOptions(options, "rowsPerPage", _rowsPerPage);
_updateOptions(options, "rowsPerPageEl", _rowsPerPageEl);
_updateOptions(options, "rowsPerPageOptions", _rowsPerPageOptions);
_updateOptions(options, "state", _state);
_updateOptions(options, "template", _template);
_updateOptions(options, "total", _total);
_updateOptions(options, "totalEl", _totalEl);
_updateOptions(options, "totalLabel", _totalLabel);
_updateOptions(options, "totalPages", _totalPages);
_updateOptions(options, "afterAlwaysVisibleChange", _afterAlwaysVisibleChange);
_updateOptions(options, "afterContainersChange", _afterContainersChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterFirstPageLinkChange", _afterFirstPageLinkChange);
_updateOptions(options, "afterFirstPageLinkLabelChange", _afterFirstPageLinkLabelChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterLastPageLinkChange", _afterLastPageLinkChange);
_updateOptions(options, "afterLastPageLinkLabelChange", _afterLastPageLinkLabelChange);
_updateOptions(options, "afterMaxPageLinksChange", _afterMaxPageLinksChange);
_updateOptions(options, "afterNextPageLinkChange", _afterNextPageLinkChange);
_updateOptions(options, "afterNextPageLinkLabelChange", _afterNextPageLinkLabelChange);
_updateOptions(options, "afterPageChange", _afterPageChange);
_updateOptions(options, "afterPageContainerTemplateChange", _afterPageContainerTemplateChange);
_updateOptions(options, "afterPageLinkContentChange", _afterPageLinkContentChange);
_updateOptions(options, "afterPageLinkTemplateChange", _afterPageLinkTemplateChange);
_updateOptions(options, "afterPageReportElChange", _afterPageReportElChange);
_updateOptions(options, "afterPageReportLabelTemplateChange", _afterPageReportLabelTemplateChange);
_updateOptions(options, "afterPrevPageLinkChange", _afterPrevPageLinkChange);
_updateOptions(options, "afterPrevPageLinkLabelChange", _afterPrevPageLinkLabelChange);
_updateOptions(options, "afterRowsPerPageChange", _afterRowsPerPageChange);
_updateOptions(options, "afterRowsPerPageElChange", _afterRowsPerPageElChange);
_updateOptions(options, "afterRowsPerPageOptionsChange", _afterRowsPerPageOptionsChange);
_updateOptions(options, "afterStateChange", _afterStateChange);
_updateOptions(options, "afterTemplateChange", _afterTemplateChange);
_updateOptions(options, "afterTotalChange", _afterTotalChange);
_updateOptions(options, "afterTotalElChange", _afterTotalElChange);
_updateOptions(options, "afterTotalLabelChange", _afterTotalLabelChange);
_updateOptions(options, "afterTotalPagesChange", _afterTotalPagesChange);
_updateOptions(options, "onAlwaysVisibleChange", _onAlwaysVisibleChange);
_updateOptions(options, "onContainersChange", _onContainersChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onFirstPageLinkChange", _onFirstPageLinkChange);
_updateOptions(options, "onFirstPageLinkLabelChange", _onFirstPageLinkLabelChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onLastPageLinkChange", _onLastPageLinkChange);
_updateOptions(options, "onLastPageLinkLabelChange", _onLastPageLinkLabelChange);
_updateOptions(options, "onMaxPageLinksChange", _onMaxPageLinksChange);
_updateOptions(options, "onNextPageLinkChange", _onNextPageLinkChange);
_updateOptions(options, "onNextPageLinkLabelChange", _onNextPageLinkLabelChange);
_updateOptions(options, "onPageChange", _onPageChange);
_updateOptions(options, "onPageContainerTemplateChange", _onPageContainerTemplateChange);
_updateOptions(options, "onPageLinkContentChange", _onPageLinkContentChange);
_updateOptions(options, "onPageLinkTemplateChange", _onPageLinkTemplateChange);
_updateOptions(options, "onPageReportElChange", _onPageReportElChange);
_updateOptions(options, "onPageReportLabelTemplateChange", _onPageReportLabelTemplateChange);
_updateOptions(options, "onPrevPageLinkChange", _onPrevPageLinkChange);
_updateOptions(options, "onPrevPageLinkLabelChange", _onPrevPageLinkLabelChange);
_updateOptions(options, "onRowsPerPageChange", _onRowsPerPageChange);
_updateOptions(options, "onRowsPerPageElChange", _onRowsPerPageElChange);
_updateOptions(options, "onRowsPerPageOptionsChange", _onRowsPerPageOptionsChange);
_updateOptions(options, "onStateChange", _onStateChange);
_updateOptions(options, "onTemplateChange", _onTemplateChange);
_updateOptions(options, "onTotalChange", _onTotalChange);
_updateOptions(options, "onTotalElChange", _onTotalElChange);
_updateOptions(options, "onTotalLabelChange", _onTotalLabelChange);
_updateOptions(options, "onTotalPagesChange", _onTotalPagesChange);
%>

<%@ include file="init-ext.jsp" %>