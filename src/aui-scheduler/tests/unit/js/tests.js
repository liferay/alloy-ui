YUI.add('aui-scheduler-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scheduler');
    var DateMath = Y.DataType.DateMath;

    var today = new Date();
    var JANUARY_1 = DateMath.getJan1(today.getFullYear());
    var JULY_1 = DateMath.getDate(today.getFullYear(), 6, 1);
    var NO_DST_OFFSET = (JANUARY_1.getTimezoneOffset() === JULY_1.getTimezoneOffset());
    var WEEK_LENGTH = DateMath.WEEK_LENGTH;

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        _should: {
            ignore: {
                'should display event in month view in the week DST begins': NO_DST_OFFSET,
                'should display event in month view in the last day of first week under DST': NO_DST_OFFSET,
                'should not display "Show n more" link with only two events': NO_DST_OFFSET,
                'should display last day of event spanning to DST from one week before': NO_DST_OFFSET,
                'should display events spanning into DST correctly in week view when last day of week is the first day under DST': NO_DST_OFFSET
            }
        },

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

        _clickColgrid: function(index) {
            var colgrid = Y.all('.scheduler-view-table-colgrid').item(index),
                offsetXY = colgrid.getXY();

            // "event-simulate" module does not support pageX/pageY values
            this._monthView._onMouseDownGrid({
                pageX: offsetXY[0]+1,
                pageY: offsetXY[1]+1,
                target: colgrid,
            });
            this._monthView._onMouseUpGrid();
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

            this._eventRecorder = this._scheduler.get('eventRecorder');
        },

        _getLocalTimeZoneDSTFirstDay: function() {
            var curDate = JULY_1,
                dstOffset = Math.min(JANUARY_1.getTimezoneOffset(), JULY_1.getTimezoneOffset()),
                prevDate = DateMath.subtract(curDate, DateMath.DAY, 1),
                step;

            if (NO_DST_OFFSET) {
                return null;
            }

            dstOffset = Math.min(JANUARY_1.getTimezoneOffset(), JULY_1.getTimezoneOffset());
            curDate = JULY_1;
            prevDate = DateMath.subtract(curDate, DateMath.DAY, 1);

            if (curDate.getTimezoneOffset() !== dstOffset) {
                // If current date is not under DST, go forward to find when
                // DST will start.
                step = 1;
            }
            else {
                // If current date is under DST, go back to find when DST
                // started.
                step = -1;
            }

            while (prevDate.getTimezoneOffset() <= curDate.getTimezoneOffset()) {
                prevDate = DateMath.add(prevDate, DateMath.DAY, step);
                curDate = DateMath.add(curDate, DateMath.DAY, step);
            }

            // The returned date should satisfy some criteria. Here we check
            // whether they are true. Since time zone rules are complex and
            // prone to change, this ensures the test will fail if it cannot
            // proceed.
            Y.Assert.isFalse(
                DateMath.isDayOverlap(prevDate, DateMath.subtract(curDate, DateMath.DAY, 1)),
                'The previous date should be one day before the current one'
            );

            Y.Assert.areEqual(
                curDate.getTimezoneOffset(),
                dstOffset,
                'The current date should have DST offset'
            );

            Y.Assert.isTrue(
                curDate.getTimezoneOffset() < prevDate.getTimezoneOffset(),
                'The previous date should have a smaller offset'
            );

            return curDate;
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

        'views select dropdown should be set to active view': function() {
            this._createScheduler({
                activeView: this._monthView
            });

            var options = this._scheduler.viewsSelectNode.get('childNodes');
            var selectedIndex = this._scheduler.viewsSelectNode.get('selectedIndex');

            Y.Assert.areSame(
                this._scheduler.get('activeView').get('name'),
                options.item(selectedIndex).getAttribute('data-view-name'),
                'The views select dropdown should be set to month view'
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
        },

        'should display event in month view in the week DST begins': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                rows,
                startDate;

            endDate = DateMath.add(dstDate, DateMath.MONTH, 1);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 1);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: firstDayOfWeek.getDay(),
                items: [
                    {
                        color: '#8D8',
                        content: 'Many days',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            rows = Y.all('.scheduler-view-table-row');

            rows.each(function(row, index) {
                Y.Assert.areEqual(
                    1, row.all('.scheduler-event').size(),
                    'There should be an event at row #'.concat(index)
                );
            });
        },

        'should display event in month view in the last day of first week under DST': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                events,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                startDate;

            endDate = DateMath.add(dstDate, DateMath.MONTH, 2);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 2);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: (firstDayOfWeek.getDay() - 1) % WEEK_LENGTH,
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            events = Y.all('.scheduler-event');

            events.each(function(event, index) {
                var column = event.ancestor('.scheduler-view-table-data-col');

                Y.Assert.areEqual(
                    WEEK_LENGTH, column.getAttribute('colspan'),
                    'Event column #'.concat(index).concat(' should fill row.')
                );
            });
        },

        'should not display "Show n more" link with only two events': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                startDate;

            endDate = DateMath.add(dstDate, DateMath.MONTH, 2);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 2);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: (firstDayOfWeek.getDay() - 1) % WEEK_LENGTH,
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    },
                    {
                        color: '#474',
                        content: 'Event 2',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            Y.Assert.areEqual(
                0, Y.all('.scheduler-view-table-more').size(),
                '"Show n more" link should not be displayed.'
            );
        },

        'should display last day of event spanning to DST from one week before': function() {
            var column,
                dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                events,
                startDate;

            endDate = DateMath.subtract(dstDate, DateMath.DAY, 1);
            startDate = DateMath.subtract(dstDate, DateMath.DAY, WEEK_LENGTH);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: startDate.getDay(),
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            events = Y.all('.scheduler-event');

            Y.Assert.areEqual(
                1, events.size(),
                'Event should span through only one week'
            );

            column = events.item(0).ancestor('.scheduler-view-table-data-col');

            Y.Assert.areEqual(
                WEEK_LENGTH, column.getAttribute('colspan'),
                'Event should fill entire week.'
            );
        },

        'should update popover (first click an event, then an empty day)': function() {
            var descriptionHint,
                event = {
                    allDay: true,
                    color: '#8D8',
                    content: 'Existing event',
                    endDate: new Date(2013, 11, 2),
                    startDate: new Date(2013, 11, 2)
                },
                formattedEventStartDate,
                formattedFirstDay;

            this._createScheduler({
                activeView: this._monthView,
                items: [event]
            });

            // Values to check
            descriptionHint = this._eventRecorder.get('strings')['description-hint'];
            formattedEventStartDate = Y.DataType.Date.format(
                event.startDate,
                {
                    format: this._eventRecorder.get('dateFormat'),
                    locale: this._scheduler.get('locale')
                }
            );
            formattedFirstDay = Y.DataType.Date.format(
                new Date(2013, 11, 1),
                {
                    format: this._eventRecorder.get('dateFormat'),
                    locale: this._scheduler.get('locale')
                }
            );

            Y.one('.scheduler-event').simulate('click');
            Y.Assert.areEqual(
                event.content,
                Y.one('.scheduler-event-recorder-content').getAttribute('value'),
                'The recorder content should be the event content'
            );
            Y.Assert.areEqual(
                formattedEventStartDate,
                Y.one('.scheduler-event-recorder-date').get('text'),
                'The recorder date should display the event date'
            );

            this._clickColgrid(0);
            Y.Assert.areEqual(
                descriptionHint,
                Y.one('.scheduler-event-recorder-content').getAttribute('value'),
                'The recorder content should be the default content'
            );
            Y.Assert.areEqual(
                formattedFirstDay,
                Y.one('.scheduler-event-recorder-date').get('text'),
                'The recorder date should NOT display the event date'
            );
        },

        'should update popover (first click an empty day, then another)': function() {
            var descriptionHint,
                formattedFirstDay,
                formattedSecondDay;

            this._createScheduler({
                activeView: this._monthView,
                items: []
            });

            // Values to check
            descriptionHint = this._eventRecorder.get('strings')['description-hint'];
            formattedFirstDay = Y.DataType.Date.format(
                new Date(2013, 11, 1),
                {
                    format: this._eventRecorder.get('dateFormat'),
                    locale: this._scheduler.get('locale')
                }
            );
            formattedSecondDay = Y.DataType.Date.format(
                new Date(2013, 11, 2),
                {
                    format: this._eventRecorder.get('dateFormat'),
                    locale: this._scheduler.get('locale')
                }
            );

            this._clickColgrid(0);
            Y.Assert.areEqual(
                descriptionHint,
                Y.one('.scheduler-event-recorder-content').getAttribute('value'),
                'The recorder content should be the default content'
            );
            Y.Assert.areEqual(
                formattedFirstDay,
                Y.one('.scheduler-event-recorder-date').get('text'),
                'The recorder date should display the first day'
            );

            this._clickColgrid(1);
            Y.Assert.areEqual(
                descriptionHint,
                Y.one('.scheduler-event-recorder-content').getAttribute('value'),
                'The recorder content should be the default content'
            );
            Y.Assert.areEqual(
                formattedSecondDay,
                Y.one('.scheduler-event-recorder-date').get('text'),
                'The recorder date should NOT display the second day'
            );
        },

        'should display events spanning into DST correctly in week view when last day of week is the first day under DST': function() {
            var columns,
            	currentDate,
            	dstDate,
                previousDate,
                schedulerEvents;

            dstDate = this._getLocalTimeZoneDSTFirstDay(),
            currentDate = DateMath.toMidnight(DateMath.subtract(dstDate, DateMath.DAY, 1)),
            previousDate = DateMath.toMidnight(DateMath.subtract(dstDate, DateMath.DAY, 2));

            this._createScheduler({
                activeView: this._weekView,
                date: previousDate,
                firstDayOfWeek: dstDate.getDay(),
                items: [
                    {
                        content: 'Event 1',
                        startDate: DateMath.add(new Date(previousDate.getTime()), DateMath.HOUR, 23),
                        endDate: DateMath.add(new Date(previousDate.getTime()), DateMath.HOUR, 25)
                    },
                    {
                        content: 'Event 2',
                        startDate: DateMath.add(new Date(currentDate.getTime()), DateMath.HOUR, 23),
                        endDate: DateMath.add(new Date(currentDate.getTime()), DateMath.HOUR, 25)
                    }
                ]
            });

            schedulerEvents = Y.all('.scheduler-event');

            Y.Assert.areEqual(
                3, schedulerEvents.size(),
                '3 SchedulerEvent nodes should be in week view.'
            );

            columns = Y.all('.scheduler-view-day-table-colday');

            Y.Assert.areEqual(
                1, columns.item(5).all('.scheduler-event').size(),
                '1 SchedulerEvent node should be in column1Events column.'
            );

            Y.Assert.areEqual(
                2, columns.item(6).all('.scheduler-event').size(),
                '2 SchedulerEvent nodes should be in column2Events column.'
            );
        },

        'should display overlapping events correctly in week view': function() {
            var column1,
                column1Events,
                column2,
                column2Events,
                intersectingEvents,
                schedulerEvents;

            this._createScheduler({
                activeView: this._weekView,
                date: new Date(2015, 02, 22),
                firstDayOfWeek: 0,
                items: [
                    {
                        content: 'Event 1',
                        startDate: new Date(2015, 2, 25, 11, 0),
                        endDate: new Date(2015, 2, 25, 16, 30)
                    },
                    {
                        content: 'Event 2',
                        startDate: new Date(2015, 2, 25, 15, 30),
                        endDate: new Date(2015, 2, 25, 17, 0),
                    },
                    {
                        content: 'Event 3',
                        startDate: new Date(2015, 2, 25, 16, 0),
                        endDate: new Date(2015, 2, 26, 11, 0),
                    },
                    {
                        content: 'Event 4',
                        startDate: new Date(2015, 2, 25, 18, 0),
                        endDate: new Date(2015, 2, 26, 12, 30),
                    }
                ]
            });

            schedulerEvents = Y.all('.scheduler-event');

            Y.Assert.areEqual(
                6, schedulerEvents.size(),
                '6 SchedulerEvent nodes should be in week view.'
            );

            intersectingEvents = Y.all('.scheduler-event.scheduler-event-intersecting');

            Y.Assert.areEqual(
                6, intersectingEvents.size(),
                '6 intersecting SchedulerEvent nodes should be in week view.'
            );

            column1 = intersectingEvents.item(0).ancestor('.scheduler-view-day-table-colday');

            column1Events = column1.all('.scheduler-event.scheduler-event-intersecting');

            Y.Assert.areEqual(
                4, column1Events.size(),
                '4 intersecting SchedulerEvent nodes should be in column1Events column.'
            );

            column2 = intersectingEvents.item(4).ancestor('.scheduler-view-day-table-colday');

            column2Events = column2.all('.scheduler-event.scheduler-event-intersecting');

            Y.Assert.areEqual(
                2, column2Events.size(),
                '2 intersecting SchedulerEvent nodes should be in column2Events column.'
            );

            Y.Assert.areNotEqual(
                column2Events.item(0).getStyle('left'), column2Events.item(1).getStyle('left'),
                '2 SchedulerEvents which are intersecting with each other can not have the same left style value.'
            );
        },

        'should display the events overlay entirely': function() {
            var events = [];

            var displayDate = new Date(2014, 2, 8);
            var eventDate = new Date(2014, 3, 5);

            for (var i = 0; i < 10; i++) {
                events.push(
                    {
                        color: 'c2a374',
                        content: 'dummy ' + i,
                        endDate: eventDate,
                        startDate: eventDate,
                        allDay: true
                    }
                );
            }

            this._createScheduler({
              items: events,
              date: displayDate,
              activeView: this._monthView
            });

            Y.one('.scheduler-view-table-more').simulate('click');

            var schedulerBB = this._scheduler.get('boundingBox');
            var schedulerRect = schedulerBB._node.getBoundingClientRect();

            var overlay = this._monthView.eventsOverlay;
            var overlayBB = overlay.get('boundingBox');
            var overlayRect = overlayBB._node.getBoundingClientRect();

            Y.Assert.isTrue(
                schedulerRect.top >= 0,
                'The top of the events overlay should be inside the viewport.'
            );
            Y.Assert.isTrue(
                overlayRect.bottom <= Y.one('body').get('winHeight'),
                'The bottom of the events overlay should be inside the viewport.'
            );
            Y.Assert.isTrue(
                schedulerRect.left >= 0,
                'The left of the events overlay should be inside the viewport.'
            );
            Y.Assert.isTrue(
                overlayRect.right <= Y.one('body').get('winWidth'),
                'The right of the events overlay should be inside the viewport.'
            );
        },

        'should not prevent "syncEventsUI" from being called if the skipSyncUI event property is not present': function() {
            var displayDate = new Date(2015, 9, 24);
            var eventDate = new Date(2015, 9, 24);

            var additionalEvents = [
                {
                    content: 'Event 2',
                    endDate: eventDate,
                    startDate: eventDate
                }
            ];

            var initialEvents = [
                {
                    content: 'Event 1',
                    endDate: eventDate,
                    startDate: eventDate
                }
            ];

            this._createScheduler({
                date: displayDate,
                activeView: this._monthView,
                items: initialEvents
            });

            var schedulerCalendar = new Y.SchedulerCalendar({
                scheduler: this._scheduler
            });

            Y.Assert.areEqual(
                1, Y.all('.scheduler-event').size(),
                '1 event should display.'
            );

            schedulerCalendar.reset(additionalEvents);

            Y.Assert.areEqual(
                2, Y.all('.scheduler-event').size(),
                '2 events should display.'
            );
        },

        'should prevent "syncEventsUI" from being called if the skipSyncUI event property is present': function() {

            var displayDate = new Date(2015, 9, 24);
            var eventDate = new Date(2015, 9, 24);

            var additionalEvents = [
                {
                    content: 'Event 2',
                    endDate: eventDate,
                    startDate: eventDate
                }
            ];

            var initialEvents = [
                {
                    content: 'Event 1',
                    endDate: eventDate,
                    startDate: eventDate
                }
            ];

            this._createScheduler({
                date: displayDate,
                activeView: this._monthView,
                items: initialEvents
            });

            var schedulerCalendar = new Y.SchedulerCalendar({
                scheduler: this._scheduler
            });

            Y.Assert.areEqual(
                1, Y.all('.scheduler-event').size(),
                '1 events should display.'
            );

            schedulerCalendar.reset(additionalEvents, { skipSyncUI: true });

            Y.Assert.areEqual(
                1, Y.all('.scheduler-event').size(),
                '1 event should display.'
            );

            this._scheduler.syncEventsUI();

            Y.Assert.areEqual(
                2, Y.all('.scheduler-event').size(),
                '2 events should display.'
            );
        },

        'should sort events by date and time': function() {
            var testText = 'Event Sept. 1 @ 6';

            var events = [
                {
                    content: 'Event Sept. 30 @ 6',
                    startDate: new Date(2015, 8, 30, 6),
                    endDate: new Date(2015, 8, 30, 7)
                },

                {
                    content: testText,
                    startDate: new Date(2015, 8, 1, 6),
                    endDate: new Date(2015, 8, 1, 7)
                },
                {
                    content: 'Event Sept. 1 @ 7',
                    startDate: new Date(2015, 8, 1, 7),
                    endDate: new Date(2015, 8, 1, 8)
                },
                {
                    content: 'Event Sept. 1 @ 8',
                    startDate: new Date(2015, 8, 1, 8),
                    endDate: new Date(2015, 8, 1, 9)
                },

                {
                    content: 'Event Sept. 2 @ 6',
                    startDate: new Date(2015, 8, 2, 6),
                    endDate: new Date(2015, 8, 2, 7)
                },
                {
                    content: 'Event Sept. 2 @ 7',
                    startDate: new Date(2015, 8, 2, 7),
                    endDate: new Date(2015, 8, 2, 8)
                },
                {
                    content: 'Event Sept. 2 @ 8',
                    startDate: new Date(2015, 8, 2, 8),
                    endDate: new Date(2015, 8, 2, 9)
                },

                {
                    content: 'Event Sept. 3 @ 6',
                    startDate: new Date(2015, 8, 3, 6),
                    endDate: new Date(2015, 8, 3, 7)
                },
                {
                    content: 'Event Sept. 3 @ 7',
                    startDate: new Date(2015, 8, 3, 7),
                    endDate: new Date(2015, 8, 3, 8)
                },
                {
                    content: 'Event Sept. 3 @ 8',
                    startDate: new Date(2015, 8, 3, 8),
                    endDate: new Date(2015, 8, 3, 9)
                },

                {
                    content: 'Event Sept. 4 @ 6',
                    startDate: new Date(2015, 8, 4, 6),
                    endDate: new Date(2015, 8, 4, 7)
                }
            ];

            var displayDate = new Date(2015, 8, 1);

            this._createScheduler({
                date: displayDate,
                activeView: this._monthView,
                items: events
            });

            Y.Assert.areEqual(
                testText, Y.one('.scheduler-event .scheduler-event-content').text(),
                'First event should be: ' + testText
            );
        },

        'should display all-day event in day view': function() {
            var displayDate = new Date(2015, 9, 24),
                startDate = new Date(2015, 9, 24),
                endDate =  new Date(2015, 9, 24, 23, 59, 59);

            var events = [
                {
                    allDay: true,
                    content: 'Event 2',
                    endDate: endDate,
                    startDate: startDate,
                }
            ];

            this._createScheduler({
                date: displayDate,
                views: [this._dayView],
                items: events
            });

            Y.Assert.areEqual(
                1, Y.all('.scheduler-event').size(),
                'The all-day event should be displayed.'
            );
        },

        'should limit number of days in agenda view': function() {
            var startDate = new Date(2016, 3, 1);
            var endDate = new Date(2016, 6, 1);

            var events = [
                {
                    content: 'Event',
                    endDate: endDate,
                    startDate: startDate,
                }
            ];

            this._agendaView.set('daysCount', 10);

            this._createScheduler({
              date: startDate,
              items: events,
              views: [this._agendaView]
            });

            Y.Assert.areEqual(
                10, Y.all('.scheduler-view-agenda-event').size(),
                'Should show at most 10 events.'
            );
        },

        'should display all instances of event in agenda view regardless of start time': function() {
            var startDate = new Date(2016, 3, 1);
            var endDate = new Date(2016, 6, 1);

            var events = [
                {
                    content: 'Event 1',
                    endDate: DateMath.add(endDate, DateMath.MONTH, 1),
                    startDate: DateMath.subtract(startDate, DateMath.MONTH, 1),
                },
                {
                    content: 'Event 2',
                    endDate: endDate,
                    startDate: startDate,
                }
            ];

            this._agendaView.set('daysCount', 10);

            this._createScheduler({
              date: startDate,
              items: events,
              views: [this._agendaView]
            });

            Y.Assert.areEqual(
                20, Y.all('.scheduler-view-agenda-event').size(),
                'Should show exactly 20 events.'
            );
        },

        'should refresh number of displayed events if days count is updated': function() {
            var startDate = new Date(2016, 3, 1);
            var endDate = new Date(2016, 6, 1);

            var events = [
                {
                    content: 'Event',
                    endDate: endDate,
                    startDate: startDate,
                }
            ];

            this._agendaView.set('daysCount', 10);

            this._createScheduler({
              date: startDate,
              items: events,
              views: [this._agendaView]
            });

            Y.Assert.areEqual(
                10, Y.all('.scheduler-view-agenda-event').size(),
                'Should show at most 10 events.'
            );

            this._agendaView.set('daysCount', 20);

            Y.Assert.areEqual(
                20, Y.all('.scheduler-view-agenda-event').size(),
                'Should show at most 20 events.'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-scheduler', 'aui-datatype']
});
