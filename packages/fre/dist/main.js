!function(t){var e={};function n(l){if(e[l])return e[l].exports;var r=e[l]={i:l,l:!1,exports:{}};return t[l].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,l){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:l})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(l,r,function(e){return t[e]}.bind(null,r));return l},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=16)}([function(t,e,n){var l;!function(r){"use strict";function c(t,e){var n=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(n>>16)<<16|65535&n}function i(t,e,n,l,r,i){return c((s=c(c(e,t),c(l,i)))<<(o=r)|s>>>32-o,n);var s,o}function s(t,e,n,l,r,c,s){return i(e&n|~e&l,t,e,r,c,s)}function o(t,e,n,l,r,c,s){return i(e&l|n&~l,t,e,r,c,s)}function a(t,e,n,l,r,c,s){return i(e^n^l,t,e,r,c,s)}function u(t,e,n,l,r,c,s){return i(n^(e|~l),t,e,r,c,s)}function p(t,e){var n,l,r,i,p;t[e>>5]|=128<<e%32,t[14+(e+64>>>9<<4)]=e;var f=1732584193,d=-271733879,h=-1732584194,m=271733878;for(n=0;n<t.length;n+=16)l=f,r=d,i=h,p=m,f=s(f,d,h,m,t[n],7,-680876936),m=s(m,f,d,h,t[n+1],12,-389564586),h=s(h,m,f,d,t[n+2],17,606105819),d=s(d,h,m,f,t[n+3],22,-1044525330),f=s(f,d,h,m,t[n+4],7,-176418897),m=s(m,f,d,h,t[n+5],12,1200080426),h=s(h,m,f,d,t[n+6],17,-1473231341),d=s(d,h,m,f,t[n+7],22,-45705983),f=s(f,d,h,m,t[n+8],7,1770035416),m=s(m,f,d,h,t[n+9],12,-1958414417),h=s(h,m,f,d,t[n+10],17,-42063),d=s(d,h,m,f,t[n+11],22,-1990404162),f=s(f,d,h,m,t[n+12],7,1804603682),m=s(m,f,d,h,t[n+13],12,-40341101),h=s(h,m,f,d,t[n+14],17,-1502002290),f=o(f,d=s(d,h,m,f,t[n+15],22,1236535329),h,m,t[n+1],5,-165796510),m=o(m,f,d,h,t[n+6],9,-1069501632),h=o(h,m,f,d,t[n+11],14,643717713),d=o(d,h,m,f,t[n],20,-373897302),f=o(f,d,h,m,t[n+5],5,-701558691),m=o(m,f,d,h,t[n+10],9,38016083),h=o(h,m,f,d,t[n+15],14,-660478335),d=o(d,h,m,f,t[n+4],20,-405537848),f=o(f,d,h,m,t[n+9],5,568446438),m=o(m,f,d,h,t[n+14],9,-1019803690),h=o(h,m,f,d,t[n+3],14,-187363961),d=o(d,h,m,f,t[n+8],20,1163531501),f=o(f,d,h,m,t[n+13],5,-1444681467),m=o(m,f,d,h,t[n+2],9,-51403784),h=o(h,m,f,d,t[n+7],14,1735328473),f=a(f,d=o(d,h,m,f,t[n+12],20,-1926607734),h,m,t[n+5],4,-378558),m=a(m,f,d,h,t[n+8],11,-2022574463),h=a(h,m,f,d,t[n+11],16,1839030562),d=a(d,h,m,f,t[n+14],23,-35309556),f=a(f,d,h,m,t[n+1],4,-1530992060),m=a(m,f,d,h,t[n+4],11,1272893353),h=a(h,m,f,d,t[n+7],16,-155497632),d=a(d,h,m,f,t[n+10],23,-1094730640),f=a(f,d,h,m,t[n+13],4,681279174),m=a(m,f,d,h,t[n],11,-358537222),h=a(h,m,f,d,t[n+3],16,-722521979),d=a(d,h,m,f,t[n+6],23,76029189),f=a(f,d,h,m,t[n+9],4,-640364487),m=a(m,f,d,h,t[n+12],11,-421815835),h=a(h,m,f,d,t[n+15],16,530742520),f=u(f,d=a(d,h,m,f,t[n+2],23,-995338651),h,m,t[n],6,-198630844),m=u(m,f,d,h,t[n+7],10,1126891415),h=u(h,m,f,d,t[n+14],15,-1416354905),d=u(d,h,m,f,t[n+5],21,-57434055),f=u(f,d,h,m,t[n+12],6,1700485571),m=u(m,f,d,h,t[n+3],10,-1894986606),h=u(h,m,f,d,t[n+10],15,-1051523),d=u(d,h,m,f,t[n+1],21,-2054922799),f=u(f,d,h,m,t[n+8],6,1873313359),m=u(m,f,d,h,t[n+15],10,-30611744),h=u(h,m,f,d,t[n+6],15,-1560198380),d=u(d,h,m,f,t[n+13],21,1309151649),f=u(f,d,h,m,t[n+4],6,-145523070),m=u(m,f,d,h,t[n+11],10,-1120210379),h=u(h,m,f,d,t[n+2],15,718787259),d=u(d,h,m,f,t[n+9],21,-343485551),f=c(f,l),d=c(d,r),h=c(h,i),m=c(m,p);return[f,d,h,m]}function f(t){var e,n="",l=32*t.length;for(e=0;e<l;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function d(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var l=8*t.length;for(e=0;e<l;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function h(t){var e,n,l="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),l+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(15&e);return l}function m(t){return unescape(encodeURIComponent(t))}function v(t){return function(t){return f(p(d(t),8*t.length))}(m(t))}function g(t,e){return function(t,e){var n,l,r=d(t),c=[],i=[];for(c[15]=i[15]=void 0,r.length>16&&(r=p(r,8*t.length)),n=0;n<16;n+=1)c[n]=909522486^r[n],i[n]=1549556828^r[n];return l=p(c.concat(d(e)),512+8*e.length),f(p(i.concat(l),640))}(m(t),m(e))}function y(t,e,n){return e?n?g(e,t):h(g(e,t)):n?v(t):h(v(t))}void 0===(l=function(){return y}.call(e,n,e,t))||(t.exports=l)}()},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);const l=Array.isArray,r=t=>"string"==typeof t||"number"==typeof t;function c(t,e,...n){let c=e||{},s=c.key||null,o=c.ref||null,a=[];for(let t=0;t<n.length;t++){let e=n[t];if(null==e||!0===e||!1===e);else if(r(e))a.push(i(e));else{for(;l(e)&&e.some(t=>l(t));)e=[].concat(...e);a.push(e)}}return a.length&&(c.children=1===a.length?a[0]:a),delete c.key,delete c.ref,{type:t,props:c,key:s,ref:o}}function i(t){return{type:"text",props:{nodeValue:t}}}function s(t,e,n){for(let l in{...e,...n}){let r=e[l],c=n[l];if(r==c||"children"===l);else if("style"===l)for(const e in{...r,...c})r&&c&&r[e]===c[e]||(t[l][e]=c&&c[e]||"");else"o"===l[0]&&"n"===l[1]?(l=l.slice(2).toLowerCase(),r&&t.removeEventListener(l,r),t.addEventListener(l,c)):!(l in t)||t instanceof SVGElement?null==c||!1===c?t.removeAttribute(l):t.setAttribute(l,c):t[l]=null==c?"":c}}let o=0;function a(t){return u(null,t)}function u(t,e){const[n,l]=v(o++),r=e=>{let r=t?t(n[0],e):J(e)?e(n[0]):e;r!==n[0]&&(n[0]=r,D(l))};return n.length?[n[0],r]:(n[0]=e,[e,r])}function p(t,e){return f(t,e,"effect")}function f(t,e,n){let[l,r]=v(o++);g(l[1],e)&&(l[0]=h(t,e),l[1]=e,r.hooks[n].push(l))}function d(t,e){let n=v(o++)[0];return g(n[1],e)?(n[1]=e,n[0]=t()):n[0]}function h(t,e){return d(()=>t,e)}function m(t){return d(()=>({current:t}),[])}function v(t){const e=W();let n=e.hooks||(e.hooks={list:[],effect:[],layout:[]});return t>=n.list.length&&n.list.push([]),[n.list[t],e]}function g(t,e){return!t||e.some((e,n)=>e!==t[n])}function y(t,e){const n=t.length;t.push(e),function(t,e,n){for(;n>0;){const l=n-1>>>1,r=t[l];if(b(r,e)<=0)return;t[l]=e,t[n]=r,n=l}}(t,e,n)}function N(t){const e=t[0];if(!e)return null;const n=t.pop();return n!==e&&(t[0]=n,function(t,e,n){for(;;){const l=2*n+1,r=t[l];if(l>=t.length)return;const c=l+1,i=t[c],s=c<t.length&&b(i,r)<0?c:l,o=t[s];if(b(o,e)>0)return;t[s]=e,t[n]=o,n=s}}(t,n,0)),e}function b(t,e){return t.dueTime-e.dueTime}function k(t){return t[0]||null}let w=[],C=null,x=0;function $(t){let e=t,n=k(w);for(;n&&!(n.dueTime>e&&q());){let t=n.callback;n.callback=null;let l=t(n.dueTime<=e);l?n.callback=l:N(w),n=k(w),e=E()}return!!n}function P(){if(C){let t=E();x=t+1e3/60,C(t)?S():C=null}}const S=(()=>{if("undefined"!=typeof MessageChannel){const{port1:t,port2:e}=new MessageChannel;return t.onmessage=P,t=>t?requestAnimationFrame(t):e.postMessage(null)}return t=>setTimeout(t||P)})();function q(){return E()>=x}const E=()=>performance.now(),j=4;let A=null,_=null,O=null,T=[],L=[];function M(t,e,n){D({node:e,props:{children:t},done:n})}function D(t){!t.dirty&&(t.dirty=!0)&&T.push(t),function(t){const e=E();y(w,{callback:t,startTime:e,dueTime:e+3e3}),C=$,S()}(H)}function H(t){for(O||(O=T.shift());O&&(!q()||t);)O=I(O);return!t&&O?H.bind(null):(A&&(e=A,L.forEach(t=>t.parent&&function(t){const{op:e,parentNode:n,node:l,ref:r,hooks:c}=t;if(0===e);else if(3===e){for(c&&c.list.forEach(R),function t(e){for(const n in e){const l=e[n];F(l.ref,null),l.kids&&t(l.kids)}}(t.kids);J(t.type);)t=t.child;n.removeChild(t.node)}else if(J(t.type))c&&(c.layout.forEach(R),c.layout.forEach(V),c.layout=[],S(()=>{c.effect.forEach(R),c.effect.forEach(V),c.effect=[]}));else if(2===e)s(l,t.lastProps,t.props);else{let e=t.insertPoint?t.insertPoint.node:null,r=e?e.nextSibling:n.firstChild;if(r===l)return;if(null===r&&l===n.lastChild)return;n.insertBefore(l,r)}F(r,l)}(t)),e.done&&e.done(),L=[],A=null,O=null),null);var e}function I(t){if(t.parentNode=function(t){for(;t=t.parent;)if(!J(t.type))return t.node}(t),J(t.type)?function(t){if(0===t.type.tag&&!1===t.dirty&&!function(t,e){for(let n in t)if(!(n in e))return!0;for(let n in e)if(t[n]!==e[n])return!0;return!1}(t.oldProps,t.props))return void function(t){if(!t.child)return;let e=t.child;e.op=0,t.child=e,e.parent=t,e.sibling=null}(t);t.parent&&t.parent.context&&(t.context=t.parent.context);_=t,o=0;let e=t.type(t.props);r(e)&&(e=i(e));G(t,e)}(t):function(t){t.node||("svg"===t.type&&(t.tag=j),t.node=function(t){const e="text"===t.type?document.createTextNode(""):t.tag===j?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type);return s(e,{},t.props),e}(t));let e=t.parentNode||{};t.insertPoint=e.last||null,e.last=t,t.node.last=null,G(t,t.props.children)}(t),t.dirty&&(t.dirty=!1),t.oldProps=t.props,L.push(t),t.child)return t.child;for(;t;){if(!A&&!1===t.dirty)return A=t,null;if(t.sibling)return t.sibling;t=t.parent}}function G(t,e){if(!e)return;delete t.child;const n=t.kids,l=t.kids=B(e);let r={};for(const t in n){let e=l[t],c=n[t];e&&e.type===c.type?r[t]=c:(c.op=3,L.push(c))}let c=null,i=null;for(const e in l){let n=l[e],s=r[e];s?(i=z(s,2),n.op=2,n={...i,...n},n.lastProps=i.props,U(n)&&(n.op=1)):n=z(n,1),l[e]=n,n.parent=t,c?c.sibling=n:(t.tag===j&&(n.tag=j),t.child=n),c=n}c&&(c.sibling=null)}function U(t){let e=t.parent;return J(e.type)?e.key&&!e.dirty:t.key}function z(t,e){return{...t,op:e}}const B=t=>{const e={};return l(t)?t.forEach((t,n)=>t.pop?t.forEach((t,l)=>e[K(n,l,t.key)]=t):e[K(n,null,t.key)]=t):e[K(0,null,t.key)]=t,e};function F(t,e){t&&(J(t)?t(e):t.current=e)}const R=t=>t[2]&&t[2](),V=t=>{const e=t[0]();J(e)&&(t[2]=e)},W=()=>_||null,J=t=>"function"==typeof t,K=(t,e,n)=>null!=n&&null!=e?"."+t+"."+n:null!=e?"."+t+"."+e:null!=n?"."+n:"."+t;let Q=0;const X=()=>{if(!Q)return["pushState","replaceState"].map(t=>{const e=history[t];history[t]=function(){const n=e.apply(this,arguments),l=new Event(t);return l.arguments=arguments,dispatchEvent(l),n}}),Q=1},Y=(t,e=location.pathname)=>e.indexOf(t)?e:e.slice(t.length)||"/";n(1);const Z="https://www.clicli.cc",tt="https://admin.clicli.cc";function et(){const t={"投稿教程":905,"使用说明":31,"补档":99};return c("nav",{className:"tab"},c("ul",{className:"wrap"},c("a",{href:"/"},c("li",{class:"active"},"主站")),Object.keys(t).map(e=>c("a",{href:`${Z}/play/gv${t[e]}`},c("li",{className:"item"},e))),c("div",{class:"tab-right"},c("a",{href:"https://app.clicli.cc"},c("li",null,"APP下载")),c("a",{href:"https://admin.clicli.cc"},c("li",null,"投稿中心")))))}n(2);function nt(t){return new Promise((e,n)=>{fetch(t).then(t=>t.json()).then(t=>{e(t)}).catch(t=>{n(t)})})}function lt(t,e,n,l,r,c){return nt(`//api.clicli.cc/posts?status=${r||"public"}&sort=${t}&tag=${e}&uid=${c||""}&page=${n}&pageSize=${l}`)}n(3);function rt(t){const e=m(null),n=m(null),l=document.body.clientWidth<480;return p(()=>{var r;(r=t.url,nt("//api.clicli.cc/jx?url="+r)).then(t=>{l?(((t,e)=>{switch(t){case"hls":if(Hls.isSupported()){let t=new Hls;t.loadSource(e),t.attachMedia(n.current)}break;default:n.current.src=e}})(t.type,t.url),n.current.load()):(e.current.setAttribute("type",t.mtype),e.current.setAttribute("src",t.url))})},[t.url]),c("div",{className:"ep-wrap"},c("div",{className:"ep"},l?c("video",{ref:n,controls:"controls"}):c("e-player",{ref:e,className:"ep"}),c("div",{className:"close",onClick:t.hide},c("i",{className:"icon-font icon-close"}))),c("div",{className:"mark"}))}n(4);function ct(t){const[e,n]=a(null);function l(t){n(t),document.body.style.overflow="hidden"}return c("div",{className:"video-list"},t.videos.length<27?t.videos.map((t,e)=>c("li",{className:"item",onClick:()=>l(t[1])},c("span",null,"P ",e),c("span",null,t[0]))):t.videos.map((t,e)=>c("li",{className:"item2",onClick:()=>l(t[1])},c("span",null,"P ",e))),e&&c(rt,{url:e,hide:function(){n(null),document.body.style.overflow="auto"}}))}var it=n(0),st=n.n(it);function ot(t){if(/^[0-9]+$/.test(t))return`http://q1.qlogo.cn/g?b=qq&nk=${t}&s=640`;return`https://sdn.geekzu.org/avatar/${st()(t)}?s=100&d=retro`}function at(t){let e=t.match(/suo(.+?)\)/i);return e?e[1].slice(2):"https://wx4.sinaimg.cn/mw690/0060lm7Tly1fvmtrka9p5j30b40b43yo.jpg"}const ut={_:["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function pt(t){return t.replace(RegExp("^"+(t.match(/^(\t| )+/)||"")[0],"gm"),"")}function ft(t){return(t+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dt(t,e){let n,l,r,c,i,s=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,o=[],a="",u=e||{},p=0;function f(t){var e=ut[t.replace(/\*/g,"_")[1]||""],n=o[o.length-1]==t;return e?e[1]?(o[n?"pop":"push"](t),e[0|n]):e[0]:t}function d(){let t="";for(;o.length;)t+=f(o[o.length-1]);return t}for(t=t.replace(/^\[(.+?)\]:\s*(.+)$/gm,(t,e,n)=>(u[e.toLowerCase()]=n,"")).replace(/^\n+|\n+$/g,"");r=s.exec(t);)l=t.substring(p,r.index),p=s.lastIndex,n=r[0],l.match(/[^\\](\\\\)*\\$/)||(r[3]||r[4]?n='<pre class="code '+(r[4]?"poetry":r[2].toLowerCase())+'">'+pt(ft(r[3]||r[4]).replace(/^\n+|\n+$/g,""))+"</pre>":r[6]?(i=r[6],i.match(/\./)&&(r[5]=r[5].replace(/^\d+/gm,"")),console.log(r[5]),c=dt(pt(r[5].replace(/^\s*[>*+.-]/gm,"\n"))),">"===i?i="blockquote":(i=i.match(/\./)?"ol":"ul",c=c.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),n="<"+i+">"+c+"</"+i+">"):r[8]?n=`<img src="${ft(r[8])}" alt="${ft(r[7])}">`:r[10]?(a=a.replace("<a>",`<a href="${ft(r[11]||u[l.toLowerCase()])}">`),n=d()+"</a>"):r[9]?n="<a>":r[12]||r[14]?(i="h"+(r[14]?r[14].length:"="===r[13][0]?1:2),n="<"+i+">"+dt(r[12]||r[15],u)+"</"+i+">"):r[16]?n="<code>"+ft(r[16])+"</code>":(r[17]||r[1])&&(n=f(r[17]||"--"))),a+=l,a+=n;return(a+t.substring(p)+d()).trim()}function ht(t){const e=m(null),n=m(null),[l,r]=a({}),[i,s]=a(0);p(()=>{var l;(l=t.gv,nt("//api.clicli.cc/post/"+l)).then(l=>{r(l.result),function(t){return nt("//api.clicli.cc/pv/"+t)}(t.gv).then(t=>{s(t.result.pv)});const c=document.body.clientWidth;l.result.tag.indexOf("其它")>-1||c<480?(e.current.style.display="none",n.current.style.display="block",n.current.innerHTML=dt(l.result.content)):e.current.innerHTML=dt(l.result.content)})},[t.gv]);const o=l.videos?l.videos.split("\n").map(t=>t.split(" ")).filter(t=>t.length>0):[];return c("div",{className:"post-detail"},c("article",{className:"left",ref:e}),c("div",{className:"right"},c("div",{className:"info"},c("div",{className:"user"},c("span",{className:"avatar"},c("img",{src:ot(l.uqq),alt:l.uqq})),c("span",{className:"uname"},l.uname),c("span",{className:"uid"},"uid：",l.uid)),c("div",{class:"title"},c("h1",null,l.title||"少年祈祷中……"),c("span",{class:"pv"},i," ℃ ")),c("div",null,c("span",null,l.tag),c("span",null,l.time)),c("article",{ref:n,class:"other"})),"public"===l.status?c(ct,{videos:o}):c("div",{className:"copyright"},"版权原因，该番剧未上架，请支持正版")))}n(5);function mt(){const t={"风车动漫":"https://www.92wuc.com","APP下载":"https://app.clicli.cc","使用说明":"https://www.clicli.cc/play/gv31",github:"https://github.com/cliclitv","微博":"https://weibo.com/u/6759984025","qq群":"https://jq.qq.com/?_wv=1027&k=5e55m5L"};return c("div",{className:"footer"},c("div",{className:"wrap"},c("ul",{className:"links"},Object.keys(t).map(e=>c("a",{href:t[e]},e))),c("p",null,c("span",{className:"mail"},"admin@clicli.us")," © 2020 clicli Proudly use ",c("a",{href:"https://github.com/yisar/fre"},"Fre.js"),", UGC Sponsored by"," ",c("a",{target:"_blank",href:"https://www.dogecloud.com/?from=clicli",title:"UGC 视频赞助商"},c("img",{src:"https://player.dogecloud.com/img/logo_colored.png",style:{height:"16px",verticalAlign:"middle"}})),".")))}n(6);function vt(t){const e=t.gv;return c("div",null,c(et,null),c("div",{className:"wrap"},c(ht,{gv:e})),c(mt,null))}n(7),n(8);function gt({push:t}){const[e,n]=a("");p(()=>{document.onkeydown=n=>{13==n.keyCode&&e&&t("/search/"+e)}});return c("div",{className:"search"},c("input",{type:"text",placeholder:"搜索一下下菊花又不会坏(⊙o⊙)…",onInput:t=>{n(t.target.value)}}),c("span",{onClick:()=>t("/search/"+e)},c("i",{class:"icon-font icon-search"})))}function yt({push:t}){const e={"投稿教程":905,"使用说明":31,"补档":99};return c("header",null,c("div",{className:"header"},c("div",{className:"wrap"},c("nav",{className:"nav"},c("a",{href:Z},c("li",{className:"active"},"主站")),c("a",{href:"https://app.clicli.cc"},c("li",null,"APP 下载")),Object.keys(e).map(n=>c("li",{onClick:()=>t("/play/gv"+e[n])},n))),c("div",{className:"biu"},c("a",{className:"login",href:tt+"/login"},"登录"),c("a",{className:"login",href:tt+"/register"},"注册"),c("a",{className:"user-center",href:tt},"投稿"))),c("div",{className:"wrap"},c("div",{className:"logo"}),c(gt,{push:t}))))}n(9);function Nt(t){const[e,n]=a([]);return p(()=>{lt("","推荐",1,10).then(t=>{n(t.posts)})},[]),c("div",{className:"recommend"},c("h1",null,"编辑推荐"),c("ul",null,e.length>0&&e.map(e=>c("li",{onClick:()=>t.push("/play/gv"+e.id),key:e.id},c("div",{className:"cover"},c("img",{src:at(e.content)})),c("div",{className:"title"},e.title)))))}n(10);function bt(t){const[e,n]=a([]);return p(()=>{nt("//api.clicli.cc/rank").then(t=>{n(t.posts)})},[]),c("div",{className:"rank"},c("h1",null,"排行榜"),c("ul",null,e.length>0&&e.map((e,n)=>0===n?c("li",{onClick:()=>t.push("/play/gv"+e.id),className:"current",key:e.id},c("div",{className:"cover"},c("img",{src:at(e.content)})),c("div",{className:"info"},c("div",{className:"title"},e.title),c("div",{className:"bom"},c("div",{className:"tag"},e.tag),c("div",{className:"idx"},n+1)))):c("li",{onClick:()=>t.push("/play/gv"+e.id),key:e.id},c("span",{className:n<3?"active":""},n+1),c("div",{className:"title",title:e.title},e.title)))))}n(11);function kt({push:t}){const[e,n]=a([]),[l,r]=a((new Date).getDay());p(()=>{lt("新番","",1,100,"nowait").then(t=>{let e={};t.posts.forEach(t=>{let n=new Date(t.time).getDay();e[n]=e[n]||[],e[n].push(t)}),n(e)})},[]);const i={0:"周日",1:"周一",2:"周二",3:"周三",4:"周四",5:"周五",6:"周六"};return c("div",{className:"week-list"},c("div",{className:"wrap"},c("div",{className:"headline"},c("h1",null,"更新表"),c("ul",null,i&&Object.keys(i).map((t,e)=>c("button",{className:t==l?"active":"",onClick:()=>r(e)},i[t])))),c("ul",{className:"posts"},e[l]&&e[l].map(e=>c("li",{onClick:()=>t("/play/gv"+e.id),key:e.id},c("div",{className:"post"},c("div",{className:"cover"},c("img",{src:at(e.content)})),c("div",{className:"title"},e.title)))))))}n(12);function wt(t){const[e,n]=a([]);return p(()=>{var e;t.word?(e=t.word,nt("//api.clicli.cc/search/posts?key="+e)).then(t=>n(t.posts)):lt("原创","",2,4).then(t=>n(t.posts))},[]),c("div",{className:"ugc-list"},c("div",{className:"wrap"},c("h1",null,t.title),c("ul",{className:"posts"},e&&e.map(e=>c("li",{onClick:()=>t.push("/play/gv"+e.id),key:e.id},c("div",{className:"post"},c("div",{className:"cover"},c("img",{src:at(e.content)})),c("div",{className:"info"},c("div",{className:"uqq"},c("img",{src:ot(e.uqq)})),c("div",{className:"title"},e.title))))))))}n(13);function Ct(t){const[e,n]=a([]);return p(()=>{lt("bgm","",1,30).then(t=>{n(t.posts)})},[]),c("div",{className:"post-list wrap"},c("h1",null,"最新更新"),c("ul",null,e.length>0&&e.map(e=>c("li",{key:e.id,onClick:()=>t.push("/play/gv"+e.id)},c("div",{className:"cover"},c("img",{src:at(e.content)})),c("div",{className:"title"},e.title)))))}n(14),n(15);function xt({push:t}){return c("div",null,c(yt,{push:t}),c("div",{className:"wrap",style:{display:"flex"}},c(Nt,{push:t}),c(bt,{push:t})),c(kt,{push:t}),c(wt,{title:"个人投稿",push:t}),c(Ct,{push:t}),c(mt,null))}function $t(t){return c("div",null,c(et,null),c(wt,{title:"搜索结果",word:t.word,push:t.push}),c(mt,null))}const Pt=document.getElementById("root");M(c(()=>{const[t,e]=(({base:t=""}={})=>{const[e,n]=a(Y(t)),l=m(e);p(()=>{X();const e=()=>{const e=Y(t);l.current!==e&&n(l.current=e)},r=["popstate","pushState","replaceState"];return r.map(t=>addEventListener(t,e)),e(),()=>r.map(t=>removeEventListener(t,e))},[]);return[e,(e,n)=>history[n?"replaceState":"pushState"](0,0,t+e)]})(),n=t.match(/gv(\S*)+/),l=t.match(/search\/(\S*)+/);return"/"===t?c(xt,{push:e}):n?c(vt,{gv:n[1]}):l?c($t,{word:l[1],push:e}):404},null),Pt)}]);