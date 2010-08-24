<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:image-gallery:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:image-gallery:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:image-gallery:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:image-gallery:align");
java.lang.Boolean _anim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:anim"), true);
java.lang.String _arrowLeftEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:arrowLeftEl"));
java.lang.String _arrowRightEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:arrowRightEl"));
java.lang.Boolean _autoPlay = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:autoPlay"), false);
java.lang.String _imagegalleryBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:imagegalleryBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:boundingBox"));
java.lang.String _caption = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:caption"));
java.lang.String _captionEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:captionEl"));
java.lang.Boolean _captionFromTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:captionFromTitle"), true);
java.lang.Boolean _centered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:centered"), true);
java.lang.String _closeEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:closeEl"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:cssClass"));
java.lang.Number _currentIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:currentIndex"), 0);
java.lang.Number _delay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:delay"), 7000);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:disabled"), false);
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:focused"), false);
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:hideClass"), "aui-helper-hidden");
java.lang.String _imagegalleryId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:imagegalleryId"));
java.lang.String _image = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:image"));
java.lang.Object _imageAnim = (java.lang.Object)request.getAttribute("alloy:image-gallery:imageAnim");
java.lang.String _infoEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:infoEl"));
java.lang.String _infoTemplate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:infoTemplate"), "Image {current} of {total}");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:initialized"), false);
java.lang.String _links = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:links"));
java.lang.String _loader = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:loader"));
java.lang.Boolean _loading = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:loading"), false);
java.lang.String _loadingEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:loadingEl"));
java.lang.Number _maxHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:maxHeight"), 0);
java.lang.Number _maxWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:maxWidth"), 0);
java.lang.String _modal = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:modal"), "{ opacity: .8, background: '#000' }");
java.lang.Object _paginator = (java.lang.Object)request.getAttribute("alloy:image-gallery:paginator");
java.lang.String _paginatorEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:paginatorEl"));
java.lang.String _paginatorInstance = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:paginatorInstance"));
java.lang.Boolean _paused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:paused"), false);
java.lang.String _pausedLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:pausedLabel"));
java.lang.Boolean _playing = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:playing"), false);
java.lang.String _playingLabel = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:playingLabel"), "(Playing)");
java.lang.Boolean _preloadAllImages = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:preloadAllImages"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:rendered"), false);
java.lang.Boolean _repeat = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:repeat"), true);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:shim"), false);
java.lang.Boolean _showArrows = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showArrows"), true);
java.lang.Boolean _showClose = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showClose"), true);
java.lang.Boolean _showPlayer = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showPlayer"), true);
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:image-gallery:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:tabIndex"), 0);
java.lang.String _toolbar = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:toolbar"));
java.lang.Boolean _totalLinks = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:totalLinks"), true);
java.lang.Boolean _useOriginalImage = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:useOriginalImage"), false);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:visible"), true);
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:image-gallery:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:zIndex"), 0);
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterAlignChange"));
java.lang.String _afterAnim = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterAnim"));
java.lang.String _afterAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterAnimChange"));
java.lang.String _afterArrowLeftElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterArrowLeftElChange"));
java.lang.String _afterArrowRightElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterArrowRightElChange"));
java.lang.String _afterAutoPlayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterAutoPlayChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterBoundingBoxChange"));
java.lang.String _afterCaptionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionChange"));
java.lang.String _afterCaptionElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionElChange"));
java.lang.String _afterCaptionFromTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionFromTitleChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCenteredChange"));
java.lang.String _afterCloseElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCloseElChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCssClassChange"));
java.lang.String _afterCurrentIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterCurrentIndexChange"));
java.lang.String _afterDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterDelayChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterFillHeightChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterIdChange"));
java.lang.String _afterImageAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterImageAnimChange"));
java.lang.String _afterImageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterImageChange"));
java.lang.String _afterInfoElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterInfoElChange"));
java.lang.String _afterInfoTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterInfoTemplateChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterInitializedChange"));
java.lang.String _afterLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterLinksChange"));
java.lang.String _afterLoad = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterLoad"));
java.lang.String _afterLoaderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterLoaderChange"));
java.lang.String _afterLoadingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterLoadingChange"));
java.lang.String _afterLoadingElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterLoadingElChange"));
java.lang.String _afterMaxHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterMaxHeightChange"));
java.lang.String _afterMaxWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterMaxWidthChange"));
java.lang.String _afterModalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterModalChange"));
java.lang.String _afterPaginatorChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorChange"));
java.lang.String _afterPaginatorElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorElChange"));
java.lang.String _afterPaginatorInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorInstanceChange"));
java.lang.String _afterPausedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPausedChange"));
java.lang.String _afterPausedLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPausedLabelChange"));
java.lang.String _afterPlayingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPlayingChange"));
java.lang.String _afterPlayingLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPlayingLabelChange"));
java.lang.String _afterPreloadAllImagesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPreloadAllImagesChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterRenderedChange"));
java.lang.String _afterRepeatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterRepeatChange"));
java.lang.String _afterRequest = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterRequest"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterShimChange"));
java.lang.String _afterShowArrowsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterShowArrowsChange"));
java.lang.String _afterShowCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterShowCloseChange"));
java.lang.String _afterShowPlayerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterShowPlayerChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterTabIndexChange"));
java.lang.String _afterToolbarChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterToolbarChange"));
java.lang.String _afterTotalLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterTotalLinksChange"));
java.lang.String _afterUseOriginalImageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterUseOriginalImageChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onAlignChange"));
java.lang.String _onAnim = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onAnim"));
java.lang.String _onAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onAnimChange"));
java.lang.String _onArrowLeftElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onArrowLeftElChange"));
java.lang.String _onArrowRightElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onArrowRightElChange"));
java.lang.String _onAutoPlayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onAutoPlayChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onBoundingBoxChange"));
java.lang.String _onCaptionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionChange"));
java.lang.String _onCaptionElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionElChange"));
java.lang.String _onCaptionFromTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionFromTitleChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCenteredChange"));
java.lang.String _onCloseElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCloseElChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCssClassChange"));
java.lang.String _onCurrentIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onCurrentIndexChange"));
java.lang.String _onDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onDelayChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onFillHeightChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onIdChange"));
java.lang.String _onImageAnimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onImageAnimChange"));
java.lang.String _onImageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onImageChange"));
java.lang.String _onInfoElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onInfoElChange"));
java.lang.String _onInfoTemplateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onInfoTemplateChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onInitializedChange"));
java.lang.String _onLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onLinksChange"));
java.lang.String _onLoad = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onLoad"));
java.lang.String _onLoaderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onLoaderChange"));
java.lang.String _onLoadingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onLoadingChange"));
java.lang.String _onLoadingElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onLoadingElChange"));
java.lang.String _onMaxHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onMaxHeightChange"));
java.lang.String _onMaxWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onMaxWidthChange"));
java.lang.String _onModalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onModalChange"));
java.lang.String _onPaginatorChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorChange"));
java.lang.String _onPaginatorElChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorElChange"));
java.lang.String _onPaginatorInstanceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorInstanceChange"));
java.lang.String _onPausedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPausedChange"));
java.lang.String _onPausedLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPausedLabelChange"));
java.lang.String _onPlayingChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPlayingChange"));
java.lang.String _onPlayingLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPlayingLabelChange"));
java.lang.String _onPreloadAllImagesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPreloadAllImagesChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onRenderedChange"));
java.lang.String _onRepeatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onRepeatChange"));
java.lang.String _onRequest = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onRequest"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onShimChange"));
java.lang.String _onShowArrowsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onShowArrowsChange"));
java.lang.String _onShowCloseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onShowCloseChange"));
java.lang.String _onShowPlayerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onShowPlayerChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onTabIndexChange"));
java.lang.String _onToolbarChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onToolbarChange"));
java.lang.String _onTotalLinksChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onTotalLinksChange"));
java.lang.String _onUseOriginalImageChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onUseOriginalImageChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:image-gallery:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:image-gallery:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:image-gallery:anim") != null) {
	scopedAttributes.put("anim", _anim);
}

if (request.getAttribute("alloy:image-gallery:arrowLeftEl") != null) {
	scopedAttributes.put("arrowLeftEl", _arrowLeftEl);
}

if (request.getAttribute("alloy:image-gallery:arrowRightEl") != null) {
	scopedAttributes.put("arrowRightEl", _arrowRightEl);
}

if (request.getAttribute("alloy:image-gallery:autoPlay") != null) {
	scopedAttributes.put("autoPlay", _autoPlay);
}

if (request.getAttribute("alloy:image-gallery:imagegalleryBodyContent") != null) {
	scopedAttributes.put("imagegalleryBodyContent", _imagegalleryBodyContent);
}

if (request.getAttribute("alloy:image-gallery:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:image-gallery:caption") != null) {
	scopedAttributes.put("caption", _caption);
}

if (request.getAttribute("alloy:image-gallery:captionEl") != null) {
	scopedAttributes.put("captionEl", _captionEl);
}

if (request.getAttribute("alloy:image-gallery:captionFromTitle") != null) {
	scopedAttributes.put("captionFromTitle", _captionFromTitle);
}

if (request.getAttribute("alloy:image-gallery:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:image-gallery:closeEl") != null) {
	scopedAttributes.put("closeEl", _closeEl);
}

if (request.getAttribute("alloy:image-gallery:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:image-gallery:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:image-gallery:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:image-gallery:currentIndex") != null) {
	scopedAttributes.put("currentIndex", _currentIndex);
}

if (request.getAttribute("alloy:image-gallery:delay") != null) {
	scopedAttributes.put("delay", _delay);
}

if (request.getAttribute("alloy:image-gallery:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:image-gallery:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:image-gallery:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:image-gallery:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:image-gallery:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:image-gallery:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:image-gallery:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:image-gallery:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:image-gallery:imagegalleryId") != null) {
	scopedAttributes.put("imagegalleryId", _imagegalleryId);
}

if (request.getAttribute("alloy:image-gallery:image") != null) {
	scopedAttributes.put("image", _image);
}

if (request.getAttribute("alloy:image-gallery:imageAnim") != null) {
	scopedAttributes.put("imageAnim", _imageAnim);
}

if (request.getAttribute("alloy:image-gallery:infoEl") != null) {
	scopedAttributes.put("infoEl", _infoEl);
}

if (request.getAttribute("alloy:image-gallery:infoTemplate") != null) {
	scopedAttributes.put("infoTemplate", _infoTemplate);
}

if (request.getAttribute("alloy:image-gallery:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:image-gallery:links") != null) {
	scopedAttributes.put("links", _links);
}

if (request.getAttribute("alloy:image-gallery:loader") != null) {
	scopedAttributes.put("loader", _loader);
}

if (request.getAttribute("alloy:image-gallery:loading") != null) {
	scopedAttributes.put("loading", _loading);
}

if (request.getAttribute("alloy:image-gallery:loadingEl") != null) {
	scopedAttributes.put("loadingEl", _loadingEl);
}

if (request.getAttribute("alloy:image-gallery:maxHeight") != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (request.getAttribute("alloy:image-gallery:maxWidth") != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (request.getAttribute("alloy:image-gallery:modal") != null) {
	scopedAttributes.put("modal", _modal);
}

if (request.getAttribute("alloy:image-gallery:paginator") != null) {
	scopedAttributes.put("paginator", _paginator);
}

if (request.getAttribute("alloy:image-gallery:paginatorEl") != null) {
	scopedAttributes.put("paginatorEl", _paginatorEl);
}

if (request.getAttribute("alloy:image-gallery:paginatorInstance") != null) {
	scopedAttributes.put("paginatorInstance", _paginatorInstance);
}

if (request.getAttribute("alloy:image-gallery:paused") != null) {
	scopedAttributes.put("paused", _paused);
}

if (request.getAttribute("alloy:image-gallery:pausedLabel") != null) {
	scopedAttributes.put("pausedLabel", _pausedLabel);
}

if (request.getAttribute("alloy:image-gallery:playing") != null) {
	scopedAttributes.put("playing", _playing);
}

if (request.getAttribute("alloy:image-gallery:playingLabel") != null) {
	scopedAttributes.put("playingLabel", _playingLabel);
}

if (request.getAttribute("alloy:image-gallery:preloadAllImages") != null) {
	scopedAttributes.put("preloadAllImages", _preloadAllImages);
}

if (request.getAttribute("alloy:image-gallery:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:image-gallery:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:image-gallery:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:image-gallery:repeat") != null) {
	scopedAttributes.put("repeat", _repeat);
}

if (request.getAttribute("alloy:image-gallery:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:image-gallery:showArrows") != null) {
	scopedAttributes.put("showArrows", _showArrows);
}

if (request.getAttribute("alloy:image-gallery:showClose") != null) {
	scopedAttributes.put("showClose", _showClose);
}

if (request.getAttribute("alloy:image-gallery:showPlayer") != null) {
	scopedAttributes.put("showPlayer", _showPlayer);
}

if (request.getAttribute("alloy:image-gallery:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:image-gallery:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:image-gallery:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:image-gallery:toolbar") != null) {
	scopedAttributes.put("toolbar", _toolbar);
}

if (request.getAttribute("alloy:image-gallery:totalLinks") != null) {
	scopedAttributes.put("totalLinks", _totalLinks);
}

if (request.getAttribute("alloy:image-gallery:useOriginalImage") != null) {
	scopedAttributes.put("useOriginalImage", _useOriginalImage);
}

if (request.getAttribute("alloy:image-gallery:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:image-gallery:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:image-gallery:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:image-gallery:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:image-gallery:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:image-gallery:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:image-gallery:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:image-gallery:afterAnim") != null) {
	scopedAttributes.put("afterAnim", _afterAnim);
}

if (request.getAttribute("alloy:image-gallery:afterAnimChange") != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (request.getAttribute("alloy:image-gallery:afterArrowLeftElChange") != null) {
	scopedAttributes.put("afterArrowLeftElChange", _afterArrowLeftElChange);
}

if (request.getAttribute("alloy:image-gallery:afterArrowRightElChange") != null) {
	scopedAttributes.put("afterArrowRightElChange", _afterArrowRightElChange);
}

if (request.getAttribute("alloy:image-gallery:afterAutoPlayChange") != null) {
	scopedAttributes.put("afterAutoPlayChange", _afterAutoPlayChange);
}

if (request.getAttribute("alloy:image-gallery:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:image-gallery:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:image-gallery:afterCaptionChange") != null) {
	scopedAttributes.put("afterCaptionChange", _afterCaptionChange);
}

if (request.getAttribute("alloy:image-gallery:afterCaptionElChange") != null) {
	scopedAttributes.put("afterCaptionElChange", _afterCaptionElChange);
}

if (request.getAttribute("alloy:image-gallery:afterCaptionFromTitleChange") != null) {
	scopedAttributes.put("afterCaptionFromTitleChange", _afterCaptionFromTitleChange);
}

if (request.getAttribute("alloy:image-gallery:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:image-gallery:afterCloseElChange") != null) {
	scopedAttributes.put("afterCloseElChange", _afterCloseElChange);
}

if (request.getAttribute("alloy:image-gallery:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:image-gallery:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:image-gallery:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:image-gallery:afterCurrentIndexChange") != null) {
	scopedAttributes.put("afterCurrentIndexChange", _afterCurrentIndexChange);
}

if (request.getAttribute("alloy:image-gallery:afterDelayChange") != null) {
	scopedAttributes.put("afterDelayChange", _afterDelayChange);
}

if (request.getAttribute("alloy:image-gallery:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:image-gallery:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:image-gallery:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:image-gallery:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:image-gallery:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:image-gallery:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:image-gallery:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:image-gallery:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:image-gallery:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:image-gallery:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:image-gallery:afterImageAnimChange") != null) {
	scopedAttributes.put("afterImageAnimChange", _afterImageAnimChange);
}

if (request.getAttribute("alloy:image-gallery:afterImageChange") != null) {
	scopedAttributes.put("afterImageChange", _afterImageChange);
}

if (request.getAttribute("alloy:image-gallery:afterInfoElChange") != null) {
	scopedAttributes.put("afterInfoElChange", _afterInfoElChange);
}

if (request.getAttribute("alloy:image-gallery:afterInfoTemplateChange") != null) {
	scopedAttributes.put("afterInfoTemplateChange", _afterInfoTemplateChange);
}

if (request.getAttribute("alloy:image-gallery:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:image-gallery:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:image-gallery:afterLinksChange") != null) {
	scopedAttributes.put("afterLinksChange", _afterLinksChange);
}

if (request.getAttribute("alloy:image-gallery:afterLoad") != null) {
	scopedAttributes.put("afterLoad", _afterLoad);
}

if (request.getAttribute("alloy:image-gallery:afterLoaderChange") != null) {
	scopedAttributes.put("afterLoaderChange", _afterLoaderChange);
}

if (request.getAttribute("alloy:image-gallery:afterLoadingChange") != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (request.getAttribute("alloy:image-gallery:afterLoadingElChange") != null) {
	scopedAttributes.put("afterLoadingElChange", _afterLoadingElChange);
}

if (request.getAttribute("alloy:image-gallery:afterMaxHeightChange") != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (request.getAttribute("alloy:image-gallery:afterMaxWidthChange") != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (request.getAttribute("alloy:image-gallery:afterModalChange") != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (request.getAttribute("alloy:image-gallery:afterPaginatorChange") != null) {
	scopedAttributes.put("afterPaginatorChange", _afterPaginatorChange);
}

if (request.getAttribute("alloy:image-gallery:afterPaginatorElChange") != null) {
	scopedAttributes.put("afterPaginatorElChange", _afterPaginatorElChange);
}

if (request.getAttribute("alloy:image-gallery:afterPaginatorInstanceChange") != null) {
	scopedAttributes.put("afterPaginatorInstanceChange", _afterPaginatorInstanceChange);
}

if (request.getAttribute("alloy:image-gallery:afterPausedChange") != null) {
	scopedAttributes.put("afterPausedChange", _afterPausedChange);
}

if (request.getAttribute("alloy:image-gallery:afterPausedLabelChange") != null) {
	scopedAttributes.put("afterPausedLabelChange", _afterPausedLabelChange);
}

if (request.getAttribute("alloy:image-gallery:afterPlayingChange") != null) {
	scopedAttributes.put("afterPlayingChange", _afterPlayingChange);
}

if (request.getAttribute("alloy:image-gallery:afterPlayingLabelChange") != null) {
	scopedAttributes.put("afterPlayingLabelChange", _afterPlayingLabelChange);
}

if (request.getAttribute("alloy:image-gallery:afterPreloadAllImagesChange") != null) {
	scopedAttributes.put("afterPreloadAllImagesChange", _afterPreloadAllImagesChange);
}

if (request.getAttribute("alloy:image-gallery:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:image-gallery:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:image-gallery:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:image-gallery:afterRepeatChange") != null) {
	scopedAttributes.put("afterRepeatChange", _afterRepeatChange);
}

if (request.getAttribute("alloy:image-gallery:afterRequest") != null) {
	scopedAttributes.put("afterRequest", _afterRequest);
}

if (request.getAttribute("alloy:image-gallery:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:image-gallery:afterShowArrowsChange") != null) {
	scopedAttributes.put("afterShowArrowsChange", _afterShowArrowsChange);
}

if (request.getAttribute("alloy:image-gallery:afterShowCloseChange") != null) {
	scopedAttributes.put("afterShowCloseChange", _afterShowCloseChange);
}

if (request.getAttribute("alloy:image-gallery:afterShowPlayerChange") != null) {
	scopedAttributes.put("afterShowPlayerChange", _afterShowPlayerChange);
}

if (request.getAttribute("alloy:image-gallery:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:image-gallery:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:image-gallery:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:image-gallery:afterToolbarChange") != null) {
	scopedAttributes.put("afterToolbarChange", _afterToolbarChange);
}

if (request.getAttribute("alloy:image-gallery:afterTotalLinksChange") != null) {
	scopedAttributes.put("afterTotalLinksChange", _afterTotalLinksChange);
}

if (request.getAttribute("alloy:image-gallery:afterUseOriginalImageChange") != null) {
	scopedAttributes.put("afterUseOriginalImageChange", _afterUseOriginalImageChange);
}

if (request.getAttribute("alloy:image-gallery:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:image-gallery:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:image-gallery:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:image-gallery:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:image-gallery:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:image-gallery:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:image-gallery:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:image-gallery:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:image-gallery:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:image-gallery:onAnim") != null) {
	scopedAttributes.put("onAnim", _onAnim);
}

if (request.getAttribute("alloy:image-gallery:onAnimChange") != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (request.getAttribute("alloy:image-gallery:onArrowLeftElChange") != null) {
	scopedAttributes.put("onArrowLeftElChange", _onArrowLeftElChange);
}

if (request.getAttribute("alloy:image-gallery:onArrowRightElChange") != null) {
	scopedAttributes.put("onArrowRightElChange", _onArrowRightElChange);
}

if (request.getAttribute("alloy:image-gallery:onAutoPlayChange") != null) {
	scopedAttributes.put("onAutoPlayChange", _onAutoPlayChange);
}

if (request.getAttribute("alloy:image-gallery:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:image-gallery:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:image-gallery:onCaptionChange") != null) {
	scopedAttributes.put("onCaptionChange", _onCaptionChange);
}

if (request.getAttribute("alloy:image-gallery:onCaptionElChange") != null) {
	scopedAttributes.put("onCaptionElChange", _onCaptionElChange);
}

if (request.getAttribute("alloy:image-gallery:onCaptionFromTitleChange") != null) {
	scopedAttributes.put("onCaptionFromTitleChange", _onCaptionFromTitleChange);
}

if (request.getAttribute("alloy:image-gallery:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:image-gallery:onCloseElChange") != null) {
	scopedAttributes.put("onCloseElChange", _onCloseElChange);
}

if (request.getAttribute("alloy:image-gallery:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:image-gallery:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:image-gallery:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:image-gallery:onCurrentIndexChange") != null) {
	scopedAttributes.put("onCurrentIndexChange", _onCurrentIndexChange);
}

if (request.getAttribute("alloy:image-gallery:onDelayChange") != null) {
	scopedAttributes.put("onDelayChange", _onDelayChange);
}

if (request.getAttribute("alloy:image-gallery:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:image-gallery:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:image-gallery:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:image-gallery:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:image-gallery:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:image-gallery:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:image-gallery:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:image-gallery:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:image-gallery:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:image-gallery:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:image-gallery:onImageAnimChange") != null) {
	scopedAttributes.put("onImageAnimChange", _onImageAnimChange);
}

if (request.getAttribute("alloy:image-gallery:onImageChange") != null) {
	scopedAttributes.put("onImageChange", _onImageChange);
}

if (request.getAttribute("alloy:image-gallery:onInfoElChange") != null) {
	scopedAttributes.put("onInfoElChange", _onInfoElChange);
}

if (request.getAttribute("alloy:image-gallery:onInfoTemplateChange") != null) {
	scopedAttributes.put("onInfoTemplateChange", _onInfoTemplateChange);
}

if (request.getAttribute("alloy:image-gallery:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:image-gallery:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:image-gallery:onLinksChange") != null) {
	scopedAttributes.put("onLinksChange", _onLinksChange);
}

if (request.getAttribute("alloy:image-gallery:onLoad") != null) {
	scopedAttributes.put("onLoad", _onLoad);
}

if (request.getAttribute("alloy:image-gallery:onLoaderChange") != null) {
	scopedAttributes.put("onLoaderChange", _onLoaderChange);
}

if (request.getAttribute("alloy:image-gallery:onLoadingChange") != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (request.getAttribute("alloy:image-gallery:onLoadingElChange") != null) {
	scopedAttributes.put("onLoadingElChange", _onLoadingElChange);
}

if (request.getAttribute("alloy:image-gallery:onMaxHeightChange") != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (request.getAttribute("alloy:image-gallery:onMaxWidthChange") != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (request.getAttribute("alloy:image-gallery:onModalChange") != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (request.getAttribute("alloy:image-gallery:onPaginatorChange") != null) {
	scopedAttributes.put("onPaginatorChange", _onPaginatorChange);
}

if (request.getAttribute("alloy:image-gallery:onPaginatorElChange") != null) {
	scopedAttributes.put("onPaginatorElChange", _onPaginatorElChange);
}

if (request.getAttribute("alloy:image-gallery:onPaginatorInstanceChange") != null) {
	scopedAttributes.put("onPaginatorInstanceChange", _onPaginatorInstanceChange);
}

if (request.getAttribute("alloy:image-gallery:onPausedChange") != null) {
	scopedAttributes.put("onPausedChange", _onPausedChange);
}

if (request.getAttribute("alloy:image-gallery:onPausedLabelChange") != null) {
	scopedAttributes.put("onPausedLabelChange", _onPausedLabelChange);
}

if (request.getAttribute("alloy:image-gallery:onPlayingChange") != null) {
	scopedAttributes.put("onPlayingChange", _onPlayingChange);
}

if (request.getAttribute("alloy:image-gallery:onPlayingLabelChange") != null) {
	scopedAttributes.put("onPlayingLabelChange", _onPlayingLabelChange);
}

if (request.getAttribute("alloy:image-gallery:onPreloadAllImagesChange") != null) {
	scopedAttributes.put("onPreloadAllImagesChange", _onPreloadAllImagesChange);
}

if (request.getAttribute("alloy:image-gallery:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:image-gallery:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:image-gallery:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:image-gallery:onRepeatChange") != null) {
	scopedAttributes.put("onRepeatChange", _onRepeatChange);
}

if (request.getAttribute("alloy:image-gallery:onRequest") != null) {
	scopedAttributes.put("onRequest", _onRequest);
}

if (request.getAttribute("alloy:image-gallery:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:image-gallery:onShowArrowsChange") != null) {
	scopedAttributes.put("onShowArrowsChange", _onShowArrowsChange);
}

if (request.getAttribute("alloy:image-gallery:onShowCloseChange") != null) {
	scopedAttributes.put("onShowCloseChange", _onShowCloseChange);
}

if (request.getAttribute("alloy:image-gallery:onShowPlayerChange") != null) {
	scopedAttributes.put("onShowPlayerChange", _onShowPlayerChange);
}

if (request.getAttribute("alloy:image-gallery:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:image-gallery:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:image-gallery:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:image-gallery:onToolbarChange") != null) {
	scopedAttributes.put("onToolbarChange", _onToolbarChange);
}

if (request.getAttribute("alloy:image-gallery:onTotalLinksChange") != null) {
	scopedAttributes.put("onTotalLinksChange", _onTotalLinksChange);
}

if (request.getAttribute("alloy:image-gallery:onUseOriginalImageChange") != null) {
	scopedAttributes.put("onUseOriginalImageChange", _onUseOriginalImageChange);
}

if (request.getAttribute("alloy:image-gallery:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:image-gallery:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:image-gallery:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:image-gallery:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:image-gallery:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:image-gallery:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:image-gallery:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:image-gallery:onZIndexChange") != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>