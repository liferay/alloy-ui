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
java.lang.Object _arrowLeftEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:arrowLeftEl");
java.lang.Object _arrowRightEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:arrowRightEl");
java.lang.Boolean _autoPlay = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:autoPlay"), false);
java.lang.Object _imagegalleryBodyContent = (java.lang.Object)request.getAttribute("alloy:image-gallery:imagegalleryBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:image-gallery:boundingBox");
java.lang.Object _caption = (java.lang.Object)request.getAttribute("alloy:image-gallery:caption");
java.lang.Object _captionEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:captionEl");
java.lang.Boolean _captionFromTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:captionFromTitle"), true);
java.lang.Boolean _centered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:centered"), true);
java.lang.Object _closeEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:closeEl");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:image-gallery:constrain");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:image-gallery:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:image-gallery:cssClass");
java.lang.Number _currentIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:currentIndex"), 0);
java.lang.Number _delay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:delay"), 7000);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:image-gallery:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:image-gallery:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:image-gallery:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:image-gallery:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:image-gallery:hideClass");
java.lang.Object _imagegalleryId = (java.lang.Object)request.getAttribute("alloy:image-gallery:imagegalleryId");
java.lang.Object _image = (java.lang.Object)request.getAttribute("alloy:image-gallery:image");
java.lang.Object _imageAnim = (java.lang.Object)request.getAttribute("alloy:image-gallery:imageAnim");
java.lang.Object _infoEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:infoEl");
java.lang.Object _infoTemplate = (java.lang.Object)request.getAttribute("alloy:image-gallery:infoTemplate");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:initialized"), false);
java.lang.Object _links = (java.lang.Object)request.getAttribute("alloy:image-gallery:links");
java.lang.Object _loader = (java.lang.Object)request.getAttribute("alloy:image-gallery:loader");
java.lang.Boolean _loading = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:loading"), false);
java.lang.Object _loadingEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:loadingEl");
java.lang.Number _maxHeight = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:maxHeight"), 0);
java.lang.Number _maxWidth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:maxWidth"), 0);
java.lang.Object _modal = (java.lang.Object)request.getAttribute("alloy:image-gallery:modal");
java.lang.Object _paginator = (java.lang.Object)request.getAttribute("alloy:image-gallery:paginator");
java.lang.Object _paginatorEl = (java.lang.Object)request.getAttribute("alloy:image-gallery:paginatorEl");
java.lang.Object _paginatorInstance = (java.lang.Object)request.getAttribute("alloy:image-gallery:paginatorInstance");
java.lang.Boolean _paused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:paused"), false);
java.lang.Object _pausedLabel = (java.lang.Object)request.getAttribute("alloy:image-gallery:pausedLabel");
java.lang.Boolean _playing = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:playing"), false);
java.lang.Object _playingLabel = (java.lang.Object)request.getAttribute("alloy:image-gallery:playingLabel");
java.lang.Boolean _preloadAllImages = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:preloadAllImages"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:rendered"), false);
java.lang.Boolean _repeat = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:repeat"), true);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:shim"), false);
java.lang.Boolean _showArrows = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showArrows"), true);
java.lang.Boolean _showClose = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showClose"), true);
java.lang.Boolean _showPlayer = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:showPlayer"), true);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:image-gallery:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:image-gallery:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:tabIndex"), 0);
java.lang.Object _toolbar = (java.lang.Object)request.getAttribute("alloy:image-gallery:toolbar");
java.lang.Boolean _totalLinks = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:totalLinks"), true);
java.lang.Boolean _useOriginalImage = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:useOriginalImage"), false);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:image-gallery:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:image-gallery:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:image-gallery:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:image-gallery:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterAlignChange");
java.lang.Object _afterAnim = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterAnim");
java.lang.Object _afterAnimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterAnimChange");
java.lang.Object _afterArrowLeftElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterArrowLeftElChange");
java.lang.Object _afterArrowRightElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterArrowRightElChange");
java.lang.Object _afterAutoPlayChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterAutoPlayChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterBoundingBoxChange");
java.lang.Object _afterCaptionChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCaptionChange");
java.lang.Object _afterCaptionElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCaptionElChange");
java.lang.Object _afterCaptionFromTitleChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCaptionFromTitleChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCenteredChange");
java.lang.Object _afterCloseElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCloseElChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCssClassChange");
java.lang.Object _afterCurrentIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterCurrentIndexChange");
java.lang.Object _afterDelayChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterDelayChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterIdChange");
java.lang.Object _afterImageAnimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterImageAnimChange");
java.lang.Object _afterImageChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterImageChange");
java.lang.Object _afterInfoElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterInfoElChange");
java.lang.Object _afterInfoTemplateChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterInfoTemplateChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterInitializedChange");
java.lang.Object _afterLinksChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterLinksChange");
java.lang.Object _afterLoad = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterLoad");
java.lang.Object _afterLoaderChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterLoaderChange");
java.lang.Object _afterLoadingChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterLoadingChange");
java.lang.Object _afterLoadingElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterLoadingElChange");
java.lang.Object _afterMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterMaxHeightChange");
java.lang.Object _afterMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterMaxWidthChange");
java.lang.Object _afterModalChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterModalChange");
java.lang.Object _afterPaginatorChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPaginatorChange");
java.lang.Object _afterPaginatorElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPaginatorElChange");
java.lang.Object _afterPaginatorInstanceChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPaginatorInstanceChange");
java.lang.Object _afterPausedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPausedChange");
java.lang.Object _afterPausedLabelChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPausedLabelChange");
java.lang.Object _afterPlayingChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPlayingChange");
java.lang.Object _afterPlayingLabelChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPlayingLabelChange");
java.lang.Object _afterPreloadAllImagesChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPreloadAllImagesChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterRenderedChange");
java.lang.Object _afterRepeatChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterRepeatChange");
java.lang.Object _afterRequest = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterRequest");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterShimChange");
java.lang.Object _afterShowArrowsChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterShowArrowsChange");
java.lang.Object _afterShowCloseChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterShowCloseChange");
java.lang.Object _afterShowPlayerChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterShowPlayerChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterTabIndexChange");
java.lang.Object _afterToolbarChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterToolbarChange");
java.lang.Object _afterTotalLinksChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterTotalLinksChange");
java.lang.Object _afterUseOriginalImageChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterUseOriginalImageChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onAlignChange");
java.lang.Object _onAnim = (java.lang.Object)request.getAttribute("alloy:image-gallery:onAnim");
java.lang.Object _onAnimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onAnimChange");
java.lang.Object _onArrowLeftElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onArrowLeftElChange");
java.lang.Object _onArrowRightElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onArrowRightElChange");
java.lang.Object _onAutoPlayChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onAutoPlayChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onBoundingBoxChange");
java.lang.Object _onCaptionChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCaptionChange");
java.lang.Object _onCaptionElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCaptionElChange");
java.lang.Object _onCaptionFromTitleChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCaptionFromTitleChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCenteredChange");
java.lang.Object _onCloseElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCloseElChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCssClassChange");
java.lang.Object _onCurrentIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onCurrentIndexChange");
java.lang.Object _onDelayChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onDelayChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:image-gallery:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onIdChange");
java.lang.Object _onImageAnimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onImageAnimChange");
java.lang.Object _onImageChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onImageChange");
java.lang.Object _onInfoElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onInfoElChange");
java.lang.Object _onInfoTemplateChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onInfoTemplateChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:image-gallery:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onInitializedChange");
java.lang.Object _onLinksChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onLinksChange");
java.lang.Object _onLoad = (java.lang.Object)request.getAttribute("alloy:image-gallery:onLoad");
java.lang.Object _onLoaderChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onLoaderChange");
java.lang.Object _onLoadingChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onLoadingChange");
java.lang.Object _onLoadingElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onLoadingElChange");
java.lang.Object _onMaxHeightChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onMaxHeightChange");
java.lang.Object _onMaxWidthChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onMaxWidthChange");
java.lang.Object _onModalChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onModalChange");
java.lang.Object _onPaginatorChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPaginatorChange");
java.lang.Object _onPaginatorElChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPaginatorElChange");
java.lang.Object _onPaginatorInstanceChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPaginatorInstanceChange");
java.lang.Object _onPausedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPausedChange");
java.lang.Object _onPausedLabelChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPausedLabelChange");
java.lang.Object _onPlayingChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPlayingChange");
java.lang.Object _onPlayingLabelChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPlayingLabelChange");
java.lang.Object _onPreloadAllImagesChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPreloadAllImagesChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onRenderedChange");
java.lang.Object _onRepeatChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onRepeatChange");
java.lang.Object _onRequest = (java.lang.Object)request.getAttribute("alloy:image-gallery:onRequest");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onShimChange");
java.lang.Object _onShowArrowsChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onShowArrowsChange");
java.lang.Object _onShowCloseChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onShowCloseChange");
java.lang.Object _onShowPlayerChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onShowPlayerChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onTabIndexChange");
java.lang.Object _onToolbarChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onToolbarChange");
java.lang.Object _onTotalLinksChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onTotalLinksChange");
java.lang.Object _onUseOriginalImageChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onUseOriginalImageChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:image-gallery:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:image-gallery:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:image-gallery:onZIndexChange");
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