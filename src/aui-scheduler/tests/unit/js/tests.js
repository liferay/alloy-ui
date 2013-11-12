YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scheduler'),
        scheduler,
        weekView;

    weekView = new Y.SchedulerWeekView();

    var events = [
        {
            color: '#8D8',
            content: 'Colorful',
            endDate: new Date(2013, 11, 6, 6),
            startDate: new Date(2013, 11, 6, 2)
        }
    ];

    scheduler = new Y.Scheduler({
        activeView: weekView,
        boundingBox: '#myScheduler',
        date: new Date(2013, 11, 4),
        items: events,
        render: true,
        views: [weekView]
    });

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',
        'test is empty': function() {
            Y.Assert.pass('No Tests Provided For This Module');
        },

        /*
         * @tests AUI-1045
         */
        'event color is encoded in RGB': function() {
            var events = scheduler.getEventsByDay(new Date(2013, 11, 6));
            Y.Assert.areEqual(1, events.length);

            var node = events[0].get('node').item(0);

            Y.Assert.isNotNull(node);
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('color'), 'rgb('));
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('backgroundColor'), 'rgb('));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-scheduler']
});
