!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=11)}([function(e,r){e.exports=require("koa")},function(e,r){e.exports=require("path")},function(e,r){e.exports=require("koa-helmet")},function(e,r){e.exports=require("koa-static")},function(e,r){e.exports=require("koa-combine-routers")},function(e,r){e.exports=require("koa-router")},function(e,r){e.exports=require("koa-body")},function(e,r){e.exports=require("koa-json")},function(e,r){e.exports=require("@koa/cors")},function(e,r){e.exports=require("koa-compose")},function(e,r,t){"use strict";var n=t(4),o=t.n(n),u=t(5),i=t.n(u);var c=new class{constructor(){}async demo(e){e.body={msg:"body message"}}};const a=new i.a;a.get("/demo",c.demo);var s=a;r.a=o()(s)},function(e,r,t){"use strict";t.r(r),function(e){var r=t(0),n=t.n(r),o=t(1),u=t.n(o),i=t(2),c=t.n(i),a=t(3),s=t.n(a),f=t(10),p=t(6),l=t.n(p),d=t(7),b=t.n(d),y=t(8),m=t.n(y),x=t(9),v=t.n(x);const j=new n.a,q=v()([l()(),s()(u.a.join(e,"../public")),m()(),b()({pretty:!1,param:"pretty"}),c()()]);j.use(q),j.use(Object(f.a)()),j.listen(3e3)}.call(this,"src")}]);