package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseImageGalleryTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseImageGalleryTag extends IncludeTag {

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

	public java.lang.String getAnim() {
		return _anim;
	}

	public java.lang.Object getArrowLeftEl() {
		return _arrowLeftEl;
	}

	public java.lang.Object getArrowRightEl() {
		return _arrowRightEl;
	}

	public java.lang.String getAutoPlay() {
		return _autoPlay;
	}

	public java.lang.Object getImagegalleryBodyContent() {
		return _imagegalleryBodyContent;
	}

	public java.lang.Object getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.Object getCaption() {
		return _caption;
	}

	public java.lang.Object getCaptionEl() {
		return _captionEl;
	}

	public java.lang.String getCaptionFromTitle() {
		return _captionFromTitle;
	}

	public java.lang.String getCentered() {
		return _centered;
	}

	public java.lang.Object getCloseEl() {
		return _closeEl;
	}

	public java.lang.Object getConstrain() {
		return _constrain;
	}

	public java.lang.Object getContentBox() {
		return _contentBox;
	}

	public java.lang.Object getCssClass() {
		return _cssClass;
	}

	public java.lang.String getCurrentIndex() {
		return _currentIndex;
	}

	public java.lang.String getDelay() {
		return _delay;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public java.lang.Object getFillHeight() {
		return _fillHeight;
	}

	public java.lang.String getFocused() {
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

	public java.lang.Object getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getImagegalleryId() {
		return _imagegalleryId;
	}

	public java.lang.Object getImage() {
		return _image;
	}

	public java.lang.Object getImageAnim() {
		return _imageAnim;
	}

	public java.lang.Object getInfoEl() {
		return _infoEl;
	}

	public java.lang.Object getInfoTemplate() {
		return _infoTemplate;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.Object getLinks() {
		return _links;
	}

	public java.lang.Object getLoader() {
		return _loader;
	}

	public java.lang.String getLoading() {
		return _loading;
	}

	public java.lang.Object getLoadingEl() {
		return _loadingEl;
	}

	public java.lang.String getMaxHeight() {
		return _maxHeight;
	}

	public java.lang.String getMaxWidth() {
		return _maxWidth;
	}

	public java.lang.Object getModal() {
		return _modal;
	}

	public java.lang.Object getPaginator() {
		return _paginator;
	}

	public java.lang.Object getPaginatorEl() {
		return _paginatorEl;
	}

	public java.lang.Object getPaginatorInstance() {
		return _paginatorInstance;
	}

	public java.lang.String getPaused() {
		return _paused;
	}

	public java.lang.Object getPausedLabel() {
		return _pausedLabel;
	}

	public java.lang.String getPlaying() {
		return _playing;
	}

	public java.lang.Object getPlayingLabel() {
		return _playingLabel;
	}

	public java.lang.String getPreloadAllImages() {
		return _preloadAllImages;
	}

	public java.lang.String getPreventOverlap() {
		return _preventOverlap;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.String getRepeat() {
		return _repeat;
	}

	public java.lang.String getShim() {
		return _shim;
	}

	public java.lang.String getShowArrows() {
		return _showArrows;
	}

	public java.lang.String getShowClose() {
		return _showClose;
	}

	public java.lang.String getShowPlayer() {
		return _showPlayer;
	}

	public java.lang.Object getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.String getTabIndex() {
		return _tabIndex;
	}

	public java.lang.Object getToolbar() {
		return _toolbar;
	}

	public java.lang.String getTotalLinks() {
		return _totalLinks;
	}

	public java.lang.String getUseOriginalImage() {
		return _useOriginalImage;
	}

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.String getX() {
		return _x;
	}

	public java.lang.Object getXy() {
		return _xy;
	}

	public java.lang.String getY() {
		return _y;
	}

	public java.lang.String getZIndex() {
		return _zIndex;
	}

	public java.lang.Object getAfterAlignChange() {
		return _afterAlignChange;
	}

	public java.lang.Object getAfterAnim() {
		return _afterAnim;
	}

	public java.lang.Object getAfterAnimChange() {
		return _afterAnimChange;
	}

	public java.lang.Object getAfterArrowLeftElChange() {
		return _afterArrowLeftElChange;
	}

	public java.lang.Object getAfterArrowRightElChange() {
		return _afterArrowRightElChange;
	}

	public java.lang.Object getAfterAutoPlayChange() {
		return _afterAutoPlayChange;
	}

	public java.lang.Object getAfterBodyContentChange() {
		return _afterBodyContentChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCaptionChange() {
		return _afterCaptionChange;
	}

	public java.lang.Object getAfterCaptionElChange() {
		return _afterCaptionElChange;
	}

	public java.lang.Object getAfterCaptionFromTitleChange() {
		return _afterCaptionFromTitleChange;
	}

	public java.lang.Object getAfterCenteredChange() {
		return _afterCenteredChange;
	}

	public java.lang.Object getAfterCloseElChange() {
		return _afterCloseElChange;
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

	public java.lang.Object getAfterCurrentIndexChange() {
		return _afterCurrentIndexChange;
	}

	public java.lang.Object getAfterDelayChange() {
		return _afterDelayChange;
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

	public java.lang.Object getAfterImageAnimChange() {
		return _afterImageAnimChange;
	}

	public java.lang.Object getAfterImageChange() {
		return _afterImageChange;
	}

	public java.lang.Object getAfterInfoElChange() {
		return _afterInfoElChange;
	}

	public java.lang.Object getAfterInfoTemplateChange() {
		return _afterInfoTemplateChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterLinksChange() {
		return _afterLinksChange;
	}

	public java.lang.Object getAfterLoad() {
		return _afterLoad;
	}

	public java.lang.Object getAfterLoaderChange() {
		return _afterLoaderChange;
	}

	public java.lang.Object getAfterLoadingChange() {
		return _afterLoadingChange;
	}

	public java.lang.Object getAfterLoadingElChange() {
		return _afterLoadingElChange;
	}

	public java.lang.Object getAfterMaxHeightChange() {
		return _afterMaxHeightChange;
	}

	public java.lang.Object getAfterMaxWidthChange() {
		return _afterMaxWidthChange;
	}

	public java.lang.Object getAfterModalChange() {
		return _afterModalChange;
	}

	public java.lang.Object getAfterPaginatorChange() {
		return _afterPaginatorChange;
	}

	public java.lang.Object getAfterPaginatorElChange() {
		return _afterPaginatorElChange;
	}

	public java.lang.Object getAfterPaginatorInstanceChange() {
		return _afterPaginatorInstanceChange;
	}

	public java.lang.Object getAfterPausedChange() {
		return _afterPausedChange;
	}

	public java.lang.Object getAfterPausedLabelChange() {
		return _afterPausedLabelChange;
	}

	public java.lang.Object getAfterPlayingChange() {
		return _afterPlayingChange;
	}

	public java.lang.Object getAfterPlayingLabelChange() {
		return _afterPlayingLabelChange;
	}

	public java.lang.Object getAfterPreloadAllImagesChange() {
		return _afterPreloadAllImagesChange;
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

	public java.lang.Object getAfterRepeatChange() {
		return _afterRepeatChange;
	}

	public java.lang.Object getAfterRequest() {
		return _afterRequest;
	}

	public java.lang.Object getAfterShimChange() {
		return _afterShimChange;
	}

	public java.lang.Object getAfterShowArrowsChange() {
		return _afterShowArrowsChange;
	}

	public java.lang.Object getAfterShowCloseChange() {
		return _afterShowCloseChange;
	}

	public java.lang.Object getAfterShowPlayerChange() {
		return _afterShowPlayerChange;
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

	public java.lang.Object getAfterToolbarChange() {
		return _afterToolbarChange;
	}

	public java.lang.Object getAfterTotalLinksChange() {
		return _afterTotalLinksChange;
	}

	public java.lang.Object getAfterUseOriginalImageChange() {
		return _afterUseOriginalImageChange;
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

	public java.lang.Object getOnAnim() {
		return _onAnim;
	}

	public java.lang.Object getOnAnimChange() {
		return _onAnimChange;
	}

	public java.lang.Object getOnArrowLeftElChange() {
		return _onArrowLeftElChange;
	}

	public java.lang.Object getOnArrowRightElChange() {
		return _onArrowRightElChange;
	}

	public java.lang.Object getOnAutoPlayChange() {
		return _onAutoPlayChange;
	}

	public java.lang.Object getOnBodyContentChange() {
		return _onBodyContentChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnCaptionChange() {
		return _onCaptionChange;
	}

	public java.lang.Object getOnCaptionElChange() {
		return _onCaptionElChange;
	}

	public java.lang.Object getOnCaptionFromTitleChange() {
		return _onCaptionFromTitleChange;
	}

	public java.lang.Object getOnCenteredChange() {
		return _onCenteredChange;
	}

	public java.lang.Object getOnCloseElChange() {
		return _onCloseElChange;
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

	public java.lang.Object getOnCurrentIndexChange() {
		return _onCurrentIndexChange;
	}

	public java.lang.Object getOnDelayChange() {
		return _onDelayChange;
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

	public java.lang.Object getOnImageAnimChange() {
		return _onImageAnimChange;
	}

	public java.lang.Object getOnImageChange() {
		return _onImageChange;
	}

	public java.lang.Object getOnInfoElChange() {
		return _onInfoElChange;
	}

	public java.lang.Object getOnInfoTemplateChange() {
		return _onInfoTemplateChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnLinksChange() {
		return _onLinksChange;
	}

	public java.lang.Object getOnLoad() {
		return _onLoad;
	}

	public java.lang.Object getOnLoaderChange() {
		return _onLoaderChange;
	}

	public java.lang.Object getOnLoadingChange() {
		return _onLoadingChange;
	}

	public java.lang.Object getOnLoadingElChange() {
		return _onLoadingElChange;
	}

	public java.lang.Object getOnMaxHeightChange() {
		return _onMaxHeightChange;
	}

	public java.lang.Object getOnMaxWidthChange() {
		return _onMaxWidthChange;
	}

	public java.lang.Object getOnModalChange() {
		return _onModalChange;
	}

	public java.lang.Object getOnPaginatorChange() {
		return _onPaginatorChange;
	}

	public java.lang.Object getOnPaginatorElChange() {
		return _onPaginatorElChange;
	}

	public java.lang.Object getOnPaginatorInstanceChange() {
		return _onPaginatorInstanceChange;
	}

	public java.lang.Object getOnPausedChange() {
		return _onPausedChange;
	}

	public java.lang.Object getOnPausedLabelChange() {
		return _onPausedLabelChange;
	}

	public java.lang.Object getOnPlayingChange() {
		return _onPlayingChange;
	}

	public java.lang.Object getOnPlayingLabelChange() {
		return _onPlayingLabelChange;
	}

	public java.lang.Object getOnPreloadAllImagesChange() {
		return _onPreloadAllImagesChange;
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

	public java.lang.Object getOnRepeatChange() {
		return _onRepeatChange;
	}

	public java.lang.Object getOnRequest() {
		return _onRequest;
	}

	public java.lang.Object getOnShimChange() {
		return _onShimChange;
	}

	public java.lang.Object getOnShowArrowsChange() {
		return _onShowArrowsChange;
	}

	public java.lang.Object getOnShowCloseChange() {
		return _onShowCloseChange;
	}

	public java.lang.Object getOnShowPlayerChange() {
		return _onShowPlayerChange;
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

	public java.lang.Object getOnToolbarChange() {
		return _onToolbarChange;
	}

	public java.lang.Object getOnTotalLinksChange() {
		return _onTotalLinksChange;
	}

	public java.lang.Object getOnUseOriginalImageChange() {
		return _onUseOriginalImageChange;
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

	public void setAnim(java.lang.String anim) {
		_anim = anim;

		setScopedAttribute("anim", anim);
	}

	public void setArrowLeftEl(java.lang.Object arrowLeftEl) {
		_arrowLeftEl = arrowLeftEl;

		setScopedAttribute("arrowLeftEl", arrowLeftEl);
	}

	public void setArrowRightEl(java.lang.Object arrowRightEl) {
		_arrowRightEl = arrowRightEl;

		setScopedAttribute("arrowRightEl", arrowRightEl);
	}

	public void setAutoPlay(java.lang.String autoPlay) {
		_autoPlay = autoPlay;

		setScopedAttribute("autoPlay", autoPlay);
	}

	public void setImagegalleryBodyContent(java.lang.Object imagegalleryBodyContent) {
		_imagegalleryBodyContent = imagegalleryBodyContent;

		setScopedAttribute("imagegalleryBodyContent", imagegalleryBodyContent);
	}

	public void setBoundingBox(java.lang.Object boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCaption(java.lang.Object caption) {
		_caption = caption;

		setScopedAttribute("caption", caption);
	}

	public void setCaptionEl(java.lang.Object captionEl) {
		_captionEl = captionEl;

		setScopedAttribute("captionEl", captionEl);
	}

	public void setCaptionFromTitle(java.lang.String captionFromTitle) {
		_captionFromTitle = captionFromTitle;

		setScopedAttribute("captionFromTitle", captionFromTitle);
	}

	public void setCentered(java.lang.String centered) {
		_centered = centered;

		setScopedAttribute("centered", centered);
	}

	public void setCloseEl(java.lang.Object closeEl) {
		_closeEl = closeEl;

		setScopedAttribute("closeEl", closeEl);
	}

	public void setConstrain(java.lang.Object constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setContentBox(java.lang.Object contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.Object cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setCurrentIndex(java.lang.String currentIndex) {
		_currentIndex = currentIndex;

		setScopedAttribute("currentIndex", currentIndex);
	}

	public void setDelay(java.lang.String delay) {
		_delay = delay;

		setScopedAttribute("delay", delay);
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.String disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFillHeight(java.lang.Object fillHeight) {
		_fillHeight = fillHeight;

		setScopedAttribute("fillHeight", fillHeight);
	}

	public void setFocused(java.lang.String focused) {
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

	public void setHideClass(java.lang.Object hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setImagegalleryId(java.lang.Object imagegalleryId) {
		_imagegalleryId = imagegalleryId;

		setScopedAttribute("imagegalleryId", imagegalleryId);
	}

	public void setImage(java.lang.Object image) {
		_image = image;

		setScopedAttribute("image", image);
	}

	public void setImageAnim(java.lang.Object imageAnim) {
		_imageAnim = imageAnim;

		setScopedAttribute("imageAnim", imageAnim);
	}

	public void setInfoEl(java.lang.Object infoEl) {
		_infoEl = infoEl;

		setScopedAttribute("infoEl", infoEl);
	}

	public void setInfoTemplate(java.lang.Object infoTemplate) {
		_infoTemplate = infoTemplate;

		setScopedAttribute("infoTemplate", infoTemplate);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setLinks(java.lang.Object links) {
		_links = links;

		setScopedAttribute("links", links);
	}

	public void setLoader(java.lang.Object loader) {
		_loader = loader;

		setScopedAttribute("loader", loader);
	}

	public void setLoading(java.lang.String loading) {
		_loading = loading;

		setScopedAttribute("loading", loading);
	}

	public void setLoadingEl(java.lang.Object loadingEl) {
		_loadingEl = loadingEl;

		setScopedAttribute("loadingEl", loadingEl);
	}

	public void setMaxHeight(java.lang.String maxHeight) {
		_maxHeight = maxHeight;

		setScopedAttribute("maxHeight", maxHeight);
	}

	public void setMaxWidth(java.lang.String maxWidth) {
		_maxWidth = maxWidth;

		setScopedAttribute("maxWidth", maxWidth);
	}

	public void setModal(java.lang.Object modal) {
		_modal = modal;

		setScopedAttribute("modal", modal);
	}

	public void setPaginator(java.lang.Object paginator) {
		_paginator = paginator;

		setScopedAttribute("paginator", paginator);
	}

	public void setPaginatorEl(java.lang.Object paginatorEl) {
		_paginatorEl = paginatorEl;

		setScopedAttribute("paginatorEl", paginatorEl);
	}

	public void setPaginatorInstance(java.lang.Object paginatorInstance) {
		_paginatorInstance = paginatorInstance;

		setScopedAttribute("paginatorInstance", paginatorInstance);
	}

	public void setPaused(java.lang.String paused) {
		_paused = paused;

		setScopedAttribute("paused", paused);
	}

	public void setPausedLabel(java.lang.Object pausedLabel) {
		_pausedLabel = pausedLabel;

		setScopedAttribute("pausedLabel", pausedLabel);
	}

	public void setPlaying(java.lang.String playing) {
		_playing = playing;

		setScopedAttribute("playing", playing);
	}

	public void setPlayingLabel(java.lang.Object playingLabel) {
		_playingLabel = playingLabel;

		setScopedAttribute("playingLabel", playingLabel);
	}

	public void setPreloadAllImages(java.lang.String preloadAllImages) {
		_preloadAllImages = preloadAllImages;

		setScopedAttribute("preloadAllImages", preloadAllImages);
	}

	public void setPreventOverlap(java.lang.String preventOverlap) {
		_preventOverlap = preventOverlap;

		setScopedAttribute("preventOverlap", preventOverlap);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setRepeat(java.lang.String repeat) {
		_repeat = repeat;

		setScopedAttribute("repeat", repeat);
	}

	public void setShim(java.lang.String shim) {
		_shim = shim;

		setScopedAttribute("shim", shim);
	}

	public void setShowArrows(java.lang.String showArrows) {
		_showArrows = showArrows;

		setScopedAttribute("showArrows", showArrows);
	}

	public void setShowClose(java.lang.String showClose) {
		_showClose = showClose;

		setScopedAttribute("showClose", showClose);
	}

	public void setShowPlayer(java.lang.String showPlayer) {
		_showPlayer = showPlayer;

		setScopedAttribute("showPlayer", showPlayer);
	}

	public void setSrcNode(java.lang.Object srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.String tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setToolbar(java.lang.Object toolbar) {
		_toolbar = toolbar;

		setScopedAttribute("toolbar", toolbar);
	}

	public void setTotalLinks(java.lang.String totalLinks) {
		_totalLinks = totalLinks;

		setScopedAttribute("totalLinks", totalLinks);
	}

	public void setUseOriginalImage(java.lang.String useOriginalImage) {
		_useOriginalImage = useOriginalImage;

		setScopedAttribute("useOriginalImage", useOriginalImage);
	}

	public void setVisible(java.lang.String visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setX(java.lang.String x) {
		_x = x;

		setScopedAttribute("x", x);
	}

	public void setXy(java.lang.Object xy) {
		_xy = xy;

		setScopedAttribute("xy", xy);
	}

	public void setY(java.lang.String y) {
		_y = y;

		setScopedAttribute("y", y);
	}

	public void setZIndex(java.lang.String zIndex) {
		_zIndex = zIndex;

		setScopedAttribute("zIndex", zIndex);
	}

	public void setAfterAlignChange(java.lang.Object afterAlignChange) {
		_afterAlignChange = afterAlignChange;

		setScopedAttribute("afterAlignChange", afterAlignChange);
	}

	public void setAfterAnim(java.lang.Object afterAnim) {
		_afterAnim = afterAnim;

		setScopedAttribute("afterAnim", afterAnim);
	}

	public void setAfterAnimChange(java.lang.Object afterAnimChange) {
		_afterAnimChange = afterAnimChange;

		setScopedAttribute("afterAnimChange", afterAnimChange);
	}

	public void setAfterArrowLeftElChange(java.lang.Object afterArrowLeftElChange) {
		_afterArrowLeftElChange = afterArrowLeftElChange;

		setScopedAttribute("afterArrowLeftElChange", afterArrowLeftElChange);
	}

	public void setAfterArrowRightElChange(java.lang.Object afterArrowRightElChange) {
		_afterArrowRightElChange = afterArrowRightElChange;

		setScopedAttribute("afterArrowRightElChange", afterArrowRightElChange);
	}

	public void setAfterAutoPlayChange(java.lang.Object afterAutoPlayChange) {
		_afterAutoPlayChange = afterAutoPlayChange;

		setScopedAttribute("afterAutoPlayChange", afterAutoPlayChange);
	}

	public void setAfterBodyContentChange(java.lang.Object afterBodyContentChange) {
		_afterBodyContentChange = afterBodyContentChange;

		setScopedAttribute("afterBodyContentChange", afterBodyContentChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterCaptionChange(java.lang.Object afterCaptionChange) {
		_afterCaptionChange = afterCaptionChange;

		setScopedAttribute("afterCaptionChange", afterCaptionChange);
	}

	public void setAfterCaptionElChange(java.lang.Object afterCaptionElChange) {
		_afterCaptionElChange = afterCaptionElChange;

		setScopedAttribute("afterCaptionElChange", afterCaptionElChange);
	}

	public void setAfterCaptionFromTitleChange(java.lang.Object afterCaptionFromTitleChange) {
		_afterCaptionFromTitleChange = afterCaptionFromTitleChange;

		setScopedAttribute("afterCaptionFromTitleChange", afterCaptionFromTitleChange);
	}

	public void setAfterCenteredChange(java.lang.Object afterCenteredChange) {
		_afterCenteredChange = afterCenteredChange;

		setScopedAttribute("afterCenteredChange", afterCenteredChange);
	}

	public void setAfterCloseElChange(java.lang.Object afterCloseElChange) {
		_afterCloseElChange = afterCloseElChange;

		setScopedAttribute("afterCloseElChange", afterCloseElChange);
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

	public void setAfterCurrentIndexChange(java.lang.Object afterCurrentIndexChange) {
		_afterCurrentIndexChange = afterCurrentIndexChange;

		setScopedAttribute("afterCurrentIndexChange", afterCurrentIndexChange);
	}

	public void setAfterDelayChange(java.lang.Object afterDelayChange) {
		_afterDelayChange = afterDelayChange;

		setScopedAttribute("afterDelayChange", afterDelayChange);
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

	public void setAfterImageAnimChange(java.lang.Object afterImageAnimChange) {
		_afterImageAnimChange = afterImageAnimChange;

		setScopedAttribute("afterImageAnimChange", afterImageAnimChange);
	}

	public void setAfterImageChange(java.lang.Object afterImageChange) {
		_afterImageChange = afterImageChange;

		setScopedAttribute("afterImageChange", afterImageChange);
	}

	public void setAfterInfoElChange(java.lang.Object afterInfoElChange) {
		_afterInfoElChange = afterInfoElChange;

		setScopedAttribute("afterInfoElChange", afterInfoElChange);
	}

	public void setAfterInfoTemplateChange(java.lang.Object afterInfoTemplateChange) {
		_afterInfoTemplateChange = afterInfoTemplateChange;

		setScopedAttribute("afterInfoTemplateChange", afterInfoTemplateChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterLinksChange(java.lang.Object afterLinksChange) {
		_afterLinksChange = afterLinksChange;

		setScopedAttribute("afterLinksChange", afterLinksChange);
	}

	public void setAfterLoad(java.lang.Object afterLoad) {
		_afterLoad = afterLoad;

		setScopedAttribute("afterLoad", afterLoad);
	}

	public void setAfterLoaderChange(java.lang.Object afterLoaderChange) {
		_afterLoaderChange = afterLoaderChange;

		setScopedAttribute("afterLoaderChange", afterLoaderChange);
	}

	public void setAfterLoadingChange(java.lang.Object afterLoadingChange) {
		_afterLoadingChange = afterLoadingChange;

		setScopedAttribute("afterLoadingChange", afterLoadingChange);
	}

	public void setAfterLoadingElChange(java.lang.Object afterLoadingElChange) {
		_afterLoadingElChange = afterLoadingElChange;

		setScopedAttribute("afterLoadingElChange", afterLoadingElChange);
	}

	public void setAfterMaxHeightChange(java.lang.Object afterMaxHeightChange) {
		_afterMaxHeightChange = afterMaxHeightChange;

		setScopedAttribute("afterMaxHeightChange", afterMaxHeightChange);
	}

	public void setAfterMaxWidthChange(java.lang.Object afterMaxWidthChange) {
		_afterMaxWidthChange = afterMaxWidthChange;

		setScopedAttribute("afterMaxWidthChange", afterMaxWidthChange);
	}

	public void setAfterModalChange(java.lang.Object afterModalChange) {
		_afterModalChange = afterModalChange;

		setScopedAttribute("afterModalChange", afterModalChange);
	}

	public void setAfterPaginatorChange(java.lang.Object afterPaginatorChange) {
		_afterPaginatorChange = afterPaginatorChange;

		setScopedAttribute("afterPaginatorChange", afterPaginatorChange);
	}

	public void setAfterPaginatorElChange(java.lang.Object afterPaginatorElChange) {
		_afterPaginatorElChange = afterPaginatorElChange;

		setScopedAttribute("afterPaginatorElChange", afterPaginatorElChange);
	}

	public void setAfterPaginatorInstanceChange(java.lang.Object afterPaginatorInstanceChange) {
		_afterPaginatorInstanceChange = afterPaginatorInstanceChange;

		setScopedAttribute("afterPaginatorInstanceChange", afterPaginatorInstanceChange);
	}

	public void setAfterPausedChange(java.lang.Object afterPausedChange) {
		_afterPausedChange = afterPausedChange;

		setScopedAttribute("afterPausedChange", afterPausedChange);
	}

	public void setAfterPausedLabelChange(java.lang.Object afterPausedLabelChange) {
		_afterPausedLabelChange = afterPausedLabelChange;

		setScopedAttribute("afterPausedLabelChange", afterPausedLabelChange);
	}

	public void setAfterPlayingChange(java.lang.Object afterPlayingChange) {
		_afterPlayingChange = afterPlayingChange;

		setScopedAttribute("afterPlayingChange", afterPlayingChange);
	}

	public void setAfterPlayingLabelChange(java.lang.Object afterPlayingLabelChange) {
		_afterPlayingLabelChange = afterPlayingLabelChange;

		setScopedAttribute("afterPlayingLabelChange", afterPlayingLabelChange);
	}

	public void setAfterPreloadAllImagesChange(java.lang.Object afterPreloadAllImagesChange) {
		_afterPreloadAllImagesChange = afterPreloadAllImagesChange;

		setScopedAttribute("afterPreloadAllImagesChange", afterPreloadAllImagesChange);
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

	public void setAfterRepeatChange(java.lang.Object afterRepeatChange) {
		_afterRepeatChange = afterRepeatChange;

		setScopedAttribute("afterRepeatChange", afterRepeatChange);
	}

	public void setAfterRequest(java.lang.Object afterRequest) {
		_afterRequest = afterRequest;

		setScopedAttribute("afterRequest", afterRequest);
	}

	public void setAfterShimChange(java.lang.Object afterShimChange) {
		_afterShimChange = afterShimChange;

		setScopedAttribute("afterShimChange", afterShimChange);
	}

	public void setAfterShowArrowsChange(java.lang.Object afterShowArrowsChange) {
		_afterShowArrowsChange = afterShowArrowsChange;

		setScopedAttribute("afterShowArrowsChange", afterShowArrowsChange);
	}

	public void setAfterShowCloseChange(java.lang.Object afterShowCloseChange) {
		_afterShowCloseChange = afterShowCloseChange;

		setScopedAttribute("afterShowCloseChange", afterShowCloseChange);
	}

	public void setAfterShowPlayerChange(java.lang.Object afterShowPlayerChange) {
		_afterShowPlayerChange = afterShowPlayerChange;

		setScopedAttribute("afterShowPlayerChange", afterShowPlayerChange);
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

	public void setAfterToolbarChange(java.lang.Object afterToolbarChange) {
		_afterToolbarChange = afterToolbarChange;

		setScopedAttribute("afterToolbarChange", afterToolbarChange);
	}

	public void setAfterTotalLinksChange(java.lang.Object afterTotalLinksChange) {
		_afterTotalLinksChange = afterTotalLinksChange;

		setScopedAttribute("afterTotalLinksChange", afterTotalLinksChange);
	}

	public void setAfterUseOriginalImageChange(java.lang.Object afterUseOriginalImageChange) {
		_afterUseOriginalImageChange = afterUseOriginalImageChange;

		setScopedAttribute("afterUseOriginalImageChange", afterUseOriginalImageChange);
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

	public void setOnAnim(java.lang.Object onAnim) {
		_onAnim = onAnim;

		setScopedAttribute("onAnim", onAnim);
	}

	public void setOnAnimChange(java.lang.Object onAnimChange) {
		_onAnimChange = onAnimChange;

		setScopedAttribute("onAnimChange", onAnimChange);
	}

	public void setOnArrowLeftElChange(java.lang.Object onArrowLeftElChange) {
		_onArrowLeftElChange = onArrowLeftElChange;

		setScopedAttribute("onArrowLeftElChange", onArrowLeftElChange);
	}

	public void setOnArrowRightElChange(java.lang.Object onArrowRightElChange) {
		_onArrowRightElChange = onArrowRightElChange;

		setScopedAttribute("onArrowRightElChange", onArrowRightElChange);
	}

	public void setOnAutoPlayChange(java.lang.Object onAutoPlayChange) {
		_onAutoPlayChange = onAutoPlayChange;

		setScopedAttribute("onAutoPlayChange", onAutoPlayChange);
	}

	public void setOnBodyContentChange(java.lang.Object onBodyContentChange) {
		_onBodyContentChange = onBodyContentChange;

		setScopedAttribute("onBodyContentChange", onBodyContentChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnCaptionChange(java.lang.Object onCaptionChange) {
		_onCaptionChange = onCaptionChange;

		setScopedAttribute("onCaptionChange", onCaptionChange);
	}

	public void setOnCaptionElChange(java.lang.Object onCaptionElChange) {
		_onCaptionElChange = onCaptionElChange;

		setScopedAttribute("onCaptionElChange", onCaptionElChange);
	}

	public void setOnCaptionFromTitleChange(java.lang.Object onCaptionFromTitleChange) {
		_onCaptionFromTitleChange = onCaptionFromTitleChange;

		setScopedAttribute("onCaptionFromTitleChange", onCaptionFromTitleChange);
	}

	public void setOnCenteredChange(java.lang.Object onCenteredChange) {
		_onCenteredChange = onCenteredChange;

		setScopedAttribute("onCenteredChange", onCenteredChange);
	}

	public void setOnCloseElChange(java.lang.Object onCloseElChange) {
		_onCloseElChange = onCloseElChange;

		setScopedAttribute("onCloseElChange", onCloseElChange);
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

	public void setOnCurrentIndexChange(java.lang.Object onCurrentIndexChange) {
		_onCurrentIndexChange = onCurrentIndexChange;

		setScopedAttribute("onCurrentIndexChange", onCurrentIndexChange);
	}

	public void setOnDelayChange(java.lang.Object onDelayChange) {
		_onDelayChange = onDelayChange;

		setScopedAttribute("onDelayChange", onDelayChange);
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

	public void setOnImageAnimChange(java.lang.Object onImageAnimChange) {
		_onImageAnimChange = onImageAnimChange;

		setScopedAttribute("onImageAnimChange", onImageAnimChange);
	}

	public void setOnImageChange(java.lang.Object onImageChange) {
		_onImageChange = onImageChange;

		setScopedAttribute("onImageChange", onImageChange);
	}

	public void setOnInfoElChange(java.lang.Object onInfoElChange) {
		_onInfoElChange = onInfoElChange;

		setScopedAttribute("onInfoElChange", onInfoElChange);
	}

	public void setOnInfoTemplateChange(java.lang.Object onInfoTemplateChange) {
		_onInfoTemplateChange = onInfoTemplateChange;

		setScopedAttribute("onInfoTemplateChange", onInfoTemplateChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnLinksChange(java.lang.Object onLinksChange) {
		_onLinksChange = onLinksChange;

		setScopedAttribute("onLinksChange", onLinksChange);
	}

	public void setOnLoad(java.lang.Object onLoad) {
		_onLoad = onLoad;

		setScopedAttribute("onLoad", onLoad);
	}

	public void setOnLoaderChange(java.lang.Object onLoaderChange) {
		_onLoaderChange = onLoaderChange;

		setScopedAttribute("onLoaderChange", onLoaderChange);
	}

	public void setOnLoadingChange(java.lang.Object onLoadingChange) {
		_onLoadingChange = onLoadingChange;

		setScopedAttribute("onLoadingChange", onLoadingChange);
	}

	public void setOnLoadingElChange(java.lang.Object onLoadingElChange) {
		_onLoadingElChange = onLoadingElChange;

		setScopedAttribute("onLoadingElChange", onLoadingElChange);
	}

	public void setOnMaxHeightChange(java.lang.Object onMaxHeightChange) {
		_onMaxHeightChange = onMaxHeightChange;

		setScopedAttribute("onMaxHeightChange", onMaxHeightChange);
	}

	public void setOnMaxWidthChange(java.lang.Object onMaxWidthChange) {
		_onMaxWidthChange = onMaxWidthChange;

		setScopedAttribute("onMaxWidthChange", onMaxWidthChange);
	}

	public void setOnModalChange(java.lang.Object onModalChange) {
		_onModalChange = onModalChange;

		setScopedAttribute("onModalChange", onModalChange);
	}

	public void setOnPaginatorChange(java.lang.Object onPaginatorChange) {
		_onPaginatorChange = onPaginatorChange;

		setScopedAttribute("onPaginatorChange", onPaginatorChange);
	}

	public void setOnPaginatorElChange(java.lang.Object onPaginatorElChange) {
		_onPaginatorElChange = onPaginatorElChange;

		setScopedAttribute("onPaginatorElChange", onPaginatorElChange);
	}

	public void setOnPaginatorInstanceChange(java.lang.Object onPaginatorInstanceChange) {
		_onPaginatorInstanceChange = onPaginatorInstanceChange;

		setScopedAttribute("onPaginatorInstanceChange", onPaginatorInstanceChange);
	}

	public void setOnPausedChange(java.lang.Object onPausedChange) {
		_onPausedChange = onPausedChange;

		setScopedAttribute("onPausedChange", onPausedChange);
	}

	public void setOnPausedLabelChange(java.lang.Object onPausedLabelChange) {
		_onPausedLabelChange = onPausedLabelChange;

		setScopedAttribute("onPausedLabelChange", onPausedLabelChange);
	}

	public void setOnPlayingChange(java.lang.Object onPlayingChange) {
		_onPlayingChange = onPlayingChange;

		setScopedAttribute("onPlayingChange", onPlayingChange);
	}

	public void setOnPlayingLabelChange(java.lang.Object onPlayingLabelChange) {
		_onPlayingLabelChange = onPlayingLabelChange;

		setScopedAttribute("onPlayingLabelChange", onPlayingLabelChange);
	}

	public void setOnPreloadAllImagesChange(java.lang.Object onPreloadAllImagesChange) {
		_onPreloadAllImagesChange = onPreloadAllImagesChange;

		setScopedAttribute("onPreloadAllImagesChange", onPreloadAllImagesChange);
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

	public void setOnRepeatChange(java.lang.Object onRepeatChange) {
		_onRepeatChange = onRepeatChange;

		setScopedAttribute("onRepeatChange", onRepeatChange);
	}

	public void setOnRequest(java.lang.Object onRequest) {
		_onRequest = onRequest;

		setScopedAttribute("onRequest", onRequest);
	}

	public void setOnShimChange(java.lang.Object onShimChange) {
		_onShimChange = onShimChange;

		setScopedAttribute("onShimChange", onShimChange);
	}

	public void setOnShowArrowsChange(java.lang.Object onShowArrowsChange) {
		_onShowArrowsChange = onShowArrowsChange;

		setScopedAttribute("onShowArrowsChange", onShowArrowsChange);
	}

	public void setOnShowCloseChange(java.lang.Object onShowCloseChange) {
		_onShowCloseChange = onShowCloseChange;

		setScopedAttribute("onShowCloseChange", onShowCloseChange);
	}

	public void setOnShowPlayerChange(java.lang.Object onShowPlayerChange) {
		_onShowPlayerChange = onShowPlayerChange;

		setScopedAttribute("onShowPlayerChange", onShowPlayerChange);
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

	public void setOnToolbarChange(java.lang.Object onToolbarChange) {
		_onToolbarChange = onToolbarChange;

		setScopedAttribute("onToolbarChange", onToolbarChange);
	}

	public void setOnTotalLinksChange(java.lang.Object onTotalLinksChange) {
		_onTotalLinksChange = onTotalLinksChange;

		setScopedAttribute("onTotalLinksChange", onTotalLinksChange);
	}

	public void setOnUseOriginalImageChange(java.lang.Object onUseOriginalImageChange) {
		_onUseOriginalImageChange = onUseOriginalImageChange;

		setScopedAttribute("onUseOriginalImageChange", onUseOriginalImageChange);
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
		setNamespacedAttribute(request, "anim", _anim);
		setNamespacedAttribute(request, "arrowLeftEl", _arrowLeftEl);
		setNamespacedAttribute(request, "arrowRightEl", _arrowRightEl);
		setNamespacedAttribute(request, "autoPlay", _autoPlay);
		setNamespacedAttribute(request, "imagegalleryBodyContent", _imagegalleryBodyContent);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "caption", _caption);
		setNamespacedAttribute(request, "captionEl", _captionEl);
		setNamespacedAttribute(request, "captionFromTitle", _captionFromTitle);
		setNamespacedAttribute(request, "centered", _centered);
		setNamespacedAttribute(request, "closeEl", _closeEl);
		setNamespacedAttribute(request, "constrain", _constrain);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "currentIndex", _currentIndex);
		setNamespacedAttribute(request, "delay", _delay);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "fillHeight", _fillHeight);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "footerContent", _footerContent);
		setNamespacedAttribute(request, "headerContent", _headerContent);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "imagegalleryId", _imagegalleryId);
		setNamespacedAttribute(request, "image", _image);
		setNamespacedAttribute(request, "imageAnim", _imageAnim);
		setNamespacedAttribute(request, "infoEl", _infoEl);
		setNamespacedAttribute(request, "infoTemplate", _infoTemplate);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "links", _links);
		setNamespacedAttribute(request, "loader", _loader);
		setNamespacedAttribute(request, "loading", _loading);
		setNamespacedAttribute(request, "loadingEl", _loadingEl);
		setNamespacedAttribute(request, "maxHeight", _maxHeight);
		setNamespacedAttribute(request, "maxWidth", _maxWidth);
		setNamespacedAttribute(request, "modal", _modal);
		setNamespacedAttribute(request, "paginator", _paginator);
		setNamespacedAttribute(request, "paginatorEl", _paginatorEl);
		setNamespacedAttribute(request, "paginatorInstance", _paginatorInstance);
		setNamespacedAttribute(request, "paused", _paused);
		setNamespacedAttribute(request, "pausedLabel", _pausedLabel);
		setNamespacedAttribute(request, "playing", _playing);
		setNamespacedAttribute(request, "playingLabel", _playingLabel);
		setNamespacedAttribute(request, "preloadAllImages", _preloadAllImages);
		setNamespacedAttribute(request, "preventOverlap", _preventOverlap);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "repeat", _repeat);
		setNamespacedAttribute(request, "shim", _shim);
		setNamespacedAttribute(request, "showArrows", _showArrows);
		setNamespacedAttribute(request, "showClose", _showClose);
		setNamespacedAttribute(request, "showPlayer", _showPlayer);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "toolbar", _toolbar);
		setNamespacedAttribute(request, "totalLinks", _totalLinks);
		setNamespacedAttribute(request, "useOriginalImage", _useOriginalImage);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "x", _x);
		setNamespacedAttribute(request, "xy", _xy);
		setNamespacedAttribute(request, "y", _y);
		setNamespacedAttribute(request, "zIndex", _zIndex);
		setNamespacedAttribute(request, "afterAlignChange", _afterAlignChange);
		setNamespacedAttribute(request, "afterAnim", _afterAnim);
		setNamespacedAttribute(request, "afterAnimChange", _afterAnimChange);
		setNamespacedAttribute(request, "afterArrowLeftElChange", _afterArrowLeftElChange);
		setNamespacedAttribute(request, "afterArrowRightElChange", _afterArrowRightElChange);
		setNamespacedAttribute(request, "afterAutoPlayChange", _afterAutoPlayChange);
		setNamespacedAttribute(request, "afterBodyContentChange", _afterBodyContentChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCaptionChange", _afterCaptionChange);
		setNamespacedAttribute(request, "afterCaptionElChange", _afterCaptionElChange);
		setNamespacedAttribute(request, "afterCaptionFromTitleChange", _afterCaptionFromTitleChange);
		setNamespacedAttribute(request, "afterCenteredChange", _afterCenteredChange);
		setNamespacedAttribute(request, "afterCloseElChange", _afterCloseElChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterCurrentIndexChange", _afterCurrentIndexChange);
		setNamespacedAttribute(request, "afterDelayChange", _afterDelayChange);
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
		setNamespacedAttribute(request, "afterImageAnimChange", _afterImageAnimChange);
		setNamespacedAttribute(request, "afterImageChange", _afterImageChange);
		setNamespacedAttribute(request, "afterInfoElChange", _afterInfoElChange);
		setNamespacedAttribute(request, "afterInfoTemplateChange", _afterInfoTemplateChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLinksChange", _afterLinksChange);
		setNamespacedAttribute(request, "afterLoad", _afterLoad);
		setNamespacedAttribute(request, "afterLoaderChange", _afterLoaderChange);
		setNamespacedAttribute(request, "afterLoadingChange", _afterLoadingChange);
		setNamespacedAttribute(request, "afterLoadingElChange", _afterLoadingElChange);
		setNamespacedAttribute(request, "afterMaxHeightChange", _afterMaxHeightChange);
		setNamespacedAttribute(request, "afterMaxWidthChange", _afterMaxWidthChange);
		setNamespacedAttribute(request, "afterModalChange", _afterModalChange);
		setNamespacedAttribute(request, "afterPaginatorChange", _afterPaginatorChange);
		setNamespacedAttribute(request, "afterPaginatorElChange", _afterPaginatorElChange);
		setNamespacedAttribute(request, "afterPaginatorInstanceChange", _afterPaginatorInstanceChange);
		setNamespacedAttribute(request, "afterPausedChange", _afterPausedChange);
		setNamespacedAttribute(request, "afterPausedLabelChange", _afterPausedLabelChange);
		setNamespacedAttribute(request, "afterPlayingChange", _afterPlayingChange);
		setNamespacedAttribute(request, "afterPlayingLabelChange", _afterPlayingLabelChange);
		setNamespacedAttribute(request, "afterPreloadAllImagesChange", _afterPreloadAllImagesChange);
		setNamespacedAttribute(request, "afterPreventOverlapChange", _afterPreventOverlapChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterRepeatChange", _afterRepeatChange);
		setNamespacedAttribute(request, "afterRequest", _afterRequest);
		setNamespacedAttribute(request, "afterShimChange", _afterShimChange);
		setNamespacedAttribute(request, "afterShowArrowsChange", _afterShowArrowsChange);
		setNamespacedAttribute(request, "afterShowCloseChange", _afterShowCloseChange);
		setNamespacedAttribute(request, "afterShowPlayerChange", _afterShowPlayerChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterToolbarChange", _afterToolbarChange);
		setNamespacedAttribute(request, "afterTotalLinksChange", _afterTotalLinksChange);
		setNamespacedAttribute(request, "afterUseOriginalImageChange", _afterUseOriginalImageChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "afterXChange", _afterXChange);
		setNamespacedAttribute(request, "afterXyChange", _afterXyChange);
		setNamespacedAttribute(request, "afterYChange", _afterYChange);
		setNamespacedAttribute(request, "afterZIndexChange", _afterZIndexChange);
		setNamespacedAttribute(request, "onAlignChange", _onAlignChange);
		setNamespacedAttribute(request, "onAnim", _onAnim);
		setNamespacedAttribute(request, "onAnimChange", _onAnimChange);
		setNamespacedAttribute(request, "onArrowLeftElChange", _onArrowLeftElChange);
		setNamespacedAttribute(request, "onArrowRightElChange", _onArrowRightElChange);
		setNamespacedAttribute(request, "onAutoPlayChange", _onAutoPlayChange);
		setNamespacedAttribute(request, "onBodyContentChange", _onBodyContentChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCaptionChange", _onCaptionChange);
		setNamespacedAttribute(request, "onCaptionElChange", _onCaptionElChange);
		setNamespacedAttribute(request, "onCaptionFromTitleChange", _onCaptionFromTitleChange);
		setNamespacedAttribute(request, "onCenteredChange", _onCenteredChange);
		setNamespacedAttribute(request, "onCloseElChange", _onCloseElChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onCurrentIndexChange", _onCurrentIndexChange);
		setNamespacedAttribute(request, "onDelayChange", _onDelayChange);
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
		setNamespacedAttribute(request, "onImageAnimChange", _onImageAnimChange);
		setNamespacedAttribute(request, "onImageChange", _onImageChange);
		setNamespacedAttribute(request, "onInfoElChange", _onInfoElChange);
		setNamespacedAttribute(request, "onInfoTemplateChange", _onInfoTemplateChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLinksChange", _onLinksChange);
		setNamespacedAttribute(request, "onLoad", _onLoad);
		setNamespacedAttribute(request, "onLoaderChange", _onLoaderChange);
		setNamespacedAttribute(request, "onLoadingChange", _onLoadingChange);
		setNamespacedAttribute(request, "onLoadingElChange", _onLoadingElChange);
		setNamespacedAttribute(request, "onMaxHeightChange", _onMaxHeightChange);
		setNamespacedAttribute(request, "onMaxWidthChange", _onMaxWidthChange);
		setNamespacedAttribute(request, "onModalChange", _onModalChange);
		setNamespacedAttribute(request, "onPaginatorChange", _onPaginatorChange);
		setNamespacedAttribute(request, "onPaginatorElChange", _onPaginatorElChange);
		setNamespacedAttribute(request, "onPaginatorInstanceChange", _onPaginatorInstanceChange);
		setNamespacedAttribute(request, "onPausedChange", _onPausedChange);
		setNamespacedAttribute(request, "onPausedLabelChange", _onPausedLabelChange);
		setNamespacedAttribute(request, "onPlayingChange", _onPlayingChange);
		setNamespacedAttribute(request, "onPlayingLabelChange", _onPlayingLabelChange);
		setNamespacedAttribute(request, "onPreloadAllImagesChange", _onPreloadAllImagesChange);
		setNamespacedAttribute(request, "onPreventOverlapChange", _onPreventOverlapChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onRepeatChange", _onRepeatChange);
		setNamespacedAttribute(request, "onRequest", _onRequest);
		setNamespacedAttribute(request, "onShimChange", _onShimChange);
		setNamespacedAttribute(request, "onShowArrowsChange", _onShowArrowsChange);
		setNamespacedAttribute(request, "onShowCloseChange", _onShowCloseChange);
		setNamespacedAttribute(request, "onShowPlayerChange", _onShowPlayerChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onToolbarChange", _onToolbarChange);
		setNamespacedAttribute(request, "onTotalLinksChange", _onTotalLinksChange);
		setNamespacedAttribute(request, "onUseOriginalImageChange", _onUseOriginalImageChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
		setNamespacedAttribute(request, "onXChange", _onXChange);
		setNamespacedAttribute(request, "onXyChange", _onXyChange);
		setNamespacedAttribute(request, "onYChange", _onYChange);
		setNamespacedAttribute(request, "onZIndexChange", _onZIndexChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:image-gallery:";

	private static final String _PAGE =
		"/html/taglib/alloy/image_gallery/page.jsp";

	private java.lang.Object _align;
	private java.lang.String _anim;
	private java.lang.Object _arrowLeftEl;
	private java.lang.Object _arrowRightEl;
	private java.lang.String _autoPlay;
	private java.lang.Object _imagegalleryBodyContent;
	private java.lang.Object _boundingBox;
	private java.lang.Object _caption;
	private java.lang.Object _captionEl;
	private java.lang.String _captionFromTitle;
	private java.lang.String _centered;
	private java.lang.Object _closeEl;
	private java.lang.Object _constrain;
	private java.lang.Object _contentBox;
	private java.lang.Object _cssClass;
	private java.lang.String _currentIndex;
	private java.lang.String _delay;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.Object _fillHeight;
	private java.lang.String _focused;
	private java.lang.Object _footerContent;
	private java.lang.Object _headerContent;
	private java.lang.Object _height;
	private java.lang.Object _hideClass;
	private java.lang.Object _imagegalleryId;
	private java.lang.Object _image;
	private java.lang.Object _imageAnim;
	private java.lang.Object _infoEl;
	private java.lang.Object _infoTemplate;
	private java.lang.String _initialized;
	private java.lang.Object _links;
	private java.lang.Object _loader;
	private java.lang.String _loading;
	private java.lang.Object _loadingEl;
	private java.lang.String _maxHeight;
	private java.lang.String _maxWidth;
	private java.lang.Object _modal;
	private java.lang.Object _paginator;
	private java.lang.Object _paginatorEl;
	private java.lang.Object _paginatorInstance;
	private java.lang.String _paused;
	private java.lang.Object _pausedLabel;
	private java.lang.String _playing;
	private java.lang.Object _playingLabel;
	private java.lang.String _preloadAllImages;
	private java.lang.String _preventOverlap;
	private java.lang.String _render;
	private java.lang.String _rendered;
	private java.lang.String _repeat;
	private java.lang.String _shim;
	private java.lang.String _showArrows;
	private java.lang.String _showClose;
	private java.lang.String _showPlayer;
	private java.lang.Object _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.Object _toolbar;
	private java.lang.String _totalLinks;
	private java.lang.String _useOriginalImage;
	private java.lang.String _visible;
	private java.lang.Object _width;
	private java.lang.String _x;
	private java.lang.Object _xy;
	private java.lang.String _y;
	private java.lang.String _zIndex;
	private java.lang.Object _afterAlignChange;
	private java.lang.Object _afterAnim;
	private java.lang.Object _afterAnimChange;
	private java.lang.Object _afterArrowLeftElChange;
	private java.lang.Object _afterArrowRightElChange;
	private java.lang.Object _afterAutoPlayChange;
	private java.lang.Object _afterBodyContentChange;
	private java.lang.Object _afterBoundingBoxChange;
	private java.lang.Object _afterCaptionChange;
	private java.lang.Object _afterCaptionElChange;
	private java.lang.Object _afterCaptionFromTitleChange;
	private java.lang.Object _afterCenteredChange;
	private java.lang.Object _afterCloseElChange;
	private java.lang.Object _afterConstrainChange;
	private java.lang.Object _afterContentBoxChange;
	private java.lang.Object _afterCssClassChange;
	private java.lang.Object _afterCurrentIndexChange;
	private java.lang.Object _afterDelayChange;
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
	private java.lang.Object _afterImageAnimChange;
	private java.lang.Object _afterImageChange;
	private java.lang.Object _afterInfoElChange;
	private java.lang.Object _afterInfoTemplateChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterLinksChange;
	private java.lang.Object _afterLoad;
	private java.lang.Object _afterLoaderChange;
	private java.lang.Object _afterLoadingChange;
	private java.lang.Object _afterLoadingElChange;
	private java.lang.Object _afterMaxHeightChange;
	private java.lang.Object _afterMaxWidthChange;
	private java.lang.Object _afterModalChange;
	private java.lang.Object _afterPaginatorChange;
	private java.lang.Object _afterPaginatorElChange;
	private java.lang.Object _afterPaginatorInstanceChange;
	private java.lang.Object _afterPausedChange;
	private java.lang.Object _afterPausedLabelChange;
	private java.lang.Object _afterPlayingChange;
	private java.lang.Object _afterPlayingLabelChange;
	private java.lang.Object _afterPreloadAllImagesChange;
	private java.lang.Object _afterPreventOverlapChange;
	private java.lang.Object _afterRenderChange;
	private java.lang.Object _afterRenderedChange;
	private java.lang.Object _afterRepeatChange;
	private java.lang.Object _afterRequest;
	private java.lang.Object _afterShimChange;
	private java.lang.Object _afterShowArrowsChange;
	private java.lang.Object _afterShowCloseChange;
	private java.lang.Object _afterShowPlayerChange;
	private java.lang.Object _afterSrcNodeChange;
	private java.lang.Object _afterStringsChange;
	private java.lang.Object _afterTabIndexChange;
	private java.lang.Object _afterToolbarChange;
	private java.lang.Object _afterTotalLinksChange;
	private java.lang.Object _afterUseOriginalImageChange;
	private java.lang.Object _afterVisibleChange;
	private java.lang.Object _afterContentUpdate;
	private java.lang.Object _afterRender;
	private java.lang.Object _afterWidthChange;
	private java.lang.Object _afterXChange;
	private java.lang.Object _afterXyChange;
	private java.lang.Object _afterYChange;
	private java.lang.Object _afterZIndexChange;
	private java.lang.Object _onAlignChange;
	private java.lang.Object _onAnim;
	private java.lang.Object _onAnimChange;
	private java.lang.Object _onArrowLeftElChange;
	private java.lang.Object _onArrowRightElChange;
	private java.lang.Object _onAutoPlayChange;
	private java.lang.Object _onBodyContentChange;
	private java.lang.Object _onBoundingBoxChange;
	private java.lang.Object _onCaptionChange;
	private java.lang.Object _onCaptionElChange;
	private java.lang.Object _onCaptionFromTitleChange;
	private java.lang.Object _onCenteredChange;
	private java.lang.Object _onCloseElChange;
	private java.lang.Object _onConstrainChange;
	private java.lang.Object _onContentBoxChange;
	private java.lang.Object _onCssClassChange;
	private java.lang.Object _onCurrentIndexChange;
	private java.lang.Object _onDelayChange;
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
	private java.lang.Object _onImageAnimChange;
	private java.lang.Object _onImageChange;
	private java.lang.Object _onInfoElChange;
	private java.lang.Object _onInfoTemplateChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onLinksChange;
	private java.lang.Object _onLoad;
	private java.lang.Object _onLoaderChange;
	private java.lang.Object _onLoadingChange;
	private java.lang.Object _onLoadingElChange;
	private java.lang.Object _onMaxHeightChange;
	private java.lang.Object _onMaxWidthChange;
	private java.lang.Object _onModalChange;
	private java.lang.Object _onPaginatorChange;
	private java.lang.Object _onPaginatorElChange;
	private java.lang.Object _onPaginatorInstanceChange;
	private java.lang.Object _onPausedChange;
	private java.lang.Object _onPausedLabelChange;
	private java.lang.Object _onPlayingChange;
	private java.lang.Object _onPlayingLabelChange;
	private java.lang.Object _onPreloadAllImagesChange;
	private java.lang.Object _onPreventOverlapChange;
	private java.lang.Object _onRenderChange;
	private java.lang.Object _onRenderedChange;
	private java.lang.Object _onRepeatChange;
	private java.lang.Object _onRequest;
	private java.lang.Object _onShimChange;
	private java.lang.Object _onShowArrowsChange;
	private java.lang.Object _onShowCloseChange;
	private java.lang.Object _onShowPlayerChange;
	private java.lang.Object _onSrcNodeChange;
	private java.lang.Object _onStringsChange;
	private java.lang.Object _onTabIndexChange;
	private java.lang.Object _onToolbarChange;
	private java.lang.Object _onTotalLinksChange;
	private java.lang.Object _onUseOriginalImageChange;
	private java.lang.Object _onVisibleChange;
	private java.lang.Object _onContentUpdate;
	private java.lang.Object _onRender;
	private java.lang.Object _onWidthChange;
	private java.lang.Object _onXChange;
	private java.lang.Object _onXyChange;
	private java.lang.Object _onYChange;
	private java.lang.Object _onZIndexChange;

}
