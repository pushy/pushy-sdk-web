var Pushy=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="build/",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=r(3),i=n(a),s=r(1),u=n(s),c=r(4),l=n(c),f=r(6),d=n(f),p=r(2);if("undefined"==typeof h)var h={},y={};var m={register:function(e){var t=this;return new d.default(function(r,n){var a,s,c,f,m,b,g,v,w,x,S,k,_;return regeneratorRuntime.async(function(T){for(;;)switch(T.prev=T.next){case 0:if(e&&"object"===("undefined"==typeof e?"undefined":o(e))||(e={}),"PushManager"in h&&("serviceWorker"in y||"undefined"!=typeof ServiceWorkerRegistration)){T.next=7;break}if(!(/iPad|iPhone|iPod/.test(y.platform)||"MacIntel"===y.platform&&y.maxTouchPoints>1)){T.next=6;break}return T.abrupt("return",n(new Error('For Web Push on iOS 16.4+, you will first need to click the "Share" button -> "Add to Home Screen" before you can sign up for push notifications.')));case 6:return T.abrupt("return",n(new Error("Web push is not supported by this browser.")));case 7:if(p.localStorage.isSupported()){T.next=9;break}return T.abrupt("return",n(new Error("Local storage is not supported by this browser.")));case 9:if(a=e.serviceWorkerFile||u.default.serviceWorker.fileName,s={scope:e.serviceWorkerScope||"/"},c=void 0,T.prev=12,!y.serviceWorker){T.next=19;break}return T.next=16,regeneratorRuntime.awrap(y.serviceWorker.register("/"+a,s));case 16:c=T.sent,T.next=20;break;case 19:h.registration&&(c=h.registration);case 20:T.next=25;break;case 22:return T.prev=22,T.t0=T.catch(12),T.abrupt("return",n(new Error("Failed to load '"+h.location.origin+"/"+a+"': "+T.t0.message,T.t0)));case 25:if(!y.serviceWorker){T.next=30;break}return T.next=28,regeneratorRuntime.awrap(y.serviceWorker.ready);case 28:T.next=36;break;case 30:if(!h.registration){T.next=36;break}case 31:if(c.active){T.next=36;break}return T.next=34,regeneratorRuntime.awrap(new d.default(function(e){return setTimeout(e,100)}));case 34:T.next=31;break;case 36:return T.next=38,regeneratorRuntime.awrap(c.pushManager.getSubscription());case 38:if(f=T.sent){T.next=54;break}return m=t.isEnterpriseConfigured()?u.default.vapidDetails.enterprisePublicKey:u.default.vapidDetails.publicKey,T.prev=41,T.next=44,regeneratorRuntime.awrap(c.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:l.default.urlB64ToUint8Array(m)}));case 44:f=T.sent,T.next=52;break;case 47:if(T.prev=47,T.t1=T.catch(41),!y.brave||T.t1.message.indexOf("push service error")===-1){T.next=51;break}return T.abrupt("return",n(new Error('Please enable "Use Google Services for Push Messaging" in Brave settings to use this feature',T.t1)));case 51:return T.abrupt("return",n(new Error("Failed to subscribe the device: "+T.t1.message,T.t1)));case 52:T.next=67;break;case 54:if(b=p.localStorage.getItem(u.default.localStorageKeys.token),g=p.localStorage.getItem(u.default.localStorageKeys.tokenAuth),v=p.localStorage.getItem(u.default.localStorageKeys.tokenAppId),b&&v&&e.appId&&"string"==typeof v&&v!==e.appId&&(b=void 0),!b||!g){T.next=67;break}return T.prev=59,T.next=62,regeneratorRuntime.awrap(t.validateDeviceCredentials());case 62:return T.abrupt("return",r(b));case 65:T.prev=65,T.t2=T.catch(59);case 67:if(f=JSON.parse(JSON.stringify(f)),w=f.keys.auth,x=f.keys.p256dh,S=f.endpoint,x&&w&&S){T.next=73;break}return T.abrupt("return",n(new Error("The push subscription is missing a required field.")));case 73:return k={sdk:u.default.version,platform:u.default.platform,subscription:{endpoint:S,key:x,auth:w}},e.appId?k.appId=e.appId:k.app=h.location.hostname,_=void 0,T.prev=76,T.next=79,regeneratorRuntime.awrap(i.default.post("/register",k));case 79:_=T.sent,T.next=85;break;case 82:return T.prev=82,T.t3=T.catch(76),T.abrupt("return",n(new Error("The API request failed: "+T.t3.message,T.t3)));case 85:if(_.token&&_.auth){T.next=87;break}return T.abrupt("return",n(new Error("An unexpected response was received from the Pushy API.")));case 87:return p.localStorage.setItem(u.default.localStorageKeys.token,_.token),p.localStorage.setItem(u.default.localStorageKeys.tokenAuth,_.auth),e.appId&&p.localStorage.setItem(u.default.localStorageKeys.tokenAppId,e.appId),T.next=92,regeneratorRuntime.awrap(p.localStorage.recacheWebExtensionStorage());case 92:r(_.token);case 93:case"end":return T.stop()}},null,t,[[12,22],[41,47],[59,65],[76,82]])})},setNotificationListener:function(e){return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:if("PushManager"in h&&("serviceWorker"in y||"undefined"!=typeof ServiceWorkerRegistration)){t.next=2;break}return t.abrupt("return",console.error("Web push is not supported by this browser."));case 2:if(!y.serviceWorker){t.next=7;break}return t.next=5,regeneratorRuntime.awrap(y.serviceWorker.ready);case 5:t.next=14;break;case 7:if(!h.registration){t.next=14;break}case 8:if(h.registration.active){t.next=13;break}return t.next=11,regeneratorRuntime.awrap(new d.default(function(e){return setTimeout(e,100)}));case 11:t.next=8;break;case 13:y.serviceWorker=h.registration.active;case 14:y.serviceWorker.addEventListener("message",function(t){!t.data&&t.detail&&(t.data=t.detail),t.data&&t.data._pushy&&e(t.data)});case 15:case"end":return t.stop()}},null,this)},isRegistered:function(){var e=p.localStorage.getItem(u.default.localStorageKeys.token),t=p.localStorage.getItem(u.default.localStorageKeys.tokenAuth);return e&&t},subscribe:function(e){var t=this;return new d.default(function(r,n){var o,a,s,c;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:if(p.localStorage.isSupported()){t.next=2;break}return t.abrupt("return",n(new Error("Local storage is not supported by this browser.")));case 2:if(o=p.localStorage.getItem(u.default.localStorageKeys.token),a=p.localStorage.getItem(u.default.localStorageKeys.tokenAuth),o&&a){t.next=6;break}return t.abrupt("return",n(new Error("This device is not registered to receive push notifications.")));case 6:return"string"==typeof e&&(e=[e]),s={token:o,auth:a,topics:e},c=void 0,t.prev=9,t.next=12,regeneratorRuntime.awrap(i.default.post("/devices/subscribe",s));case 12:c=t.sent,t.next=18;break;case 15:return t.prev=15,t.t0=t.catch(9),t.abrupt("return",n(new Error("The API request failed: "+t.t0.message,t.t0)));case 18:if(c.success){t.next=20;break}return t.abrupt("return",n(new Error("An unexpected response was received from the Pushy API.")));case 20:r();case 21:case"end":return t.stop()}},null,t,[[9,15]])})},unsubscribe:function(e){var t=this;return new d.default(function(r,n){var o,a,s,c;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:if(p.localStorage.isSupported()){t.next=2;break}return t.abrupt("return",n(new Error("Local storage is not supported by this browser.")));case 2:if(o=p.localStorage.getItem(u.default.localStorageKeys.token),a=p.localStorage.getItem(u.default.localStorageKeys.tokenAuth),o&&a){t.next=6;break}return t.abrupt("return",n(new Error("This device is not registered to receive push notifications.")));case 6:return"string"==typeof e&&(e=[e]),s={token:o,auth:a,topics:e},c=void 0,t.prev=9,t.next=12,regeneratorRuntime.awrap(i.default.post("/devices/unsubscribe",s));case 12:c=t.sent,t.next=18;break;case 15:return t.prev=15,t.t0=t.catch(9),t.abrupt("return",n(new Error("The API request failed: "+t.t0.message,t.t0)));case 18:if(c.success){t.next=20;break}return t.abrupt("return",n(new Error("An unexpected response was received from the Pushy API.")));case 20:r();case 21:case"end":return t.stop()}},null,t,[[9,15]])})},validateDeviceCredentials:function(){var e=this;return new d.default(function(t,r){var n,o,a,s;return regeneratorRuntime.async(function(c){for(;;)switch(c.prev=c.next){case 0:if(e.attemptedValidation=!0,p.localStorage.isSupported()){c.next=3;break}return c.abrupt("return",r(new Error("Local storage is not supported by this browser.")));case 3:if(n=p.localStorage.getItem(u.default.localStorageKeys.token),o=p.localStorage.getItem(u.default.localStorageKeys.tokenAuth),n&&o){c.next=7;break}return c.abrupt("return",r(new Error("The device is not registered to receive push notifications.")));case 7:return a={sdk:u.default.version,token:n,auth:o},s=void 0,c.prev=9,c.next=12,regeneratorRuntime.awrap(i.default.post("/devices/auth",a));case 12:s=c.sent,c.next=18;break;case 15:return c.prev=15,c.t0=c.catch(9),c.abrupt("return",r(new Error("The API request failed: "+c.t0.message,c.t0)));case 18:if(s.success){c.next=20;break}return c.abrupt("return",r(new Error("An unexpected response was received from the Pushy API.")));case 20:t();case 21:case"end":return c.stop()}},null,e,[[9,15]])})},isEnterpriseConfigured:function(){return void 0!=p.localStorage.getItem(u.default.localStorageKeys.enterpriseEndpoint)},setEnterpriseConfig:function(e){"string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1));var t=p.localStorage.getItem(u.default.localStorageKeys.enterpriseEndpoint);e!=t&&(p.localStorage.removeItem(u.default.localStorageKeys.token),p.localStorage.removeItem(u.default.localStorageKeys.tokenAuth),p.localStorage.removeItem(u.default.localStorageKeys.tokenAppId),e?p.localStorage.setItem(u.default.localStorageKeys.enterpriseEndpoint,e):p.localStorage.removeItem(u.default.localStorageKeys.enterpriseEndpoint))},setProxyEndpoint:function(e){return e?("string"==typeof e&&"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),void p.localStorage.setItem(u.default.localStorageKeys.proxyEndpoint,e)):p.localStorage.removeItem(u.default.localStorageKeys.proxyEndpoint)}};setTimeout(function(){m.isRegistered()&&(m.attemptedValidation||m.validateDeviceCredentials().catch(function(e){console.error("Device validation failed",e)}))},u.default.logic.deviceValidationDelay),t.default=m;try{e.exports=m}catch(e){}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={version:1020,platform:"web",api:{endpoint:"https://api.pushy.me",devEndpoint:"http://localhost:3001"},vapidDetails:{publicKey:"BMHDCTp0zHPUj9snbHxwQZh2ppoypdOpuAQtBjf2Gj9KKwCHCcN_f2GFzwmzohRWYUPVcR0psb5VQTnGy-gY8iE",enterprisePublicKey:"BDZ1EQHwxF3dFQ5LccxKD5rdOPlO5iLLIAbxxm-1fIuMLQQcXa_UUD8CRja_iBmlmlQZsookpGnHaSTsbb-Rglo"},localStorageKeys:{token:"pushyToken",tokenAuth:"pushyTokenAuth",tokenAppId:"pushyTokenAppId",proxyEndpoint:"pushyProxyEndpoint",enterpriseEndpoint:"pushyEnterpriseEndpoint"},serviceWorker:{fileName:"service-worker.js"},logic:{deviceValidationDelay:5e3}};t.default=r;try{e.exports=r}catch(e){}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.localStorage=void 0;var a=r(1),i=n(a);if("undefined"==typeof s)var s={};var u=s.browser||s.chrome,c=t.localStorage={cache:{},recacheWebExtensionStorage:function(){var e,t;return regeneratorRuntime.async(function(r){for(;;)switch(r.prev=r.next){case 0:if(!this.isWebExtension()){r.next=11;break}r.t0=regeneratorRuntime.keys(i.default.localStorageKeys);case 2:if((r.t1=r.t0()).done){r.next=11;break}return e=r.t1.value,t=i.default.localStorageKeys[e],r.next=7,regeneratorRuntime.awrap(u.storage.local.get(t));case 7:r.t2=t,this.cache[t]=r.sent[r.t2],r.next=2;break;case 11:case"end":return r.stop()}},null,this)},getItem:function(e){return s.localStorage?s.localStorage.getItem(e):this.cache[e]},setItem:function(e,t){s.localStorage?s.localStorage.setItem(e,t):this.isWebExtension()&&(u.storage.local.set(o({},e,t)),this.cache[e]=t)},removeItem:function(e){s.localStorage?s.localStorage.removeItem(e):this.isWebExtension()&&(u.storage.local.remove(e),this.cache[e]=null)},isSupported:function(){return s.localStorage||this.isWebExtension()},isWebExtension:function(){var e="browser"in s?"browser":"chrome"in s?"chrome":void 0;return e&&e in s&&"storage"in s[e]&&"local"in s[e].storage}};c.recacheWebExtensionStorage()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),r(9);var o=r(1),a=n(o),i=r(2);t.default={get:function(e,t){return regeneratorRuntime.async(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(this.execute(e,t||{}));case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}},null,this)},post:function(e,t,r){return regeneratorRuntime.async(function(n){for(;;)switch(n.prev=n.next){case 0:return r=r||{},r.method="POST",r.body=JSON.stringify(t),r.headers={"Content-Type":"application/json"},n.next=6,regeneratorRuntime.awrap(this.execute(e,r));case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}},null,this)},execute:function(e,t){var r,n,o,a;return regeneratorRuntime.async(function(i){for(;;)switch(i.prev=i.next){case 0:return r=this.getApiHost()+e,i.next=3,regeneratorRuntime.awrap(fetch(r,t));case 3:if(n=i.sent,!(n.status<200||n.status>299)){i.next=10;break}return i.next=7,regeneratorRuntime.awrap(n.json());case 7:throw o=i.sent,a=o.error||"An unknown error occurred",{status:n.status,message:a};case 10:return i.next=12,regeneratorRuntime.awrap(n.json());case 12:return i.abrupt("return",i.sent);case 13:case"end":return i.stop()}},null,this)},getApiHost:function(){var e=i.localStorage.getItem(a.default.localStorageKeys.proxyEndpoint);if(e)return"https://"+e;var t=i.localStorage.getItem(a.default.localStorageKeys.enterpriseEndpoint);return t||a.default.api.endpoint}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={urlB64ToUint8Array:function(e){for(var t="=".repeat((4-e.length%4)%4),r=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),n=self.atob(r),o=new Uint8Array(n.length),a=0;a<n.length;++a)o[a]=n.charCodeAt(a);return o}}},function(e,t){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===r||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===n||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function i(){y&&p&&(y=!1,p.length?h=p.concat(h):m=-1,h.length&&s())}function s(){if(!y){var e=o(i);y=!0;for(var t=h.length;t;){for(p=h,h=[];++m<t;)p&&p[m].run();m=-1,t=h.length}p=null,y=!1,a(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var l,f,d=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:r}catch(e){l=r}try{f="function"==typeof clearTimeout?clearTimeout:n}catch(e){f=n}}();var p,h=[],y=!1,m=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];h.push(new u(e,t)),1!==h.length||y||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.prependListener=c,d.prependOnceListener=c,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,r){(function(t){!function(r){function n(){}function o(e,t){return function(){e.apply(t,arguments)}}function a(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function i(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void a._immediateFn(function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null===r)return void(1===e._state?s:u)(t.promise,e._value);var n;try{n=r(e._value)}catch(e){return void u(t.promise,e)}s(t.promise,n)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var r=t.then;if(t instanceof a)return e._state=3,e._value=t,void c(e);if("function"==typeof r)return void f(o(r,t),e)}e._state=1,e._value=t,c(e)}catch(t){u(e,t)}}function u(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)i(e,e._deferreds[t]);e._deferreds=null}function l(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function f(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){if(r)return;r=!0,u(t,e)}}var d=setTimeout;a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var r=new this.constructor(n);return i(this,new l(e,t,r)),r},a.all=function(e){var t=Array.prototype.slice.call(e);return new a(function(e,r){function n(a,i){try{if(i&&("object"==typeof i||"function"==typeof i)){var s=i.then;if("function"==typeof s)return void s.call(i,function(e){n(a,e)},r)}t[a]=i,0===--o&&e(t)}catch(e){r(e)}}if(0===t.length)return e([]);for(var o=t.length,a=0;a<t.length;a++)n(a,t[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,r){r(e)})},a.race=function(e){return new a(function(t,r){for(var n=0,o=e.length;n<o;n++)e[n].then(t,r)})},a._immediateFn="function"==typeof t&&function(e){t(e)}||function(e){d(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},a._setImmediateFn=function(e){a._immediateFn=e},a._setUnhandledRejectionFn=function(e){a._unhandledRejectionFn=e},"undefined"!=typeof e&&e.exports?e.exports=a:r.Promise||(r.Promise=a)}(this)}).call(t,r(8).setImmediate)},function(e,t,r){(function(e,t){!function(e,r){"use strict";function n(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return y[h]=n,p(h),h++}function o(e){delete y[e]}function a(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(r,n)}}function i(e){if(m)setTimeout(i,0,e);else{var t=y[e];if(t){m=!0;try{a(t)}finally{o(e),m=!1}}}}function s(){p=function(e){t.nextTick(function(){i(e)})}}function u(){if(e.postMessage&&!e.importScripts){var t=!0,r=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=r,t}}function c(){var t="setImmediate$"+Math.random()+"$",r=function(r){r.source===e&&"string"==typeof r.data&&0===r.data.indexOf(t)&&i(+r.data.slice(t.length))};e.addEventListener?e.addEventListener("message",r,!1):e.attachEvent("onmessage",r),p=function(r){e.postMessage(t+r,"*")}}function l(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;i(t)},p=function(t){e.port2.postMessage(t)}}function f(){var e=b.documentElement;p=function(t){var r=b.createElement("script");r.onreadystatechange=function(){i(t),r.onreadystatechange=null,e.removeChild(r),r=null},e.appendChild(r)}}function d(){p=function(e){setTimeout(i,0,e)}}if(!e.setImmediate){var p,h=1,y={},m=!1,b=e.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(e);g=g&&g.setTimeout?g:e,"[object process]"==={}.toString.call(e.process)?s():u()?c():e.MessageChannel?l():b&&"onreadystatechange"in b.createElement("script")?f():d(),g.setImmediate=n,g.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof e?this:e:self)}).call(t,function(){return this}(),r(5))},function(e,t,r){function n(e,t){this._id=e,this._clearFn=t}var o=Function.prototype.apply;t.setTimeout=function(){return new n(o.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new n(o.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},n.prototype.unref=n.prototype.ref=function(){},n.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},r(7),t.setImmediate=setImmediate,t.clearImmediate=clearImmediate},function(e,t){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function r(e){return"string"!=typeof e&&(e=String(e)),e}function n(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return b.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function a(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function i(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function s(e){var t=new FileReader,r=i(t);return t.readAsArrayBuffer(e),r}function u(e){var t=new FileReader,r=i(t);return t.readAsText(e),r}function c(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function l(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function f(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(b.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(b.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(b.arrayBuffer&&b.blob&&v(e))this._bodyArrayBuffer=l(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!w(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=l(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var e=a(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?a(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(s)}),this.text=function(){var e=a(this);if(e)return e;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(h)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(e){var t=e.toUpperCase();return x.indexOf(t)>-1?t:e}function p(e,t){t=t||{};var r=t.body;if("string"==typeof e)this.url=e;else{if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new o(t.headers)),this.method=d(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function h(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function y(e){var t=new o;return e.split("\r\n").forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t}function m(e,t){t||(t={}),this.type="default",this.status="status"in t?t.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var b={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(b.arrayBuffer)var g=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],v=function(e){return e&&DataView.prototype.isPrototypeOf(e)},w=ArrayBuffer.isView||function(e){return e&&g.indexOf(Object.prototype.toString.call(e))>-1};o.prototype.append=function(e,n){e=t(e),n=r(n);var o=this.map[e];o||(o=[],this.map[e]=o),o.push(n)},o.prototype.delete=function(e){delete this.map[t(e)]},o.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},o.prototype.getAll=function(e){return this.map[t(e)]||[]},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,n){this.map[t(e)]=[r(n)]},o.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(n){e.call(t,n,r,this)},this)},this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),n(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),n(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),n(e)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var x=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},f.call(p.prototype),f.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var e=new m(null,{status:0,statusText:""});return e.type="error",e};var S=[301,302,303,307,308];m.redirect=function(e,t){if(S.indexOf(t)===-1)throw new RangeError("Invalid status code");return new m(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=p,e.Response=m,e.fetch=function(e,t){return new Promise(function(r,n){var o=new p(e,t),a=new XMLHttpRequest;a.onload=function(){var e={status:a.status,statusText:a.statusText,headers:y(a.getAllResponseHeaders()||"")};e.url="responseURL"in a?a.responseURL:e.headers.get("X-Request-URL");var t="response"in a?a.response:a.responseText;r(new m(t,e))},a.onerror=function(){n(new TypeError("Network request failed"))},a.ontimeout=function(){n(new TypeError("Network request failed"))},a.open(o.method,o.url,!0),"include"===o.credentials&&(a.withCredentials=!0),"responseType"in a&&b.blob&&(a.responseType="blob"),o.headers.forEach(function(e,t){a.setRequestHeader(t,e)}),a.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}]);