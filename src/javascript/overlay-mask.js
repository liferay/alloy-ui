AUI.add('overlay-mask', function(A) {

var L = A.Lang,
	isString = L.isString,

	OVERLAY_MASK = 'OverlayMask';

function OverlayMask(config) {
 	OverlayMask.superclass.constructor.apply(this, arguments);
}

A.mix(OverlayMask, {
	NAME: OVERLAY_MASK,

	NS: OVERLAY_MASK,

	ATTRS: {

	}
});

A.extend(OverlayMask, A.Plugin.Base, {

});

A.namespace('Plugin');
A.Plugin.OverlayMask = OverlayMask;

}, '@VERSION', { requires: [ 'overlay' ] });