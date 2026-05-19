const $y=()=>{};var Lh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},jy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Gf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,E=l&63;u||(E=64,o||(g=64)),r.push(t[d],t[p],t[g],t[E])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(zf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):jy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||p==null)throw new zy;const g=i<<2|c>>4;if(r.push(g),l!==64){const E=c<<4&240|l>>2;if(r.push(E),p!==64){const C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gy=function(n){const e=zf(n);return Gf.encodeByteArray(e,!0)},Co=function(n){return Gy(n).replace(/\./g,"")},Kf=function(n){try{return Gf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=()=>Hf().__FIREBASE_DEFAULTS__,Hy=()=>{if(typeof process>"u"||typeof Lh>"u")return;const n=Lh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Wy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Kf(n[1]);return e&&JSON.parse(e)},na=()=>{try{return $y()||Ky()||Hy()||Wy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Wf=n=>{var e,t;return(t=(e=na())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Qf=n=>{const e=Wf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Jf=()=>{var n;return(n=na())==null?void 0:n.config},Yf=n=>{var e;return(e=na())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Co(JSON.stringify(t)),Co(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function Zf(){var e;const n=(e=na())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Xy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Zy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eI(){const n=Ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ep(){return!Zf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function tp(){return!Zf()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function np(){try{return typeof indexedDB=="object"}catch{return!1}}function tI(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI="FirebaseError";class bt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=nI,Object.setPrototypeOf(this,bt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ei.prototype.create)}}class Ei{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?rI(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new bt(s,c,r)}}function rI(n,e){return n.replace(sI,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const sI=/\{\$([^}]+)}/g;function iI(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function lt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Fh(i)&&Fh(o)){if(!lt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Fh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function js(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function zs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function oI(n,e){const t=new aI(n,e);return t.subscribe.bind(t)}class aI{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");cI(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=sc),s.error===void 0&&(s.error=sc),s.complete===void 0&&(s.complete=sc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function cI(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function sc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function An(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ra(n){return(await fetch(n,{credentials:"include"})).ok}class mn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Qy;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(hI(e))try{this.getOrInitializeService({instanceIdentifier:Un})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Un){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Un){return this.instances.has(e)}getOptions(e=Un){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:lI(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Un){return this.component?this.component.multipleInstances?e:Un:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function lI(n){return n===Un?void 0:n}function hI(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new uI(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const fI={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},pI=Z.INFO,mI={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},gI=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=mI[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class au{constructor(e){this.name=e,this._logLevel=pI,this._logHandler=gI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?fI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const _I=(n,e)=>e.some(t=>n instanceof t);let Uh,Bh;function yI(){return Uh||(Uh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function II(){return Bh||(Bh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rp=new WeakMap,vc=new WeakMap,sp=new WeakMap,ic=new WeakMap,cu=new WeakMap;function TI(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(hn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&rp.set(t,n)}).catch(()=>{}),cu.set(e,n),e}function EI(n){if(vc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});vc.set(n,e)}let Ac={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||sp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return hn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function wI(n){Ac=n(Ac)}function vI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(oc(this),e,...t);return sp.set(r,e.sort?e.sort():[e]),hn(r)}:II().includes(n)?function(...e){return n.apply(oc(this),e),hn(rp.get(this))}:function(...e){return hn(n.apply(oc(this),e))}}function AI(n){return typeof n=="function"?vI(n):(n instanceof IDBTransaction&&EI(n),_I(n,yI())?new Proxy(n,Ac):n)}function hn(n){if(n instanceof IDBRequest)return TI(n);if(ic.has(n))return ic.get(n);const e=AI(n);return e!==n&&(ic.set(n,e),cu.set(e,n)),e}const oc=n=>cu.get(n);function RI(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=hn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(hn(o.result),u.oldVersion,u.newVersion,hn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const bI=["get","getKey","getAll","getAllKeys","count"],SI=["put","add","delete","clear"],ac=new Map;function qh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ac.get(e))return ac.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=SI.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||bI.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return ac.set(e,i),i}wI(n=>({...n,get:(e,t,r)=>qh(e,t)||n.get(e,t,r),has:(e,t)=>!!qh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(CI(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function CI(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rc="@firebase/app",$h="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=new au("@firebase/app"),kI="@firebase/app-compat",VI="@firebase/analytics-compat",DI="@firebase/analytics",NI="@firebase/app-check-compat",xI="@firebase/app-check",OI="@firebase/auth",MI="@firebase/auth-compat",LI="@firebase/database",FI="@firebase/data-connect",UI="@firebase/database-compat",BI="@firebase/functions",qI="@firebase/functions-compat",$I="@firebase/installations",jI="@firebase/installations-compat",zI="@firebase/messaging",GI="@firebase/messaging-compat",KI="@firebase/performance",HI="@firebase/performance-compat",WI="@firebase/remote-config",QI="@firebase/remote-config-compat",JI="@firebase/storage",YI="@firebase/storage-compat",XI="@firebase/firestore",ZI="@firebase/ai",eT="@firebase/firestore-compat",tT="firebase",nT="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko="[DEFAULT]",rT={[Rc]:"fire-core",[kI]:"fire-core-compat",[DI]:"fire-analytics",[VI]:"fire-analytics-compat",[xI]:"fire-app-check",[NI]:"fire-app-check-compat",[OI]:"fire-auth",[MI]:"fire-auth-compat",[LI]:"fire-rtdb",[FI]:"fire-data-connect",[UI]:"fire-rtdb-compat",[BI]:"fire-fn",[qI]:"fire-fn-compat",[$I]:"fire-iid",[jI]:"fire-iid-compat",[zI]:"fire-fcm",[GI]:"fire-fcm-compat",[KI]:"fire-perf",[HI]:"fire-perf-compat",[WI]:"fire-rc",[QI]:"fire-rc-compat",[JI]:"fire-gcs",[YI]:"fire-gcs-compat",[XI]:"fire-fst",[eT]:"fire-fst-compat",[ZI]:"fire-vertex","fire-js":"fire-js",[tT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new Map,sT=new Map,bc=new Map;function jh(n,e){try{n.container.addComponent(e)}catch(t){Nt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xn(n){const e=n.name;if(bc.has(e))return Nt.debug(`There were multiple attempts to register component ${e}.`),!1;bc.set(e,n);for(const t of Vo.values())jh(t,n);for(const t of sT.values())jh(t,n);return!0}function ss(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function iT(n,e,t=ko){ss(n,e).clearInstance(t)}function ze(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},dn=new Ei("app","Firebase",oT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=nT;function cT(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ko,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw dn.create("bad-app-name",{appName:String(s)});if(t||(t=Jf()),!t)throw dn.create("no-options");const i=Vo.get(s);if(i){if(lt(t,i.options)&&lt(r,i.config))return i;throw dn.create("duplicate-app",{appName:s})}const o=new dI(s);for(const u of bc.values())o.addComponent(u);const c=new aT(t,r,o);return Vo.set(s,c),c}function uu(n=ko){const e=Vo.get(n);if(!e&&n===ko&&Jf())return cT();if(!e)throw dn.create("no-app",{appName:n});return e}function It(n,e,t){let r=rT[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Nt.warn(o.join(" "));return}Xn(new mn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uT="firebase-heartbeat-database",lT=1,ai="firebase-heartbeat-store";let cc=null;function ip(){return cc||(cc=RI(uT,lT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ai)}catch(t){console.warn(t)}}}}).catch(n=>{throw dn.create("idb-open",{originalErrorMessage:n.message})})),cc}async function hT(n){try{const t=(await ip()).transaction(ai),r=await t.objectStore(ai).get(op(n));return await t.done,r}catch(e){if(e instanceof bt)Nt.warn(e.message);else{const t=dn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Nt.warn(t.message)}}}async function zh(n,e){try{const r=(await ip()).transaction(ai,"readwrite");await r.objectStore(ai).put(e,op(n)),await r.done}catch(t){if(t instanceof bt)Nt.warn(t.message);else{const r=dn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Nt.warn(r.message)}}}function op(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=1024,fT=30;class pT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new gT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Gh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>fT){const o=_T(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Nt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Gh(),{heartbeatsToSend:r,unsentEntries:s}=mT(this._heartbeatsCache.heartbeats),i=Co(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Nt.warn(t),""}}}function Gh(){return new Date().toISOString().substring(0,10)}function mT(n,e=dT){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Kh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Kh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class gT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return np()?tI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await hT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return zh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return zh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Kh(n){return Co(JSON.stringify({version:2,heartbeats:n})).length}function _T(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yT(n){Xn(new mn("platform-logger",e=>new PI(e),"PRIVATE")),Xn(new mn("heartbeat",e=>new pT(e),"PRIVATE")),It(Rc,$h,n),It(Rc,$h,"esm2020"),It("fire-js","")}yT("");function ap(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const IT=ap,cp=new Ei("auth","Firebase",ap());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do=new au("@firebase/auth");function TT(n,...e){Do.logLevel<=Z.WARN&&Do.warn(`Auth (${ur}): ${n}`,...e)}function mo(n,...e){Do.logLevel<=Z.ERROR&&Do.error(`Auth (${ur}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,...e){throw hu(n,...e)}function at(n,...e){return hu(n,...e)}function lu(n,e,t){const r={...IT(),[e]:t};return new Ei("auth","Firebase",r).create(e,{appName:n.name})}function Dt(n){return lu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ET(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&rt(n,"argument-error"),lu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function hu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return cp.create(n,...e)}function z(n,e,...t){if(!n)throw hu(e,...t)}function Ct(n){const e="INTERNAL ASSERTION FAILED: "+n;throw mo(e),new Error(e)}function xt(n,e){n||Ct(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function wT(){return Hh()==="http:"||Hh()==="https:"}function Hh(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wT()||Xy()||"connection"in navigator)?navigator.onLine:!0}function AT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.shortDelay=e,this.longDelay=t,xt(t>e,"Short delay should be less than long delay!"),this.isMobile=Jy()||Zy()}get(){return vT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(n,e){xt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ST=new vi(3e4,6e4);function Ut(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function St(n,e,t,r,s={}){return lp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=wi({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return Yy()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&An(n.emulatorConfig.host)&&(l.credentials="include"),up.fetch()(await hp(n,n.config.apiHost,t,c),l)})}async function lp(n,e,t){n._canInitEmulator=!1;const r={...RT,...e};try{const s=new CT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ro(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ro(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ro(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ro(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw lu(n,d,l);rt(n,d)}}catch(s){if(s instanceof bt)throw s;rt(n,"network-request-failed",{message:String(s)})}}async function Ai(n,e,t,r,s={}){const i=await St(n,e,t,r,s);return"mfaPendingCredential"in i&&rt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function hp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?du(n.config,s):`${n.config.apiScheme}://${s}`;return bT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function PT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class CT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(at(this.auth,"network-request-failed")),ST.get())})}}function ro(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=at(n,e,r);return s.customData._tokenResponse=t,s}function Wh(n){return n!==void 0&&n.enterprise!==void 0}class kT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return PT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function VT(n,e){return St(n,"GET","/v2/recaptchaConfig",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DT(n,e){return St(n,"POST","/v1/accounts:delete",e)}async function No(n,e){return St(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function NT(n,e=!1){const t=H(n),r=await t.getIdToken(e),s=fu(r);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Qs(uc(s.auth_time)),issuedAtTime:Qs(uc(s.iat)),expirationTime:Qs(uc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function uc(n){return Number(n)*1e3}function fu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return mo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Kf(t);return s?JSON.parse(s):(mo("Failed to decode base64 JWT payload"),null)}catch(s){return mo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Qh(n){const e=fu(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof bt&&xT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function xT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qs(this.lastLoginAt),this.creationTime=Qs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xo(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Mr(n,No(e,{idToken:t}));z(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?dp(s.providerUserInfo):[],o=LT(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Pc(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function MT(n){const e=H(n);await xo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function LT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function dp(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FT(n,e){const t=await lp(n,{},async()=>{const r=wi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await hp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&An(n.emulatorConfig.host)&&(u.credentials="include"),up.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function UT(n,e){return St(n,"POST","/v2/accounts:revokeToken",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Qh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await FT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new kr;return r&&(z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(z(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new kr,this.toJSON())}_performRefresh(){return Ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ot{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new OT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Pc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Mr(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return NT(this,e)}reload(){return MT(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ot({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await xo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(Dt(this.auth));const e=await this.getIdToken();return await Mr(this,DT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:E,providerData:C,stsTokenManager:V}=t;z(p&&V,e,"internal-error");const k=kr.fromJSON(this.name,V);z(typeof p=="string",e,"internal-error"),Xt(r,e.name),Xt(s,e.name),z(typeof g=="boolean",e,"internal-error"),z(typeof E=="boolean",e,"internal-error"),Xt(i,e.name),Xt(o,e.name),Xt(c,e.name),Xt(u,e.name),Xt(l,e.name),Xt(d,e.name);const L=new ot({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:E,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:l,lastLoginAt:d});return C&&Array.isArray(C)&&(L.providerData=C.map(B=>({...B}))),u&&(L._redirectEventId=u),L}static async _fromIdTokenResponse(e,t,r=!1){const s=new kr;s.updateFromServerResponse(t);const i=new ot({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await xo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?dp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new kr;c.updateFromIdToken(r);const u=new ot({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Pc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=new Map;function kt(n){xt(n instanceof Function,"Expected a class definition");let e=Jh.get(n);return e?(xt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Jh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}fp.type="NONE";const Yh=fp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(n,e,t){return`firebase:${n}:${e}:${t}`}class Vr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=go(this.userKey,s.apiKey,i),this.fullPersistenceKey=go("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await No(this.auth,{idToken:e}).catch(()=>{});return t?ot._fromGetAccountInfoResponse(this.auth,t,e):null}return ot._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Vr(kt(Yh),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||kt(Yh);const o=go(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const g=await No(e,{idToken:d}).catch(()=>{});if(!g)break;p=await ot._fromGetAccountInfoResponse(e,g,d)}else p=ot._fromJSON(e,d);l!==i&&(c=p),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Vr(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Vr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_p(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(pp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ip(e))return"Blackberry";if(Tp(e))return"Webos";if(mp(e))return"Safari";if((e.includes("chrome/")||gp(e))&&!e.includes("edge/"))return"Chrome";if(yp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function pp(n=Ae()){return/firefox\//i.test(n)}function mp(n=Ae()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function gp(n=Ae()){return/crios\//i.test(n)}function _p(n=Ae()){return/iemobile/i.test(n)}function yp(n=Ae()){return/android/i.test(n)}function Ip(n=Ae()){return/blackberry/i.test(n)}function Tp(n=Ae()){return/webos/i.test(n)}function pu(n=Ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function BT(n=Ae()){var e;return pu(n)&&!!((e=window.navigator)!=null&&e.standalone)}function qT(){return eI()&&document.documentMode===10}function Ep(n=Ae()){return pu(n)||yp(n)||Tp(n)||Ip(n)||/windows phone/i.test(n)||_p(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wp(n,e=[]){let t;switch(n){case"Browser":t=Xh(Ae());break;case"Worker":t=`${Xh(Ae())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ur}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jT(n,e={}){return St(n,"GET","/v2/passwordPolicy",Ut(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zT=6;class GT{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??zT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Zh(this),this.idTokenSubscription=new Zh(this),this.beforeStateQueue=new $T(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=cp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Vr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await No(this,{idToken:e}),r=await ot._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ze(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=AT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(Dt(this));const t=e?H(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(Dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(Dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await jT(this),t=new GT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ei("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await UT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await Vr.create(this,[kt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&TT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Bt(n){return H(n)}class Zh{constructor(e){this.auth=e,this.observer=null,this.addObserver=oI(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function HT(n){sa=n}function vp(n){return sa.loadJS(n)}function WT(){return sa.recaptchaEnterpriseScript}function QT(){return sa.gapiScript}function JT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class YT{constructor(){this.enterprise=new XT}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class XT{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ZT="recaptcha-enterprise",Ap="NO_RECAPTCHA";class eE{constructor(e){this.type=ZT,this.auth=Bt(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{VT(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new kT(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Wh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(Ap)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new YT().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Wh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=WT();u.length!==0&&(u+=c),vp(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function ed(n,e,t,r=!1,s=!1){const i=new eE(n);let o;if(s)o=Ap;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Oo(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ed(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await ed(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(n,e){const t=ss(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(lt(i,e??{}))return s;rt(s,"already-initialized")}return t.initialize({options:e})}function nE(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(kt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function rE(n,e,t){const r=Bt(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Rp(e),{host:o,port:c}=sE(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(lt(l,r.config.emulator)&&lt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,An(o)?ra(`${i}//${o}${u}`):iE()}function Rp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function sE(n){const e=Rp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:td(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:td(o)}}}function td(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function iE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ct("not implemented")}_getIdTokenResponse(e){return Ct("not implemented")}_linkToIdToken(e,t){return Ct("not implemented")}_getReauthenticationResolver(e){return Ct("not implemented")}}async function oE(n,e){return St(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aE(n,e){return Ai(n,"POST","/v1/accounts:signInWithPassword",Ut(n,e))}async function cE(n,e){return St(n,"POST","/v1/accounts:sendOobCode",Ut(n,e))}async function uE(n,e){return cE(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lE(n,e){return Ai(n,"POST","/v1/accounts:signInWithEmailLink",Ut(n,e))}async function hE(n,e){return Ai(n,"POST","/v1/accounts:signInWithEmailLink",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci extends mu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ci(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ci(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Oo(e,t,"signInWithPassword",aE);case"emailLink":return lE(e,{email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Oo(e,r,"signUpPassword",oE);case"emailLink":return hE(e,{idToken:t,email:this._email,oobCode:this._password});default:rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dr(n,e){return Ai(n,"POST","/v1/accounts:signInWithIdp",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dE="http://localhost";class Zn extends mu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Zn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Zn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Dr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Dr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Dr(e,t)}buildRequest(){const e={requestUri:dE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fE(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function pE(n){const e=js(zs(n)).link,t=e?js(zs(e)).deep_link_id:null,r=js(zs(n)).deep_link_id;return(r?js(zs(r)).link:null)||r||t||e||n}class gu{constructor(e){const t=js(zs(e)),r=t.apiKey??null,s=t.oobCode??null,i=fE(t.mode??null);z(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=pE(e);try{return new gu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(){this.providerId=is.PROVIDER_ID}static credential(e,t){return ci._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=gu.parseLink(t);return z(r,"argument-error"),ci._fromEmailAndCode(e,r.code,r.tenantId)}}is.PROVIDER_ID="password";is.EMAIL_PASSWORD_SIGN_IN_METHOD="password";is.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri extends _u{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Ri{constructor(){super("facebook.com")}static credential(e){return Zn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nn.credential(e.oauthAccessToken)}catch{return null}}}nn.FACEBOOK_SIGN_IN_METHOD="facebook.com";nn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends Ri{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Zn._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return rn.credential(t,r)}catch{return null}}}rn.GOOGLE_SIGN_IN_METHOD="google.com";rn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Ri{constructor(){super("github.com")}static credential(e){return Zn._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sn.credential(e.oauthAccessToken)}catch{return null}}}sn.GITHUB_SIGN_IN_METHOD="github.com";sn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on extends Ri{constructor(){super("twitter.com")}static credential(e,t){return Zn._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return on.credential(t,r)}catch{return null}}}on.TWITTER_SIGN_IN_METHOD="twitter.com";on.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mE(n,e){return Ai(n,"POST","/v1/accounts:signUp",Ut(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ot._fromIdTokenResponse(e,r,s),o=nd(r);return new er({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=nd(r);return new er({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function nd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo extends bt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Mo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Mo(e,t,r,s)}}function bp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Mo._fromErrorAndOperation(n,i,e,r):i})}async function gE(n,e,t=!1){const r=await Mr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return er._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _E(n,e,t=!1){const{auth:r}=n;if(ze(r.app))return Promise.reject(Dt(r));const s="reauthenticate";try{const i=await Mr(n,bp(r,s,e,n),t);z(i.idToken,r,"internal-error");const o=fu(i.idToken);z(o,r,"internal-error");const{sub:c}=o;return z(n.uid===c,r,"user-mismatch"),er._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&rt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sp(n,e,t=!1){if(ze(n.app))return Promise.reject(Dt(n));const r="signIn",s=await bp(n,r,e),i=await er._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function yE(n,e){return Sp(Bt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pp(n){const e=Bt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function EC(n,e,t){const r=Bt(n);await Oo(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",uE)}async function wC(n,e,t){if(ze(n.app))return Promise.reject(Dt(n));const r=Bt(n),o=await Oo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",mE).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Pp(n),u}),c=await er._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function vC(n,e,t){return ze(n.app)?Promise.reject(Dt(n)):yE(H(n),is.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Pp(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IE(n,e){return St(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AC(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=H(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Mr(r,IE(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RC(n,e){return H(n).setPersistence(e)}function TE(n,e,t,r){return H(n).onIdTokenChanged(e,t,r)}function EE(n,e,t){return H(n).beforeAuthStateChanged(e,t)}function bC(n,e,t,r){return H(n).onAuthStateChanged(e,t,r)}function SC(n){return H(n).signOut()}const Lo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Lo,"1"),this.storage.removeItem(Lo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE=1e3,vE=10;class kp extends Cp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ep(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);qT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vE):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},wE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}kp.type="LOCAL";const AE=kp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp extends Cp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Vp.type="SESSION";const Dp=Vp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ia(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await RE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ia.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=yu("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(){return window}function SE(n){Tt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(){return typeof Tt().WorkerGlobalScope<"u"&&typeof Tt().importScripts=="function"}async function PE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function CE(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function kE(){return Np()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp="firebaseLocalStorageDb",VE=1,Fo="firebaseLocalStorage",Op="fbase_key";class bi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function oa(n,e){return n.transaction([Fo],e?"readwrite":"readonly").objectStore(Fo)}function DE(){const n=indexedDB.deleteDatabase(xp);return new bi(n).toPromise()}function Cc(){const n=indexedDB.open(xp,VE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Fo,{keyPath:Op})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Fo)?e(r):(r.close(),await DE(),e(await Cc()))})})}async function rd(n,e,t){const r=oa(n,!0).put({[Op]:e,value:t});return new bi(r).toPromise()}async function NE(n,e){const t=oa(n,!1).get(e),r=await new bi(t).toPromise();return r===void 0?null:r.value}function sd(n,e){const t=oa(n,!0).delete(e);return new bi(t).toPromise()}const xE=800,OE=3;class Mp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Cc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>OE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Np()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ia._getInstance(kE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await PE(),!this.activeServiceWorker)return;this.sender=new bE(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||CE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Cc();return await rd(e,Lo,"1"),await sd(e,Lo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>rd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>NE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>sd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=oa(s,!1).getAll();return new bi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Mp.type="LOCAL";const ME=Mp;new vi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(n,e){return e?kt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu extends mu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function LE(n){return Sp(n.auth,new Iu(n),n.bypassAuthState)}function FE(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),_E(t,new Iu(n),n.bypassAuthState)}async function UE(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),gE(t,new Iu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return LE;case"linkViaPopup":case"linkViaRedirect":return UE;case"reauthViaPopup":case"reauthViaRedirect":return FE;default:rt(this.auth,"internal-error")}}resolve(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BE=new vi(2e3,1e4);async function PC(n,e,t){if(ze(n.app))return Promise.reject(at(n,"operation-not-supported-in-this-environment"));const r=Bt(n);ET(n,e,_u);const s=Lp(r,t);return new Kn(r,"signInViaPopup",e,s).executeNotNull()}class Kn extends Fp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Kn.currentPopupAction&&Kn.currentPopupAction.cancel(),Kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){xt(this.filter.length===1,"Popup operations only handle one event");const e=yu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,BE.get())};e()}}Kn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE="pendingRedirect",_o=new Map;class $E extends Fp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=_o.get(this.auth._key());if(!e){try{const r=await jE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}_o.set(this.auth._key(),e)}return this.bypassAuthState||_o.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jE(n,e){const t=KE(e),r=GE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function zE(n,e){_o.set(n._key(),e)}function GE(n){return kt(n._redirectPersistence)}function KE(n){return go(qE,n.config.apiKey,n.name)}async function HE(n,e,t=!1){if(ze(n.app))return Promise.reject(Dt(n));const r=Bt(n),s=Lp(r,e),o=await new $E(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WE=600*1e3;class QE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!JE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Up(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(at(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=WE&&this.cachedEventUids.clear(),this.cachedEventUids.has(id(e))}saveEventToCache(e){this.cachedEventUids.add(id(e)),this.lastProcessedEventTime=Date.now()}}function id(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Up({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function JE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Up(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(n,e={}){return St(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ZE=/^https?/;async function ew(n){if(n.config.emulator)return;const{authorizedDomains:e}=await YE(n);for(const t of e)try{if(tw(t))return}catch{}rt(n,"unauthorized-domain")}function tw(n){const e=Sc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!ZE.test(t))return!1;if(XE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw=new vi(3e4,6e4);function od(){const n=Tt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function rw(n){return new Promise((e,t)=>{var s,i,o;function r(){od(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{od(),t(at(n,"network-request-failed"))},timeout:nw.get()})}if((i=(s=Tt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Tt().gapi)!=null&&o.load)r();else{const c=JT("iframefcb");return Tt()[c]=()=>{gapi.load?r():t(at(n,"network-request-failed"))},vp(`${QT()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw yo=null,e})}let yo=null;function sw(n){return yo=yo||rw(n),yo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw=new vi(5e3,15e3),ow="__/auth/iframe",aw="emulator/auth/iframe",cw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},uw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function lw(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?du(e,aw):`https://${n.config.authDomain}/${ow}`,r={apiKey:e.apiKey,appName:n.name,v:ur},s=uw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${wi(r).slice(1)}`}async function hw(n){const e=await sw(n),t=Tt().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:lw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:cw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=at(n,"network-request-failed"),c=Tt().setTimeout(()=>{i(o)},iw.get());function u(){Tt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fw=500,pw=600,mw="_blank",gw="http://localhost";class ad{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _w(n,e,t,r=fw,s=pw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...dw,width:r.toString(),height:s.toString(),top:i,left:o},l=Ae().toLowerCase();t&&(c=gp(l)?mw:t),pp(l)&&(e=e||gw,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[E,C])=>`${g}${E}=${C},`,"");if(BT(l)&&c!=="_self")return yw(e||"",c),new ad(null);const p=window.open(e||"",c,d);z(p,n,"popup-blocked");try{p.focus()}catch{}return new ad(p)}function yw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iw="__/auth/handler",Tw="emulator/auth/handler",Ew=encodeURIComponent("fac");async function cd(n,e,t,r,s,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ur,eventId:s};if(e instanceof _u){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",iI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Ri){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${Ew}=${encodeURIComponent(u)}`:"";return`${ww(n)}?${wi(c).slice(1)}${l}`}function ww({config:n}){return n.emulator?du(n,Tw):`https://${n.authDomain}/${Iw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc="webStorageSupport";class vw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Dp,this._completeRedirectFn=HE,this._overrideRedirectResult=zE}async _openPopup(e,t,r,s){var o;xt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await cd(e,t,r,Sc(),s);return _w(e,i,yu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await cd(e,t,r,Sc(),s);return SE(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(xt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await hw(e),r=new QE(e);return t.register("authEvent",s=>(z(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(lc,{type:lc},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[lc];i!==void 0&&t(!!i),rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ew(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ep()||mp()||pu()}}const Aw=vw;var ud="@firebase/auth",ld="1.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Sw(n){Xn(new mn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wp(n)},l=new KT(r,s,i,u);return nE(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xn(new mn("auth-internal",e=>{const t=Bt(e.getProvider("auth").getImmediate());return(r=>new Rw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),It(ud,ld,bw(n)),It(ud,ld,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pw=300,Cw=Yf("authIdTokenMaxAge")||Pw;let hd=null;const kw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Cw)return;const s=t==null?void 0:t.token;hd!==s&&(hd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function CC(n=uu()){const e=ss(n,"auth");if(e.isInitialized())return e.getImmediate();const t=tE(n,{popupRedirectResolver:Aw,persistence:[ME,AE,Dp]}),r=Yf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=kw(i.toString());EE(t,o,()=>o(t.currentUser)),TE(t,c=>o(c))}}const s=Wf("auth");return s&&rE(t,`http://${s}`),t}function Vw(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}HT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=at("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Vw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Sw("Browser");var dd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fn,Bp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function I(){}I.prototype=_.prototype,T.F=_.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(v,w,S){for(var y=Array(arguments.length-2),je=2;je<arguments.length;je++)y[je-2]=arguments[je];return _.prototype[w].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,I){I||(I=0);const v=Array(16);if(typeof _=="string")for(var w=0;w<16;++w)v[w]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(w=0;w<16;++w)v[w]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=T.g[0],I=T.g[1],w=T.g[2];let S=T.g[3],y;y=_+(S^I&(w^S))+v[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[2]+606105819&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[3]+3250441966&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[6]+2821735955&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[7]+4249261313&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[10]+4294925233&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[11]+2304563134&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[14]+2792965006&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[15]+1236535329&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(w^S&(I^w))+v[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[11]+643717713&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[0]+3921069994&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[15]+3634488961&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[4]+3889429448&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[3]+4107603335&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[8]+1163531501&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[7]+1735328473&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[12]+2368359562&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(I^w^S)+v[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[11]+1839030562&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[14]+4259657740&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[7]+4139469664&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[10]+3200236656&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[3]+3572445317&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[6]+76029189&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[15]+530742520&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[2]+3299628645&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(w^(I|~S))+v[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[14]+2878612391&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[5]+4237533241&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[10]+4293915773&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[1]+2240044497&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[6]+2734768916&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[13]+1309151649&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[2]+718787259&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+S&4294967295}r.prototype.v=function(T,_){_===void 0&&(_=T.length);const I=_-this.blockSize,v=this.C;let w=this.h,S=0;for(;S<_;){if(w==0)for(;S<=I;)s(this,T,S),S+=this.blockSize;if(typeof T=="string"){for(;S<_;)if(v[w++]=T.charCodeAt(S++),w==this.blockSize){s(this,v),w=0;break}}else for(;S<_;)if(v[w++]=T[S++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=_},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,I=0;I<4;++I)for(let v=0;v<32;v+=8)T[_++]=this.g[I]>>>v&255;return T};function i(T,_){var I=c;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=_(T)}function o(T,_){this.h=_;const I=[];let v=!0;for(let w=T.length-1;w>=0;w--){const S=T[w]|0;v&&S==_||(I[w]=S,v=!1)}this.g=I}var c={};function u(T){return-128<=T&&T<128?i(T,function(_){return new o([_|0],_<0?-1:0)}):new o([T|0],T<0?-1:0)}function l(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return k(l(-T));const _=[];let I=1;for(let v=0;T>=I;v++)_[v]=T/I|0,I*=4294967296;return new o(_,0)}function d(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return k(d(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=l(Math.pow(_,8));let v=p;for(let S=0;S<T.length;S+=8){var w=Math.min(8,T.length-S);const y=parseInt(T.substring(S,S+w),_);w<8?(w=l(Math.pow(_,w)),v=v.j(w).add(l(y))):(v=v.j(I),v=v.add(l(y)))}return v}var p=u(0),g=u(1),E=u(16777216);n=o.prototype,n.m=function(){if(V(this))return-k(this).m();let T=0,_=1;for(let I=0;I<this.g.length;I++){const v=this.i(I);T+=(v>=0?v:4294967296+v)*_,_*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(V(this))return"-"+k(this).toString(T);const _=l(Math.pow(T,6));var I=this;let v="";for(;;){const w=G(I,_).g;I=L(I,w.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=w,C(I))return S+v;for(;S.length<6;)S="0"+S;v=S+v}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function V(T){return T.h==-1}n.l=function(T){return T=L(this,T),V(T)?-1:C(T)?0:1};function k(T){const _=T.g.length,I=[];for(let v=0;v<_;v++)I[v]=~T.g[v];return new o(I,~T.h).add(g)}n.abs=function(){return V(this)?k(this):this},n.add=function(T){const _=Math.max(this.g.length,T.g.length),I=[];let v=0;for(let w=0;w<=_;w++){let S=v+(this.i(w)&65535)+(T.i(w)&65535),y=(S>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);v=y>>>16,S&=65535,y&=65535,I[w]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function L(T,_){return T.add(k(_))}n.j=function(T){if(C(this)||C(T))return p;if(V(this))return V(T)?k(this).j(k(T)):k(k(this).j(T));if(V(T))return k(this.j(k(T)));if(this.l(E)<0&&T.l(E)<0)return l(this.m()*T.m());const _=this.g.length+T.g.length,I=[];for(var v=0;v<2*_;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(let w=0;w<T.g.length;w++){const S=this.i(v)>>>16,y=this.i(v)&65535,je=T.i(w)>>>16,Dn=T.i(w)&65535;I[2*v+2*w]+=y*Dn,B(I,2*v+2*w),I[2*v+2*w+1]+=S*Dn,B(I,2*v+2*w+1),I[2*v+2*w+1]+=y*je,B(I,2*v+2*w+1),I[2*v+2*w+2]+=S*je,B(I,2*v+2*w+2)}for(T=0;T<_;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=_;T<2*_;T++)I[T]=0;return new o(I,0)};function B(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function F(T,_){this.g=T,this.h=_}function G(T,_){if(C(_))throw Error("division by zero");if(C(T))return new F(p,p);if(V(T))return _=G(k(T),_),new F(k(_.g),k(_.h));if(V(_))return _=G(T,k(_)),new F(k(_.g),_.h);if(T.g.length>30){if(V(T)||V(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,v=_;v.l(T)<=0;)I=W(I),v=W(v);var w=J(I,1),S=J(v,1);for(v=J(v,2),I=J(I,2);!C(v);){var y=S.add(v);y.l(T)<=0&&(w=w.add(I),S=y),v=J(v,1),I=J(I,1)}return _=L(T,w.j(_)),new F(w,_)}for(w=p;T.l(_)>=0;){for(I=Math.max(1,Math.floor(T.m()/_.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),S=l(I),y=S.j(_);V(y)||y.l(T)>0;)I-=v,S=l(I),y=S.j(_);C(S)&&(S=g),w=w.add(S),T=L(T,y)}return new F(w,T)}n.B=function(T){return G(this,T).h},n.and=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)&T.i(v);return new o(I,this.h&T.h)},n.or=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)|T.i(v);return new o(I,this.h|T.h)},n.xor=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)^T.i(v);return new o(I,this.h^T.h)};function W(T){const _=T.g.length+1,I=[];for(let v=0;v<_;v++)I[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(I,T.h)}function J(T,_){const I=_>>5;_%=32;const v=T.g.length-I,w=[];for(let S=0;S<v;S++)w[S]=_>0?T.i(S+I)>>>_|T.i(S+I+1)<<32-_:T.i(S+I);return new o(w,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Bp=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,fn=o}).apply(typeof dd<"u"?dd:typeof self<"u"?self:typeof window<"u"?window:{});var so=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qp,Gs,$p,Io,kc,jp,zp,Gp;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof so=="object"&&so];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var R=a[m];if(!(R in f))break e;f=f[R]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var f=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&f.push([m,h[m]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function l(a,h,f){return l=u,l.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(m,R,P){for(var M=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)M[Q-2]=arguments[Q];return h.prototype[R].apply(m,M)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function E(a){const h=a.length;if(h>0){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function C(a,h){for(let m=1;m<arguments.length;m++){const R=arguments[m];var f=typeof R;if(f=f!="object"?f:R?Array.isArray(R)?"array":f:"null",f=="array"||f=="object"&&typeof R.length=="number"){f=a.length||0;const P=R.length||0;a.length=f+P;for(let M=0;M<P;M++)a[f+M]=R[M]}else a.push(R)}}class V{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function L(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class B{constructor(){this.h=this.g=null}add(h,f){const m=F.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var F=new V(()=>new G,a=>a.reset());class G{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let W,J=!1,T=new B,_=()=>{const a=Promise.resolve(void 0);W=()=>{a.then(I)}};function I(){for(var a;a=L();){try{a.h.call(a.g)}catch(f){k(f)}var h=F;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}J=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function je(a,h){w.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(je,w),je.prototype.init=function(a,h){const f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&je.Z.h.call(this)},je.prototype.h=function(){je.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Dn="closure_listenable_"+(Math.random()*1e6|0),ly=0;function hy(a,h,f,m,R){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=R,this.key=++ly,this.da=this.fa=!1}function $i(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ji(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function dy(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function Ml(a){const h={};for(const f in a)h[f]=a[f];return h}const Ll="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fl(a,h){let f,m;for(let R=1;R<arguments.length;R++){m=arguments[R];for(f in m)a[f]=m[f];for(let P=0;P<Ll.length;P++)f=Ll[P],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function zi(a){this.src=a,this.g={},this.h=0}zi.prototype.add=function(a,h,f,m,R){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const M=Oa(a,h,m,R);return M>-1?(h=a[M],f||(h.fa=!1)):(h=new hy(h,this.src,P,!!m,R),h.fa=f,a.push(h)),h};function xa(a,h){const f=h.type;if(f in a.g){var m=a.g[f],R=Array.prototype.indexOf.call(m,h,void 0),P;(P=R>=0)&&Array.prototype.splice.call(m,R,1),P&&($i(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Oa(a,h,f,m){for(let R=0;R<a.length;++R){const P=a[R];if(!P.da&&P.listener==h&&P.capture==!!f&&P.ha==m)return R}return-1}var Ma="closure_lm_"+(Math.random()*1e6|0),La={};function Ul(a,h,f,m,R){if(Array.isArray(h)){for(let P=0;P<h.length;P++)Ul(a,h[P],f,m,R);return null}return f=$l(f),a&&a[Dn]?a.J(h,f,c(m)?!!m.capture:!1,R):fy(a,h,f,!1,m,R)}function fy(a,h,f,m,R,P){if(!h)throw Error("Invalid event type");const M=c(R)?!!R.capture:!!R;let Q=Ua(a);if(Q||(a[Ma]=Q=new zi(a)),f=Q.add(h,f,m,M,P),f.proxy)return f;if(m=py(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)S||(R=M),R===void 0&&(R=!1),a.addEventListener(h.toString(),m,R);else if(a.attachEvent)a.attachEvent(ql(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function py(){function a(f){return h.call(a.src,a.listener,f)}const h=my;return a}function Bl(a,h,f,m,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)Bl(a,h[P],f,m,R);else m=c(m)?!!m.capture:!!m,f=$l(f),a&&a[Dn]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],f=Oa(h,f,m,R),f>-1&&($i(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=Ua(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Oa(h,f,m,R)),(f=a>-1?h[a]:null)&&Fa(f))}function Fa(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Dn])xa(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(ql(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=Ua(h))?(xa(f,a),f.h==0&&(f.src=null,h[Ma]=null)):$i(a)}}}function ql(a){return a in La?La[a]:La[a]="on"+a}function my(a,h){if(a.da)a=!0;else{h=new je(h,this);const f=a.listener,m=a.ha||a.src;a.fa&&Fa(a),a=f.call(m,h)}return a}function Ua(a){return a=a[Ma],a instanceof zi?a:null}var Ba="__closure_events_fn_"+(Math.random()*1e9>>>0);function $l(a){return typeof a=="function"?a:(a[Ba]||(a[Ba]=function(h){return a.handleEvent(h)}),a[Ba])}function Ne(){v.call(this),this.i=new zi(this),this.M=this,this.G=null}p(Ne,v),Ne.prototype[Dn]=!0,Ne.prototype.removeEventListener=function(a,h,f,m){Bl(this,a,h,f,m)};function Ue(a,h){var f,m=a.G;if(m)for(f=[];m;m=m.G)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new w(h,a);else if(h instanceof w)h.target=h.target||a;else{var R=h;h=new w(m,a),Fl(h,R)}R=!0;let P,M;if(f)for(M=f.length-1;M>=0;M--)P=h.g=f[M],R=Gi(P,m,!0,h)&&R;if(P=h.g=a,R=Gi(P,m,!0,h)&&R,R=Gi(P,m,!1,h)&&R,f)for(M=0;M<f.length;M++)P=h.g=f[M],R=Gi(P,m,!1,h)&&R}Ne.prototype.N=function(){if(Ne.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let m=0;m<f.length;m++)$i(f[m]);delete a.g[h],a.h--}}this.G=null},Ne.prototype.J=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},Ne.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function Gi(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let R=!0;for(let P=0;P<h.length;++P){const M=h[P];if(M&&!M.da&&M.capture==f){const Q=M.listener,ve=M.ha||M.src;M.fa&&xa(a.i,M),R=Q.call(ve,m)!==!1&&R}}return R&&!m.defaultPrevented}function gy(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function jl(a){a.g=gy(()=>{a.g=null,a.i&&(a.i=!1,jl(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class _y extends v{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:jl(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ts(a){v.call(this),this.h=a,this.g={}}p(Ts,v);var zl=[];function Gl(a){ji(a.g,function(h,f){this.g.hasOwnProperty(f)&&Fa(h)},a),a.g={}}Ts.prototype.N=function(){Ts.Z.N.call(this),Gl(this)},Ts.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qa=o.JSON.stringify,yy=o.JSON.parse,Iy=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Kl(){}function Hl(){}var Es={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function $a(){w.call(this,"d")}p($a,w);function ja(){w.call(this,"c")}p(ja,w);var Nn={},Wl=null;function Ki(){return Wl=Wl||new Ne}Nn.Ia="serverreachability";function Ql(a){w.call(this,Nn.Ia,a)}p(Ql,w);function ws(a){const h=Ki();Ue(h,new Ql(h))}Nn.STAT_EVENT="statevent";function Jl(a,h){w.call(this,Nn.STAT_EVENT,a),this.stat=h}p(Jl,w);function Be(a){const h=Ki();Ue(h,new Jl(h,a))}Nn.Ja="timingevent";function Yl(a,h){w.call(this,Nn.Ja,a),this.size=h}p(Yl,w);function vs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function As(){this.g=!0}As.prototype.ua=function(){this.g=!1};function Ty(a,h,f,m,R,P){a.info(function(){if(a.g)if(P){var M="",Q=P.split("&");for(let ae=0;ae<Q.length;ae++){var ve=Q[ae].split("=");if(ve.length>1){const Se=ve[0];ve=ve[1];const dt=Se.split("_");M=dt.length>=2&&dt[1]=="type"?M+(Se+"="+ve+"&"):M+(Se+"=redacted&")}}}else M=null;else M=P;return"XMLHTTP REQ ("+m+") [attempt "+R+"]: "+h+`
`+f+`
`+M})}function Ey(a,h,f,m,R,P,M){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+R+"]: "+h+`
`+f+`
`+P+" "+M})}function gr(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+vy(a,f)+(m?" "+m:"")})}function wy(a,h){a.info(function(){return"TIMEOUT: "+h})}As.prototype.info=function(){};function vy(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var f=P[a];if(!(f.length<2)){var m=f[1];if(Array.isArray(m)&&!(m.length<1)){var R=m[0];if(R!="noop"&&R!="stop"&&R!="close")for(let M=1;M<m.length;M++)m[M]=""}}}}return qa(P)}catch{return h}}var Hi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Xl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Zl;function za(){}p(za,Kl),za.prototype.g=function(){return new XMLHttpRequest},Zl=new za;function Rs(a){return encodeURIComponent(String(a))}function Ay(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function Kt(a,h,f,m){this.j=a,this.i=h,this.l=f,this.S=m||1,this.V=new Ts(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new eh}function eh(){this.i=null,this.g="",this.h=!1}var th={},Ga={};function Ka(a,h,f){a.M=1,a.A=Qi(ht(h)),a.u=f,a.R=!0,nh(a,null)}function nh(a,h){a.F=Date.now(),Wi(a),a.B=ht(a.A);var f=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),mh(f.i,"t",m),a.C=0,f=a.j.L,a.h=new eh,a.g=Nh(a.j,f?h:null,!a.u),a.P>0&&(a.O=new _y(l(a.Y,a,a.g),a.P)),h=a.V,f=a.g,m=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(zl[0]=R.toString()),R=zl);for(let P=0;P<R.length;P++){const M=Ul(f,R[P],m||h.handleEvent,!1,h.h||h);if(!M)break;h.g[M.key]=M}h=a.J?Ml(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),ws(),Ty(a.i,a.v,a.B,a.l,a.S,a.u)}Kt.prototype.ba=function(a){a=a.target;const h=this.O;h&&Qt(a)==3?h.j():this.Y(a)},Kt.prototype.Y=function(a){try{if(a==this.g)e:{const Q=Qt(this.g),ve=this.g.ya(),ae=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||wh(this.g)))){this.K||Q!=4||ve==7||(ve==8||ae<=0?ws(3):ws(2)),Ha(this);var h=this.g.ca();this.X=h;var f=Ry(this);if(this.o=h==200,Ey(this.i,this.v,this.B,this.l,this.S,Q,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,R=this.g;if((m=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var P=m;break t}}P=null}if(a=P)gr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Wa(this,a);else{this.o=!1,this.m=3,Be(12),xn(this),bs(this);break e}}if(this.R){a=!0;let Se;for(;!this.K&&this.C<f.length;)if(Se=by(this,f),Se==Ga){Q==4&&(this.m=4,Be(14),a=!1),gr(this.i,this.l,null,"[Incomplete Response]");break}else if(Se==th){this.m=4,Be(15),gr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else gr(this.i,this.l,Se,null),Wa(this,Se);if(rh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||f.length!=0||this.h.h||(this.m=1,Be(16),a=!1),this.o=this.o&&a,!a)gr(this.i,this.l,f,"[Invalid Chunked Response]"),xn(this),bs(this);else if(f.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),nc(M),M.P=!0,Be(11))}}else gr(this.i,this.l,f,null),Wa(this,f);Q==4&&xn(this),this.o&&!this.K&&(Q==4?Ch(this.j,this):(this.o=!1,Wi(this)))}else By(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Be(12)):(this.m=0,Be(13)),xn(this),bs(this)}}}catch{}finally{}};function Ry(a){if(!rh(a))return a.g.la();const h=wh(a.g);if(h==="")return"";let f="";const m=h.length,R=Qt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return xn(a),bs(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<m;P++)a.h.h=!0,f+=a.h.i.decode(h[P],{stream:!(R&&P==m-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function rh(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function by(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?Ga:(f=Number(h.substring(f,m)),isNaN(f)?th:(m+=1,m+f>h.length?Ga:(h=h.slice(m,m+f),a.C=m+f,h)))}Kt.prototype.cancel=function(){this.K=!0,xn(this)};function Wi(a){a.T=Date.now()+a.H,sh(a,a.H)}function sh(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=vs(l(a.aa,a),h)}function Ha(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Kt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(wy(this.i,this.B),this.M!=2&&(ws(),Be(17)),xn(this),this.m=2,bs(this)):sh(this,this.T-a)};function bs(a){a.j.I==0||a.K||Ch(a.j,a)}function xn(a){Ha(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Gl(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Wa(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||Qa(f.h,a))){if(!a.L&&Qa(f.h,a)&&f.I==3){try{var m=f.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var R=m;if(R[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)eo(f),Xi(f);else break e;tc(f),Be(18)}}else f.xa=R[1],0<f.xa-f.K&&R[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=vs(l(f.Va,f),6e3));ah(f.h)<=1&&f.ta&&(f.ta=void 0)}else Mn(f,11)}else if((a.L||f.g==a)&&eo(f),!y(h))for(R=f.Ba.g.parse(h),h=0;h<R.length;h++){let ae=R[h];const Se=ae[0];if(!(Se<=f.K))if(f.K=Se,ae=ae[1],f.I==2)if(ae[0]=="c"){f.M=ae[1],f.ba=ae[2];const dt=ae[3];dt!=null&&(f.ka=dt,f.j.info("VER="+f.ka));const Ln=ae[4];Ln!=null&&(f.za=Ln,f.j.info("SVER="+f.za));const Jt=ae[5];Jt!=null&&typeof Jt=="number"&&Jt>0&&(m=1.5*Jt,f.O=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const Yt=a.g;if(Yt){const no=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(no){var P=m.h;P.g||no.indexOf("spdy")==-1&&no.indexOf("quic")==-1&&no.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ja(P,P.h),P.h=null))}if(m.G){const rc=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;rc&&(m.wa=rc,le(m.J,m.G,rc))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),m=f;var M=a;if(m.na=Dh(m,m.L?m.ba:null,m.W),M.L){ch(m.h,M);var Q=M,ve=m.O;ve&&(Q.H=ve),Q.D&&(Ha(Q),Wi(Q)),m.g=M}else Sh(m);f.i.length>0&&Zi(f)}else ae[0]!="stop"&&ae[0]!="close"||Mn(f,7);else f.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?Mn(f,7):ec(f):ae[0]!="noop"&&f.l&&f.l.qa(ae),f.A=0)}}ws(4)}catch{}}var Sy=class{constructor(a,h){this.g=a,this.map=h}};function ih(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function oh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ah(a){return a.h?1:a.g?a.g.size:0}function Qa(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ja(a,h){a.g?a.g.add(h):a.h=h}function ch(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}ih.prototype.cancel=function(){if(this.i=uh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uh(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return E(a.i)}var lh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Py(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const m=a[f].indexOf("=");let R,P=null;m>=0?(R=a[f].substring(0,m),P=a[f].substring(m+1)):R=a[f],h(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Ht(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Ht?(this.l=a.l,Ss(this,a.j),this.o=a.o,this.g=a.g,Ps(this,a.u),this.h=a.h,Ya(this,gh(a.i)),this.m=a.m):a&&(h=String(a).match(lh))?(this.l=!1,Ss(this,h[1]||"",!0),this.o=Cs(h[2]||""),this.g=Cs(h[3]||"",!0),Ps(this,h[4]),this.h=Cs(h[5]||"",!0),Ya(this,h[6]||"",!0),this.m=Cs(h[7]||"")):(this.l=!1,this.i=new Vs(null,this.l))}Ht.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ks(h,hh,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ks(h,hh,!0),"@"),a.push(Rs(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(ks(f,f.charAt(0)=="/"?Vy:ky,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",ks(f,Ny)),a.join("")},Ht.prototype.resolve=function(a){const h=ht(this);let f=!!a.j;f?Ss(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var m=a.h;if(f)Ps(h,a.u);else if(f=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var R=h.h.lastIndexOf("/");R!=-1&&(m=h.h.slice(0,R+1)+m)}if(R=m,R==".."||R==".")m="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){m=R.lastIndexOf("/",0)==0,R=R.split("/");const P=[];for(let M=0;M<R.length;){const Q=R[M++];Q=="."?m&&M==R.length&&P.push(""):Q==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),m&&M==R.length&&P.push("")):(P.push(Q),m=!0)}m=P.join("/")}else m=R}return f?h.h=m:f=a.i.toString()!=="",f?Ya(h,gh(a.i)):f=!!a.m,f&&(h.m=a.m),h};function ht(a){return new Ht(a)}function Ss(a,h,f){a.j=f?Cs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ps(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Ya(a,h,f){h instanceof Vs?(a.i=h,xy(a.i,a.l)):(f||(h=ks(h,Dy)),a.i=new Vs(h,a.l))}function le(a,h,f){a.i.set(h,f)}function Qi(a){return le(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Cs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ks(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,Cy),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Cy(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hh=/[#\/\?@]/g,ky=/[#\?:]/g,Vy=/[#\?]/g,Dy=/[#\?@]/g,Ny=/#/g;function Vs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function On(a){a.g||(a.g=new Map,a.h=0,a.i&&Py(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=Vs.prototype,n.add=function(a,h){On(this),this.i=null,a=_r(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function dh(a,h){On(a),h=_r(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function fh(a,h){return On(a),h=_r(a,h),a.g.has(h)}n.forEach=function(a,h){On(this),this.g.forEach(function(f,m){f.forEach(function(R){a.call(h,R,m,this)},this)},this)};function ph(a,h){On(a);let f=[];if(typeof h=="string")fh(a,h)&&(f=f.concat(a.g.get(_r(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return On(this),this.i=null,a=_r(this,a),fh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=ph(this,a),a.length>0?String(a[0]):h):h};function mh(a,h,f){dh(a,h),f.length>0&&(a.i=null,a.g.set(_r(a,h),E(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var f=h[m];const R=Rs(f);f=ph(this,f);for(let P=0;P<f.length;P++){let M=R;f[P]!==""&&(M+="="+Rs(f[P])),a.push(M)}}return this.i=a.join("&")};function gh(a){const h=new Vs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function _r(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function xy(a,h){h&&!a.j&&(On(a),a.i=null,a.g.forEach(function(f,m){const R=m.toLowerCase();m!=R&&(dh(this,m),mh(this,R,f))},a)),a.j=h}function Oy(a,h){const f=new As;if(o.Image){const m=new Image;m.onload=d(Wt,f,"TestLoadImage: loaded",!0,h,m),m.onerror=d(Wt,f,"TestLoadImage: error",!1,h,m),m.onabort=d(Wt,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(Wt,f,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function My(a,h){const f=new As,m=new AbortController,R=setTimeout(()=>{m.abort(),Wt(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(P=>{clearTimeout(R),P.ok?Wt(f,"TestPingServer: ok",!0,h):Wt(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),Wt(f,"TestPingServer: error",!1,h)})}function Wt(a,h,f,m,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),m(f)}catch{}}function Ly(){this.g=new Iy}function Xa(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Xa,Kl),Xa.prototype.g=function(){return new Ji(this.i,this.h)};function Ji(a,h){Ne.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ji,Ne),n=Ji.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Ns(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ds(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ns(this)),this.g&&(this.readyState=3,Ns(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_h(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function _h(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ds(this):Ns(this),this.readyState==3&&_h(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Ds(this))},n.Na=function(a){this.g&&(this.response=a,Ds(this))},n.ga=function(){this.g&&Ds(this)};function Ds(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Ns(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Ns(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ji.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yh(a){let h="";return ji(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function Za(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=yh(f),typeof a=="string"?f!=null&&Rs(f):le(a,h,f))}function ye(a){Ne.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ye,Ne);var Fy=/^https?$/i,Uy=["POST","PUT"];n=ye.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Zl.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){Ih(this,P);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var R in m)f.set(R,m[R]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())f.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Uy,h,void 0)>=0)||m||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,M]of f)this.g.setRequestHeader(P,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Ih(this,P)}};function Ih(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Th(a),Yi(a)}function Th(a){a.A||(a.A=!0,Ue(a,"complete"),Ue(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ue(this,"complete"),Ue(this,"abort"),Yi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yi(this,!0)),ye.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Eh(this):this.Xa())},n.Xa=function(){Eh(this)};function Eh(a){if(a.h&&typeof i<"u"){if(a.v&&Qt(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ue(a,"readystatechange"),Qt(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=P===0){let M=String(a.D).match(lh)[1]||null;!M&&o.self&&o.self.location&&(M=o.self.location.protocol.slice(0,-1)),m=!Fy.test(M?M.toLowerCase():"")}f=m}if(f)Ue(a,"complete"),Ue(a,"success");else{a.o=6;try{var R=Qt(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",Th(a)}}finally{Yi(a)}}}}function Yi(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||Ue(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Qt(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),yy(h)}};function wh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function By(a){const h={};a=(a.g&&Qt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var f=Ay(a[m]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=h[R]||[];h[R]=P,P.push(f)}dy(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function xs(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function vh(a){this.za=0,this.i=[],this.j=new As,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=xs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=xs("baseRetryDelayMs",5e3,a),this.Za=xs("retryDelaySeedMs",1e4,a),this.Ta=xs("forwardChannelMaxRetries",2,a),this.va=xs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new ih(a&&a.concurrentRequestLimit),this.Ba=new Ly,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=vh.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,m){Be(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.J=Dh(this,null,this.W),Zi(this)};function ec(a){if(Ah(a),a.I==3){var h=a.V++,f=ht(a.J);if(le(f,"SID",a.M),le(f,"RID",h),le(f,"TYPE","terminate"),Os(a,f),h=new Kt(a,a.j,h),h.M=2,h.A=Qi(ht(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Nh(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Wi(h)}Vh(a)}function Xi(a){a.g&&(nc(a),a.g.cancel(),a.g=null)}function Ah(a){Xi(a),a.v&&(o.clearTimeout(a.v),a.v=null),eo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Zi(a){if(!oh(a.h)&&!a.m){a.m=!0;var h=a.Ea;W||_(),J||(W(),J=!0),T.add(h,a),a.D=0}}function qy(a,h){return ah(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=vs(l(a.Ea,a,h),kh(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new Kt(this,this.j,a);let P=this.o;if(this.U&&(P?(P=Ml(P),Fl(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=bh(this,R,h),f=ht(this.J),le(f,"RID",a),le(f,"CVER",22),this.G&&le(f,"X-HTTP-Session-Id",this.G),Os(this,f),P&&(this.R?h="headers="+Rs(yh(P))+"&"+h:this.u&&Za(f,this.u,P)),Ja(this.h,R),this.Ra&&le(f,"TYPE","init"),this.S?(le(f,"$req",h),le(f,"SID","null"),R.U=!0,Ka(R,f,null)):Ka(R,f,h),this.I=2}}else this.I==3&&(a?Rh(this,a):this.i.length==0||oh(this.h)||Rh(this))};function Rh(a,h){var f;h?f=h.l:f=a.V++;const m=ht(a.J);le(m,"SID",a.M),le(m,"RID",f),le(m,"AID",a.K),Os(a,m),a.u&&a.o&&Za(m,a.u,a.o),f=new Kt(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=bh(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ja(a.h,f),Ka(f,m,h)}function Os(a,h){a.H&&ji(a.H,function(f,m){le(h,m,f)}),a.l&&ji({},function(f,m){le(h,m,f)})}function bh(a,h,f){f=Math.min(a.i.length,f);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var R=a.i;let Q=-1;for(;;){const ve=["count="+f];Q==-1?f>0?(Q=R[0].g,ve.push("ofs="+Q)):Q=0:ve.push("ofs="+Q);let ae=!0;for(let Se=0;Se<f;Se++){var P=R[Se].g;const dt=R[Se].map;if(P-=Q,P<0)Q=Math.max(0,R[Se].g-100),ae=!1;else try{P="req"+P+"_"||"";try{var M=dt instanceof Map?dt:Object.entries(dt);for(const[Ln,Jt]of M){let Yt=Jt;c(Jt)&&(Yt=qa(Jt)),ve.push(P+Ln+"="+encodeURIComponent(Yt))}}catch(Ln){throw ve.push(P+"type="+encodeURIComponent("_badmap")),Ln}}catch{m&&m(dt)}}if(ae){M=ve.join("&");break e}}M=void 0}return a=a.i.splice(0,f),h.G=a,M}function Sh(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;W||_(),J||(W(),J=!0),T.add(h,a),a.A=0}}function tc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=vs(l(a.Da,a),kh(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Ph(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=vs(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Be(10),Xi(this),Ph(this))};function nc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Ph(a){a.g=new Kt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=ht(a.na);le(h,"RID","rpc"),le(h,"SID",a.M),le(h,"AID",a.K),le(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&le(h,"TO",a.ia),le(h,"TYPE","xmlhttp"),Os(a,h),a.u&&a.o&&Za(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=Qi(ht(h)),f.u=null,f.R=!0,nh(f,a)}n.Va=function(){this.C!=null&&(this.C=null,Xi(this),tc(this),Be(19))};function eo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ch(a,h){var f=null;if(a.g==h){eo(a),nc(a),a.g=null;var m=2}else if(Qa(a.h,h))f=h.G,ch(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var R=a.D;m=Ki(),Ue(m,new Yl(m,f)),Zi(a)}else Sh(a);else if(R=h.m,R==3||R==0&&h.X>0||!(m==1&&qy(a,h)||m==2&&tc(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),R){case 1:Mn(a,5);break;case 4:Mn(a,10);break;case 3:Mn(a,6);break;default:Mn(a,2)}}}function kh(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function Mn(a,h){if(a.j.info("Error code "+h),h==2){var f=l(a.bb,a),m=a.Ua;const R=!m;m=new Ht(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Ss(m,"https"),Qi(m),R?Oy(m.toString(),f):My(m.toString(),f)}else Be(2);a.I=0,a.l&&a.l.pa(h),Vh(a),Ah(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Be(2)):(this.j.info("Failed to ping google.com"),Be(1))};function Vh(a){if(a.I=0,a.ja=[],a.l){const h=uh(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,E(a.i),a.i.length=0),a.l.oa()}}function Dh(a,h,f){var m=f instanceof Ht?ht(f):new Ht(f);if(m.g!="")h&&(m.g=h+"."+m.g),Ps(m,m.u);else{var R=o.location;m=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;const P=new Ht(null);m&&Ss(P,m),h&&(P.g=h),R&&Ps(P,R),f&&(P.h=f),m=P}return f=a.G,h=a.wa,f&&h&&le(m,f,h),le(m,"VER",a.ka),Os(a,m),m}function Nh(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new ye(new Xa({ab:f})):new ye(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xh(){}n=xh.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function to(){}to.prototype.g=function(a,h){return new Xe(a,h)};function Xe(a,h){Ne.call(this),this.g=new vh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new yr(this)}p(Xe,Ne),Xe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Xe.prototype.close=function(){ec(this.g)},Xe.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=qa(a),a=f);h.i.push(new Sy(h.Ya++,a)),h.I==3&&Zi(h)},Xe.prototype.N=function(){this.g.l=null,delete this.j,ec(this.g),delete this.g,Xe.Z.N.call(this)};function Oh(a){$a.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(Oh,$a);function Mh(){ja.call(this),this.status=1}p(Mh,ja);function yr(a){this.g=a}p(yr,xh),yr.prototype.ra=function(){Ue(this.g,"a")},yr.prototype.qa=function(a){Ue(this.g,new Oh(a))},yr.prototype.pa=function(a){Ue(this.g,new Mh)},yr.prototype.oa=function(){Ue(this.g,"b")},to.prototype.createWebChannel=to.prototype.g,Xe.prototype.send=Xe.prototype.o,Xe.prototype.open=Xe.prototype.m,Xe.prototype.close=Xe.prototype.close,Gp=function(){return new to},zp=function(){return Ki()},jp=Nn,kc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Hi.NO_ERROR=0,Hi.TIMEOUT=8,Hi.HTTP_ERROR=6,Io=Hi,Xl.COMPLETE="complete",$p=Xl,Hl.EventType=Es,Es.OPEN="a",Es.CLOSE="b",Es.ERROR="c",Es.MESSAGE="d",Ne.prototype.listen=Ne.prototype.J,Gs=Hl,ye.prototype.listenOnce=ye.prototype.K,ye.prototype.getLastError=ye.prototype.Ha,ye.prototype.getLastErrorCode=ye.prototype.ya,ye.prototype.getStatus=ye.prototype.ca,ye.prototype.getResponseJson=ye.prototype.La,ye.prototype.getResponseText=ye.prototype.la,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Fa,qp=ye}).apply(typeof so<"u"?so:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ce.UNAUTHENTICATED=new Ce(null),Ce.GOOGLE_CREDENTIALS=new Ce("google-credentials-uid"),Ce.FIRST_PARTY=new Ce("first-party-uid"),Ce.MOCK_USER=new Ce("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let os="12.13.0";function Dw(n){os=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new au("@firebase/firestore");function br(){return gn.logLevel}function Nw(n){gn.setLogLevel(n)}function N(n,...e){if(gn.logLevel<=Z.DEBUG){const t=e.map(Tu);gn.debug(`Firestore (${os}): ${n}`,...t)}}function Ie(n,...e){if(gn.logLevel<=Z.ERROR){const t=e.map(Tu);gn.error(`Firestore (${os}): ${n}`,...t)}}function Ye(n,...e){if(gn.logLevel<=Z.WARN){const t=e.map(Tu);gn.warn(`Firestore (${os}): ${n}`,...t)}}function Tu(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Kp(n,r,t)}function Kp(n,e,t){let r=`FIRESTORE (${os}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ie(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Kp(e,s,r)}function xw(n,e){n||U(57014,e)}function O(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends bt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Wp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ce.UNAUTHENTICATED)))}shutdown(){}}class Ow{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Mw{constructor(e){this.t=e,this.currentUser=Ce.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Ve;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ve,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ve)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new Hp(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Ce(e)}}class Lw{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ce.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Fw{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Lw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ce.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Vc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Uw{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Vc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Vc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Bw{getToken(){return Promise.resolve(new Vc(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qw(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=qw(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function j(n,e){return n<e?-1:n>e?1:0}function Dc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return hc(s)===hc(i)?j(s,i):hc(s)?1:-1}return j(n.length,e.length)}const $w=55296,jw=57343;function hc(n){const e=n.charCodeAt(0);return e>=$w&&e<=jw}function Lr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}function Qp(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="__name__";class ft{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ft.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ft?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=ft.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return j(e.length,t.length)}static compareSegments(e,t){const r=ft.isNumericId(e),s=ft.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ft.extractNumericId(e).compare(ft.extractNumericId(t)):Dc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return fn.fromString(e.substring(4,e.length-2))}}class Y extends ft{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Y(t)}static emptyPath(){return new Y([])}}const zw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class de extends ft{construct(e,t,r){return new de(e,t,r)}static isValidIdentifier(e){return zw.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),de.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Nc}static keyField(){return new de([Nc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new de(t)}static emptyPath(){return new de([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(Y.fromString(e))}static fromName(e){return new x(Y.fromString(e).popFirst(5))}static empty(){return new x(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Jp(n,e,t,r){if(e===!0&&r===!0)throw new D(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function fd(n){if(!x.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function pd(n){if(x.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Yp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ca(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function X(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ca(n);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Xp(n,e){if(e<=0)throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(n,e){const t={typeString:n};return e&&(t.value=e),t}function lr(n,e){if(!Yp(n))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=-62135596800,gd=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*gd);return new ne(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<md)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/gd}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(lr(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-md;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:we("string",ne._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new ne(0,0))}static max(){return new $(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=-1;class Ur{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function xc(n){return n.fields.find((e=>e.kind===2))}function Bn(n){return n.fields.filter((e=>e.kind!==2))}function Gw(n,e){let t=j(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=Kw(n.fields[r],e.fields[r]),t!==0)return t;return j(n.fields.length,e.fields.length)}Ur.UNKNOWN_ID=-1;class Wn{constructor(e,t){this.fieldPath=e,this.kind=t}}function Kw(n,e){const t=de.comparator(n.fieldPath,e.fieldPath);return t!==0?t:j(n.kind,e.kind)}class Br{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Br(0,tt.min())}}function Zp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ne(t+1,0):new ne(t,r));return new tt(s,x.empty(),e)}function em(n){return new tt(n.readTime,n.key,Fr)}class tt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new tt($.min(),x.empty(),Fr)}static max(){return new tt($.max(),x.empty(),Fr)}}function wu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==tm)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,r)=>{t(e)}))}static reject(e){return new A(((t,r)=>{r(e)}))}static waitFor(e){return new A(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const r of e)t=t.next((s=>s?A.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new A(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next((d=>{o[l]=d,++c,c===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new A(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze="SimpleDb";class ua{static open(e,t,r,s){try{return new ua(t,e.transaction(s,r))}catch(i){throw new Js(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ve,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Js(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=vu(r.target.error);this.S.reject(new Js(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(N(Ze,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Ww(t)}}class Et{static delete(e){return N(Ze,"Removing database:",e),$n(Hf().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!np())return!1;if(Et.F())return!0;const e=Ae(),t=Et.M(e),r=0<t&&t<10,s=rm(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,Et.M(Ae())===12.2&&Ie("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(N(Ze,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Js(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Js(e,o))},s.onupgradeneeded=i=>{N(Ze,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{N(Ze,"Database upgrade to version "+this.version+" complete")}))}}))),this.K&&(this.db.onversionchange=t=>this.K(t)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ua.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next((l=>(c.C(),l))).catch((l=>(c.abort(l),A.reject(l)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(N(Ze,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function rm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Hw{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return $n(this.U.delete())}}class Js extends D{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function bn(n){return n.name==="IndexedDbTransactionError"}class Ww{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(N(Ze,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(N(Ze,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),$n(r)}add(e){return N(Ze,"ADD",this.store.name,e,e),$n(this.store.add(e))}get(e){return $n(this.store.get(e)).next((t=>(t===void 0&&(t=null),N(Ze,"GET",this.store.name,e,t),t)))}delete(e){return N(Ze,"DELETE",this.store.name,e),$n(this.store.delete(e))}count(){return N(Ze,"COUNT",this.store.name),$n(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new A(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(r),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}}))}X(e,t){N(Ze,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new A(((r,s)=>{t.onerror=i=>{const o=vu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}H(e,t){const r=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new Hw(c),l=t(c.primaryKey,c.value,u);if(l instanceof A){const d=l.catch((p=>(u.done(),A.reject(p))));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function $n(n){return new A(((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=vu(r.target.error);t(s)}}))}let _d=!1;function vu(n){const e=Et.M(Ae());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return _d||(_d=!0,setTimeout((()=>{throw r}),0)),r}}return n}const Ys="IndexBackfiller";class Qw{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){N(Ys,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();N(Ys,`Documents written: ${t}`)}catch(t){bn(t)?N(Ys,"Ignoring IndexedDB error during index backfill: ",t):await Rn(t)}await this.re(6e4)}))}}class Jw{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return N(Ys,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,r.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(N(Ys,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((s,i)=>{const o=em(i);wu(o,r)>0&&(r=o)})),new tt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ke.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=-1;function Si(n){return n==null}function ui(n){return n===0&&1/n==-1/0}function sm(n){return typeof n=="number"&&Number.isInteger(n)&&!ui(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo="";function Le(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=yd(e)),e=Yw(n.get(t),e);return yd(e)}function Yw(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Uo:t+="";break;default:t+=i}}return t}function yd(n){return n+Uo+""}function gt(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===Uo&&n.charAt(1)==="",56145,{path:n}),Y.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(Uo,i);switch((o<0||o>t)&&U(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:U(61167,{path:n})}i=o+2}return new Y(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn="remoteDocuments",Pi="owner",Ir="owner",li="mutationQueues",Xw="userId",st="mutations",Id="batchId",Hn="userMutationsIndex",Td=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(n,e){return[n,Le(e)]}function im(n,e,t){return[n,Le(e),t]}const Zw={},qr="documentMutations",Bo="remoteDocumentsV14",ev=["prefixPath","collectionGroup","readTime","documentId"],Eo="documentKeyIndex",tv=["prefixPath","collectionGroup","documentId"],om="collectionGroupIndex",nv=["collectionGroup","readTime","prefixPath","documentId"],hi="remoteDocumentGlobal",Oc="remoteDocumentGlobalKey",$r="targets",am="queryTargetsIndex",rv=["canonicalId","targetId"],jr="targetDocuments",sv=["targetId","path"],Au="documentTargetsIndex",iv=["path","targetId"],qo="targetGlobalKey",Qn="targetGlobal",di="collectionParents",ov=["collectionId","parent"],zr="clientMetadata",av="clientId",la="bundles",cv="bundleId",ha="namedQueries",uv="name",Ru="indexConfiguration",lv="indexId",Mc="collectionGroupIndex",hv="collectionGroup",Xs="indexState",dv=["indexId","uid"],cm="sequenceNumberIndex",fv=["uid","sequenceNumber"],Zs="indexEntries",pv=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],um="documentKeyIndex",mv=["indexId","uid","orderedDocumentKey"],da="documentOverlays",gv=["userId","collectionPath","documentId"],Lc="collectionPathOverlayIndex",_v=["userId","collectionPath","largestBatchId"],lm="collectionGroupOverlayIndex",yv=["userId","collectionGroup","largestBatchId"],bu="globals",Iv="name",hm=[li,st,qr,qn,$r,Pi,Qn,jr,zr,hi,di,la,ha],Tv=[...hm,da],dm=[li,st,qr,Bo,$r,Pi,Qn,jr,zr,hi,di,la,ha,da],fm=dm,Su=[...fm,Ru,Xs,Zs],Ev=Su,pm=[...Su,bu],wv=pm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc extends nm{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function be(n,e){const t=O(n);return Et.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Sn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function mm(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function gm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||De.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,De.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,De.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new io(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new io(this.root,e,this.comparator,!1)}getReverseIterator(){return new io(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new io(this.root,e,this.comparator,!0)}}class io{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class De{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??De.RED,this.left=s??De.EMPTY,this.right=i??De.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new De(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return De.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return De.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,De.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,De.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}De.EMPTY=null,De.RED=!0,De.BLACK=!1;De.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new De(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wd(this.data.getIterator())}getIteratorFrom(e){return new wd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ie(this.comparator);return t.data=e,t}}class wd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Tr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.fields=e,e.sort(de.comparator)}static empty(){return new He([])}unionWith(e){let t=new ie(de.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new He(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Lr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vv(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new _m("Invalid base64 string: "+i):i}})(e);return new _e(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const Av=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ot(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=Av.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Mt(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym="server_timestamp",Im="__type__",Tm="__previous_value__",Em="__local_write_time__";function fa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Im])==null?void 0:r.stringValue)===ym}function pa(n){const e=n.mapValue.fields[Tm];return fa(e)?pa(e):e}function fi(n){const e=Ot(n.mapValue.fields[Em].timestampValue);return new ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rv{constructor(e,t,r,s,i,o,c,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=p}}const pi="(default)";class _n{constructor(e,t){this.projectId=e,this.database=t||pi}static empty(){return new _n("","")}get isDefaultDatabase(){return this.database===pi}isEqual(e){return e instanceof _n&&e.projectId===this.projectId&&e.database===this.database}}function bv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _n(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu="__type__",wm="__max__",un={mapValue:{fields:{__type__:{stringValue:wm}}}},Cu="__vector__",Gr="value",wo={nullValue:"NULL_VALUE"};function yn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fa(n)?4:vm(n)?9007199254740991:ma(n)?10:11:U(28295,{value:n})}function At(n,e){if(n===e)return!0;const t=yn(n);if(t!==yn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return fi(n).isEqual(fi(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ot(s.timestampValue),c=Ot(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Mt(s.bytesValue).isEqual(Mt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return fe(s.geoPointValue.latitude)===fe(i.geoPointValue.latitude)&&fe(s.geoPointValue.longitude)===fe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return fe(s.integerValue)===fe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=fe(s.doubleValue),c=fe(i.doubleValue);return o===c?ui(o)===ui(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Lr(n.arrayValue.values||[],e.arrayValue.values||[],At);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Ed(o)!==Ed(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!At(o[u],c[u])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function mi(n,e){return(n.values||[]).find((t=>At(t,e)))!==void 0}function In(n,e){if(n===e)return 0;const t=yn(n),r=yn(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=fe(i.integerValue||i.doubleValue),u=fe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return vd(n.timestampValue,e.timestampValue);case 4:return vd(fi(n),fi(e));case 5:return Dc(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Mt(i),u=Mt(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=j(c[l],u[l]);if(d!==0)return d}return j(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=j(fe(i.latitude),fe(o.latitude));return c!==0?c:j(fe(i.longitude),fe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Ad(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var g,E,C,V;const c=i.fields||{},u=o.fields||{},l=(g=c[Gr])==null?void 0:g.arrayValue,d=(E=u[Gr])==null?void 0:E.arrayValue,p=j(((C=l==null?void 0:l.values)==null?void 0:C.length)||0,((V=d==null?void 0:d.values)==null?void 0:V.length)||0);return p!==0?p:Ad(l,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===un.mapValue&&o===un.mapValue)return 0;if(i===un.mapValue)return 1;if(o===un.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=Dc(u[p],d[p]);if(g!==0)return g;const E=In(c[u[p]],l[d[p]]);if(E!==0)return E}return j(u.length,d.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function vd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);const t=Ot(n),r=Ot(e),s=j(t.seconds,r.seconds);return s!==0?s:j(t.nanos,r.nanos)}function Ad(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=In(t[s],r[s]);if(i)return i}return j(t.length,r.length)}function Kr(n){return Uc(n)}function Uc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Ot(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Mt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return x.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Uc(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Uc(t.fields[o])}`;return s+"}"})(n.mapValue):U(61005,{value:n})}function vo(n){switch(yn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=pa(n);return e?16+vo(e):16;case 5:return 2*n.stringValue.length;case 6:return Mt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+vo(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Sn(r.fields,((i,o)=>{s+=i.length+vo(o)})),s})(n.mapValue);default:throw U(13486,{value:n})}}function tr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Bc(n){return!!n&&"integerValue"in n}function gi(n){return!!n&&"arrayValue"in n}function Rd(n){return!!n&&"nullValue"in n}function bd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ao(n){return!!n&&"mapValue"in n}function ma(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Pu])==null?void 0:r.stringValue)===Cu}function ei(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Sn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=ei(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ei(n.arrayValue.values[t]);return e}return{...n}}function vm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===wm}const Am={mapValue:{fields:{[Pu]:{stringValue:Cu},[Gr]:{arrayValue:{}}}}};function Sv(n){return"nullValue"in n?wo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?tr(_n.empty(),x.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ma(n)?Am:{mapValue:{}}:U(35942,{value:n})}function Pv(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?tr(_n.empty(),x.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Am:"mapValue"in n?ma(n)?{mapValue:{}}:un:U(61959,{value:n})}function Sd(n,e){const t=In(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Pd(n,e){const t=In(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.value=e}static empty(){return new ke({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ao(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ei(t)}setAll(e){let t=de.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=ei(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Ao(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return At(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ao(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Sn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new ke(ei(this.value))}}function Rm(n){const e=[];return Sn(n.fields,((t,r)=>{const s=new de([t]);if(Ao(r)){const i=Rm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new He(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new he(e,0,$.min(),$.min(),$.min(),ke.empty(),0)}static newFoundDocument(e,t,r,s){return new he(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new he(e,2,t,$.min(),$.min(),ke.empty(),0)}static newUnknownDocument(e,t){return new he(e,3,t,$.min(),$.min(),ke.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ke.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ke.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof he&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new he(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e,t){this.position=e,this.inclusive=t}}function Cd(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=x.comparator(x.fromName(o.referenceValue),t.key):r=In(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function kd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!At(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t="asc"){this.field=e,this.dir=t}}function Cv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{}class ee extends bm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new kv(e,t,r):t==="array-contains"?new Nv(e,r):t==="in"?new Dm(e,r):t==="not-in"?new xv(e,r):t==="array-contains-any"?new Ov(e,r):new ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Vv(e,r):new Dv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(In(t,this.value)):t!==null&&yn(this.value)===yn(t)&&this.matchesComparison(In(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class re extends bm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new re(e,t)}matches(e){return Hr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Hr(n){return n.op==="and"}function qc(n){return n.op==="or"}function ku(n){return Sm(n)&&Hr(n)}function Sm(n){for(const e of n.filters)if(e instanceof re)return!1;return!0}function $c(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+Kr(n.value);if(ku(n))return n.filters.map((e=>$c(e))).join(",");{const e=n.filters.map((t=>$c(t))).join(",");return`${n.op}(${e})`}}function Pm(n,e){return n instanceof ee?(function(r,s){return s instanceof ee&&r.op===s.op&&r.field.isEqual(s.field)&&At(r.value,s.value)})(n,e):n instanceof re?(function(r,s){return s instanceof re&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Pm(o,s.filters[c])),!0):!1})(n,e):void U(19439)}function Cm(n,e){const t=n.filters.concat(e);return re.create(t,n.op)}function km(n){return n instanceof ee?(function(t){return`${t.field.canonicalString()} ${t.op} ${Kr(t.value)}`})(n):n instanceof re?(function(t){return t.op.toString()+" {"+t.getFilters().map(km).join(" ,")+"}"})(n):"Filter"}class kv extends ee{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Vv extends ee{constructor(e,t){super(e,"in",t),this.keys=Vm("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Dv extends ee{constructor(e,t){super(e,"not-in",t),this.keys=Vm("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Vm(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>x.fromName(r.referenceValue)))}class Nv extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gi(t)&&mi(t.arrayValue,this.value)}}class Dm extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&mi(this.value.arrayValue,t)}}class xv extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(mi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!mi(this.value.arrayValue,t)}}class Ov extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gi(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>mi(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mv{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function jc(n,e=null,t=[],r=[],s=null,i=null,o=null){return new Mv(n,e,t,r,s,i,o)}function nr(n){const e=O(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>$c(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Si(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Kr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Kr(r))).join(",")),e.Te=t}return e.Te}function Ci(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Cv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Pm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!kd(n.startAt,e.startAt)&&kd(n.endAt,e.endAt)}function $o(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function jo(n,e){return n.filters.filter((t=>t instanceof ee&&t.field.isEqual(e)))}function Vd(n,e,t){let r=wo,s=!0;for(const i of jo(n,e)){let o=wo,c=!0;switch(i.op){case"<":case"<=":o=Sv(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=wo}Sd({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Sd({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Dd(n,e,t){let r=un,s=!0;for(const i of jo(n,e)){let o=un,c=!0;switch(i.op){case">=":case">":o=Pv(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=un}Pd({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Pd({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Nm(n,e,t,r,s,i,o,c){return new qt(n,e,t,r,s,i,o,c)}function as(n){return new qt(n)}function Nd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Lv(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Vu(n){return n.collectionGroup!==null}function Nr(n){const e=O(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ie(de.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new _i(i,r))})),t.has(de.keyField().canonicalString())||e.Ie.push(new _i(de.keyField(),r))}return e.Ie}function Fe(n){const e=O(n);return e.Ee||(e.Ee=Om(e,Nr(n))),e.Ee}function xm(n){const e=O(n);return e.Re||(e.Re=Om(e,n.explicitOrderBy)),e.Re}function Om(n,e){if(n.limitType==="F")return jc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new _i(s.field,i)}));const t=n.endAt?new Tn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Tn(n.startAt.position,n.startAt.inclusive):null;return jc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function zc(n,e){const t=n.filters.concat([e]);return new qt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Fv(n,e){const t=n.explicitOrderBy.concat([e]);return new qt(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function zo(n,e,t){return new qt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Uv(n,e){return new qt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function Bv(n,e){return new qt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function ki(n,e){return Ci(Fe(n),Fe(e))&&n.limitType===e.limitType}function Mm(n){return`${nr(Fe(n))}|lt:${n.limitType}`}function Sr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>km(s))).join(", ")}]`),Si(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Kr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Kr(s))).join(",")),`Target(${r})`})(Fe(n))}; limitType=${n.limitType})`}function Vi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):x.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Nr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const l=Cd(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,Nr(r),s)||r.endAt&&!(function(o,c,u){const l=Cd(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,Nr(r),s))})(n,e)}function Lm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Fm(n){return(e,t)=>{let r=!1;for(const s of Nr(n)){const i=qv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function qv(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?In(u,l):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Sn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return gm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v=new ce(x.comparator);function We(){return $v}const Um=new ce(x.comparator);function Ks(...n){let e=Um;for(const t of n)e=e.insert(t.key,t);return e}function Bm(n){let e=Um;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function _t(){return ti()}function qm(){return ti()}function ti(){return new $t((n=>n.toString()),((n,e)=>n.isEqual(e)))}const jv=new ce(x.comparator),zv=new ie(x.comparator);function K(...n){let e=zv;for(const t of n)e=e.add(t);return e}const Gv=new ie(j);function Du(){return Gv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ui(e)?"-0":e}}function $m(n){return{integerValue:""+n}}function jm(n,e){return sm(e)?$m(e):Nu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(){this._=void 0}}function Kv(n,e,t){return n instanceof Wr?(function(s,i){const o={fields:{[Im]:{stringValue:ym},[Em]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&fa(i)&&(i=pa(i)),i&&(o.fields[Tm]=i),{mapValue:o}})(t,e):n instanceof rr?Gm(n,e):n instanceof sr?Km(n,e):(function(s,i){const o=zm(s,i),c=xd(o)+xd(s.Ae);return Bc(o)&&Bc(s.Ae)?$m(c):Nu(s.serializer,c)})(n,e)}function Hv(n,e,t){return n instanceof rr?Gm(n,e):n instanceof sr?Km(n,e):t}function zm(n,e){return n instanceof Qr?(function(r){return Bc(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Wr extends ga{}class rr extends ga{constructor(e){super(),this.elements=e}}function Gm(n,e){const t=Hm(e);for(const r of n.elements)t.some((s=>At(s,r)))||t.push(r);return{arrayValue:{values:t}}}class sr extends ga{constructor(e){super(),this.elements=e}}function Km(n,e){let t=Hm(e);for(const r of n.elements)t=t.filter((s=>!At(s,r)));return{arrayValue:{values:t}}}class Qr extends ga{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function xd(n){return fe(n.integerValue||n.doubleValue)}function Hm(n){return gi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t){this.field=e,this.transform=t}}function Wv(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof rr&&s instanceof rr||r instanceof sr&&s instanceof sr?Lr(r.elements,s.elements,At):r instanceof Qr&&s instanceof Qr?At(r.Ae,s.Ae):r instanceof Wr&&s instanceof Wr})(n.transform,e.transform)}class Qv{constructor(e,t){this.version=e,this.transformResults=t}}class pe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pe}static exists(e){return new pe(void 0,e)}static updateTime(e){return new pe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ro(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class _a{}function Wm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new us(n.key,pe.none()):new cs(n.key,n.data,pe.none());{const t=n.data,r=ke.empty();let s=new ie(de.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new jt(n.key,r,new He(s.toArray()),pe.none())}}function Jv(n,e,t){n instanceof cs?(function(s,i,o){const c=s.value.clone(),u=Md(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof jt?(function(s,i,o){if(!Ro(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Md(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Qm(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ni(n,e,t,r){return n instanceof cs?(function(i,o,c,u){if(!Ro(i.precondition,o))return c;const l=i.value.clone(),d=Ld(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof jt?(function(i,o,c,u){if(!Ro(i.precondition,o))return c;const l=Ld(i.fieldTransforms,u,o),d=o.data;return d.setAll(Qm(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return Ro(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function Yv(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=zm(r.transform,s||null);i!=null&&(t===null&&(t=ke.empty()),t.set(r.field,i))}return t||null}function Od(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Lr(r,s,((i,o)=>Wv(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class cs extends _a{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class jt extends _a{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Qm(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Md(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,Hv(o,c,t[s]))}return r}function Ld(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,Kv(i,o,e))}return r}class us extends _a{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xu extends _a{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Jv(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ni(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ni(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=qm();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Wm(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument($.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&Lr(this.mutations,e.mutations,((t,r)=>Od(t,r)))&&Lr(this.baseMutations,e.baseMutations,((t,r)=>Od(t,r)))}}class Mu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return jv})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Mu(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee,te;function Ym(n){switch(n){case b.OK:return U(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function Xm(n){if(n===void 0)return Ie("GRPC error has no .code"),b.UNKNOWN;switch(n){case Ee.OK:return b.OK;case Ee.CANCELLED:return b.CANCELLED;case Ee.UNKNOWN:return b.UNKNOWN;case Ee.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Ee.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Ee.INTERNAL:return b.INTERNAL;case Ee.UNAVAILABLE:return b.UNAVAILABLE;case Ee.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Ee.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Ee.NOT_FOUND:return b.NOT_FOUND;case Ee.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Ee.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Ee.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Ee.ABORTED:return b.ABORTED;case Ee.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Ee.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Ee.DATA_LOSS:return b.DATA_LOSS;default:return U(39323,{code:n})}}(te=Ee||(Ee={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ri=null;function Zv(n){if(ri)throw new Error("a TestingHooksSpi instance is already set");ri=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eA=new fn([4294967295,4294967295],0);function Fd(n){const e=Zm().encode(n),t=new Bp;return t.update(e),new Uint8Array(t.digest())}function Ud(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new fn([t,r],0),new fn([s,i],0)]}class Fu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Hs(`Invalid padding: ${t}`);if(r<0)throw new Hs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Hs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Hs(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=fn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(fn.fromNumber(r)));return s.compare(eA)===1&&(s=new fn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Fd(e),[r,s]=Ud(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Fu(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Fd(e),[r,s]=Ud(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Hs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ni.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ls($.min(),s,new ce(j),We(),K())}}class Ni{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ni(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class eg{constructor(e,t){this.targetId=e,this.Ce=t}}class tg{constructor(e,t,r=_e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Bd{constructor(){this.ve=0,this.Fe=qd(),this.Me=_e.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=K(),t=K(),r=K();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:U(38017,{changeType:i})}})),new Ni(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=qd()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class tA{constructor(e){this.Ge=e,this.ze=new Map,this.je=We(),this.Je=oo(),this.He=oo(),this.Ze=new ce(j)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if($o(i))if(r===0){const o=new x(i.path);this.et(t,o,he.newNoDocument(o,$.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}ri==null||ri.o((function(d,p,g,E,C){var L,B,F;const V={localCacheCount:d,existenceFilterCount:p.count,databaseId:g.database,projectId:g.projectId},k=p.unchangedNames;return k&&(V.bloomFilter={applied:C===0,hashCount:(k==null?void 0:k.hashCount)??0,bitmapLength:((B=(L=k==null?void 0:k.bits)==null?void 0:L.bitmap)==null?void 0:B.length)??0,padding:((F=k==null?void 0:k.bits)==null?void 0:F.padding)??0,mightContain:G=>(E==null?void 0:E.mightContain(G))??!1}),V})(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Mt(r).toUint8Array()}catch(u){if(u instanceof _m)return Ye("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Fu(o,s,i)}catch(u){return Ye(u instanceof Hs?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&$o(c.target)){const u=new x(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,he.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.Ke())}}));let r=K();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new ls(e,t,this.Ze,this.je,r);return this.je=We(),this.Je=oo(),this.He=oo(),this.Ze=new ce(j),s}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.qe(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Bd,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ie(j),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ie(j),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Bd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function oo(){return new ce(x.comparator)}function qd(){return new ce(x.comparator)}const nA={asc:"ASCENDING",desc:"DESCENDING"},rA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sA={and:"AND",or:"OR"};class iA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Gc(n,e){return n.useProto3Json||Si(e)?e:{value:e}}function Jr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ng(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function oA(n,e){return Jr(n,e.toTimestamp())}function Te(n){return q(!!n,49232),$.fromTimestamp((function(t){const r=Ot(t);return new ne(r.seconds,r.nanos)})(n))}function Uu(n,e){return Kc(n,e).canonicalString()}function Kc(n,e){const t=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function rg(n){const e=Y.fromString(n);return q(dg(e),10190,{key:e.toString()}),e}function yi(n,e){return Uu(n.databaseId,e.path)}function wt(n,e){const t=rg(e);if(t.get(1)!==n.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(og(t))}function sg(n,e){return Uu(n.databaseId,e)}function ig(n){const e=rg(n);return e.length===4?Y.emptyPath():og(e)}function Hc(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function og(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function $d(n,e,t){return{name:yi(n,e),fields:t.value.mapValue.fields}}function ya(n,e,t){const r=wt(n,e.name),s=Te(e.updateTime),i=e.createTime?Te(e.createTime):$.min(),o=new ke({mapValue:{fields:e.fields}}),c=he.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function aA(n,e){return"found"in e?(function(r,s){q(!!s.found,43571),s.found.name,s.found.updateTime;const i=wt(r,s.found.name),o=Te(s.found.updateTime),c=s.found.createTime?Te(s.found.createTime):$.min(),u=new ke({mapValue:{fields:s.found.fields}});return he.newFoundDocument(i,o,c,u)})(n,e):"missing"in e?(function(r,s){q(!!s.missing,3894),q(!!s.readTime,22933);const i=wt(r,s.missing),o=Te(s.readTime);return he.newNoDocument(i,o)})(n,e):U(7234,{result:e})}function cA(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:U(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,d){return l.useProto3Json?(q(d===void 0||typeof d=="string",58123),_e.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),_e.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const d=l.code===void 0?b.UNKNOWN:Xm(l.code);return new D(d,l.message||"")})(o);t=new tg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=wt(n,r.document.name),i=Te(r.document.updateTime),o=r.document.createTime?Te(r.document.createTime):$.min(),c=new ke({mapValue:{fields:r.document.fields}}),u=he.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new bo(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=wt(n,r.document),i=r.readTime?Te(r.readTime):$.min(),o=he.newNoDocument(s,i),c=r.removedTargetIds||[];t=new bo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=wt(n,r.document),i=r.removedTargetIds||[];t=new bo([],i,s,null)}else{if(!("filter"in e))return U(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Xv(s,i),c=r.targetId;t=new eg(c,o)}}return t}function Ii(n,e){let t;if(e instanceof cs)t={update:$d(n,e.key,e.value)};else if(e instanceof us)t={delete:yi(n,e.key)};else if(e instanceof jt)t={update:$d(n,e.key,e.data),updateMask:pA(e.fieldMask)};else{if(!(e instanceof xu))return U(16599,{dt:e.type});t={verify:yi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Wr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof rr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof sr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Qr)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:oA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:U(27497)})(n,e.precondition)),t}function Wc(n,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?pe.updateTime(Te(i.updateTime)):i.exists!==void 0?pe.exists(i.exists):pe.none()})(e.currentDocument):pe.none(),r=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new Wr;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new rr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new sr(d)}else"increment"in c?u=new Qr(o,c.increment):U(16584,{proto:c});const l=de.fromServerFormat(c.fieldPath);return new Di(l,u)})(n,s))):[];if(e.update){e.update.name;const s=wt(n,e.update.name),i=new ke({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const l=u.fieldPaths||[];return new He(l.map((d=>de.fromServerFormat(d))))})(e.updateMask);return new jt(s,i,o,t,r)}return new cs(s,i,t,r)}if(e.delete){const s=wt(n,e.delete);return new us(s,t)}if(e.verify){const s=wt(n,e.verify);return new xu(s,t)}return U(1463,{proto:e})}function uA(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?Te(s.updateTime):Te(i);return o.isEqual($.min())&&(o=Te(i)),new Qv(o,s.transformResults||[])})(t,e)))):[]}function ag(n,e){return{documents:[sg(n,e.path)]}}function Ia(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=sg(n,s);const i=(function(l){if(l.length!==0)return hg(re.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((d=>(function(g){return{field:an(g.field),direction:hA(g.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Gc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{ft:t,parent:s}}function cg(n,e,t,r){const{ft:s,parent:i}=Ia(n,e),o={},c=[];let u=0;return t.forEach((l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:an(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:an(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function ug(n){let e=ig(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const g=lg(p);return g instanceof re&&ku(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(C){return new _i(Pr(C.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,Si(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,E=p.values||[];return new Tn(E,g)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const g=!p.before,E=p.values||[];return new Tn(E,g)})(t.endAt)),Nm(e,s,o,i,c,"F",u,l)}function lA(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function lg(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Pr(t.unaryFilter.field);return ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Pr(t.unaryFilter.field);return ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Pr(t.unaryFilter.field);return ee.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Pr(t.unaryFilter.field);return ee.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ee.create(Pr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return re.create(t.compositeFilter.filters.map((r=>lg(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function hA(n){return nA[n]}function dA(n){return rA[n]}function fA(n){return sA[n]}function an(n){return{fieldPath:n.canonicalString()}}function Pr(n){return de.fromServerFormat(n.fieldPath)}function hg(n){return n instanceof ee?(function(t){if(t.op==="=="){if(bd(t.value))return{unaryFilter:{field:an(t.field),op:"IS_NAN"}};if(Rd(t.value))return{unaryFilter:{field:an(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(bd(t.value))return{unaryFilter:{field:an(t.field),op:"IS_NOT_NAN"}};if(Rd(t.value))return{unaryFilter:{field:an(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:an(t.field),op:dA(t.op),value:t.value}}})(n):n instanceof re?(function(t){const r=t.getFilters().map((s=>hg(s)));return r.length===1?r[0]:{compositeFilter:{op:fA(t.op),filters:r}}})(n):U(54877,{filter:n})}function pA(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function dg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function fg(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t,r,s,i=$.min(),o=$.min(),c=_e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new yt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(e){this.yt=e}}function mA(n,e){let t;if(e.document)t=ya(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=x.fromSegments(e.noDocument.path),s=or(e.noDocument.readTime);t=he.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return U(56709);{const r=x.fromSegments(e.unknownDocument.path),s=or(e.unknownDocument.version);t=he.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime((function(s){const i=new ne(s[0],s[1]);return $.fromTimestamp(i)})(e.readTime)),t}function jd(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Go(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(i,o){return{name:yi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Jr(i,o.version.toTimestamp()),createTime:Jr(i,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:ir(e.version)};else{if(!e.isUnknownDocument())return U(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:ir(e.version)}}return r}function Go(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function ir(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function or(n){const e=new ne(n.seconds,n.nanoseconds);return $.fromTimestamp(e)}function jn(n,e){const t=(e.baseMutations||[]).map((i=>Wc(n.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((i=>Wc(n.yt,i))),s=ne.fromMillis(e.localWriteTimeMs);return new Ou(e.batchId,s,t,r)}function Ws(n){const e=or(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?or(n.lastLimboFreeSnapshotVersion):$.min();let r;return r=(function(i){return i.documents!==void 0})(n.query)?(function(i){const o=i.documents.length;return q(o===1,1966,{count:o}),Fe(as(ig(i.documents[0])))})(n.query):(function(i){return Fe(ug(i))})(n.query),new yt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,_e.fromBase64String(n.resumeToken))}function mg(n,e){const t=ir(e.snapshotVersion),r=ir(e.lastLimboFreeSnapshotVersion);let s;s=$o(e.target)?ag(n.yt,e.target):Ia(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:nr(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Ta(n){const e=ug({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?zo(e,e.limit,"L"):e}function dc(n,e){return new Lu(e.largestBatchId,Wc(n.yt,e.overlayMutation))}function zd(n,e){const t=e.path.lastSegment();return[n,Le(e.path.popLast()),t]}function Gd(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:ir(r.readTime),documentKey:Le(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{getBundleMetadata(e,t){return Kd(e).get(t).next((r=>{if(r)return(function(i){return{id:i.bundleId,createTime:or(i.createTime),version:i.version}})(r)}))}saveBundleMetadata(e,t){return Kd(e).put((function(s){return{bundleId:s.id,createTime:ir(Te(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Hd(e).get(t).next((r=>{if(r)return(function(i){return{name:i.name,query:Ta(i.bundledQuery),readTime:or(i.readTime)}})(r)}))}saveNamedQuery(e,t){return Hd(e).put((function(s){return{name:s.name,readTime:ir(Te(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Kd(n){return be(n,la)}function Hd(n){return be(n,ha)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new Ea(e,r)}getOverlay(e,t){return Ms(e).get(zd(this.userId,t)).next((r=>r?dc(this.serializer,r):null))}getOverlays(e,t){const r=_t();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){const s=[];return r.forEach(((i,o)=>{const c=new Lu(t,o);s.push(this.St(e,c))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach((o=>s.add(Le(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Ms(e).X(Lc,c))})),A.waitFor(i)}getOverlaysForCollection(e,t,r){const s=_t(),i=Le(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Ms(e).J(Lc,o).next((c=>{for(const u of c){const l=dc(this.serializer,u);s.set(l.getKey(),l)}return s}))}getOverlaysForCollectionGroup(e,t,r,s){const i=_t();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ms(e).ee({index:lm,range:c},((u,l,d)=>{const p=dc(this.serializer,l);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):d.done()})).next((()=>i))}St(e,t){return Ms(e).put((function(s,i,o){const[c,u,l]=zd(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ii(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Ms(n){return be(n,da)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{bt(e){return be(e,bu)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?_e.fromUint8Array(r):_e.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(fe(e.integerValue));else if("doubleValue"in e){const r=fe(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),ui(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=Ot(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Mt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?vm(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ma(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):U(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){var o,c;const r=e.fields||{};this.Ft(t,53);const s=Gr,i=((c=(o=r[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(fe(i)),this.Ot(s,t),this.Ct(r[s],t)}qt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),x.fromName(e).path.forEach((r=>{this.Ft(t,60),this.$t(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}zn.Wt=new zn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er=255;function yA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Wd(n){const e=64-(function(r){let s=0;for(let i=0;i<8;++i){const o=yA(255&r[i]);if(s+=o,o!==8)break}return s})(n);return Math.ceil(e/8)}class IA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=Wd(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=Wd(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Er),this.sn(255)}_n(){this.an(Er),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Er?(this.sn(Er),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Er?(this.an(Er),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class TA{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class EA{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Ls{constructor(){this.cn=new IA,this.ascending=new TA(this.cn),this.descending=new EA(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.In=s}En(){const e=this.In.length,t=e===0||this.In[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.In,0),t!==e?r.set([0],this.In.length):++r[r.length-1],new Gn(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:So(this.Tn),directionalValue:So(this.In),orderedDocumentKey:So(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Zt(n,e){let t=n.hn-e.hn;return t!==0?t:(t=Qd(n.Tn,e.Tn),t!==0?t:(t=Qd(n.In,e.In),t!==0?t:x.comparator(n.Pn,e.Pn)))}function Qd(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function So(n){return tp()?(function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r})(n):n}function Jd(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(n)}class Yd{constructor(e){this.Vn=new ie(((t,r)=>de.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=xc(e);if(t!==void 0&&!this.pn(t))return!1;const r=Bn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ie(de.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Wn(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Wn(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Wn(r.field,r.dir==="asc"?0:1)));return new Ur(Ur.UNKNOWN_ID,this.collectionId,t,Br.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n){var t,r;if(q(n instanceof ee||n instanceof re,20012),n instanceof ee){if(n instanceof Dm){const s=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map((i=>ee.create(n.field,"==",i))))||[];return re.create(s,"or")}return n}const e=n.filters.map((s=>gg(s)));return re.create(e,n.op)}function wA(n){if(n.getFilters().length===0)return[];const e=Yc(gg(n));return q(_g(e),7391),Qc(e)||Jc(e)?[e]:e.getFilters()}function Qc(n){return n instanceof ee}function Jc(n){return n instanceof re&&ku(n)}function _g(n){return Qc(n)||Jc(n)||(function(t){if(t instanceof re&&qc(t)){for(const r of t.getFilters())if(!Qc(r)&&!Jc(r))return!1;return!0}return!1})(n)}function Yc(n){if(q(n instanceof ee||n instanceof re,34018),n instanceof ee)return n;if(n.filters.length===1)return Yc(n.filters[0]);const e=n.filters.map((r=>Yc(r)));let t=re.create(e,n.op);return t=Ko(t),_g(t)?t:(q(t instanceof re,64498),q(Hr(t),40251),q(t.filters.length>1,57927),t.filters.reduce(((r,s)=>Bu(r,s))))}function Bu(n,e){let t;return q(n instanceof ee||n instanceof re,38388),q(e instanceof ee||e instanceof re,25473),t=n instanceof ee?e instanceof ee?(function(s,i){return re.create([s,i],"and")})(n,e):Xd(n,e):e instanceof ee?Xd(e,n):(function(s,i){if(q(s.filters.length>0&&i.filters.length>0,48005),Hr(s)&&Hr(i))return Cm(s,i.getFilters());const o=qc(s)?s:i,c=qc(s)?i:s,u=o.filters.map((l=>Bu(l,c)));return re.create(u,"or")})(n,e),Ko(t)}function Xd(n,e){if(Hr(e))return Cm(e,n.getFilters());{const t=e.filters.map((r=>Bu(n,r)));return re.create(t,"or")}}function Ko(n){if(q(n instanceof ee||n instanceof re,11850),n instanceof ee)return n;const e=n.getFilters();if(e.length===1)return Ko(e[0]);if(Sm(n))return n;const t=e.map((s=>Ko(s))),r=[];return t.forEach((s=>{s instanceof ee?r.push(s):s instanceof re&&(s.op===n.op?r.push(...s.filters):r.push(s))})),r.length===1?r[0]:re.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(){this.bn=new qu}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(tt.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(tt.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class qu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ie(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ie(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd="IndexedDbIndexManager",ao=new Uint8Array(0);class AA{constructor(e,t){this.databaseId=t,this.Dn=new qu,this.Cn=new $t((r=>nr(r)),((r,s)=>Ci(r,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:r,parent:Le(s)};return ef(e).put(i)}return A.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[Qp(t),""],!1,!0);return ef(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;r.push(gt(o.parent))}return r}))}addFieldIndex(e,t){const r=Fs(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=vr(e);return i.next((c=>{o.put(Gd(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const r=Fs(e),s=vr(e),i=wr(e);return r.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Fs(e),r=wr(e),s=vr(e);return t.X().next((()=>r.X())).next((()=>s.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(r=>this.getIndexType(e,r).next((s=>{if(s===0||s===1){const i=new Yd(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const r=wr(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=K();const c=[];return A.forEach(i,((u,l)=>{N(Zd,`Using index ${(function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map((G=>`${G.fieldPath}:${G.kind}`)).join(",")}`})(u)} to execute ${nr(t)}`);const d=(function(F,G){const W=xc(G);if(W===void 0)return null;for(const J of jo(F,W.fieldPath))switch(J.op){case"array-contains-any":return J.value.arrayValue.values||[];case"array-contains":return[J.value]}return null})(l,u),p=(function(F,G){const W=new Map;for(const J of Bn(G))for(const T of jo(F,J.fieldPath))switch(T.op){case"==":case"in":W.set(J.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return W.set(J.fieldPath.canonicalString(),T.value),Array.from(W.values())}return null})(l,u),g=(function(F,G){const W=[];let J=!0;for(const T of Bn(G)){const _=T.kind===0?Vd(F,T.fieldPath,F.startAt):Dd(F,T.fieldPath,F.startAt);W.push(_.value),J&&(J=_.inclusive)}return new Tn(W,J)})(l,u),E=(function(F,G){const W=[];let J=!0;for(const T of Bn(G)){const _=T.kind===0?Dd(F,T.fieldPath,F.endAt):Vd(F,T.fieldPath,F.endAt);W.push(_.value),J&&(J=_.inclusive)}return new Tn(W,J)})(l,u),C=this.Mn(u,l,g),V=this.Mn(u,l,E),k=this.xn(u,l,p),L=this.On(u.indexId,d,C,g.inclusive,V,E.inclusive,k);return A.forEach(L,(B=>r.Z(B,t.limit).next((F=>{F.forEach((G=>{const W=x.fromSegments(G.documentKey);o.has(W)||(o=o.add(W),c.push(W))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=wA(re.create(e.filters,"and")).map((r=>jc(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let p=0;p<u;++p){const g=t?this.Nn(t[p/l]):ao,E=this.Bn(e,g,r[p%l],s),C=this.Ln(e,g,i[p%l],o),V=c.map((k=>this.Bn(e,g,k,!0)));d.push(...this.createRange(E,C,V))}return d}Bn(e,t,r,s){const i=new Gn(e,x.empty(),t,r);return s?i:i.En()}Ln(e,t,r,s){const i=new Gn(e,x.empty(),t,r);return s?i.En():i}Fn(e,t){const r=new Yd(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const s=this.vn(t);return A.forEach(s,(i=>this.Fn(e,i).next((o=>{o?r!==0&&o.fields.length<(function(u){let l=new ie(de.comparator),d=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?d=!0:l=l.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(d?1:0)})(i)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&r===2?1:r))}kn(e,t){const r=new Ls;for(const s of Bn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);zn.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new Ls;return zn.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const r=new Ls;return zn.Wt.Dt(tr(this.databaseId,t),r.ln((function(i){const o=Bn(i);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new Ls);let i=0;for(const o of Bn(e)){const c=r[i++];for(const u of s)if(this.qn(t,o.fieldPath)&&gi(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);zn.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new Ls;u.seed(c.un()),zn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}qn(e,t){return!!e.filters.find((r=>r instanceof ee&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Fs(e),s=vr(e);return(t?r.J(Mc,IDBKeyRange.bound(t,t)):r.J()).next((i=>{const o=[];return A.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(d,p){const g=p?new Br(p.sequenceNumber,new tt(or(p.readTime),new x(gt(p.documentKey)),p.largestBatchId)):Br.empty(),E=d.fields.map((([C,V])=>new Wn(de.fromServerFormat(C),V)));return new Ur(d.indexId,d.collectionGroup,E,g)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:j(r.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const s=Fs(e),i=vr(e);return this.Wn(e).next((o=>s.J(Mc,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>i.put(Gd(u.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return A.forEach(t,((s,i)=>{const o=r.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(r.set(s.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,s,u).next((l=>{const d=this.Gn(i,u);return l.isEqual(d)?A.resolve():this.zn(e,i,u,l,d)})))))))}))}jn(e,t,r,s){return wr(e).put(s.Rn(this.uid,this.Kn(r,t.key),t.key))}Jn(e,t,r,s){return wr(e).delete(s.An(this.uid,this.Kn(r,t.key),t.key))}Qn(e,t,r){const s=wr(e);let i=new ie(Zt);return s.ee({index:um,range:IDBKeyRange.only([r.indexId,this.uid,So(this.Kn(r,t))])},((o,c)=>{i=i.add(new Gn(r.indexId,t,Jd(c.arrayValue),Jd(c.directionalValue)))})).next((()=>i))}Gn(e,t){let r=new ie(Zt);const s=this.kn(t,e);if(s==null)return r;const i=xc(t);if(i!=null){const o=e.data.field(i.fieldPath);if(gi(o))for(const c of o.arrayValue.values||[])r=r.add(new Gn(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new Gn(t.indexId,e.key,ao,s));return r}zn(e,t,r,s,i){N(Zd,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,l,d,p,g){const E=u.getIterator(),C=l.getIterator();let V=Tr(E),k=Tr(C);for(;V||k;){let L=!1,B=!1;if(V&&k){const F=d(V,k);F<0?B=!0:F>0&&(L=!0)}else V!=null?B=!0:L=!0;L?(p(k),k=Tr(C)):B?(g(V),V=Tr(E)):(V=Tr(E),k=Tr(C))}})(s,i,Zt,(c=>{o.push(this.jn(e,t,r,c))}),(c=>{o.push(this.Jn(e,t,r,c))})),A.waitFor(o)}Wn(e){let t=1;return vr(e).ee({index:cm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>Zt(o,c))).filter(((o,c,u)=>!c||Zt(o,u[c-1])!==0));const s=[];s.push(e);for(const o of r){const c=Zt(o,e),u=Zt(o,t);if(c===0)s[0]=e.En();else if(c>0&&u<0)s.push(o),s.push(o.En());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,ao,x.empty()),u=s[o+1].An(this.uid,ao,x.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Zt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(tf)}getMinOffset(e,t){return A.mapArray(this.vn(t),(r=>this.Fn(e,r).next((s=>s||U(44426))))).next(tf)}}function ef(n){return be(n,di)}function wr(n){return be(n,Zs)}function Fs(n){return be(n,Ru)}function vr(n){return be(n,Xs)}function tf(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;wu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new tt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yg=41943040;class Oe{static withCacheSize(e){return new Oe(e,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig(n,e,t){const r=n.store(st),s=n.store(qr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},((d,p,g)=>(c++,g.delete())));i.push(u.next((()=>{q(c===1,47070,{batchId:t.batchId})})));const l=[];for(const d of t.mutations){const p=im(e,d.key.path,t.batchId);i.push(s.delete(p)),l.push(d.key)}return A.waitFor(i).next((()=>l))}function Ho(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw U(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.DEFAULT_COLLECTION_PERCENTILE=10,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Oe.DEFAULT=new Oe(yg,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Oe.DISABLED=new Oe(-1,0,0);class wa{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){q(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new wa(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return en(e).ee({index:Hn,range:r},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,s){const i=Cr(e),o=en(e);return o.add({}).next((c=>{q(typeof c=="number",49019);const u=new Ou(c,t,r,s),l=(function(E,C,V){const k=V.baseMutations.map((B=>Ii(E.yt,B))),L=V.mutations.map((B=>Ii(E.yt,B)));return{userId:C,batchId:V.batchId,localWriteTimeMs:V.localWriteTime.toMillis(),baseMutations:k,mutations:L}})(this.serializer,this.userId,u),d=[];let p=new ie(((g,E)=>j(g.canonicalString(),E.canonicalString())));for(const g of s){const E=im(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),d.push(o.put(l)),d.push(i.put(E,Zw))}return p.forEach((g=>{d.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(d).next((()=>u))}))}lookupMutationBatch(e,t){return en(e).get(t).next((r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),jn(this.serializer,r)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return en(e).ee({index:Hn,range:s},((o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),i=jn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=pn;return en(e).ee({index:Hn,range:t,reverse:!0},((s,i,o)=>{r=i.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,pn],[this.userId,Number.POSITIVE_INFINITY]);return en(e).J(Hn,t).next((r=>r.map((s=>jn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=To(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Cr(e).ee({range:s},((o,c,u)=>{const[l,d,p]=o,g=gt(d);if(l===this.userId&&t.path.isEqual(g))return en(e).get(p).next((E=>{if(!E)throw U(61480,{er:o,batchId:p});q(E.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:E.userId,batchId:p}),i.push(jn(this.serializer,E))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie(j);const s=[];return t.forEach((i=>{const o=To(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Cr(e).ee({range:c},((l,d,p)=>{const[g,E,C]=l,V=gt(E);g===this.userId&&i.path.isEqual(V)?r=r.add(C):p.done()}));s.push(u)})),A.waitFor(s).next((()=>this.tr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=To(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ie(j);return Cr(e).ee({range:o},((u,l,d)=>{const[p,g,E]=u,C=gt(g);p===this.userId&&r.isPrefixOf(C)?C.length===s&&(c=c.add(E)):d.done()})).next((()=>this.tr(e,c)))}tr(e,t){const r=[],s=[];return t.forEach((i=>{s.push(en(e).get(i).next((o=>{if(o===null)throw U(35274,{batchId:i});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(jn(this.serializer,o))})))})),A.waitFor(s).next((()=>r))}removeMutationBatch(e,t){return Ig(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(r,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Cr(e).ee({range:r},((i,o,c)=>{if(i[0]===this.userId){const u=gt(i[1]);s.push(u)}else c.done()})).next((()=>{q(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Tg(e,this.userId,t)}ir(e){return Eg(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:pn,lastStreamToken:""}))}}function Tg(n,e,t){const r=To(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Cr(n).ee({range:i,Y:!0},((c,u,l)=>{const[d,p,g]=c;d===e&&p===s&&(o=!0),l.done()})).next((()=>o))}function en(n){return be(n,st)}function Cr(n){return be(n,qr)}function Eg(n){return be(n,li)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Lt(0)}static ar(){return new Lt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const r=new Lt(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>$.fromTimestamp(new ne(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Ar(e).delete(t.targetId))).next((()=>this.ur(e))).next((r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r))))}removeTargets(e,t,r){let s=0;const i=[];return Ar(e).ee(((o,c)=>{const u=Ws(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Ar(e).ee(((r,s)=>{const i=Ws(s);t(i)}))}ur(e){return rf(e).get(qo).next((t=>(q(t!==null,2888),t)))}cr(e,t){return rf(e).put(qo,t)}lr(e,t){return Ar(e).put(mg(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const r=nr(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Ar(e).ee({range:s,index:am},((o,c,u)=>{const l=Ws(c);Ci(t,l.target)&&(i=l,u.done())})).next((()=>i))}addMatchingKeys(e,t,r){const s=[],i=cn(e);return t.forEach((o=>{const c=Le(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))})),A.waitFor(s)}removeMatchingKeys(e,t,r){const s=cn(e);return A.forEach(t,(i=>{const o=Le(i.path);return A.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])}))}removeMatchingKeysForTargetId(e,t){const r=cn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=cn(e);let i=K();return s.ee({range:r,Y:!0},((o,c,u)=>{const l=gt(o[1]),d=new x(l);i=i.add(d)})).next((()=>i))}containsKey(e,t){const r=Le(t.path),s=IDBKeyRange.bound([r],[Qp(r)],!1,!0);let i=0;return cn(e).ee({index:Au,Y:!0,range:s},(([o,c],u,l)=>{o!==0&&(i++,l.done())})).next((()=>i>0))}At(e,t){return Ar(e).get(t).next((r=>r?Ws(r):null))}}function Ar(n){return be(n,$r)}function rf(n){return be(n,Qn)}function cn(n){return be(n,jr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf="LruGarbageCollector",wg=1048576;function of([n,e],[t,r]){const s=j(n,t);return s===0?j(e,r):s}class bA{constructor(e){this.Pr=e,this.buffer=new ie(of),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();of(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class vg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){N(sf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){bn(t)?N(sf,"Ignoring IndexedDB error during garbage collection: ",t):await Rn(t)}await this.Ar(3e5)}))}}class SA{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ke.ce);const r=new bA(t);return this.Vr.forEachTarget(e,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(nf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),nf):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),br()<=Z.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Ag(n,e){return new SA(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e,t){this.db=e,this.garbageCollector=Ag(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((r,s)=>t(s)))}addReference(e,t,r){return co(e,r)}removeReference(e,t,r){return co(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return co(e,t)}wr(e,t){return(function(s,i){let o=!1;return Eg(s).te((c=>Tg(s,c,i).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((l=>{if(!l)return i++,r.getEntry(e,o).next((()=>(r.removeEntry(o,$.min()),cn(e).delete((function(p){return[0,Le(p.path)]})(o)))))}));s.push(u)}})).next((()=>A.waitFor(s))).next((()=>r.apply(e))).next((()=>i))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return co(e,t)}yr(e,t){const r=cn(e);let s,i=Ke.ce;return r.ee({index:Au},(([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==Ke.ce&&t(new x(gt(s)),i),i=l,s=u):i=Ke.ce})).next((()=>{i!==Ke.ce&&t(new x(gt(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function co(n,e){return cn(n).put((function(r,s){return{targetId:0,path:Le(r.path),sequenceNumber:s}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(){this.changes=new $t((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,he.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Fn(e).put(r)}removeEntry(e,t,r){return Fn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Go(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.Sr(e,r))))}getEntry(e,t){let r=he.newInvalidDocument(t);return Fn(e).ee({index:Eo,range:IDBKeyRange.only(Us(t))},((s,i)=>{r=this.br(t,i)})).next((()=>r))}Dr(e,t){let r={size:0,document:he.newInvalidDocument(t)};return Fn(e).ee({index:Eo,range:IDBKeyRange.only(Us(t))},((s,i)=>{r={document:this.br(t,i),size:Ho(i)}})).next((()=>r))}getEntries(e,t){let r=We();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);r=r.insert(s,o)})).next((()=>r))}vr(e,t){let r=We(),s=new ce(x.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,Ho(o))})).next((()=>({documents:r,Fr:s})))}Cr(e,t,r){if(t.isEmpty())return A.resolve();let s=new ie(uf);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Us(s.first()),Us(s.last())),o=s.getIterator();let c=o.getNext();return Fn(e).ee({index:Eo,range:i},((u,l,d)=>{const p=x.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&uf(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(Us(c)):d.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Go(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Fn(e).J(IDBKeyRange.bound(c,u,!0)).next((l=>{i==null||i.incrementDocumentReadCount(l.length);let d=We();for(const p of l){const g=this.br(x.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Vi(t,g)||s.has(g.key))&&(d=d.insert(g.key,g))}return d}))}getAllFromCollectionGroup(e,t,r,s){let i=We();const o=cf(t,r),c=cf(t,tt.max());return Fn(e).ee({index:om,range:IDBKeyRange.bound(o,c,!0)},((u,l,d)=>{const p=this.br(x.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(p.key,p),i.size===s&&d.done()})).next((()=>i))}newChangeBuffer(e){return new kA(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return af(e).get(Oc).next((t=>(q(!!t,20021),t)))}Sr(e,t){return af(e).put(Oc,t)}br(e,t){if(t){const r=mA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual($.min())))return r}return he.newInvalidDocument(e)}}function bg(n){return new CA(n)}class kA extends Rg{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new $t((r=>r.toString()),((r,s)=>r.isEqual(s)))}applyChanges(e){const t=[];let r=0,s=new ie(((i,o)=>j(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=jd(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=Ho(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=jd(this.Mr.serializer,o.convertToNoDocument($.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:r,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})})),r)))}}function af(n){return be(n,hi)}function Fn(n){return be(n,Bo)}function Us(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function cf(n,e){const t=e.documentKey.path.toArray();return[n,Go(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function uf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=j(t[i],r[i]),s)return s;return s=j(t.length,r.length),s||(s=j(t[t.length-2],r[r.length-2]),s||j(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&ni(r.mutation,s,He.empty(),ne.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,K()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=K()){const s=_t();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Ks();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=_t();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,K())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=We();const o=ti(),c=(function(){return ti()})();return t.forEach(((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof jt)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),ni(d.mutation,l,d.mutation.getFieldMask(),ne.now())):o.set(l.key,He.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((l,d)=>o.set(l,d))),t.forEach(((l,d)=>c.set(l,new VA(d,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=ti();let s=new ce(((o,c)=>o-c)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||He.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(s.get(c.batchId)||K()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=qm();d.forEach((g=>{if(!i.has(g)){const E=Wm(t.get(g),r.get(g));E!==null&&p.set(g,E),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return A.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Lv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Vu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):A.resolve(_t());let c=Fr,u=i;return o.next((l=>A.forEach(l,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?A.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{u=u.insert(d,g)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,u,l,K()))).next((d=>({batchId:c,changes:Bm(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((r=>{let s=Ks();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ks();return this.indexManager.getCollectionParents(e,i).next((c=>A.forEach(c,(u=>{const l=(function(p,g){return new qt(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((d=>{d.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,he.newInvalidDocument(d)))}));let c=Ks();return o.forEach(((u,l)=>{const d=i.get(u);d!==void 0&&ni(d.mutation,l,He.empty(),ne.now()),Vi(t,l)&&(c=c.insert(u,l))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Te(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:Ta(s.bundledQuery),readTime:Te(s.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NA{constructor(){this.overlays=new ce(x.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const r=_t();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){const s=_t(),i=t.length+1,o=new x(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ce(((l,d)=>l-d));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=_t(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=_t(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,d)=>c.set(l,d))),!(c.size()>=s)););return A.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Lu(t,r));let i=this.Lr.get(t);i===void 0&&(i=K(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this.kr=new ie(Pe.Kr),this.qr=new ie(Pe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Pe(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Pe(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new x(new Y([])),r=new Pe(t,e),s=new Pe(t,e+1),i=[];return this.qr.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new x(new Y([])),r=new Pe(t,e),s=new Pe(t,e+1);let i=K();return this.qr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Pe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Pe{constructor(e,t){this.key=e,this.Jr=t}static Kr(e,t){return x.comparator(e.key,t.key)||j(e.Jr,t.Jr)}static Ur(e,t){return j(e.Jr,t.Jr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ie(Pe.Kr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ou(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Pe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?pn:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Pe(t,0),s=new Pe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie(j);return t.forEach((s=>{const i=new Pe(s,0),o=new Pe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{r=r.add(c.Jr)}))})),A.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;x.isDocumentKey(i)||(i=i.child(""));const o=new Pe(new x(i),0);let c=new ie(j);return this.Hr.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return A.forEach(t.mutations,(s=>{const i=new Pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new Pe(t,0),s=this.Hr.firstAfterOrEqual(r);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MA{constructor(e){this.ti=e,this.docs=(function(){return new ce(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():he.newInvalidDocument(t))}getEntries(e,t){let r=We();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():he.newInvalidDocument(s))})),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=We();const o=t.path,c=new x(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||wu(em(d),r)<=0||(s.has(d.key)||Vi(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,r,s){U(9500)}ni(e,t){return A.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new LA(this)}getSize(e){return A.resolve(this.size)}}class LA extends Rg{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{constructor(e){this.persistence=e,this.ri=new $t((t=>nr(t)),Ci),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new $u,this.targetCount=0,this.oi=Lt._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Lt(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t){this._i={},this.overlays={},this.ai=new Ke(0),this.ui=!1,this.ui=!0,this.ci=new xA,this.referenceDelegate=e(this),this.li=new FA(this),this.indexManager=new vA,this.remoteDocumentCache=(function(s){return new MA(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new pg(t),this.Pi=new DA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new NA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new OA(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const s=new UA(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ii(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ei(e,t){return A.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class UA extends nm{constructor(e){super(),this.currentSequenceNumber=e}}class va{constructor(e){this.persistence=e,this.Ri=new $u,this.Ai=null}static Vi(e){return new va(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(r=>{const s=x.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,$.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Wo{constructor(e,t){this.persistence=e,this.fi=new $t((r=>Le(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Ag(this,t)}static Vi(e,t){return new Wo(e,t)}Ti(){}Ii(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(r++,i.removeEntry(o,$.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vo(e.data.value)),t}wr(e,t,r){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(e){this.serializer=e}k(e,t,r,s){const i=new ua("createOrUpgrade",t);r<1&&s>=1&&((function(u){u.createObjectStore(Pi)})(e),(function(u){u.createObjectStore(li,{keyPath:Xw}),u.createObjectStore(st,{keyPath:Id,autoIncrement:!0}).createIndex(Hn,Td,{unique:!0}),u.createObjectStore(qr)})(e),lf(e),(function(u){u.createObjectStore(qn)})(e));let o=A.resolve();return r<3&&s>=3&&(r!==0&&((function(u){u.deleteObjectStore(jr),u.deleteObjectStore($r),u.deleteObjectStore(Qn)})(e),lf(e)),o=o.next((()=>(function(u){const l=u.store(Qn),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return l.put(qo,d)})(i)))),r<4&&s>=4&&(r!==0&&(o=o.next((()=>(function(u,l){return l.store(st).J().next((p=>{u.deleteObjectStore(st),u.createObjectStore(st,{keyPath:Id,autoIncrement:!0}).createIndex(Hn,Td,{unique:!0});const g=l.store(st),E=p.map((C=>g.put(C)));return A.waitFor(E)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(zr,{keyPath:av})})(e)}))),r<5&&s>=5&&(o=o.next((()=>this.gi(i)))),r<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(hi)})(e),this.pi(i))))),r<7&&s>=7&&(o=o.next((()=>this.yi(i)))),r<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),r<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&s>=10&&(o=o.next((()=>this.Si(i)))),r<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(la,{keyPath:cv})})(e),(function(u){u.createObjectStore(ha,{keyPath:uv})})(e)}))),r<12&&s>=12&&(o=o.next((()=>{(function(u){const l=u.createObjectStore(da,{keyPath:gv});l.createIndex(Lc,_v,{unique:!1}),l.createIndex(lm,yv,{unique:!1})})(e)}))),r<13&&s>=13&&(o=o.next((()=>(function(u){const l=u.createObjectStore(Bo,{keyPath:ev});l.createIndex(Eo,tv),l.createIndex(om,nv)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(qn)))),r<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),r<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Ru,{keyPath:lv,autoIncrement:!0}).createIndex(Mc,hv,{unique:!1}),u.createObjectStore(Xs,{keyPath:dv}).createIndex(cm,fv,{unique:!1}),u.createObjectStore(Zs,{keyPath:pv}).createIndex(um,mv,{unique:!1})})(e)))),r<16&&s>=16&&(o=o.next((()=>{t.objectStore(Xs).clear()})).next((()=>{t.objectStore(Zs).clear()}))),r<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(bu,{keyPath:Iv})})(e)}))),r<18&&s>=18&&tp()&&(o=o.next((()=>{t.objectStore(Xs).clear()})).next((()=>{t.objectStore(Zs).clear()}))),o}pi(e){let t=0;return e.store(qn).ee(((r,s)=>{t+=Ho(s)})).next((()=>{const r={byteSize:t};return e.store(hi).put(Oc,r)}))}gi(e){const t=e.store(li),r=e.store(st);return t.J().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,pn],[i.userId,i.lastAcknowledgedBatchId]);return r.J(Hn,o).next((c=>A.forEach(c,(u=>{q(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=jn(this.serializer,u);return Ig(e,i.userId,l).next((()=>{}))}))))}))))}yi(e){const t=e.store(jr),r=e.store(qn);return e.store(Qn).get(qo).next((s=>{const i=[];return r.ee(((o,c)=>{const u=new Y(o),l=(function(p){return[0,Le(p)]})(u);i.push(t.get(l).next((d=>d?A.resolve():(p=>t.put({targetId:0,path:Le(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(i)))}))}wi(e,t){e.createObjectStore(di,{keyPath:ov});const r=t.store(di),s=new qu,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:Le(u)})}};return t.store(qn).ee({Y:!0},((o,c)=>{const u=new Y(o);return i(u.popLast())})).next((()=>t.store(qr).ee({Y:!0},(([o,c,u],l)=>{const d=gt(c);return i(d.popLast())}))))}Si(e){const t=e.store($r);return t.ee(((r,s)=>{const i=Ws(s),o=mg(this.serializer,i);return t.put(o)}))}bi(e,t){const r=t.store(qn),s=[];return r.ee(((i,o)=>{const c=t.store(Bo),u=(function(p){return p.document?new x(Y.fromString(p.document.name).popFirst(5)):p.noDocument?x.fromSegments(p.noDocument.path):p.unknownDocument?x.fromSegments(p.unknownDocument.path):U(36783)})(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))})).next((()=>A.waitFor(s)))}Di(e,t){const r=t.store(st),s=bg(this.serializer),i=new ju(va.Vi,this.serializer.yt);return r.J().next((o=>{const c=new Map;return o.forEach((u=>{let l=c.get(u.userId)??K();jn(this.serializer,u).keys().forEach((d=>l=l.add(d))),c.set(u.userId,l)})),A.forEach(c,((u,l)=>{const d=new Ce(l),p=Ea.wt(this.serializer,d),g=i.getIndexManager(d),E=wa.wt(d,this.serializer,g,i.referenceDelegate);return new Sg(s,E,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Fc(t,Ke.ce),u).next()}))}))}}function lf(n){n.createObjectStore(jr,{keyPath:sv}).createIndex(Au,iv,{unique:!0}),n.createObjectStore($r,{keyPath:"targetId"}).createIndex(am,rv,{unique:!0}),n.createObjectStore(Qn)}const tn="IndexedDbPersistence",fc=18e5,pc=5e3,mc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Pg="main";class zu{constructor(e,t,r,s,i,o,c,u,l,d,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=g=>Promise.resolve(),!zu.v())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new PA(this,s),this.Ki=t+Pg,this.serializer=new pg(u),this.qi=new Et(this.Ki,this.xi,new BA(this.serializer)),this.ci=new _A,this.li=new RA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=bg(this.serializer),this.Pi=new gA,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&Ie(tn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,mc);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Ke(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.qi&&this.qi.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>uo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(bn(e))return N(tn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N(tn,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Bs(e).get(Ir).next((t=>A.resolve(this.Xi(t))))}Yi(e){return uo(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,fc)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=be(t,zr);return r.J().next((s=>{const i=this.ns(s,fc),o=s.filter((c=>i.indexOf(c)===-1));return A.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):Bs(e).get(Ir).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,pc)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,mc);return!1}}return!(!this.networkEnabled||!this.inForeground)||uo(e).J().next((r=>this.ns(r,pc).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&N(tn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[Pi,zr],(e=>{const t=new Fc(e,Ke.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.qi.close(),this.ls()}ns(e,t){return e.filter((r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>uo(e).J().next((t=>this.ns(t,fc).map((r=>r.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return wa.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new AA(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Ea.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){N(tn,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?wv:u===17?pm:u===16?Ev:u===15?Su:u===14?fm:u===13?dm:u===12?Tv:u===11?hm:void U(60245)})(this.xi);let o;return this.qi.runTransaction(e,s,i,(c=>(o=new Fc(c,this.ai?this.ai.next():Ke.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw Ie(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(b.FAILED_PRECONDITION,tm);return r(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Bs(e).get(Ir).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,pc)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,mc)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Bs(e).put(Ir,t)}static v(){return Et.v()}Hi(e){const t=Bs(e);return t.get(Ir).next((r=>this.Xi(r)?(N(tn,"Releasing primary lease."),t.delete(Ir)):A.resolve()))}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ie(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;ep()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return N(tn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ie(tn,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Ie("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Bs(n){return be(n,Pi)}function uo(n){return be(n,zr)}function Gu(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=s}static Es(e,t){let r=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ku(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return ep()?8:rm(Ae())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new qA;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(br()<=Z.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Sr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(br()<=Z.DEBUG&&N("QueryEngine","Query:",Sr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(br()<=Z.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Sr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Fe(t))):A.resolve())}gs(e,t){if(Nd(t))return A.resolve(null);let r=Fe(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=zo(t,null,"F"),r=Fe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=K(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,zo(t,null,"F")):this.Ds(e,l,t,u)}))))})))))}ps(e,t,r,s){return Nd(t)||s.isEqual($.min())?A.resolve(null):this.fs.getDocuments(e,r).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?A.resolve(null):(br()<=Z.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Sr(t)),this.Ds(e,o,t,Zp(s,Fr)).next((c=>c)))}))}Ss(e,t){let r=new ie(Fm(e));return t.forEach(((s,i)=>{Vi(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return br()<=Z.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Sr(t)),this.fs.getDocumentsMatchingQuery(e,t,tt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu="LocalStore",$A=3e8;class jA{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ce(j),this.Fs=new $t((i=>nr(i)),Ci),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Sg(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function kg(n,e,t,r){return new jA(n,e,t,r)}async function Vg(n,e){const t=O(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=K();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next((l=>({Ns:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function zA(n,e){const t=O(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,l,d){const p=l.batch,g=p.keys();let E=A.resolve();return g.forEach((C=>{E=E.next((()=>d.getEntry(u,C))).next((V=>{const k=l.docVersions.get(C);q(k!==null,48541),V.version.compareTo(k)<0&&(p.applyToRemoteDocument(V,l),V.isValidDocument()&&(V.setReadTime(l.commitVersion),d.addEntry(V)))}))})),E.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=K();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Dg(n){const e=O(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function GA(n,e){const t=O(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((d,p)=>{const g=s.get(p);if(!g)return;c.push(t.li.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,d.addedDocuments,p))));let E=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?E=E.withResumeToken(_e.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):d.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(d.resumeToken,r)),s=s.insert(p,E),(function(V,k,L){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=$A?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0})(g,E,d)&&c.push(t.li.updateTargetData(i,E))}));let u=We(),l=K();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(Ng(i,o,e.documentUpdates).next((d=>{u=d.Bs,l=d.Ls}))),!r.isEqual($.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return A.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,l))).next((()=>u))})).then((i=>(t.vs=s,i)))}function Ng(n,e,t){let r=K(),s=K();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=We();return t.forEach(((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):N(Hu,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function KA(n,e){const t=O(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=pn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Yr(n,e){const t=O(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(r).next((o=>(s=new yt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function Xr(n,e,t){const r=O(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!bn(o))throw o;N(Hu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Qo(n,e,t){const r=O(n);let s=$.min(),i=K();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,d){const p=O(u),g=p.Fs.get(d);return g!==void 0?A.resolve(p.vs.get(g)):p.li.getTargetData(l,d)})(r,o,Fe(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:$.min(),t?i:K()))).next((c=>(Mg(r,Lm(e),c),{documents:c,ks:i})))))}function xg(n,e){const t=O(n),r=O(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>r.At(i,e).next((o=>o?o.target:null))))}function Og(n,e){const t=O(n),r=t.Ms.get(e)||$.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.xs.getAllFromCollectionGroup(s,e,Zp(r,Fr),Number.MAX_SAFE_INTEGER))).then((s=>(Mg(t,e,s),s)))}function Mg(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}async function HA(n,e,t,r){const s=O(n);let i=K(),o=We();for(const l of t){const d=e.Ks(l.metadata.name);l.document&&(i=i.add(d));const p=e.qs(l);p.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,p)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await Yr(s,(function(d){return Fe(as(Y.fromString(`__bundle__/docs/${d}`)))})(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(l=>Ng(l,c,o).next((d=>(c.apply(l),d))).next((d=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next((()=>s.li.addMatchingKeys(l,i,u.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls))).next((()=>d.Bs))))))}async function WA(n,e,t=K()){const r=await Yr(n,Fe(Ta(e.bundledQuery))),s=O(n);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Te(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(_e.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next((()=>s.li.removeMatchingKeysForTargetId(i,r.targetId))).next((()=>s.li.addMatchingKeys(i,t,r.targetId))).next((()=>s.Pi.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg="firestore_clients";function hf(n,e){return`${Lg}_${n}_${e}`}const Fg="firestore_mutations";function df(n,e,t){let r=`${Fg}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const Ug="firestore_targets";function gc(n,e){return`${Ug}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="SharedClientState";class Jo{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new D(s.error.code,s.error.message))),o?new Jo(e,t,s.state,i):(Ie(pt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class si{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new D(r.error.code,r.error.message))),i?new si(e,r.state,s):(Ie(pt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Yo{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=Du();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=sm(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new Yo(e,i):(Ie(pt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Wu{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Wu(t.clientId,t.onlineState):(Ie(pt,`Failed to parse online state: ${e}`),null)}}class Xc{constructor(){this.activeTargetIds=Du()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class _c{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new ce(j),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=hf(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Xc),this.eo=new RegExp(`^${Lg}_${o}_([^_]*)$`),this.no=new RegExp(`^${Fg}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Ug}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(hf(this.persistenceKey,r));if(s){const i=Yo.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach(((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(gc(this.persistenceKey,e));if(s){const i=si.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(gc(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach((s=>{this.lo(s)})),this.currentUser=e,r.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N(pt,"READ",e,t),t}setItem(e,t){N(pt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){N(pt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(N(pt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Ie("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Eo(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=(function(i){let o=Ke.ce;if(i!=null)try{const c=JSON.parse(i);q(typeof c=="number",30636,{yo:i}),o=c}catch(c){Ie(pt,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);r!==Ke.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map((s=>this.syncEngine.So(s))))}}}else this.Zs.push(t)}))}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new Jo(this.currentUser,e,t,r),i=df(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=df(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=gc(this.persistenceKey,e),i=new si(e,t,r);this.setItem(s,i.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Eo(e);return Yo.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Jo.$s(new Ce(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return si.$s(s,t)}_o(e){return Wu.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);N(pt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Hs=r}))}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Du();return e.forEach(((r,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class Bg{constructor(){this.vo=new Xc,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Xc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="ConnectivityMonitor";class pf{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){N(ff,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){N(ff,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lo=null;function Zc(){return lo===null?lo=(function(){return 268435456+Math.round(2147483648*Math.random())})():lo++,"0x"+lo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc="RestConnection",JA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class YA{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===pi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Zc(),c=this.Qo(e,t.toUriEncodedString());N(yc,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),d=An(l);return this.zo(e,c,u,r,d).then((p=>(N(yc,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw Ye(yc,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+os})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=JA[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe="WebChannelConnection",qs=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class xr extends YA{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!xr.c_){const e=zp();qs(e,jp.STAT_EVENT,(t=>{t.stat===kc.PROXY?N(xe,"STAT_EVENT: detected buffering proxy"):t.stat===kc.NOPROXY&&N(xe,"STAT_EVENT: detected no buffering proxy")})),xr.c_=!0}}zo(e,t,r,s,i){const o=Zc();return new Promise(((c,u)=>{const l=new qp;l.setWithCredentials(!0),l.listenOnce($p.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Io.NO_ERROR:const p=l.getResponseJson();N(xe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Io.TIMEOUT:N(xe,`RPC '${e}' ${o} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case Io.HTTP_ERROR:const g=l.getStatus();if(N(xe,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let E=l.getResponseJson();Array.isArray(E)&&(E=E[0]);const C=E==null?void 0:E.error;if(C&&C.status&&C.message){const V=(function(L){const B=L.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(B)>=0?B:b.UNKNOWN})(C.status);u(new D(V,C.message))}else u(new D(b.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{N(xe,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);N(xe,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=Zc(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");N(xe,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.I_(d);let p=!1,g=!1;const E=new XA({Jo:C=>{g?N(xe,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(N(xe,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),N(xe,`RPC '${e}' stream ${s} sending:`,C),d.send(C))},Ho:()=>d.close()});return qs(d,Gs.EventType.OPEN,(()=>{g||(N(xe,`RPC '${e}' stream ${s} transport opened.`),E.i_())})),qs(d,Gs.EventType.CLOSE,(()=>{g||(g=!0,N(xe,`RPC '${e}' stream ${s} transport closed`),E.o_(),this.E_(d))})),qs(d,Gs.EventType.ERROR,(C=>{g||(g=!0,Ye(xe,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),E.o_(new D(b.UNAVAILABLE,"The operation could not be completed")))})),qs(d,Gs.EventType.MESSAGE,(C=>{var V;if(!g){const k=C.data[0];q(!!k,16349);const L=k,B=(L==null?void 0:L.error)||((V=L[0])==null?void 0:V.error);if(B){N(xe,`RPC '${e}' stream ${s} received error:`,B);const F=B.status;let G=(function(T){const _=Ee[T];if(_!==void 0)return Xm(_)})(F),W=B.message;F==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&Ye(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),G===void 0&&(G=b.INTERNAL,W="Unknown error status: "+F+" with message "+B.message),g=!0,E.o_(new D(G,W)),d.close()}else N(xe,`RPC '${e}' stream ${s} received:`,k),E.__(k)}})),xr.u_(),setTimeout((()=>{E.s_()}),0),E}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Gp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZA(n){return new xr(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(){return typeof window<"u"?window:null}function Po(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(n){return new iA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xr.c_=!1;class Qu{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="PersistentStream";class $g{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Qu(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Ie(t.toString()),Ie("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new D(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(mf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(N(mf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class eR extends $g{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=cA(this.serializer,e),r=(function(i){if(!("targetChange"in i))return $.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?$.min():o.readTime?Te(o.readTime):$.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=Hc(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=$o(u)?{documents:ag(i,u)}:{query:Ia(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=ng(i,o.resumeToken);const l=Gc(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo($.min())>0){c.readTime=Jr(i,o.snapshotVersion.toTimestamp());const l=Gc(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=lA(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=Hc(this.serializer),t.removeTarget=e,this.K_(t)}}class tR extends $g{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=uA(e.writeResults,e.commitTime),r=Te(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Hc(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Ii(this.serializer,r)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{}class rR extends nR{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Kc(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(b.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Kc(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(b.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function sR(n,e,t,r){return new rR(n,e,t,r)}class iR{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ie(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="RemoteStore";class oR{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Map,this.Ra=new Map,this.Aa=new Lt(1e3),this.Va=new Lt(1001),this.da=new Set,this.ma=[],this.fa=i,this.fa.Mo((o=>{r.enqueueAndForget((async()=>{Pn(this)&&(N(Rt,"Restarting streams for network reachability change."),await(async function(u){const l=O(u);l.da.add(4),await hs(l),l.ga.set("Unknown"),l.da.delete(4),await xi(l)})(this))}))})),this.ga=new iR(r,s)}}async function xi(n){if(Pn(n))for(const e of n.ma)await e(!0)}async function hs(n){for(const e of n.ma)await e(!1)}function eu(n,e){return n.Ea.get(e)||void 0}function Aa(n,e){const t=O(n),r=eu(t,e.targetId);if(r!==void 0&&t.Ia.has(r))return;const s=(function(c,u){const l=eu(c,u);l!==void 0&&c.Ra.delete(l);const d=(function(g,E){return E%2!=0?g.Va.next():g.Aa.next()})(c,u);return c.Ea.set(u,d),c.Ra.set(d,u),d})(t,e.targetId);N(Rt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new yt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ia.set(s,i),Xu(t)?Yu(t):fs(t).O_()&&Ju(t,i)}function Zr(n,e){const t=O(n),r=fs(t),s=eu(t,e);N(Rt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ia.delete(s),t.Ea.delete(e),t.Ra.delete(s),r.O_()&&jg(t,s),t.Ia.size===0&&(r.O_()?r.L_():Pn(t)&&t.ga.set("Unknown"))}function Ju(n,e){if(n.pa.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.Ra.get(e.targetId);if(t===void 0)return void N(Rt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}fs(n).Z_(e)}function jg(n,e){n.pa.$e(e),fs(n).X_(e)}function Yu(n){n.pa=new tA({getRemoteKeysForTarget:e=>{const t=n.Ra.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):K()},At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),fs(n).start(),n.ga.ua()}function Xu(n){return Pn(n)&&!fs(n).x_()&&n.Ia.size>0}function Pn(n){return O(n).da.size===0}function zg(n){n.pa=void 0}async function aR(n){n.ga.set("Online")}async function cR(n){n.Ia.forEach(((e,t)=>{Ju(n,e)}))}async function uR(n,e){zg(n),Xu(n)?(n.ga.ha(e),Yu(n)):n.ga.set("Unknown")}async function lR(n,e,t){if(n.ga.set("Online"),e instanceof tg&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ia.has(c)){const u=s.Ra.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ea.delete(u),s.Ra.delete(c)),s.Ia.delete(c)}s.pa.removeTarget(c)}})(n,e)}catch(r){N(Rt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Xo(n,r)}else if(e instanceof bo?n.pa.Xe(e):e instanceof eg?n.pa.st(e):n.pa.tt(e),!t.isEqual($.min()))try{const r=await Dg(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.pa.Tt(o);c.targetChanges.forEach(((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.Ia.get(d);p&&i.Ia.set(d,p.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,d)=>{const p=i.Ia.get(l);if(!p)return;i.Ia.set(l,p.withResumeToken(_e.EMPTY_BYTE_STRING,p.snapshotVersion)),jg(i,l);const g=new yt(p.target,l,d,p.sequenceNumber);Ju(i,g)}));const u=(function(d,p){const g=new Map;p.targetChanges.forEach(((C,V)=>{const k=d.Ra.get(V);k!==void 0&&g.set(k,C)}));let E=new ce(j);return p.targetMismatches.forEach(((C,V)=>{const k=d.Ra.get(C);k!==void 0&&(E=E.insert(k,V))})),new ls(p.snapshotVersion,g,E,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){N(Rt,"Failed to raise snapshot:",r),await Xo(n,r)}}async function Xo(n,e,t){if(!bn(e))throw e;n.da.add(1),await hs(n),n.ga.set("Offline"),t||(t=()=>Dg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(Rt,"Retrying IndexedDB access"),await t(),n.da.delete(1),await xi(n)}))}function Gg(n,e){return e().catch((t=>Xo(n,t,e)))}async function ds(n){const e=O(n),t=En(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:pn;for(;hR(e);)try{const s=await KA(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,dR(e,s)}catch(s){await Xo(e,s)}Kg(e)&&Hg(e)}function hR(n){return Pn(n)&&n.Ta.length<10}function dR(n,e){n.Ta.push(e);const t=En(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Kg(n){return Pn(n)&&!En(n).x_()&&n.Ta.length>0}function Hg(n){En(n).start()}async function fR(n){En(n).ra()}async function pR(n){const e=En(n);for(const t of n.Ta)e.ea(t.mutations)}async function mR(n,e,t){const r=n.Ta.shift(),s=Mu.from(r,e,t);await Gg(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ds(n)}async function gR(n,e){e&&En(n).Y_&&await(async function(r,s){if((function(o){return Ym(o)&&o!==b.ABORTED})(s.code)){const i=r.Ta.shift();En(r).B_(),await Gg(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ds(r)}})(n,e),Kg(n)&&Hg(n)}async function gf(n,e){const t=O(n);t.asyncQueue.verifyOperationInProgress(),N(Rt,"RemoteStore received new credentials");const r=Pn(t);t.da.add(3),await hs(t),r&&t.ga.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.da.delete(3),await xi(t)}async function tu(n,e){const t=O(n);e?(t.da.delete(2),await xi(t)):e||(t.da.add(2),await hs(t),t.ga.set("Unknown"))}function fs(n){return n.ya||(n.ya=(function(t,r,s){const i=O(t);return i.sa(),new eR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:aR.bind(null,n),Yo:cR.bind(null,n),t_:uR.bind(null,n),H_:lR.bind(null,n)}),n.ma.push((async e=>{e?(n.ya.B_(),Xu(n)?Yu(n):n.ga.set("Unknown")):(await n.ya.stop(),zg(n))}))),n.ya}function En(n){return n.wa||(n.wa=(function(t,r,s){const i=O(t);return i.sa(),new tR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:fR.bind(null,n),t_:gR.bind(null,n),ta:pR.bind(null,n),na:mR.bind(null,n)}),n.ma.push((async e=>{e?(n.wa.B_(),await ds(n)):(await n.wa.stop(),n.Ta.length>0&&(N(Rt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.wa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ve,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Zu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ps(n,e){if(Ie("AsyncQueue",`${e}: ${n}`),bn(n))return new D(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{static emptySet(e){return new Jn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||x.comparator(t.key,r.key):(t,r)=>x.comparator(t.key,r.key),this.keyedMap=Ks(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Jn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Jn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(){this.Sa=new ce(x.comparator)}track(e){const t=e.doc.key,r=this.Sa.get(t);r?e.type!==0&&r.type===3?this.Sa=this.Sa.insert(t,e):e.type===3&&r.type!==1?this.Sa=this.Sa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Sa=this.Sa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Sa=this.Sa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Sa=this.Sa.remove(t):e.type===1&&r.type===2?this.Sa=this.Sa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Sa=this.Sa.insert(t,{type:2,doc:e.doc}):U(63341,{Vt:e,ba:r}):this.Sa=this.Sa.insert(t,e)}Da(){const e=[];return this.Sa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class ar{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new ar(e,t,Jn.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ki(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(){this.Ca=void 0,this.va=[]}Fa(){return this.va.some((e=>e.Ma()))}}class yR{constructor(){this.queries=yf(),this.onlineState="Unknown",this.xa=new Set}terminate(){(function(t,r){const s=O(t),i=s.queries;s.queries=yf(),i.forEach(((o,c)=>{for(const u of c.va)u.onError(r)}))})(this,new D(b.ABORTED,"Firestore shutting down"))}}function yf(){return new $t((n=>Mm(n)),ki)}async function el(n,e){const t=O(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Fa()&&e.Ma()&&(r=2):(i=new _R,r=e.Ma()?0:1);try{switch(r){case 0:i.Ca=await t.onListen(s,!0);break;case 1:i.Ca=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=ps(o,`Initialization of query '${Sr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.va.push(e),e.Oa(t.onlineState),i.Ca&&e.Na(i.Ca)&&nl(t)}async function tl(n,e){const t=O(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.va.indexOf(e);o>=0&&(i.va.splice(o,1),i.va.length===0?s=e.Ma()?0:1:!i.Fa()&&e.Ma()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function IR(n,e){const t=O(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.va)c.Na(s)&&(r=!0);o.Ca=s}}r&&nl(t)}function TR(n,e,t){const r=O(n),s=r.queries.get(e);if(s)for(const i of s.va)i.onError(t);r.queries.delete(e)}function nl(n){n.xa.forEach((e=>{e.next()}))}var nu,If;(If=nu||(nu={})).Ba="default",If.Cache="cache";class rl{constructor(e,t,r){this.query=e,this.La=t,this.ka=!1,this.Ka=null,this.onlineState="Unknown",this.options=r||{}}Na(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ar(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ka?this.qa(e)&&(this.La.next(e),t=!0):this.Ua(e,this.onlineState)&&(this.$a(e),t=!0),this.Ka=e,t}onError(e){this.La.error(e)}Oa(e){this.onlineState=e;let t=!1;return this.Ka&&!this.ka&&this.Ua(this.Ka,e)&&(this.$a(this.Ka),t=!0),t}Ua(e,t){if(!e.fromCache||!this.Ma())return!0;const r=t!=="Offline";return(!this.options.Wa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.Ka&&this.Ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}$a(e){e=ar.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ka=!0,this.La.next(e)}Ma(){return this.options.source!==nu.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e,t){this.Qa=e,this.byteLength=t}Ga(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e){this.serializer=e}Ks(e){return wt(this.serializer,e)}qs(e){return e.metadata.exists?ya(this.serializer,e.document,!1):he.newNoDocument(this.Ks(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return Te(e)}}class sl{constructor(e,t){this.za=e,this.serializer=t,this.ja=[],this.Ja=[],this.collectionGroups=new Set,this.progress=Qg(e)}get queries(){return this.ja}get documents(){return this.Ja}Ha(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.ja.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Ja.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++t;const r=Y.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Qa.document&&(this.Ja[this.Ja.length-1].document=e.Qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}Za(e){const t=new Map,r=new Tf(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.Ks(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||K()).add(i);t.set(o,c)}}return t}async Xa(e){const t=await HA(e,new Tf(this.serializer),this.Ja,this.za.id),r=this.Za(this.documents);for(const s of this.ja)await WA(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ya:this.collectionGroups,eu:t}}}function Qg(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e){this.key=e}}class Yg{constructor(e){this.key=e}}class Xg{constructor(e,t){this.query=e,this.tu=t,this.nu=null,this.hasCachedResults=!1,this.current=!1,this.ru=K(),this.mutatedKeys=K(),this.iu=Fm(e),this.su=new Jn(this.iu)}get ou(){return this.tu}_u(e,t){const r=t?t.au:new _f,s=t?t.su:this.su;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const g=s.get(d),E=Vi(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),V=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let k=!1;g&&E?g.data.isEqual(E.data)?C!==V&&(r.track({type:3,doc:E}),k=!0):this.uu(g,E)||(r.track({type:2,doc:E}),k=!0,(u&&this.iu(E,u)>0||l&&this.iu(E,l)<0)&&(c=!0)):!g&&E?(r.track({type:0,doc:E}),k=!0):g&&!E&&(r.track({type:1,doc:g}),k=!0,(u||l)&&(c=!0)),k&&(E?(o=o.add(E),i=V?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{su:o,au:r,bs:c,mutatedKeys:i}}uu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.su;this.su=e.su,this.mutatedKeys=e.mutatedKeys;const o=e.au.Da();o.sort(((d,p)=>(function(E,C){const V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Vt:k})}};return V(E)-V(C)})(d.type,p.type)||this.iu(d.doc,p.doc))),this.cu(r),s=s??!1;const c=t&&!s?this.lu():[],u=this.ru.size===0&&this.current&&!s?1:0,l=u!==this.nu;return this.nu=u,o.length!==0||l?{snapshot:new ar(this.query,e.su,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),hu:c}:{hu:c}}Oa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({su:this.su,au:new _f,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{hu:[]}}Pu(e){return!this.tu.has(e)&&!!this.su.has(e)&&!this.su.get(e).hasLocalMutations}cu(e){e&&(e.addedDocuments.forEach((t=>this.tu=this.tu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.tu=this.tu.delete(t))),this.current=e.current)}lu(){if(!this.current)return[];const e=this.ru;this.ru=K(),this.su.forEach((r=>{this.Pu(r.key)&&(this.ru=this.ru.add(r.key))}));const t=[];return e.forEach((r=>{this.ru.has(r)||t.push(new Yg(r))})),this.ru.forEach((r=>{e.has(r)||t.push(new Jg(r))})),t}Tu(e){this.tu=e.ks,this.ru=K();const t=this._u(e.documents);return this.applyChanges(t,!0)}Iu(){return ar.fromInitialDocuments(this.query,this.su,this.mutatedKeys,this.nu===0,this.hasCachedResults)}}const Cn="SyncEngine";class ER{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class wR{constructor(e){this.key=e,this.Eu=!1}}class vR{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ru={},this.Au=new $t((c=>Mm(c)),ki),this.Vu=new Map,this.du=new Set,this.mu=new ce(x.comparator),this.fu=new Map,this.gu=new $u,this.pu={},this.yu=new Map,this.wu=Lt.ar(),this.onlineState="Unknown",this.Su=void 0}get isPrimaryClient(){return this.Su===!0}}async function AR(n,e,t=!0){const r=Ra(n);let s;const i=r.Au.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Iu()):s=await Zg(r,e,t,!0),s}async function RR(n,e){const t=Ra(n);await Zg(t,e,!0,!1)}async function Zg(n,e,t,r){const s=await Yr(n.localStore,Fe(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await il(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Aa(n.remoteStore,s),c}async function il(n,e,t,r,s){n.bu=(p,g,E)=>(async function(V,k,L,B){let F=k.view._u(L);F.bs&&(F=await Qo(V.localStore,k.query,!1).then((({documents:T})=>k.view._u(T,F))));const G=B&&B.targetChanges.get(k.targetId),W=B&&B.targetMismatches.get(k.targetId)!=null,J=k.view.applyChanges(F,V.isPrimaryClient,G,W);return ru(V,k.targetId,J.hu),J.snapshot})(n,p,g,E);const i=await Qo(n.localStore,e,!0),o=new Xg(e,i.ks),c=o._u(i.documents),u=Ni.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);ru(n,t,l.hu);const d=new ER(e,t,o);return n.Au.set(e,d),n.Vu.has(t)?n.Vu.get(t).push(e):n.Vu.set(t,[e]),l.snapshot}async function bR(n,e,t){const r=O(n),s=r.Au.get(e),i=r.Vu.get(s.targetId);if(i.length>1)return r.Vu.set(s.targetId,i.filter((o=>!ki(o,e)))),void r.Au.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Xr(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Zr(r.remoteStore,s.targetId),es(r,s.targetId)})).catch(Rn)):(es(r,s.targetId),await Xr(r.localStore,s.targetId,!0))}async function SR(n,e){const t=O(n),r=t.Au.get(e),s=t.Vu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Zr(t.remoteStore,r.targetId))}async function PR(n,e,t){const r=ul(n);try{const s=await(function(o,c){const u=O(o),l=ne.now(),d=c.reduce(((E,C)=>E.add(C.key)),K());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(E=>{let C=We(),V=K();return u.xs.getEntries(E,d).next((k=>{C=k,C.forEach(((L,B)=>{B.isValidDocument()||(V=V.add(L))}))})).next((()=>u.localDocuments.getOverlayedDocuments(E,C))).next((k=>{p=k;const L=[];for(const B of c){const F=Yv(B,p.get(B.key).overlayedDocument);F!=null&&L.push(new jt(B.key,F,Rm(F.value.mapValue),pe.exists(!0)))}return u.mutationQueue.addMutationBatch(E,l,L,c)})).next((k=>{g=k;const L=k.applyToLocalDocumentSet(p,V);return u.documentOverlayCache.saveOverlays(E,k.batchId,L)}))})).then((()=>({batchId:g.batchId,changes:Bm(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let l=o.pu[o.currentUser.toKey()];l||(l=new ce(j)),l=l.insert(c,u),o.pu[o.currentUser.toKey()]=l})(r,s.batchId,t),await zt(r,s.changes),await ds(r.remoteStore)}catch(s){const i=ps(s,"Failed to persist write");t.reject(i)}}async function e_(n,e){const t=O(n);try{const r=await GA(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.fu.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Eu=!0:s.modifiedDocuments.size>0?q(o.Eu,14607):s.removedDocuments.size>0&&(q(o.Eu,42227),o.Eu=!1))})),await zt(t,r,e)}catch(r){await Rn(r)}}function Ef(n,e,t){const r=O(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Au.forEach(((i,o)=>{const c=o.view.Oa(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=O(o);u.onlineState=c;let l=!1;u.queries.forEach(((d,p)=>{for(const g of p.va)g.Oa(c)&&(l=!0)})),l&&nl(u)})(r.eventManager,e),s.length&&r.Ru.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function CR(n,e,t){const r=O(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.fu.get(e),i=s&&s.key;if(i){let o=new ce(x.comparator);o=o.insert(i,he.newNoDocument(i,$.min()));const c=K().add(i),u=new ls($.min(),new Map,new ce(j),o,c);await e_(r,u),r.mu=r.mu.remove(i),r.fu.delete(e),cl(r)}else await Xr(r.localStore,e,!1).then((()=>es(r,e,t))).catch(Rn)}async function kR(n,e){const t=O(n),r=e.batch.batchId;try{const s=await zA(t.localStore,e);al(t,r,null),ol(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await zt(t,s)}catch(s){await Rn(s)}}async function VR(n,e,t){const r=O(n);try{const s=await(function(o,c){const u=O(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next((p=>(q(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(l,p)))).next((()=>u.mutationQueue.performConsistencyCheck(l))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d))).next((()=>u.localDocuments.getDocuments(l,d)))}))})(r.localStore,e);al(r,e,t),ol(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await zt(r,s)}catch(s){await Rn(s)}}async function DR(n,e){const t=O(n);Pn(t.remoteStore)||N(Cn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const c=O(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(r===pn)return void e.resolve();const s=t.yu.get(r)||[];s.push(e),t.yu.set(r,s)}catch(r){const s=ps(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function ol(n,e){(n.yu.get(e)||[]).forEach((t=>{t.resolve()})),n.yu.delete(e)}function al(n,e,t){const r=O(n);let s=r.pu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.pu[r.currentUser.toKey()]=s}}function es(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Vu.get(e))n.Au.delete(r),t&&n.Ru.Du(r,t);n.Vu.delete(e),n.isPrimaryClient&&n.gu.Gr(e).forEach((r=>{n.gu.containsKey(r)||t_(n,r)}))}function t_(n,e){n.du.delete(e.path.canonicalString());const t=n.mu.get(e);t!==null&&(Zr(n.remoteStore,t),n.mu=n.mu.remove(e),n.fu.delete(t),cl(n))}function ru(n,e,t){for(const r of t)r instanceof Jg?(n.gu.addReference(r.key,e),NR(n,r)):r instanceof Yg?(N(Cn,"Document no longer in limbo: "+r.key),n.gu.removeReference(r.key,e),n.gu.containsKey(r.key)||t_(n,r.key)):U(19791,{Cu:r})}function NR(n,e){const t=e.key,r=t.path.canonicalString();n.mu.get(t)||n.du.has(r)||(N(Cn,"New document in limbo: "+t),n.du.add(r),cl(n))}function cl(n){for(;n.du.size>0&&n.mu.size<n.maxConcurrentLimboResolutions;){const e=n.du.values().next().value;n.du.delete(e);const t=new x(Y.fromString(e)),r=n.wu.next();n.fu.set(r,new wR(t)),n.mu=n.mu.insert(t,r),Aa(n.remoteStore,new yt(Fe(as(t.path)),r,"TargetPurposeLimboResolution",Ke.ce))}}async function zt(n,e,t){const r=O(n),s=[],i=[],o=[];r.Au.isEmpty()||(r.Au.forEach(((c,u)=>{o.push(r.bu(u,e,t).then((l=>{var d;if((l||t)&&r.isPrimaryClient){const p=l?!l.fromCache:(d=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(l){s.push(l);const p=Ku.Es(u.targetId,l);i.push(p)}})))})),await Promise.all(o),r.Ru.H_(s),await(async function(u,l){const d=O(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>A.forEach(l,(g=>A.forEach(g.Ts,(E=>d.persistence.referenceDelegate.addReference(p,g.targetId,E))).next((()=>A.forEach(g.Is,(E=>d.persistence.referenceDelegate.removeReference(p,g.targetId,E)))))))))}catch(p){if(!bn(p))throw p;N(Hu,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const E=d.vs.get(g),C=E.snapshotVersion,V=E.withLastLimboFreeSnapshotVersion(C);d.vs=d.vs.insert(g,V)}}})(r.localStore,i))}async function xR(n,e){const t=O(n);if(!t.currentUser.isEqual(e)){N(Cn,"User change. New user:",e.toKey());const r=await Vg(t.localStore,e);t.currentUser=e,(function(i,o){i.yu.forEach((c=>{c.forEach((u=>{u.reject(new D(b.CANCELLED,o))}))})),i.yu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await zt(t,r.Ns)}}function OR(n,e){const t=O(n),r=t.fu.get(e);if(r&&r.Eu)return K().add(r.key);{let s=K();const i=t.Vu.get(e);if(!i)return s;for(const o of i){const c=t.Au.get(o);s=s.unionWith(c.view.ou)}return s}}async function MR(n,e){const t=O(n),r=await Qo(t.localStore,e.query,!0),s=e.view.Tu(r);return t.isPrimaryClient&&ru(t,e.targetId,s.hu),s}async function LR(n,e){const t=O(n);return Og(t.localStore,e).then((r=>zt(t,r)))}async function FR(n,e,t,r){const s=O(n),i=await(function(c,u){const l=O(c),d=O(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(p=>d.Xn(p,u).next((g=>g?l.localDocuments.getDocuments(p,g):A.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await ds(s.remoteStore):t==="acknowledged"||t==="rejected"?(al(s,e,r||null),ol(s,e),(function(c,u){O(O(c).mutationQueue).nr(u)})(s.localStore,e)):U(6720,"Unknown batchState",{vu:t}),await zt(s,i)):N(Cn,"Cannot apply mutation batch with id: "+e)}async function UR(n,e){const t=O(n);if(Ra(t),ul(t),e===!0&&t.Su!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await wf(t,r.toArray());t.Su=!0,await tu(t.remoteStore,!0);for(const i of s)Aa(t.remoteStore,i)}else if(e===!1&&t.Su!==!1){const r=[];let s=Promise.resolve();t.Vu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then((()=>(es(t,o),Xr(t.localStore,o,!0)))),Zr(t.remoteStore,o)})),await s,await wf(t,r),(function(o){const c=O(o);c.fu.forEach(((u,l)=>{Zr(c.remoteStore,l)})),c.gu.zr(),c.fu=new Map,c.mu=new ce(x.comparator)})(t),t.Su=!1,await tu(t.remoteStore,!1)}}async function wf(n,e,t){const r=O(n),s=[],i=[];for(const o of e){let c;const u=r.Vu.get(o);if(u&&u.length!==0){c=await Yr(r.localStore,Fe(u[0]));for(const l of u){const d=r.Au.get(l),p=await MR(r,d);p.snapshot&&i.push(p.snapshot)}}else{const l=await xg(r.localStore,o);c=await Yr(r.localStore,l),await il(r,n_(l),o,!1,c.resumeToken)}s.push(c)}return r.Ru.H_(i),s}function n_(n){return Nm(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function BR(n){return(function(t){return O(O(t).persistence).hs()})(O(n).localStore)}async function qR(n,e,t,r){const s=O(n);if(s.Su)return void N(Cn,"Ignoring unexpected query state notification.");const i=s.Vu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Og(s.localStore,Lm(i[0])),c=ls.createSynthesizedRemoteEventForCurrentChange(e,t==="current",_e.EMPTY_BYTE_STRING);await zt(s,o,c);break}case"rejected":await Xr(s.localStore,e,!0),es(s,e,r);break;default:U(64155,t)}}async function $R(n,e,t){const r=Ra(n);if(r.Su){for(const s of e){if(r.Vu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){N(Cn,"Adding an already active target "+s);continue}const i=await xg(r.localStore,s),o=await Yr(r.localStore,i);await il(r,n_(i),o.targetId,!1,o.resumeToken),Aa(r.remoteStore,o)}for(const s of t)r.Vu.has(s)&&await Xr(r.localStore,s,!1).then((()=>{Zr(r.remoteStore,s),es(r,s)})).catch(Rn)}}function Ra(n){const e=O(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=e_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=OR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=CR.bind(null,e),e.Ru.H_=IR.bind(null,e.eventManager),e.Ru.Du=TR.bind(null,e.eventManager),e}function ul(n){const e=O(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=kR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=VR.bind(null,e),e}function jR(n,e,t){const r=O(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await(function(E,C){const V=O(E),k=Te(C.createTime);return V.persistence.runTransaction("hasNewerBundle","readonly",(L=>V.Pi.getBundleMetadata(L,C.id))).then((L=>!!L&&L.createTime.compareTo(k)>=0))})(i.localStore,u))return await o.close(),c._completeWith((function(E){return{taskState:"Success",documentsLoaded:E.totalDocuments,bytesLoaded:E.totalBytes,totalDocuments:E.totalDocuments,totalBytes:E.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(Qg(u));const l=new sl(u,o.serializer);let d=await o.Fu();for(;d;){const g=await l.Ha(d);g&&c._updateProgress(g),d=await o.Fu()}const p=await l.Xa(i.localStore);return await zt(i,p.eu,void 0),await(function(E,C){const V=O(E);return V.persistence.runTransaction("Save bundle","readwrite",(k=>V.Pi.saveBundleMetadata(k,C)))})(i.localStore,u),c._completeWith(p.progress),Promise.resolve(p.Ya)}catch(u){return Ye(Cn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then((s=>{r.sharedClientState.notifyBundleLoaded(s)}))}class ts{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=hr(e.databaseInfo.databaseId),this.sharedClientState=this.Mu(e),this.persistence=this.xu(e),await this.persistence.start(),this.localStore=this.Ou(e),this.gcScheduler=this.Nu(e,this.localStore),this.indexBackfillerScheduler=this.Bu(e,this.localStore)}Nu(e,t){return null}Bu(e,t){return null}Ou(e){return kg(this.persistence,new Cg,e.initialUser,this.serializer)}xu(e){return new ju(va.Vi,this.serializer)}Mu(e){return new Bg}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ts.provider={build:()=>new ts};class ll extends ts{constructor(e){super(),this.cacheSizeBytes=e}Nu(e,t){q(this.persistence.referenceDelegate instanceof Wo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new vg(r,e.asyncQueue,t)}xu(e){const t=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new ju((r=>Wo.Vi(r,t)),this.serializer)}}class hl extends ts{constructor(e,t,r){super(),this.Lu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Lu.initialize(this,e),await ul(this.Lu.syncEngine),await ds(this.Lu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}Ou(e){return kg(this.persistence,new Cg,e.initialUser,this.serializer)}Nu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new vg(r,e.asyncQueue,t)}Bu(e,t){const r=new Jw(t,this.persistence);return new Qw(e.asyncQueue,r)}xu(e){const t=Gu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new zu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,qg(),Po(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Mu(e){return new Bg}}class r_ extends hl{constructor(e,t){super(e,t,!1),this.Lu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Lu.syncEngine;this.sharedClientState instanceof _c&&(this.sharedClientState.syncEngine={bo:FR.bind(null,t),Do:qR.bind(null,t),Co:$R.bind(null,t),hs:BR.bind(null,t),So:LR.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async r=>{await UR(this.Lu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Mu(e){const t=qg();if(!_c.v(t))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Gu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new _c(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class wn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ef(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=xR.bind(null,this.syncEngine),await tu(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new yR})()}createDatastore(e){const t=hr(e.databaseInfo.databaseId),r=ZA(e.databaseInfo);return sR(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new oR(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ef(this.syncEngine,t,0)),(function(){return pf.v()?new pf:new QA})())}createSyncEngine(e,t){return(function(s,i,o,c,u,l,d){const p=new vR(s,i,o,c,u,l);return d&&(p.Su=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=O(s);N(Rt,"RemoteStore shutting down."),i.da.add(5),await hs(i),i.fa.shutdown(),i.ga.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}wn.provider={build:()=>new wn};function vf(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.ku(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.ku(this.observer.error,e):Ie("Uncaught Error in snapshot listener:",e.toString()))}Ku(){this.muted=!0}ku(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e,t){this.qu=e,this.serializer=t,this.metadata=new Ve,this.buffer=new Uint8Array,this.Uu=(function(){return new TextDecoder("utf-8")})(),this.$u().then((r=>{r&&r.Ga()?this.metadata.resolve(r.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Qa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.qu.cancel()}async getMetadata(){return this.metadata.promise}async Fu(){return await this.getMetadata(),this.$u()}async $u(){const e=await this.Wu();if(e===null)return null;const t=this.Uu.decode(e),r=Number(t);isNaN(r)&&this.Qu(`length string (${t}) is not valid number`);const s=await this.Gu(r);return new Wg(JSON.parse(s),e.length+r)}zu(){return this.buffer.findIndex((e=>e===123))}async Wu(){for(;this.zu()<0&&!await this.ju(););if(this.buffer.length===0)return null;const e=this.zu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Gu(e){for(;this.buffer.length<e;)await this.ju()&&this.Qu("Reached the end of bundle when more is expected.");const t=this.Uu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Qu(e){throw this.qu.cancel(),new Error(`Invalid bundle format: ${e}`)}async ju(){const e=await this.qu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.Fu();if(!r||!r.Ga())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.Qa)}`);this.metadata=r;do r=this.Fu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Ju(){return this.elements}Fu(){if(this.cursor===this.bundleData.length)return null;const e=this.Wu(),t=this.Gu(e);return new Wg(JSON.parse(t),e)}Gu(e){if(this.cursor+e>this.bundleData.length)throw new D(b.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}Wu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let KR=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=O(s),c={documents:i.map((p=>yi(o.serializer,p)))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,Y.emptyPath(),c,i.length),l=new Map;u.forEach((p=>{const g=aA(o.serializer,p);l.set(g.key.toString(),g)}));const d=[];return i.forEach((p=>{const g=l.get(p.toString());q(!!g,55234,{key:p}),d.push(g)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new us(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=x.fromPath(r);this.mutations.push(new xu(s,this.precondition(s)))})),await(async function(r,s){const i=O(r),o={writes:s.map((c=>Ii(i.serializer,c)))};await i.Wo("Commit",i.serializer.databaseId,Y.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U(50498,{Hu:e.constructor.name});t=$.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual($.min())?pe.exists(!1):pe.updateTime(t):pe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual($.min()))throw new D(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return pe.updateTime(t)}return pe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HR{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Zu=r.maxAttempts,this.M_=new Qu(this.asyncQueue,"transaction_retry")}Xu(){this.Zu-=1,this.Yu()}Yu(){this.M_.p_((async()=>{const e=new KR(this.datastore),t=this.ec(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.tc(s)}))))})).catch((r=>{this.tc(r)}))}))}ec(e){try{const t=this.updateFunction(e);return!Si(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}tc(e){this.Zu>0&&this.nc(e)?(this.Zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Yu(),Promise.resolve())))):this.deferred.reject(e)}nc(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Ym(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="FirestoreClient";class WR{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ce.UNAUTHENTICATED,this.clientId=aa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{N(vn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(N(vn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ve;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ps(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Ic(n,e){n.asyncQueue.verifyOperationInProgress(),N(vn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Vg(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Af(n,e){n.asyncQueue.verifyOperationInProgress();const t=await dl(n);N(vn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>gf(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>gf(e.remoteStore,s))),n._onlineComponents=e}async function dl(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(vn,"Using user provided OfflineComponentProvider");try{await Ic(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Ye("Error using user provided cache. Falling back to memory cache: "+t),await Ic(n,new ts)}}else N(vn,"Using default OfflineComponentProvider"),await Ic(n,new ll(void 0));return n._offlineComponents}async function Sa(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(vn,"Using user provided OnlineComponentProvider"),await Af(n,n._uninitializedComponentsProvider._online)):(N(vn,"Using default OnlineComponentProvider"),await Af(n,new wn))),n._onlineComponents}function s_(n){return dl(n).then((e=>e.persistence))}function ms(n){return dl(n).then((e=>e.localStore))}function i_(n){return Sa(n).then((e=>e.remoteStore))}function fl(n){return Sa(n).then((e=>e.syncEngine))}function o_(n){return Sa(n).then((e=>e.datastore))}async function ns(n){const e=await Sa(n),t=e.eventManager;return t.onListen=AR.bind(null,e.syncEngine),t.onUnlisten=bR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=RR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=SR.bind(null,e.syncEngine),t}function QR(n){return n.asyncQueue.enqueue((async()=>{const e=await s_(n),t=await i_(n);return e.setNetworkEnabled(!0),(function(s){const i=O(s);return i.da.delete(0),xi(i)})(t)}))}function JR(n){return n.asyncQueue.enqueue((async()=>{const e=await s_(n),t=await i_(n);return e.setNetworkEnabled(!1),(async function(s){const i=O(s);i.da.add(0),await hs(i),i.ga.set("Offline")})(t)}))}function YR(n,e,t,r){const s=new ba(r),i=new rl(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>el(await ns(n),i))),()=>{s.Ku(),n.asyncQueue.enqueueAndForget((async()=>tl(await ns(n),i)))}}function XR(n,e){const t=new Ve;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(l,d){const p=O(l);return p.persistence.runTransaction("read document","readonly",(g=>p.localDocuments.getDocument(g,d)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new D(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=ps(c,`Failed to get document '${i} from cache`);o.reject(u)}})(await ms(n),e,t))),t.promise}function a_(n,e,t={}){const r=new Ve;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new ba({next:g=>{d.Ku(),o.enqueueAndForget((()=>tl(i,p)));const E=g.docs.has(c);!E&&g.fromCache?l.reject(new D(b.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&g.fromCache&&u&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new rl(as(c.path),d,{includeMetadataChanges:!0,Wa:!0});return el(i,p)})(await ns(n),n.asyncQueue,e,t,r))),r.promise}function ZR(n,e){const t=new Ve;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await Qo(s,i,!0),u=new Xg(i,c.ks),l=u._u(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=ps(c,`Failed to execute query '${i} against cache`);o.reject(u)}})(await ms(n),e,t))),t.promise}function c_(n,e,t={}){const r=new Ve;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new ba({next:g=>{d.Ku(),o.enqueueAndForget((()=>tl(i,p))),g.fromCache&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new rl(c,d,{includeMetadataChanges:!0,Wa:!0});return el(i,p)})(await ns(n),n.asyncQueue,e,t,r))),r.promise}function eb(n,e,t){const r=new Ve;return n.asyncQueue.enqueueAndForget((async()=>{try{const s=await o_(n);r.resolve((async function(o,c,u){var V;const l=O(o),{request:d,gt:p,parent:g}=cg(l.serializer,xm(c),u);l.connection.Ko||delete d.parent;const E=(await l.jo("RunAggregationQuery",l.serializer.databaseId,g,d,1)).filter((k=>!!k.result));q(E.length===1,64727);const C=(V=E[0].result)==null?void 0:V.aggregateFields;return Object.keys(C).reduce(((k,L)=>(k[p[L]]=C[L],k)),{})})(s,e,t))}catch(s){r.reject(s)}})),r.promise}function tb(n,e){const t=new Ve;return n.asyncQueue.enqueueAndForget((async()=>PR(await fl(n),e,t))),t.promise}function nb(n,e){const t=new ba(e);return n.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).xa.add(i),i.next()})(await ns(n),t))),()=>{t.Ku(),n.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).xa.delete(i)})(await ns(n),t)))}}function rb(n,e,t){const r=new Ve;return n.asyncQueue.enqueueAndForget((async()=>{const s=await o_(n);new HR(n.asyncQueue,s,t,e,r).Xu()})),r.promise}function sb(n,e,t,r){const s=(function(o,c){let u;return u=typeof o=="string"?Zm().encode(o):o,(function(d,p){return new zR(d,p)})((function(d,p){if(d instanceof Uint8Array)return vf(d,p);if(d instanceof ArrayBuffer)return vf(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,hr(e));n.asyncQueue.enqueueAndForget((async()=>{jR(await fl(n),s,r)}))}function ib(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){const i=O(r);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Pi.getNamedQuery(o,s)))})(await ms(n),e)))}function u_(n,e){return(function(r,s){return new GR(r,s)})(n,e)}function ob(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,s){const i=O(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(u=>o.getFieldIndexes(u).next((l=>(function(p,g,E,C,V){p=[...p],g=[...g],p.sort(E),g.sort(E);const k=p.length,L=g.length;let B=0,F=0;for(;B<L&&F<k;){const G=E(p[F],g[B]);G<0?V(p[F++]):G>0?C(g[B++]):(B++,F++)}for(;B<L;)C(g[B++]);for(;F<k;)V(p[F++])})(l,s,Gw,(d=>{c.push(o.addFieldIndex(u,d))}),(d=>{c.push(o.deleteFieldIndex(u,d))})))).next((()=>A.waitFor(c)))))})(await ms(n),e)))}function ab(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){O(r).Cs.As=s})(await ms(n),e)))}function cb(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=O(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await ms(n))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub="ComponentProvider",Rf=new Map;function lb(n,e,t,r,s){return new Rv(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,l_(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_="firestore.googleapis.com",bf=!0;class Sf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=h_,this.ssl=bf}else this.host=e.host,this.ssl=e.ssl??bf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=yg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<wg)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Jp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=l_(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Oi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Sf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Sf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Wp;switch(r.type){case"firstParty":return new Fw(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Rf.get(t);r&&(N(ub,"Removing Datastore"),Rf.delete(t),r.terminate())})(this),Promise.resolve()}}function d_(n,e,t,r={}){var l;n=X(n,Oi);const s=An(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&ra(`https://${c}`),i.host!==h_&&i.host!==c&&Ye("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!lt(u,o)&&(n._setSettings(u),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=Ce.MOCK_USER;else{d=Xf(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new D(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ce(g)}n._authCredentials=new Ow(new Hp(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Re(this.firestore,e,this._query)}}class se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}toJSON(){return{type:se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(lr(t,se._jsonSchema))return new se(e,r||null,new x(Y.fromString(t.referencePath)))}}se._jsonSchemaVersion="firestore/documentReference/1.0",se._jsonSchema={type:we("string",se._jsonSchemaVersion),referencePath:we("string")};class ct extends Re{constructor(e,t,r){super(e,t,as(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new x(e))}withConverter(e){return new ct(this.firestore,e,this._path)}}function hb(n,e,...t){if(n=H(n),Eu("collection","path",e),n instanceof Oi){const r=Y.fromString(e,...t);return pd(r),new ct(n,null,r)}{if(!(n instanceof se||n instanceof ct))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return pd(r),new ct(n.firestore,null,r)}}function db(n,e){if(n=X(n,Oi),Eu("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Re(n,null,(function(r){return new qt(Y.emptyPath(),r)})(e))}function f_(n,e,...t){if(n=H(n),arguments.length===1&&(e=aa.newId()),Eu("doc","path",e),n instanceof Oi){const r=Y.fromString(e,...t);return fd(r),new se(n,null,new x(r))}{if(!(n instanceof se||n instanceof ct))throw new D(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return fd(r),new se(n.firestore,n instanceof ct?n.converter:null,new x(r))}}function fb(n,e){return n=H(n),e=H(e),(n instanceof se||n instanceof ct)&&(e instanceof se||e instanceof ct)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function pl(n,e){return n=H(n),e=H(e),n instanceof Re&&e instanceof Re&&n.firestore===e.firestore&&ki(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="AsyncQueue";class Cf{constructor(e=Promise.resolve()){this.rc=[],this.sc=!1,this.oc=[],this._c=null,this.ac=!1,this.uc=!1,this.cc=[],this.M_=new Qu(this,"async_queue_retry"),this.lc=()=>{const r=Po();r&&N(Pf,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.hc=e;const t=Po();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.lc)}get isShuttingDown(){return this.sc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pc(),this.Tc(e)}enterRestrictedMode(e){if(!this.sc){this.sc=!0,this.uc=e||!1;const t=Po();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.lc)}}enqueue(e){if(this.Pc(),this.sc)return new Promise((()=>{}));const t=new Ve;return this.Tc((()=>this.sc&&this.uc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.rc.push(e),this.Ic())))}async Ic(){if(this.rc.length!==0){try{await this.rc[0](),this.rc.shift(),this.M_.reset()}catch(e){if(!bn(e))throw e;N(Pf,"Operation failed with retryable error: "+e)}this.rc.length>0&&this.M_.p_((()=>this.Ic()))}}Tc(e){const t=this.hc.then((()=>(this.ac=!0,e().catch((r=>{throw this._c=r,this.ac=!1,Ie("INTERNAL UNHANDLED ERROR: ",kf(r)),r})).then((r=>(this.ac=!1,r))))));return this.hc=t,t}enqueueAfterDelay(e,t,r){this.Pc(),this.cc.indexOf(e)>-1&&(t=0);const s=Zu.createAndSchedule(this,e,t,r,(i=>this.Ec(i)));return this.oc.push(s),s}Pc(){this._c&&U(47125,{Rc:kf(this._c)})}verifyOperationInProgress(){}async Ac(){let e;do e=this.hc,await e;while(e!==this.hc)}Vc(e){for(const t of this.oc)if(t.timerId===e)return!0;return!1}dc(e){return this.Ac().then((()=>{this.oc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.oc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Ac()}))}mc(e){this.cc.push(e)}Ec(e){const t=this.oc.indexOf(e);this.oc.splice(t,1)}}function kf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ve,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=-1;class oe extends Oi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Cf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cf(e),this._firestoreClient=void 0,await e}}}function mb(n,e,t){t||(t=pi);const r=ss(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(lt(i,e))return s;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<wg)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&An(e.host)&&ra(e.host),r.initialize({options:e,instanceIdentifier:t})}function gb(n,e){const t=typeof n=="object"?n:uu(),r=typeof n=="string"?n:e||pi,s=ss(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Qf("firestore");i&&d_(s,...i)}return s}function me(n){if(n._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||m_(n),n._firestoreClient}function m_(n){var r,s,i,o;const e=n._freezeSettings(),t=lb(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new WR(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}})(n._componentsProvider))}function _b(n,e){Ye("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return g_(n,wn.provider,{build:r=>new hl(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function yb(n){Ye("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();g_(n,wn.provider,{build:t=>new r_(t,e.cacheSizeBytes)})}function g_(n,e,t){if((n=X(n,oe))._firestoreClient||n._terminated)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(b.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},m_(n)}function Ib(n){if(n._initialized&&!n._terminated)throw new D(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ve;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!Et.v())return Promise.resolve();const s=r+Pg;await Et.delete(s)})(Gu(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function Tb(n){return(function(t){const r=new Ve;return t.asyncQueue.enqueueAndForget((async()=>DR(await fl(t),r))),r.promise})(me(n=X(n,oe)))}function Eb(n){return QR(me(n=X(n,oe)))}function wb(n){return JR(me(n=X(n,oe)))}function vb(n){return iT(n.app,"firestore",n._databaseId.database),n._delete()}function su(n,e){const t=me(n=X(n,oe)),r=new p_;return sb(t,n._databaseId,e,r),r}function __(n,e){return ib(me(n=X(n,oe)),e).then((t=>t?new Re(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(_e.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(lr(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:we("string",Ge._jsonSchemaVersion),bytes:we("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new de(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Ab(){return new dr(Nc)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(e){if(lr(e,ut._jsonSchema))return new ut(e.latitude,e.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:we("string",ut._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:et._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(lr(e,et._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new et(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}et._jsonSchemaVersion="firestore/vectorValue/1.0",et._jsonSchema={type:we("string",et._jsonSchemaVersion),vectorValues:we("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb=/^__.*__$/;class bb{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new jt(e,this.data,this.fieldMask,t,this.fieldTransforms):new cs(e,this.data,t,this.fieldTransforms)}}class y_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new jt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function I_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class Pa{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.fc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Pa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.wc(e),r}Sc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.fc(),r}bc(e){return this.i({path:void 0,arrayElement:!0})}Dc(e){return Zo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}fc(){if(this.path)for(let e=0;e<this.path.length;e++)this.wc(this.path.get(e))}wc(e){if(e.length===0)throw this.Dc("Document fields must not be empty");if(I_(this.dataSource)&&Rb.test(e))throw this.Dc('Document fields cannot begin and end with "__"')}}class Sb{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||hr(e)}V(e,t,r,s=!1){return new Pa({dataSource:e,methodName:t,targetDoc:r,path:de.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function fr(n){const e=n._freezeSettings(),t=hr(n._databaseId);return new Sb(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ca(n,e,t,r,s,i={}){const o=n.V(i.merge||i.mergeFields?2:0,e,t,s);El("Data must be an object, but it was:",o,r);const c=w_(r,o);let u,l;if(i.merge)u=new He(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=Ft(e,p,t);if(!o.contains(g))throw new D(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);A_(d,g)||d.push(g)}u=new He(d),l=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,l=o.fieldTransforms;return new bb(new ke(c),u,l)}class Mi extends kn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.Dc(`${this._methodName}() can only appear at the top level of your update data`):e.Dc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Mi}}function T_(n,e,t){return new Pa({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class ml extends kn{_toFieldTransform(e){return new Di(e.path,new Wr)}isEqual(e){return e instanceof ml}}class gl extends kn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=T_(this,e,!0),r=this.vc.map((i=>pr(i,t))),s=new rr(r);return new Di(e.path,s)}isEqual(e){return e instanceof gl&&lt(this.vc,e.vc)}}class _l extends kn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=T_(this,e,!0),r=this.vc.map((i=>pr(i,t))),s=new sr(r);return new Di(e.path,s)}isEqual(e){return e instanceof _l&&lt(this.vc,e.vc)}}class yl extends kn{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Qr(e.serializer,jm(e.serializer,this.Fc));return new Di(e.path,t)}isEqual(e){return e instanceof yl&&this.Fc===e.Fc}}function Il(n,e,t,r){const s=n.V(1,e,t);El("Data must be an object, but it was:",s,r);const i=[],o=ke.empty();Sn(r,((u,l)=>{const d=wl(e,u,t);l=H(l);const p=s.Sc(d);if(l instanceof Mi)i.push(d);else{const g=pr(l,p);g!=null&&(i.push(d),o.set(d,g))}}));const c=new He(i);return new y_(o,c,s.fieldTransforms)}function Tl(n,e,t,r,s,i){const o=n.V(1,e,t),c=[Ft(e,r,t)],u=[s];if(i.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Ft(e,i[g])),u.push(i[g+1]);const l=[],d=ke.empty();for(let g=c.length-1;g>=0;--g)if(!A_(l,c[g])){const E=c[g];let C=u[g];C=H(C);const V=o.Sc(E);if(C instanceof Mi)l.push(E);else{const k=pr(C,V);k!=null&&(l.push(E),d.set(E,k))}}const p=new He(l);return new y_(d,p,o.fieldTransforms)}function E_(n,e,t,r=!1){return pr(t,n.V(r?4:3,e))}function pr(n,e){if(v_(n=H(n)))return El("Unsupported field value:",e,n),w_(n,e);if(n instanceof kn)return(function(r,s){if(!I_(s.dataSource))throw s.Dc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Dc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.Dc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=pr(c,s.bc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=H(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return jm(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ne.fromDate(r);return{timestampValue:Jr(s.serializer,i)}}if(r instanceof ne){const i=new ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Jr(s.serializer,i)}}if(r instanceof ut)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ge)return{bytesValue:ng(s.serializer,r._byteString)};if(r instanceof se){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Dc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Uu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof et)return(function(o,c){const u=o instanceof et?o.toArray():o;return{mapValue:{fields:{[Pu]:{stringValue:Cu},[Gr]:{arrayValue:{values:u.map((d=>{if(typeof d!="number")throw c.Dc("VectorValues must only contain numeric values.");return Nu(c.serializer,d)}))}}}}}})(r,s);if(fg(r))return r._toProto(s.serializer);throw s.Dc(`Unsupported field value: ${ca(r)}`)})(n,e)}function w_(n,e){const t={};return gm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Sn(n,((r,s)=>{const i=pr(s,e.yc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function v_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof ut||n instanceof Ge||n instanceof se||n instanceof kn||n instanceof et||fg(n))}function El(n,e,t){if(!v_(t)||!Yp(t)){const r=ca(t);throw r==="an object"?e.Dc(n+" a custom object"):e.Dc(n+" "+r)}}function Ft(n,e,t){if((e=H(e))instanceof dr)return e._internalPath;if(typeof e=="string")return wl(n,e);throw Zo("Field path arguments must be of type string or ",n,!1,void 0,t)}const Pb=new RegExp("[~\\*/\\[\\]]");function wl(n,e,t){if(e.search(Pb)>=0)throw Zo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new dr(...e.split("."))._internalPath}catch{throw Zo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Zo(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new D(b.INVALID_ARGUMENT,c+n+u)}function A_(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{convertValue(e,t="none"){switch(yn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Mt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Sn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Gr].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>fe(o.doubleValue)));return new et(t)}convertGeoPoint(e){return new ut(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=pa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(fi(e));default:return null}}convertTimestamp(e){const t=Ot(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);q(dg(r),9688,{name:e});const s=new _n(r.get(1),r.get(3)),i=new x(r.popFirst(5));return s.isEqual(t)||Ie(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends vl{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(){return new Mi("deleteField")}function kb(){return new ml("serverTimestamp")}function Vb(...n){return new gl("arrayUnion",n)}function Db(...n){return new _l("arrayRemove",n)}function Nb(n){return new yl("increment",n)}function xb(n){return new et(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ob(n){var r;const e=me(X(n.firestore,oe)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:Ia(t,Fe(n._query)).ft}function Mb(n,e){var i;const t=mm(e,((o,c)=>new Jm(c,o.aggregateType,o._internalFieldPath))),r=me(X(n.firestore,oe)),s=(i=r._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:cg(s,xm(n._query),t,!0).request}const Vf="@firebase/firestore",Df="4.14.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class R_{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new ke({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Lb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Ft("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Lb extends Ti{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Al{}class gs extends Al{}function Fb(n,e,...t){let r=[];e instanceof Al&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof mr)).length,c=i.filter((u=>u instanceof _s)).length;if(o>1||o>0&&c>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class _s extends gs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new _s(e,t,r)}_apply(e){const t=this._parse(e);return P_(e._query,t),new Re(e.firestore,e.converter,zc(e._query,t))}_parse(e){const t=fr(e.firestore);return(function(i,o,c,u,l,d,p){let g;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){xf(p,d);const C=[];for(const V of p)C.push(Nf(u,i,V));g={arrayValue:{values:C}}}else g=Nf(u,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||xf(p,d),g=E_(c,o,p,d==="in"||d==="not-in");return ee.create(l,d,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ub(n,e,t){const r=e,s=Ft("where",n);return _s._create(s,r,t)}class mr extends Al{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new mr(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:re.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)P_(o,u),o=zc(o,u)})(e._query,t),new Re(e.firestore,e.converter,zc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Bb(...n){return n.forEach((e=>C_("or",e))),mr._create("or",n)}function qb(...n){return n.forEach((e=>C_("and",e))),mr._create("and",n)}class ka extends gs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ka(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _i(i,o)})(e._query,this._field,this._direction);return new Re(e.firestore,e.converter,Fv(e._query,t))}}function $b(n,e="asc"){const t=e,r=Ft("orderBy",n);return ka._create(r,t)}class Li extends gs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Li(e,t,r)}_apply(e){return new Re(e.firestore,e.converter,zo(e._query,this._limit,this._limitType))}}function jb(n){return Xp("limit",n),Li._create("limit",n,"F")}function zb(n){return Xp("limitToLast",n),Li._create("limitToLast",n,"L")}class Fi extends gs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Fi(e,t,r)}_apply(e){const t=S_(e,this.type,this._docOrFields,this._inclusive);return new Re(e.firestore,e.converter,Uv(e._query,t))}}function Gb(...n){return Fi._create("startAt",n,!0)}function Kb(...n){return Fi._create("startAfter",n,!1)}class Ui extends gs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ui(e,t,r)}_apply(e){const t=S_(e,this.type,this._docOrFields,this._inclusive);return new Re(e.firestore,e.converter,Bv(e._query,t))}}function Hb(...n){return Ui._create("endBefore",n,!1)}function Wb(...n){return Ui._create("endAt",n,!0)}function S_(n,e,t,r){if(t[0]=H(t[0]),t[0]instanceof Ti)return(function(i,o,c,u,l){if(!u)throw new D(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of Nr(i))if(p.field.isKeyField())d.push(tr(o,u.key));else{const g=u.data.field(p.field);if(fa(g))throw new D(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const E=p.field.canonicalString();throw new D(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${E}' (used as the orderBy) does not exist.`)}d.push(g)}return new Tn(d,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=fr(n.firestore);return(function(o,c,u,l,d,p){const g=o.explicitOrderBy;if(d.length>g.length)throw new D(b.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const E=[];for(let C=0;C<d.length;C++){const V=d[C];if(g[C].field.isKeyField()){if(typeof V!="string")throw new D(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof V}`);if(!Vu(o)&&V.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${V}' contains a slash.`);const k=o.path.child(Y.fromString(V));if(!x.isDocumentKey(k))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const L=new x(k);E.push(tr(c,L))}else{const k=E_(u,l,V);E.push(k)}}return new Tn(E,p)})(n._query,n.firestore._databaseId,s,e,t,r)}}function Nf(n,e,t){if(typeof(t=H(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Vu(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!x.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return tr(n,new x(r))}if(t instanceof se)return tr(n,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ca(t)}.`)}function xf(n,e){if(!Array.isArray(n)||n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function P_(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function C_(n,e){if(!(e instanceof _s||e instanceof mr))throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Va(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Rl extends vl{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qb(n){return new rs("sum",Ft("sum",n))}function Jb(n){return new rs("avg",Ft("average",n))}function k_(){return new rs("count")}function Yb(n,e){var t,r;return n instanceof rs&&e instanceof rs&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function Xb(n,e){return pl(n.query,e.query)&&lt(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(n){return V_(n,{count:k_()})}function V_(n,e){const t=X(n.firestore,oe),r=me(t),s=mm(e,((i,o)=>new Jm(o,i.aggregateType,i._internalFieldPath)));return eb(r,n._query,s).then((i=>(function(c,u,l){const d=new Vn(c);return new R_(u,d,l)})(t,n,i)))}class eS{constructor(e){this.kind="memory",this._onlineComponentProvider=wn.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new ll(void 0)}}toJSON(){return{kind:this.kind}}}class tS{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=D_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class nS{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ts.provider}toJSON(){return{kind:this.kind}}}class rS{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new ll(e)}}toJSON(){return{kind:this.kind}}}function sS(){return new nS}function iS(n){return new rS(n==null?void 0:n.cacheSizeBytes)}function oS(n){return new eS(n)}function aS(n){return new tS(n)}class cS{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=wn.provider,this._offlineComponentProvider={build:t=>new hl(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class uS{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=wn.provider,this._offlineComponentProvider={build:t=>new r_(t,e==null?void 0:e.cacheSizeBytes)}}}function D_(n){return new cS(n==null?void 0:n.forceOwnership)}function lS(){return new uS}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_="NOT SUPPORTED";class Vt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Qe extends Ti{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ii(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ft("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Qe._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function hS(n,e,t){if(lr(e,Qe._jsonSchema)){if(e.bundle===N_)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=hr(n._databaseId),s=u_(e.bundle,r),i=s.Ju(),o=new sl(s.getMetadata(),r);for(const d of i)o.Ha(d);const c=o.documents;if(c.length!==1)throw new D(b.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=ya(r,c[0].document),l=new x(Y.fromString(e.bundleName));return new Qe(n,new Rl(n),l,u,new Vt(!1,!1),t||null)}}Qe._jsonSchemaVersion="firestore/documentSnapshot/1.0",Qe._jsonSchema={type:we("string",Qe._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};class ii extends Qe{data(e={}){return super.data(e)}}class Je{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Vt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ii(this._firestore,this._userDataWriter,r.key,r,new Vt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new ii(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ii(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:fS(c.type),doc:u,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Je._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=aa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function dS(n,e,t){if(lr(e,Je._jsonSchema)){if(e.bundle===N_)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=hr(n._databaseId),s=u_(e.bundle,r),i=s.Ju(),o=new sl(s.getMetadata(),r);for(const g of i)o.Ha(g);if(o.queries.length!==1)throw new D(b.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=Ta(o.queries[0].bundledQuery),u=o.documents;let l=new Jn;u.map((g=>{const E=ya(r,g.document);l=l.add(E)}));const d=ar.fromInitialDocuments(c,l,K(),!1,!1),p=new Re(n,t||null,c);return new Je(n,new Rl(n),p,d)}}function fS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}function pS(n,e){return n instanceof Qe&&e instanceof Qe?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof Je&&e instanceof Je&&n._firestore===e._firestore&&pl(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Je._jsonSchemaVersion="firestore/querySnapshot/1.0",Je._jsonSchema={type:we("string",Je._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};const mS={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=fr(e)}set(e,t,r){this._verifyNotCommitted();const s=ln(e,this._firestore),i=Va(s.converter,t,r),o=Ca(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,pe.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=ln(e,this._firestore);let o;return o=typeof(t=H(t))=="string"||t instanceof dr?Tl(this._dataReader,"WriteBatch.update",i._key,t,r,s):Il(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,pe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ln(e,this._firestore);return this._mutations=this._mutations.concat(new us(t._key,pe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ln(n,e){if((n=H(n)).firestore!==e)throw new D(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gS{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=fr(e)}get(e){const t=ln(e,this._firestore),r=new Rl(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return U(24041);const i=s[0];if(i.isFoundDocument())return new Ti(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Ti(this._firestore,r,t._key,null,t.converter);throw U(18433,{doc:i})}))}set(e,t,r){const s=ln(e,this._firestore),i=Va(s.converter,t,r),o=Ca(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=ln(e,this._firestore);let o;return o=typeof(t=H(t))=="string"||t instanceof dr?Tl(this._dataReader,"Transaction.update",i._key,t,r,s):Il(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=ln(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_ extends gS{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=ln(e,this._firestore),r=new Vn(this._firestore);return super.get(e).then((s=>new Qe(this._firestore,r,t._key,s._document,new Vt(!1,!1),t.converter)))}}function _S(n,e,t){n=X(n,oe);const r={...mS,...t};(function(o){if(o.maxAttempts<1)throw new D(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=me(n);return rb(s,(i=>e(new O_(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yS(n){n=X(n,se);const e=X(n.firestore,oe),t=me(e);return a_(t,n._key).then((r=>bl(e,n,r)))}function IS(n){n=X(n,se);const e=X(n.firestore,oe),t=me(e),r=new Vn(e);return XR(t,n._key).then((s=>new Qe(e,r,n._key,s,new Vt(s!==null&&s.hasLocalMutations,!0),n.converter)))}function TS(n){n=X(n,se);const e=X(n.firestore,oe),t=me(e);return a_(t,n._key,{source:"server"}).then((r=>bl(e,n,r)))}function ES(n){n=X(n,Re);const e=X(n.firestore,oe),t=me(e),r=new Vn(e);return b_(n._query),c_(t,n._query).then((s=>new Je(e,r,n,s)))}function wS(n){n=X(n,Re);const e=X(n.firestore,oe),t=me(e),r=new Vn(e);return ZR(t,n._query).then((s=>new Je(e,r,n,s)))}function vS(n){n=X(n,Re);const e=X(n.firestore,oe),t=me(e),r=new Vn(e);return c_(t,n._query,{source:"server"}).then((s=>new Je(e,r,n,s)))}function AS(n,e,t){n=X(n,se);const r=X(n.firestore,oe),s=Va(n.converter,e,t),i=fr(r);return ys(r,[Ca(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,pe.none())])}function RS(n,e,t,...r){n=X(n,se);const s=X(n.firestore,oe),i=fr(s);let o;return o=typeof(e=H(e))=="string"||e instanceof dr?Tl(i,"updateDoc",n._key,e,t,r):Il(i,"updateDoc",n._key,e),ys(s,[o.toMutation(n._key,pe.exists(!0))])}function bS(n){return ys(X(n.firestore,oe),[new us(n._key,pe.none())])}function SS(n,e){const t=X(n.firestore,oe),r=f_(n),s=Va(n.converter,e),i=fr(n.firestore);return ys(t,[Ca(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,pe.exists(!1))]).then((()=>r))}function iu(n,...e){var l,d,p;n=H(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Or(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Or(e[r])){const g=e[r];e[r]=(l=g.next)==null?void 0:l.bind(g),e[r+1]=(d=g.error)==null?void 0:d.bind(g),e[r+2]=(p=g.complete)==null?void 0:p.bind(g)}let i,o,c;if(n instanceof se)o=X(n.firestore,oe),c=as(n._key.path),i={next:g=>{e[r]&&e[r](bl(o,n,g))},error:e[r+1],complete:e[r+2]};else{const g=X(n,Re);o=X(g.firestore,oe),c=g._query;const E=new Vn(o);i={next:C=>{e[r]&&e[r](new Je(o,E,g,C))},error:e[r+1],complete:e[r+2]},b_(n._query)}const u=me(o);return YR(u,c,s,i)}function PS(n,e,...t){const r=H(n),s=(function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const p of d){if(!(p in u)){l.error=`snapshotJson missing required field: ${p}`;break}const g=u[p];if(typeof g!="string"){l.error=`snapshotJson field '${p}' must be a string.`;break}if(g.length===0){l.error=`snapshotJson field '${p}' cannot be an empty string.`;break}p==="bundle"?l.bundle=g:p==="bundleName"?l.bundleName=g:p==="bundleSource"&&(l.bundleSource=g)}return l})(e);if(s.error)throw new D(b.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||Or(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&Or(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,E){let C,V=!1;return su(l,d.bundle).then((()=>__(l,d.bundleName))).then((L=>{L&&!V&&(E&&L.withConverter(E),C=iu(L,p||{},g))})).catch((L=>(g.error&&g.error(L),()=>{}))),()=>{V||(V=!0,C&&C())}})(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&Or(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,E){let C,V=!1;return su(l,d.bundle).then((()=>{if(!V){const L=new se(l,E||null,x.fromPath(d.bundleName));C=iu(L,p||{},g)}})).catch((L=>(g.error&&g.error(L),()=>{}))),()=>{V||(V=!0,C&&C())}})(r,s,i,c,t[o])}throw new D(b.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function CS(n,e){n=X(n,oe);const t=me(n),r=Or(e)?e:{next:e};return nb(t,r)}function ys(n,e){const t=me(n);return tb(t,e)}function bl(n,e,t){const r=t.docs.get(e._key),s=new Vn(n);return new Qe(n,s,e._key,r,new Vt(t.hasPendingWrites,t.fromCache),e.converter)}function kS(n){return n=X(n,oe),me(n),new x_(n,(e=>ys(n,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VS(n,e){n=X(n,oe);const t=me(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return Ye("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(i){const o=typeof i=="string"?(function(l){try{return JSON.parse(l)}catch(d){throw new D(b.INVALID_ARGUMENT,"Failed to parse JSON: "+(d==null?void 0:d.message))}})(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Of(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const p of u.fields){const g=Of(p,"fieldPath"),E=wl("setIndexConfiguration",g);p.arrayConfig==="CONTAINS"?d.push(new Wn(E,2)):p.order==="ASCENDING"?d.push(new Wn(E,0)):p.order==="DESCENDING"&&d.push(new Wn(E,1))}c.push(new Ur(Ur.UNKNOWN_ID,l,d,Br.empty()))}return c})(e);return ob(t,r)}function Of(n,e){if(typeof n[e]!="string")throw new D(b.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function DS(n){var s;n=X(n,oe);const e=Mf.get(n);if(e)return e;if(((s=me(n)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const r=new M_(n);return Mf.set(n,r),r}function NS(n){L_(n,!0)}function xS(n){L_(n,!1)}function OS(n){const e=me(n._firestore);cb(e).then((t=>N("deleting all persistent cache indexes succeeded"))).catch((t=>Ye("deleting all persistent cache indexes failed",t)))}function L_(n,e){const t=me(n._firestore);ab(t,e).then((r=>N(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((r=>Ye(`setting persistent cache index auto creation isEnabled=${e} failed`,r)))}const Mf=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MS{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Sl.instance.onExistenceFilterMismatch(e)}}class Sl{constructor(){this.t=new Map}static get instance(){return ho||(ho=new Sl,Zv(ho)),ho}o(e){this.t.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let ho=null;(function(e,t=!0){Dw(ur),Xn(new mn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new oe(new Mw(r.getProvider("auth-internal")),new Uw(o,r.getProvider("app-check-internal")),bv(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),It(Vf,Df,e),It(Vf,Df,"esm2020")})();const DC=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:vl,AggregateField:rs,AggregateQuerySnapshot:R_,Bytes:Ge,CACHE_SIZE_UNLIMITED:pb,CollectionReference:ct,DocumentReference:se,DocumentSnapshot:Qe,FieldPath:dr,FieldValue:kn,Firestore:oe,FirestoreError:D,GeoPoint:ut,LoadBundleTask:p_,PersistentCacheIndexManager:M_,Query:Re,QueryCompositeFilterConstraint:mr,QueryConstraint:gs,QueryDocumentSnapshot:ii,QueryEndAtConstraint:Ui,QueryFieldFilterConstraint:_s,QueryLimitConstraint:Li,QueryOrderByConstraint:ka,QuerySnapshot:Je,QueryStartAtConstraint:Fi,SnapshotMetadata:Vt,Timestamp:ne,Transaction:O_,VectorValue:et,WriteBatch:x_,_AutoId:aa,_ByteString:_e,_DatabaseId:_n,_DocumentKey:x,_EmptyAppCheckTokenProvider:Bw,_EmptyAuthCredentialsProvider:Wp,_FieldPath:de,_TestingHooks:MS,_cast:X,_debugAssert:xw,_internalAggregationQueryToProtoRunAggregationQueryRequest:Mb,_internalQueryToProtoQueryTarget:Ob,_isBase64Available:vv,_logWarn:Ye,_validateIsNotUsedTogether:Jp,addDoc:SS,aggregateFieldEqual:Yb,aggregateQuerySnapshotEqual:Xb,and:qb,arrayRemove:Db,arrayUnion:Vb,average:Jb,clearIndexedDbPersistence:Ib,collection:hb,collectionGroup:db,connectFirestoreEmulator:d_,count:k_,deleteAllPersistentCacheIndexes:OS,deleteDoc:bS,deleteField:Cb,disableNetwork:wb,disablePersistentCacheIndexAutoCreation:xS,doc:f_,documentId:Ab,documentSnapshotFromJSON:hS,enableIndexedDbPersistence:_b,enableMultiTabIndexedDbPersistence:yb,enableNetwork:Eb,enablePersistentCacheIndexAutoCreation:NS,endAt:Wb,endBefore:Hb,ensureFirestoreConfigured:me,executeWrite:ys,getAggregateFromServer:V_,getCountFromServer:Zb,getDoc:yS,getDocFromCache:IS,getDocFromServer:TS,getDocs:ES,getDocsFromCache:wS,getDocsFromServer:vS,getFirestore:gb,getPersistentCacheIndexManager:DS,increment:Nb,initializeFirestore:mb,limit:jb,limitToLast:zb,loadBundle:su,memoryEagerGarbageCollector:sS,memoryLocalCache:oS,memoryLruGarbageCollector:iS,namedQuery:__,onSnapshot:iu,onSnapshotResume:PS,onSnapshotsInSync:CS,or:Bb,orderBy:$b,persistentLocalCache:aS,persistentMultipleTabManager:lS,persistentSingleTabManager:D_,query:Fb,queryEqual:pl,querySnapshotFromJSON:dS,refEqual:fb,runTransaction:_S,serverTimestamp:kb,setDoc:AS,setIndexConfiguration:VS,setLogLevel:Nw,snapshotEqual:pS,startAfter:Kb,startAt:Gb,sum:Qb,terminate:vb,updateDoc:RS,vector:xb,waitForPendingWrites:Tb,where:Ub,writeBatch:kS},Symbol.toStringTag,{value:"Module"}));var LS="firebase",FS="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It(LS,FS,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="firebasestorage.googleapis.com",U_="storageBucket",US=120*1e3,BS=600*1e3,qS=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge extends bt{constructor(e,t,r=0){super(Tc(e),`Firebase Storage: ${t} (${Tc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ge.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Tc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ue;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ue||(ue={}));function Tc(n){return"storage/"+n}function Pl(){const n="An unknown error occurred, please check the error payload for server response.";return new ge(ue.UNKNOWN,n)}function $S(n){return new ge(ue.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function jS(n){return new ge(ue.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function zS(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ge(ue.UNAUTHENTICATED,n)}function GS(){return new ge(ue.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function KS(n){return new ge(ue.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function B_(){return new ge(ue.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function q_(){return new ge(ue.CANCELED,"User canceled the upload/download.")}function HS(n){return new ge(ue.INVALID_URL,"Invalid URL '"+n+"'.")}function WS(n){return new ge(ue.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function QS(){return new ge(ue.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+U_+"' property when initializing the app?")}function $_(){return new ge(ue.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function JS(){return new ge(ue.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function YS(){return new ge(ue.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function XS(n){return new ge(ue.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ea(n){return new ge(ue.INVALID_ARGUMENT,n)}function j_(){return new ge(ue.APP_DELETED,"The Firebase app was deleted.")}function z_(n){return new ge(ue.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function oi(n,e){return new ge(ue.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function $s(n){throw new ge(ue.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Me.makeFromUrl(e,t)}catch{return new Me(e,"")}if(r.path==="")return r;throw WS(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(G){G.path.charAt(G.path.length-1)==="/"&&(G.path_=G.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(G){G.path_=decodeURIComponent(G.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",E=new RegExp(`^https?://${p}/${d}/b/${s}/o${g}`,"i"),C={bucket:1,path:3},V=t===F_?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",L=new RegExp(`^https?://${V}/${s}/${k}`,"i"),F=[{regex:c,indices:u,postModify:i},{regex:E,indices:C,postModify:l},{regex:L,indices:{bucket:1,path:2},postModify:l}];for(let G=0;G<F.length;G++){const W=F[G],J=W.regex.exec(e);if(J){const T=J[W.indices.bucket];let _=J[W.indices.path];_||(_=""),r=new Me(T,_),W.postModify(r);break}}if(r==null)throw HS(e);return r}}class ZS{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eP(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...k){l||(l=!0,e.apply(null,k))}function p(k){s=setTimeout(()=>{s=null,n(E,u())},k)}function g(){i&&clearTimeout(i)}function E(k,...L){if(l){g();return}if(k){g(),d.call(null,k,...L);return}if(u()||o){g(),d.call(null,k,...L);return}r<64&&(r*=2);let F;c===1?(c=2,F=0):F=(r+Math.random())*1e3,p(F)}let C=!1;function V(k){C||(C=!0,g(),!l&&(s!==null?(k||(c=2),clearTimeout(s),p(0)):k||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,V(!0)},t),V}function tP(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nP(n){return n!==void 0}function rP(n){return typeof n=="function"}function sP(n){return typeof n=="object"&&!Array.isArray(n)}function Da(n){return typeof n=="string"||n instanceof String}function Lf(n){return Cl()&&n instanceof Blob}function Cl(){return typeof Blob<"u"}function ou(n,e,t,r){if(r<e)throw ea(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw ea(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function G_(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var Yn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Yn||(Yn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(e,t,r,s,i,o,c,u,l,d,p,g=!0,E=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=p,this.retry=g,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,V)=>{this.resolve_=C,this.reject_=V,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new fo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===Yn.NO_ERROR,u=i.getStatus();if(!c||K_(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===Yn.ABORT;r(!1,new fo(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new fo(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());nP(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Pl();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?j_():q_();o(u)}else{const u=B_();o(u)}};this.canceled_?t(!1,new fo(!1,null,!0)):this.backoffId_=eP(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&tP(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class fo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function oP(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function aP(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function cP(n,e){e&&(n["X-Firebase-GMPID"]=e)}function uP(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function lP(n,e,t,r,s,i,o=!0,c=!1){const u=G_(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return cP(d,e),oP(d,t),aP(d,i),uP(d,r),new iP(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hP(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function dP(...n){const e=hP();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Cl())return new Blob(n);throw new ge(ue.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function fP(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pP(n){if(typeof atob>"u")throw XS("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ec{constructor(e,t){this.data=e,this.contentType=t||null}}function kl(n,e){switch(n){case nt.RAW:return new Ec(H_(e));case nt.BASE64:case nt.BASE64URL:return new Ec(W_(n,e));case nt.DATA_URL:return new Ec(gP(e),_P(e))}throw Pl()}function H_(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function mP(n){let e;try{e=decodeURIComponent(n)}catch{throw oi(nt.DATA_URL,"Malformed data URL.")}return H_(e)}function W_(n,e){switch(n){case nt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw oi(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case nt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw oi(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=pP(e)}catch(s){throw s.message.includes("polyfill")?s:oi(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Q_{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw oi(nt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=yP(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function gP(n){const e=new Q_(n);return e.base64?W_(nt.BASE64,e.rest):mP(e.rest)}function _P(n){return new Q_(n).contentType}function yP(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){let r=0,s="";Lf(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Lf(this.data_)){const r=this.data_,s=fP(r,e,t);return s===null?null:new mt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new mt(r,!0)}}static getBlob(...e){if(Cl()){const t=e.map(r=>r instanceof mt?r.data_:r);return new mt(dP.apply(null,t))}else{const t=e.map(o=>Da(o)?kl(nt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new mt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(n){let e;try{e=JSON.parse(n)}catch{return null}return sP(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IP(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function TP(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function J_(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EP(n,e){return e}class qe{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||EP}}let po=null;function wP(n){return!Da(n)||n.length<2?n:J_(n)}function Bi(){if(po)return po;const n=[];n.push(new qe("bucket")),n.push(new qe("generation")),n.push(new qe("metageneration")),n.push(new qe("name","fullPath",!0));function e(i,o){return wP(o)}const t=new qe("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new qe("size");return s.xform=r,n.push(s),n.push(new qe("timeCreated")),n.push(new qe("updated")),n.push(new qe("md5Hash",null,!0)),n.push(new qe("cacheControl",null,!0)),n.push(new qe("contentDisposition",null,!0)),n.push(new qe("contentEncoding",null,!0)),n.push(new qe("contentLanguage",null,!0)),n.push(new qe("contentType",null,!0)),n.push(new qe("metadata","customMetadata",!0)),po=n,po}function vP(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Me(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function AP(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return vP(r,n),r}function Y_(n,e,t){const r=Vl(e);return r===null?null:AP(n,r,t)}function RP(n,e,t,r){const s=Vl(e);if(s===null||!Da(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,p=n.fullPath,g="/b/"+o(d)+"/o/"+o(p),E=Gt(g,t,r),C=G_({alt:"media",token:l});return E+C})[0]}function Dl(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="prefixes",Uf="items";function bP(n,e,t){const r={prefixes:[],items:[],nextPageToken:t.nextPageToken};if(t[Ff])for(const s of t[Ff]){const i=s.replace(/\/$/,""),o=n._makeStorageReference(new Me(e,i));r.prefixes.push(o)}if(t[Uf])for(const s of t[Uf]){const i=n._makeStorageReference(new Me(e,s.name));r.items.push(i)}return r}function SP(n,e,t){const r=Vl(t);return r===null?null:bP(n,e,r)}class Pt{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n){if(!n)throw Pl()}function Na(n,e){function t(r,s){const i=Y_(n,s,e);return vt(i!==null),i}return t}function PP(n,e){function t(r,s){const i=SP(n,e,s);return vt(i!==null),i}return t}function CP(n,e){function t(r,s){const i=Y_(n,s,e);return vt(i!==null),RP(i,s,n.host,n._protocol)}return t}function Is(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=GS():s=zS():t.getStatus()===402?s=jS(n.bucket):t.getStatus()===403?s=KS(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function qi(n){const e=Is(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=$S(n.path)),i.serverResponse=s.serverResponse,i}return t}function X_(n,e,t){const r=e.fullServerUrl(),s=Gt(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Pt(s,i,Na(n,t),o);return c.errorHandler=qi(e),c}function kP(n,e,t,r,s){const i={};e.isRoot?i.prefix="":i.prefix=e.path+"/",t.length>0&&(i.delimiter=t),r&&(i.pageToken=r),s&&(i.maxResults=s);const o=e.bucketOnlyServerUrl(),c=Gt(o,n.host,n._protocol),u="GET",l=n.maxOperationRetryTime,d=new Pt(c,u,PP(n,e.bucket),l);return d.urlParams=i,d.errorHandler=Is(e),d}function Z_(n,e,t){const r=e.fullServerUrl(),s=Gt(r,n.host,n._protocol)+"?alt=media",i="GET",o=n.maxOperationRetryTime,c=new Pt(s,i,(u,l)=>l,o);return c.errorHandler=qi(e),t!==void 0&&(c.headers.Range=`bytes=0-${t}`,c.successCodes=[200,206]),c}function VP(n,e,t){const r=e.fullServerUrl(),s=Gt(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Pt(s,i,CP(n,t),o);return c.errorHandler=qi(e),c}function DP(n,e,t,r){const s=e.fullServerUrl(),i=Gt(s,n.host,n._protocol),o="PATCH",c=Dl(t,r),u={"Content-Type":"application/json; charset=utf-8"},l=n.maxOperationRetryTime,d=new Pt(i,o,Na(n,r),l);return d.headers=u,d.body=c,d.errorHandler=qi(e),d}function NP(n,e){const t=e.fullServerUrl(),r=Gt(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new Pt(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=qi(e),c}function xP(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function ey(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=xP(null,e)),r}function ty(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let F="";for(let G=0;G<2;G++)F=F+Math.random().toString().slice(2);return F}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=ey(e,r,s),d=Dl(l,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,g=`\r
--`+u+"--",E=mt.getBlob(p,r,g);if(E===null)throw $_();const C={name:l.fullPath},V=Gt(i,n.host,n._protocol),k="POST",L=n.maxUploadRetryTime,B=new Pt(V,k,Na(n,t),L);return B.urlParams=C,B.headers=o,B.body=E.uploadData(),B.errorHandler=Is(e),B}class ta{constructor(e,t,r,s){this.current=e,this.total=t,this.finalized=!!r,this.metadata=s||null}}function Nl(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{vt(!1)}return vt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function OP(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o=ey(e,r,s),c={name:o.fullPath},u=Gt(i,n.host,n._protocol),l="POST",d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},p=Dl(o,t),g=n.maxUploadRetryTime;function E(V){Nl(V);let k;try{k=V.getResponseHeader("X-Goog-Upload-URL")}catch{vt(!1)}return vt(Da(k)),k}const C=new Pt(u,l,E,g);return C.urlParams=c,C.headers=d,C.body=p,C.errorHandler=Is(e),C}function MP(n,e,t,r){const s={"X-Goog-Upload-Command":"query"};function i(l){const d=Nl(l,["active","final"]);let p=null;try{p=l.getResponseHeader("X-Goog-Upload-Size-Received")}catch{vt(!1)}p||vt(!1);const g=Number(p);return vt(!isNaN(g)),new ta(g,r.size(),d==="final")}const o="POST",c=n.maxUploadRetryTime,u=new Pt(t,o,i,c);return u.headers=s,u.errorHandler=Is(e),u}const Bf=256*1024;function LP(n,e,t,r,s,i,o,c){const u=new ta(0,0);if(o?(u.current=o.current,u.total=o.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw JS();const l=u.total-u.current;let d=l;s>0&&(d=Math.min(d,s));const p=u.current,g=p+d;let E="";d===0?E="finalize":l===d?E="upload, finalize":E="upload";const C={"X-Goog-Upload-Command":E,"X-Goog-Upload-Offset":`${u.current}`},V=r.slice(p,g);if(V===null)throw $_();function k(G,W){const J=Nl(G,["active","final"]),T=u.current+d,_=r.size();let I;return J==="final"?I=Na(e,i)(G,W):I=null,new ta(T,_,J==="final",I)}const L="POST",B=e.maxUploadRetryTime,F=new Pt(t,L,k,B);return F.headers=C,F.body=V.uploadData(),F.progressCallback=c||null,F.errorHandler=Is(n),F}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FP={STATE_CHANGED:"state_changed"},$e={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function wc(n){switch(n){case"running":case"pausing":case"canceling":return $e.RUNNING;case"paused":return $e.PAUSED;case"success":return $e.SUCCESS;case"canceled":return $e.CANCELED;case"error":return $e.ERROR;default:return $e.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UP{constructor(e,t,r){if(rP(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rr(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class xl{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Yn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Yn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Yn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw $s("cannot .send() more than once");if(An(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw $s("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw $s("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw $s("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw $s("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class BP extends xl{initXhr(){this.xhr_.responseType="text"}}function it(){return new BP}class qP extends xl{initXhr(){this.xhr_.responseType="arraybuffer"}}function $P(){return new qP}class jP extends xl{initXhr(){this.xhr_.responseType="blob"}}function zP(){return new jP}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=Bi(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(ue.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(K_(s.status,[]))if(i)s=B_();else{this.sleepTime=Math.max(this.sleepTime*2,qS),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(ue.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=OP(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,it,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const s=MP(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,it,t,r);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Bf*this._chunkMultiplier,t=new ta(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=LP(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(u){this._error=u,this._transition("error");return}const c=this._ref.storage._makeRequest(o,it,s,i,!1);this._request=c,c.getPromise().then(u=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(u.current),u.finalized?(this._metadata=u.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Bf*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=X_(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,it,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=ty(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,it,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=q_(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=wc(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,s){const i=new UP(t||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(wc(this._state)){case $e.SUCCESS:Rr(this._resolve.bind(null,this.snapshot))();break;case $e.CANCELED:case $e.ERROR:const t=this._reject;Rr(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(wc(this._state)){case $e.RUNNING:case $e.PAUSED:e.next&&Rr(e.next.bind(e,this.snapshot))();break;case $e.SUCCESS:e.complete&&Rr(e.complete.bind(e))();break;case $e.CANCELED:case $e.ERROR:e.error&&Rr(e.error.bind(e,this._error))();break;default:e.error&&Rr(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,t){this._service=e,t instanceof Me?this._location=t:this._location=Me.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new cr(e,t)}get root(){const e=new Me(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return J_(this._location.path)}get storage(){return this._service}get parent(){const e=IP(this._location.path);if(e===null)return null;const t=new Me(this._location.bucket,e);return new cr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw z_(e)}}function GP(n,e){n._throwIfRoot("getBytes");const t=Z_(n.storage,n._location,e);return n.storage.makeRequestWithTokens(t,$P).then(r=>e!==void 0?r.slice(0,e):r)}function KP(n,e){n._throwIfRoot("getBlob");const t=Z_(n.storage,n._location,e);return n.storage.makeRequestWithTokens(t,zP).then(r=>e!==void 0?r.slice(0,e):r)}function ry(n,e,t){n._throwIfRoot("uploadBytes");const r=ty(n.storage,n._location,Bi(),new mt(e,!0),t);return n.storage.makeRequestWithTokens(r,it).then(s=>({metadata:s,ref:n}))}function HP(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new ny(n,new mt(e),t)}function WP(n,e,t=nt.RAW,r){n._throwIfRoot("uploadString");const s=kl(t,e),i={...r};return i.contentType==null&&s.contentType!=null&&(i.contentType=s.contentType),ry(n,s.data,i)}function QP(n){const e={prefixes:[],items:[]};return sy(n,e).then(()=>e)}async function sy(n,e,t){const s=await iy(n,{pageToken:t});e.prefixes.push(...s.prefixes),e.items.push(...s.items),s.nextPageToken!=null&&await sy(n,e,s.nextPageToken)}function iy(n,e){e!=null&&typeof e.maxResults=="number"&&ou("options.maxResults",1,1e3,e.maxResults);const t=e||{},r=kP(n.storage,n._location,"/",t.pageToken,t.maxResults);return n.storage.makeRequestWithTokens(r,it)}function JP(n){n._throwIfRoot("getMetadata");const e=X_(n.storage,n._location,Bi());return n.storage.makeRequestWithTokens(e,it)}function YP(n,e){n._throwIfRoot("updateMetadata");const t=DP(n.storage,n._location,e,Bi());return n.storage.makeRequestWithTokens(t,it)}function XP(n){n._throwIfRoot("getDownloadURL");const e=VP(n.storage,n._location,Bi());return n.storage.makeRequestWithTokens(e,it).then(t=>{if(t===null)throw YS();return t})}function ZP(n){n._throwIfRoot("deleteObject");const e=NP(n.storage,n._location);return n.storage.makeRequestWithTokens(e,it)}function oy(n,e){const t=TP(n._location.path,e),r=new Me(n._location.bucket,t);return new cr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eC(n){return/^[A-Za-z]+:\/\//.test(n)}function tC(n,e){return new cr(n,e)}function ay(n,e){if(n instanceof Ol){const t=n;if(t._bucket==null)throw QS();const r=new cr(t,t._bucket);return e!=null?ay(r,e):r}else return e!==void 0?oy(n,e):n}function nC(n,e){if(e&&eC(e)){if(n instanceof Ol)return tC(n,e);throw ea("To use ref(service, url), the first argument must be a Storage instance.")}else return ay(n,e)}function qf(n,e){const t=e==null?void 0:e[U_];return t==null?null:Me.makeFromBucketSpec(t,n)}function rC(n,e,t,r={}){n.host=`${e}:${t}`;const s=An(e);s&&ra(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Xf(i,n.app.options.projectId))}class Ol{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=F_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=US,this._maxUploadRetryTime=BS,this._requests=new Set,s!=null?this._bucket=Me.makeFromBucketSpec(s,this._host):this._bucket=qf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Me.makeFromBucketSpec(this._url,e):this._bucket=qf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ou("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ou("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new cr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new ZS(j_());{const o=lP(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const $f="@firebase/storage",jf="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy="storage";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sC(n,e){return n=H(n),GP(n,e)}function iC(n,e,t){return n=H(n),ry(n,e,t)}function oC(n,e,t,r){return n=H(n),WP(n,e,t,r)}function aC(n,e,t){return n=H(n),HP(n,e,t)}function cC(n){return n=H(n),JP(n)}function uC(n,e){return n=H(n),YP(n,e)}function lC(n,e){return n=H(n),iy(n,e)}function hC(n){return n=H(n),QP(n)}function dC(n){return n=H(n),XP(n)}function fC(n){return n=H(n),ZP(n)}function pC(n,e){return n=H(n),nC(n,e)}function mC(n,e){return oy(n,e)}function gC(n=uu(),e){n=H(n);const r=ss(n,cy).getImmediate({identifier:e}),s=Qf("storage");return s&&uy(r,...s),r}function uy(n,e,t,r={}){rC(n,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _C(n,e){return n=H(n),KP(n,e)}function yC(n,e){throw new Error("getStream() is only supported by NodeJS builds")}function IC(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Ol(t,r,s,e,ur)}function TC(){Xn(new mn(cy,IC,"PUBLIC").setMultipleInstances(!0)),It($f,jf,""),It($f,jf,"esm2020")}TC();const NC=Object.freeze(Object.defineProperty({__proto__:null,StorageError:ge,get StorageErrorCode(){return ue},StringFormat:nt,_FbsBlob:mt,_Location:Me,_TaskEvent:FP,_TaskState:$e,_UploadTask:ny,_dataFromString:kl,_getChild:mC,_invalidArgument:ea,_invalidRootOperation:z_,connectStorageEmulator:uy,deleteObject:fC,getBlob:_C,getBytes:sC,getDownloadURL:dC,getMetadata:cC,getStorage:gC,getStream:yC,list:lC,listAll:hC,ref:pC,updateMetadata:uC,uploadBytes:iC,uploadBytesResumable:aC,uploadString:oC},Symbol.toStringTag,{value:"Module"}));export{rn as G,Dp as a,AE as b,wC as c,f_ as d,yS as e,gb as f,CC as g,gC as h,DC as i,NC as j,cT as k,kb as l,AS as m,RC as n,bC as o,vC as p,PC as q,SC as r,EC as s,AC as u};
