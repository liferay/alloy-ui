/*
 * Alloy JavaScript Library
 * http://alloy.liferay.com/
 *
 * Copyright (c) 2010 Liferay Inc.
 * http://alloy.liferay.com/LICENSE.txt
 *
 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)
 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
 *
 * Attribution/Third-party licenses
 * http://alloy.liferay.com/ATTRIBUTION.txt
 */

 // Simple version of http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
A.supportsDOMEvent = function(domNode, eventName) {
	eventName = 'on' + eventName;

	if (!(eventName in domNode)) {
		if (!domNode.setAttribute) {
			domNode = A.config.doc.createElement('div');
		}

		if (domNode.setAttribute) {
			domNode.setAttribute(eventName, '');
			return (typeof domNode[eventName] === 'function');
		}
	}

	domNode = null;

	return true;
};