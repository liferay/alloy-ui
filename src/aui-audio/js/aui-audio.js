/**
 * The Audio Component
 *
 * @module aui-audio
 */

var AObject = A.Object,
	Lang = A.Lang,
	UA = A.UA,
	DOC = A.config.doc,

	NAME = 'audio',

	getClassName = A.getClassName,

	CSS_AUDIO = getClassName(NAME),
	CSS_AUDIO_NODE = getClassName(NAME, 'node'),

	DEFAULT_PLAYER_PATH = A.config.base + 'aui-audio/assets/player.swf',
	FIXED_ATTRIBUTES = 'fixedAttributes',
	FLASH_VARS = 'flashVars',
	MP3 = 'mp3',
	OGG_URL = 'oggUrl',
	SRC = 'src',
	SWF_URL = 'swfUrl',
	URL = 'url',

	REGEX_FILE_EXTENSION = /\.([^\.]+)$/;

/**
 * A base class for Audio.
 *
 * Check the [live demo](http://alloyui.com/examples/audio/).
 *
 * @class A.Audio
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Audio = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property Audio.NAME
		 * @type String
		 * @static
		 */
		NAME: NAME,

		/**
		 * Static property used to define the default attribute
		 * configuration for the Audio.
		 *
		 * @property Audio.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {

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
			 * The type of audio.
			 *
			 * @attribute type
			 * @default mp3
			 * @type String
			 */
			type: {
				value: MP3,
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
			 * If <code>true</code> the render phase will be automatically invoked
			 * preventing the <code>.render()</code> manual call.
			 *
			 * @attribute render
			 * @default true
			 * @type Boolean
			 */
			render: {
				value: true,
				validator: Lang.isBoolean
			}
		},

		/**
		 * Static property used to define the attributes
		 * for the bindUI lifecycle phase.
		 *
		 * @property Audio.BIND_UI_ATTRS
		 * @type Array
		 * @static
		 */
		BIND_UI_ATTRS: [URL, OGG_URL, SWF_URL, FIXED_ATTRIBUTES, FLASH_VARS],

		/**
		 * Static property used to define the attributes
		 * for the syncUI lifecycle phase.
		 *
		 * @property Audio.SYNC_UI_ATTRS
		 * @type Array
		 * @static
		 */
		SYNC_UI_ATTRS: [URL, OGG_URL],

		prototype: {

			/**
			 * Render the Audio component instance. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function () {
				var instance = this;

				instance._renderAudioTask = A.debounce(instance._renderAudio, 1, instance);
				instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

				instance._renderAudio(!instance.get(OGG_URL));
			},

			/**
			 * Bind the events on the Audio UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function () {
				var instance = this;

				instance.publish(
					'audioReady',
					{
						fireOnce: true
					}
				);
			},

			/**
			 * Create <code>source</code> element
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
			_renderSwf: function () {
				var instance = this;

				var swfUrl = instance.get(SWF_URL);

				if (swfUrl) {
					var flashVars = instance.get(FLASH_VARS);

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

					var fixedAttributes = instance.get(FIXED_ATTRIBUTES);

					var fixedAttributesParam = [];

					for (var attributeName in fixedAttributes) {
						if (AObject.owns(fixedAttributes, attributeName)) {
							fixedAttributesParam.push('<param name="', attributeName, '" value="', fixedAttributes[attributeName], '" />');
						}
					}

					var flashVarsParam = '';

					if (flashVarString) {
						flashVarsParam = '<param name="flashVars" value="' + flashVarString + '" />';
					}

					var height = instance.get('swfHeight');

					var width = instance.get('swfWidth');

					var tplObj = Lang.sub(
						Audio.TPL_FLASH,
						{
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

				var tpl = Audio.TPL_AUDIO;

				if (UA.gecko && fallback) {
					tpl = Audio.TPL_AUDIO_FALLBACK;
				}

				var tplObj = Lang.sub(tpl, [A.guid()]);

				var audio = A.Node.create(tplObj);

				instance.get('contentBox').append(audio);

				instance._audio = audio;

				return audio;
			},

			/**
			 * Set media on <code>flashVars</code>.
			 *
			 * @method _setMedia
			 * @param flashVars
			 * @protected
			 */
			_setMedia: function(flashVars) {
				var instance = this;

				if (!AObject.owns(flashVars, MP3) && !AObject.owns(flashVars, 'mp4') && !AObject.owns(flashVars, 'flv')) {
					var audioUrl = instance.get(URL);

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
			 * Set the <code>oggUrl</code> on the UI.
			 *
			 * @method _uiSetOggUrl
			 * @param val
			 * @protected
			 */
			_uiSetOggUrl: function (val) {
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

						sourceOgg.attr(SRC, val);
					}
				}
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

				var oggUrl = instance.get(OGG_URL);
				var audio = instance._audio;

				var sourceMp3 = instance._sourceMp3;

				if (UA.gecko && !instance._usingAudio()) {
					if (sourceMp3 != null) {
						sourceMp3.remove(true);

						instance._sourceMp3 = null;
					}
				}
				else
				{
					if (audio || !oggUrl) {
						if (!sourceMp3) {
							sourceMp3 = instance._createSource('audio/mp3');

							audio.append(sourceMp3);

							instance._sourceMp3 = sourceMp3;
						}

						sourceMp3.attr(SRC, val);
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
			_usingAudio: function() {
				var instance = this;

				return (instance._audio.get('nodeName').toLowerCase() == 'audio');
			}
		}
	}
);

Audio.TPL_AUDIO = '<audio id="{0}" controls class="' + CSS_AUDIO_NODE + '"></audio>';

Audio.TPL_AUDIO_FALLBACK = '<div class="' + CSS_AUDIO_NODE + '"></div>';

Audio.TPL_FLASH = '<object id="{id}" {applicationType} height="{height}" width="{width}">{movie}{fixedAttributes}{flashVars}</object>';

A.Audio = Audio;