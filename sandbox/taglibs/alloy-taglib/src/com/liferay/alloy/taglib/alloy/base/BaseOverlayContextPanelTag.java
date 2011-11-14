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

package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseOverlayContextPanelTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Object getAlign() {
		return _align;
	}

	public java.lang.Object getAlignOn() {
		return _alignOn;
	}

	public java.lang.Object getAnim() {
		return _anim;
	}

	public java.lang.String getArrow() {
		return _arrow;
	}

	public java.lang.Object getOverlaycontextpanelBodyContent() {
		return _overlaycontextpanelBodyContent;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public boolean getCancellableHide() {
		return _cancellableHide;
	}

	public java.lang.Object getCentered() {
		return _centered;
	}

	public java.lang.Object getConstrain() {
		return _constrain;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Object getCurrentNode() {
		return _currentNode;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public java.lang.Object getFillHeight() {
		return _fillHeight;
	}

	public boolean getFocused() {
		return _focused;
	}

	public java.lang.Object getFooterContent() {
		return _footerContent;
	}

	public java.lang.Object getHeaderContent() {
		return _headerContent;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getHideDelay() {
		return _hideDelay;
	}

	public java.lang.String getHideOn() {
		return _hideOn;
	}

	public boolean getHideOnDocumentClick() {
		return _hideOnDocumentClick;
	}

	public java.lang.String getOverlaycontextpanelId() {
		return _overlaycontextpanelId;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public boolean getPreventOverlap() {
		return _preventOverlap;
	}

	public java.lang.Object getRender() {
		return _render;
	}

	public boolean getRendered() {
		return _rendered;
	}

	public boolean getShim() {
		return _shim;
	}

	public boolean getShowArrow() {
		return _showArrow;
	}

	public java.lang.Object getShowDelay() {
		return _showDelay;
	}

	public java.lang.String getShowOn() {
		return _showOn;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public boolean getStack() {
		return _stack;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Object getTabIndex() {
		return _tabIndex;
	}

	public java.lang.Object getTrigger() {
		return _trigger;
	}

	public boolean getUseARIA() {
		return _useARIA;
	}

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getX() {
		return _x;
	}

	public java.lang.Object getXy() {
		return _xy;
	}

	public java.lang.Object getY() {
		return _y;
	}

	public java.lang.Object getZIndex() {
		return _zIndex;
	}

	public java.lang.Object getAfterAlignChange() {
		return _afterAlignChange;
	}

	public java.lang.Object getAfterAlignOnChange() {
		return _afterAlignOnChange;
	}

	public java.lang.Object getAfterAnimChange() {
		return _afterAnimChange;
	}

	public java.lang.Object getAfterArrowChange() {
		return _afterArrowChange;
	}

	public java.lang.Object getAfterBodyContentChange() {
		return _afterBodyContentChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCancellableHideChange() {
		return _afterCancellableHideChange;
	}

	public java.lang.Object getAfterCenteredChange() {
		return _afterCenteredChange;
	}

	public java.lang.Object getAfterConstrainChange() {
		return _afterConstrainChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterCurrentNodeChange() {
		return _afterCurrentNodeChange;
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

	public java.lang.Object getAfterFillHeightChange() {
		return _afterFillHeightChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterFooterContentChange() {
		return _afterFooterContentChange;
	}

	public java.lang.Object getAfterHeaderContentChange() {
		return _afterHeaderContentChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.Object getAfterHideDelayChange() {
		return _afterHideDelayChange;
	}

	public java.lang.Object getAfterHideOnChange() {
		return _afterHideOnChange;
	}

	public java.lang.Object getAfterHideOnDocumentClickChange() {
		return _afterHideOnDocumentClickChange;
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

	public java.lang.Object getAfterPreventOverlapChange() {
		return _afterPreventOverlapChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterShimChange() {
		return _afterShimChange;
	}

	public java.lang.Object getAfterShowArrowChange() {
		return _afterShowArrowChange;
	}

	public java.lang.Object getAfterShowDelayChange() {
		return _afterShowDelayChange;
	}

	public java.lang.Object getAfterShowOnChange() {
		return _afterShowOnChange;
	}

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStackChange() {
		return _afterStackChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.Object getAfterTriggerChange() {
		return _afterTriggerChange;
	}

	public java.lang.Object getAfterUseARIAChange() {
		return _afterUseARIAChange;
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

	public java.lang.Object getAfterXChange() {
		return _afterXChange;
	}

	public java.lang.Object getAfterXyChange() {
		return _afterXyChange;
	}

	public java.lang.Object getAfterYChange() {
		return _afterYChange;
	}

	public java.lang.Object getAfterZIndexChange() {
		return _afterZIndexChange;
	}

	public java.lang.Object getOnAlignChange() {
		return _onAlignChange;
	}

	public java.lang.Object getOnAlignOnChange() {
		return _onAlignOnChange;
	}

	public java.lang.Object getOnAnimChange() {
		return _onAnimChange;
	}

	public java.lang.Object getOnArrowChange() {
		return _onArrowChange;
	}

	public java.lang.Object getOnBodyContentChange() {
		return _onBodyContentChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnCancellableHideChange() {
		return _onCancellableHideChange;
	}

	public java.lang.Object getOnCenteredChange() {
		return _onCenteredChange;
	}

	public java.lang.Object getOnConstrainChange() {
		return _onConstrainChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnCurrentNodeChange() {
		return _onCurrentNodeChange;
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

	public java.lang.Object getOnFillHeightChange() {
		return _onFillHeightChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnFooterContentChange() {
		return _onFooterContentChange;
	}

	public java.lang.Object getOnHeaderContentChange() {
		return _onHeaderContentChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.Object getOnHideDelayChange() {
		return _onHideDelayChange;
	}

	public java.lang.Object getOnHideOnChange() {
		return _onHideOnChange;
	}

	public java.lang.Object getOnHideOnDocumentClickChange() {
		return _onHideOnDocumentClickChange;
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

	public java.lang.Object getOnPreventOverlapChange() {
		return _onPreventOverlapChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnShimChange() {
		return _onShimChange;
	}

	public java.lang.Object getOnShowArrowChange() {
		return _onShowArrowChange;
	}

	public java.lang.Object getOnShowDelayChange() {
		return _onShowDelayChange;
	}

	public java.lang.Object getOnShowOnChange() {
		return _onShowOnChange;
	}

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStackChange() {
		return _onStackChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.Object getOnTriggerChange() {
		return _onTriggerChange;
	}

	public java.lang.Object getOnUseARIAChange() {
		return _onUseARIAChange;
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

	public java.lang.Object getOnXChange() {
		return _onXChange;
	}

	public java.lang.Object getOnXyChange() {
		return _onXyChange;
	}

	public java.lang.Object getOnYChange() {
		return _onYChange;
	}

	public java.lang.Object getOnZIndexChange() {
		return _onZIndexChange;
	}

	public void setAlign(java.lang.Object align) {
		_align = align;

		setScopedAttribute("align", align);
	}

	public void setAlignOn(java.lang.Object alignOn) {
		_alignOn = alignOn;

		setScopedAttribute("alignOn", alignOn);
	}

	public void setAnim(java.lang.Object anim) {
		_anim = anim;

		setScopedAttribute("anim", anim);
	}

	public void setArrow(java.lang.String arrow) {
		_arrow = arrow;

		setScopedAttribute("arrow", arrow);
	}

	public void setOverlaycontextpanelBodyContent(java.lang.Object overlaycontextpanelBodyContent) {
		_overlaycontextpanelBodyContent = overlaycontextpanelBodyContent;

		setScopedAttribute("overlaycontextpanelBodyContent", overlaycontextpanelBodyContent);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCancellableHide(boolean cancellableHide) {
		_cancellableHide = cancellableHide;

		setScopedAttribute("cancellableHide", cancellableHide);
	}

	public void setCentered(java.lang.Object centered) {
		_centered = centered;

		setScopedAttribute("centered", centered);
	}

	public void setConstrain(java.lang.Object constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setCurrentNode(java.lang.Object currentNode) {
		_currentNode = currentNode;

		setScopedAttribute("currentNode", currentNode);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFillHeight(java.lang.Object fillHeight) {
		_fillHeight = fillHeight;

		setScopedAttribute("fillHeight", fillHeight);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setFooterContent(java.lang.Object footerContent) {
		_footerContent = footerContent;

		setScopedAttribute("footerContent", footerContent);
	}

	public void setHeaderContent(java.lang.Object headerContent) {
		_headerContent = headerContent;

		setScopedAttribute("headerContent", headerContent);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setHideDelay(java.lang.Object hideDelay) {
		_hideDelay = hideDelay;

		setScopedAttribute("hideDelay", hideDelay);
	}

	public void setHideOn(java.lang.String hideOn) {
		_hideOn = hideOn;

		setScopedAttribute("hideOn", hideOn);
	}

	public void setHideOnDocumentClick(boolean hideOnDocumentClick) {
		_hideOnDocumentClick = hideOnDocumentClick;

		setScopedAttribute("hideOnDocumentClick", hideOnDocumentClick);
	}

	public void setOverlaycontextpanelId(java.lang.String overlaycontextpanelId) {
		_overlaycontextpanelId = overlaycontextpanelId;

		setScopedAttribute("overlaycontextpanelId", overlaycontextpanelId);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setPreventOverlap(boolean preventOverlap) {
		_preventOverlap = preventOverlap;

		setScopedAttribute("preventOverlap", preventOverlap);
	}

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setShim(boolean shim) {
		_shim = shim;

		setScopedAttribute("shim", shim);
	}

	public void setShowArrow(boolean showArrow) {
		_showArrow = showArrow;

		setScopedAttribute("showArrow", showArrow);
	}

	public void setShowDelay(java.lang.Object showDelay) {
		_showDelay = showDelay;

		setScopedAttribute("showDelay", showDelay);
	}

	public void setShowOn(java.lang.String showOn) {
		_showOn = showOn;

		setScopedAttribute("showOn", showOn);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStack(boolean stack) {
		_stack = stack;

		setScopedAttribute("stack", stack);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.Object tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTrigger(java.lang.Object trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setUseARIA(boolean useARIA) {
		_useARIA = useARIA;

		setScopedAttribute("useARIA", useARIA);
	}

	public void setVisible(boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setX(java.lang.Object x) {
		_x = x;

		setScopedAttribute("x", x);
	}

	public void setXy(java.lang.Object xy) {
		_xy = xy;

		setScopedAttribute("xy", xy);
	}

	public void setY(java.lang.Object y) {
		_y = y;

		setScopedAttribute("y", y);
	}

	public void setZIndex(java.lang.Object zIndex) {
		_zIndex = zIndex;

		setScopedAttribute("zIndex", zIndex);
	}

	public void setAfterAlignChange(java.lang.Object afterAlignChange) {
		_afterAlignChange = afterAlignChange;

		setScopedAttribute("afterAlignChange", afterAlignChange);
	}

	public void setAfterAlignOnChange(java.lang.Object afterAlignOnChange) {
		_afterAlignOnChange = afterAlignOnChange;

		setScopedAttribute("afterAlignOnChange", afterAlignOnChange);
	}

	public void setAfterAnimChange(java.lang.Object afterAnimChange) {
		_afterAnimChange = afterAnimChange;

		setScopedAttribute("afterAnimChange", afterAnimChange);
	}

	public void setAfterArrowChange(java.lang.Object afterArrowChange) {
		_afterArrowChange = afterArrowChange;

		setScopedAttribute("afterArrowChange", afterArrowChange);
	}

	public void setAfterBodyContentChange(java.lang.Object afterBodyContentChange) {
		_afterBodyContentChange = afterBodyContentChange;

		setScopedAttribute("afterBodyContentChange", afterBodyContentChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterCancellableHideChange(java.lang.Object afterCancellableHideChange) {
		_afterCancellableHideChange = afterCancellableHideChange;

		setScopedAttribute("afterCancellableHideChange", afterCancellableHideChange);
	}

	public void setAfterCenteredChange(java.lang.Object afterCenteredChange) {
		_afterCenteredChange = afterCenteredChange;

		setScopedAttribute("afterCenteredChange", afterCenteredChange);
	}

	public void setAfterConstrainChange(java.lang.Object afterConstrainChange) {
		_afterConstrainChange = afterConstrainChange;

		setScopedAttribute("afterConstrainChange", afterConstrainChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterCurrentNodeChange(java.lang.Object afterCurrentNodeChange) {
		_afterCurrentNodeChange = afterCurrentNodeChange;

		setScopedAttribute("afterCurrentNodeChange", afterCurrentNodeChange);
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

	public void setAfterFillHeightChange(java.lang.Object afterFillHeightChange) {
		_afterFillHeightChange = afterFillHeightChange;

		setScopedAttribute("afterFillHeightChange", afterFillHeightChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterFooterContentChange(java.lang.Object afterFooterContentChange) {
		_afterFooterContentChange = afterFooterContentChange;

		setScopedAttribute("afterFooterContentChange", afterFooterContentChange);
	}

	public void setAfterHeaderContentChange(java.lang.Object afterHeaderContentChange) {
		_afterHeaderContentChange = afterHeaderContentChange;

		setScopedAttribute("afterHeaderContentChange", afterHeaderContentChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterHideDelayChange(java.lang.Object afterHideDelayChange) {
		_afterHideDelayChange = afterHideDelayChange;

		setScopedAttribute("afterHideDelayChange", afterHideDelayChange);
	}

	public void setAfterHideOnChange(java.lang.Object afterHideOnChange) {
		_afterHideOnChange = afterHideOnChange;

		setScopedAttribute("afterHideOnChange", afterHideOnChange);
	}

	public void setAfterHideOnDocumentClickChange(java.lang.Object afterHideOnDocumentClickChange) {
		_afterHideOnDocumentClickChange = afterHideOnDocumentClickChange;

		setScopedAttribute("afterHideOnDocumentClickChange", afterHideOnDocumentClickChange);
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

	public void setAfterPreventOverlapChange(java.lang.Object afterPreventOverlapChange) {
		_afterPreventOverlapChange = afterPreventOverlapChange;

		setScopedAttribute("afterPreventOverlapChange", afterPreventOverlapChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterShimChange(java.lang.Object afterShimChange) {
		_afterShimChange = afterShimChange;

		setScopedAttribute("afterShimChange", afterShimChange);
	}

	public void setAfterShowArrowChange(java.lang.Object afterShowArrowChange) {
		_afterShowArrowChange = afterShowArrowChange;

		setScopedAttribute("afterShowArrowChange", afterShowArrowChange);
	}

	public void setAfterShowDelayChange(java.lang.Object afterShowDelayChange) {
		_afterShowDelayChange = afterShowDelayChange;

		setScopedAttribute("afterShowDelayChange", afterShowDelayChange);
	}

	public void setAfterShowOnChange(java.lang.Object afterShowOnChange) {
		_afterShowOnChange = afterShowOnChange;

		setScopedAttribute("afterShowOnChange", afterShowOnChange);
	}

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStackChange(java.lang.Object afterStackChange) {
		_afterStackChange = afterStackChange;

		setScopedAttribute("afterStackChange", afterStackChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTriggerChange(java.lang.Object afterTriggerChange) {
		_afterTriggerChange = afterTriggerChange;

		setScopedAttribute("afterTriggerChange", afterTriggerChange);
	}

	public void setAfterUseARIAChange(java.lang.Object afterUseARIAChange) {
		_afterUseARIAChange = afterUseARIAChange;

		setScopedAttribute("afterUseARIAChange", afterUseARIAChange);
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

	public void setAfterXChange(java.lang.Object afterXChange) {
		_afterXChange = afterXChange;

		setScopedAttribute("afterXChange", afterXChange);
	}

	public void setAfterXyChange(java.lang.Object afterXyChange) {
		_afterXyChange = afterXyChange;

		setScopedAttribute("afterXyChange", afterXyChange);
	}

	public void setAfterYChange(java.lang.Object afterYChange) {
		_afterYChange = afterYChange;

		setScopedAttribute("afterYChange", afterYChange);
	}

	public void setAfterZIndexChange(java.lang.Object afterZIndexChange) {
		_afterZIndexChange = afterZIndexChange;

		setScopedAttribute("afterZIndexChange", afterZIndexChange);
	}

	public void setOnAlignChange(java.lang.Object onAlignChange) {
		_onAlignChange = onAlignChange;

		setScopedAttribute("onAlignChange", onAlignChange);
	}

	public void setOnAlignOnChange(java.lang.Object onAlignOnChange) {
		_onAlignOnChange = onAlignOnChange;

		setScopedAttribute("onAlignOnChange", onAlignOnChange);
	}

	public void setOnAnimChange(java.lang.Object onAnimChange) {
		_onAnimChange = onAnimChange;

		setScopedAttribute("onAnimChange", onAnimChange);
	}

	public void setOnArrowChange(java.lang.Object onArrowChange) {
		_onArrowChange = onArrowChange;

		setScopedAttribute("onArrowChange", onArrowChange);
	}

	public void setOnBodyContentChange(java.lang.Object onBodyContentChange) {
		_onBodyContentChange = onBodyContentChange;

		setScopedAttribute("onBodyContentChange", onBodyContentChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnCancellableHideChange(java.lang.Object onCancellableHideChange) {
		_onCancellableHideChange = onCancellableHideChange;

		setScopedAttribute("onCancellableHideChange", onCancellableHideChange);
	}

	public void setOnCenteredChange(java.lang.Object onCenteredChange) {
		_onCenteredChange = onCenteredChange;

		setScopedAttribute("onCenteredChange", onCenteredChange);
	}

	public void setOnConstrainChange(java.lang.Object onConstrainChange) {
		_onConstrainChange = onConstrainChange;

		setScopedAttribute("onConstrainChange", onConstrainChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnCurrentNodeChange(java.lang.Object onCurrentNodeChange) {
		_onCurrentNodeChange = onCurrentNodeChange;

		setScopedAttribute("onCurrentNodeChange", onCurrentNodeChange);
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

	public void setOnFillHeightChange(java.lang.Object onFillHeightChange) {
		_onFillHeightChange = onFillHeightChange;

		setScopedAttribute("onFillHeightChange", onFillHeightChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnFooterContentChange(java.lang.Object onFooterContentChange) {
		_onFooterContentChange = onFooterContentChange;

		setScopedAttribute("onFooterContentChange", onFooterContentChange);
	}

	public void setOnHeaderContentChange(java.lang.Object onHeaderContentChange) {
		_onHeaderContentChange = onHeaderContentChange;

		setScopedAttribute("onHeaderContentChange", onHeaderContentChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnHideDelayChange(java.lang.Object onHideDelayChange) {
		_onHideDelayChange = onHideDelayChange;

		setScopedAttribute("onHideDelayChange", onHideDelayChange);
	}

	public void setOnHideOnChange(java.lang.Object onHideOnChange) {
		_onHideOnChange = onHideOnChange;

		setScopedAttribute("onHideOnChange", onHideOnChange);
	}

	public void setOnHideOnDocumentClickChange(java.lang.Object onHideOnDocumentClickChange) {
		_onHideOnDocumentClickChange = onHideOnDocumentClickChange;

		setScopedAttribute("onHideOnDocumentClickChange", onHideOnDocumentClickChange);
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

	public void setOnPreventOverlapChange(java.lang.Object onPreventOverlapChange) {
		_onPreventOverlapChange = onPreventOverlapChange;

		setScopedAttribute("onPreventOverlapChange", onPreventOverlapChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnShimChange(java.lang.Object onShimChange) {
		_onShimChange = onShimChange;

		setScopedAttribute("onShimChange", onShimChange);
	}

	public void setOnShowArrowChange(java.lang.Object onShowArrowChange) {
		_onShowArrowChange = onShowArrowChange;

		setScopedAttribute("onShowArrowChange", onShowArrowChange);
	}

	public void setOnShowDelayChange(java.lang.Object onShowDelayChange) {
		_onShowDelayChange = onShowDelayChange;

		setScopedAttribute("onShowDelayChange", onShowDelayChange);
	}

	public void setOnShowOnChange(java.lang.Object onShowOnChange) {
		_onShowOnChange = onShowOnChange;

		setScopedAttribute("onShowOnChange", onShowOnChange);
	}

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStackChange(java.lang.Object onStackChange) {
		_onStackChange = onStackChange;

		setScopedAttribute("onStackChange", onStackChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTriggerChange(java.lang.Object onTriggerChange) {
		_onTriggerChange = onTriggerChange;

		setScopedAttribute("onTriggerChange", onTriggerChange);
	}

	public void setOnUseARIAChange(java.lang.Object onUseARIAChange) {
		_onUseARIAChange = onUseARIAChange;

		setScopedAttribute("onUseARIAChange", onUseARIAChange);
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

	public void setOnXChange(java.lang.Object onXChange) {
		_onXChange = onXChange;

		setScopedAttribute("onXChange", onXChange);
	}

	public void setOnXyChange(java.lang.Object onXyChange) {
		_onXyChange = onXyChange;

		setScopedAttribute("onXyChange", onXyChange);
	}

	public void setOnYChange(java.lang.Object onYChange) {
		_onYChange = onYChange;

		setScopedAttribute("onYChange", onYChange);
	}

	public void setOnZIndexChange(java.lang.Object onZIndexChange) {
		_onZIndexChange = onZIndexChange;

		setScopedAttribute("onZIndexChange", onZIndexChange);
	}

	@Override
	protected void cleanUp() {
		_align = null;
		_alignOn = null;
		_anim = null;
		_arrow = null;
		_overlaycontextpanelBodyContent = null;
		_boundingBox = null;
		_cancellableHide = true;
		_centered = null;
		_constrain = null;
		_contentBox = null;
		_cssClass = null;
		_currentNode = null;
		_destroyed = false;
		_disabled = false;
		_fillHeight = null;
		_focused = false;
		_footerContent = null;
		_headerContent = null;
		_height = null;
		_hideClass = "aui-helper-hidden";
		_hideDelay = 0;
		_hideOn = "click";
		_hideOnDocumentClick = true;
		_overlaycontextpanelId = null;
		_initialized = false;
		_preventOverlap = false;
		_render = null;
		_rendered = false;
		_shim = false;
		_showArrow = true;
		_showDelay = 0;
		_showOn = "click";
		_srcNode = null;
		_stack = true;
		_strings = null;
		_tabIndex = 0;
		_trigger = null;
		_useARIA = true;
		_visible = false;
		_width = null;
		_x = 0;
		_xy = null;
		_y = 0;
		_zIndex = 0;
		_afterAlignChange = null;
		_afterAlignOnChange = null;
		_afterAnimChange = null;
		_afterArrowChange = null;
		_afterBodyContentChange = null;
		_afterBoundingBoxChange = null;
		_afterCancellableHideChange = null;
		_afterCenteredChange = null;
		_afterConstrainChange = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterCurrentNodeChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterFillHeightChange = null;
		_afterFocusedChange = null;
		_afterFooterContentChange = null;
		_afterHeaderContentChange = null;
		_afterHeightChange = null;
		_afterHideClassChange = null;
		_afterHideDelayChange = null;
		_afterHideOnChange = null;
		_afterHideOnDocumentClickChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterPreventOverlapChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterShimChange = null;
		_afterShowArrowChange = null;
		_afterShowDelayChange = null;
		_afterShowOnChange = null;
		_afterSrcNodeChange = null;
		_afterStackChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterTriggerChange = null;
		_afterUseARIAChange = null;
		_afterVisibleChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_afterXChange = null;
		_afterXyChange = null;
		_afterYChange = null;
		_afterZIndexChange = null;
		_onAlignChange = null;
		_onAlignOnChange = null;
		_onAnimChange = null;
		_onArrowChange = null;
		_onBodyContentChange = null;
		_onBoundingBoxChange = null;
		_onCancellableHideChange = null;
		_onCenteredChange = null;
		_onConstrainChange = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onCurrentNodeChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onFillHeightChange = null;
		_onFocusedChange = null;
		_onFooterContentChange = null;
		_onHeaderContentChange = null;
		_onHeightChange = null;
		_onHideClassChange = null;
		_onHideDelayChange = null;
		_onHideOnChange = null;
		_onHideOnDocumentClickChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onPreventOverlapChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onShimChange = null;
		_onShowArrowChange = null;
		_onShowDelayChange = null;
		_onShowOnChange = null;
		_onSrcNodeChange = null;
		_onStackChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onTriggerChange = null;
		_onUseARIAChange = null;
		_onVisibleChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
		_onXChange = null;
		_onXyChange = null;
		_onYChange = null;
		_onZIndexChange = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "align", _align);
		setNamespacedAttribute(request, "alignOn", _alignOn);
		setNamespacedAttribute(request, "anim", _anim);
		setNamespacedAttribute(request, "arrow", _arrow);
		setNamespacedAttribute(request, "overlaycontextpanelBodyContent", _overlaycontextpanelBodyContent);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "cancellableHide", _cancellableHide);
		setNamespacedAttribute(request, "centered", _centered);
		setNamespacedAttribute(request, "constrain", _constrain);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "currentNode", _currentNode);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "fillHeight", _fillHeight);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "footerContent", _footerContent);
		setNamespacedAttribute(request, "headerContent", _headerContent);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "hideDelay", _hideDelay);
		setNamespacedAttribute(request, "hideOn", _hideOn);
		setNamespacedAttribute(request, "hideOnDocumentClick", _hideOnDocumentClick);
		setNamespacedAttribute(request, "overlaycontextpanelId", _overlaycontextpanelId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "preventOverlap", _preventOverlap);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "shim", _shim);
		setNamespacedAttribute(request, "showArrow", _showArrow);
		setNamespacedAttribute(request, "showDelay", _showDelay);
		setNamespacedAttribute(request, "showOn", _showOn);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "stack", _stack);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "trigger", _trigger);
		setNamespacedAttribute(request, "useARIA", _useARIA);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "x", _x);
		setNamespacedAttribute(request, "xy", _xy);
		setNamespacedAttribute(request, "y", _y);
		setNamespacedAttribute(request, "zIndex", _zIndex);
		setNamespacedAttribute(request, "afterAlignChange", _afterAlignChange);
		setNamespacedAttribute(request, "afterAlignOnChange", _afterAlignOnChange);
		setNamespacedAttribute(request, "afterAnimChange", _afterAnimChange);
		setNamespacedAttribute(request, "afterArrowChange", _afterArrowChange);
		setNamespacedAttribute(request, "afterBodyContentChange", _afterBodyContentChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCancellableHideChange", _afterCancellableHideChange);
		setNamespacedAttribute(request, "afterCenteredChange", _afterCenteredChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterCurrentNodeChange", _afterCurrentNodeChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFillHeightChange", _afterFillHeightChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterFooterContentChange", _afterFooterContentChange);
		setNamespacedAttribute(request, "afterHeaderContentChange", _afterHeaderContentChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterHideDelayChange", _afterHideDelayChange);
		setNamespacedAttribute(request, "afterHideOnChange", _afterHideOnChange);
		setNamespacedAttribute(request, "afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterPreventOverlapChange", _afterPreventOverlapChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterShimChange", _afterShimChange);
		setNamespacedAttribute(request, "afterShowArrowChange", _afterShowArrowChange);
		setNamespacedAttribute(request, "afterShowDelayChange", _afterShowDelayChange);
		setNamespacedAttribute(request, "afterShowOnChange", _afterShowOnChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStackChange", _afterStackChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTriggerChange", _afterTriggerChange);
		setNamespacedAttribute(request, "afterUseARIAChange", _afterUseARIAChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "afterXChange", _afterXChange);
		setNamespacedAttribute(request, "afterXyChange", _afterXyChange);
		setNamespacedAttribute(request, "afterYChange", _afterYChange);
		setNamespacedAttribute(request, "afterZIndexChange", _afterZIndexChange);
		setNamespacedAttribute(request, "onAlignChange", _onAlignChange);
		setNamespacedAttribute(request, "onAlignOnChange", _onAlignOnChange);
		setNamespacedAttribute(request, "onAnimChange", _onAnimChange);
		setNamespacedAttribute(request, "onArrowChange", _onArrowChange);
		setNamespacedAttribute(request, "onBodyContentChange", _onBodyContentChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCancellableHideChange", _onCancellableHideChange);
		setNamespacedAttribute(request, "onCenteredChange", _onCenteredChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onCurrentNodeChange", _onCurrentNodeChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFillHeightChange", _onFillHeightChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onFooterContentChange", _onFooterContentChange);
		setNamespacedAttribute(request, "onHeaderContentChange", _onHeaderContentChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onHideDelayChange", _onHideDelayChange);
		setNamespacedAttribute(request, "onHideOnChange", _onHideOnChange);
		setNamespacedAttribute(request, "onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onPreventOverlapChange", _onPreventOverlapChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onShimChange", _onShimChange);
		setNamespacedAttribute(request, "onShowArrowChange", _onShowArrowChange);
		setNamespacedAttribute(request, "onShowDelayChange", _onShowDelayChange);
		setNamespacedAttribute(request, "onShowOnChange", _onShowOnChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStackChange", _onStackChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTriggerChange", _onTriggerChange);
		setNamespacedAttribute(request, "onUseARIAChange", _onUseARIAChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
		setNamespacedAttribute(request, "onXChange", _onXChange);
		setNamespacedAttribute(request, "onXyChange", _onXyChange);
		setNamespacedAttribute(request, "onYChange", _onYChange);
		setNamespacedAttribute(request, "onZIndexChange", _onZIndexChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:overlay-context-panel:";

	private static final String _PAGE =
		"/html/taglib/alloy/overlay_context_panel/page.jsp";

	private java.lang.Object _align = null;
	private java.lang.Object _alignOn = null;
	private java.lang.Object _anim = null;
	private java.lang.String _arrow = null;
	private java.lang.Object _overlaycontextpanelBodyContent = null;
	private java.lang.String _boundingBox = null;
	private boolean _cancellableHide = true;
	private java.lang.Object _centered = null;
	private java.lang.Object _constrain = null;
	private java.lang.String _contentBox = null;
	private java.lang.String _cssClass = null;
	private java.lang.Object _currentNode = null;
	private boolean _destroyed = false;
	private boolean _disabled = false;
	private java.lang.Object _fillHeight = null;
	private boolean _focused = false;
	private java.lang.Object _footerContent = null;
	private java.lang.Object _headerContent = null;
	private java.lang.Object _height = null;
	private java.lang.String _hideClass = "aui-helper-hidden";
	private java.lang.Object _hideDelay = 0;
	private java.lang.String _hideOn = "click";
	private boolean _hideOnDocumentClick = true;
	private java.lang.String _overlaycontextpanelId = null;
	private boolean _initialized = false;
	private boolean _preventOverlap = false;
	private java.lang.Object _render = null;
	private boolean _rendered = false;
	private boolean _shim = false;
	private boolean _showArrow = true;
	private java.lang.Object _showDelay = 0;
	private java.lang.String _showOn = "click";
	private java.lang.String _srcNode = null;
	private boolean _stack = true;
	private java.lang.Object _strings = null;
	private java.lang.Object _tabIndex = 0;
	private java.lang.Object _trigger = null;
	private boolean _useARIA = true;
	private boolean _visible = false;
	private java.lang.Object _width = null;
	private java.lang.Object _x = 0;
	private java.lang.Object _xy = null;
	private java.lang.Object _y = 0;
	private java.lang.Object _zIndex = 0;
	private java.lang.Object _afterAlignChange = null;
	private java.lang.Object _afterAlignOnChange = null;
	private java.lang.Object _afterAnimChange = null;
	private java.lang.Object _afterArrowChange = null;
	private java.lang.Object _afterBodyContentChange = null;
	private java.lang.Object _afterBoundingBoxChange = null;
	private java.lang.Object _afterCancellableHideChange = null;
	private java.lang.Object _afterCenteredChange = null;
	private java.lang.Object _afterConstrainChange = null;
	private java.lang.Object _afterContentBoxChange = null;
	private java.lang.Object _afterCssClassChange = null;
	private java.lang.Object _afterCurrentNodeChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDisabledChange = null;
	private java.lang.Object _afterFillHeightChange = null;
	private java.lang.Object _afterFocusedChange = null;
	private java.lang.Object _afterFooterContentChange = null;
	private java.lang.Object _afterHeaderContentChange = null;
	private java.lang.Object _afterHeightChange = null;
	private java.lang.Object _afterHideClassChange = null;
	private java.lang.Object _afterHideDelayChange = null;
	private java.lang.Object _afterHideOnChange = null;
	private java.lang.Object _afterHideOnDocumentClickChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterPreventOverlapChange = null;
	private java.lang.Object _afterRenderChange = null;
	private java.lang.Object _afterRenderedChange = null;
	private java.lang.Object _afterShimChange = null;
	private java.lang.Object _afterShowArrowChange = null;
	private java.lang.Object _afterShowDelayChange = null;
	private java.lang.Object _afterShowOnChange = null;
	private java.lang.Object _afterSrcNodeChange = null;
	private java.lang.Object _afterStackChange = null;
	private java.lang.Object _afterStringsChange = null;
	private java.lang.Object _afterTabIndexChange = null;
	private java.lang.Object _afterTriggerChange = null;
	private java.lang.Object _afterUseARIAChange = null;
	private java.lang.Object _afterVisibleChange = null;
	private java.lang.Object _afterContentUpdate = null;
	private java.lang.Object _afterRender = null;
	private java.lang.Object _afterWidthChange = null;
	private java.lang.Object _afterXChange = null;
	private java.lang.Object _afterXyChange = null;
	private java.lang.Object _afterYChange = null;
	private java.lang.Object _afterZIndexChange = null;
	private java.lang.Object _onAlignChange = null;
	private java.lang.Object _onAlignOnChange = null;
	private java.lang.Object _onAnimChange = null;
	private java.lang.Object _onArrowChange = null;
	private java.lang.Object _onBodyContentChange = null;
	private java.lang.Object _onBoundingBoxChange = null;
	private java.lang.Object _onCancellableHideChange = null;
	private java.lang.Object _onCenteredChange = null;
	private java.lang.Object _onConstrainChange = null;
	private java.lang.Object _onContentBoxChange = null;
	private java.lang.Object _onCssClassChange = null;
	private java.lang.Object _onCurrentNodeChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDisabledChange = null;
	private java.lang.Object _onFillHeightChange = null;
	private java.lang.Object _onFocusedChange = null;
	private java.lang.Object _onFooterContentChange = null;
	private java.lang.Object _onHeaderContentChange = null;
	private java.lang.Object _onHeightChange = null;
	private java.lang.Object _onHideClassChange = null;
	private java.lang.Object _onHideDelayChange = null;
	private java.lang.Object _onHideOnChange = null;
	private java.lang.Object _onHideOnDocumentClickChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onPreventOverlapChange = null;
	private java.lang.Object _onRenderChange = null;
	private java.lang.Object _onRenderedChange = null;
	private java.lang.Object _onShimChange = null;
	private java.lang.Object _onShowArrowChange = null;
	private java.lang.Object _onShowDelayChange = null;
	private java.lang.Object _onShowOnChange = null;
	private java.lang.Object _onSrcNodeChange = null;
	private java.lang.Object _onStackChange = null;
	private java.lang.Object _onStringsChange = null;
	private java.lang.Object _onTabIndexChange = null;
	private java.lang.Object _onTriggerChange = null;
	private java.lang.Object _onUseARIAChange = null;
	private java.lang.Object _onVisibleChange = null;
	private java.lang.Object _onContentUpdate = null;
	private java.lang.Object _onRender = null;
	private java.lang.Object _onWidthChange = null;
	private java.lang.Object _onXChange = null;
	private java.lang.Object _onXyChange = null;
	private java.lang.Object _onYChange = null;
	private java.lang.Object _onZIndexChange = null;

}