# AUI Layout

> Documentation and test modifications are not included in this changelog. For more details, see [full commit history](https://github.com/liferay/alloy-ui/commits/master/src/aui-layout).

## @VERSION@

* [AUI-2116](https://issues.liferay.com/browse/AUI-2116) Drag handlers keeps highlighted if user click on them but don't start dragging
* [AUI-2114](https://issues.liferay.com/browse/AUI-2114) The Add field buttons aren't activated when the user swap the page while he start moving a row
* [AUI-2104](https://issues.liferay.com/browse/AUI-2104) Users should not be able to interact to some features of the form builder while it is moving a row or a column
* [AUI-2097](https://issues.liferay.com/browse/AUI-2097) Move field button doesn't appear if the user navigates pressing tab key
* [AUI-2095](https://issues.liferay.com/browse/AUI-2095) Disable move row action on escape key press
* [AUI-2093](https://issues.liferay.com/browse/AUI-2093) Fix arrow icons alignment of the resize column handler
* [AUI-2090](https://issues.liferay.com/browse/AUI-2090) Create string attribute entries to those sentences which are inside templates
* [AUI-2089](https://issues.liferay.com/browse/AUI-2089) Wrong string "Past Here" should be "Paste Here"
* [AUI-2072](https://issues.liferay.com/browse/AUI-2072) Paste row area and paste field area should have the same add field button's style
* [AUI-2073](https://issues.liferay.com/browse/AUI-2073) Set the tab order on Form Builder
* [AUI-1994](https://issues.liferay.com/browse/AUI-1994) Adds borders as separators on the Form Builder
* [AUI-2033](https://issues.liferay.com/browse/AUI-2033) Change add/resize column icon

## [3.0.3](https://github.com/liferay/alloy-ui/releases/tag/3.0.3)

No changes.

## [3.0.2](https://github.com/liferay/alloy-ui/releases/tag/3.0.2)

* [AUI-2030](https://issues.liferay.com/browse/AUI-2030) A row with one col should be automatically added on last position when the last row have at least one field
* [AUI-2036](https://issues.liferay.com/browse/AUI-2036) AUI Form Builder Field Settings Modal should not overwrite Bootstrap 3 Modal css rules so that the layout keeps as similar as possible
* [AUI-2031](https://issues.liferay.com/browse/AUI-2031) JavaScript error thrown when trying to split a row into two columns
* [AUI-2016](https://issues.liferay.com/browse/AUI-2016) Remove column delete button from From Builder
* [AUI-1930](https://issues.liferay.com/browse/AUI-1930) Change functionality of add cols
* [AUI-1939](https://issues.liferay.com/browse/AUI-1939) Fix form builder column resizing after the first page / layout
* [AUI-1928](https://issues.liferay.com/browse/AUI-1928) Fields should be moved between others field in a same col
* [AUI-1918](https://issues.liferay.com/browse/AUI-1918) Change functionality of remove rows
* [AUI-1922](https://issues.liferay.com/browse/AUI-1922) Fixing localization issues on Form Builder
* [AUI-1885](https://issues.liferay.com/browse/AUI-1885) Allows adding multiple fields on the same column
* [AUI-1887](https://issues.liferay.com/browse/AUI-1887) Form builder should have pages, not page breaks
* [AUI-1858](https://issues.liferay.com/browse/AUI-1858) FormBuilder should be able to receive layout as a configuration object
* [AUI-1830](https://issues.liferay.com/browse/AUI-1830) Button to move field should be inside the field's toolbar
* [AUI-1755](https://issues.liferay.com/browse/AUI-1755) Button for adding page breaks should be on the left of the button to add rows
* [AUI-1842](https://issues.liferay.com/browse/AUI-1842) Fix column resize handlers allowing to drag outside the layout
* [AUI-1815](https://issues.liferay.com/browse/AUI-1815) Scroll shouldn't change while adding columns in layout builder
* [AUI-1829](https://issues.liferay.com/browse/AUI-1829) Be able to change layout when using progressive enhancement
* [AUI-1812](https://issues.liferay.com/browse/AUI-1812) Fix layout builder bug on IE
* [AUI-1802](https://issues.liferay.com/browse/AUI-1802) Add name as an advanced field setting
* [AUI-1824](https://issues.liferay.com/browse/AUI-1824) Change move col from events to attributes
* [AUI-1805](https://issues.liferay.com/browse/AUI-1805) Moving rows and columns should be 2 separate features
* [AUI-1807](https://issues.liferay.com/browse/AUI-1807) Update layout row height when columns are resized
* [AUI-1731](https://issues.liferay.com/browse/AUI-1731) Make LayoutBuilder use progressive enhancement
* [AUI-1803](https://issues.liferay.com/browse/AUI-1803) Should be able to add and resize columns on main mode
* [AUI-1791](https://issues.liferay.com/browse/AUI-1791) Changing a field's content should update its row height
* [AUI-1788](https://issues.liferay.com/browse/AUI-1788) Button for adding new rows should always add a single column
* [AUI-1758](https://issues.liferay.com/browse/AUI-1758) LayoutBuilder should allow all breakpoints and should not have a min width
* [AUI-1754](https://issues.liferay.com/browse/AUI-1754) Layout should have option to keep all columns in a row with the same height
* [AUI-1780](https://issues.liferay.com/browse/AUI-1780) Fix bug with button for adding rows adding multiple rows on each click
* [AUI-1757](https://issues.liferay.com/browse/AUI-1757) Improvements to layout builder's button for adding rows
* [AUI-1721](https://issues.liferay.com/browse/AUI-1721) Improve interactions for LayoutBuilder on smartphones
* [AUI-1756](https://issues.liferay.com/browse/AUI-1756) The position of layout builder's breakpoint nodes should be fluid
* [AUI-1727](https://issues.liferay.com/browse/AUI-1727) Add keyboard navigation to layout builder
* [AUI-1711](https://issues.liferay.com/browse/AUI-1711) Improve interaction of adding new rows
* [AUI-1745](https://issues.liferay.com/browse/AUI-1745) Investigate and fix performance problems on Layout Builder
* [AUI-1726](https://issues.liferay.com/browse/AUI-1726) Position buttons to add/remove columns according to wireframe
* [AUI-1720](https://issues.liferay.com/browse/AUI-1720) Allow moving fields inside existing fields
* [AUI-1709](https://issues.liferay.com/browse/AUI-1709) Flags to indicate if col/row is movable/removable
* [AUI-1698](https://issues.liferay.com/browse/AUI-1698) Layout builder mode
* [AUI-1725](https://issues.liferay.com/browse/AUI-1725) Add option to specify max number of columns per row
* [AUI-1719](https://issues.liferay.com/browse/AUI-1719) Move columns inside a row
* [AUI-1707](https://issues.liferay.com/browse/AUI-1707) Button to move row
* [AUI-1704](https://issues.liferay.com/browse/AUI-1704) Drag handles for all columns should update position during drag
* [AUI-1708](https://issues.liferay.com/browse/AUI-1708) Button to remove rows
* [AUI-1722](https://issues.liferay.com/browse/AUI-1722) Button to add rows
* [AUI-1718](https://issues.liferay.com/browse/AUI-1718) Should be able to enable/disable each feature of LayoutBuilder
* [AUI-1705](https://issues.liferay.com/browse/AUI-1705) Buttons to add and remove columns
* [AUI-1703](https://issues.liferay.com/browse/AUI-1703) New Layouts should enforce row sizes to equal 12
* [AUI-1702](https://issues.liferay.com/browse/AUI-1702) LayoutBuilder should receive array of breakpoints
* [AUI-1676](https://issues.liferay.com/browse/AUI-1676) Move drag handle throughout the row
* [AUI-1710](https://issues.liferay.com/browse/AUI-1710) LayoutBuilder should guarantee rows will have size 12
* [AUI-1681](https://issues.liferay.com/browse/AUI-1681) Improve drag handler interactions
* [AUI-1680](https://issues.liferay.com/browse/AUI-1680) Improve events management
* [AUI-1679](https://issues.liferay.com/browse/AUI-1679) Add and remove cols/rows from Layout
* [AUI-1678](https://issues.liferay.com/browse/AUI-1678) Create Layout Builder module with basic features
* [AUI-1677](https://issues.liferay.com/browse/AUI-1677) Create Layout module with basic features
