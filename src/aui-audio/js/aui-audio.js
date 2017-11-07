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
    BIND_UI_ATTRS: ['url', 'oggUrl', 'fixedAttributes'],

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

            instance._renderAudio(!instance.get('oggUrl'));

            instance._audio.on(
                'play',
                A.bind('_onPlay', instance)
            );

            instance._audio.on(
                'pause',
                A.bind('_onPause', instance)
            );

        },

        /**
         * Bind the events on the Audio UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.publish(
                'audioReady',
                {
                    fireOnce: true
                }
            );

            instance.publish('play');
            instance.publish('pause');
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
         * Render Audio in DOM.
         *
         * @method _renderAudio
         * @param fallback
         * @protected
         */
        _renderAudio: function(fallback) {
            var instance = this;

            var tpl = AudioImpl.TPL_AUDIO;

            var tplObj = Lang.sub(tpl, [A.guid()]);

            var audio = A.Node.create(tplObj);

            instance.get('contentBox').append(audio);

            instance._audio = audio;

            return audio;
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

                if (val) {
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

AudioImpl.TPL_AUDIO = '<audio id="{0}" controls="controls" class="' + CSS_AUDIO_NODE + '"></audio>';

A.Audio = AudioImpl;