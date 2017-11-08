/**
 * The Video Component
 *
 * @module aui-video
 */

var Lang = A.Lang,
    UA = A.UA,
    getClassName = A.getClassName,

    CSS_VIDEO_NODE = getClassName('video', 'node'),

    DOC = A.config.doc,

    TPL_VIDEO = '<video id="{id}" controls="controls" class="' + CSS_VIDEO_NODE + '"></video>';

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
    BIND_UI_ATTRS: ['url', 'poster', 'ogvUrl', 'fixedAttributes'],

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
          * Destructor implementation.
          * Lifecycle.
          *
          * @method destructor
          * @protected
          */
        destructor: function() {
            var instance = this;

            (new A.EventHandle(instance._eventHandles)).detach();
        },

        /**
         * Render the Video component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderVideoTask = A.debounce(instance._renderVideo, 1, instance);

            instance._renderVideo(!instance.get('ogvUrl'));

            instance._video.on(
                'play',
                function (event) {
                    instance.fire(
                        'play',
                        {
                            cropType: event.type
                        }
                    );
                }
            );

            instance._video.on(
                'pause',
                function (event) {
                    instance.fire(
                        'pause',
                        {
                            cropType: event.type
                        }
                    );
                }
            );

            instance._setResponsiveDimensions();
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
                'videoReady',
                {
                    fireOnce: true
                }
            );

            instance.publish('play');
            instance.publish('pause');

            instance._eventHandles = [
                A.after(
                    'windowresize',
                    A.bind('_afterWindowResize', instance)
                )
            ];
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
                instance.plug(
                    A.Plugin.Aria,
                    {
                        roleName: instance.get('role'),
                        roleNode: instance.get('contentBox')
                    }
                );
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
         * Fired after the `windowresize` event.
         *
         * @method _afterWindowResize
         * @protected
         */
        _afterWindowResize: function() {
            var instance = this;

            instance._responsiveBoundingBox();
            instance._setResponsiveDimensions();
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
         * Render Video in DOM.
         *
         * @method _renderVideo
         * @protected
         */
        _renderVideo: function() {
            var instance,
                height,
                tpl,
                tplObj,
                video,
                width;

            instance = this;
            tpl = TPL_VIDEO;

            height = instance.get('height');
            width = instance.get('width');

            tplObj = Lang.sub(
                tpl,
                {
                    id: A.guid()
                }
            );

            video = A.Node.create(tplObj);

            if (width) {
                video.width(width);
            }
            if (height) {
                video.height(height);
            }

            instance.get('contentBox').append(video);

            instance._video = video;
        },

        /**
         * Remove the defined height and width from the bounding box.
         *
         * @method _responsiveBoundingBox
         * @protected
         */
        _responsiveBoundingBox: function() {
            var instance = this,
                boundingBox = instance.get('boundingBox');

            boundingBox.setStyles(
                {
                    height: '',
                    width: ''
                }
            );
        },

        /**
         * Set the dimensions of the video player based on the window size.
         *
         * @method _setResponsiveDimensions
         * @protected
         */
        _setResponsiveDimensions: function() {
            var instance,
                aspectRatio,
                currentTargetHeight,
                currentTargetWidth,
                height,
                updatedHeight,
                updatedWidth,
                width,
                winNode;

            instance = this;

            height = instance.get('height');
            width = instance.get('width');

            aspectRatio = height / width;

            updatedHeight = height;
            updatedWidth = width;

            winNode = A.one(window);

            currentTargetHeight = winNode.get('innerHeight');

            if (currentTargetHeight < height) {
                updatedHeight = currentTargetHeight;
                updatedWidth = currentTargetHeight / aspectRatio;
            }

            currentTargetWidth = winNode.get('innerWidth');

            if (currentTargetWidth < width) {
                updatedHeight = currentTargetWidth * aspectRatio;
                updatedWidth = currentTargetWidth;
            }

            instance._video.width(updatedWidth);
            instance._video.height(updatedHeight);
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

                if (val) {
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
            else if (video || !ogvUrl) {
                if (!sourceMp4) {
                    sourceMp4 = instance._createSource('video/mp4;');

                    video.append(sourceMp4);

                    instance._sourceMp4 = sourceMp4;
                }

                sourceMp4.attr('src', val);
            }
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
