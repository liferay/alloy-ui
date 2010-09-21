package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseOverlayMaskTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseOverlayMaskTag extends com.liferay.alloy.taglib.alloy_util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Object getAlign() {
		return _align;
	}

	public java.lang.Object getAlignPoints() {
		return _alignPoints;
	}

	public java.lang.String getBackground() {
		return _background;
	}

	public java.lang.Object getOverlaymaskBodyContent() {
		return _overlaymaskBodyContent;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
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

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Boolean getDisabled() {
		return _disabled;
	}

	public java.lang.Object getFillHeight() {
		return _fillHeight;
	}

	public java.lang.Boolean getFocused() {
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

	public java.lang.String getOverlaymaskId() {
		return _overlaymaskId;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getOpacity() {
		return _opacity;
	}

	public java.lang.Boolean getPreventOverlap() {
		return _preventOverlap;
	}

	public java.lang.Object getRender() {
		return _render;
	}

	public java.lang.Boolean getRendered() {
		return _rendered;
	}

	public java.lang.Boolean getShim() {
		return _shim;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Object getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getTarget() {
		return _target;
	}

	public java.lang.Boolean getVisible() {
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

	public java.lang.Object getAfterAlignPointsChange() {
		return _afterAlignPointsChange;
	}

	public java.lang.Object getAfterBackgroundChange() {
		return _afterBackgroundChange;
	}

	public java.lang.Object getAfterBodyContentChange() {
		return _afterBodyContentChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
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

	public java.lang.Object getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterOpacityChange() {
		return _afterOpacityChange;
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

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.Object getAfterTargetChange() {
		return _afterTargetChange;
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

	public java.lang.Object getOnAlignPointsChange() {
		return _onAlignPointsChange;
	}

	public java.lang.Object getOnBackgroundChange() {
		return _onBackgroundChange;
	}

	public java.lang.Object getOnBodyContentChange() {
		return _onBodyContentChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
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

	public java.lang.Object getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnOpacityChange() {
		return _onOpacityChange;
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

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.Object getOnTargetChange() {
		return _onTargetChange;
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

	public void setAlignPoints(java.lang.Object alignPoints) {
		_alignPoints = alignPoints;

		setScopedAttribute("alignPoints", alignPoints);
	}

	public void setBackground(java.lang.String background) {
		_background = background;

		setScopedAttribute("background", background);
	}

	public void setOverlaymaskBodyContent(java.lang.Object overlaymaskBodyContent) {
		_overlaymaskBodyContent = overlaymaskBodyContent;

		setScopedAttribute("overlaymaskBodyContent", overlaymaskBodyContent);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
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

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.Boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFillHeight(java.lang.Object fillHeight) {
		_fillHeight = fillHeight;

		setScopedAttribute("fillHeight", fillHeight);
	}

	public void setFocused(java.lang.Boolean focused) {
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

	public void setOverlaymaskId(java.lang.String overlaymaskId) {
		_overlaymaskId = overlaymaskId;

		setScopedAttribute("overlaymaskId", overlaymaskId);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setOpacity(java.lang.Object opacity) {
		_opacity = opacity;

		setScopedAttribute("opacity", opacity);
	}

	public void setPreventOverlap(java.lang.Boolean preventOverlap) {
		_preventOverlap = preventOverlap;

		setScopedAttribute("preventOverlap", preventOverlap);
	}

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.Boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setShim(java.lang.Boolean shim) {
		_shim = shim;

		setScopedAttribute("shim", shim);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.Object tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTarget(java.lang.String target) {
		_target = target;

		setScopedAttribute("target", target);
	}

	public void setVisible(java.lang.Boolean visible) {
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

	public void setAfterAlignPointsChange(java.lang.Object afterAlignPointsChange) {
		_afterAlignPointsChange = afterAlignPointsChange;

		setScopedAttribute("afterAlignPointsChange", afterAlignPointsChange);
	}

	public void setAfterBackgroundChange(java.lang.Object afterBackgroundChange) {
		_afterBackgroundChange = afterBackgroundChange;

		setScopedAttribute("afterBackgroundChange", afterBackgroundChange);
	}

	public void setAfterBodyContentChange(java.lang.Object afterBodyContentChange) {
		_afterBodyContentChange = afterBodyContentChange;

		setScopedAttribute("afterBodyContentChange", afterBodyContentChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
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

	public void setAfterOpacityChange(java.lang.Object afterOpacityChange) {
		_afterOpacityChange = afterOpacityChange;

		setScopedAttribute("afterOpacityChange", afterOpacityChange);
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

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTargetChange(java.lang.Object afterTargetChange) {
		_afterTargetChange = afterTargetChange;

		setScopedAttribute("afterTargetChange", afterTargetChange);
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

	public void setOnAlignPointsChange(java.lang.Object onAlignPointsChange) {
		_onAlignPointsChange = onAlignPointsChange;

		setScopedAttribute("onAlignPointsChange", onAlignPointsChange);
	}

	public void setOnBackgroundChange(java.lang.Object onBackgroundChange) {
		_onBackgroundChange = onBackgroundChange;

		setScopedAttribute("onBackgroundChange", onBackgroundChange);
	}

	public void setOnBodyContentChange(java.lang.Object onBodyContentChange) {
		_onBodyContentChange = onBodyContentChange;

		setScopedAttribute("onBodyContentChange", onBodyContentChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
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

	public void setOnOpacityChange(java.lang.Object onOpacityChange) {
		_onOpacityChange = onOpacityChange;

		setScopedAttribute("onOpacityChange", onOpacityChange);
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

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTargetChange(java.lang.Object onTargetChange) {
		_onTargetChange = onTargetChange;

		setScopedAttribute("onTargetChange", onTargetChange);
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

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "align", _align);
		setNamespacedAttribute(request, "alignPoints", _alignPoints);
		setNamespacedAttribute(request, "background", _background);
		setNamespacedAttribute(request, "overlaymaskBodyContent", _overlaymaskBodyContent);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "centered", _centered);
		setNamespacedAttribute(request, "constrain", _constrain);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "fillHeight", _fillHeight);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "footerContent", _footerContent);
		setNamespacedAttribute(request, "headerContent", _headerContent);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "overlaymaskId", _overlaymaskId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "opacity", _opacity);
		setNamespacedAttribute(request, "preventOverlap", _preventOverlap);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "shim", _shim);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "target", _target);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "x", _x);
		setNamespacedAttribute(request, "xy", _xy);
		setNamespacedAttribute(request, "y", _y);
		setNamespacedAttribute(request, "zIndex", _zIndex);
		setNamespacedAttribute(request, "afterAlignChange", _afterAlignChange);
		setNamespacedAttribute(request, "afterAlignPointsChange", _afterAlignPointsChange);
		setNamespacedAttribute(request, "afterBackgroundChange", _afterBackgroundChange);
		setNamespacedAttribute(request, "afterBodyContentChange", _afterBodyContentChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCenteredChange", _afterCenteredChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFillHeightChange", _afterFillHeightChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterFooterContentChange", _afterFooterContentChange);
		setNamespacedAttribute(request, "afterHeaderContentChange", _afterHeaderContentChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterOpacityChange", _afterOpacityChange);
		setNamespacedAttribute(request, "afterPreventOverlapChange", _afterPreventOverlapChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterShimChange", _afterShimChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTargetChange", _afterTargetChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "afterXChange", _afterXChange);
		setNamespacedAttribute(request, "afterXyChange", _afterXyChange);
		setNamespacedAttribute(request, "afterYChange", _afterYChange);
		setNamespacedAttribute(request, "afterZIndexChange", _afterZIndexChange);
		setNamespacedAttribute(request, "onAlignChange", _onAlignChange);
		setNamespacedAttribute(request, "onAlignPointsChange", _onAlignPointsChange);
		setNamespacedAttribute(request, "onBackgroundChange", _onBackgroundChange);
		setNamespacedAttribute(request, "onBodyContentChange", _onBodyContentChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCenteredChange", _onCenteredChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFillHeightChange", _onFillHeightChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onFooterContentChange", _onFooterContentChange);
		setNamespacedAttribute(request, "onHeaderContentChange", _onHeaderContentChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onOpacityChange", _onOpacityChange);
		setNamespacedAttribute(request, "onPreventOverlapChange", _onPreventOverlapChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onShimChange", _onShimChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTargetChange", _onTargetChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
		setNamespacedAttribute(request, "onXChange", _onXChange);
		setNamespacedAttribute(request, "onXyChange", _onXyChange);
		setNamespacedAttribute(request, "onYChange", _onYChange);
		setNamespacedAttribute(request, "onZIndexChange", _onZIndexChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:overlay-mask:";

	private static final String _PAGE =
		"/html/taglib/alloy/overlay_mask/page.jsp";

	private java.lang.Object _align;
	private java.lang.Object _alignPoints;
	private java.lang.String _background;
	private java.lang.Object _overlaymaskBodyContent;
	private java.lang.String _boundingBox;
	private java.lang.Object _centered;
	private java.lang.Object _constrain;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _disabled;
	private java.lang.Object _fillHeight;
	private java.lang.Boolean _focused;
	private java.lang.Object _footerContent;
	private java.lang.Object _headerContent;
	private java.lang.Object _height;
	private java.lang.String _hideClass;
	private java.lang.String _overlaymaskId;
	private java.lang.Boolean _initialized;
	private java.lang.Object _opacity;
	private java.lang.Boolean _preventOverlap;
	private java.lang.Object _render;
	private java.lang.Boolean _rendered;
	private java.lang.Boolean _shim;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.Object _tabIndex;
	private java.lang.String _target;
	private java.lang.Boolean _visible;
	private java.lang.Object _width;
	private java.lang.Object _x;
	private java.lang.Object _xy;
	private java.lang.Object _y;
	private java.lang.Object _zIndex;
	private java.lang.Object _afterAlignChange;
	private java.lang.Object _afterAlignPointsChange;
	private java.lang.Object _afterBackgroundChange;
	private java.lang.Object _afterBodyContentChange;
	private java.lang.Object _afterBoundingBoxChange;
	private java.lang.Object _afterCenteredChange;
	private java.lang.Object _afterConstrainChange;
	private java.lang.Object _afterContentBoxChange;
	private java.lang.Object _afterCssClassChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterDisabledChange;
	private java.lang.Object _afterFillHeightChange;
	private java.lang.Object _afterFocusedChange;
	private java.lang.Object _afterFooterContentChange;
	private java.lang.Object _afterHeaderContentChange;
	private java.lang.Object _afterHeightChange;
	private java.lang.Object _afterHideClassChange;
	private java.lang.Object _afterIdChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterOpacityChange;
	private java.lang.Object _afterPreventOverlapChange;
	private java.lang.Object _afterRenderChange;
	private java.lang.Object _afterRenderedChange;
	private java.lang.Object _afterShimChange;
	private java.lang.Object _afterSrcNodeChange;
	private java.lang.Object _afterStringsChange;
	private java.lang.Object _afterTabIndexChange;
	private java.lang.Object _afterTargetChange;
	private java.lang.Object _afterVisibleChange;
	private java.lang.Object _afterContentUpdate;
	private java.lang.Object _afterRender;
	private java.lang.Object _afterWidthChange;
	private java.lang.Object _afterXChange;
	private java.lang.Object _afterXyChange;
	private java.lang.Object _afterYChange;
	private java.lang.Object _afterZIndexChange;
	private java.lang.Object _onAlignChange;
	private java.lang.Object _onAlignPointsChange;
	private java.lang.Object _onBackgroundChange;
	private java.lang.Object _onBodyContentChange;
	private java.lang.Object _onBoundingBoxChange;
	private java.lang.Object _onCenteredChange;
	private java.lang.Object _onConstrainChange;
	private java.lang.Object _onContentBoxChange;
	private java.lang.Object _onCssClassChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onDisabledChange;
	private java.lang.Object _onFillHeightChange;
	private java.lang.Object _onFocusedChange;
	private java.lang.Object _onFooterContentChange;
	private java.lang.Object _onHeaderContentChange;
	private java.lang.Object _onHeightChange;
	private java.lang.Object _onHideClassChange;
	private java.lang.Object _onIdChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onOpacityChange;
	private java.lang.Object _onPreventOverlapChange;
	private java.lang.Object _onRenderChange;
	private java.lang.Object _onRenderedChange;
	private java.lang.Object _onShimChange;
	private java.lang.Object _onSrcNodeChange;
	private java.lang.Object _onStringsChange;
	private java.lang.Object _onTabIndexChange;
	private java.lang.Object _onTargetChange;
	private java.lang.Object _onVisibleChange;
	private java.lang.Object _onContentUpdate;
	private java.lang.Object _onRender;
	private java.lang.Object _onWidthChange;
	private java.lang.Object _onXChange;
	private java.lang.Object _onXyChange;
	private java.lang.Object _onYChange;
	private java.lang.Object _onZIndexChange;

}
