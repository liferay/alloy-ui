/**
 * The ImageViewer Media Plugin
 *
 * @module aui-media-viewer-plugin
 */

var Lang = A.Lang,
    Do = A.Do,

    CSS_IMAGE_VIEWER_IMAGE = A.getClassName('image', 'viewer', 'image'),
    CSS_IMAGE_VIEWER_LOADING = A.getClassName('image', 'viewer', 'loading'),

    DEFAULT_OPTIONS = {
        height: 360,
        width: 640,
        wmode: 'embed'
    },

    REGEX_DOMAIN = 'https?://(?:www\\.)?{domain}',

    REGEX_PARAM = '(?:[\\?&]|^){param}=([^&#]*)';

/**
 * A base class for `A.MediaViewerPlugin`.
 *
 * Check the [live demo](http://alloyui.com/examples/image-viewer/).
 *
 * @class A.MediaViewerPlugin
 * @extends Plugin.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var MediaViewerPlugin = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'mediaViewerPlugin',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: 'media',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.MediaViewerPlugin`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Contains the templates, options and definitions for each provider
         * (Flash, Youtube, Vimeo).
         *
         * @attribute providers
         * @type Object
         */
        providers: {
            validator: Lang.isObject,
            value: {
                'flash': {
                    container: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
                        'width="{width}" height="{height}"><param name="wmode" value="{wmode}" />' +
                        '<param name="allowfullscreen" value="true" />' +
                        '<param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" />' +
                        '<embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true"' +
                        ' allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}">' +
                        '</embed></object>',
                    matcher: /\b.swf\b/i,
                    options: DEFAULT_OPTIONS,
                    mediaRegex: /([^?&#]+)/
                },
                'youtube': {
                    container: '<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" ' +
                        'frameborder="0" allowfullscreen></iframe>',
                    matcher: new RegExp(
                        Lang.sub(
                            REGEX_DOMAIN, {
                                domain: 'youtube.com'
                            }
                        ),
                        'i'
                    ),
                    options: DEFAULT_OPTIONS,
                    mediaRegex: /[\?&]v=([^&#]*)/i
                },
                'vimeo': {
                    container: '<iframe ' +
                        'src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff"' +
                        ' width="{width}" height="{height}" frameborder="0"></iframe>',
                    matcher: new RegExp(
                        Lang.sub(
                            REGEX_DOMAIN, {
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

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Plugin.Base,

    prototype: {

        /**
         * Construction logic executed during `A.MediaViewerPlugin` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @param config
         * @protected
         */
        initializer: function() {
            var instance = this;

            var handles = instance._handles;

            handles._loadMedia = instance.beforeHostMethod('_loadImage', instance._loadMedia);
            handles._renderMedia = instance.beforeHostMethod('_renderImage', instance._renderMedia);
        },

        /**
         * Gets the media type from the `providers`.
         *
         * @method _getMediaType
         * @param source
         * @protected
         */
        _getMediaType: function(source) {
            var instance = this;

            var providers = instance.get('providers');

            var mediaType = 'image';

            A.some(
                providers,
                function(value, key) {
                    return value.matcher.test(source) && (mediaType = key);
                }
            );

            return mediaType;
        },

        /**
         * If the media in the specified index is an image, this will defer to
         * the host's _loadImage default behavior. Otherwise, _loadMedia will be
         * prevented and the media node will be loaded by this function instead.
         *
         * @method _loadMedia
         * @param {Number} index The index of the image to load.
         * @protected
         */
        _loadMedia: function(index) {
            var host = this.get('host'),
                container = host._getCurrentImageContainer(),
                link = host.get('links').item(index),
                linkHref = link.getAttribute('href'),
                media,
                mediaNode,
                mediaType = this._getMediaType(linkHref),
                options,
                provider;

            if (mediaType !== 'image') {
                mediaNode = host._getCurrentImage();
                if (!mediaNode) {
                    provider = this.get('providers')[mediaType];
                    options = this._updateOptions(
                        link,
                        A.clone(provider.options)
                    );

                    media = provider.mediaRegex.exec(linkHref);
                    if (media) {
                        options.media = media[1];
                    }

                    mediaNode = A.Node.create(Lang.sub(
                        provider.container,
                        options
                    ));
                    mediaNode.addClass(CSS_IMAGE_VIEWER_IMAGE);

                    mediaNode.setData('loaded', true);
                    container.removeClass(CSS_IMAGE_VIEWER_LOADING);

                    container.prepend(mediaNode);
                }

                return new Do.Prevent();
            }
        },

        /**
         * If the media in the specified index is an image, this will defer to
         * the host's _renderImage default behavior. Otherwise, _renderImage will
         * be prevented, as the media node should only be rendered when it's loaded
         * for the first time (on _loadMedia).
         *
         * @method _renderMedia
         * @param {Number} index The index of the media to be loaded.
         * @protected
         */
        _renderMedia: function(index) {
            var host = this.get('host'),
                link = host.get('links').item(index),
                linkHref = link.getAttribute('href');

            if (this._getMediaType(linkHref) !== 'image') {
                return new Do.Prevent();
            }
        },

        /**
         * Goes through the options and update its value.
         *
         * @method _updateOptions
         * @param source
         * @param options
         * @protected
         */
        _updateOptions: function(source, options) {
            var dataOptions = source.attr('data-options');
            var linkHref = source.attr('href');

            A.each(
                options,
                function(value, key) {
                    var regexParam = new RegExp(
                        Lang.sub(
                            REGEX_PARAM, {
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

    DATA_OPTIONS: 'data-options',

    DEFAULT_OPTIONS: DEFAULT_OPTIONS,

    REGEX_DOMAIN: REGEX_DOMAIN,
    REGEX_PARAM: REGEX_PARAM
});

A.MediaViewerPlugin = MediaViewerPlugin;

A.MediaViewer = A.ImageViewer;
