YUI.add('aui-dialog-iframe-tests', function(Y) {

    var modal,
        suite = new Y.Test.Suite('aui-dialog-iframe-deprecated');

    suite.add(new Y.Test.Case({
        name: 'DialogIframe',

        setUp: function() {
            if (modal) {
                modal.destroy();
            }

            modal = new Y.Modal(
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
        },

        /**
         * @tests AUI-1422
         */
        'test loading mask is destroyed when host is destroyed': function() {
            this.wait(function() {
                var maskCssClass = modal.bodyNode.loadingmask.overlayMask.get('cssClass'),
                    maskNode = Y.one('.' + maskCssClass);

                modal.hide();
            }, 100);

            this.wait(function() {
                Y.Assert.isFalse(maskNode.inDoc());
            }, 100);
        },

        /**
         * @tests AUI-3127
         */
        'test dialog-iframe-modal is closed after the escape key is pressed': function() {
            this.wait(function() {
                var iframe = modal.iframe;

                iframe._eventCloseOnEscapeHandle.detach();

                iframe._defaultLoadIframeFn();

                iframe.node.get('contentWindow').get('document').simulate(
                    'keydown',
                    {
                        keyCode: 27
                    }
                );

                Y.Assert.isFalse(modal.get('visible'), 'The modal should not be visible after the escape key is pressed');
            }, 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-dialog-iframe-deprecated', 'aui-modal', 'node-event-simulate']
});
