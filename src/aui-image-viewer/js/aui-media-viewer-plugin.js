/**
 * The ImageViewer Media Plugin
 *
 * @module aui-media-viewer-plugin
 */

var Lang = A.Lang,
	Do = A.Do,

	BODY = 'body',
	HREF = 'href',
	IMAGE = 'image',
	LOADING = 'loading',
	PROVIDERS = 'providers',
	NAME = 'mediaViewerPlugin',
	PX = 'px';

var MediaViewerPlugin = function(config) {
	var instance = this;

    MediaViewerPlugin.superclass.constructor.apply(instance, arguments);
};

MediaViewerPlugin.DATA_OPTIONS = 'data-options';

MediaViewerPlugin.DEFAULT_OPTIONS = {
	height: 360,
	width: 640,
	wmode: 'embed'
};

MediaViewerPlugin.REGEX_DOMAIN = 'https?://(?:www\\.)?{domain}';
MediaViewerPlugin.REGEX_PARAM = "(?:[\\?&]|^){param}=([^&#]*)";

var DATA_OPTIONS = MediaViewerPlugin.DATA_OPTIONS;
var DEFAULT_OPTIONS = MediaViewerPlugin.DEFAULT_OPTIONS;
var REGEX_DOMAIN = MediaViewerPlugin.REGEX_DOMAIN;
var REGEX_PARAM = MediaViewerPlugin.REGEX_PARAM;

MediaViewerPlugin.NAME = NAME;
MediaViewerPlugin.NS = 'media';

MediaViewerPlugin.ATTRS = {
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
					A.substitute(
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
					A.substitute(
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
};

A.extend(MediaViewerPlugin, A.Plugin.Base, {
	initializer: function(config) {
		var instance = this;

		var handles = instance._handles;

		handles['loadMedia'] = instance.beforeHostMethod('loadImage', instance.loadMedia);
		handles['preloadImage'] = instance.beforeHostMethod('preloadImage', instance.preloadImage);
	},

	loadMedia: function(linkHref) {
		var instance = this;

		var host = instance.get('host');

		var mediaType = instance._getMediaType(linkHref);

		var result = true;

		if (mediaType != IMAGE) {
			var providers = instance.get(PROVIDERS)[mediaType];

			var source = host.getCurrentLink();

			var options = instance._updateOptions(
				source,
				A.clone(providers.options)
			);

			var media = providers.mediaRegex.exec(linkHref);

			if (media) {
				options.media = media[1];
			}

			var container = A.substitute(
				providers.container,
				options
			);

			host.setStdModContent(BODY, container);

			host._syncImageViewerUI();

			instance._uiSetContainerSize(options.width, options.height);

			host._setAlignCenter(true);

			host.set(LOADING, false);

			instance.fire(
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
			var linkHref = currentLink.attr(HREF);

			var mediaType = instance._getMediaType(linkHref);

			if (mediaType == IMAGE) {
				result = true;
			}
		}

		return result;
	},

	_getMediaType: function(source) {
		var instance = this;

		var providers = instance.get(PROVIDERS);

		var mediaType = IMAGE;

		A.some(
			providers,
			function(value, key, collection) {
				return value.matcher.test(source) && (mediaType = key);
			}
		);

		return mediaType;
	},

	_uiSetContainerSize: function(width, height) {
		var instance = this;

		var host = instance.get('host');

		var bodyNode = host.bodyNode;

		bodyNode.setStyles({
			height: height + PX,
			width: width + PX
		});
	},

	_updateOptions: function(source, options) {
		var dataOptions = source.attr(DATA_OPTIONS);
		var linkHref = source.attr(HREF);

		A.each(
			options,
			function(value, key, collection) {
				var regexParam = new RegExp(
					A.substitute(
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
});

A.MediaViewerPlugin = MediaViewerPlugin;

A.MediaViewer = A.ImageViewer;