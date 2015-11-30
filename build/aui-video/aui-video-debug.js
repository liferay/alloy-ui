YUI.add('aui-video', function (A, NAME) {

/**
 * The Video Component
 *
 * @module aui-video
 */

var Lang = A.Lang,
    UA = A.UA,
    getClassName = A.getClassName,

    CSS_VIDEO_NODE = getClassName('video', 'node'),

    DEFAULT_PLAYER_PATH = A.config.base + 'aui-video/assets/player.swf?t=' + Lang.now(),

    DOC = A.config.doc,

    TPL_VIDEO = '<video id="{id}" controls="controls" class="' + CSS_VIDEO_NODE + '" {height} {width}></video>',
    TPL_VIDEO_FALLBACK = '<div class="' + CSS_VIDEO_NODE + '"></div>';

/**
 * A base class for Video.
 *
 * Check the [live demo](http://alloyui.com/examples/video/).
 *
 * @class A.Video
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/video/basic-markup.html
 * @include http://alloyui.com/examples/video/basic.js
 */
var Video = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'video',

    /**
     * Static property used to define the default attribute
     * configuration for the Video.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The required Flash version for the swf player
         *
         * @attribute flashPlayerVersion
         * @default '9,0,0,0'
         * @type String
         */
        flashPlayerVersion: {
            validator: Lang.isString,
            value: '9,0,0,0'
        },

        /**
         * Variables used by Flash player.
         *
         * @attribute flashVars
         * @default {}
         * @type Object
         */
        flashVars: {
            value: {}
        },

        /**
         * An additional list of attributes.
         *
         * @attribute fixedAttributes
         * @default {}
         * @type Object
         */
        fixedAttributes: {
            value: {}
        },

        /**
         * URL (on .ogv format) used by Video to play.
         *
         * @attribute ogvUrl
         * @default ''
         * @type String
         */
        ogvUrl: {
            value: ''
        },

        /**
         * Image displayed before playback starts.
         *
         * @attribute poster
         * @default ''
         * @type String
         */
        poster: {
            value: ''
        },

        /**
         * If `true` the render phase will be automatically invoked
         * preventing the `.render()` manual call.
         *
         * @attribute render
         * @default true
         * @type Boolean
         */
        render: {
            value: true
        },

        /**
         * Sets the `aria-role` for Video.
         *
         * @attribute role
         * @default 'application'
         * @type String
         */
        role: {
            validator: Lang.isString,
            value: 'application',
            writeOnce: 'initOnly'
        },

        /**
         * URL (on .swf format) used by Video to create
         * a fallback player with Flash.
         *
         * @attribute swfUrl
         * @default aui-video/assets/player.swf
         * @type String
         */
        swfUrl: {
            value: DEFAULT_PLAYER_PATH
        },

        /**
         * URL used by Video to play.
         *
         * @attribute url
         * @default ''
         * @type String
         */
        url: {
            value: ''
        },

        /**
         * Boolean indicating if use of the WAI-ARIA Roles and States
         * should be enabled.
         *
         * @attribute useARIA
         * @default true
         * @type Boolean
         */
        useARIA: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: 'initOnly'
        }
    },

    /**
     * Static property used to define the attributes
     * for the bindUI lifecycle phase.
     *
     * @property BIND_UI_ATTRS
     * @type Array
     * @static
     */
    BIND_UI_ATTRS: ['url', 'poster', 'ogvUrl', 'swfUrl', 'fixedAttributes', 'flashVars'],

    /**
     * Static property used to define the attributes
     * for the syncUI lifecycle phase.
     *
     * @property SYNC_UI_ATTRS
     * @type Array
     * @static
     */
    SYNC_UI_ATTRS: ['url', 'poster', 'ogvUrl'],

    prototype: {

        /**
         * Render the Video component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderVideoTask = A.debounce(instance._renderVideo, 1, instance);
            instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

            instance._renderVideo(!instance.get('ogvUrl'));

            instance._video.on('play', function (event) {
                instance.fire('play', {
                    cropType: event.type
                });
            });
            instance._video.on('pause', function (event) {
                instance.fire('pause', {
                    cropType: event.type
                });
            });
        },

        /**
         * Bind the events on the Video UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.publish(
                'videoReady', {
                    fireOnce: true
                }
            );

            instance.publish('play');
            instance.publish('pause');
        },

        /**
         * Sync the Video UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            if (instance.get('useARIA')) {
                instance.plug(A.Plugin.Aria, {
                    roleName: instance.get('role'),
                    roleNode: instance.get('contentBox')
                });
            }
        },

        /**
         * Load video track.
         *
         * @method load
         */
        load: function() {
            var instance = this;

            if (instance._video.hasMethod('load')) {
                instance._video.invoke('load');
            }
        },

        /**
         * Pause video track.
         *
         * @method pause
         */
        pause: function() {
            var instance = this;

            if (instance._video.hasMethod('pause')) {
                instance._video.invoke('pause');
            }
        },

        /**
         * Play video track.
         *
         * @method play
         */
        play: function() {
            var instance = this;

            if (instance._video.hasMethod('play')) {
                instance._video.invoke('play');
            }
        },

        /**
         * Create `source` element
         * using passed type attribute.
         *
         * @method _createSource
         * @param type
         * @protected
         */
        _createSource: function(type) {
            var sourceNode = new A.Node(DOC.createElement('source'));

            sourceNode.attr('type', type);

            return sourceNode;
        },

        /**
         * Render SWF in DOM.
         *
         * @method _renderSwf
         * @protected
         */
        _renderSwf: function() {
            var instance = this;

            var swfUrl = instance.get('swfUrl');

            if (swfUrl) {
                var videoUrl = instance.get('url');
                var posterUrl = instance.get('poster');
                var flashVars = instance.get('flashVars');

                A.mix(
                    flashVars, {
                        controls: true,
                        src: videoUrl,
                        poster: posterUrl
                    }
                );

                var flashVarString = A.QueryString.stringify(flashVars);

                if (instance._swfId) {
                    instance._video.removeChild(A.one('#' + instance._swfId));
                }
                else {
                    instance._swfId = A.guid();
                }

                var tplObj = '<object id="' + instance._swfId + '" ';

                if (UA.ie) {
                    tplObj += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' +
                        'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' +
                        instance.get('flashPlayerVersion') + '" ';
                }
                else {
                    tplObj += 'type="application/x-shockwave-flash" data="' + swfUrl + '" ';
                }

                tplObj += 'height="100%" width="100%">';

                if (UA.ie) {
                    tplObj += '<param name="movie" value="' + swfUrl + '"/>';
                }

                var fixedAttributes = instance.get('fixedAttributes');

                for (var i in fixedAttributes) {
                    if (fixedAttributes.hasOwnProperty(i)) {
                        tplObj += '<param name="' + i + '" value="' + fixedAttributes[i] + '" />';
                    }
                }

                if (flashVarString) {
                    tplObj += '<param name="flashVars" value="' + flashVarString + '" />';
                }

                if (posterUrl !== '') {
                    tplObj += '<img src="' + posterUrl + '" alt="" />';
                }

                tplObj += '</object>';

                instance._video.append(tplObj);
            }
        },

        /**
         * Render Video in DOM.
         *
         * @method _renderVideo
         * @param fallback
         * @protected
         */
        _renderVideo: function(fallback) {
            var instance = this,
                attrHeight,
                attrWidth,
                height,
                tpl,
                tplObj,
                video,
                width;

            tpl = TPL_VIDEO;

            if (UA.gecko && fallback) {
                tpl = TPL_VIDEO_FALLBACK;
            }
            else {
                attrHeight = '';
                attrWidth = '';

                height = instance.get('height');

                width = instance.get('width');

                if (height) {
                    attrHeight = 'height="' + height + '"';
                }

                if (width) {
                    attrWidth = 'width="' + width + '"';
                }
            }

            tplObj = Lang.sub(
                tpl, {
                    height: attrHeight,
                    id: A.guid(),
                    width: attrWidth
                }
            );

            video = A.Node.create(tplObj);

            instance.get('contentBox').append(video);

            instance._video = video;
        },

        /**
         * Set the `fixedAttributes` on the UI.
         *
         * @method _uiSetFixedAttributes
         * @param val
         * @protected
         */
        _uiSetFixedAttributes: function() {
            var instance = this;

            instance._renderSwfTask();
        },

        /**
         * Set the `flashVars` on the UI.
         *
         * @method _uiSetFlashVars
         * @param val
         * @protected
         */
        _uiSetFlashVars: function() {
            var instance = this;

            instance._renderSwfTask();
        },

        /**
         * Set the `ogvUrl` on the UI.
         *
         * @method _uiSetOgvUrl
         * @param val
         * @protected
         */
        _uiSetOgvUrl: function(val) {
            var instance = this;

            if (UA.gecko || UA.opera) {
                var video = instance._video;

                var usingVideo = instance._usingVideo();

                if ((!val && usingVideo) || (val && !usingVideo)) {
                    video.remove(true);

                    instance._renderVideoTask(!val);
                }

                if (!val) {
                    instance._renderSwfTask();
                }
                else {
                    var sourceOgv = instance._sourceOgv;

                    if (!sourceOgv) {
                        sourceOgv = instance._createSource('video/ogg; codecs="theora, vorbis"');

                        video.append(sourceOgv);

                        instance._sourceOgv = sourceOgv;
                    }

                    sourceOgv.attr('src', val);
                }
            }
        },

        /**
         * Set the `poster` on the UI.
         *
         * @method _uiSetPoster
         * @param val
         * @protected
         */
        _uiSetPoster: function(val) {
            var instance = this;

            var video = instance._video;

            if (instance._usingVideo()) {
                video.setAttribute('poster', val);
            }

            instance._renderSwfTask();
        },

        /**
         * Set the `swfUrl` on the UI.
         *
         * @method _uiSetSwfUrl
         * @param val
         * @protected
         */
        _uiSetSwfUrl: function() {
            var instance = this;

            instance._renderSwfTask();
        },

        /**
         * Set the `url` on the UI.
         *
         * @method _uiSetUrl
         * @param val
         * @protected
         */
        _uiSetUrl: function(val) {
            var instance = this;

            var ogvUrl = instance.get('ogvUrl');
            var video = instance._video;

            var sourceMp4 = instance._sourceMp4;

            if (UA.gecko && !instance._usingVideo()) {
                if (sourceMp4) {
                    sourceMp4.remove(true);

                    instance._sourceMp4 = null;
                }
            }
            else {
                if (video || !ogvUrl) {
                    if (!sourceMp4) {
                        sourceMp4 = instance._createSource('video/mp4;');

                        video.append(sourceMp4);

                        instance._sourceMp4 = sourceMp4;
                    }

                    sourceMp4.attr('src', val);
                }
            }

            instance._renderSwfTask();
        },

        /**
         * Check if it's a `video` node.
         *
         * @method _usingVideo
         * @protected
         */
        _usingVideo: function() {
            var instance = this;

            return (instance._video.get('nodeName').toLowerCase() === 'video');
        }
    }
});

A.Video = Video;


}, '3.0.1', {
    "requires": [
        "node-event-html5",
        "querystring-stringify-simple",
        "aui-aria",
        "aui-node",
        "aui-component",
        "aui-debounce"
    ],
    "skinnable": true
});
