AUI.add('aui-audio', function(A) {
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
	
var Audio = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			url: {
				value: '',
				validator: Lang.isString
			},
			oggUrl: {
				value: '',
				validator: Lang.isString
			},
			type: {
				value: MP3,
				validator: Lang.isString
			},
			swfWidth: {
				value: '100%',
				validator: Lang.isString
			},
			swfHeight: {
				value: '30',
				validator: Lang.isString
			},
			swfUrl: {
				value: DEFAULT_PLAYER_PATH,
				validator: Lang.isString
			},
			fixedAttributes: {
				value: {},
				validator: Lang.isObject
			},
			flashVars: {
				value: {},
				validator: Lang.isObject
			},
			render: {
				value: true,
				validator: Lang.isBoolean
			}
		},

		BIND_UI_ATTRS: [URL, OGG_URL, SWF_URL, FIXED_ATTRIBUTES, FLASH_VARS],
		SYNC_UI_ATTRS: [URL, OGG_URL],

		prototype: {
			renderUI: function () {
				var instance = this;

				instance._renderAudioTask = A.debounce(instance._renderAudio, 1, instance);
				instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

				instance._renderAudio(!instance.get(OGG_URL));
			},

			bindUI: function () {
				var instance = this;

				instance.publish(
					'audioReady',
					{
						fireOnce: true
					}
				);
			},

			_createSource: function(type) {
				var sourceNode = new A.Node(DOC.createElement('source'));

				sourceNode.attr('type', type);

				return sourceNode;
			},

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

			_uiSetFixedAttributes: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

			_uiSetFlashVars: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

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

			_uiSetSwfUrl: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

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

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','querystring-stringify-simple']});
