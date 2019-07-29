(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(21)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i,a=n(0),s=n.n(a),o=n(10),r=n.n(o),c=(n(17),n(18),n(5)),u=n(4),h=n(3),l=n(2),M=n(7),m=n(6),d=n(1),O=n(8),f=(n(19),n(20),function(){function e(t,n){Object(h.a)(this,e),this._X=void 0,this._Y=void 0,"number"==typeof t&&"number"==typeof n?(this._X=t,this._Y=n):this._X=this._Y=0}return Object(l.a)(e,null,[{key:"ZeroVector",get:function(){return new e(0,0)}},{key:"UnitVector",get:function(){return new e(1,1)}}]),Object(l.a)(e,[{key:"IsEqual",value:function(e){return this._X===e.X&&this._Y===e.Y}},{key:"X",get:function(){return this._X},set:function(e){this._X=e}},{key:"Y",get:function(){return this._Y},set:function(e){this._Y=e}}]),e}()),v=function(){function e(t,n,i,a){Object(h.a)(this,e),this._Name=void 0,this._DistanceFromCameraView=void 0,this._Min=void 0,this._Max=void 0,this._IsValid=void 0,this._TruncationPercentage=void 0,this._OcclusionPercentage=void 0,this._Truncated=void 0,this._Occluded=void 0,this._TruncationPercentage=0,this._OcclusionPercentage=0,this._Truncated=!1,this._Occluded=!1,this._IsValid=!1,"string"===typeof t&&n instanceof f&&i instanceof f?(this._Name=t,this._Min=n,this._Max=i,this._DistanceFromCameraView=a,this.SetBoxValidity()):(this._Name="".concat(Date.now()),this._Min=f.ZeroVector,this._Max=f.ZeroVector,this._IsValid=!1,this._DistanceFromCameraView=0)}return Object(l.a)(e,[{key:"SetBoxValidity",value:function(){this._IsValid=this._Min.X<this._Max.X&&this._Min.Y<this._Max.Y}},{key:"IsEqual",value:function(e){return this._Min.IsEqual(e.Min)&&this._Max.IsEqual(e.Max)}},{key:"OverlappingAreaWith",value:function(e){var t=Math.min(this._Max.X,e._Max.X)-Math.max(this._Min.X,e.Min.X),n=Math.min(this._Max.Y,e.Max.Y)-Math.max(this._Min.Y,e._Min.Y);return t>=0&&n>=0?t*n:0}},{key:"GetIntersectionBox",value:function(t){return this.Intersect(t)?new e("Overlapping",new f(Math.max(this._Min.X,t.Min.X),Math.max(this._Min.Y,t.Min.Y)),new f(Math.min(this._Max.X,t._Max.X),Math.min(this._Max.Y,t.Max.Y)),0):new e("No-overlapping",f.ZeroVector,f.ZeroVector,0)}},{key:"GetArea",value:function(){return(this._Max.X-this._Min.X)*(this._Max.Y-this._Min.Y)}},{key:"IsPointInside",value:function(e){return e.X>this._Min.X&&e.X<this._Max.X&&e.Y>this._Min.Y&&e.Y<this._Max.Y}},{key:"Intersect",value:function(e){return!(this._Min.X>e.Max.X||e.Min.X>this._Max.X)&&!(this._Min.Y>e.Max.Y||e.Min.Y>this._Max.Y)}},{key:"IsInside",value:function(e){return this.IsPointInside(e.Min)&&this.IsPointInside(e.Max)}},{key:"Name",get:function(){return this._Name},set:function(e){this._Name=e}},{key:"DistanceFromCameraView",get:function(){return this._DistanceFromCameraView},set:function(e){this._DistanceFromCameraView=e}},{key:"TruncationPercentage",get:function(){return this._TruncationPercentage},set:function(e){this._TruncationPercentage=e}},{key:"OcclusionPercentage",get:function(){return this._OcclusionPercentage},set:function(e){this._OcclusionPercentage=e}},{key:"Truncated",get:function(){return this._Truncated},set:function(e){this._Truncated=e}},{key:"Occluded",get:function(){return this._Occluded},set:function(e){this._Occluded=e}},{key:"Min",get:function(){return this._Min},set:function(e){this._Min.X=e.X,this._Min.Y=e.Y,this.SetBoxValidity()}},{key:"Max",get:function(){return this._Max},set:function(e){this._Max.X=e.X,this._Max.Y=e.Y,this.SetBoxValidity()}},{key:"IsValid",get:function(){return this._IsValid}}]),e}();!function(e){e[e.NONE=0]="NONE",e[e.TOP_LEFT=1]="TOP_LEFT",e[e.TOP_RIGHT=2]="TOP_RIGHT",e[e.BOTTOM_LEFT=3]="BOTTOM_LEFT",e[e.BOTTOM_RIGHT=4]="BOTTOM_RIGHT"}(i||(i={}));var x=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(M.a)(this,Object(m.a)(t).call(this,e))).state={Width:100,Height:100,Min:e.InitMin,Max:new f(e.InitMin.X+100,e.InitMin.Y+100),ShiftX:0,ShiftY:0,IsBoxMouseDown:!1,ActiveResizer:i.NONE},n.OnBoxMouseDown=n.OnBoxMouseDown.bind(Object(d.a)(n)),n.OnBoxMouseUp=n.OnBoxMouseUp.bind(Object(d.a)(n)),n.OnResizerMouseDown=n.OnResizerMouseDown.bind(Object(d.a)(n)),n.OnResizerMouseUp=n.OnResizerMouseUp.bind(Object(d.a)(n)),n}return Object(O.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.state,n=t.ActiveResizer,i=t.IsBoxMouseDown;if(!e.Mouse.IsEqual(this.props.Mouse)){i&&this.OnBoxMouseMove(),this.OnResizerMouseMove(n);var a=this.state,s=a.Min,o=a.Max,r=this.props,c=r.OnChange,u=r.DistanceFromCameraView,h=r.Name;c(new v(h,s,o,u))}}},{key:"render",value:function(){var e=this.state,t=e.Width,n=e.Height,a=e.Min,o=e.Max,r=e.IsBoxMouseDown,c=this.props,u=c.Name,h=c.Target,l=c.DistanceFromCameraView,M=r?l+1e4:l;return s.a.createElement("div",{style:{position:"absolute",width:"100vw",height:"100vh"}},s.a.createElement("div",{"data-testid":"container-box",className:"box ".concat(h?"target":""),style:{width:t,height:n,left:a.X,top:a.Y}},s.a.createElement("div",{className:"draggable-area",style:{zIndex:M},onMouseDown:this.OnBoxMouseDown,onMouseUp:this.OnBoxMouseUp}),s.a.createElement("div",{className:"resizers"},s.a.createElement("div",{title:"(".concat(a.X,", ").concat(a.Y,")"),style:{zIndex:1e4},className:"resizer top-left",onMouseDown:this.OnResizerMouseDown(i.TOP_LEFT),onMouseUp:this.OnResizerMouseUp}),s.a.createElement("div",{title:"(".concat(o.X,", ").concat(a.Y,")"),style:{zIndex:1e4},className:"resizer top-right",onMouseDown:this.OnResizerMouseDown(i.TOP_RIGHT),onMouseUp:this.OnResizerMouseUp}),s.a.createElement("div",{title:"(".concat(a.X,", ").concat(o.Y,")"),style:{zIndex:1e4},className:"resizer bottom-left",onMouseDown:this.OnResizerMouseDown(i.BOTTOM_LEFT),onMouseUp:this.OnResizerMouseUp}),s.a.createElement("div",{title:"(".concat(o.X,", ").concat(o.Y,")"),style:{zIndex:1e4},className:"resizer bottom-right",onMouseDown:this.OnResizerMouseDown(i.BOTTOM_RIGHT),onMouseUp:this.OnResizerMouseUp})),s.a.createElement("div",{className:"name"},u)))}},{key:"OnBoxMouseDown",value:function(){var e=this.state.Min,t=this.props.Mouse,n=t.X-e.X,i=t.Y-e.Y;this.setState({IsBoxMouseDown:!0,ShiftX:n,ShiftY:i})}},{key:"OnBoxMouseUp",value:function(){this.setState({IsBoxMouseDown:!1})}},{key:"OnBoxMouseMove",value:function(){var e=this.state,t=e.IsBoxMouseDown,n=e.ShiftX,i=e.ShiftY,a=e.Width,s=e.Height,o=this.props.Mouse;if(t){var r=o.X-n,c=o.Y-i;this.setState({Min:new f(r,c),Max:new f(r+a,c+s)})}}},{key:"OnResizerMouseDown",value:function(e){var t=this;return function(){t.setState({ActiveResizer:e})}}},{key:"OnResizerMouseUp",value:function(){this.setState({ActiveResizer:i.NONE})}},{key:"OnResizerMouseMove",value:function(e){if(e!==i.NONE){var t=this.state.Min,n=this.props.Mouse;switch(e){case i.TOP_LEFT:var a=this.state.Max,s=a.X-n.X,o=a.Y-n.Y;this.setState({Width:s,Height:o,Min:new f(n.X,n.Y)});break;case i.TOP_RIGHT:var r=this.state.Max,c=n.X-t.X,h=r.Y-n.Y;this.setState(function(e){return Object(u.a)({},e,{Width:c,Height:h,Min:new f(e.Min.X,n.Y),Max:new f(n.X,e.Max.Y)})});break;case i.BOTTOM_RIGHT:var l=n.X-t.X,M=n.Y-t.Y;this.setState({Width:l,Height:M,Max:new f(n.X,n.Y)});break;case i.BOTTOM_LEFT:var m=this.state.Max.X-n.X,d=n.Y-t.Y;this.setState(function(e){return Object(u.a)({},e,{Width:m,Height:d,Min:new f(n.X,e.Min.Y),Max:new f(e.Max.X,n.Y)})})}}}}]),t}(a.Component),_=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,n=arguments.length>1?arguments[1]:void 0;return function(){for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];window.clearTimeout(e),e=window.setTimeout(function(){return n.apply(null,a)},t)}},g=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(M.a)(this,Object(m.a)(t).call(this,e))).ComputeOccTrunc=_(50,function(){for(var e=n.state,t=e.Boxes,i=e.OcclusionThreshold,a=e.TruncationThreshold,s=Object.keys(t).map(function(e){return t[e]}),o=[],r=0;r<s.length;r++){o[r]=[];for(var c=0;c<s.length;c++)if(r!==c&&s[r].Intersect(s[c])){var u=s[r].DistanceFromCameraView>s[c].DistanceFromCameraView;if(s[r].IsInside(s[c])&&!u)continue;s[c].IsInside(s[r])?u&&(s[r].Occluded=!0,s[r].Truncated=!0,s[r].OcclusionPercentage=1,s[r].TruncationPercentage=1):u&&o[r].push(s[c])}}o.forEach(function(e,t){if(!s[t].Occluded){var n=0;e.forEach(function(e){n+=s[t].OverlappingAreaWith(e)}),e.forEach(function(i){e.forEach(function(a,o){if(i.Name!==a.Name&&o<e.length-1){var r=a.GetIntersectionBox(e[o+1]);r.Min.X<s[t].Min.X?r.Min.X=s[t].Min.X:r.Min.X>s[t].Max.X&&(r.Min.X=s[t].Max.X),r.Min.Y<s[t].Min.Y?r.Min.Y=s[t].Min.Y:r.Min.Y>s[t].Max.Y&&(r.Min.Y=s[t].Max.Y),r.Max.X>s[t].Max.X?r.Max.X=s[t].Max.X:r.Max.X<s[t].Min.X&&(r.Max.X=s[t].Min.X),r.Max.Y>s[t].Max.Y?r.Max.Y=s[t].Max.Y:r.Max.Y<s[t].Min.Y&&(r.Max.Y=s[t].Min.Y),n-=r.GetArea()}})}),s[t].OcclusionPercentage=n/s[t].GetArea(),s[t].TruncationPercentage=n/s[t].GetArea(),n/s[t].GetArea()>=i?(s[t].Occluded=!0,s[t].Truncated=!0,s[t].OcclusionPercentage=n/s[t].GetArea(),s[t].TruncationPercentage=n/s[t].GetArea()):n/s[t].GetArea()>=a&&(s[t].Truncated=!0,s[t].TruncationPercentage=n/s[t].GetArea())}}),n.setState({BoxesInViewport:s})}),n.state={Mouse:f.ZeroVector,TruncationThreshold:.15,OcclusionThreshold:.75,Boxes:{},BoxesInViewport:[]},n.OnMouseMove=n.OnMouseMove.bind(Object(d.a)(n)),n.OnBoxChange=n.OnBoxChange.bind(Object(d.a)(n)),n.OnTruncationChange=n.OnTruncationChange.bind(Object(d.a)(n)),n.OnOcclusionChange=n.OnOcclusionChange.bind(Object(d.a)(n)),n}return Object(O.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.document.addEventListener("mousemove",this.OnMouseMove)}},{key:"componentDidUpdate",value:function(e,t){t.Mouse.IsEqual(this.state.Mouse)||this.ComputeOccTrunc()}},{key:"componentWillUnmount",value:function(){window.document.removeEventListener("mousemove",this.OnMouseMove)}},{key:"render",value:function(){var e=this.state,t=e.Mouse,n=e.TruncationThreshold,i=e.OcclusionThreshold,a=e.BoxesInViewport,o=new f(200,10),r=new f(200,130),c=new f(200,250);return s.a.createElement("div",{className:"container"},a.length>0?s.a.createElement("div",{className:"details"},s.a.createElement("span",{className:"details-title"},"Thresholds"),s.a.createElement("div",{className:"thresholds"},s.a.createElement("table",null,s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",null,"Truncation:"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",width:"100",step:.01,max:"1",min:"0",onChange:this.OnTruncationChange,value:n}))),s.a.createElement("tr",null,s.a.createElement("td",null,"Occlusion:"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",width:"100",step:.01,max:"1",min:"0",onChange:this.OnOcclusionChange,value:i})))))),s.a.createElement("hr",{style:{width:"160px",marginLeft:0}}),a.map(function(e,t){return s.a.createElement("div",{style:{fontSize:"0.4em",marginBottom:"4px"},key:t},s.a.createElement("span",{style:{fontWeight:"bold"}},e.Name),": ",s.a.createElement("br",null),"Distance from camera:"," ",s.a.createElement("span",{style:{fontWeight:"bold"}},e.DistanceFromCameraView),s.a.createElement("br",null),e.Truncated?s.a.createElement("span",{style:{color:"#ff0000"}},"Truncated"):"Not Truncated"," ",s.a.createElement("br",null),"T. Percentage:"," ",s.a.createElement("span",{style:{fontWeight:"bold"}},e.TruncationPercentage)," ",s.a.createElement("br",null),e.Occluded?s.a.createElement("span",{style:{color:"#ff0000"}},"Occluded"):"Not Occluded"," ",s.a.createElement("br",null),"O. Percentage:"," ",s.a.createElement("span",{style:{fontWeight:"bold"}},e.OcclusionPercentage)," ",s.a.createElement("br",null))})):s.a.createElement("div",null,"Loading..."),s.a.createElement(x,{Name:"A",Mouse:t,DistanceFromCameraView:100,OnChange:this.OnBoxChange,InitMin:o}),s.a.createElement(x,{Name:"B",Mouse:t,DistanceFromCameraView:10,OnChange:this.OnBoxChange,InitMin:r}),s.a.createElement(x,{Name:"C",Mouse:t,DistanceFromCameraView:50,OnChange:this.OnBoxChange,InitMin:c}))}},{key:"OnTruncationChange",value:function(e){this.setState({TruncationThreshold:Number(e.currentTarget.value)})}},{key:"OnOcclusionChange",value:function(e){this.setState({OcclusionThreshold:Number(e.currentTarget.value)})}},{key:"OnMouseMove",value:function(e){this.setState({Mouse:new f(e.clientX,e.clientY)})}},{key:"OnBoxChange",value:function(e){this.setState(function(t){return Object(u.a)({},t,{Boxes:Object(u.a)({},t.Boxes,Object(c.a)({},e.Name,e))})})}}]),t}(a.Component),w=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[11,1,2]]]);
//# sourceMappingURL=main.d4e7e242.chunk.js.map