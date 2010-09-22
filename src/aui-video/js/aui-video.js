var Lang = A.Lang,
UA = A.UA,
getClassName = A.ClassNameManager.getClassName,

NAME = 'video',

CSS_VIDEO = getClassName(NAME),

DEFAULT_SWF_PATH = A.config.base + 'aui-video/assets/player.swf';

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
                value: DEFAULT_SWF_PATH
            },
            poster: {
                value: ''
            },
            fixedAttributes: {
                value: {}
            },
            flashVars: {
                value: {}
            },
            render: {
                value: true
            }
        },
        SYNC_UI_ATTRS: ['url', 'poster', 'ogvUrl'],
        BIND_UI_ATTRS: ['url', 'poster', 'ogvUrl', 'swfUrl', 'fixedAttributes', 'flashVars'],
        prototype: {
            renderUI: function () {
                var instance = this;

                var videoId = A.guid();
                instance._videoId = videoId;

                var contentBox = instance.get('contentBox');

                var tplObj = '<video id="' + videoId + '" width="100%" height="100%" controls="controls" class="' + CSS_VIDEO + '"></video>';

                contentBox.set('innerHTML', tplObj);

                instance._video = A.one('#' + videoId);

                instance._dtSwf = new A.DelayedTask(function () {
                    instance._updateSwf();
                });
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
            syncUI: function () {
                var instance = this;
            },
            toString: function () {
                var instance = this;

                return 'VIDEO' + instance._videoId;
            },
            _eventHandler: function (event) {
                var instance = this;

                var eventType = event.type;

                if (eventType != 'log') {
                    instance.fire(eventType, event);
                }
            },
            _updateSwf: function () {
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
            _uiSetUrl: function (val) {
                var instance = this;

                var ogvUrl = instance.get('ogvUrl');

                if (!UA.gecko || ogvUrl) {
                    if (instance._sourceMp4 != null) {
                        instance._sourceMp4.setAttribute('src', val);
                    }
                    else {
                        var sourceObj = '<source src="' + val + '" type="video/mp4;" />';

                        instance._video.append(sourceObj);

                        instance._sourceMp4 = instance._video.one('source[type^="video/mp4"]');
                    }
                }

                instance._dtSwf.delay(1);
            },
            _uiSetOgvUrl: function (val) {
                var instance = this;

                if (instance._sourceOgv != null) {
                    instance._sourceOgv.setAttribute('src', val);
                }
                else {
                    var sourceObj = '<source src="' + val + '" type=\'video/ogg; codecs="theora, vorbis"\' />';

                    instance._video.append(sourceObj);

                    instance._sourceOgv = instance._video.one('source[type^="video/ogg"]');
                }
            },
            _uiSetSwfUrl: function (val) {
                var instance = this;

                instance._dtSwf.delay(1);
            },
            _uiSetPoster: function (val) {
                var instance = this;

                instance._video.setAttribute('poster', val);

                instance._dtSwf.delay(1);
            },
            _uiSetFixedAttributes: function (val) {
                var instance = this;

                instance._dtSwf.delay(1);
            },
            _uiSetFlashVars: function (val) {
                var instance = this;

                instance._dtSwf.delay(1);
            }
        }
    }
);

A.Video = Video;