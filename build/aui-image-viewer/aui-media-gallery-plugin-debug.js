AUI.add('aui-media-gallery-plugin', function(A) {
/**
 * The ImageGallery Media Plugin
 *
 * @module 'aui-media-gallery-plugin
 */

var Lang = A.Lang,
	Do = A.Do,

	NAME = 'mediaGalleryPlugin';

var MediaGalleryPlugin = function(config) {
	var instance = this;

    MediaGalleryPlugin.superclass.constructor.apply(instance, arguments);
};

MediaGalleryPlugin.NAME = NAME;
MediaGalleryPlugin.NS = 'media';

A.extend(MediaGalleryPlugin, A.MediaViewerPlugin, {
	initializer: function(config) {
		var instance = this;

		var handles = instance._handles;

		handles['show'].detach();

		handles['_changeRequest'] = instance.beforeHostMethod('_changeRequest', instance._changeRequest);

		handles['_changeRequest'] = instance.beforeHostMethod('_changeRequest', instance._loadImage);
	}
});

A.MediaGalleryPlugin = MediaGalleryPlugin;

A.MediaGallery = A.ImageGallery;

}, '@VERSION@' ,{skinnable:false, requires:['aui-media-viewer-plugin','aui-image-viewer-gallery']});
