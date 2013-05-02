/**
 * The Video Component
 *
 * @module aui-video
 */

var Lang = A.Lang,
	UA = A.UA,
	getClassName = A.getClassName,

	NAME = 'video',

	CSS_VIDEO = getClassName(NAME),
	CSS_VIDEO_NODE = getClassName(NAME, 'node'),

	DEFAULT_PLAYER_PATH = A.config.base + 'aui-video/assets/player.swf?t=' + Lang.now(),

	DOC = A.config.doc,

	TPL_VIDEO = '<video id="{0}" controls="controls" class="' + CSS_VIDEO_NODE + '"></video>',
	TPL_VIDEO_FALLBACK = '<div class="' + CSS_VIDEO_NODE + '"></div>';

/**
 * A base class for Video.
 *
 * Check the [live demo](http://alloyui.com/examples/video/).
 *
 * @class Video
 * @extends Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Video = A.Component.create(
	{
		/**
         * Static property provides a string to identify the class.
         *
         * @property Video.NAME
         * @type String
         * @static
         */
        NAME: NAME,

		/**
         * Static property used to define the default attribute
         * configuration for the Video.
         *
         * @property Video.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

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
             * URL (on .swf format) used by Video to create
             * a fallback player with Flash.
             *
             * @attribute swfUrl
             * @default ''
             * @type String
             */
            swfUrl: {
				value: DEFAULT_PLAYER_PATH
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
             * If <code>true</code> the render phase will be automatically invoked
             * preventing the <code>.render()</code> manual call.
             *
             * @attribute render
             * @default true
             * @type Boolean
             */
            render: {
				value: true
			}
		},

		/**
         * Static property used to define the attributes
         * for the bindUI lifecycle phase.
         *
         * @property Video.BIND_UI_ATTRS
         * @type Array
         * @static
         */
        BIND_UI_ATTRS: ['url', 'poster', 'ogvUrl', 'swfUrl', 'fixedAttributes', 'flashVars'],

        /**
         * Static property used to define the attributes
         * for the syncUI lifecycle phase.
         *
         * @property Video.SYNC_UI_ATTRS
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
            renderUI: function () {
				var instance = this;

				instance._renderVideoTask = A.debounce(instance._renderVideo, 1, instance);
				instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

				instance._renderVideo(!instance.get('ogvUrl'));
			},

			/**
             * Bind the events on the Video UI. Lifecycle.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function () {
				var instance = this;

				instance.publish(
					'videoReady',
					{
						fireOnce: true
					}
				);
			},

			/**
             * Create <code>source</code> element
             * using passed type attribute.
             *
             * @method _renderSwf
             * @param type
             * @protected
             */
            _createSource: function(type) {
				var instance = this;

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
            _renderSwf: function () {
				var instance = this;

				var swfUrl = instance.get('swfUrl');

				if (swfUrl) {
					var videoUrl = instance.get('url');
					var posterUrl = instance.get('poster');
					var flashVars = instance.get('flashVars');

					A.mix(
						flashVars,
						{
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
						tplObj += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
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
						tplObj += '<param name="' + i + '" value="' + fixedAttributes[i] + '" />';
					}

					if (flashVarString) {
						tplObj += '<param name="flashVars" value="' + flashVarString + '" />';
					}

					if (posterUrl != '') {
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
				var instance = this;

				var tpl = TPL_VIDEO;

				if (UA.gecko && fallback) {
					tpl = TPL_VIDEO_FALLBACK;
				}

				var tplObj = Lang.sub(tpl, [A.guid()]);

				var video = A.Node.create(tplObj);

				instance.get('contentBox').append(video);

				instance._video = video;
			},

			/**
             * Set the <code>fixedAttributes</code> on the UI.
             *
             * @method _uiSetFixedAttributes
             * @param val
             * @protected
             */
            _uiSetFixedAttributes: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

			/**
             * Set the <code>flashVars</code> on the UI.
             *
             * @method _uiSetFlashVars
             * @param val
             * @protected
             */
            _uiSetFlashVars: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

			/**
             * Set the <code>ogvUrl</code> on the UI.
             *
             * @method _uiSetOgvUrl
             * @param val
             * @protected
             */
            _uiSetOgvUrl: function (val) {
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
             * Set the <code>poster</code> on the UI.
             *
             * @method _uiSetPoster
             * @param val
             * @protected
             */
            _uiSetPoster: function (val) {
				var instance = this;

				var video = instance._video;

				if (instance._usingVideo()) {
					video.setAttribute('poster', val);
				}

				instance._renderSwfTask();
			},

			/**
             * Set the <code>swfUrl</code> on the UI.
             *
             * @method _uiSetSwfUrl
             * @param val
             * @protected
             */
            _uiSetSwfUrl: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

			/**
             * Set the <code>url</code> on the UI.
             *
             * @method _uiSetUrl
             * @param val
             * @protected
             */
            _uiSetUrl: function (val) {
				var instance = this;

				var ogvUrl = instance.get('ogvUrl');
				var video = instance._video;

				var sourceMp4 = instance._sourceMp4;

				if (UA.gecko && !instance._usingVideo()) {
					if (sourceMp4 != null) {
						sourceMp4.remove(true);

						instance._sourceMp4 = null;
					}
				}
				else
				{
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
             * Check if it's a <code>video</code> node.
             *
             * @method _usingVideo
             * @protected
             */
            _usingVideo: function() {
				var instance = this;

				return (instance._video.get('nodeName').toLowerCase() == 'video');
			}
		}
	}
);

A.Video = Video;