YUI.add('aui-io-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-io');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

		/*
		 * Check's if the method get & GET can both be used
		 *
		 * @tests AUI-843
		 */
		'check get case': function() {
			var ioRequest1 = Y.io.request (
				'',
				{
				cache: 'false',
				method: 'GET',
				}
			);

			var ioRequest2 = Y.io.request (
				'',
				{
				cache: 'false',
				method: 'get',
				}
			);

			Y.Assert.areSame(ioRequest1.get('method'), ioRequest2.get('method'));
		},
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-io']
});
