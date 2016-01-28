if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/aui-toggler-accessibility/aui-toggler-accessibility.js']) {
   __coverage__['build/aui-toggler-accessibility/aui-toggler-accessibility.js'] = {"path":"build/aui-toggler-accessibility/aui-toggler-accessibility.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":56}}},"2":{"name":"TogglerAccessibility","line":9,"loc":{"start":{"line":9,"column":0},"end":{"line":9,"column":32}}},"3":{"name":"(anonymous_3)","line":19,"loc":{"start":{"line":19,"column":17},"end":{"line":19,"column":28}}},"4":{"name":"(anonymous_4)","line":34,"loc":{"start":{"line":34,"column":18},"end":{"line":34,"column":35}}},"5":{"name":"(anonymous_5)","line":52,"loc":{"start":{"line":52,"column":22},"end":{"line":52,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":67,"column":62}},"2":{"start":{"line":9,"column":0},"end":{"line":9,"column":34}},"3":{"start":{"line":11,"column":0},"end":{"line":62,"column":2}},"4":{"start":{"line":20,"column":8},"end":{"line":22,"column":10}},"5":{"start":{"line":24,"column":8},"end":{"line":24,"column":32}},"6":{"start":{"line":35,"column":8},"end":{"line":36,"column":40}},"7":{"start":{"line":38,"column":8},"end":{"line":40,"column":9}},"8":{"start":{"line":39,"column":12},"end":{"line":39,"column":42}},"9":{"start":{"line":42,"column":8},"end":{"line":42,"column":52}},"10":{"start":{"line":43,"column":8},"end":{"line":43,"column":53}},"11":{"start":{"line":53,"column":8},"end":{"line":56,"column":40}},"12":{"start":{"line":58,"column":8},"end":{"line":58,"column":56}},"13":{"start":{"line":59,"column":8},"end":{"line":59,"column":54}},"14":{"start":{"line":60,"column":8},"end":{"line":60,"column":55}},"15":{"start":{"line":64,"column":0},"end":{"line":64,"column":46}}},"branchMap":{"1":{"line":38,"type":"if","locations":[{"start":{"line":38,"column":8},"end":{"line":38,"column":8}},{"start":{"line":38,"column":8},"end":{"line":38,"column":8}}]},"2":{"line":54,"type":"binary-expr","locations":[{"start":{"line":54,"column":24},"end":{"line":54,"column":42}},{"start":{"line":54,"column":46},"end":{"line":54,"column":60}}]}},"code":["(function () { YUI.add('aui-toggler-accessibility', function (A, NAME) {","","/**"," * The Toggler Accessibility Component"," *"," * @module aui-toggler-accessibility"," */","","function TogglerAccessibility() {}","","TogglerAccessibility.prototype = {","    /**","     * Construction logic executed during instantiation.","     * Lifecycle.","     *","     * @method initializer","     * @protected","     */","    initializer: function() {","        this._eventHandles.push(","            A.after(this._afterToggle, this, 'toggle')","        );","","        this._setARIAElements();","    },","","    /**","     * Fires after toggle and syncs ARIA attributes.","     *","     * @method _afterToggle","     * @param {EventFacade} event","     * @protected","     */","    _afterToggle: function(expand) {","        var content = this.get('content'),","            header = this.get('header');","","        if (A.Lang.isUndefined(expand)) {","            expand = this.get('expanded');","        }","","        header.setAttribute('aria-pressed', expand);","        content.setAttribute('aria-hidden', !expand);","    },","","    /**","     * Sets the ARIA-WAI attributes.","     *","     * @method _setARIAElements","     * @protected","     */","    _setARIAElements: function() {","        var content = this.get('content'),","            contentId = content.attr('id') || content.guid(),","            expanded = this.get('expanded'),","            header = this.get('header');","","        header.setAttribute('aria-controls', contentId);","        header.setAttribute('aria-pressed', expanded);","        content.setAttribute('aria-hidden', !expanded);","    }","};","","A.Base.mix(A.Toggler, [TogglerAccessibility]);","","","}, '3.0.3-deprecated.10', {\"requires\": [\"aui-toggler-base\"]});","","}());"]};
}
var __cov_Cf3dHdgbCGYgjty36m8v5w = __coverage__['build/aui-toggler-accessibility/aui-toggler-accessibility.js'];
__cov_Cf3dHdgbCGYgjty36m8v5w.s['1']++;YUI.add('aui-toggler-accessibility',function(A,NAME){__cov_Cf3dHdgbCGYgjty36m8v5w.f['1']++;__cov_Cf3dHdgbCGYgjty36m8v5w.s['2']++;function TogglerAccessibility(){__cov_Cf3dHdgbCGYgjty36m8v5w.f['2']++;}__cov_Cf3dHdgbCGYgjty36m8v5w.s['3']++;TogglerAccessibility.prototype={initializer:function(){__cov_Cf3dHdgbCGYgjty36m8v5w.f['3']++;__cov_Cf3dHdgbCGYgjty36m8v5w.s['4']++;this._eventHandles.push(A.after(this._afterToggle,this,'toggle'));__cov_Cf3dHdgbCGYgjty36m8v5w.s['5']++;this._setARIAElements();},_afterToggle:function(expand){__cov_Cf3dHdgbCGYgjty36m8v5w.f['4']++;__cov_Cf3dHdgbCGYgjty36m8v5w.s['6']++;var content=this.get('content'),header=this.get('header');__cov_Cf3dHdgbCGYgjty36m8v5w.s['7']++;if(A.Lang.isUndefined(expand)){__cov_Cf3dHdgbCGYgjty36m8v5w.b['1'][0]++;__cov_Cf3dHdgbCGYgjty36m8v5w.s['8']++;expand=this.get('expanded');}else{__cov_Cf3dHdgbCGYgjty36m8v5w.b['1'][1]++;}__cov_Cf3dHdgbCGYgjty36m8v5w.s['9']++;header.setAttribute('aria-pressed',expand);__cov_Cf3dHdgbCGYgjty36m8v5w.s['10']++;content.setAttribute('aria-hidden',!expand);},_setARIAElements:function(){__cov_Cf3dHdgbCGYgjty36m8v5w.f['5']++;__cov_Cf3dHdgbCGYgjty36m8v5w.s['11']++;var content=this.get('content'),contentId=(__cov_Cf3dHdgbCGYgjty36m8v5w.b['2'][0]++,content.attr('id'))||(__cov_Cf3dHdgbCGYgjty36m8v5w.b['2'][1]++,content.guid()),expanded=this.get('expanded'),header=this.get('header');__cov_Cf3dHdgbCGYgjty36m8v5w.s['12']++;header.setAttribute('aria-controls',contentId);__cov_Cf3dHdgbCGYgjty36m8v5w.s['13']++;header.setAttribute('aria-pressed',expanded);__cov_Cf3dHdgbCGYgjty36m8v5w.s['14']++;content.setAttribute('aria-hidden',!expanded);}};__cov_Cf3dHdgbCGYgjty36m8v5w.s['15']++;A.Base.mix(A.Toggler,[TogglerAccessibility]);},'3.0.3-deprecated.10',{'requires':['aui-toggler-base']});
