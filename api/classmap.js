YAHOO.env.classMap = {"Paginator": "aui-paginator", "ImageViewer": "aui-image-viewer", "A.HTML5": "aui-node", "A.Plugin.IO": "aui-io", "OverlayLoading": "aui-overlay", "A.Node": "aui-node", "Tooltip": "aui-tooltip", "OverlayContextManager": "aui-overlay", "FormManager": "gallery-formmgr", "A.NodeList": "aui-node", "OverlayContextPanelManager": "aui-overlay", "DelayedTask": "aui-delayed-task", "Editable": "aui-editable", "DatePickerSelect": "aui-calendar", "ImageViewerMask": "aui-image-viewer", "AutoComplete": "aui-autocomplete", "DialogMask": "aui-dialog", "ImageGallery": "aui-image-viewer", "OverlayBase": "aui-overlay", "IORequest": "aui-io", "Panel": "aui-panel", "OverlayMask": "aui-overlay", "Rating": "aui-rating", "DialogManager": "aui-dialog", "Component": "aui-component", "Dialog": "aui-dialog", "ParseContent": "aui-parse-content", "AUI~event~input": "aui-event", "OverlayContext": "aui-overlay", "A.io": "aui-io", "CalendarManager": "aui-calendar", "CharCounter": "aui-char-counter", "ThumbRating": "aui-rating", "DataType.String": "aui-datatype", "ToolItem": "aui-tool", "LiveSearch": "aui-live-search", "Resize": "aui-resize", "DataType.Boolean": "aui-datatype", "ToolSet": "aui-tool", "Calendar": "aui-calendar", "OverlayManager": "aui-overlay", "OverlayContextPanel": "aui-overlay"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
