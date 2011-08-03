<%--
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

@generated
--%>

<%@ include file="/html/taglib/taglib-init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:paginator:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:paginator:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

if ((scopedAttributes != null) && !scopedAttributes.isEmpty()) {
	_options.putAll(scopedAttributes);
}

if ((dynamicAttributes != null) && !dynamicAttributes.isEmpty()) {
	_options.putAll(dynamicAttributes);
}

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
boolean alwaysVisible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:paginator:alwaysVisible")), true);
java.lang.String containers = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:containers"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:paginator:destroyed")), false);
java.lang.String firstPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:firstPageLink"));
java.lang.String firstPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:firstPageLinkLabel"), "first");
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:paginator:initialized")), false);
java.lang.String lastPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:lastPageLink"));
java.lang.String lastPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:lastPageLinkLabel"), "last");
java.lang.Number maxPageLinks = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:paginator:maxPageLinks")), 10);
java.lang.String nextPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:nextPageLink"));
java.lang.String nextPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:nextPageLinkLabel"), "next &gt;");
java.lang.Number paginatorPage = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:paginator:paginatorPage")), 1);
java.lang.String pageContainerTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageContainerTemplate"));
java.lang.Object pageLinkContent = (java.lang.Object)request.getAttribute("alloy:paginator:pageLinkContent");
java.lang.String pageLinkTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageLinkTemplate"));
java.lang.String pageReportEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageReportEl"));
java.lang.String pageReportLabelTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:pageReportLabelTemplate"), "({page} of {totalPages})");
java.lang.String prevPageLink = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:prevPageLink"));
java.lang.String prevPageLinkLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:prevPageLinkLabel"), "&lt; prev");
java.lang.Number rowsPerPage = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:paginator:rowsPerPage")), 1);
java.lang.String rowsPerPageEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:rowsPerPageEl"));
java.util.ArrayList rowsPerPageOptions = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:paginator:rowsPerPageOptions"), "[]"));
java.util.HashMap state = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:paginator:state"), "{}"));
java.lang.String template = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:template"), "{FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink} {CurrentPageReport} {Total} {RowsPerPageSelect}");
java.lang.Number total = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:paginator:total")), 0);
java.lang.String totalEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:totalEl"));
java.lang.String totalLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:paginator:totalLabel"), "(Total {total})");
java.lang.Number totalPages = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:paginator:totalPages")), 0);
java.lang.Object afterAlwaysVisibleChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterAlwaysVisibleChange");
java.lang.Object afterContainersChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterContainersChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:paginator:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterDestroyedChange");
java.lang.Object afterFirstPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterFirstPageLinkChange");
java.lang.Object afterFirstPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterFirstPageLinkLabelChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:paginator:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterInitializedChange");
java.lang.Object afterLastPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterLastPageLinkChange");
java.lang.Object afterLastPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterLastPageLinkLabelChange");
java.lang.Object afterMaxPageLinksChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterMaxPageLinksChange");
java.lang.Object afterNextPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterNextPageLinkChange");
java.lang.Object afterNextPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterNextPageLinkLabelChange");
java.lang.Object afterPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageChange");
java.lang.Object afterPageContainerTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageContainerTemplateChange");
java.lang.Object afterPageLinkContentChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageLinkContentChange");
java.lang.Object afterPageLinkTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageLinkTemplateChange");
java.lang.Object afterPageReportElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageReportElChange");
java.lang.Object afterPageReportLabelTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPageReportLabelTemplateChange");
java.lang.Object afterPrevPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPrevPageLinkChange");
java.lang.Object afterPrevPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterPrevPageLinkLabelChange");
java.lang.Object afterRowsPerPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageChange");
java.lang.Object afterRowsPerPageElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageElChange");
java.lang.Object afterRowsPerPageOptionsChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterRowsPerPageOptionsChange");
java.lang.Object afterStateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterStateChange");
java.lang.Object afterTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTemplateChange");
java.lang.Object afterTotalChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalChange");
java.lang.Object afterTotalElChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalElChange");
java.lang.Object afterTotalLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalLabelChange");
java.lang.Object afterTotalPagesChange = (java.lang.Object)request.getAttribute("alloy:paginator:afterTotalPagesChange");
java.lang.Object onAlwaysVisibleChange = (java.lang.Object)request.getAttribute("alloy:paginator:onAlwaysVisibleChange");
java.lang.Object onContainersChange = (java.lang.Object)request.getAttribute("alloy:paginator:onContainersChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:paginator:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:paginator:onDestroyedChange");
java.lang.Object onFirstPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onFirstPageLinkChange");
java.lang.Object onFirstPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onFirstPageLinkLabelChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:paginator:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:paginator:onInitializedChange");
java.lang.Object onLastPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onLastPageLinkChange");
java.lang.Object onLastPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onLastPageLinkLabelChange");
java.lang.Object onMaxPageLinksChange = (java.lang.Object)request.getAttribute("alloy:paginator:onMaxPageLinksChange");
java.lang.Object onNextPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onNextPageLinkChange");
java.lang.Object onNextPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onNextPageLinkLabelChange");
java.lang.Object onPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageChange");
java.lang.Object onPageContainerTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageContainerTemplateChange");
java.lang.Object onPageLinkContentChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageLinkContentChange");
java.lang.Object onPageLinkTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageLinkTemplateChange");
java.lang.Object onPageReportElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageReportElChange");
java.lang.Object onPageReportLabelTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPageReportLabelTemplateChange");
java.lang.Object onPrevPageLinkChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPrevPageLinkChange");
java.lang.Object onPrevPageLinkLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onPrevPageLinkLabelChange");
java.lang.Object onRowsPerPageChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageChange");
java.lang.Object onRowsPerPageElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageElChange");
java.lang.Object onRowsPerPageOptionsChange = (java.lang.Object)request.getAttribute("alloy:paginator:onRowsPerPageOptionsChange");
java.lang.Object onStateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onStateChange");
java.lang.Object onTemplateChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTemplateChange");
java.lang.Object onTotalChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalChange");
java.lang.Object onTotalElChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalElChange");
java.lang.Object onTotalLabelChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalLabelChange");
java.lang.Object onTotalPagesChange = (java.lang.Object)request.getAttribute("alloy:paginator:onTotalPagesChange");

_updateOptions(_options, "alwaysVisible", alwaysVisible);
_updateOptions(_options, "containers", containers);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "firstPageLink", firstPageLink);
_updateOptions(_options, "firstPageLinkLabel", firstPageLinkLabel);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "lastPageLink", lastPageLink);
_updateOptions(_options, "lastPageLinkLabel", lastPageLinkLabel);
_updateOptions(_options, "maxPageLinks", maxPageLinks);
_updateOptions(_options, "nextPageLink", nextPageLink);
_updateOptions(_options, "nextPageLinkLabel", nextPageLinkLabel);
_updateOptions(_options, "paginatorPage", paginatorPage);
_updateOptions(_options, "pageContainerTemplate", pageContainerTemplate);
_updateOptions(_options, "pageLinkContent", pageLinkContent);
_updateOptions(_options, "pageLinkTemplate", pageLinkTemplate);
_updateOptions(_options, "pageReportEl", pageReportEl);
_updateOptions(_options, "pageReportLabelTemplate", pageReportLabelTemplate);
_updateOptions(_options, "prevPageLink", prevPageLink);
_updateOptions(_options, "prevPageLinkLabel", prevPageLinkLabel);
_updateOptions(_options, "rowsPerPage", rowsPerPage);
_updateOptions(_options, "rowsPerPageEl", rowsPerPageEl);
_updateOptions(_options, "rowsPerPageOptions", rowsPerPageOptions);
_updateOptions(_options, "state", state);
_updateOptions(_options, "template", template);
_updateOptions(_options, "total", total);
_updateOptions(_options, "totalEl", totalEl);
_updateOptions(_options, "totalLabel", totalLabel);
_updateOptions(_options, "totalPages", totalPages);
_updateOptions(_options, "afterAlwaysVisibleChange", afterAlwaysVisibleChange);
_updateOptions(_options, "afterContainersChange", afterContainersChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterFirstPageLinkChange", afterFirstPageLinkChange);
_updateOptions(_options, "afterFirstPageLinkLabelChange", afterFirstPageLinkLabelChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterLastPageLinkChange", afterLastPageLinkChange);
_updateOptions(_options, "afterLastPageLinkLabelChange", afterLastPageLinkLabelChange);
_updateOptions(_options, "afterMaxPageLinksChange", afterMaxPageLinksChange);
_updateOptions(_options, "afterNextPageLinkChange", afterNextPageLinkChange);
_updateOptions(_options, "afterNextPageLinkLabelChange", afterNextPageLinkLabelChange);
_updateOptions(_options, "afterPageChange", afterPageChange);
_updateOptions(_options, "afterPageContainerTemplateChange", afterPageContainerTemplateChange);
_updateOptions(_options, "afterPageLinkContentChange", afterPageLinkContentChange);
_updateOptions(_options, "afterPageLinkTemplateChange", afterPageLinkTemplateChange);
_updateOptions(_options, "afterPageReportElChange", afterPageReportElChange);
_updateOptions(_options, "afterPageReportLabelTemplateChange", afterPageReportLabelTemplateChange);
_updateOptions(_options, "afterPrevPageLinkChange", afterPrevPageLinkChange);
_updateOptions(_options, "afterPrevPageLinkLabelChange", afterPrevPageLinkLabelChange);
_updateOptions(_options, "afterRowsPerPageChange", afterRowsPerPageChange);
_updateOptions(_options, "afterRowsPerPageElChange", afterRowsPerPageElChange);
_updateOptions(_options, "afterRowsPerPageOptionsChange", afterRowsPerPageOptionsChange);
_updateOptions(_options, "afterStateChange", afterStateChange);
_updateOptions(_options, "afterTemplateChange", afterTemplateChange);
_updateOptions(_options, "afterTotalChange", afterTotalChange);
_updateOptions(_options, "afterTotalElChange", afterTotalElChange);
_updateOptions(_options, "afterTotalLabelChange", afterTotalLabelChange);
_updateOptions(_options, "afterTotalPagesChange", afterTotalPagesChange);
_updateOptions(_options, "onAlwaysVisibleChange", onAlwaysVisibleChange);
_updateOptions(_options, "onContainersChange", onContainersChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onFirstPageLinkChange", onFirstPageLinkChange);
_updateOptions(_options, "onFirstPageLinkLabelChange", onFirstPageLinkLabelChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onLastPageLinkChange", onLastPageLinkChange);
_updateOptions(_options, "onLastPageLinkLabelChange", onLastPageLinkLabelChange);
_updateOptions(_options, "onMaxPageLinksChange", onMaxPageLinksChange);
_updateOptions(_options, "onNextPageLinkChange", onNextPageLinkChange);
_updateOptions(_options, "onNextPageLinkLabelChange", onNextPageLinkLabelChange);
_updateOptions(_options, "onPageChange", onPageChange);
_updateOptions(_options, "onPageContainerTemplateChange", onPageContainerTemplateChange);
_updateOptions(_options, "onPageLinkContentChange", onPageLinkContentChange);
_updateOptions(_options, "onPageLinkTemplateChange", onPageLinkTemplateChange);
_updateOptions(_options, "onPageReportElChange", onPageReportElChange);
_updateOptions(_options, "onPageReportLabelTemplateChange", onPageReportLabelTemplateChange);
_updateOptions(_options, "onPrevPageLinkChange", onPrevPageLinkChange);
_updateOptions(_options, "onPrevPageLinkLabelChange", onPrevPageLinkLabelChange);
_updateOptions(_options, "onRowsPerPageChange", onRowsPerPageChange);
_updateOptions(_options, "onRowsPerPageElChange", onRowsPerPageElChange);
_updateOptions(_options, "onRowsPerPageOptionsChange", onRowsPerPageOptionsChange);
_updateOptions(_options, "onStateChange", onStateChange);
_updateOptions(_options, "onTemplateChange", onTemplateChange);
_updateOptions(_options, "onTotalChange", onTotalChange);
_updateOptions(_options, "onTotalElChange", onTotalElChange);
_updateOptions(_options, "onTotalLabelChange", onTotalLabelChange);
_updateOptions(_options, "onTotalPagesChange", onTotalPagesChange);
%>

<%@ include file="init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:paginator:";
%>