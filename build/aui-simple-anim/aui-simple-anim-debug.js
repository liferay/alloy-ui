AUI.add('aui-simple-anim', function(A) {
var Lang = A.Lang,
	now = Lang.now;

var SimpleAnim = A.Component.create(
	{
		EXTENDS: Object,

		constructor: function(config) {
			var instance = this;

			instance.active = false;

			instance.duration = config.duration || 200;
			instance.easing = config.easing || instance._easeOutQuad;
			instance.from = config.from;
			instance.intervalRate = config.intervalRate;
			instance.to = config.to;

			instance._ontween = config.onTween;
			instance._oncomplete = config.onComplete;
		},

		prototype: {
			animate: function() {
				var instance = this;

				var duration = instance.duration;

				var continueAnimation = false;

				if (instance.active) {
					var time = now() - instance._startTime;

					if (instance._ontween) {
						var pos = instance.easing(time, instance.from, instance.to - instance.from, duration);

						if (pos) {
							instance._ontween(pos);
						}
					}

					if (time >= duration) {
						instance.active = false;

						if (instance._oncomplete) {
							instance._oncomplete();
						}
					}
					else {
						continueAnimation = true;
					}
				}

				return continueAnimation;
			},

			start: function() {
				var instance = this;

				instance._startTime = now();

				SimpleAnim.queue(instance);
			},

			stop: function() {
				var instance = this;

				instance.active = false;
			},

			_easeOutQuad: function(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			}
		},

		// Static methods/properties
		active: false,

		queue: function(animObj) {
			var instance = this;

			instance._queue.push(animObj);
			animObj.active = true;

			if (!instance.active) {
				instance.start(animObj);
			}
		},

		animate: function() {
			var instance = this;

			var active = 0;

			for (var i = 0, length = instance._queue.length; i < length; i++) {
				var animObj = instance._queue[i];

				if (animObj.active) {
					animObj.animate();
					active++;
				}
			}

			if (active == 0 && instance._timer) {
				instance.stop();
			}
		},

		start: function(animObj) {
			var instance = this;

			if (!instance._timer && !instance.active) {
				var intervalRate = animObj.intervalRate || instance._intervalRate;

				instance.active = true;

				instance._timer = setInterval(
					function() {
						instance.animate();
					},
					intervalRate
				);
			}
		},

		stop: function() {
			var instance = this;

			clearInterval(instance._timer);

			instance._timer = null;
			instance.active = false;
			instance._queue = [];
		},

		_intervalRate: 20,
		_queue: [],
		_timer: null
	}
);

A.SimpleAnim = SimpleAnim;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:false});
