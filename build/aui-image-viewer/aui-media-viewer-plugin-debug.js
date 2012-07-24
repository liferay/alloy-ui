AUI.add('aui-media-viewer-plugin', function(A) {
/**
 * The ImageViewer Media Plugin
 *
 * @module aui-media-viewer-plugin
 */

var Lang = A.Lang,
	Do = A.Do,
	IE = A.UA.ie,

	STR_ABOUT_BLANK = 'about:blank',
	STR_BODY = 'body',
	STR_HREF = 'href',
	STR_IFRAME = 'iframe',
	STR_IMAGE = 'image',
	STR_LOADING = 'loading',
	STR_PROVIDERS = 'providers',
	STR_SRC = 'src',

	NAME = 'mediaViewerPlugin',

	DATA_OPTIONS = 'data-options',

	DEFAULT_OPTIONS = {
		height: 360,
		width: 640,
		wmode: 'embed'
	},

	REGEX_DOMAIN = 'https?://(?:www\\.)?{domain}',

	REGEX_PARAM = '(?:[\\?&]|^){param}=([^&#]*)';

var MediaViewerPlugin = A.Component.create(
	{
		NAME: NAME,
		NS: 'media',

		ATTRS: {
			providers: {
				validator: Lang.isObject,
				value: {
					'flash': {
						container: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" /><embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
						matcher: /\b.swf\b/i,
						options: DEFAULT_OPTIONS,
						mediaRegex: /([^?&#]+)/
					},
					'youtube': {
						container: '<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" frameborder="0" allowfullscreen></iframe>',
						matcher: new RegExp(
							Lang.sub(
								REGEX_DOMAIN,
								{
									domain: 'youtube.com'
								}
							),
							'i'
						),
						options: DEFAULT_OPTIONS,
						mediaRegex: /[\?&]v=([^&#]*)/i
					},
					'vimeo': {
						container: '<iframe src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="{width}" height="{height}" frameborder="0"></iframe>',
						matcher: new RegExp(
							Lang.sub(
								REGEX_DOMAIN,
								{
									domain: 'vimeo.com'
								}
							),
							'i'
						),
						options: DEFAULT_OPTIONS,
						mediaRegex: /\/(\d+)/
					}
				}
			}
		},

		EXTENDS: A.Plugin.Base,

		prototype: {
			initializer: function(config) {
				var instance = this;

				var handles = instance._handles;

				handles.changeReqeust = instance.afterHostMethod('_changeRequest', instance._restoreMedia);
				handles.close = instance.beforeHostMethod('close', instance.close);
				handles.loadMedia = instance.beforeHostMethod('loadImage', instance.loadMedia);
				handles.preloadImage = instance.beforeHostMethod('preloadImage', instance.preloadImage);
			},

			close: function() {
				var instance = this;

				var host = instance.get('host');

				var source = host.getCurrentLink();

				var mediaType = instance._getMediaType(source.attr('href'));

				if (mediaType != STR_IMAGE) {
					instance._redirectIframe(STR_ABOUT_BLANK);

					host.setStdModContent(STR_BODY, '');
				}
			},

			loadMedia: function(linkHref) {
				var instance = this;

				var host = instance.get('host');

				var mediaType = instance._getMediaType(linkHref);

				var result = true;

				instance._redirectIframe(STR_ABOUT_BLANK);

				if (mediaType != STR_IMAGE) {
					var providers = instance.get(STR_PROVIDERS)[mediaType];

					var source = host.getCurrentLink();

					var options = instance._updateOptions(
						source,
						A.clone(providers.options)
					);

					var media = providers.mediaRegex.exec(linkHref);

					if (media) {
						options.media = media[1];
					}

					var container = Lang.sub(
						providers.container,
						options
					);

					host.setStdModContent(STR_BODY, container);

					host._syncImageViewerUI();

					instance._uiSetContainerSize(options.width, options.height);

					host._setAlignCenter(true);

					host.set(STR_LOADING, false);

					host.fire(
						'load',
						{
							media: media
						}
					);

					if (host.get('preloadNeighborImages')) {
						var currentIndex = host.get('currentIndex');

						host.preloadImage(currentIndex + 1);
						host.preloadImage(currentIndex - 1);
					}

					result = new Do.Prevent();
				}

				return result;
			},

			preloadImage: function(index) {
				var instance = this;

				var host = instance.get('host');

				var currentLink = host.getLink(index);

				var result = new Do.Prevent();

				if (currentLink) {
					var linkHref = currentLink.attr(STR_HREF);

					var mediaType = instance._getMediaType(linkHref);

					if (mediaType == STR_IMAGE) {
						result = true;
					}
				}

				return result;
			},

			_getMediaType: function(source) {
				var instance = this;

				var providers = instance.get(STR_PROVIDERS);

				var mediaType = STR_IMAGE;

				A.some(
					providers,
					function(value, key, collection) {
						return value.matcher.test(source) && (mediaType = key);
					}
				);

				return mediaType;
			},

			_redirectIframe: function(source) {
				var instance = this;

				var bodyNode = instance.get('host.bodyNode');

				if (bodyNode) {
					var iframe = bodyNode.one(STR_IFRAME);

					if (iframe) {
						iframe.attr(STR_SRC, source);
					}
				}
			},

			_restoreMedia: function(event) {
				var instance = this;

				var host = instance.get('host');

				var source = host.getCurrentLink();

				var href = source.attr('href');

				var mediaType = instance._getMediaType(href);

				if (mediaType != STR_IMAGE && !host.getStdModNode(STR_BODY).html()) {
					host._processChangeRequest();
				}
			},

			_uiSetContainerSize: function(width, height) {
				var instance = this;

				var host = instance.get('host');

				var bodyNode = host.bodyNode;

				bodyNode.setStyles(
					{
						height: height,
						width: width
					}
				);
			},

			_updateOptions: function(source, options) {
				var dataOptions = source.attr(DATA_OPTIONS);
				var linkHref = source.attr(STR_HREF);

				A.each(
					options,
					function(value, key, collection) {
						var regexParam = new RegExp(
							Lang.sub(
								REGEX_PARAM,
								{
									param: key
								}
							)
						);

						var result = regexParam.exec(dataOptions) || regexParam.exec(linkHref);

						if (result) {
							options[key] = result[1];
						}
					}
				);

				return options;
			},

			_handles: {}
		},

		DATA_OPTIONS: DATA_OPTIONS,

		DEFAULT_OPTIONS: DEFAULT_OPTIONS,

		REGEX_DOMAIN: REGEX_DOMAIN,
		REGEX_PARAM: REGEX_PARAM
	}
);

A.MediaViewerPlugin = MediaViewerPlugin;

A.MediaViewer = A.ImageViewer;

}, '@VERSION@' ,{requires:['aui-image-viewer-base'], skinnable:false});
