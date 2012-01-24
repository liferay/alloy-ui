AUI.add('aui-event-delegate-submit', function(A) {
var AObject = A.Object,
	Node = A.Node,
	Selector = A.Selector,

	EVENT_CLICK = 'click',
	EVENT_SUBMIT = 'submit';

A.Event.define(
	EVENT_SUBMIT,
	{
		delegate: function (node, subscription, notifier, filter) {
			var instance = this;

			var clickHandles = instance._prepareHandles(subscription, node);
			
			if (!AObject.owns(clickHandles, EVENT_CLICK)) {
				clickHandles[EVENT_CLICK] = node.delegate(
					EVENT_CLICK,
					function(event) {
						var activeElement = event.target;
						
						if (instance._getNodeName(activeElement, 'input') || instance._getNodeName(activeElement, 'button')) {
							var form = activeElement.get('form');

							if (form) {
								var formHandles = instance._prepareHandles(subscription, form);
								
								if (!AObject.owns(formHandles, EVENT_SUBMIT)) {
									var fireFn = function(event) {
										var delegateEl = node.getDOM();

										var result = true;

										var tmpEl = form.getDOM();

										var tmpEvent = A.clone(event);

										do {
											if (tmpEl && Selector.test(tmpEl, filter)) {
												tmpEvent.currentTarget = A.one(tmpEl);
												tmpEvent.container = node;

												result = notifier.fire(tmpEvent);

												if (tmpEvent.prevented) {
													event.preventDefault(tmpEvent._event.returnValue);
												}
											}

											tmpEl = tmpEl.parentNode;
										}
										while (result !== false && !tmpEvent.stopped && tmpEl && tmpEl !== delegateEl);

										return ((result !== false) && (tmpEvent.stopped !== 2));
									};

									formHandles[EVENT_SUBMIT] = A.Event._attach([EVENT_SUBMIT, fireFn, form, notifier]);
								}
							}
						}
					},
					filter
				);
			}
		},

		detach: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		detachDelegate: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		on: function (node, subscription, notifier) {
			var instance = this;
			
			var submitHandles = instance._prepareHandles(subscription, node);

			submitHandles[EVENT_SUBMIT] = A.Event._attach([EVENT_SUBMIT, notifier.fire, node, notifier]);
		},

		_detachEvents: function(node, subscription, notifier) {
			A.each(
				subscription._handles,
				function(events, node, handles) {
					A.each(
						events,
						function(handle, event, events) {
							handle.detach();
						}
					);
				}
			);

			delete subscription._handles;
		},
		
		_getNodeName: function(elem, name) {
			var nodeName = elem.get('nodeName');

			return nodeName && nodeName.toLowerCase() === name.toLowerCase();
		},

		_prepareHandles: function(subscription, node) {
			if (!AObject.owns(subscription, '_handles')) {
				subscription._handles = {};
			}

			var handles = subscription._handles;

			if (!AObject.owns(handles, node)) {
				handles[node] = {};
			}

			return handles[node];
		}
	},
	true
);

}, '@VERSION@' ,{requires:['aui-node-base','aui-event-base'], condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}});
