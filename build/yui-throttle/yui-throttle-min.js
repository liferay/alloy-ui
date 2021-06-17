YUI.add("yui-throttle",function(t,n){
/*! Based on work by Simon Willison: http://gist.github.com/292562 */
t.throttle=function(n,i){if(-1===(i=i||(t.config.throttleTime||150)))return function(){n.apply(this,arguments)};var r=t.Lang.now();return function(){var o=t.Lang.now();o-r>i&&(r=o,n.apply(this,arguments))}}},"patched-v3.18.1",{requires:["yui-base"]});