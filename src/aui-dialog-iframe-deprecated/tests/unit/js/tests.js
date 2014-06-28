YUI.add('aui-dialog-iframe-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-dialog-iframe-deprecated');

	var modal = new Y.Modal(
		{
			headerContent: '<h3>My Dialog</h3>',
			width: 640,
			centered: true,
			height: 400,
			zIndex: 1,
			destroyOnHide: true
		}
	)
	.plug(
		Y.Plugin.DialogIframe,
		{
			uri: '../../../../demos/dialog-iframe-deprecated/assets/content.html',
			iframeCssClass: 'dialog-iframe'
		}
	)
	.render();

    suite.add(new Y.Test.Case({
        name: 'DialogIframe',

        /**
         * @tests AUI-1422
         */
        'test loading mask is destroyed when host is destroyed': function() {
        	var maskCssClass = modal.bodyNode.loadingmask.overlayMask.get('cssClass'),
        		maskNode = Y.one('.' + maskCssClass);

        	modal.hide();

        	this.wait(function() {
        		Y.Assert.isFalse(maskNode.inDoc());
        	}, 100);

        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-dialog-iframe-deprecated', 'aui-modal', 'node-event-simulate']
});
