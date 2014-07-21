YUI.add('aui-scheduler-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scheduler');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp: function() {
            this._agendaView = new Y.SchedulerAgendaView(),
            this._dayView = new Y.SchedulerDayView(),
            this._monthView = new Y.SchedulerMonthView(),
            this._weekView = new Y.SchedulerWeekView();
        },

        tearDown: function() {
            if (this._scheduler) {
                this._scheduler.destroy();
                delete this._scheduler;
            }
        },

        _createScheduler: function(config) {
            this._scheduler = new Y.Scheduler(Y.merge({
                boundingBox: '#myScheduler',
                date: new Date(2013, 11, 4),
                items: [
                    {
                        color: '#8D8',
                        content: 'Colorful',
                        endDate: new Date(2013, 11, 6, 6),
                        startDate: new Date(2013, 11, 6, 2)
                    }
                ],
                render: true,
                views: [
                    this._weekView,
                    this._dayView,
                    this._monthView,
                    this._agendaView
                ]
            }, config));
        },

        'should be able to switch views': function() {
            this._createScheduler();

            Y.Assert.areSame(
                this._weekView,
                this._scheduler.get('activeView'),
                'The initial view should be week view'
            );

            Y.one('button.scheduler-base-view-day').simulate('click');
            Y.Assert.areSame(
                this._dayView,
                this._scheduler.get('activeView'),
                'The day view should have become active'
            );

            Y.one('button.scheduler-base-view-month').simulate('click');
            Y.Assert.areSame(
                this._monthView,
                this._scheduler.get('activeView'),
                'The month view should have become active'
            );

            Y.one('button.scheduler-base-view-agenda').simulate('click');
            Y.Assert.areSame(
                this._agendaView,
                this._scheduler.get('activeView'),
                'The agenda view should have become active'
            );
        },

        'event color is encoded in RGB': function() {
            this._createScheduler();

            var events = this._scheduler.getEventsByDay(new Date(2013, 11, 6));
            Y.Assert.areEqual(1, events.length);

            var node = events[0].get('node').item(0);

            Y.Assert.isNotNull(node);
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('color'), 'rgb('));
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('backgroundColor'), 'rgb('));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-scheduler']
});
