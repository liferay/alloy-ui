YUI.add("aui-simple-anim-deprecated",function(e,t){var n=e.Lang,r=n.now,i=e.Component.create({EXTENDS:Object,constructor:function(e){var t=this;t.active=!1,t.duration=e.duration||200,t.easing=e.easing||t._easeOutQuad,t.from=e.from,t.intervalRate=e.intervalRate,t.to=e.to,t._ontween=e.onTween,t._oncomplete=e.onComplete},prototype:{animate:function(){var e=this,t=e.duration,n=!1;if(e.active){var i=r()-e._startTime;if(e._ontween){var s=e.easing(i,e.from,e.to-e.from,t);s&&e._ontween(s)}i>=t?(e.active=!1,e._oncomplete&&e._oncomplete()):n=!0}return n},start:function(){var e=this;e._startTime=r(),i.queue(e)},stop:function(){var e=this;e.active=!1},_easeOutQuad:function(e,t,n,r){return-n*(e/=r)*(e-2)+t}},active:!1,queue:function(e){var t=this;t._queue.push(e),e.active=!0,t.active||t.start(e)},animate:function(){var e=this,t=0;for(var n=0,r=e._queue.length;n<r;n++){var i=e._queue[n];i.active&&(i.animate(),t++)}t==0&&e._timer&&e.stop()},start:function(e){var t=this;if(!t._timer&&!t.active){var n=e.intervalRate||t._intervalRate;t.active=!0,t._timer=setInterval(function(){t.animate()},n)}},stop:function(){var e=this;clearInterval(e._timer),e._timer=null,e.active=!1,e._queue=[]},_intervalRate:20,_queue:[],_timer:null});e.SimpleAnim=i},"3.0.3-deprecated.10",{requires:["aui-base-deprecated"]});
