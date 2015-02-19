YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scheduler');
    var DateMath = Y.DataType.DateMath;

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
                eventRecorder: new Y.SchedulerEventRecorder(),
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

        'event color is encoded in RGB': function() {
            this._createScheduler();

            var events = this._scheduler.getEventsByDay(new Date(2013, 11, 6));
            Y.Assert.areEqual(1, events.length);

            var node = events[0].get('node').item(0);

            Y.Assert.isNotNull(node);
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('color'), 'rgb('));
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('backgroundColor'), 'rgb('));
        },

        'events in the scheduler view should respond to the click event': function() {
            var recorder;

            this._createScheduler();
            this._scheduler.set('disabled', true);

            recorder = this._scheduler.get('eventRecorder');

            Y.one('button.scheduler-base-view-month').simulate('click');
            Y.one('.scheduler-event').simulate('click');

            Y.Assert.isTrue(
                recorder.popover.get('visible'),
                'Popover should be visible when event is clicked in month view'
            );

            Y.one('button.scheduler-base-view-agenda').simulate('click');
            Y.one('.scheduler-view-agenda-event').simulate('click');

            Y.Assert.isTrue(
                recorder.popover.get('visible'),
                'Popover should be visible when event is clicked in agenda view'
            );
        },

        'should display the first week of an event in month view': function() {
            // Second Wednesday
            var startDate = new Date(2013, 11, 11, 12, 1);

            this._createScheduler({
                activeView: this._monthView,
                items: [
                    {
                        color: '#8D8',
                        content: 'Many days',
                        endDate: DateMath.add(startDate, DateMath.MONTH, 3),
                        startDate: startDate
                    }
                ]
            });

            var rows = Y.all('.scheduler-view-table-row');

            Y.Assert.areEqual(
                0, rows.item(0).all('.scheduler-event').size(),
                'There should be no event in the first row'
            );

            Y.Assert.areEqual(
                1, rows.item(1).all('.scheduler-event').size(),
                'There should be one event in the second row'
            );

            Y.Assert.areEqual(
                1, rows.item(2).all('.scheduler-event').size(),
                'There should be one event in the third row'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-scheduler', 'aui-datatype']
});
