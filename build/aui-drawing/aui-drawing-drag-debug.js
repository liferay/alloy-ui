AUI.add('aui-drawing-drag', function(A) {
var Lang = A.Lang,

	DOC = A.config.doc,

	Drawing = A.Drawing,
	Element = Drawing.Element,

	ELEMENT_PROTOTYPE = Element.prototype,

	MAP_EVENT_CONFIG = {
		standAlone: true
	},

	MAP_EVENT_GESTURES = {
		mousedown: 'gesturemovestart',
		mousemove: 'gesturemove',
		mouseup: 'gesturemoveend'
	},

	SUPPORTS_TOUCH = 'createTouch' in DOC;

var Drag = Drawing.Drag = {
	drags: []
};

Element._getEventType = function(eventType) {
	return MAP_EVENT_GESTURES[eventType] || eventType;
};

Element._getEventConfig = function(eventType, originalType) {
	return MAP_EVENT_GESTURES[originalType] ? MAP_EVENT_CONFIG : null;
};

Drag.dragMove = function(e) {
	var x = e.clientX;
	var y = e.clientY;
	var dragi;
	var drags = Drag.drags;
	var j = drags.length;

	while (j--) {
		dragi = drags[j];

		if (SUPPORTS_TOUCH) {
			var i = e.touches.length;
			var touch;

			while (i--) {
				touch = e.touches[i];

				if (touch.identifier == dragi.el._drag.id) {
					x = touch.clientX;
					y = touch.clientY;

					(e.originalEvent ? e.originalEvent : e).preventDefault();

					break;
				}
			}
		}
		else {
			e.preventDefault();
		}

		if (dragi.move) {
			dragi.move.call(dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y);
		}
	}
};

Drag.dragUp = function() {
	Drag._dragMoveHandle.detach();
	Drag._dragUpHandle.detach();

	var drags = Drag.drags;
	var i = drags.length;
	var dragi;

	while (i--) {
		dragi = drags[i];
		dragi.el._drag = {};

		if (dragi.end) {
			dragi.end.call(dragi.el);
		}
	}

	Drag.drags = [];
};

ELEMENT_PROTOTYPE.drag = function(onmove, onstart, onend) {
	var instance = this;

	instance._drag = {};

	instance.on(
		'mousedown',
		function(e) {
			var element = this;

			(e.originalEvent || e).preventDefault();

			element._drag.x = e.clientX;
			element._drag.y = e.clientY;
			element._drag.id = e.identifier;

			if (onstart) {
				onstart.call(element, e.clientX, e.clientY);
			}

			if (!Drag.drags.length) {
				var realMoveEventName = Element._getEventType('mousemove');
				var realUpEventName = Element._getEventType('mouseup');

				Drag._dragMoveHandle = A.on(realMoveEventName, Drag.dragMove, DOC, Element._getEventConfig(realMoveEventName, 'mousemove'));
				Drag._dragUpHandle = A.on(realUpEventName, Drag.dragUp, DOC, Element._getEventConfig(realUpEventName, 'mouseup'));
			}

			Drag.drags.push(
				{
					el: this,
					move: onmove,
					end: onend
				}
			);
		}
	);

	return instance;
};

ELEMENT_PROTOTYPE.undrag = function(onmove, onstart, onend) {
	var instance = this;

	var drags = Drag.drags;

	var i = drags.length;

	while (i--) {
		drags[i].el == instance && (drags[i].move == onmove && drags[i].end == onend) && drags.splice(i, 1);

		if (!drags.length) {
			Drag._dragMoveHandle.detach();
			Drag._dragUpHandle.detach();
		}
	}
};

Drawing.Set.addMethod(['drag', 'undrag']);

}, '@VERSION@' ,{requires:['aui-drawing-base','event-gestures']});
