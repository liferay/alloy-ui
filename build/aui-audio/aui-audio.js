YUI.add('aui-audio', function (A, NAME) {

/**
 * The Audio Component
 *
 * @module aui-audio
 */

var Lang = A.Lang,
    UA = A.UA,
    DOC = A.config.doc,

    owns = A.Object.owns,

    getClassName = A.getClassName,

    CSS_AUDIO_NODE = getClassName('audio', 'node'),

    DEFAULT_PLAYER_PATH = A.config.base + 'aui-audio/assets/player.swf',

    REGEX_FILE_EXTENSION = /\.([^\.]+)$/;

/**
 * A base class for Audio.
 *
 * Check the [live demo](http://alloyui.com/examples/audio/).
 *
 * @class A.Audio
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/audio/basic-markup.html
 * @include http://alloyui.com/examples/audio/basic.js
 */
var AudioImpl = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'audio',

    /**
     * Static property used to define the default attribute
     * configuration for the Audio.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Variables used by Flash player.
         *
         * @attribute flashVars
         * @default {}
         * @type Object
         */
        flashVars: {
            value: {},
            validator: Lang.isObject
        },

        /**
         * An additional list of attributes.
         *
         * @attribute fixedAttributes
         * @default {}
         * @type Object
         */
        fixedAttributes: {
            value: {},
            validator: Lang.isObject
        },

        /**
         * URL (on .ogg format) used by Audio to play.
         *
         * @attribute oggUrl
         * @default ''
         * @type String
         */
        oggUrl: {
            value: '',
            validator: Lang.isString
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
            value: true,
            validator: Lang.isBoolean
        },

        /**
         * Sets the `aria-role` for Audio.
         *
         * @attribute role
         * @type String
         */
        role: {
            value: 'application',
            validator: Lang.isString
        },

        /**
         * The width of Audio's fallback using Flash.
         *
         * @attribute swfWidth
         * @default 100%
         * @type String
         */
        swfWidth: {
            value: '100%',
            validator: Lang.isString
        },

        /**
         * The height of Audio's fallback using Flash.
         *
         * @attribute swfHeight
         * @default 30
         * @type String
         */
        swfHeight: {
            value: '30',
            validator: Lang.isString
        },

        /**
         * URL (on .swf format) used by Audio to create
         * a fallback player with Flash.
         *
         * @attribute swfUrl
         * @default aui-audio/assets/player.swf
         * @type String
         */
        swfUrl: {
            value: DEFAULT_PLAYER_PATH,
            validator: Lang.isString
        },

        /**
         * The type of audio.
         *
         * @attribute type
         * @default mp3
         * @type String
         */
        type: {
            value: 'mp3',
            validator: Lang.isString
        },

        /**
         * URL used by Audio to play.
         *
         * @attribute url
         * @default ''
         * @type String
         */
        url: {
            value: '',
            validator: Lang.isString
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
            value: true,
            validator: Lang.isBoolean,
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
    BIND_UI_ATTRS: ['url', 'oggUrl', 'swfUrl', 'fixedAttributes', 'flashVars'],

    /**
     * Static property used to define the attributes
     * for the syncUI lifecycle phase.
     *
     * @property SYNC_UI_ATTRS
     * @type Array
     * @static
     */
    SYNC_UI_ATTRS: ['url', 'oggUrl'],

    prototype: {

        /**
         * Render the Audio component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderAudioTask = A.debounce(instance._renderAudio, 1, instance);
            instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

            instance._renderAudio(!instance.get('oggUrl'));
        },

        /**
         * Bind the events on the Audio UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.publish({
                audioReady: {
                    fireOnce: true
                },
                pause: {},
                play: {}
            });

            instance._audio.on({
                pause: instance._onPause,
                play: instance._onPlay
            });
        },

        /**
         * Sync the Audio UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            if (instance.get('useARIA')) {
                instance.plug(A.Plugin.Aria, {
                    roleName: instance.get('role')
                });
            }
        },

        /**
         * Load audio track.
         *
         * @method load
         */
        load: function() {
            var instance = this;

            if (instance._audio.hasMethod('load')) {
                instance._audio.invoke('load');
            }
        },

        /**
         * Pause audio track.
         *
         * @method pause
         */
        pause: function() {
            var instance = this;

            if (instance._audio.hasMethod('pause')) {
                instance._audio.invoke('pause');
            }
        },

        /**
         * Play audio track.
         *
         * @method play
         */
        play: function() {
            var instance = this;

            if (instance._audio.hasMethod('play')) {
                instance._audio.invoke('play');
            }
        },

        /**
         * Fires on video pause event fires.
         *
         * @method _onPause
         * @param {EventFacade} event
         * @protected
         */
        _onPause: function (event) {
            this.fire('play', {
                cropType: event.type
            });
        },

        /**
         * Fires on video play event fires.
         *
         * @method _onPlay
         * @param {EventFacade} event
         * @protected
         */
        _onPlay: function (event) {
            this.fire('pause', {
                cropType: event.type
            });
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
                var flashVars = instance.get('flashVars');

                instance._setMedia(flashVars);

                var flashVarString = A.QueryString.stringify(flashVars);

                if (instance._swfId) {
                    instance._audio.removeChild(A.one('#' + instance._swfId));
                }
                else {
                    instance._swfId = A.guid();
                }

                var applicationType = 'type="application/x-shockwave-flash" data="' + swfUrl + '"';

                var movie = '';

                if (UA.ie) {
                    applicationType = 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';

                    movie = '<param name="movie" value="' + swfUrl + '"/>';
                }

                var fixedAttributes = instance.get('fixedAttributes');

                var fixedAttributesParam = [];

                for (var attributeName in fixedAttributes) {
                    if (owns(fixedAttributes, attributeName)) {
                        fixedAttributesParam.push('<param name="', attributeName, '" value="', fixedAttributes[
                            attributeName], '" />');
                    }
                }

                var flashVarsParam = '';

                if (flashVarString) {
                    flashVarsParam = '<param name="flashVars" value="' + flashVarString + '" />';
                }

                var height = instance.get('swfHeight');

                var width = instance.get('swfWidth');

                var tplObj = Lang.sub(
                    AudioImpl.TPL_FLASH, {
                        applicationType: applicationType,
                        id: instance._swfId,
                        fixedAttributes: fixedAttributesParam.join(''),
                        flashVars: flashVarsParam,
                        height: height,
                        movie: movie,
                        width: width
                    }
                );

                instance._audio.append(tplObj);
            }
        },

        /**
         * Render Audio in DOM.
         *
         * @method _renderAudio
         * @param fallback
         * @protected
         */
        _renderAudio: function(fallback) {
            var instance = this;

            var tpl = AudioImpl.TPL_AUDIO;

            if (UA.gecko && fallback) {
                tpl = AudioImpl.TPL_AUDIO_FALLBACK;
            }

            var tplObj = Lang.sub(tpl, [A.guid()]);

            var audio = A.Node.create(tplObj);

            instance.get('contentBox').append(audio);

            instance._audio = audio;

            return audio;
        },

        /**
         * Set media on `flashVars`.
         *
         * @method _setMedia
         * @param flashVars
         * @protected
         */
        _setMedia: function(flashVars) {
            var instance = this;

            if (!owns(flashVars, 'mp3') && !owns(flashVars, 'mp4') && !owns(flashVars, 'flv')) {
                var audioUrl = instance.get('url');

                var type = instance.get('type');

                if (!type) {
                    var typeMatch = REGEX_FILE_EXTENSION.exec(audioUrl);

                    if (typeMatch) {
                        type = typeMatch[1];
                    }
                }

                flashVars[type] = audioUrl;
            }
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
         * Set the `oggUrl` on the UI.
         *
         * @method _uiSetOggUrl
         * @param val
         * @protected
         */
        _uiSetOggUrl: function(val) {
            var instance = this;

            if (UA.gecko || UA.opera) {
                var audio = instance._audio;

                var usingAudio = instance._usingAudio();

                if ((!val && usingAudio) || (val && !usingAudio)) {
                    audio.remove(true);

                    audio = instance._renderAudio(!val);
                }

                if (!val) {
                    instance._renderSwfTask();
                }
                else {
                    var sourceOgg = instance._sourceOgg;

                    if (!sourceOgg) {
                        sourceOgg = instance._createSource('audio/ogg');

                        audio.append(sourceOgg);

                        instance._sourceOgg = sourceOgg;
                    }

                    sourceOgg.attr('src', val);
                }
            }
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

            var oggUrl = instance.get('oggUrl');
            var audio = instance._audio;

            var sourceMp3 = instance._sourceMp3;

            if (UA.gecko && !instance._usingAudio()) {
                if (sourceMp3) {
                    sourceMp3.remove(true);

                    instance._sourceMp3 = null;
                }
            }
            else {
                if (audio || !oggUrl) {
                    if (!sourceMp3) {
                        sourceMp3 = instance._createSource('audio/mp3');

                        audio.append(sourceMp3);

                        instance._sourceMp3 = sourceMp3;
                    }

                    sourceMp3.attr('src', val);
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
        _usingAudio: function() {
            var instance = this;

            return (instance._audio.get('nodeName').toLowerCase() === 'audio');
        }
    }
});

AudioImpl.TPL_AUDIO = '<audio id="{0}" controls class="' + CSS_AUDIO_NODE + '"></audio>';

AudioImpl.TPL_AUDIO_FALLBACK = '<div class="' + CSS_AUDIO_NODE + '"></div>';

AudioImpl.TPL_FLASH =
    '<object id="{id}" {applicationType} height="{height}" width="{width}">{movie}{fixedAttributes}{flashVars}</object>';

A.Audio = AudioImpl;


}, '3.0.1', {"requires": ["aui-aria", "aui-node", "aui-component", "querystring-stringify-simple"], "skinnable": true});
