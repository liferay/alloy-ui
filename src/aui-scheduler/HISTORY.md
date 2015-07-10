# AUI Scheduler

> Documentation and test modifications are not included in this changelog. For more details, see [full commit history](https://github.com/liferay/alloy-ui/commits/master/src/aui-scheduler).

## @VERSION@

* [AUI-1929](https://issues.liferay.com/browse/AUI-1929) Alloy Scheduler does not add long events to each day the event occurs on in Agenda view.
* [AUI-1920](https://issues.liferay.com/browse/AUI-1920) Calendar - Hiding calendar does not update neither events nor "Show n more" link
* [AUI-1893](https://issues.liferay.com/browse/AUI-1893) Wrong display of recurrent overnight events in week view in the last day of first week under DST
* [AUI-1880](https://issues.liferay.com/browse/AUI-1880) Overlapping events don't show up correctly
* [AUI-1871](https://issues.liferay.com/browse/AUI-1871) In month view, popover does not update values if an event was previously displayed

## [3.0.1](https://github.com/liferay/alloy-ui/releases/tag/3.0.1)

* [AUI-1856](https://issues.liferay.com/browse/AUI-1856) Incorrect display of overnight events in monthly view
* [AUI-1865](https://issues.liferay.com/browse/AUI-1865) In month view, events spanning into DST are not displayed in the last day of first DST week
* [AUI-1864](https://issues.liferay.com/browse/AUI-1864) In month view, events spanning into DST are not displayed in the week the DST starts
* [AUI-1857](https://issues.liferay.com/browse/AUI-1857) "Show x more" in scheduler monthly view shows events in wrong time format
* [AUI-1854](https://issues.liferay.com/browse/AUI-1854) Calendar, Week View, Events at the and of every day are not displayed properly
* [AUI-1835](https://issues.liferay.com/browse/AUI-1835) Scheduler views select dropdown is not set to active view on render
* [AUI-1673](https://issues.liferay.com/browse/AUI-1673) Scheduler button for table-view is lowercase and inconsistent with the other view buttons
* [AUI-1653](https://issues.liferay.com/browse/AUI-1653) Clean up wrong A.Lang.isNode calls
* [AUI-1809](https://issues.liferay.com/browse/AUI-1809) Events with duration longer than a week don't render correctly on month view
* [AUI-1640](https://issues.liferay.com/browse/AUI-1640) Scheduler should create SchedulerEvent instances lazily
* [AUI-1652](https://issues.liferay.com/browse/AUI-1652) Update Scheduler Agenda View
* [AUI-1656](https://issues.liferay.com/browse/AUI-1656) Uniform styling for week and month headers
* [AUI-1651](https://issues.liferay.com/browse/AUI-1651) Group Scheduler Controls Into One Bar
* [AUI-1671](https://issues.liferay.com/browse/AUI-1671) Convert scheduler 'view' buttons into a dropdown list
* [AUI-1660](https://issues.liferay.com/browse/AUI-1660) Move scheduler date down into the calendar views
* [AUI-1771](https://issues.liferay.com/browse/AUI-1771) Display all events in scheduler's month view
* [AUI-1772](https://issues.liferay.com/browse/AUI-1772) Improve performance of SchedulerTableView plotEvents method

## [3.0.0](https://github.com/liferay/alloy-ui/releases/tag/3.0.0)

* [AUI-1672](https://issues.liferay.com/browse/AUI-1672) Scheduler navigation date for week view is not formatted correctly
* [AUI-1641](https://issues.liferay.com/browse/AUI-1641) Events in agenda view does not respond to "click" event when scheduler is disabled
* [AUI-1635](https://issues.liferay.com/browse/AUI-1635) Fix lint problems
* [AUI-1601](https://issues.liferay.com/browse/AUI-1601) Source format media query max-width for consistency with Bootstrap
* [AUI-1611](https://issues.liferay.com/browse/AUI-1611) The scheduler-event-recorder-date on the popover is not updated after the first click when clicking multiple dates in a row.
* [AUI-1591](https://issues.liferay.com/browse/AUI-1591) Fix scheduler behavior on touch screen desktop computers
* [AUI-1546](https://issues.liferay.com/browse/AUI-1546) The Scheduler month view is incorrect if there are multiple overlapping events at the first day of the week
* [AUI-1544](https://issues.liferay.com/browse/AUI-1544) Javascript error breaks Scheduler month view with multiple overlapping events
* [AUI-1527](https://issues.liferay.com/browse/AUI-1527) add base keyboard navigation
* [AUI-1531](https://issues.liferay.com/browse/AUI-1531) Scroll to current time when opening scheduler
* [AUI-1530](https://issues.liferay.com/browse/AUI-1530) Show red line at current time on Scheduler
* [AUI-1309](https://issues.liferay.com/browse/AUI-1309) Make aui-scheduler responsive
* [AUI-1376](https://issues.liferay.com/browse/AUI-1376) AUI-Scheduler tests fail on IE8
* [AUI-1328](https://issues.liferay.com/browse/AUI-1328) Move automated tasks from Grunt to Gulp
* [AUI-1370](https://issues.liferay.com/browse/AUI-1370) Add ability to set an event's border color, style, and width
* [AUI-1287](https://issues.liferay.com/browse/AUI-1287) Wrong css formatting when running "grunt format"
* [AUI-1174](https://issues.liferay.com/browse/AUI-1174) Validate source code with JSHint
* [AUI-1098](https://issues.liferay.com/browse/AUI-1098) Upgrade to Bootstrap 3
* [AUI-1222](https://issues.liferay.com/browse/AUI-1222) Add .form-control to inputs and selects on Bootstrap 3
* [AUI-1241](https://issues.liferay.com/browse/AUI-1241)Fix Scheduler views toolbar alignment
* [AUI-1239](https://issues.liferay.com/browse/AUI-1239) Change grid system from .row-fluid to .row on Bootstrap 3
* [AUI-1235](https://issues.liferay.com/browse/AUI-1235) Change grid system from .span-* to .col-[lg|md|sm]-* on Bootstrap 3
* [AUI-1220](https://issues.liferay.com/browse/AUI-1220) Add .btn-default to .btn elements with no other color on Bootstrap 3
* [AUI-1223](https://issues.liferay.com/browse/AUI-1223) Use <span> instead of <i> when creating icons on Bootstrap 3
* [AUI-1224](https://issues.liferay.com/browse/AUI-1224) Add .glyphicon and change prefix from .icon-* to .glyphicon-* on Bootstrap 3

## [2.5.0](https://github.com/liferay/alloy-ui/releases/tag/2.5.0)

* [AUI-1163](https://issues.liferay.com/browse/AUI-1163) Remove unnecessary constants
* [AUI-1085](https://issues.liferay.com/browse/AUI-1085) Update Scheduler View Table to show abbreviated weekday names
