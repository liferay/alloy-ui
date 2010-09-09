package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.alloy_util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BasePaginatorTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BasePaginatorTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Boolean getAlwaysVisible() {
		return _alwaysVisible;
	}

	public java.lang.String getContainers() {
		return _containers;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getFirstPageLink() {
		return _firstPageLink;
	}

	public java.lang.String getFirstPageLinkLabel() {
		return _firstPageLinkLabel;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getLastPageLink() {
		return _lastPageLink;
	}

	public java.lang.String getLastPageLinkLabel() {
		return _lastPageLinkLabel;
	}

	public java.lang.Object getMaxPageLinks() {
		return _maxPageLinks;
	}

	public java.lang.String getNextPageLink() {
		return _nextPageLink;
	}

	public java.lang.String getNextPageLinkLabel() {
		return _nextPageLinkLabel;
	}

	public java.lang.Object getPage() {
		return _page;
	}

	public java.lang.String getPageContainerTemplate() {
		return _pageContainerTemplate;
	}

	public java.lang.Object getPageLinkContent() {
		return _pageLinkContent;
	}

	public java.lang.String getPageLinkTemplate() {
		return _pageLinkTemplate;
	}

	public java.lang.String getPageReportEl() {
		return _pageReportEl;
	}

	public java.lang.String getPageReportLabelTemplate() {
		return _pageReportLabelTemplate;
	}

	public java.lang.String getPrevPageLink() {
		return _prevPageLink;
	}

	public java.lang.String getPrevPageLinkLabel() {
		return _prevPageLinkLabel;
	}

	public java.lang.Object getRowsPerPage() {
		return _rowsPerPage;
	}

	public java.lang.String getRowsPerPageEl() {
		return _rowsPerPageEl;
	}

	public java.lang.Object getRowsPerPageOptions() {
		return _rowsPerPageOptions;
	}

	public java.lang.Object getState() {
		return _state;
	}

	public java.lang.String getTemplate() {
		return _template;
	}

	public java.lang.Object getTotal() {
		return _total;
	}

	public java.lang.String getTotalEl() {
		return _totalEl;
	}

	public java.lang.String getTotalLabel() {
		return _totalLabel;
	}

	public java.lang.Object getTotalPages() {
		return _totalPages;
	}

	public java.lang.Object getAfterAlwaysVisibleChange() {
		return _afterAlwaysVisibleChange;
	}

	public java.lang.Object getAfterContainersChange() {
		return _afterContainersChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterFirstPageLinkChange() {
		return _afterFirstPageLinkChange;
	}

	public java.lang.Object getAfterFirstPageLinkLabelChange() {
		return _afterFirstPageLinkLabelChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterLastPageLinkChange() {
		return _afterLastPageLinkChange;
	}

	public java.lang.Object getAfterLastPageLinkLabelChange() {
		return _afterLastPageLinkLabelChange;
	}

	public java.lang.Object getAfterMaxPageLinksChange() {
		return _afterMaxPageLinksChange;
	}

	public java.lang.Object getAfterNextPageLinkChange() {
		return _afterNextPageLinkChange;
	}

	public java.lang.Object getAfterNextPageLinkLabelChange() {
		return _afterNextPageLinkLabelChange;
	}

	public java.lang.Object getAfterPageChange() {
		return _afterPageChange;
	}

	public java.lang.Object getAfterPageContainerTemplateChange() {
		return _afterPageContainerTemplateChange;
	}

	public java.lang.Object getAfterPageLinkContentChange() {
		return _afterPageLinkContentChange;
	}

	public java.lang.Object getAfterPageLinkTemplateChange() {
		return _afterPageLinkTemplateChange;
	}

	public java.lang.Object getAfterPageReportElChange() {
		return _afterPageReportElChange;
	}

	public java.lang.Object getAfterPageReportLabelTemplateChange() {
		return _afterPageReportLabelTemplateChange;
	}

	public java.lang.Object getAfterPrevPageLinkChange() {
		return _afterPrevPageLinkChange;
	}

	public java.lang.Object getAfterPrevPageLinkLabelChange() {
		return _afterPrevPageLinkLabelChange;
	}

	public java.lang.Object getAfterRowsPerPageChange() {
		return _afterRowsPerPageChange;
	}

	public java.lang.Object getAfterRowsPerPageElChange() {
		return _afterRowsPerPageElChange;
	}

	public java.lang.Object getAfterRowsPerPageOptionsChange() {
		return _afterRowsPerPageOptionsChange;
	}

	public java.lang.Object getAfterStateChange() {
		return _afterStateChange;
	}

	public java.lang.Object getAfterTemplateChange() {
		return _afterTemplateChange;
	}

	public java.lang.Object getAfterTotalChange() {
		return _afterTotalChange;
	}

	public java.lang.Object getAfterTotalElChange() {
		return _afterTotalElChange;
	}

	public java.lang.Object getAfterTotalLabelChange() {
		return _afterTotalLabelChange;
	}

	public java.lang.Object getAfterTotalPagesChange() {
		return _afterTotalPagesChange;
	}

	public java.lang.Object getOnAlwaysVisibleChange() {
		return _onAlwaysVisibleChange;
	}

	public java.lang.Object getOnContainersChange() {
		return _onContainersChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnFirstPageLinkChange() {
		return _onFirstPageLinkChange;
	}

	public java.lang.Object getOnFirstPageLinkLabelChange() {
		return _onFirstPageLinkLabelChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnLastPageLinkChange() {
		return _onLastPageLinkChange;
	}

	public java.lang.Object getOnLastPageLinkLabelChange() {
		return _onLastPageLinkLabelChange;
	}

	public java.lang.Object getOnMaxPageLinksChange() {
		return _onMaxPageLinksChange;
	}

	public java.lang.Object getOnNextPageLinkChange() {
		return _onNextPageLinkChange;
	}

	public java.lang.Object getOnNextPageLinkLabelChange() {
		return _onNextPageLinkLabelChange;
	}

	public java.lang.Object getOnPageChange() {
		return _onPageChange;
	}

	public java.lang.Object getOnPageContainerTemplateChange() {
		return _onPageContainerTemplateChange;
	}

	public java.lang.Object getOnPageLinkContentChange() {
		return _onPageLinkContentChange;
	}

	public java.lang.Object getOnPageLinkTemplateChange() {
		return _onPageLinkTemplateChange;
	}

	public java.lang.Object getOnPageReportElChange() {
		return _onPageReportElChange;
	}

	public java.lang.Object getOnPageReportLabelTemplateChange() {
		return _onPageReportLabelTemplateChange;
	}

	public java.lang.Object getOnPrevPageLinkChange() {
		return _onPrevPageLinkChange;
	}

	public java.lang.Object getOnPrevPageLinkLabelChange() {
		return _onPrevPageLinkLabelChange;
	}

	public java.lang.Object getOnRowsPerPageChange() {
		return _onRowsPerPageChange;
	}

	public java.lang.Object getOnRowsPerPageElChange() {
		return _onRowsPerPageElChange;
	}

	public java.lang.Object getOnRowsPerPageOptionsChange() {
		return _onRowsPerPageOptionsChange;
	}

	public java.lang.Object getOnStateChange() {
		return _onStateChange;
	}

	public java.lang.Object getOnTemplateChange() {
		return _onTemplateChange;
	}

	public java.lang.Object getOnTotalChange() {
		return _onTotalChange;
	}

	public java.lang.Object getOnTotalElChange() {
		return _onTotalElChange;
	}

	public java.lang.Object getOnTotalLabelChange() {
		return _onTotalLabelChange;
	}

	public java.lang.Object getOnTotalPagesChange() {
		return _onTotalPagesChange;
	}

	public void setAlwaysVisible(java.lang.Boolean alwaysVisible) {
		_alwaysVisible = alwaysVisible;

		setScopedAttribute("alwaysVisible", alwaysVisible);
	}

	public void setContainers(java.lang.String containers) {
		_containers = containers;

		setScopedAttribute("containers", containers);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setFirstPageLink(java.lang.String firstPageLink) {
		_firstPageLink = firstPageLink;

		setScopedAttribute("firstPageLink", firstPageLink);
	}

	public void setFirstPageLinkLabel(java.lang.String firstPageLinkLabel) {
		_firstPageLinkLabel = firstPageLinkLabel;

		setScopedAttribute("firstPageLinkLabel", firstPageLinkLabel);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setLastPageLink(java.lang.String lastPageLink) {
		_lastPageLink = lastPageLink;

		setScopedAttribute("lastPageLink", lastPageLink);
	}

	public void setLastPageLinkLabel(java.lang.String lastPageLinkLabel) {
		_lastPageLinkLabel = lastPageLinkLabel;

		setScopedAttribute("lastPageLinkLabel", lastPageLinkLabel);
	}

	public void setMaxPageLinks(java.lang.Object maxPageLinks) {
		_maxPageLinks = maxPageLinks;

		setScopedAttribute("maxPageLinks", maxPageLinks);
	}

	public void setNextPageLink(java.lang.String nextPageLink) {
		_nextPageLink = nextPageLink;

		setScopedAttribute("nextPageLink", nextPageLink);
	}

	public void setNextPageLinkLabel(java.lang.String nextPageLinkLabel) {
		_nextPageLinkLabel = nextPageLinkLabel;

		setScopedAttribute("nextPageLinkLabel", nextPageLinkLabel);
	}

	public void setPage(java.lang.Object page) {
		_page = page;

		setScopedAttribute("page", page);
	}

	public void setPageContainerTemplate(java.lang.String pageContainerTemplate) {
		_pageContainerTemplate = pageContainerTemplate;

		setScopedAttribute("pageContainerTemplate", pageContainerTemplate);
	}

	public void setPageLinkContent(java.lang.Object pageLinkContent) {
		_pageLinkContent = pageLinkContent;

		setScopedAttribute("pageLinkContent", pageLinkContent);
	}

	public void setPageLinkTemplate(java.lang.String pageLinkTemplate) {
		_pageLinkTemplate = pageLinkTemplate;

		setScopedAttribute("pageLinkTemplate", pageLinkTemplate);
	}

	public void setPageReportEl(java.lang.String pageReportEl) {
		_pageReportEl = pageReportEl;

		setScopedAttribute("pageReportEl", pageReportEl);
	}

	public void setPageReportLabelTemplate(java.lang.String pageReportLabelTemplate) {
		_pageReportLabelTemplate = pageReportLabelTemplate;

		setScopedAttribute("pageReportLabelTemplate", pageReportLabelTemplate);
	}

	public void setPrevPageLink(java.lang.String prevPageLink) {
		_prevPageLink = prevPageLink;

		setScopedAttribute("prevPageLink", prevPageLink);
	}

	public void setPrevPageLinkLabel(java.lang.String prevPageLinkLabel) {
		_prevPageLinkLabel = prevPageLinkLabel;

		setScopedAttribute("prevPageLinkLabel", prevPageLinkLabel);
	}

	public void setRowsPerPage(java.lang.Object rowsPerPage) {
		_rowsPerPage = rowsPerPage;

		setScopedAttribute("rowsPerPage", rowsPerPage);
	}

	public void setRowsPerPageEl(java.lang.String rowsPerPageEl) {
		_rowsPerPageEl = rowsPerPageEl;

		setScopedAttribute("rowsPerPageEl", rowsPerPageEl);
	}

	public void setRowsPerPageOptions(java.lang.Object rowsPerPageOptions) {
		_rowsPerPageOptions = rowsPerPageOptions;

		setScopedAttribute("rowsPerPageOptions", rowsPerPageOptions);
	}

	public void setState(java.lang.Object state) {
		_state = state;

		setScopedAttribute("state", state);
	}

	public void setTemplate(java.lang.String template) {
		_template = template;

		setScopedAttribute("template", template);
	}

	public void setTotal(java.lang.Object total) {
		_total = total;

		setScopedAttribute("total", total);
	}

	public void setTotalEl(java.lang.String totalEl) {
		_totalEl = totalEl;

		setScopedAttribute("totalEl", totalEl);
	}

	public void setTotalLabel(java.lang.String totalLabel) {
		_totalLabel = totalLabel;

		setScopedAttribute("totalLabel", totalLabel);
	}

	public void setTotalPages(java.lang.Object totalPages) {
		_totalPages = totalPages;

		setScopedAttribute("totalPages", totalPages);
	}

	public void setAfterAlwaysVisibleChange(java.lang.Object afterAlwaysVisibleChange) {
		_afterAlwaysVisibleChange = afterAlwaysVisibleChange;

		setScopedAttribute("afterAlwaysVisibleChange", afterAlwaysVisibleChange);
	}

	public void setAfterContainersChange(java.lang.Object afterContainersChange) {
		_afterContainersChange = afterContainersChange;

		setScopedAttribute("afterContainersChange", afterContainersChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterFirstPageLinkChange(java.lang.Object afterFirstPageLinkChange) {
		_afterFirstPageLinkChange = afterFirstPageLinkChange;

		setScopedAttribute("afterFirstPageLinkChange", afterFirstPageLinkChange);
	}

	public void setAfterFirstPageLinkLabelChange(java.lang.Object afterFirstPageLinkLabelChange) {
		_afterFirstPageLinkLabelChange = afterFirstPageLinkLabelChange;

		setScopedAttribute("afterFirstPageLinkLabelChange", afterFirstPageLinkLabelChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterLastPageLinkChange(java.lang.Object afterLastPageLinkChange) {
		_afterLastPageLinkChange = afterLastPageLinkChange;

		setScopedAttribute("afterLastPageLinkChange", afterLastPageLinkChange);
	}

	public void setAfterLastPageLinkLabelChange(java.lang.Object afterLastPageLinkLabelChange) {
		_afterLastPageLinkLabelChange = afterLastPageLinkLabelChange;

		setScopedAttribute("afterLastPageLinkLabelChange", afterLastPageLinkLabelChange);
	}

	public void setAfterMaxPageLinksChange(java.lang.Object afterMaxPageLinksChange) {
		_afterMaxPageLinksChange = afterMaxPageLinksChange;

		setScopedAttribute("afterMaxPageLinksChange", afterMaxPageLinksChange);
	}

	public void setAfterNextPageLinkChange(java.lang.Object afterNextPageLinkChange) {
		_afterNextPageLinkChange = afterNextPageLinkChange;

		setScopedAttribute("afterNextPageLinkChange", afterNextPageLinkChange);
	}

	public void setAfterNextPageLinkLabelChange(java.lang.Object afterNextPageLinkLabelChange) {
		_afterNextPageLinkLabelChange = afterNextPageLinkLabelChange;

		setScopedAttribute("afterNextPageLinkLabelChange", afterNextPageLinkLabelChange);
	}

	public void setAfterPageChange(java.lang.Object afterPageChange) {
		_afterPageChange = afterPageChange;

		setScopedAttribute("afterPageChange", afterPageChange);
	}

	public void setAfterPageContainerTemplateChange(java.lang.Object afterPageContainerTemplateChange) {
		_afterPageContainerTemplateChange = afterPageContainerTemplateChange;

		setScopedAttribute("afterPageContainerTemplateChange", afterPageContainerTemplateChange);
	}

	public void setAfterPageLinkContentChange(java.lang.Object afterPageLinkContentChange) {
		_afterPageLinkContentChange = afterPageLinkContentChange;

		setScopedAttribute("afterPageLinkContentChange", afterPageLinkContentChange);
	}

	public void setAfterPageLinkTemplateChange(java.lang.Object afterPageLinkTemplateChange) {
		_afterPageLinkTemplateChange = afterPageLinkTemplateChange;

		setScopedAttribute("afterPageLinkTemplateChange", afterPageLinkTemplateChange);
	}

	public void setAfterPageReportElChange(java.lang.Object afterPageReportElChange) {
		_afterPageReportElChange = afterPageReportElChange;

		setScopedAttribute("afterPageReportElChange", afterPageReportElChange);
	}

	public void setAfterPageReportLabelTemplateChange(java.lang.Object afterPageReportLabelTemplateChange) {
		_afterPageReportLabelTemplateChange = afterPageReportLabelTemplateChange;

		setScopedAttribute("afterPageReportLabelTemplateChange", afterPageReportLabelTemplateChange);
	}

	public void setAfterPrevPageLinkChange(java.lang.Object afterPrevPageLinkChange) {
		_afterPrevPageLinkChange = afterPrevPageLinkChange;

		setScopedAttribute("afterPrevPageLinkChange", afterPrevPageLinkChange);
	}

	public void setAfterPrevPageLinkLabelChange(java.lang.Object afterPrevPageLinkLabelChange) {
		_afterPrevPageLinkLabelChange = afterPrevPageLinkLabelChange;

		setScopedAttribute("afterPrevPageLinkLabelChange", afterPrevPageLinkLabelChange);
	}

	public void setAfterRowsPerPageChange(java.lang.Object afterRowsPerPageChange) {
		_afterRowsPerPageChange = afterRowsPerPageChange;

		setScopedAttribute("afterRowsPerPageChange", afterRowsPerPageChange);
	}

	public void setAfterRowsPerPageElChange(java.lang.Object afterRowsPerPageElChange) {
		_afterRowsPerPageElChange = afterRowsPerPageElChange;

		setScopedAttribute("afterRowsPerPageElChange", afterRowsPerPageElChange);
	}

	public void setAfterRowsPerPageOptionsChange(java.lang.Object afterRowsPerPageOptionsChange) {
		_afterRowsPerPageOptionsChange = afterRowsPerPageOptionsChange;

		setScopedAttribute("afterRowsPerPageOptionsChange", afterRowsPerPageOptionsChange);
	}

	public void setAfterStateChange(java.lang.Object afterStateChange) {
		_afterStateChange = afterStateChange;

		setScopedAttribute("afterStateChange", afterStateChange);
	}

	public void setAfterTemplateChange(java.lang.Object afterTemplateChange) {
		_afterTemplateChange = afterTemplateChange;

		setScopedAttribute("afterTemplateChange", afterTemplateChange);
	}

	public void setAfterTotalChange(java.lang.Object afterTotalChange) {
		_afterTotalChange = afterTotalChange;

		setScopedAttribute("afterTotalChange", afterTotalChange);
	}

	public void setAfterTotalElChange(java.lang.Object afterTotalElChange) {
		_afterTotalElChange = afterTotalElChange;

		setScopedAttribute("afterTotalElChange", afterTotalElChange);
	}

	public void setAfterTotalLabelChange(java.lang.Object afterTotalLabelChange) {
		_afterTotalLabelChange = afterTotalLabelChange;

		setScopedAttribute("afterTotalLabelChange", afterTotalLabelChange);
	}

	public void setAfterTotalPagesChange(java.lang.Object afterTotalPagesChange) {
		_afterTotalPagesChange = afterTotalPagesChange;

		setScopedAttribute("afterTotalPagesChange", afterTotalPagesChange);
	}

	public void setOnAlwaysVisibleChange(java.lang.Object onAlwaysVisibleChange) {
		_onAlwaysVisibleChange = onAlwaysVisibleChange;

		setScopedAttribute("onAlwaysVisibleChange", onAlwaysVisibleChange);
	}

	public void setOnContainersChange(java.lang.Object onContainersChange) {
		_onContainersChange = onContainersChange;

		setScopedAttribute("onContainersChange", onContainersChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnFirstPageLinkChange(java.lang.Object onFirstPageLinkChange) {
		_onFirstPageLinkChange = onFirstPageLinkChange;

		setScopedAttribute("onFirstPageLinkChange", onFirstPageLinkChange);
	}

	public void setOnFirstPageLinkLabelChange(java.lang.Object onFirstPageLinkLabelChange) {
		_onFirstPageLinkLabelChange = onFirstPageLinkLabelChange;

		setScopedAttribute("onFirstPageLinkLabelChange", onFirstPageLinkLabelChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnLastPageLinkChange(java.lang.Object onLastPageLinkChange) {
		_onLastPageLinkChange = onLastPageLinkChange;

		setScopedAttribute("onLastPageLinkChange", onLastPageLinkChange);
	}

	public void setOnLastPageLinkLabelChange(java.lang.Object onLastPageLinkLabelChange) {
		_onLastPageLinkLabelChange = onLastPageLinkLabelChange;

		setScopedAttribute("onLastPageLinkLabelChange", onLastPageLinkLabelChange);
	}

	public void setOnMaxPageLinksChange(java.lang.Object onMaxPageLinksChange) {
		_onMaxPageLinksChange = onMaxPageLinksChange;

		setScopedAttribute("onMaxPageLinksChange", onMaxPageLinksChange);
	}

	public void setOnNextPageLinkChange(java.lang.Object onNextPageLinkChange) {
		_onNextPageLinkChange = onNextPageLinkChange;

		setScopedAttribute("onNextPageLinkChange", onNextPageLinkChange);
	}

	public void setOnNextPageLinkLabelChange(java.lang.Object onNextPageLinkLabelChange) {
		_onNextPageLinkLabelChange = onNextPageLinkLabelChange;

		setScopedAttribute("onNextPageLinkLabelChange", onNextPageLinkLabelChange);
	}

	public void setOnPageChange(java.lang.Object onPageChange) {
		_onPageChange = onPageChange;

		setScopedAttribute("onPageChange", onPageChange);
	}

	public void setOnPageContainerTemplateChange(java.lang.Object onPageContainerTemplateChange) {
		_onPageContainerTemplateChange = onPageContainerTemplateChange;

		setScopedAttribute("onPageContainerTemplateChange", onPageContainerTemplateChange);
	}

	public void setOnPageLinkContentChange(java.lang.Object onPageLinkContentChange) {
		_onPageLinkContentChange = onPageLinkContentChange;

		setScopedAttribute("onPageLinkContentChange", onPageLinkContentChange);
	}

	public void setOnPageLinkTemplateChange(java.lang.Object onPageLinkTemplateChange) {
		_onPageLinkTemplateChange = onPageLinkTemplateChange;

		setScopedAttribute("onPageLinkTemplateChange", onPageLinkTemplateChange);
	}

	public void setOnPageReportElChange(java.lang.Object onPageReportElChange) {
		_onPageReportElChange = onPageReportElChange;

		setScopedAttribute("onPageReportElChange", onPageReportElChange);
	}

	public void setOnPageReportLabelTemplateChange(java.lang.Object onPageReportLabelTemplateChange) {
		_onPageReportLabelTemplateChange = onPageReportLabelTemplateChange;

		setScopedAttribute("onPageReportLabelTemplateChange", onPageReportLabelTemplateChange);
	}

	public void setOnPrevPageLinkChange(java.lang.Object onPrevPageLinkChange) {
		_onPrevPageLinkChange = onPrevPageLinkChange;

		setScopedAttribute("onPrevPageLinkChange", onPrevPageLinkChange);
	}

	public void setOnPrevPageLinkLabelChange(java.lang.Object onPrevPageLinkLabelChange) {
		_onPrevPageLinkLabelChange = onPrevPageLinkLabelChange;

		setScopedAttribute("onPrevPageLinkLabelChange", onPrevPageLinkLabelChange);
	}

	public void setOnRowsPerPageChange(java.lang.Object onRowsPerPageChange) {
		_onRowsPerPageChange = onRowsPerPageChange;

		setScopedAttribute("onRowsPerPageChange", onRowsPerPageChange);
	}

	public void setOnRowsPerPageElChange(java.lang.Object onRowsPerPageElChange) {
		_onRowsPerPageElChange = onRowsPerPageElChange;

		setScopedAttribute("onRowsPerPageElChange", onRowsPerPageElChange);
	}

	public void setOnRowsPerPageOptionsChange(java.lang.Object onRowsPerPageOptionsChange) {
		_onRowsPerPageOptionsChange = onRowsPerPageOptionsChange;

		setScopedAttribute("onRowsPerPageOptionsChange", onRowsPerPageOptionsChange);
	}

	public void setOnStateChange(java.lang.Object onStateChange) {
		_onStateChange = onStateChange;

		setScopedAttribute("onStateChange", onStateChange);
	}

	public void setOnTemplateChange(java.lang.Object onTemplateChange) {
		_onTemplateChange = onTemplateChange;

		setScopedAttribute("onTemplateChange", onTemplateChange);
	}

	public void setOnTotalChange(java.lang.Object onTotalChange) {
		_onTotalChange = onTotalChange;

		setScopedAttribute("onTotalChange", onTotalChange);
	}

	public void setOnTotalElChange(java.lang.Object onTotalElChange) {
		_onTotalElChange = onTotalElChange;

		setScopedAttribute("onTotalElChange", onTotalElChange);
	}

	public void setOnTotalLabelChange(java.lang.Object onTotalLabelChange) {
		_onTotalLabelChange = onTotalLabelChange;

		setScopedAttribute("onTotalLabelChange", onTotalLabelChange);
	}

	public void setOnTotalPagesChange(java.lang.Object onTotalPagesChange) {
		_onTotalPagesChange = onTotalPagesChange;

		setScopedAttribute("onTotalPagesChange", onTotalPagesChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "alwaysVisible", _alwaysVisible);
		setNamespacedAttribute(request, "containers", _containers);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "firstPageLink", _firstPageLink);
		setNamespacedAttribute(request, "firstPageLinkLabel", _firstPageLinkLabel);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "lastPageLink", _lastPageLink);
		setNamespacedAttribute(request, "lastPageLinkLabel", _lastPageLinkLabel);
		setNamespacedAttribute(request, "maxPageLinks", _maxPageLinks);
		setNamespacedAttribute(request, "nextPageLink", _nextPageLink);
		setNamespacedAttribute(request, "nextPageLinkLabel", _nextPageLinkLabel);
		setNamespacedAttribute(request, "page", _page);
		setNamespacedAttribute(request, "pageContainerTemplate", _pageContainerTemplate);
		setNamespacedAttribute(request, "pageLinkContent", _pageLinkContent);
		setNamespacedAttribute(request, "pageLinkTemplate", _pageLinkTemplate);
		setNamespacedAttribute(request, "pageReportEl", _pageReportEl);
		setNamespacedAttribute(request, "pageReportLabelTemplate", _pageReportLabelTemplate);
		setNamespacedAttribute(request, "prevPageLink", _prevPageLink);
		setNamespacedAttribute(request, "prevPageLinkLabel", _prevPageLinkLabel);
		setNamespacedAttribute(request, "rowsPerPage", _rowsPerPage);
		setNamespacedAttribute(request, "rowsPerPageEl", _rowsPerPageEl);
		setNamespacedAttribute(request, "rowsPerPageOptions", _rowsPerPageOptions);
		setNamespacedAttribute(request, "state", _state);
		setNamespacedAttribute(request, "template", _template);
		setNamespacedAttribute(request, "total", _total);
		setNamespacedAttribute(request, "totalEl", _totalEl);
		setNamespacedAttribute(request, "totalLabel", _totalLabel);
		setNamespacedAttribute(request, "totalPages", _totalPages);
		setNamespacedAttribute(request, "afterAlwaysVisibleChange", _afterAlwaysVisibleChange);
		setNamespacedAttribute(request, "afterContainersChange", _afterContainersChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterFirstPageLinkChange", _afterFirstPageLinkChange);
		setNamespacedAttribute(request, "afterFirstPageLinkLabelChange", _afterFirstPageLinkLabelChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLastPageLinkChange", _afterLastPageLinkChange);
		setNamespacedAttribute(request, "afterLastPageLinkLabelChange", _afterLastPageLinkLabelChange);
		setNamespacedAttribute(request, "afterMaxPageLinksChange", _afterMaxPageLinksChange);
		setNamespacedAttribute(request, "afterNextPageLinkChange", _afterNextPageLinkChange);
		setNamespacedAttribute(request, "afterNextPageLinkLabelChange", _afterNextPageLinkLabelChange);
		setNamespacedAttribute(request, "afterPageChange", _afterPageChange);
		setNamespacedAttribute(request, "afterPageContainerTemplateChange", _afterPageContainerTemplateChange);
		setNamespacedAttribute(request, "afterPageLinkContentChange", _afterPageLinkContentChange);
		setNamespacedAttribute(request, "afterPageLinkTemplateChange", _afterPageLinkTemplateChange);
		setNamespacedAttribute(request, "afterPageReportElChange", _afterPageReportElChange);
		setNamespacedAttribute(request, "afterPageReportLabelTemplateChange", _afterPageReportLabelTemplateChange);
		setNamespacedAttribute(request, "afterPrevPageLinkChange", _afterPrevPageLinkChange);
		setNamespacedAttribute(request, "afterPrevPageLinkLabelChange", _afterPrevPageLinkLabelChange);
		setNamespacedAttribute(request, "afterRowsPerPageChange", _afterRowsPerPageChange);
		setNamespacedAttribute(request, "afterRowsPerPageElChange", _afterRowsPerPageElChange);
		setNamespacedAttribute(request, "afterRowsPerPageOptionsChange", _afterRowsPerPageOptionsChange);
		setNamespacedAttribute(request, "afterStateChange", _afterStateChange);
		setNamespacedAttribute(request, "afterTemplateChange", _afterTemplateChange);
		setNamespacedAttribute(request, "afterTotalChange", _afterTotalChange);
		setNamespacedAttribute(request, "afterTotalElChange", _afterTotalElChange);
		setNamespacedAttribute(request, "afterTotalLabelChange", _afterTotalLabelChange);
		setNamespacedAttribute(request, "afterTotalPagesChange", _afterTotalPagesChange);
		setNamespacedAttribute(request, "onAlwaysVisibleChange", _onAlwaysVisibleChange);
		setNamespacedAttribute(request, "onContainersChange", _onContainersChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onFirstPageLinkChange", _onFirstPageLinkChange);
		setNamespacedAttribute(request, "onFirstPageLinkLabelChange", _onFirstPageLinkLabelChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLastPageLinkChange", _onLastPageLinkChange);
		setNamespacedAttribute(request, "onLastPageLinkLabelChange", _onLastPageLinkLabelChange);
		setNamespacedAttribute(request, "onMaxPageLinksChange", _onMaxPageLinksChange);
		setNamespacedAttribute(request, "onNextPageLinkChange", _onNextPageLinkChange);
		setNamespacedAttribute(request, "onNextPageLinkLabelChange", _onNextPageLinkLabelChange);
		setNamespacedAttribute(request, "onPageChange", _onPageChange);
		setNamespacedAttribute(request, "onPageContainerTemplateChange", _onPageContainerTemplateChange);
		setNamespacedAttribute(request, "onPageLinkContentChange", _onPageLinkContentChange);
		setNamespacedAttribute(request, "onPageLinkTemplateChange", _onPageLinkTemplateChange);
		setNamespacedAttribute(request, "onPageReportElChange", _onPageReportElChange);
		setNamespacedAttribute(request, "onPageReportLabelTemplateChange", _onPageReportLabelTemplateChange);
		setNamespacedAttribute(request, "onPrevPageLinkChange", _onPrevPageLinkChange);
		setNamespacedAttribute(request, "onPrevPageLinkLabelChange", _onPrevPageLinkLabelChange);
		setNamespacedAttribute(request, "onRowsPerPageChange", _onRowsPerPageChange);
		setNamespacedAttribute(request, "onRowsPerPageElChange", _onRowsPerPageElChange);
		setNamespacedAttribute(request, "onRowsPerPageOptionsChange", _onRowsPerPageOptionsChange);
		setNamespacedAttribute(request, "onStateChange", _onStateChange);
		setNamespacedAttribute(request, "onTemplateChange", _onTemplateChange);
		setNamespacedAttribute(request, "onTotalChange", _onTotalChange);
		setNamespacedAttribute(request, "onTotalElChange", _onTotalElChange);
		setNamespacedAttribute(request, "onTotalLabelChange", _onTotalLabelChange);
		setNamespacedAttribute(request, "onTotalPagesChange", _onTotalPagesChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:paginator:";

	private static final String _PAGE =
		"/html/taglib/alloy/paginator/page.jsp";

	private java.lang.Boolean _alwaysVisible;
	private java.lang.String _containers;
	private java.lang.Boolean _destroyed;
	private java.lang.String _firstPageLink;
	private java.lang.String _firstPageLinkLabel;
	private java.lang.Boolean _initialized;
	private java.lang.String _lastPageLink;
	private java.lang.String _lastPageLinkLabel;
	private java.lang.Object _maxPageLinks;
	private java.lang.String _nextPageLink;
	private java.lang.String _nextPageLinkLabel;
	private java.lang.Object _page;
	private java.lang.String _pageContainerTemplate;
	private java.lang.Object _pageLinkContent;
	private java.lang.String _pageLinkTemplate;
	private java.lang.String _pageReportEl;
	private java.lang.String _pageReportLabelTemplate;
	private java.lang.String _prevPageLink;
	private java.lang.String _prevPageLinkLabel;
	private java.lang.Object _rowsPerPage;
	private java.lang.String _rowsPerPageEl;
	private java.lang.Object _rowsPerPageOptions;
	private java.lang.Object _state;
	private java.lang.String _template;
	private java.lang.Object _total;
	private java.lang.String _totalEl;
	private java.lang.String _totalLabel;
	private java.lang.Object _totalPages;
	private java.lang.Object _afterAlwaysVisibleChange;
	private java.lang.Object _afterContainersChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterFirstPageLinkChange;
	private java.lang.Object _afterFirstPageLinkLabelChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterLastPageLinkChange;
	private java.lang.Object _afterLastPageLinkLabelChange;
	private java.lang.Object _afterMaxPageLinksChange;
	private java.lang.Object _afterNextPageLinkChange;
	private java.lang.Object _afterNextPageLinkLabelChange;
	private java.lang.Object _afterPageChange;
	private java.lang.Object _afterPageContainerTemplateChange;
	private java.lang.Object _afterPageLinkContentChange;
	private java.lang.Object _afterPageLinkTemplateChange;
	private java.lang.Object _afterPageReportElChange;
	private java.lang.Object _afterPageReportLabelTemplateChange;
	private java.lang.Object _afterPrevPageLinkChange;
	private java.lang.Object _afterPrevPageLinkLabelChange;
	private java.lang.Object _afterRowsPerPageChange;
	private java.lang.Object _afterRowsPerPageElChange;
	private java.lang.Object _afterRowsPerPageOptionsChange;
	private java.lang.Object _afterStateChange;
	private java.lang.Object _afterTemplateChange;
	private java.lang.Object _afterTotalChange;
	private java.lang.Object _afterTotalElChange;
	private java.lang.Object _afterTotalLabelChange;
	private java.lang.Object _afterTotalPagesChange;
	private java.lang.Object _onAlwaysVisibleChange;
	private java.lang.Object _onContainersChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onFirstPageLinkChange;
	private java.lang.Object _onFirstPageLinkLabelChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onLastPageLinkChange;
	private java.lang.Object _onLastPageLinkLabelChange;
	private java.lang.Object _onMaxPageLinksChange;
	private java.lang.Object _onNextPageLinkChange;
	private java.lang.Object _onNextPageLinkLabelChange;
	private java.lang.Object _onPageChange;
	private java.lang.Object _onPageContainerTemplateChange;
	private java.lang.Object _onPageLinkContentChange;
	private java.lang.Object _onPageLinkTemplateChange;
	private java.lang.Object _onPageReportElChange;
	private java.lang.Object _onPageReportLabelTemplateChange;
	private java.lang.Object _onPrevPageLinkChange;
	private java.lang.Object _onPrevPageLinkLabelChange;
	private java.lang.Object _onRowsPerPageChange;
	private java.lang.Object _onRowsPerPageElChange;
	private java.lang.Object _onRowsPerPageOptionsChange;
	private java.lang.Object _onStateChange;
	private java.lang.Object _onTemplateChange;
	private java.lang.Object _onTotalChange;
	private java.lang.Object _onTotalElChange;
	private java.lang.Object _onTotalLabelChange;
	private java.lang.Object _onTotalPagesChange;

}
