<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:image-gallery:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:image-gallery:scopedAttributes");

java.lang.Boolean _anim = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:anim");
java.lang.String _arrowLeftEl = (java.lang.String)request.getAttribute("alloy:image-gallery:arrowLeftEl");
java.lang.String _arrowRightEl = (java.lang.String)request.getAttribute("alloy:image-gallery:arrowRightEl");
java.lang.Boolean _autoPlay = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:autoPlay");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:image-gallery:boundingBox");
java.lang.String _caption = (java.lang.String)request.getAttribute("alloy:image-gallery:caption");
java.lang.String _captionEl = (java.lang.String)request.getAttribute("alloy:image-gallery:captionEl");
java.lang.Boolean _captionFromTitle = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:captionFromTitle");
java.lang.Boolean _centered = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:centered");
java.lang.String _closeEl = (java.lang.String)request.getAttribute("alloy:image-gallery:closeEl");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:image-gallery:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:image-gallery:cssClass");
java.lang.Number _currentIndex = (java.lang.Number)request.getAttribute("alloy:image-gallery:currentIndex");
java.lang.Number _delay = (java.lang.Number)request.getAttribute("alloy:image-gallery:delay");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:disabled");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:image-gallery:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:image-gallery:hideClass");
java.lang.String _imagegalleryId = (java.lang.String)request.getAttribute("alloy:image-gallery:imagegalleryId");
java.lang.String _image = (java.lang.String)request.getAttribute("alloy:image-gallery:image");
java.lang.Object _imageAnim = (java.lang.Object)request.getAttribute("alloy:image-gallery:imageAnim");
java.lang.String _infoEl = (java.lang.String)request.getAttribute("alloy:image-gallery:infoEl");
java.lang.String _infoTemplate = (java.lang.String)request.getAttribute("alloy:image-gallery:infoTemplate");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:initialized");
java.lang.String _links = (java.lang.String)request.getAttribute("alloy:image-gallery:links");
java.lang.String _loader = (java.lang.String)request.getAttribute("alloy:image-gallery:loader");
java.lang.Boolean _loading = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:loading");
java.lang.String _loadingEl = (java.lang.String)request.getAttribute("alloy:image-gallery:loadingEl");
java.lang.Number _maxHeight = (java.lang.Number)request.getAttribute("alloy:image-gallery:maxHeight");
java.lang.Number _maxWidth = (java.lang.Number)request.getAttribute("alloy:image-gallery:maxWidth");
java.lang.String _modal = (java.lang.String)request.getAttribute("alloy:image-gallery:modal");
java.lang.Object _paginator = (java.lang.Object)request.getAttribute("alloy:image-gallery:paginator");
java.lang.String _paginatorEl = (java.lang.String)request.getAttribute("alloy:image-gallery:paginatorEl");
java.lang.String _paginatorInstance = (java.lang.String)request.getAttribute("alloy:image-gallery:paginatorInstance");
java.lang.Boolean _paused = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:paused");
java.lang.String _pausedLabel = (java.lang.String)request.getAttribute("alloy:image-gallery:pausedLabel");
java.lang.Boolean _playing = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:playing");
java.lang.String _playingLabel = (java.lang.String)request.getAttribute("alloy:image-gallery:playingLabel");
java.lang.Boolean _preloadAllImages = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:preloadAllImages");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:rendered");
java.lang.Boolean _repeat = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:repeat");
java.lang.Boolean _showArrows = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:showArrows");
java.lang.Boolean _showClose = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:showClose");
java.lang.Boolean _showPlayer = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:showPlayer");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:image-gallery:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:image-gallery:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:image-gallery:tabIndex");
java.lang.String _toolbar = (java.lang.String)request.getAttribute("alloy:image-gallery:toolbar");
java.lang.Boolean _totalLinks = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:totalLinks");
java.lang.Boolean _useOriginalImage = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:useOriginalImage");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:image-gallery:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:image-gallery:width");
java.lang.String _afterAnim = (java.lang.String)request.getAttribute("alloy:image-gallery:afterAnim");
java.lang.String _afterAnimChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterAnimChange");
java.lang.String _afterArrowLeftElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterArrowLeftElChange");
java.lang.String _afterArrowRightElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterArrowRightElChange");
java.lang.String _afterAutoPlayChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterAutoPlayChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterBoundingBoxChange");
java.lang.String _afterCaptionChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionChange");
java.lang.String _afterCaptionElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionElChange");
java.lang.String _afterCaptionFromTitleChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCaptionFromTitleChange");
java.lang.String _afterCenteredChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCenteredChange");
java.lang.String _afterCloseElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCloseElChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCssClassChange");
java.lang.String _afterCurrentIndexChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterCurrentIndexChange");
java.lang.String _afterDelayChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterDelayChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:image-gallery:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterDisabledChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterHideClassChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterIdChange");
java.lang.String _afterImageAnimChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterImageAnimChange");
java.lang.String _afterImageChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterImageChange");
java.lang.String _afterInfoElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterInfoElChange");
java.lang.String _afterInfoTemplateChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterInfoTemplateChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:image-gallery:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterInitializedChange");
java.lang.String _afterLinksChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterLinksChange");
java.lang.String _afterLoad = (java.lang.String)request.getAttribute("alloy:image-gallery:afterLoad");
java.lang.String _afterLoaderChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterLoaderChange");
java.lang.String _afterLoadingChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterLoadingChange");
java.lang.String _afterLoadingElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterLoadingElChange");
java.lang.String _afterMaxHeightChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterMaxHeightChange");
java.lang.String _afterMaxWidthChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterMaxWidthChange");
java.lang.String _afterModalChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterModalChange");
java.lang.String _afterPaginatorChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorChange");
java.lang.String _afterPaginatorElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorElChange");
java.lang.String _afterPaginatorInstanceChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPaginatorInstanceChange");
java.lang.String _afterPausedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPausedChange");
java.lang.String _afterPausedLabelChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPausedLabelChange");
java.lang.String _afterPlayingChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPlayingChange");
java.lang.String _afterPlayingLabelChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPlayingLabelChange");
java.lang.String _afterPreloadAllImagesChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterPreloadAllImagesChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterRenderedChange");
java.lang.String _afterRepeatChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterRepeatChange");
java.lang.String _afterRequest = (java.lang.String)request.getAttribute("alloy:image-gallery:afterRequest");
java.lang.String _afterShowArrowsChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterShowArrowsChange");
java.lang.String _afterShowCloseChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterShowCloseChange");
java.lang.String _afterShowPlayerChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterShowPlayerChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterTabIndexChange");
java.lang.String _afterToolbarChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterToolbarChange");
java.lang.String _afterTotalLinksChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterTotalLinksChange");
java.lang.String _afterUseOriginalImageChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterUseOriginalImageChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:image-gallery:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:image-gallery:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:image-gallery:afterWidthChange");
java.lang.String _onAnim = (java.lang.String)request.getAttribute("alloy:image-gallery:onAnim");
java.lang.String _onAnimChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onAnimChange");
java.lang.String _onArrowLeftElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onArrowLeftElChange");
java.lang.String _onArrowRightElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onArrowRightElChange");
java.lang.String _onAutoPlayChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onAutoPlayChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onBoundingBoxChange");
java.lang.String _onCaptionChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionChange");
java.lang.String _onCaptionElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionElChange");
java.lang.String _onCaptionFromTitleChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCaptionFromTitleChange");
java.lang.String _onCenteredChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCenteredChange");
java.lang.String _onCloseElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCloseElChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCssClassChange");
java.lang.String _onCurrentIndexChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onCurrentIndexChange");
java.lang.String _onDelayChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onDelayChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:image-gallery:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onDisabledChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onHideClassChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onIdChange");
java.lang.String _onImageAnimChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onImageAnimChange");
java.lang.String _onImageChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onImageChange");
java.lang.String _onInfoElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onInfoElChange");
java.lang.String _onInfoTemplateChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onInfoTemplateChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:image-gallery:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onInitializedChange");
java.lang.String _onLinksChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onLinksChange");
java.lang.String _onLoad = (java.lang.String)request.getAttribute("alloy:image-gallery:onLoad");
java.lang.String _onLoaderChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onLoaderChange");
java.lang.String _onLoadingChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onLoadingChange");
java.lang.String _onLoadingElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onLoadingElChange");
java.lang.String _onMaxHeightChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onMaxHeightChange");
java.lang.String _onMaxWidthChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onMaxWidthChange");
java.lang.String _onModalChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onModalChange");
java.lang.String _onPaginatorChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorChange");
java.lang.String _onPaginatorElChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorElChange");
java.lang.String _onPaginatorInstanceChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPaginatorInstanceChange");
java.lang.String _onPausedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPausedChange");
java.lang.String _onPausedLabelChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPausedLabelChange");
java.lang.String _onPlayingChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPlayingChange");
java.lang.String _onPlayingLabelChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPlayingLabelChange");
java.lang.String _onPreloadAllImagesChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onPreloadAllImagesChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onRenderedChange");
java.lang.String _onRepeatChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onRepeatChange");
java.lang.String _onRequest = (java.lang.String)request.getAttribute("alloy:image-gallery:onRequest");
java.lang.String _onShowArrowsChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onShowArrowsChange");
java.lang.String _onShowCloseChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onShowCloseChange");
java.lang.String _onShowPlayerChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onShowPlayerChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onTabIndexChange");
java.lang.String _onToolbarChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onToolbarChange");
java.lang.String _onTotalLinksChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onTotalLinksChange");
java.lang.String _onUseOriginalImageChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onUseOriginalImageChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:image-gallery:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:image-gallery:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:image-gallery:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_anim != null) {
	scopedAttributes.put("anim", _anim);
}

if (_arrowLeftEl != null) {
	scopedAttributes.put("arrowLeftEl", _arrowLeftEl);
}

if (_arrowRightEl != null) {
	scopedAttributes.put("arrowRightEl", _arrowRightEl);
}

if (_autoPlay != null) {
	scopedAttributes.put("autoPlay", _autoPlay);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_caption != null) {
	scopedAttributes.put("caption", _caption);
}

if (_captionEl != null) {
	scopedAttributes.put("captionEl", _captionEl);
}

if (_captionFromTitle != null) {
	scopedAttributes.put("captionFromTitle", _captionFromTitle);
}

if (_centered != null) {
	scopedAttributes.put("centered", _centered);
}

if (_closeEl != null) {
	scopedAttributes.put("closeEl", _closeEl);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_currentIndex != null) {
	scopedAttributes.put("currentIndex", _currentIndex);
}

if (_delay != null) {
	scopedAttributes.put("delay", _delay);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_imagegalleryId != null) {
	scopedAttributes.put("imagegalleryId", _imagegalleryId);
}

if (_image != null) {
	scopedAttributes.put("image", _image);
}

if (_imageAnim != null) {
	scopedAttributes.put("imageAnim", _imageAnim);
}

if (_infoEl != null) {
	scopedAttributes.put("infoEl", _infoEl);
}

if (_infoTemplate != null) {
	scopedAttributes.put("infoTemplate", _infoTemplate);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_links != null) {
	scopedAttributes.put("links", _links);
}

if (_loader != null) {
	scopedAttributes.put("loader", _loader);
}

if (_loading != null) {
	scopedAttributes.put("loading", _loading);
}

if (_loadingEl != null) {
	scopedAttributes.put("loadingEl", _loadingEl);
}

if (_maxHeight != null) {
	scopedAttributes.put("maxHeight", _maxHeight);
}

if (_maxWidth != null) {
	scopedAttributes.put("maxWidth", _maxWidth);
}

if (_modal != null) {
	scopedAttributes.put("modal", _modal);
}

if (_paginator != null) {
	scopedAttributes.put("paginator", _paginator);
}

if (_paginatorEl != null) {
	scopedAttributes.put("paginatorEl", _paginatorEl);
}

if (_paginatorInstance != null) {
	scopedAttributes.put("paginatorInstance", _paginatorInstance);
}

if (_paused != null) {
	scopedAttributes.put("paused", _paused);
}

if (_pausedLabel != null) {
	scopedAttributes.put("pausedLabel", _pausedLabel);
}

if (_playing != null) {
	scopedAttributes.put("playing", _playing);
}

if (_playingLabel != null) {
	scopedAttributes.put("playingLabel", _playingLabel);
}

if (_preloadAllImages != null) {
	scopedAttributes.put("preloadAllImages", _preloadAllImages);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_repeat != null) {
	scopedAttributes.put("repeat", _repeat);
}

if (_showArrows != null) {
	scopedAttributes.put("showArrows", _showArrows);
}

if (_showClose != null) {
	scopedAttributes.put("showClose", _showClose);
}

if (_showPlayer != null) {
	scopedAttributes.put("showPlayer", _showPlayer);
}

if (_srcNode != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_toolbar != null) {
	scopedAttributes.put("toolbar", _toolbar);
}

if (_totalLinks != null) {
	scopedAttributes.put("totalLinks", _totalLinks);
}

if (_useOriginalImage != null) {
	scopedAttributes.put("useOriginalImage", _useOriginalImage);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_afterAnim != null) {
	scopedAttributes.put("afterAnim", _afterAnim);
}

if (_afterAnimChange != null) {
	scopedAttributes.put("afterAnimChange", _afterAnimChange);
}

if (_afterArrowLeftElChange != null) {
	scopedAttributes.put("afterArrowLeftElChange", _afterArrowLeftElChange);
}

if (_afterArrowRightElChange != null) {
	scopedAttributes.put("afterArrowRightElChange", _afterArrowRightElChange);
}

if (_afterAutoPlayChange != null) {
	scopedAttributes.put("afterAutoPlayChange", _afterAutoPlayChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCaptionChange != null) {
	scopedAttributes.put("afterCaptionChange", _afterCaptionChange);
}

if (_afterCaptionElChange != null) {
	scopedAttributes.put("afterCaptionElChange", _afterCaptionElChange);
}

if (_afterCaptionFromTitleChange != null) {
	scopedAttributes.put("afterCaptionFromTitleChange", _afterCaptionFromTitleChange);
}

if (_afterCenteredChange != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (_afterCloseElChange != null) {
	scopedAttributes.put("afterCloseElChange", _afterCloseElChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (_afterCurrentIndexChange != null) {
	scopedAttributes.put("afterCurrentIndexChange", _afterCurrentIndexChange);
}

if (_afterDelayChange != null) {
	scopedAttributes.put("afterDelayChange", _afterDelayChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDisabledChange != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterHideClassChange != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (_afterIdChange != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (_afterImageAnimChange != null) {
	scopedAttributes.put("afterImageAnimChange", _afterImageAnimChange);
}

if (_afterImageChange != null) {
	scopedAttributes.put("afterImageChange", _afterImageChange);
}

if (_afterInfoElChange != null) {
	scopedAttributes.put("afterInfoElChange", _afterInfoElChange);
}

if (_afterInfoTemplateChange != null) {
	scopedAttributes.put("afterInfoTemplateChange", _afterInfoTemplateChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterLinksChange != null) {
	scopedAttributes.put("afterLinksChange", _afterLinksChange);
}

if (_afterLoad != null) {
	scopedAttributes.put("afterLoad", _afterLoad);
}

if (_afterLoaderChange != null) {
	scopedAttributes.put("afterLoaderChange", _afterLoaderChange);
}

if (_afterLoadingChange != null) {
	scopedAttributes.put("afterLoadingChange", _afterLoadingChange);
}

if (_afterLoadingElChange != null) {
	scopedAttributes.put("afterLoadingElChange", _afterLoadingElChange);
}

if (_afterMaxHeightChange != null) {
	scopedAttributes.put("afterMaxHeightChange", _afterMaxHeightChange);
}

if (_afterMaxWidthChange != null) {
	scopedAttributes.put("afterMaxWidthChange", _afterMaxWidthChange);
}

if (_afterModalChange != null) {
	scopedAttributes.put("afterModalChange", _afterModalChange);
}

if (_afterPaginatorChange != null) {
	scopedAttributes.put("afterPaginatorChange", _afterPaginatorChange);
}

if (_afterPaginatorElChange != null) {
	scopedAttributes.put("afterPaginatorElChange", _afterPaginatorElChange);
}

if (_afterPaginatorInstanceChange != null) {
	scopedAttributes.put("afterPaginatorInstanceChange", _afterPaginatorInstanceChange);
}

if (_afterPausedChange != null) {
	scopedAttributes.put("afterPausedChange", _afterPausedChange);
}

if (_afterPausedLabelChange != null) {
	scopedAttributes.put("afterPausedLabelChange", _afterPausedLabelChange);
}

if (_afterPlayingChange != null) {
	scopedAttributes.put("afterPlayingChange", _afterPlayingChange);
}

if (_afterPlayingLabelChange != null) {
	scopedAttributes.put("afterPlayingLabelChange", _afterPlayingLabelChange);
}

if (_afterPreloadAllImagesChange != null) {
	scopedAttributes.put("afterPreloadAllImagesChange", _afterPreloadAllImagesChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterRepeatChange != null) {
	scopedAttributes.put("afterRepeatChange", _afterRepeatChange);
}

if (_afterRequest != null) {
	scopedAttributes.put("afterRequest", _afterRequest);
}

if (_afterShowArrowsChange != null) {
	scopedAttributes.put("afterShowArrowsChange", _afterShowArrowsChange);
}

if (_afterShowCloseChange != null) {
	scopedAttributes.put("afterShowCloseChange", _afterShowCloseChange);
}

if (_afterShowPlayerChange != null) {
	scopedAttributes.put("afterShowPlayerChange", _afterShowPlayerChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterToolbarChange != null) {
	scopedAttributes.put("afterToolbarChange", _afterToolbarChange);
}

if (_afterTotalLinksChange != null) {
	scopedAttributes.put("afterTotalLinksChange", _afterTotalLinksChange);
}

if (_afterUseOriginalImageChange != null) {
	scopedAttributes.put("afterUseOriginalImageChange", _afterUseOriginalImageChange);
}

if (_afterVisibleChange != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (_afterContentUpdate != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (_afterRender != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (_afterWidthChange != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (_onAnim != null) {
	scopedAttributes.put("onAnim", _onAnim);
}

if (_onAnimChange != null) {
	scopedAttributes.put("onAnimChange", _onAnimChange);
}

if (_onArrowLeftElChange != null) {
	scopedAttributes.put("onArrowLeftElChange", _onArrowLeftElChange);
}

if (_onArrowRightElChange != null) {
	scopedAttributes.put("onArrowRightElChange", _onArrowRightElChange);
}

if (_onAutoPlayChange != null) {
	scopedAttributes.put("onAutoPlayChange", _onAutoPlayChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCaptionChange != null) {
	scopedAttributes.put("onCaptionChange", _onCaptionChange);
}

if (_onCaptionElChange != null) {
	scopedAttributes.put("onCaptionElChange", _onCaptionElChange);
}

if (_onCaptionFromTitleChange != null) {
	scopedAttributes.put("onCaptionFromTitleChange", _onCaptionFromTitleChange);
}

if (_onCenteredChange != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (_onCloseElChange != null) {
	scopedAttributes.put("onCloseElChange", _onCloseElChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (_onCurrentIndexChange != null) {
	scopedAttributes.put("onCurrentIndexChange", _onCurrentIndexChange);
}

if (_onDelayChange != null) {
	scopedAttributes.put("onDelayChange", _onDelayChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDisabledChange != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onHideClassChange != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (_onIdChange != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (_onImageAnimChange != null) {
	scopedAttributes.put("onImageAnimChange", _onImageAnimChange);
}

if (_onImageChange != null) {
	scopedAttributes.put("onImageChange", _onImageChange);
}

if (_onInfoElChange != null) {
	scopedAttributes.put("onInfoElChange", _onInfoElChange);
}

if (_onInfoTemplateChange != null) {
	scopedAttributes.put("onInfoTemplateChange", _onInfoTemplateChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onLinksChange != null) {
	scopedAttributes.put("onLinksChange", _onLinksChange);
}

if (_onLoad != null) {
	scopedAttributes.put("onLoad", _onLoad);
}

if (_onLoaderChange != null) {
	scopedAttributes.put("onLoaderChange", _onLoaderChange);
}

if (_onLoadingChange != null) {
	scopedAttributes.put("onLoadingChange", _onLoadingChange);
}

if (_onLoadingElChange != null) {
	scopedAttributes.put("onLoadingElChange", _onLoadingElChange);
}

if (_onMaxHeightChange != null) {
	scopedAttributes.put("onMaxHeightChange", _onMaxHeightChange);
}

if (_onMaxWidthChange != null) {
	scopedAttributes.put("onMaxWidthChange", _onMaxWidthChange);
}

if (_onModalChange != null) {
	scopedAttributes.put("onModalChange", _onModalChange);
}

if (_onPaginatorChange != null) {
	scopedAttributes.put("onPaginatorChange", _onPaginatorChange);
}

if (_onPaginatorElChange != null) {
	scopedAttributes.put("onPaginatorElChange", _onPaginatorElChange);
}

if (_onPaginatorInstanceChange != null) {
	scopedAttributes.put("onPaginatorInstanceChange", _onPaginatorInstanceChange);
}

if (_onPausedChange != null) {
	scopedAttributes.put("onPausedChange", _onPausedChange);
}

if (_onPausedLabelChange != null) {
	scopedAttributes.put("onPausedLabelChange", _onPausedLabelChange);
}

if (_onPlayingChange != null) {
	scopedAttributes.put("onPlayingChange", _onPlayingChange);
}

if (_onPlayingLabelChange != null) {
	scopedAttributes.put("onPlayingLabelChange", _onPlayingLabelChange);
}

if (_onPreloadAllImagesChange != null) {
	scopedAttributes.put("onPreloadAllImagesChange", _onPreloadAllImagesChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onRepeatChange != null) {
	scopedAttributes.put("onRepeatChange", _onRepeatChange);
}

if (_onRequest != null) {
	scopedAttributes.put("onRequest", _onRequest);
}

if (_onShowArrowsChange != null) {
	scopedAttributes.put("onShowArrowsChange", _onShowArrowsChange);
}

if (_onShowCloseChange != null) {
	scopedAttributes.put("onShowCloseChange", _onShowCloseChange);
}

if (_onShowPlayerChange != null) {
	scopedAttributes.put("onShowPlayerChange", _onShowPlayerChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onToolbarChange != null) {
	scopedAttributes.put("onToolbarChange", _onToolbarChange);
}

if (_onTotalLinksChange != null) {
	scopedAttributes.put("onTotalLinksChange", _onTotalLinksChange);
}

if (_onUseOriginalImageChange != null) {
	scopedAttributes.put("onUseOriginalImageChange", _onUseOriginalImageChange);
}

if (_onVisibleChange != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (_onContentUpdate != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (_onRender != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (_onWidthChange != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>