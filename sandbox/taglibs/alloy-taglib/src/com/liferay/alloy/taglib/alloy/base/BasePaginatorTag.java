package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

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

	public java.lang.Number getMaxPageLinks() {
		return _maxPageLinks;
	}

	public java.lang.String getNextPageLink() {
		return _nextPageLink;
	}

	public java.lang.String getNextPageLinkLabel() {
		return _nextPageLinkLabel;
	}

	public java.lang.Number getPage() {
		return _page;
	}

	public java.lang.String getPageContainerTemplate() {
		return _pageContainerTemplate;
	}

	public java.lang.String getPageLinkContent() {
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

	public java.lang.Number getRowsPerPage() {
		return _rowsPerPage;
	}

	public java.lang.String getRowsPerPageEl() {
		return _rowsPerPageEl;
	}

	public java.lang.String getRowsPerPageOptions() {
		return _rowsPerPageOptions;
	}

	public java.lang.Object getState() {
		return _state;
	}

	public java.lang.String getTemplate() {
		return _template;
	}

	public java.lang.Number getTotal() {
		return _total;
	}

	public java.lang.String getTotalEl() {
		return _totalEl;
	}

	public java.lang.String getTotalLabel() {
		return _totalLabel;
	}

	public java.lang.Number getTotalPages() {
		return _totalPages;
	}

	public java.lang.String getAfterAlwaysVisibleChange() {
		return _afterAlwaysVisibleChange;
	}

	public java.lang.String getAfterContainersChange() {
		return _afterContainersChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterFirstPageLinkChange() {
		return _afterFirstPageLinkChange;
	}

	public java.lang.String getAfterFirstPageLinkLabelChange() {
		return _afterFirstPageLinkLabelChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterLastPageLinkChange() {
		return _afterLastPageLinkChange;
	}

	public java.lang.String getAfterLastPageLinkLabelChange() {
		return _afterLastPageLinkLabelChange;
	}

	public java.lang.String getAfterMaxPageLinksChange() {
		return _afterMaxPageLinksChange;
	}

	public java.lang.String getAfterNextPageLinkChange() {
		return _afterNextPageLinkChange;
	}

	public java.lang.String getAfterNextPageLinkLabelChange() {
		return _afterNextPageLinkLabelChange;
	}

	public java.lang.String getAfterPageChange() {
		return _afterPageChange;
	}

	public java.lang.String getAfterPageContainerTemplateChange() {
		return _afterPageContainerTemplateChange;
	}

	public java.lang.String getAfterPageLinkContentChange() {
		return _afterPageLinkContentChange;
	}

	public java.lang.String getAfterPageLinkTemplateChange() {
		return _afterPageLinkTemplateChange;
	}

	public java.lang.String getAfterPageReportElChange() {
		return _afterPageReportElChange;
	}

	public java.lang.String getAfterPageReportLabelTemplateChange() {
		return _afterPageReportLabelTemplateChange;
	}

	public java.lang.String getAfterPrevPageLinkChange() {
		return _afterPrevPageLinkChange;
	}

	public java.lang.String getAfterPrevPageLinkLabelChange() {
		return _afterPrevPageLinkLabelChange;
	}

	public java.lang.String getAfterRowsPerPageChange() {
		return _afterRowsPerPageChange;
	}

	public java.lang.String getAfterRowsPerPageElChange() {
		return _afterRowsPerPageElChange;
	}

	public java.lang.String getAfterRowsPerPageOptionsChange() {
		return _afterRowsPerPageOptionsChange;
	}

	public java.lang.String getAfterStateChange() {
		return _afterStateChange;
	}

	public java.lang.String getAfterTemplateChange() {
		return _afterTemplateChange;
	}

	public java.lang.String getAfterTotalChange() {
		return _afterTotalChange;
	}

	public java.lang.String getAfterTotalElChange() {
		return _afterTotalElChange;
	}

	public java.lang.String getAfterTotalLabelChange() {
		return _afterTotalLabelChange;
	}

	public java.lang.String getAfterTotalPagesChange() {
		return _afterTotalPagesChange;
	}

	public java.lang.String getOnAlwaysVisibleChange() {
		return _onAlwaysVisibleChange;
	}

	public java.lang.String getOnContainersChange() {
		return _onContainersChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnFirstPageLinkChange() {
		return _onFirstPageLinkChange;
	}

	public java.lang.String getOnFirstPageLinkLabelChange() {
		return _onFirstPageLinkLabelChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnLastPageLinkChange() {
		return _onLastPageLinkChange;
	}

	public java.lang.String getOnLastPageLinkLabelChange() {
		return _onLastPageLinkLabelChange;
	}

	public java.lang.String getOnMaxPageLinksChange() {
		return _onMaxPageLinksChange;
	}

	public java.lang.String getOnNextPageLinkChange() {
		return _onNextPageLinkChange;
	}

	public java.lang.String getOnNextPageLinkLabelChange() {
		return _onNextPageLinkLabelChange;
	}

	public java.lang.String getOnPageChange() {
		return _onPageChange;
	}

	public java.lang.String getOnPageContainerTemplateChange() {
		return _onPageContainerTemplateChange;
	}

	public java.lang.String getOnPageLinkContentChange() {
		return _onPageLinkContentChange;
	}

	public java.lang.String getOnPageLinkTemplateChange() {
		return _onPageLinkTemplateChange;
	}

	public java.lang.String getOnPageReportElChange() {
		return _onPageReportElChange;
	}

	public java.lang.String getOnPageReportLabelTemplateChange() {
		return _onPageReportLabelTemplateChange;
	}

	public java.lang.String getOnPrevPageLinkChange() {
		return _onPrevPageLinkChange;
	}

	public java.lang.String getOnPrevPageLinkLabelChange() {
		return _onPrevPageLinkLabelChange;
	}

	public java.lang.String getOnRowsPerPageChange() {
		return _onRowsPerPageChange;
	}

	public java.lang.String getOnRowsPerPageElChange() {
		return _onRowsPerPageElChange;
	}

	public java.lang.String getOnRowsPerPageOptionsChange() {
		return _onRowsPerPageOptionsChange;
	}

	public java.lang.String getOnStateChange() {
		return _onStateChange;
	}

	public java.lang.String getOnTemplateChange() {
		return _onTemplateChange;
	}

	public java.lang.String getOnTotalChange() {
		return _onTotalChange;
	}

	public java.lang.String getOnTotalElChange() {
		return _onTotalElChange;
	}

	public java.lang.String getOnTotalLabelChange() {
		return _onTotalLabelChange;
	}

	public java.lang.String getOnTotalPagesChange() {
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

	public void setMaxPageLinks(java.lang.Number maxPageLinks) {
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

	public void setPage(java.lang.Number page) {
		_page = page;

		setScopedAttribute("page", page);
	}

	public void setPageContainerTemplate(java.lang.String pageContainerTemplate) {
		_pageContainerTemplate = pageContainerTemplate;

		setScopedAttribute("pageContainerTemplate", pageContainerTemplate);
	}

	public void setPageLinkContent(java.lang.String pageLinkContent) {
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

	public void setRowsPerPage(java.lang.Number rowsPerPage) {
		_rowsPerPage = rowsPerPage;

		setScopedAttribute("rowsPerPage", rowsPerPage);
	}

	public void setRowsPerPageEl(java.lang.String rowsPerPageEl) {
		_rowsPerPageEl = rowsPerPageEl;

		setScopedAttribute("rowsPerPageEl", rowsPerPageEl);
	}

	public void setRowsPerPageOptions(java.lang.String rowsPerPageOptions) {
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

	public void setTotal(java.lang.Number total) {
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

	public void setTotalPages(java.lang.Number totalPages) {
		_totalPages = totalPages;

		setScopedAttribute("totalPages", totalPages);
	}

	public void setAfterAlwaysVisibleChange(java.lang.String afterAlwaysVisibleChange) {
		_afterAlwaysVisibleChange = afterAlwaysVisibleChange;

		setScopedAttribute("afterAlwaysVisibleChange", afterAlwaysVisibleChange);
	}

	public void setAfterContainersChange(java.lang.String afterContainersChange) {
		_afterContainersChange = afterContainersChange;

		setScopedAttribute("afterContainersChange", afterContainersChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterFirstPageLinkChange(java.lang.String afterFirstPageLinkChange) {
		_afterFirstPageLinkChange = afterFirstPageLinkChange;

		setScopedAttribute("afterFirstPageLinkChange", afterFirstPageLinkChange);
	}

	public void setAfterFirstPageLinkLabelChange(java.lang.String afterFirstPageLinkLabelChange) {
		_afterFirstPageLinkLabelChange = afterFirstPageLinkLabelChange;

		setScopedAttribute("afterFirstPageLinkLabelChange", afterFirstPageLinkLabelChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterLastPageLinkChange(java.lang.String afterLastPageLinkChange) {
		_afterLastPageLinkChange = afterLastPageLinkChange;

		setScopedAttribute("afterLastPageLinkChange", afterLastPageLinkChange);
	}

	public void setAfterLastPageLinkLabelChange(java.lang.String afterLastPageLinkLabelChange) {
		_afterLastPageLinkLabelChange = afterLastPageLinkLabelChange;

		setScopedAttribute("afterLastPageLinkLabelChange", afterLastPageLinkLabelChange);
	}

	public void setAfterMaxPageLinksChange(java.lang.String afterMaxPageLinksChange) {
		_afterMaxPageLinksChange = afterMaxPageLinksChange;

		setScopedAttribute("afterMaxPageLinksChange", afterMaxPageLinksChange);
	}

	public void setAfterNextPageLinkChange(java.lang.String afterNextPageLinkChange) {
		_afterNextPageLinkChange = afterNextPageLinkChange;

		setScopedAttribute("afterNextPageLinkChange", afterNextPageLinkChange);
	}

	public void setAfterNextPageLinkLabelChange(java.lang.String afterNextPageLinkLabelChange) {
		_afterNextPageLinkLabelChange = afterNextPageLinkLabelChange;

		setScopedAttribute("afterNextPageLinkLabelChange", afterNextPageLinkLabelChange);
	}

	public void setAfterPageChange(java.lang.String afterPageChange) {
		_afterPageChange = afterPageChange;

		setScopedAttribute("afterPageChange", afterPageChange);
	}

	public void setAfterPageContainerTemplateChange(java.lang.String afterPageContainerTemplateChange) {
		_afterPageContainerTemplateChange = afterPageContainerTemplateChange;

		setScopedAttribute("afterPageContainerTemplateChange", afterPageContainerTemplateChange);
	}

	public void setAfterPageLinkContentChange(java.lang.String afterPageLinkContentChange) {
		_afterPageLinkContentChange = afterPageLinkContentChange;

		setScopedAttribute("afterPageLinkContentChange", afterPageLinkContentChange);
	}

	public void setAfterPageLinkTemplateChange(java.lang.String afterPageLinkTemplateChange) {
		_afterPageLinkTemplateChange = afterPageLinkTemplateChange;

		setScopedAttribute("afterPageLinkTemplateChange", afterPageLinkTemplateChange);
	}

	public void setAfterPageReportElChange(java.lang.String afterPageReportElChange) {
		_afterPageReportElChange = afterPageReportElChange;

		setScopedAttribute("afterPageReportElChange", afterPageReportElChange);
	}

	public void setAfterPageReportLabelTemplateChange(java.lang.String afterPageReportLabelTemplateChange) {
		_afterPageReportLabelTemplateChange = afterPageReportLabelTemplateChange;

		setScopedAttribute("afterPageReportLabelTemplateChange", afterPageReportLabelTemplateChange);
	}

	public void setAfterPrevPageLinkChange(java.lang.String afterPrevPageLinkChange) {
		_afterPrevPageLinkChange = afterPrevPageLinkChange;

		setScopedAttribute("afterPrevPageLinkChange", afterPrevPageLinkChange);
	}

	public void setAfterPrevPageLinkLabelChange(java.lang.String afterPrevPageLinkLabelChange) {
		_afterPrevPageLinkLabelChange = afterPrevPageLinkLabelChange;

		setScopedAttribute("afterPrevPageLinkLabelChange", afterPrevPageLinkLabelChange);
	}

	public void setAfterRowsPerPageChange(java.lang.String afterRowsPerPageChange) {
		_afterRowsPerPageChange = afterRowsPerPageChange;

		setScopedAttribute("afterRowsPerPageChange", afterRowsPerPageChange);
	}

	public void setAfterRowsPerPageElChange(java.lang.String afterRowsPerPageElChange) {
		_afterRowsPerPageElChange = afterRowsPerPageElChange;

		setScopedAttribute("afterRowsPerPageElChange", afterRowsPerPageElChange);
	}

	public void setAfterRowsPerPageOptionsChange(java.lang.String afterRowsPerPageOptionsChange) {
		_afterRowsPerPageOptionsChange = afterRowsPerPageOptionsChange;

		setScopedAttribute("afterRowsPerPageOptionsChange", afterRowsPerPageOptionsChange);
	}

	public void setAfterStateChange(java.lang.String afterStateChange) {
		_afterStateChange = afterStateChange;

		setScopedAttribute("afterStateChange", afterStateChange);
	}

	public void setAfterTemplateChange(java.lang.String afterTemplateChange) {
		_afterTemplateChange = afterTemplateChange;

		setScopedAttribute("afterTemplateChange", afterTemplateChange);
	}

	public void setAfterTotalChange(java.lang.String afterTotalChange) {
		_afterTotalChange = afterTotalChange;

		setScopedAttribute("afterTotalChange", afterTotalChange);
	}

	public void setAfterTotalElChange(java.lang.String afterTotalElChange) {
		_afterTotalElChange = afterTotalElChange;

		setScopedAttribute("afterTotalElChange", afterTotalElChange);
	}

	public void setAfterTotalLabelChange(java.lang.String afterTotalLabelChange) {
		_afterTotalLabelChange = afterTotalLabelChange;

		setScopedAttribute("afterTotalLabelChange", afterTotalLabelChange);
	}

	public void setAfterTotalPagesChange(java.lang.String afterTotalPagesChange) {
		_afterTotalPagesChange = afterTotalPagesChange;

		setScopedAttribute("afterTotalPagesChange", afterTotalPagesChange);
	}

	public void setOnAlwaysVisibleChange(java.lang.String onAlwaysVisibleChange) {
		_onAlwaysVisibleChange = onAlwaysVisibleChange;

		setScopedAttribute("onAlwaysVisibleChange", onAlwaysVisibleChange);
	}

	public void setOnContainersChange(java.lang.String onContainersChange) {
		_onContainersChange = onContainersChange;

		setScopedAttribute("onContainersChange", onContainersChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnFirstPageLinkChange(java.lang.String onFirstPageLinkChange) {
		_onFirstPageLinkChange = onFirstPageLinkChange;

		setScopedAttribute("onFirstPageLinkChange", onFirstPageLinkChange);
	}

	public void setOnFirstPageLinkLabelChange(java.lang.String onFirstPageLinkLabelChange) {
		_onFirstPageLinkLabelChange = onFirstPageLinkLabelChange;

		setScopedAttribute("onFirstPageLinkLabelChange", onFirstPageLinkLabelChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnLastPageLinkChange(java.lang.String onLastPageLinkChange) {
		_onLastPageLinkChange = onLastPageLinkChange;

		setScopedAttribute("onLastPageLinkChange", onLastPageLinkChange);
	}

	public void setOnLastPageLinkLabelChange(java.lang.String onLastPageLinkLabelChange) {
		_onLastPageLinkLabelChange = onLastPageLinkLabelChange;

		setScopedAttribute("onLastPageLinkLabelChange", onLastPageLinkLabelChange);
	}

	public void setOnMaxPageLinksChange(java.lang.String onMaxPageLinksChange) {
		_onMaxPageLinksChange = onMaxPageLinksChange;

		setScopedAttribute("onMaxPageLinksChange", onMaxPageLinksChange);
	}

	public void setOnNextPageLinkChange(java.lang.String onNextPageLinkChange) {
		_onNextPageLinkChange = onNextPageLinkChange;

		setScopedAttribute("onNextPageLinkChange", onNextPageLinkChange);
	}

	public void setOnNextPageLinkLabelChange(java.lang.String onNextPageLinkLabelChange) {
		_onNextPageLinkLabelChange = onNextPageLinkLabelChange;

		setScopedAttribute("onNextPageLinkLabelChange", onNextPageLinkLabelChange);
	}

	public void setOnPageChange(java.lang.String onPageChange) {
		_onPageChange = onPageChange;

		setScopedAttribute("onPageChange", onPageChange);
	}

	public void setOnPageContainerTemplateChange(java.lang.String onPageContainerTemplateChange) {
		_onPageContainerTemplateChange = onPageContainerTemplateChange;

		setScopedAttribute("onPageContainerTemplateChange", onPageContainerTemplateChange);
	}

	public void setOnPageLinkContentChange(java.lang.String onPageLinkContentChange) {
		_onPageLinkContentChange = onPageLinkContentChange;

		setScopedAttribute("onPageLinkContentChange", onPageLinkContentChange);
	}

	public void setOnPageLinkTemplateChange(java.lang.String onPageLinkTemplateChange) {
		_onPageLinkTemplateChange = onPageLinkTemplateChange;

		setScopedAttribute("onPageLinkTemplateChange", onPageLinkTemplateChange);
	}

	public void setOnPageReportElChange(java.lang.String onPageReportElChange) {
		_onPageReportElChange = onPageReportElChange;

		setScopedAttribute("onPageReportElChange", onPageReportElChange);
	}

	public void setOnPageReportLabelTemplateChange(java.lang.String onPageReportLabelTemplateChange) {
		_onPageReportLabelTemplateChange = onPageReportLabelTemplateChange;

		setScopedAttribute("onPageReportLabelTemplateChange", onPageReportLabelTemplateChange);
	}

	public void setOnPrevPageLinkChange(java.lang.String onPrevPageLinkChange) {
		_onPrevPageLinkChange = onPrevPageLinkChange;

		setScopedAttribute("onPrevPageLinkChange", onPrevPageLinkChange);
	}

	public void setOnPrevPageLinkLabelChange(java.lang.String onPrevPageLinkLabelChange) {
		_onPrevPageLinkLabelChange = onPrevPageLinkLabelChange;

		setScopedAttribute("onPrevPageLinkLabelChange", onPrevPageLinkLabelChange);
	}

	public void setOnRowsPerPageChange(java.lang.String onRowsPerPageChange) {
		_onRowsPerPageChange = onRowsPerPageChange;

		setScopedAttribute("onRowsPerPageChange", onRowsPerPageChange);
	}

	public void setOnRowsPerPageElChange(java.lang.String onRowsPerPageElChange) {
		_onRowsPerPageElChange = onRowsPerPageElChange;

		setScopedAttribute("onRowsPerPageElChange", onRowsPerPageElChange);
	}

	public void setOnRowsPerPageOptionsChange(java.lang.String onRowsPerPageOptionsChange) {
		_onRowsPerPageOptionsChange = onRowsPerPageOptionsChange;

		setScopedAttribute("onRowsPerPageOptionsChange", onRowsPerPageOptionsChange);
	}

	public void setOnStateChange(java.lang.String onStateChange) {
		_onStateChange = onStateChange;

		setScopedAttribute("onStateChange", onStateChange);
	}

	public void setOnTemplateChange(java.lang.String onTemplateChange) {
		_onTemplateChange = onTemplateChange;

		setScopedAttribute("onTemplateChange", onTemplateChange);
	}

	public void setOnTotalChange(java.lang.String onTotalChange) {
		_onTotalChange = onTotalChange;

		setScopedAttribute("onTotalChange", onTotalChange);
	}

	public void setOnTotalElChange(java.lang.String onTotalElChange) {
		_onTotalElChange = onTotalElChange;

		setScopedAttribute("onTotalElChange", onTotalElChange);
	}

	public void setOnTotalLabelChange(java.lang.String onTotalLabelChange) {
		_onTotalLabelChange = onTotalLabelChange;

		setScopedAttribute("onTotalLabelChange", onTotalLabelChange);
	}

	public void setOnTotalPagesChange(java.lang.String onTotalPagesChange) {
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:paginator:";

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
	private java.lang.Number _maxPageLinks;
	private java.lang.String _nextPageLink;
	private java.lang.String _nextPageLinkLabel;
	private java.lang.Number _page;
	private java.lang.String _pageContainerTemplate;
	private java.lang.String _pageLinkContent;
	private java.lang.String _pageLinkTemplate;
	private java.lang.String _pageReportEl;
	private java.lang.String _pageReportLabelTemplate;
	private java.lang.String _prevPageLink;
	private java.lang.String _prevPageLinkLabel;
	private java.lang.Number _rowsPerPage;
	private java.lang.String _rowsPerPageEl;
	private java.lang.String _rowsPerPageOptions;
	private java.lang.Object _state;
	private java.lang.String _template;
	private java.lang.Number _total;
	private java.lang.String _totalEl;
	private java.lang.String _totalLabel;
	private java.lang.Number _totalPages;
	private java.lang.String _afterAlwaysVisibleChange;
	private java.lang.String _afterContainersChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterFirstPageLinkChange;
	private java.lang.String _afterFirstPageLinkLabelChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterLastPageLinkChange;
	private java.lang.String _afterLastPageLinkLabelChange;
	private java.lang.String _afterMaxPageLinksChange;
	private java.lang.String _afterNextPageLinkChange;
	private java.lang.String _afterNextPageLinkLabelChange;
	private java.lang.String _afterPageChange;
	private java.lang.String _afterPageContainerTemplateChange;
	private java.lang.String _afterPageLinkContentChange;
	private java.lang.String _afterPageLinkTemplateChange;
	private java.lang.String _afterPageReportElChange;
	private java.lang.String _afterPageReportLabelTemplateChange;
	private java.lang.String _afterPrevPageLinkChange;
	private java.lang.String _afterPrevPageLinkLabelChange;
	private java.lang.String _afterRowsPerPageChange;
	private java.lang.String _afterRowsPerPageElChange;
	private java.lang.String _afterRowsPerPageOptionsChange;
	private java.lang.String _afterStateChange;
	private java.lang.String _afterTemplateChange;
	private java.lang.String _afterTotalChange;
	private java.lang.String _afterTotalElChange;
	private java.lang.String _afterTotalLabelChange;
	private java.lang.String _afterTotalPagesChange;
	private java.lang.String _onAlwaysVisibleChange;
	private java.lang.String _onContainersChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onFirstPageLinkChange;
	private java.lang.String _onFirstPageLinkLabelChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onLastPageLinkChange;
	private java.lang.String _onLastPageLinkLabelChange;
	private java.lang.String _onMaxPageLinksChange;
	private java.lang.String _onNextPageLinkChange;
	private java.lang.String _onNextPageLinkLabelChange;
	private java.lang.String _onPageChange;
	private java.lang.String _onPageContainerTemplateChange;
	private java.lang.String _onPageLinkContentChange;
	private java.lang.String _onPageLinkTemplateChange;
	private java.lang.String _onPageReportElChange;
	private java.lang.String _onPageReportLabelTemplateChange;
	private java.lang.String _onPrevPageLinkChange;
	private java.lang.String _onPrevPageLinkLabelChange;
	private java.lang.String _onRowsPerPageChange;
	private java.lang.String _onRowsPerPageElChange;
	private java.lang.String _onRowsPerPageOptionsChange;
	private java.lang.String _onStateChange;
	private java.lang.String _onTemplateChange;
	private java.lang.String _onTotalChange;
	private java.lang.String _onTotalElChange;
	private java.lang.String _onTotalLabelChange;
	private java.lang.String _onTotalPagesChange;

}
