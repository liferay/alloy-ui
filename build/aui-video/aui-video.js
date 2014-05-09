AUI.add('aui-video', function(A) {
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

var Video = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			url: {
				value: ''
			},
			ogvUrl: {
				value: ''
			},
			swfUrl: {
				value: DEFAULT_PLAYER_PATH
			},
			poster: {
				value: ''
			},
			fixedAttributes: {
				value: {}
			},
			flashPlayerVersion: {
				validator: Lang.isString,
				value: '9,0,0,0'
			},
			flashVars: {
				value: {}
			},
			render: {
				value: true
			}
		},

		BIND_UI_ATTRS: ['url', 'poster', 'ogvUrl', 'swfUrl', 'fixedAttributes', 'flashVars'],
		SYNC_UI_ATTRS: ['url', 'poster', 'ogvUrl'],

		prototype: {
			renderUI: function () {
				var instance = this;

				instance._renderVideoTask = A.debounce(instance._renderVideo, 1, instance);
				instance._renderSwfTask = A.debounce(instance._renderSwf, 1, instance);

				instance._renderVideo(!instance.get('ogvUrl'));
			},

			bindUI: function () {
				var instance = this;

				instance.publish(
					'videoReady',
					{
						fireOnce: true
					}
				);
			},

			_createSource: function(type) {
				var instance = this;

				var sourceNode = new A.Node(DOC.createElement('source'));

				sourceNode.attr('type', type);

				return sourceNode;
			},

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

			_uiSetFixedAttributes: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

			_uiSetFlashVars: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

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

			_uiSetPoster: function (val) {
				var instance = this;

				var video = instance._video;

				if (instance._usingVideo()) {
					video.setAttribute('poster', val);
				}

				instance._renderSwfTask();
			},

			_uiSetSwfUrl: function (val) {
				var instance = this;

				instance._renderSwfTask();
			},

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

			_usingVideo: function() {
				var instance = this;

				return (instance._video.get('nodeName').toLowerCase() == 'video');
			}
		}
	}
);

A.Video = Video;

}, '@VERSION@' ,{requires:['aui-base','querystring-stringify-simple'], skinnable:true});
