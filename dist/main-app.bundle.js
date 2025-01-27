!function(){"use strict";function e(t,r){const i=n();return(e=function(e,t){return i[e-=314]})(t,r)}const t=e;function n(){const e=["849622xIHrEX","45APIYov","4792TmbMdw","href","createElement","10661827qNVPkB","rel","from","find","Fuente Poppins","26FptimQ","746730rzbuTo","head","6769ZJyEvy","Font Awesome","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css","2031004RQnvJu","appendChild","10xJoCpk","link","681mfTsES","stylesheet","querySelectorAll","https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap","224514cpkcpL",'link[rel="stylesheet"]',"test"];return(n=function(){return e})()}!function(t){const n=e,r=t();for(;;)try{if(441967===-parseInt(n(322))/1+parseInt(n(332))/2*(-parseInt(n(315))/3)+-parseInt(n(338))/4+parseInt(n(323))/5*(parseInt(n(319))/6)+-parseInt(n(335))/7*(-parseInt(n(324))/8)+-parseInt(n(333))/9+parseInt(n(340))/10*(parseInt(n(327))/11))break;r.push(r.shift())}catch(e){r.push(r.shift())}}(n);const r=t(318),i=t(337),o=(e,n,r)=>{const i=t;if(!Array[i(329)](document[i(317)](i(320)))[i(330)]((e=>n[i(321)](e[i(325)])))){const t=document[i(326)](i(314));t[i(328)]=i(316),t[i(325)]=e,document[i(334)][i(339)](t)}};o(r,/fonts\.googleapis\.com\/css2\?family=Poppins/,t(331)),o(i,/font-awesome/,t(336));function s(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}function a(e,t){const n=l();return(a=function(e,t){return n[e-=481]})(e,t)}function l(){const e=["[AutoQuizFill] Creando barra-lateral","initBarraLateral: Error: No se encontraron los elementos necesarios en el DOM.","11343752KKvTkA","22KpHCXe","error","style","px + 10px)","flex","678398IQlucU","width","true","body","left","43943400YnXOsF","941452XGuAvx","false","display","boton-mostrar-ocultar-autoquizfillapp","getBoundingClientRect","insertAdjacentHTML","barraLateralVisible","beforeend","9ymgALa","addEventListener","marginLeft","innerHTML","click","getItem","key","9457144BTRQrr",'<i class="fa-solid fa-angles-right"></i>',"100%","log","46731ReCAOc","5IKeVRS","calc(100% - ","28596oZlKlU","10px","none"];return(l=function(){return e})()}s("/* Estilos para la barra lateral de AutoQuizFillApp */\r\n#barra-lateral-autoquizfillapp {\r\n  width: 27.5%; /* Define el ancho de la barra lateral como el 27.5% del ancho total del viewport */\r\n  min-width: 350px; /* Establece un ancho mínimo para asegurar que la barra no sea demasiado estrecha */\r\n  max-width: 500px; /* Establece un ancho máximo para evitar que la barra lateral ocupe demasiado espacio */\r\n  height: 100%; /* Hace que la barra lateral ocupe el 100% de la altura del viewport */\r\n  position: fixed; /* Posiciona la barra lateral de manera fija en la parte superior e izquierda de la ventana */\r\n  top: 0;\r\n  left: 0;\r\n  background-color: #ecf0f1; /* Define un color de fondo claro para la barra lateral */\r\n  padding: 20px; /* Añade un padding interno de 20px para espaciar el contenido */\r\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Aplica una sombra para darle profundidad y separar visualmente la barra del contenido */\r\n  z-index: 9999; /* Asegura que la barra lateral esté por encima de otros elementos en la página */\r\n  display: flex; /* Configura el layout interno para usar flexbox */\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n  overflow-y: auto; /* Permite el desplazamiento vertical si el contenido excede la altura de la barra */\r\n  scrollbar-width: none; /* Oculta la barra de desplazamiento en Firefox */\r\n  font-family: 'Poppins', sans-serif; /* Aplica la fuente Poppins a todo el contenido dentro de la barra lateral */\r\n}\r\n\r\n/* Estilos para ocultar la barra de desplazamiento en navegadores basados en WebKit (Chrome, Safari, Edge) */\r\n#barra-lateral-autoquizfillapp::-webkit-scrollbar {\r\n  display: none; /* Oculta la barra de desplazamiento en Chrome, Safari y Edge */\r\n}\r\n\r\n/* Estilos para el botón de mostrar/ocultar la barra lateral */\r\n#boton-mostrar-ocultar-autoquizfillapp {\r\n  position: fixed; /* Posiciona el botón de manera fija en la parte superior izquierda, ajustando según el ancho mínimo de la barra */\r\n  top: 20px;\r\n  left: 375px; /* Ajusta según el ancho mínimo */\r\n  z-index: 10000; /* Asegura que el botón esté por encima de otros elementos */\r\n  width: 40px; /* Define el tamaño del botón */\r\n  height: 40px;\r\n  cursor: pointer; /* Cambia el cursor a un puntero para indicar que es interactivo */\r\n  border: none; /* Elimina el borde predeterminado del botón */\r\n  background-color: #3498db; /* Establece un color de fondo azul para el botón */\r\n  color: #ffffff; /* Define el color del texto/icono dentro del botón */\r\n  border-radius: 5px; /* Aplica bordes redondeados al botón */\r\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Añade una sombra para darle profundidad */\r\n  display: flex; /* Configura el layout interno para centrar el contenido (icono) */\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-size: 18px; /* Aumenta el tamaño de la fuente del icono */\r\n}\r\n\r\n/* Estilos para los iconos de FontAwesome */\r\n.fa-classic, .fa-regular, .fa-solid, .far, .fas {\r\n  font-family: \"Font Awesome 6 Free\";\r\n}\r\n\r\n/* Estilos Específicos para Encabezados si se desean personalizar */\r\n#barra-lateral-autoquizfillapp h1,\r\n#barra-lateral-autoquizfillapp .h1 {\r\n    font-size: 2em;          /* Tamaño de fuente específico */\r\n    margin-bottom: 0.67em;   /* Margen inferior específico */\r\n    font-weight: bold;       /* Peso de fuente en negrita */\r\n    line-height: 1.2;        /* Altura de línea */\r\n    color: #333;             /* Color del texto */\r\n}\r\n\r\n#barra-lateral-autoquizfillapp h2,\r\n#barra-lateral-autoquizfillapp .h2 {\r\n    font-size: 1.5em;\r\n    margin-bottom: 0.75em;\r\n    font-weight: bold;\r\n    line-height: 1.2;\r\n    color: #333;\r\n}\r\n\r\n\r\n#barra-lateral-autoquizfillapp h4,\r\n#barra-lateral-autoquizfillapp .h4 {\r\n    font-size: 1em;\r\n    margin-bottom: 1.12em;\r\n    font-weight: bold;\r\n    line-height: 1.2;\r\n    color: #333;\r\n}\r\n\r\n#barra-lateral-autoquizfillapp h5,\r\n#barra-lateral-autoquizfillapp .h5 {\r\n    font-size: 0.83em;\r\n    margin-bottom: 1.5em;\r\n    font-weight: bold;\r\n    line-height: 1.2;\r\n    color: #333;\r\n}\r\n\r\n#barra-lateral-autoquizfillapp h6,\r\n#barra-lateral-autoquizfillapp .h6 {\r\n    font-size: 0.67em;\r\n    margin-bottom: 1.67em;\r\n    font-weight: bold;\r\n    line-height: 1.2;\r\n    color: #333;\r\n}\r\n\r\n/* Estilos para Párrafos dentro de la Barra Lateral */\r\n#barra-lateral-autoquizfillapp p {\r\n    font-size: 1em;\r\n    line-height: 1.5;\r\n    color: #555;\r\n    margin-bottom: 1em;\r\n}\r\n\r\n/* Estilos para Listas dentro de la Barra Lateral */\r\n#barra-lateral-autoquizfillapp ul {\r\n    list-style-type: disc;\r\n    padding-left: 20px;\r\n    margin-bottom: 1em;\r\n}\r\n\r\n#barra-lateral-autoquizfillapp li {\r\n    margin-bottom: 0.5em;\r\n    color: #555;\r\n}\r\n\r\n/* Estilos Adicionales Opcionales */\r\n\r\n/* Enlaces dentro de la Barra Lateral */\r\n#barra-lateral-autoquizfillapp a {\r\n    color: #0066cc;\r\n    text-decoration: none;\r\n}\r\n\r\n#barra-lateral-autoquizfillapp a:hover {\r\n    text-decoration: underline;\r\n}\r\n\r\n\r\n/* Sobrescribir estilos para párrafos dentro de #barra-lateral-autoquizfillapp */\r\n#barra-lateral-autoquizfillapp p {\r\n  margin-top: 0;           /* Restablece el margen superior */\r\n  margin-bottom: 0;        /* Restablece el margen inferior */\r\n  /* Puedes añadir más propiedades para personalizar según tus necesidades */\r\n  /* Por ejemplo: */\r\n  /* font-size: 1rem; */\r\n  /* color: #000; */\r\n}\r\n\r\n/* Sobrescribir el selector universal dentro de #barra-lateral-autoquizfillapp */\r\n#barra-lateral-autoquizfillapp,\r\n#barra-lateral-autoquizfillapp *,\r\n#barra-lateral-autoquizfillapp *::before,\r\n#barra-lateral-autoquizfillapp *::after {\r\n    box-sizing: border-box; /* O el valor que prefieras */\r\n    /* Restablece o define otras propiedades del selector universal si es necesario */\r\n}\r\n\r\n"),function(e){const t=a,n=e();for(;;)try{if(844481===-parseInt(t(488))/1+parseInt(t(483))/2*(parseInt(t(513))/3)+-parseInt(t(494))/4+parseInt(t(514))/5*(-parseInt(t(516))/6)+-parseInt(t(482))/7+-parseInt(t(509))/8*(parseInt(t(502))/9)+parseInt(t(493))/10)break;n.push(n.shift())}catch(e){n.push(n.shift())}}(l),function(){const e=a;console[e(512)](e(519)),document[e(491)][e(499)](e(501),'<div id="barra-lateral-autoquizfillapp">\r\n</div>\r\n<button id="boton-mostrar-ocultar-autoquizfillapp">\r\n  <i class="fa-solid fa-angles-right"></i>\r\n</button>\r\n');const t=document.getElementById("barra-lateral-autoquizfillapp"),n=document.getElementById(e(497));if(!t||!n)return void console[e(484)](e(481));const r=e(510),i='<i class="fa-solid fa-angles-right fa-rotate-180"></i>',o=localStorage[e(507)]("barraLateralVisible");let s=null===o||o===e(490);function l(){const r=e,i=t[r(498)]().width;n[r(485)][r(492)]="calc("+i+r(486)}function c(){const n=e,r=t[n(498)]().width,i=document[n(491)];i.style[n(504)]=r+"px",i[n(485)].width=n(515)+r+"px)"}function u(){const o=e;s?(t[o(485)][o(496)]=o(518),n[o(505)]=r,n[o(485)][o(492)]=o(517),document.body.style.marginLeft="0",document[o(491)][o(485)].width=o(511),s=!1,localStorage.setItem("barraLateralVisible",o(495))):(t.style[o(496)]=o(487),n[o(505)]=i,l(),c(),s=!0,localStorage.setItem(o(500),o(490)))}s?(t[e(485)][e(496)]="flex",n[e(505)]=i):(t.style[e(496)]=e(518),n[e(505)]=r,n[e(485)][e(492)]="10px",document[e(491)][e(485)][e(504)]="0",document.body[e(485)][e(489)]=e(511));new ResizeObserver((()=>{l(),c()})).observe(t),n[e(503)](e(506),(()=>{u()})),document[e(503)]("keydown",(t=>{const n=e;t.ctrlKey&&("q"===t[n(508)]||"Q"===t[n(508)])&&(t.preventDefault(),console.log("keydown: Ctrl + Q detectado"),u())})),s&&c()}();
/**
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
     */
const c=!1,u="${JSCORE_VERSION}",d=function(e,t){if(!e)throw h(t)},h=function(e){return new Error("Firebase Database ("+u+") INTERNAL ASSERT FAILED: "+e)},p=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},f={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],o=t+1<e.length,s=o?e[t+1]:0,a=t+2<e.length,l=a?e[t+2]:0,c=i>>2,u=(3&i)<<4|s>>4;let d=(15&s)<<2|l>>6,h=63&l;a||(h=64,o||(d=64)),r.push(n[c],n[u],n[d],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(p(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(o>>10)),t[r++]=String.fromCharCode(56320+(1023&o))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],o=t<e.length?n[e.charAt(t)]:0;++t;const s=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==o||null==s||null==a)throw new m;const l=i<<2|o>>4;if(r.push(l),64!==s){const e=o<<4&240|s>>2;if(r.push(e),64!==a){const e=s<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
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
     */class m extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const g=function(e){const t=p(e);return f.encodeByteArray(t,!0)},_=function(e){return g(e).replace(/\./g,"")},v=function(e){try{return f.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
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
     */
function y(e){return b(void 0,e)}function b(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=b(e[n],t[n]));return e}
/**
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
     */
const w=()=>
/**
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
     */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,I=()=>{try{return w()||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&v(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},C=e=>{var t,n;return null===(n=null===(t=I())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},E=()=>{var e;return null===(e=I())||void 0===e?void 0:e.config},T=e=>{var t;return null===(t=I())||void 0===t?void 0:t[`_${e}`]};
/**
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
     */
class k{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
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
     */
/**
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
     */
function x(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function S(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(x())}function P(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function R(){return!0===c}class A extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,A.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,N.prototype.create)}}class N{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?function(e,t){return e.replace(O,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",s=`${this.serviceName}: ${o} (${r}).`;return new A(r,s,n)}}const O=/\{\$([^}]+)}/g;
/**
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
     */function D(e){return JSON.parse(e)}function L(e){return JSON.stringify(e)}
/**
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
     */const z=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=D(v(o[0])||""),n=D(v(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}};
/**
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
     */
function M(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function q(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function F(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function U(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function j(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(W(n)&&W(o)){if(!j(n,o))return!1}else if(n!==o)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function W(e){return null!==e&&"object"==typeof e}
/**
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
     */function H(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function B(e){const t={};return e.replace(/^\?/,"").split("&").forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t}function V(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
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
     */class Q{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let r,i,o=this.chain_[0],s=this.chain_[1],a=this.chain_[2],l=this.chain_[3],c=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(r=l^s&(a^l),i=1518500249):(r=s^a^l,i=1859775393):e<60?(r=s&a|l&(s|a),i=2400959708):(r=s^a^l,i=3395469782);const t=(o<<5|o>>>27)+r+c+i+n[e]&4294967295;c=l,l=a,a=4294967295&(s<<30|s>>>2),s=o,o=t}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}}class ${constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=K),void 0===r.error&&(r.error=K),void 0===r.complete&&(r.complete=K);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function K(){}function G(e,t){return`${e} failed: ${t} argument `}
/**
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
     */const Y=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};
/**
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
     */
function J(e){return e&&e._delegate?e._delegate:e}class X{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
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
     */const Z="[DEFAULT]";
/**
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
     */class ee{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new k;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
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
     */(e))try{this.getOrInitializeService({instanceIdentifier:Z})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=Z){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=Z){return this.instances.has(e)}getOptions(e=Z){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===Z?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e=Z){return this.component?this.component.multipleInstances?e:Z:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class te{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ee(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
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
     */var ne;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(ne||(ne={}));const re={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},ie=ne.INFO,oe={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},se=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=oe[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class ae{constructor(e){this.name=e,this._logLevel=ie,this._logHandler=se,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?re[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}let le,ce;const ue=new WeakMap,de=new WeakMap,he=new WeakMap,pe=new WeakMap,fe=new WeakMap;let me={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return de.get(e);if("objectStoreNames"===t)return e.objectStoreNames||he.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ve(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function ge(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(ce||(ce=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(ye(this),t),ve(ue.get(this))}:function(...t){return ve(e.apply(ye(this),t))}:function(t,...n){const r=e.call(ye(this),t,...n);return he.set(r,t.sort?t.sort():[t]),ve(r)}}function _e(e){return"function"==typeof e?ge(e):(e instanceof IDBTransaction&&function(e){if(de.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)}));de.set(e,t)}(e),t=e,(le||(le=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,me):e);var t}function ve(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{t(ve(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&ue.set(t,e)})).catch((()=>{})),fe.set(t,e),t}(e);if(pe.has(e))return pe.get(e);const t=_e(e);return t!==e&&(pe.set(e,t),fe.set(t,e)),t}const ye=e=>fe.get(e);const be=["get","getKey","getAll","getAllKeys","count"],we=["put","add","delete","clear"],Ie=new Map;function Ce(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(Ie.get(t))return Ie.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=we.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!be.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,i?"readwrite":"readonly");let s=o.store;return r&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),i&&o.done]))[0]};return Ie.set(t,o),o}me=(e=>({...e,get:(t,n,r)=>Ce(t,n)||e.get(t,n,r),has:(t,n)=>!!Ce(t,n)||e.has(t,n)}))(me);
/**
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
     */
class Ee{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const Te="@firebase/app",ke="0.10.18",xe=new ae("@firebase/app"),Se="@firebase/app-compat",Pe="@firebase/analytics-compat",Re="@firebase/analytics",Ae="@firebase/app-check-compat",Ne="@firebase/app-check",Oe="@firebase/auth",De="@firebase/auth-compat",Le="@firebase/database",ze="@firebase/data-connect",Me="@firebase/database-compat",qe="@firebase/functions",Fe="@firebase/functions-compat",Ue="@firebase/installations",je="@firebase/installations-compat",We="@firebase/messaging",He="@firebase/messaging-compat",Be="@firebase/performance",Ve="@firebase/performance-compat",Qe="@firebase/remote-config",$e="@firebase/remote-config-compat",Ke="@firebase/storage",Ge="@firebase/storage-compat",Ye="@firebase/firestore",Je="@firebase/vertexai",Xe="@firebase/firestore-compat",Ze="firebase",et="[DEFAULT]",tt={[Te]:"fire-core",[Se]:"fire-core-compat",[Re]:"fire-analytics",[Pe]:"fire-analytics-compat",[Ne]:"fire-app-check",[Ae]:"fire-app-check-compat",[Oe]:"fire-auth",[De]:"fire-auth-compat",[Le]:"fire-rtdb",[ze]:"fire-data-connect",[Me]:"fire-rtdb-compat",[qe]:"fire-fn",[Fe]:"fire-fn-compat",[Ue]:"fire-iid",[je]:"fire-iid-compat",[We]:"fire-fcm",[He]:"fire-fcm-compat",[Be]:"fire-perf",[Ve]:"fire-perf-compat",[Qe]:"fire-rc",[$e]:"fire-rc-compat",[Ke]:"fire-gcs",[Ge]:"fire-gcs-compat",[Ye]:"fire-fst",[Xe]:"fire-fst-compat",[Je]:"fire-vertex","fire-js":"fire-js",[Ze]:"fire-js-all"},nt=new Map,rt=new Map,it=new Map;function ot(e,t){try{e.container.addComponent(t)}catch(n){xe.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function st(e){const t=e.name;if(it.has(t))return xe.debug(`There were multiple attempts to register component ${t}.`),!1;it.set(t,e);for(const t of nt.values())ot(t,e);for(const t of rt.values())ot(t,e);return!0}function at(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function lt(e){return void 0!==e.settings}
/**
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
     */const ct=new N("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
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
     */
class ut{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new X("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ct.create("app-deleted",{appName:this._name})}}
/**
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
     */const dt="11.2.0";function ht(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r=Object.assign({name:et,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw ct.create("bad-app-name",{appName:String(i)});if(n||(n=E()),!n)throw ct.create("no-options");const o=nt.get(i);if(o){if(j(n,o.options)&&j(r,o.config))return o;throw ct.create("duplicate-app",{appName:i})}const s=new te(i);for(const e of it.values())s.addComponent(e);const a=new ut(n,r,s);return nt.set(i,a),a}function pt(e=et){const t=nt.get(e);if(!t&&e===et&&E())return ht();if(!t)throw ct.create("no-app",{appName:e});return t}function ft(e,t,n){var r;let i=null!==(r=tt[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){const e=[`Unable to register library "${i}" with version "${t}":`];return o&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void xe.warn(e.join(" "))}st(new X(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}
/**
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
     */const mt="firebase-heartbeat-store";let gt=null;function _t(){return gt||(gt=function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),a=ve(s);return r&&s.addEventListener("upgradeneeded",(e=>{r(ve(s.result),e.oldVersion,e.newVersion,ve(s.transaction),e)})),n&&s.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),a.then((e=>{o&&e.addEventListener("close",(()=>o())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),a}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(mt)}catch(e){console.warn(e)}}}).catch((e=>{throw ct.create("idb-open",{originalErrorMessage:e.message})}))),gt}async function vt(e,t){try{const n=(await _t()).transaction(mt,"readwrite"),r=n.objectStore(mt);await r.put(t,yt(e)),await n.done}catch(e){if(e instanceof A)xe.warn(e.message);else{const t=ct.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});xe.warn(t.message)}}}function yt(e){return`${e.name}!${e.options.appId}`}
/**
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
     */class bt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new It(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=wt();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some((e=>e.date===r)))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}catch(e){xe.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=wt(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),Ct(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ct(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=_(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return xe.warn(e),""}}}function wt(){return(new Date).toISOString().substring(0,10)}class It{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await _t()).transaction(mt),n=await t.objectStore(mt).get(yt(e));return await t.done,n}catch(e){if(e instanceof A)xe.warn(e.message);else{const t=ct.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});xe.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return vt(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return vt(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Ct(e){return _(JSON.stringify({version:2,heartbeats:e})).length}
/**
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
     */var Et;Et="",st(new X("platform-logger",(e=>new Ee(e)),"PRIVATE")),st(new X("heartbeat",(e=>new bt(e)),"PRIVATE")),ft(Te,ke,Et),ft(Te,ke,"esm2017"),ft("fire-js","");function Tt(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function kt(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}
/**
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
     */
ft("firebase","11.2.0","app"),"function"==typeof SuppressedError&&SuppressedError;const xt=kt,St=new N("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Pt=new ae("@firebase/auth");function Rt(e,...t){Pt.logLevel<=ne.ERROR&&Pt.error(`Auth (${dt}): ${e}`,...t)}
/**
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
     */function At(e,...t){throw Lt(e,...t)}function Nt(e,...t){return Lt(e,...t)}function Ot(e,t,n){const r=Object.assign(Object.assign({},xt()),{[t]:n});return new N("auth","Firebase",r).create(t,{appName:e.name})}function Dt(e){return Ot(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Lt(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return St.create(e,...t)}function zt(e,t,...n){if(!e)throw Lt(t,...n)}function Mt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Rt(t),new Error(t)}function qt(e,t){e||Mt(t)}
/**
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
     */function Ft(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function Ut(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
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
     */function jt(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==Ut()&&"https:"!==Ut()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
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
     */
class Wt{constructor(e,t){this.shortDelay=e,this.longDelay=t,qt(t>e,"Short delay should be less than long delay!"),this.isMobile=S()||P()}get(){return jt()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
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
     */function Ht(e,t){qt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
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
     */class Bt{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void Mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void Mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void Mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
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
     */const Vt={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Qt=new Wt(3e4,6e4);
/**
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
     */function $t(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function Kt(e,t,n,r,i={}){return Gt(e,i,(async()=>{let i={},o={};r&&("GET"===t?o=r:i={body:JSON.stringify(r)});const s=H(Object.assign({key:e.config.apiKey},o)).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const l=Object.assign({method:t,headers:a},i);return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(l.referrerPolicy="no-referrer"),Bt.fetch()(Jt(e,e.config.apiHost,n,s),l)}))}async function Gt(e,t,n){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},Vt),t);try{const t=new Zt(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw en(e,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const t=i.ok?o.errorMessage:o.error.message,[n,s]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw en(e,"credential-already-in-use",o);if("EMAIL_EXISTS"===n)throw en(e,"email-already-in-use",o);if("USER_DISABLED"===n)throw en(e,"user-disabled",o);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(s)throw Ot(e,a,s);At(e,a)}}catch(t){if(t instanceof A)throw t;At(e,"network-request-failed",{message:String(t)})}}async function Yt(e,t,n,r,i={}){const o=await Kt(e,t,n,r,i);return"mfaPendingCredential"in o&&At(e,"multi-factor-auth-required",{_serverResponse:o}),o}function Jt(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?Ht(e.config,i):`${e.config.apiScheme}://${i}`}function Xt(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(Nt(this.auth,"network-request-failed"))),Qt.get())}))}}function en(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Nt(e,t,r);return i.customData._tokenResponse=n,i}function tn(e){return void 0!==e&&void 0!==e.enterprise}class nn{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xt(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function rn(e,t){return Kt(e,"POST","/v1/accounts:lookup",t)}
/**
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
     */function on(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}function sn(e){return 1e3*Number(e)}function an(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return Rt("JWT malformed, contained fewer than 3 sections"),null;try{const e=v(n);return e?JSON.parse(e):(Rt("Failed to decode base64 JWT payload"),null)}catch(e){return Rt("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function ln(e){const t=an(e);return zt(t,"internal-error"),zt(void 0!==t.exp,"internal-error"),zt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
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
     */async function cn(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof A&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
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
     */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class un{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
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
     */class dn{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=on(this.lastLoginAt),this.creationTime=on(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
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
     */async function hn(e){var t;const n=e.auth,r=await e.getIdToken(),i=await cn(e,rn(n,{idToken:r}));zt(null==i?void 0:i.users.length,n,"internal-error");const o=i.users[0];e._notifyReloadListener(o);const s=(null===(t=o.providerUserInfo)||void 0===t?void 0:t.length)?pn(o.providerUserInfo):[],a=(l=e.providerData,c=s,[...l.filter((e=>!c.some((t=>t.providerId===e.providerId)))),...c]);var l,c;const u=e.isAnonymous,d=!(e.email&&o.passwordHash||(null==a?void 0:a.length)),h=!!u&&d,p={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new dn(o.createdAt,o.lastLoginAt),isAnonymous:h};Object.assign(e,p)}function pn(e){return e.map((e=>{var{providerId:t}=e,n=Tt(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}))}
/**
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
     */
/**
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
     */
class fn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){zt(e.idToken,"internal-error"),zt(void 0!==e.idToken,"internal-error"),zt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):ln(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){zt(0!==e.length,"internal-error");const t=ln(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(zt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await async function(e,t){const n=await Gt(e,{},(async()=>{const n=H({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,o=Jt(e,r,"/v1/token",`key=${i}`),s=await e._getAdditionalHeaders();return s["Content-Type"]="application/x-www-form-urlencoded",Bt.fetch()(o,{method:"POST",headers:s,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,o=new fn;return n&&(zt("string"==typeof n,"internal-error",{appName:e}),o.refreshToken=n),r&&(zt("string"==typeof r,"internal-error",{appName:e}),o.accessToken=r),i&&(zt("number"==typeof i,"internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new fn,this.toJSON())}_performRefresh(){return Mt("not implemented")}}
/**
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
     */function mn(e,t){zt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class gn{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=Tt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new un(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new dn(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await cn(this,this.stsTokenManager.getToken(this.auth,e));return zt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=J(e),r=await n.getIdToken(t),i=an(r);zt(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o="object"==typeof i.firebase?i.firebase:void 0,s=null==o?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:on(sn(i.auth_time)),issuedAtTime:on(sn(i.iat)),expirationTime:on(sn(i.exp)),signInProvider:s||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=J(e);await hn(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(zt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>Object.assign({},e))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new gn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){zt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await hn(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(lt(this.auth.app))return Promise.reject(Dt(this.auth));const e=await this.getIdToken();return await cn(this,
/**
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
     */
async function(e,t){return Kt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>Object.assign({},e))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,o,s,a,l,c;const u=null!==(n=t.displayName)&&void 0!==n?n:void 0,d=null!==(r=t.email)&&void 0!==r?r:void 0,h=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,p=null!==(o=t.photoURL)&&void 0!==o?o:void 0,f=null!==(s=t.tenantId)&&void 0!==s?s:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(l=t.createdAt)&&void 0!==l?l:void 0,_=null!==(c=t.lastLoginAt)&&void 0!==c?c:void 0,{uid:v,emailVerified:y,isAnonymous:b,providerData:w,stsTokenManager:I}=t;zt(v&&I,e,"internal-error");const C=fn.fromJSON(this.name,I);zt("string"==typeof v,e,"internal-error"),mn(u,e.name),mn(d,e.name),zt("boolean"==typeof y,e,"internal-error"),zt("boolean"==typeof b,e,"internal-error"),mn(h,e.name),mn(p,e.name),mn(f,e.name),mn(m,e.name),mn(g,e.name),mn(_,e.name);const E=new gn({uid:v,auth:e,email:d,emailVerified:y,displayName:u,isAnonymous:b,photoURL:p,phoneNumber:h,tenantId:f,stsTokenManager:C,createdAt:g,lastLoginAt:_});return w&&Array.isArray(w)&&(E.providerData=w.map((e=>Object.assign({},e)))),m&&(E._redirectEventId=m),E}static async _fromIdTokenResponse(e,t,n=!1){const r=new fn;r.updateFromServerResponse(t);const i=new gn({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await hn(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];zt(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?pn(r.providerUserInfo):[],o=!(r.email&&r.passwordHash||(null==i?void 0:i.length)),s=new fn;s.updateFromIdToken(n);const a=new gn({uid:r.localId,auth:e,stsTokenManager:s,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new dn(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==i?void 0:i.length))};return Object.assign(a,l),a}}
/**
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
     */const _n=new Map;function vn(e){qt(e instanceof Function,"Expected a class definition");let t=_n.get(e);return t?(qt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,_n.set(e,t),t)}
/**
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
     */class yn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}yn.type="NONE";const bn=yn;
/**
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
     */function wn(e,t,n){return`firebase:${e}:${t}:${n}`}class In{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=wn(this.userKey,r.apiKey,i),this.fullPersistenceKey=wn("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?gn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new In(vn(bn),e,n);const r=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=r[0]||vn(bn);const o=wn(n,e.config.apiKey,e.name);let s=null;for(const n of t)try{const t=await n._get(o);if(t){const r=gn._fromJSON(e,t);n!==i&&(s=r),i=n;break}}catch(e){}const a=r.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],s&&await i._set(o,s.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(o)}catch(e){}}))),new In(i,e,n)):new In(i,e,n)}}
/**
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
     */function Cn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(xn(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(En(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Pn(t))return"Blackberry";if(Rn(t))return"Webos";if(Tn(t))return"Safari";if((t.includes("chrome/")||kn(t))&&!t.includes("edge/"))return"Chrome";if(Sn(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function En(e=x()){return/firefox\//i.test(e)}function Tn(e=x()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function kn(e=x()){return/crios\//i.test(e)}function xn(e=x()){return/iemobile/i.test(e)}function Sn(e=x()){return/android/i.test(e)}function Pn(e=x()){return/blackberry/i.test(e)}function Rn(e=x()){return/webos/i.test(e)}function An(e=x()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Nn(){return function(){const e=x();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function On(e=x()){return An(e)||Sn(e)||Rn(e)||Pn(e)||/windows phone/i.test(e)||xn(e)}
/**
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
     */function Dn(e,t=[]){let n;switch(e){case"Browser":n=Cn(x());break;case"Worker":n=`${Cn(x())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${dt}/${r}`}
/**
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
     */class Ln{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,r)=>{try{n(e(t))}catch(e){r(e)}}));n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}
/**
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
     */class zn{constructor(e){var t,n,r,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=o.minPasswordLength)&&void 0!==t?t:6,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),void 0!==o.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),void 0!==o.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),void 0!==o.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),void 0!==o.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,r,i,o,s;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(n=a.meetsMaxPasswordLength)||void 0===n||n),a.isValid&&(a.isValid=null===(r=a.containsLowercaseLetter)||void 0===r||r),a.isValid&&(a.isValid=null===(i=a.containsUppercaseLetter)||void 0===i||i),a.isValid&&(a.isValid=null===(o=a.containsNumericCharacter)||void 0===o||o),a.isValid&&(a.isValid=null===(s=a.containsNonAlphanumericCharacter)||void 0===s||s),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
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
     */class Mn{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fn(this),this.idTokenSubscription=new Fn(this),this.beforeStateQueue=new Ln(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=St,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=vn(t)),this._initializationPromise=this.queue((async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await In.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await rn(this,{idToken:e}),n=await gn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(lt(this.app)){const e=this.app.settings.authIdToken;return e?new Promise((t=>{setTimeout((()=>this.initializeCurrentUserFromIdToken(e).then(t,t)))})):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,o=null==r?void 0:r._redirectEventId,s=await this.tryRedirectSignIn(e);n&&n!==o||!(null==s?void 0:s.user)||(r=s.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(e)))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return zt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await hn(e)}catch(e){if("auth/network-request-failed"!==(null==e?void 0:e.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(lt(this.app))return Promise.reject(Dt(this));const t=e?J(e):null;return t&&zt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&zt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return lt(this.app)?Promise.reject(Dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return lt(this.app)?Promise.reject(Dt(this)):this.queue((async()=>{await this.assertedPersistence.setPersistence(vn(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Kt(e,"GET","/v2/passwordPolicy",$t(e,t))}
/**
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
     */(this),t=new zn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new N("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise(((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged((()=>{n(),e()}),t)}}))}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Kt(e,"POST","/v2/accounts:revokeToken",$t(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&vn(e)||this._popupRedirectResolver;zt(t,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[vn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t);let o=!1;const s=this._isInitialized?Promise.resolve():this._initializationPromise;if(zt(s,this,"internal-error"),s.then((()=>{o||i(this.currentUser)})),"function"==typeof t){const i=e.addObserver(t,n,r);return()=>{o=!0,i()}}{const n=e.addObserver(t);return()=>{o=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return zt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;const t=await(null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){Pt.logLevel<=ne.WARN&&Pt.warn(`Auth (${dt}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function qn(e){return J(e)}class Fn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new $(e,t);return n.subscribe.bind(n)}((e=>this.observer=e))}get next(){return zt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
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
     */let Un={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function jn(e){return Un.loadJS(e)}class Wn{constructor(){this.enterprise=new Hn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Hn{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Bn="NO_RECAPTCHA";class Vn{constructor(e){this.type="recaptcha-enterprise",this.auth=qn(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise((async(t,n)=>{(async function(e,t){return Kt(e,"GET","/v2/recaptchaConfig",$t(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then((r=>{if(void 0!==r.recaptchaKey){const n=new nn(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))})).catch((e=>{n(e)}))}))}function r(t,n,r){const i=window.grecaptcha;tn(i)?i.enterprise.ready((()=>{i.enterprise.execute(t,{action:e}).then((e=>{n(e)})).catch((()=>{n(Bn)}))})):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Wn).execute("siteKey",{action:"verify"})}return new Promise(((e,i)=>{n(this.auth).then((n=>{if(!t&&tn(window.grecaptcha))r(n,e,i);else{if("undefined"==typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=Un.recaptchaEnterpriseScript;0!==t.length&&(t+=n),jn(t).then((()=>{r(n,e,i)})).catch((e=>{i(e)}))}})).catch((e=>{i(e)}))}))}}async function Qn(e,t,n,r=!1,i=!1){const o=new Vn(e);let s;if(i)s=Bn;else try{s=await o.verify(n)}catch(e){s=await o.verify(n,!0)}const a=Object.assign({},t);if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function $n(e,t,n,r,i){var o;if(null===(o=e._getRecaptchaConfig())||void 0===o?void 0:o.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Qn(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch((async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Qn(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)}))}
/**
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
     */function Kn(e,t,n){const r=qn(e);zt(r._canInitEmulator,r,"emulator-config-failed"),zt(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=Gn(t),{host:o,port:s}=function(e){const t=Gn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Yn(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Yn(t)}}}(t),a=null===s?"":`:${s}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:s,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
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
     */()}function Gn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Yn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Jn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Mt("not implemented")}_getIdTokenResponse(e){return Mt("not implemented")}_linkToIdToken(e,t){return Mt("not implemented")}_getReauthenticationResolver(e){return Mt("not implemented")}}async function Xn(e,t){return Kt(e,"POST","/v1/accounts:signUp",t)}
/**
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
     */async function Zn(e,t){return Yt(e,"POST","/v1/accounts:signInWithPassword",$t(e,t))}
/**
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
     */
/**
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
     */
class er extends Jn{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new er(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new er(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return $n(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Zn);case"emailLink":return async function(e,t){return Yt(e,"POST","/v1/accounts:signInWithEmailLink",$t(e,t))}(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return $n(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Xn);case"emailLink":return async function(e,t){return Yt(e,"POST","/v1/accounts:signInWithEmailLink",$t(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
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
     */async function tr(e,t){return Yt(e,"POST","/v1/accounts:signInWithIdp",$t(e,t))}
/**
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
     */class nr extends Jn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new nr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):At("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=Tt(t,["providerId","signInMethod"]);if(!n||!r)return null;const o=new nr(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){return tr(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,tr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=H(t)}return e}}
/**
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
     */class rr{constructor(e){var t,n,r,i,o,s;const a=B(V(e)),l=null!==(t=a.apiKey)&&void 0!==t?t:null,c=null!==(n=a.oobCode)&&void 0!==n?n:null,u=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);zt(l&&c&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=c,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(o=a.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(s=a.tenantId)&&void 0!==s?s:null}static parseLink(e){const t=function(e){const t=B(V(e)).link,n=t?B(V(t)).deep_link_id:null,r=B(V(e)).deep_link_id;return(r?B(V(r)).link:null)||r||n||t||e}(e);try{return new rr(t)}catch(e){return null}}}
/**
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
     */class ir{constructor(){this.providerId=ir.PROVIDER_ID}static credential(e,t){return er._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=rr.parseLink(t);return zt(n,"argument-error"),er._fromEmailAndCode(e,n.code,n.tenantId)}}ir.PROVIDER_ID="password",ir.EMAIL_PASSWORD_SIGN_IN_METHOD="password",ir.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
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
     */
class or{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
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
     */class sr extends or{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
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
     */class ar extends sr{constructor(){super("facebook.com")}static credential(e){return nr._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return ar.credential(e.oauthAccessToken)}catch(e){return null}}}ar.FACEBOOK_SIGN_IN_METHOD="facebook.com",ar.PROVIDER_ID="facebook.com";
/**
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
     */
class lr extends sr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return nr._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return lr.credential(t,n)}catch(e){return null}}}lr.GOOGLE_SIGN_IN_METHOD="google.com",lr.PROVIDER_ID="google.com";
/**
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
     */
class cr extends sr{constructor(){super("github.com")}static credential(e){return nr._fromParams({providerId:cr.PROVIDER_ID,signInMethod:cr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cr.credentialFromTaggedObject(e)}static credentialFromError(e){return cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return cr.credential(e.oauthAccessToken)}catch(e){return null}}}cr.GITHUB_SIGN_IN_METHOD="github.com",cr.PROVIDER_ID="github.com";
/**
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
     */
class ur extends sr{constructor(){super("twitter.com")}static credential(e,t){return nr._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return ur.credential(t,n)}catch(e){return null}}}ur.TWITTER_SIGN_IN_METHOD="twitter.com",ur.PROVIDER_ID="twitter.com";
/**
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
     */
class dr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await gn._fromIdTokenResponse(e,n,r),o=hr(n);return new dr({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=hr(n);return new dr({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function hr(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
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
     */class pr extends A{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,pr.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new pr(e,t,n,r)}}function fr(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw pr._fromErrorAndOperation(e,n,t,r);throw n}))}
/**
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
     */
async function mr(e,t,n=!1){if(lt(e.app))return Promise.reject(Dt(e));const r="signIn",i=await fr(e,r,t),o=await dr._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(o.user),o}function gr(e,t,n){return lt(e.app)?Promise.reject(Dt(e)):async function(e,t){return mr(qn(e),t)}
/**
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
     */(J(e),ir.credential(t,n)).catch((async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&async function(e){const t=qn(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}(e),t}))}const _r="__sak";
/**
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
     */class vr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(_r,"1"),this.storage.removeItem(_r),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
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
     */class yr extends vr{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=On(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Nn()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}yr.type="LOCAL";const br=yr;
/**
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
     */class wr extends vr{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}wr.type="SESSION";const Ir=wr;
/**
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
     */
/**
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
     */
class Cr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new Cr(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!(null==o?void 0:o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const s=Array.from(o).map((async e=>e(t.origin,i))),a=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}})))}(s);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
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
     */
function Er(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
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
     */Cr.receivers=[];class Tr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise(((s,a)=>{const l=Er("",20);r.port1.start();const c=setTimeout((()=>{a(new Error("unsupported_event"))}),n);o={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===l)switch(t.data.status){case"ack":clearTimeout(c),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),s(t.data.response);break;default:clearTimeout(c),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[r.port2])})).finally((()=>{o&&this.removeMessageHandler(o)}))}}
/**
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
     */function kr(){return window}
/**
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
     */
function xr(){return void 0!==kr().WorkerGlobalScope&&"function"==typeof kr().importScripts}
/**
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
     */
const Sr="firebaseLocalStorageDb",Pr="firebaseLocalStorage",Rr="fbase_key";class Ar{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function Nr(e,t){return e.transaction([Pr],t?"readwrite":"readonly").objectStore(Pr)}function Or(){const e=indexedDB.open(Sr,1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(Pr,{keyPath:Rr})}catch(e){n(e)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(Pr)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Sr);return new Ar(e).toPromise()}(),t(await Or()))}))}))}async function Dr(e,t,n){const r=Nr(e,!0).put({[Rr]:t,value:n});return new Ar(r).toPromise()}function Lr(e,t){const n=Nr(e,!0).delete(t);return new Ar(n).toPromise()}class zr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await Or()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return xr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cr._getInstance(xr()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Tr(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Or();return await Dr(e,_r,"1"),await Lr(e,_r),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Dr(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=Nr(e,!1).get(t),r=await new Ar(n).toPromise();return void 0===r?null:r.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>Lr(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Nr(e,!1).getAll();return new Ar(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}zr.type="LOCAL";const Mr=zr;new Wt(3e4,6e4);
/**
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
     */
class qr extends Jn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Fr(e){return mr(e.auth,new qr(e),e.bypassAuthState)}function Ur(e){const{auth:t,user:n}=e;return zt(n,t,"internal-error"),
/**
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
     */
async function(e,t,n=!1){const{auth:r}=e;if(lt(r.app))return Promise.reject(Dt(r));const i="reauthenticate";try{const o=await cn(e,fr(r,i,t,e),n);zt(o.idToken,r,"internal-error");const s=an(o.idToken);zt(s,r,"internal-error");const{sub:a}=s;return zt(e.uid===a,r,"user-mismatch"),dr._forOperation(e,i,o)}catch(e){throw"auth/user-not-found"===(null==e?void 0:e.code)&&At(r,"user-mismatch"),e}}(n,new qr(e),e.bypassAuthState)}async function jr(e){const{auth:t,user:n}=e;return zt(n,t,"internal-error"),async function(e,t,n=!1){const r=await cn(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return dr._forOperation(e,"link",r)}(n,new qr(e),e.bypassAuthState)}
/**
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
     */class Wr{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:o,type:s}=e;if(o)return void this.reject(o);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(s)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Fr;case"linkViaPopup":case"linkViaRedirect":return jr;case"reauthViaPopup":case"reauthViaRedirect":return Ur;default:At(this.auth,"internal-error")}}resolve(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
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
     */const Hr=new Wt(2e3,1e4);class Br extends Wr{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,Br.currentPopupAction&&Br.currentPopupAction.cancel(),Br.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return zt(e,this.auth,"internal-error"),e}async onExecution(){qt(1===this.filter.length,"Popup operations only handle one event");const e=Er();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(Nt(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(Nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Br.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Nt(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(e,Hr.get())};e()}}Br.currentPopupAction=null;
/**
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
     */
const Vr="pendingRedirect",Qr=new Map;class $r extends Wr{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Qr.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return wn(Vr,e.config.apiKey,e.name)}(t),r=function(e){return vn(e._redirectPersistence)}(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Qr.set(this.auth._key(),e)}return this.bypassAuthState||Qr.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Kr(e,t){Qr.set(e._key(),t)}async function Gr(e,t,n=!1){if(lt(e.app))return Promise.reject(Dt(e));const r=qn(e),i=
/**
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
     */
function(e,t){return t?vn(t):(zt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(r,t),o=new $r(r,i,n),s=await o.execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}
/**
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
     */class Yr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xr(e);default:return!1}}
/**
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
     */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Xr(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(Nt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jr(e))}saveEventToCache(e){this.cachedEventUids.add(Jr(e)),this.lastProcessedEventTime=Date.now()}}function Jr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function Xr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
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
     */
const Zr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ei=/^https?/;async function ti(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Kt(e,"GET","/v1/projects",t)}(e);for(const e of t)try{if(ni(e))return}catch(e){}At(e,"unauthorized-domain")}function ni(e){const t=Ft(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!ei.test(n))return!1;if(Zr.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
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
     */const ri=new Wt(3e4,6e4);function ii(){const e=kr().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}function oi(e){return new Promise(((t,n)=>{var r,i,o;function s(){ii(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{ii(),n(Nt(e,"network-request-failed"))},timeout:ri.get()})}if(null===(i=null===(r=kr().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(o=kr().gapi)||void 0===o?void 0:o.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return kr()[t]=()=>{gapi.load?s():n(Nt(e,"network-request-failed"))},jn(`${Un.gapiScript}?onload=${t}`).catch((e=>n(e)))}s()}})).catch((e=>{throw si=null,e}))}let si=null;
/**
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
     */
const ai=new Wt(5e3,15e3),li={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ci=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ui(e){const t=e.config;zt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Ht(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:dt},i=ci.get(e.config.apiHost);i&&(r.eid=i);const o=e._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${H(r).slice(1)}`}async function di(e){const t=await function(e){return si=si||oi(e),si}(e),n=kr().gapi;return zt(n,e,"internal-error"),t.open({where:document.body,url:ui(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:li,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=Nt(e,"network-request-failed"),o=kr().setTimeout((()=>{r(i)}),ai.get());function s(){kr().clearTimeout(o),n(t)}t.ping(s).then(s,(()=>{r(i)}))}))))}
/**
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
     */const hi={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class pi{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function fi(e,t,n,r=500,i=600){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},hi),{width:r.toString(),height:i.toString(),top:o,left:s}),c=x().toLowerCase();n&&(a=kn(c)?"_blank":n),En(c)&&(t=t||"http://localhost",l.scrollbars="yes");const u=Object.entries(l).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(function(e=x()){var t;return An(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(c)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
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
     */(t||"",a),new pi(null);const d=window.open(t||"",a,u);zt(d,e,"popup-blocked");try{d.focus()}catch(e){}return new pi(d)}const mi="__/auth/handler",gi="emulator/auth/handler",_i=encodeURIComponent("fac");async function vi(e,t,n,r,i,o){zt(e.config.authDomain,e,"auth-domain-config-required"),zt(e.config.apiKey,e,"invalid-api-key");const s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:dt,eventId:i};if(t instanceof or){t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",F(t.getCustomParameters())||(s.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))s[e]=t}if(t instanceof sr){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(s.scopes=e.join(","))}e.tenantId&&(s.tid=e.tenantId);const a=s;for(const e of Object.keys(a))void 0===a[e]&&delete a[e];const l=await e._getAppCheckToken(),c=l?`#${_i}=${encodeURIComponent(l)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${mi}`;return Ht(e,gi)}
/**
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
     */(e)}?${H(a).slice(1)}${c}`}const yi="webStorageSupport";const bi=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ir,this._completeRedirectFn=Gr,this._overrideRedirectResult=Kr}async _openPopup(e,t,n,r){var i;qt(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return fi(e,await vi(e,t,n,Ft(),r),Er())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){kr().location.href=e}(await vi(e,t,n,Ft(),r)),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(qt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await di(e),n=new Yr(e);return t.register("authEvent",(t=>{zt(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(yi,{type:yi},(n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[yi];void 0!==i&&t(!!i),At(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ti(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return On()||Tn()||An()}};var wi="@firebase/auth",Ii="1.8.2";
/**
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
     */
class Ci{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){zt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
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
     */
/**
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
     */
const Ei=T("authIdTokenMaxAge")||300;let Ti=null;var ki,xi;ki={loadJS:e=>new Promise(((t,n)=>{const r=document.createElement("script");var i,o;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=Nt("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(null!==(o=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==o?o:document).appendChild(r)})),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},Un=ki,xi="Browser",st(new X("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:s}=n.options;zt(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:o,authDomain:s,clientPlatform:xi,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dn(xi)},l=new Mn(n,r,i,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(vn);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(l,t),l}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),st(new X("auth-internal",(e=>(e=>new Ci(e))(qn(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),ft(wi,Ii,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(xi)),ft(wi,Ii,"esm2017");const Si="@firebase/database",Pi="1.0.11";
/**
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
     */
let Ri="";
/**
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
     */
class Ai{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),L(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:D(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}
/**
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
     */class Ni{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return M(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}
/**
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
     */const Oi=function(e){try{if("undefined"!=typeof window&&void 0!==window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new Ai(t)}}catch(e){}return new Ni},Di=Oi("localStorage"),Li=Oi("sessionStorage"),zi=new ae("@firebase/database"),Mi=function(){let e=1;return function(){return e++}}(),qi=function(e){const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const t=i-55296;r++,d(r<e.length,"Surrogate pair missing trail surrogate."),i=65536+(t<<10)+(e.charCodeAt(r)-56320)}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t}(e),n=new Q;n.update(t);const r=n.digest();return f.encodeByteArray(r)},Fi=function(...e){let t="";for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)||r&&"object"==typeof r&&"number"==typeof r.length?t+=Fi.apply(null,r):t+="object"==typeof r?L(r):r,t+=" "}return t};let Ui=null,ji=!0;const Wi=function(...e){var t;if(!0===ji&&(ji=!1,null===Ui&&!0===Li.get("logging_enabled")&&(d(!t,"Can't turn on custom loggers persistently."),zi.logLevel=ne.VERBOSE,Ui=zi.log.bind(zi))),Ui){const t=Fi.apply(null,e);Ui(t)}},Hi=function(e){return function(...t){Wi(e,...t)}},Bi=function(...e){const t="FIREBASE INTERNAL ERROR: "+Fi(...e);zi.error(t)},Vi=function(...e){const t=`FIREBASE FATAL ERROR: ${Fi(...e)}`;throw zi.error(t),new Error(t)},Qi=function(...e){const t="FIREBASE WARNING: "+Fi(...e);zi.warn(t)},$i=function(e){return"number"==typeof e&&(e!=e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},Ki="[MIN_NAME]",Gi="[MAX_NAME]",Yi=function(e,t){if(e===t)return 0;if(e===Ki||t===Gi)return-1;if(t===Ki||e===Gi)return 1;{const n=io(e),r=io(t);return null!==n?null!==r?n-r==0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},Ji=function(e,t){return e===t?0:e<t?-1:1},Xi=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+L(t))},Zi=function(e){if("object"!=typeof e||null===e)return L(e);const t=[];for(const n in e)t.push(n);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=L(t[r]),n+=":",n+=Zi(e[t[r]]);return n+="}",n},eo=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function to(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const no=function(e){d(!$i(e),"Invalid JSON number");const t=1023;let n,r,i,o,s;0===e?(r=0,i=0,n=1/e==-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(o=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=o+t,i=Math.round(e*Math.pow(2,52-o)-Math.pow(2,52))):(r=0,i=Math.round(e/Math.pow(2,-1074))));const a=[];for(s=52;s;s-=1)a.push(i%2?1:0),i=Math.floor(i/2);for(s=11;s;s-=1)a.push(r%2?1:0),r=Math.floor(r/2);a.push(n?1:0),a.reverse();const l=a.join("");let c="";for(s=0;s<64;s+=8){let e=parseInt(l.substr(s,8),2).toString(16);1===e.length&&(e="0"+e),c+=e}return c.toLowerCase()};const ro=new RegExp("^-?(0*)\\d{1,10}$"),io=function(e){if(ro.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},oo=function(e){try{e()}catch(e){setTimeout((()=>{const t=e.stack||"";throw Qi("Exception was thrown by user callback.",t),e}),Math.floor(0))}},so=function(e,t){const n=setTimeout(e,t);return"number"==typeof n&&"undefined"!=typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"==typeof n&&n.unref&&n.unref(),n};
/**
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
     */
class ao{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=null==t?void 0:t.getImmediate({optional:!0}),this.appCheck||null==t||t.get().then((e=>this.appCheck=e))}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise(((t,n)=>{setTimeout((()=>{this.appCheck?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){var t;null===(t=this.appCheckProvider)||void 0===t||t.get().then((t=>t.addTokenListener(e)))}notifyForInvalidToken(){Qi(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}
/**
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
     */class lo{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit((e=>this.auth_=e))}getToken(e){return this.auth_?this.auth_.getToken(e).catch((e=>e&&"auth/token-not-initialized"===e.code?(Wi("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e))):new Promise(((t,n)=>{setTimeout((()=>{this.auth_?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then((t=>t.addAuthTokenListener(e)))}removeTokenChangeListener(e){this.authProvider_.get().then((t=>t.removeAuthTokenListener(e)))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Qi(e)}}class co{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}co.OWNER="owner";
/**
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
     */
const uo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ho="ac",po="websocket",fo="long_polling";
/**
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
     */
class mo{constructor(e,t,n,r,i=!1,o="",s=!1,a=!1){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=s,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Di.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Di.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function go(e,t,n){let r;if(d("string"==typeof t,"typeof type must == string"),d("object"==typeof n,"typeof params must == object"),t===po)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==fo)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const i=[];return to(n,((e,t)=>{i.push(e+"="+t)})),r+i.join("&")}
/**
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
     */class _o{constructor(){this.counters_={}}incrementCounter(e,t=1){M(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return y(this.counters_)}}
/**
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
     */const vo={},yo={};function bo(e){const t=e.toString();return vo[t]||(vo[t]=new _o),vo[t]}
/**
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
     */
class wo{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&oo((()=>{this.onMessage_(e[t])}));if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}
/**
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
     */const Io="start";class Co{constructor(e,t,n,r,i,o,s){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=s,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Hi(e),this.stats_=bo(t),this.urlFn=e=>(this.appCheckToken&&(e[ho]=this.appCheckToken),go(t,fo,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new wo(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout((()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null}),Math.floor(3e4)),function(e){if("complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",(()=>{"complete"===document.readyState&&n()})),window.attachEvent("onload",n))}}((()=>{if(this.isClosed_)return;this.scriptTagHolder=new Eo(((...e)=>{const[t,n,r,i,o]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===Io)this.id=n,this.password=r;else{if("close"!==t)throw new Error("Unrecognized command received: "+t);n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,(()=>{this.onClosed_()}))):this.onClosed_()}}),((...e)=>{const[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)}),(()=>{this.onClosed_()}),this.urlFn);const e={};e[Io]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v="5",this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[ho]=this.appCheckToken),"undefined"!=typeof location&&location.hostname&&uo.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,(()=>{}))}))}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Co.forceAllow_=!0}static forceDisallow(){Co.forceDisallow_=!0}static isAvailable(){return!!Co.forceAllow_||!(Co.forceDisallow_||"undefined"==typeof document||null==document.createElement||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.UI)}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=L(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=g(t),r=eo(n,1840);for(let e=0;e<r.length;e++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[e]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=L(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Eo{constructor(e,t,n,r){this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Mi(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=Eo.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){n='<script>document.domain="'+document.domain+'";<\/script>'}const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(e){Wi("frame writing exception"),e.stack&&Wi(e.stack),Wi(e)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||Wi("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout((()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)}),Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3));this.addTag(e,(()=>{clearTimeout(r),n()}))}addTag(e,t){setTimeout((()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Wi("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(e){}}),Math.floor(1))}}
/**
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
     */let To=null;"undefined"!=typeof MozWebSocket?To=MozWebSocket:"undefined"!=typeof WebSocket&&(To=WebSocket);class ko{constructor(e,t,n,r,i,o,s){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Hi(this.connId),this.stats_=bo(t),this.connURL=ko.connectionURL_(t,o,s,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const o={v:"5"};return"undefined"!=typeof location&&location.hostname&&uo.test(location.hostname)&&(o.r="f"),t&&(o.s=t),n&&(o.ls=n),r&&(o[ho]=r),i&&(o.p=i),go(e,po,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Di.set("previous_websocket_failure",!0);try{let e;R(),this.mySock=new To(this.connURL,[],e)}catch(e){this.log_("Error instantiating WebSocket.");const t=e.message||e.data;return t&&this.log_(t),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){ko.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!=typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==To&&!ko.forceDisallow_}static previouslyFailed(){return Di.isInMemoryStorage||!0===Di.get("previous_websocket_failure")}markConnectionHealthy(){Di.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=D(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(d(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=L(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=eo(t,16384);n.length>1&&this.sendString_(String(n.length));for(let e=0;e<n.length;e++)this.sendString_(n[e])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval((()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()}),Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ko.responsesRequiredToBeHealthy=2,ko.healthyTimeout=3e4;
/**
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
     */
class xo{static get ALL_TRANSPORTS(){return[Co,ko]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ko.isAvailable();let n=t&&!ko.previouslyFailed();if(e.webSocketOnly&&(t||Qi("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[ko];else{const e=this.transports_=[];for(const t of xo.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);xo.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xo.globalTransportInitialized_=!1;class So{constructor(e,t,n,r,i,o,s,a,l,c){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=s,this.onDisconnect_=a,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Hi("c:"+this.id+":"),this.transportManager_=new xo(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout((()=>{this.conn_&&this.conn_.open(t,n)}),Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=so((()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))}),Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Xi("t",e),n=Xi("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Xi("t",e),n=Xi("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Xi("t",e);if("d"in e){const n=e.d;if("h"===t){const e=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?Bi("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Bi("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),"5"!==n&&Qi("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),so((()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())}),Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):so((()=>{this.sendPingOnPrimaryIfNecessary_()}),Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Di.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}
/**
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
     */class Po{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}
/**
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
     */class Ro{constructor(e){this.allowedEvents_=e,this.listeners_={},d(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let e=0;e<r.length;e++)if(r[e].callback===t&&(!n||n===r[e].context))return void r.splice(e,1)}validateEventType_(e){d(this.allowedEvents_.find((t=>t===e)),"Unknown event: "+e)}}
/**
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
     */class Ao extends Ro{static getInstance(){return new Ao}constructor(){super(["online"]),this.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||S()||(window.addEventListener("online",(()=>{this.online_||(this.online_=!0,this.trigger("online",!0))}),!1),window.addEventListener("offline",(()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))}),!1))}getInitialEvent(e){return d("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}
/**
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
     */class No{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function Oo(){return new No("")}function Do(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function Lo(e){return e.pieces_.length-e.pieceNum_}function zo(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new No(e.pieces_,t)}function Mo(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function qo(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Fo(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new No(t,0)}function Uo(e,t){const n=[];for(let t=e.pieceNum_;t<e.pieces_.length;t++)n.push(e.pieces_[t]);if(t instanceof No)for(let e=t.pieceNum_;e<t.pieces_.length;e++)n.push(t.pieces_[e]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new No(n,0)}function jo(e){return e.pieceNum_>=e.pieces_.length}function Wo(e,t){const n=Do(e),r=Do(t);if(null===n)return t;if(n===r)return Wo(zo(e),zo(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function Ho(e,t){if(Lo(e)!==Lo(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Bo(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(Lo(e)>Lo(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Vo{constructor(e,t){this.errorPrefix_=t,this.parts_=qo(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let e=0;e<this.parts_.length;e++)this.byteLength_+=Y(this.parts_[e]);Qo(this)}}function Qo(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+$o(e))}function $o(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}
/**
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
     */class Ko extends Ro{static getInstance(){return new Ko}constructor(){let e,t;super(["visible"]),"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,(()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))}),!1)}getInitialEvent(e){return d("visible"===e,"Unknown event type: "+e),[this.visible_]}}
/**
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
     */const Go=1e3;class Yo extends Po{constructor(e,t,n,r,i,o,s,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=s,this.authOverride_=a,this.id=Yo.nextPersistentConnectionId_++,this.log_=Hi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Go,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a&&!R())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ko.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&Ao.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_(L(i)),d(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new k,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),d(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),d(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const s={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(o).set(i,s),this.connected_&&this.sendListen_(s)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,(n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)}))}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,(i=>{const o=i.d,s=i.s;Yo.warnOnListenWarnings_(o,t);(this.listens.get(n)&&this.listens.get(n).get(r))===e&&(this.log_("listen response",i),"ok"!==s&&this.removeListen_(n,r),e.onComplete&&e.onComplete(s,o))}))}static warnOnListenWarnings_(e,t){if(e&&"object"==typeof e&&M(e,"w")){const n=q(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();Qi(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},(()=>{})),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||function(e){const t=z(e).claims;return"object"==typeof t&&!0===t.admin}(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},(()=>{}))}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=function(e){const t=z(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")}(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"==typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,(t=>{const n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))}))}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},(e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)}))}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),d(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,(e=>{r&&setTimeout((()=>{r(e.s,e.d)}),Math.floor(0))}))}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const o={p:t,d:n};void 0!==i&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const s=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(s):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,(n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)}))}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,(e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}}))}}onDataMessage_(e){if("r"in e){this.log_("from server: "+L(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):Bi("Unrecognized action received from server: "+L(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){d(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout((()=>{this.establishConnectionTimer_=null,this.establishConnection_()}),Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Go,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Go,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=Go),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=(new Date).getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Yo.nextConnectionId_++,i=this.lastSessionId;let o=!1,s=null;const a=function(){s?s.close():(o=!0,n())},l=function(e){d(s,"sendRequest call when we're not connected not allowed."),s.sendRequest(e)};this.realtime_={close:a,sendRequest:l};const c=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[a,l]=await Promise.all([this.authTokenProvider_.getToken(c),this.appCheckTokenProvider_.getToken(c)]);o?Wi("getToken() completed but was canceled"):(Wi("getToken() completed. Creating connection."),this.authToken_=a&&a.accessToken,this.appCheckToken_=l&&l.token,s=new So(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,(e=>{Qi(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")}),i))}catch(e){this.log_("Failed to get token: "+e),o||(this.repoInfo_.nodeAdmin&&Qi(e),a())}}}interrupt(e){Wi("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Wi("Resuming connection for reason: "+e),delete this.interruptReasons_[e],F(this.interruptReasons_)&&(this.reconnectDelay_=Go,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map((e=>Zi(e))).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new No(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){Wi("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Wi("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};e["sdk.js."+Ri.replace(/\./g,"-")]=1,S()?e["framework.cordova"]=1:P()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ao.getInstance().currentlyOnline();return F(this.interruptReasons_)&&e}}Yo.nextPersistentConnectionId_=0,Yo.nextConnectionId_=0;
/**
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
     */
class Jo{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Jo(e,t)}}
/**
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
     */class Xo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Jo(Ki,e),r=new Jo(Ki,t);return 0!==this.compare(n,r)}minPost(){return Jo.MIN}}
/**
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
     */let Zo;class es extends Xo{static get __EMPTY_NODE(){return Zo}static set __EMPTY_NODE(e){Zo=e}compare(e,t){return Yi(e.name,t.name)}isDefinedOn(e){throw h("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Jo.MIN}maxPost(){return new Jo(Gi,Zo)}makePost(e,t){return d("string"==typeof e,"KeyIndex indexValue must always be a string."),new Jo(e,Zo)}toString(){return".key"}}const ts=new es;
/**
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
     */class ns{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(o=t?n(e.key,t):1,r&&(o*=-1),o<0)e=this.isReverse_?e.left:e.right;else{if(0===o){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class rs{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:rs.RED,this.left=null!=r?r:is.EMPTY_NODE,this.right=null!=i?i:is.EMPTY_NODE}copy(e,t,n,r,i){return new rs(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return is.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return is.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,rs.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,rs.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}rs.RED=!0,rs.BLACK=!1;class is{constructor(e,t=is.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new is(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,rs.BLACK,null,null))}remove(e){return new is(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,rs.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ns(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ns(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ns(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ns(this.root_,null,this.comparator_,!0,e)}}
/**
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
     */
function os(e,t){return Yi(e.name,t.name)}function ss(e,t){return Yi(e,t)}
/**
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
     */let as;is.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new rs(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const ls=function(e){return"number"==typeof e?"number:"+no(e):"string:"+e},cs=function(e){if(e.isLeafNode()){const t=e.val();d("string"==typeof t||"number"==typeof t||"object"==typeof t&&M(t,".sv"),"Priority must be a string or number.")}else d(e===as||e.isEmpty(),"priority of unexpected type.");d(e===as||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};
/**
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
     */
let us,ds,hs;class ps{static set __childrenNodeConstructor(e){us=e}static get __childrenNodeConstructor(){return us}constructor(e,t=ps.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,d(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),cs(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ps(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:ps.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return jo(e)?this:".priority"===Do(e)?this.priorityNode_:ps.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:ps.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Do(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:(d(".priority"!==n||1===Lo(e),".priority must be the last token in a path"),this.updateImmediateChild(n,ps.__childrenNodeConstructor.EMPTY_NODE.updateChild(zo(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ls(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?no(this.value_):this.value_,this.lazyHash_=qi(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ps.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ps.__childrenNodeConstructor?-1:(d(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=ps.VALUE_TYPE_ORDER.indexOf(t),i=ps.VALUE_TYPE_ORDER.indexOf(n);return d(r>=0,"Unknown leaf type: "+t),d(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}ps.VALUE_TYPE_ORDER=["object","boolean","number","string"];const fs=new class extends Xo{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?Yi(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Jo.MIN}maxPost(){return new Jo(Gi,new ps("[PRIORITY-POST]",hs))}makePost(e,t){const n=ds(e);return new Jo(t,new ps("[PRIORITY-POST]",n))}toString(){return".priority"}},ms=Math.log(2);
/**
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
     */class gs{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/ms,10)),this.current_=this.count-1;const n=(r=this.count,parseInt(Array(r+1).join("1"),2));var r;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const _s=function(e,t,n,r){e.sort(t);const i=function(t,r){const o=r-t;let s,a;if(0===o)return null;if(1===o)return s=e[t],a=n?n(s):s,new rs(a,s.node,rs.BLACK,null,null);{const l=parseInt(o/2,10)+t,c=i(t,l),u=i(l+1,r);return s=e[l],a=n?n(s):s,new rs(a,s.node,rs.BLACK,c,u)}},o=function(t){let r=null,o=null,s=e.length;const a=function(t,r){const o=s-t,a=s;s-=t;const c=i(o+1,a),u=e[o],d=n?n(u):u;l(new rs(d,u.node,r,null,c))},l=function(e){r?(r.left=e,r=e):(o=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?a(r,rs.BLACK):(a(r,rs.BLACK),a(r,rs.RED))}return o}(new gs(e.length));return new is(r||t,o)};
/**
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
     */let vs;const ys={};class bs{static get Default(){return d(fs,"ChildrenNode.ts has not been loaded"),vs=vs||new bs({".priority":ys},{".priority":fs}),vs}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=q(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof is?t:null}hasIndex(e){return M(this.indexSet_,e.toString())}addIndex(e,t){d(e!==ts,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(Jo.Wrap);let o,s=i.getNext();for(;s;)r=r||e.isDefinedOn(s.node),n.push(s),s=i.getNext();o=r?_s(n,e.getCompare()):ys;const a=e.toString(),l=Object.assign({},this.indexSet_);l[a]=e;const c=Object.assign({},this.indexes_);return c[a]=o,new bs(c,l)}addToIndexes(e,t){const n=U(this.indexes_,((n,r)=>{const i=q(this.indexSet_,r);if(d(i,"Missing index implementation for "+r),n===ys){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(Jo.Wrap);let o=r.getNext();for(;o;)o.name!==e.name&&n.push(o),o=r.getNext();return n.push(e),_s(n,i.getCompare())}return ys}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new Jo(e.name,r))),i.insert(e,e.node)}}));return new bs(n,this.indexSet_)}removeFromIndexes(e,t){const n=U(this.indexes_,(n=>{if(n===ys)return n;{const r=t.get(e.name);return r?n.remove(new Jo(e.name,r)):n}}));return new bs(n,this.indexSet_)}}
/**
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
     */let ws;class Is{static get EMPTY_NODE(){return ws||(ws=new Is(new is(ss),null,bs.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&cs(this.priorityNode_),this.children_.isEmpty()&&d(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ws}updatePriority(e){return this.children_.isEmpty()?this:new Is(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?ws:t}}getChild(e){const t=Do(e);return null===t?this:this.getImmediateChild(t).getChild(zo(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if(d(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new Jo(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const o=r.isEmpty()?ws:this.priorityNode_;return new Is(r,o,i)}}updateChild(e,t){const n=Do(e);if(null===n)return t;{d(".priority"!==Do(e)||1===Lo(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(zo(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(fs,((o,s)=>{t[o]=s.val(e),n++,i&&Is.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1})),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+ls(this.getPriority().val())+":"),this.forEachChild(fs,((t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)})),this.lazyHash_=""===e?"":qi(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new Jo(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Jo(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Jo(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal((e=>t(e.name,e.node))):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,(e=>e));{const n=this.children_.getIteratorFrom(e.name,Jo.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,(e=>e));{const n=this.children_.getReverseIteratorFrom(e.name,Jo.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Cs?-1:0}withIndex(e){if(e===ts||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Is(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ts||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(fs),n=t.getIterator(fs);let r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===ts?null:this.indexMap_.get(e.toString())}}Is.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const Cs=new class extends Is{constructor(){super(new is(ss),Is.EMPTY_NODE,bs.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Is.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(Jo,{MIN:{value:new Jo(Ki,Is.EMPTY_NODE)},MAX:{value:new Jo(Gi,Cs)}}),es.__EMPTY_NODE=Is.EMPTY_NODE,ps.__childrenNodeConstructor=Is,as=Cs,function(e){hs=e}(Cs);function Es(e,t=null){if(null===e)return Is.EMPTY_NODE;if("object"==typeof e&&".priority"in e&&(t=e[".priority"]),d(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!=typeof e||".sv"in e){return new ps(e,Es(t))}if(e instanceof Array){let n=Is.EMPTY_NODE;return to(e,((t,r)=>{if(M(e,t)&&"."!==t.substring(0,1)){const e=Es(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}})),n.updatePriority(Es(t))}{const n=[];let r=!1;if(to(e,((e,t)=>{if("."!==e.substring(0,1)){const i=Es(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new Jo(e,i)))}})),0===n.length)return Is.EMPTY_NODE;const i=_s(n,os,(e=>e.name),ss);if(r){const e=_s(n,fs.getCompare());return new Is(i,Es(t),new bs({".priority":e},{".priority":fs}))}return new Is(i,Es(t),bs.Default)}}!function(e){ds=e}(Es);
/**
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
     */
class Ts extends Xo{constructor(e){super(),this.indexPath_=e,d(!jo(e)&&".priority"!==Do(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?Yi(e.name,t.name):i}makePost(e,t){const n=Es(e),r=Is.EMPTY_NODE.updateChild(this.indexPath_,n);return new Jo(t,r)}maxPost(){const e=Is.EMPTY_NODE.updateChild(this.indexPath_,Cs);return new Jo(Gi,e)}toString(){return qo(this.indexPath_,0).join("/")}}
/**
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
     */const ks=new class extends Xo{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?Yi(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Jo.MIN}maxPost(){return Jo.MAX}makePost(e,t){const n=Es(e);return new Jo(t,n)}toString(){return".value"}};
/**
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
     */function xs(e){return{type:"value",snapshotNode:e}}function Ss(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function Ps(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function Rs(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}
/**
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
     */
class As{constructor(e){this.index_=e}updateChild(e,t,n,r,i,o){d(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const s=e.getImmediateChild(t);return s.getChild(r).equals(n.getChild(r))&&s.isEmpty()===n.isEmpty()?e:(null!=o&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(Ps(t,s)):d(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):s.isEmpty()?o.trackChildChange(Ss(t,n)):o.trackChildChange(Rs(t,n,s))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(fs,((e,r)=>{t.hasChild(e)||n.trackChildChange(Ps(e,r))})),t.isLeafNode()||t.forEachChild(fs,((t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(Rs(t,r,i))}else n.trackChildChange(Ss(t,r))}))),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?Is.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}
/**
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
     */class Ns{constructor(e){this.indexedFilter_=new As(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ns.getStartPost_(e),this.endPost_=Ns.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,o){return this.matches(new Jo(t,n))||(n=Is.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=Is.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(Is.EMPTY_NODE);const i=this;return t.forEachChild(fs,((e,t)=>{i.matches(new Jo(e,t))||(r=r.updateImmediateChild(e,Is.EMPTY_NODE))})),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}
/**
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
     */class Os{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new Ns(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,o){return this.rangedFilter_.matches(new Jo(t,n))||(n=Is.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,o):this.fullLimitUpdateChild_(e,t,n,i,o)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=Is.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=Is.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(Is.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,Is.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let o;if(this.reverse_){const e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();const s=e;d(s.numChildren()===this.limit_,"");const a=new Jo(t,n),l=this.reverse_?s.getFirstChild(this.index_):s.getLastChild(this.index_),c=this.rangedFilter_.matches(a);if(s.hasChild(t)){const e=s.getImmediateChild(t);let u=r.getChildAfterChild(this.index_,l,this.reverse_);for(;null!=u&&(u.name===t||s.hasChild(u.name));)u=r.getChildAfterChild(this.index_,u,this.reverse_);const d=null==u?1:o(u,a);if(c&&!n.isEmpty()&&d>=0)return null!=i&&i.trackChildChange(Rs(t,n,e)),s.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(Ps(t,e));const n=s.updateImmediateChild(t,Is.EMPTY_NODE);return null!=u&&this.rangedFilter_.matches(u)?(null!=i&&i.trackChildChange(Ss(u.name,u.node)),n.updateImmediateChild(u.name,u.node)):n}}return n.isEmpty()?e:c&&o(l,a)>=0?(null!=i&&(i.trackChildChange(Ps(l.name,l.node)),i.trackChildChange(Ss(t,n))),s.updateImmediateChild(t,n).updateImmediateChild(l.name,Is.EMPTY_NODE)):e}}
/**
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
     */class Ds{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=fs}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return d(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return d(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ki}hasEnd(){return this.endSet_}getIndexEndValue(){return d(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return d(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Gi}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return d(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===fs}copy(){const e=new Ds;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ls(e){const t={};if(e.isDefault())return t;let n;if(e.index_===fs?n="$priority":e.index_===ks?n="$value":e.index_===ts?n="$key":(d(e.index_ instanceof Ts,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=L(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=L(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+L(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=L(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+L(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function zs(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==fs&&(t.i=e.index_.toString()),t}
/**
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
     */class Ms extends Po{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:(d(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=Hi("p:rest:"),this.listens_={}}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Ms.getListenId_(e,n),s={};this.listens_[o]=s;const a=Ls(e._queryParams);this.restRequest_(i+".json",a,((e,t)=>{let a=t;if(404===e&&(a=null,e=null),null===e&&this.onDataUpdate_(i,a,!1,n),q(this.listens_,o)===s){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}}))}unlisten(e,t){const n=Ms.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Ls(e._queryParams),n=e._path.toString(),r=new k;return this.restRequest_(n+".json",t,((e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))})),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then((([r,i])=>{r&&r.accessToken&&(t.auth=r.accessToken),i&&i.token&&(t.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+H(t);this.log_("Sending REST request for "+o);const s=new XMLHttpRequest;s.onreadystatechange=()=>{if(n&&4===s.readyState){this.log_("REST Response for "+o+" received. status:",s.status,"response:",s.responseText);let e=null;if(s.status>=200&&s.status<300){try{e=D(s.responseText)}catch(e){Qi("Failed to parse JSON response for "+o+": "+s.responseText)}n(null,e)}else 401!==s.status&&404!==s.status&&Qi("Got unsuccessful REST response for "+o+" Status: "+s.status),n(s.status);n=null}},s.open("GET",o,!0),s.send()}))}}
/**
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
     */class qs{constructor(){this.rootNode_=Is.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}
/**
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
     */function Fs(){return{value:null,children:new Map}}function Us(e,t,n){if(jo(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=Do(t);e.children.has(r)||e.children.set(r,Fs());Us(e.children.get(r),t=zo(t),n)}}function js(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach(((e,n)=>{t(n,e)}))}
/**
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
     */(e,((e,r)=>{js(r,new No(t.toString()+"/"+e),n)}))}class Ws{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&to(this.last_,((e,n)=>{t[e]=t[e]-n})),this.last_=e,t}}
/**
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
     */class Hs{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ws(e);const n=1e4+2e4*Math.random();so(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;to(e,((e,r)=>{r>0&&M(this.statsToReport_,e)&&(t[e]=r,n=!0)})),n&&this.server_.reportStats(t),so(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}
/**
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
     */var Bs;function Vs(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}
/**
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
     */!function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"}(Bs||(Bs={}));class Qs{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=Bs.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(jo(this.path)){if(null!=this.affectedTree.value)return d(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new No(e));return new Qs(Oo(),t,this.revert)}}return d(Do(this.path)===e,"operationForChild called for unrelated child."),new Qs(zo(this.path),this.affectedTree,this.revert)}}
/**
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
     */class $s{constructor(e,t){this.source=e,this.path=t,this.type=Bs.LISTEN_COMPLETE}operationForChild(e){return jo(this.path)?new $s(this.source,Oo()):new $s(this.source,zo(this.path))}}
/**
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
     */class Ks{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=Bs.OVERWRITE}operationForChild(e){return jo(this.path)?new Ks(this.source,Oo(),this.snap.getImmediateChild(e)):new Ks(this.source,zo(this.path),this.snap)}}
/**
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
     */class Gs{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=Bs.MERGE}operationForChild(e){if(jo(this.path)){const t=this.children.subtree(new No(e));return t.isEmpty()?null:t.value?new Ks(this.source,Oo(),t.value):new Gs(this.source,Oo(),t)}return d(Do(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Gs(this.source,zo(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}
/**
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
     */class Ys{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(jo(e))return this.isFullyInitialized()&&!this.filtered_;const t=Do(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}
/**
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
     */class Js{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Xs(e,t,n,r,i,o){const s=r.filter((e=>e.type===n));s.sort(((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw h("Should only compare child_ events.");const r=new Jo(t.childName,t.snapshotNode),i=new Jo(n.childName,n.snapshotNode);return e.index_.compare(r,i)}
/**
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
     */(e,t,n))),s.forEach((n=>{const r=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,o);i.forEach((i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))}))}))}function Zs(e,t){return{eventCache:e,serverCache:t}}function ea(e,t,n,r){return Zs(new Ys(t,n,r),e.serverCache)}function ta(e,t,n,r){return Zs(e.eventCache,new Ys(t,n,r))}function na(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function ra(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}
/**
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
     */let ia;class oa{static fromObject(e){let t=new oa(null);return to(e,((e,n)=>{t=t.set(new No(e),n)})),t}constructor(e,t=(()=>(ia||(ia=new is(Ji)),ia))()){this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:Oo(),value:this.value};if(jo(e))return null;{const n=Do(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(zo(e),t);if(null!=i){return{path:Uo(new No(n),i.path),value:i.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,(()=>!0))}subtree(e){if(jo(e))return this;{const t=Do(e),n=this.children.get(t);return null!==n?n.subtree(zo(e)):new oa(null)}}set(e,t){if(jo(e))return new oa(t,this.children);{const n=Do(e),r=(this.children.get(n)||new oa(null)).set(zo(e),t),i=this.children.insert(n,r);return new oa(this.value,i)}}remove(e){if(jo(e))return this.children.isEmpty()?new oa(null):new oa(null,this.children);{const t=Do(e),n=this.children.get(t);if(n){const r=n.remove(zo(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new oa(null):new oa(this.value,i)}return this}}get(e){if(jo(e))return this.value;{const t=Do(e),n=this.children.get(t);return n?n.get(zo(e)):null}}setTree(e,t){if(jo(e))return t;{const n=Do(e),r=(this.children.get(n)||new oa(null)).setTree(zo(e),t);let i;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new oa(this.value,i)}}fold(e){return this.fold_(Oo(),e)}fold_(e,t){const n={};return this.children.inorderTraversal(((r,i)=>{n[r]=i.fold_(Uo(e,r),t)})),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,Oo(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(jo(e))return null;{const r=Do(e),i=this.children.get(r);return i?i.findOnPath_(zo(e),Uo(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Oo(),t)}foreachOnPath_(e,t,n){if(jo(e))return this;{this.value&&n(t,this.value);const r=Do(e),i=this.children.get(r);return i?i.foreachOnPath_(zo(e),Uo(t,r),n):new oa(null)}}foreach(e){this.foreach_(Oo(),e)}foreach_(e,t){this.children.inorderTraversal(((n,r)=>{r.foreach_(Uo(e,n),t)})),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal(((t,n)=>{n.value&&e(t,n.value)}))}}
/**
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
     */class sa{constructor(e){this.writeTree_=e}static empty(){return new sa(new oa(null))}}function aa(e,t,n){if(jo(t))return new sa(new oa(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let o=r.value;const s=Wo(i,t);return o=o.updateChild(s,n),new sa(e.writeTree_.set(i,o))}{const r=new oa(n),i=e.writeTree_.setTree(t,r);return new sa(i)}}}function la(e,t,n){let r=e;return to(n,((e,n)=>{r=aa(r,Uo(t,e),n)})),r}function ca(e,t){if(jo(t))return sa.empty();{const n=e.writeTree_.setTree(t,new oa(null));return new sa(n)}}function ua(e,t){return null!=da(e,t)}function da(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(Wo(n.path,t)):null}function ha(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(fs,((e,n)=>{t.push(new Jo(e,n))})):e.writeTree_.children.inorderTraversal(((e,n)=>{null!=n.value&&t.push(new Jo(e,n.value))})),t}function pa(e,t){if(jo(t))return e;{const n=da(e,t);return new sa(null!=n?new oa(n):e.writeTree_.subtree(t))}}function fa(e){return e.writeTree_.isEmpty()}function ma(e,t){return ga(Oo(),e.writeTree_,t)}function ga(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal(((t,i)=>{".priority"===t?(d(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=ga(Uo(e,t),i,n)})),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(Uo(e,".priority"),r)),n}}
/**
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
     */function _a(e,t){return Ra(t,e)}function va(e,t){const n=e.allWrites.findIndex((e=>e.writeId===t));d(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,s=e.allWrites.length-1;for(;i&&s>=0;){const t=e.allWrites[s];t.visible&&(s>=n&&ya(t,r.path)?i=!1:Bo(r.path,t.path)&&(o=!0)),s--}if(i){if(o)return function(e){e.visibleWrites=wa(e.allWrites,ba,Oo()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(r.snap)e.visibleWrites=ca(e.visibleWrites,r.path);else{to(r.children,(t=>{e.visibleWrites=ca(e.visibleWrites,Uo(r.path,t))}))}return!0}return!1}function ya(e,t){if(e.snap)return Bo(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&Bo(Uo(e.path,n),t))return!0;return!1}function ba(e){return e.visible}function wa(e,t,n){let r=sa.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const e=o.path;let t;if(o.snap)Bo(n,e)?(t=Wo(n,e),r=aa(r,t,o.snap)):Bo(e,n)&&(t=Wo(e,n),r=aa(r,Oo(),o.snap.getChild(t)));else{if(!o.children)throw h("WriteRecord should have .snap or .children");if(Bo(n,e))t=Wo(n,e),r=la(r,t,o.children);else if(Bo(e,n))if(t=Wo(e,n),jo(t))r=la(r,Oo(),o.children);else{const e=q(o.children,Do(t));if(e){const n=e.getChild(zo(t));r=aa(r,Oo(),n)}}}}}return r}function Ia(e,t,n,r,i){if(r||i){const o=pa(e.visibleWrites,t);if(!i&&fa(o))return n;if(i||null!=n||ua(o,Oo())){const o=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Bo(e.path,t)||Bo(t,e.path))};return ma(wa(e.allWrites,o,t),n||Is.EMPTY_NODE)}return null}{const r=da(e.visibleWrites,t);if(null!=r)return r;{const r=pa(e.visibleWrites,t);if(fa(r))return n;if(null!=n||ua(r,Oo())){return ma(r,n||Is.EMPTY_NODE)}return null}}}function Ca(e,t,n,r){return Ia(e.writeTree,e.treePath,t,n,r)}function Ea(e,t){return function(e,t,n){let r=Is.EMPTY_NODE;const i=da(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(fs,((e,t)=>{r=r.updateImmediateChild(e,t)})),r;if(n){const i=pa(e.visibleWrites,t);return n.forEachChild(fs,((e,t)=>{const n=ma(pa(i,new No(e)),t);r=r.updateImmediateChild(e,n)})),ha(i).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}return ha(pa(e.visibleWrites,t)).forEach((e=>{r=r.updateImmediateChild(e.name,e.node)})),r}(e.writeTree,e.treePath,t)}function Ta(e,t,n,r){return function(e,t,n,r,i){d(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=Uo(t,n);if(ua(e.visibleWrites,o))return null;{const t=pa(e.visibleWrites,o);return fa(t)?i.getChild(n):ma(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function ka(e,t){return function(e,t){return da(e.visibleWrites,t)}(e.writeTree,Uo(e.treePath,t))}function xa(e,t,n,r,i,o){return function(e,t,n,r,i,o,s){let a;const l=pa(e.visibleWrites,t),c=da(l,Oo());if(null!=c)a=c;else{if(null==n)return[];a=ma(l,n)}if(a=a.withIndex(s),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=s.getCompare(),n=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s);let l=n.getNext();for(;l&&e.length<i;)0!==t(l,r)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,r,i,o)}function Sa(e,t,n){return function(e,t,n,r){const i=Uo(t,n),o=da(e.visibleWrites,i);if(null!=o)return o;if(r.isCompleteForChild(n))return ma(pa(e.visibleWrites,i),r.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function Pa(e,t){return Ra(Uo(e.treePath,t),e.writeTree)}function Ra(e,t){return{treePath:e,writeTree:t}}
/**
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
     */class Aa{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;d("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),d(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,Rs(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,Ps(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,Ss(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw h("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,Rs(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}
/**
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
     */const Na=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class Oa{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new Ys(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Sa(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:ra(this.viewCache_),i=xa(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}
/**
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
     */function Da(e,t,n,r,i){const o=new Aa;let s,a;if(n.type===Bs.OVERWRITE){const l=n;l.source.fromUser?s=Ma(e,t,l.path,l.snap,r,i,o):(d(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered()&&!jo(l.path),s=za(e,t,l.path,l.snap,r,i,a,o))}else if(n.type===Bs.MERGE){const l=n;l.source.fromUser?s=function(e,t,n,r,i,o,s){let a=t;return r.foreach(((r,l)=>{const c=Uo(n,r);qa(t,Do(c))&&(a=Ma(e,a,c,l,i,o,s))})),r.foreach(((r,l)=>{const c=Uo(n,r);qa(t,Do(c))||(a=Ma(e,a,c,l,i,o,s))})),a}(e,t,l.path,l.children,r,i,o):(d(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered(),s=Ua(e,t,l.path,l.children,r,i,a,o))}else if(n.type===Bs.ACK_USER_WRITE){const a=n;s=a.revert?function(e,t,n,r,i,o){let s;if(null!=ka(r,n))return t;{const a=new Oa(r,t,i),l=t.eventCache.getNode();let c;if(jo(n)||".priority"===Do(n)){let n;if(t.serverCache.isFullyInitialized())n=Ca(r,ra(t));else{const e=t.serverCache.getNode();d(e instanceof Is,"serverChildren would be complete if leaf node"),n=Ea(r,e)}c=e.filter.updateFullNode(l,n,o)}else{const i=Do(n);let u=Sa(r,i,t.serverCache);null==u&&t.serverCache.isCompleteForChild(i)&&(u=l.getImmediateChild(i)),c=null!=u?e.filter.updateChild(l,i,u,zo(n),a,o):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(l,i,Is.EMPTY_NODE,zo(n),a,o):l,c.isEmpty()&&t.serverCache.isFullyInitialized()&&(s=Ca(r,ra(t)),s.isLeafNode()&&(c=e.filter.updateFullNode(c,s,o)))}return s=t.serverCache.isFullyInitialized()||null!=ka(r,Oo()),ea(t,c,s,e.filter.filtersNodes())}}
/**
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
     */(e,t,a.path,r,i,o):function(e,t,n,r,i,o,s){if(null!=ka(i,n))return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(null!=r.value){if(jo(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return za(e,t,n,l.getNode().getChild(n),i,o,a,s);if(jo(n)){let r=new oa(null);return l.getNode().forEachChild(ts,((e,t)=>{r=r.set(new No(e),t)})),Ua(e,t,n,r,i,o,a,s)}return t}{let c=new oa(null);return r.foreach(((e,t)=>{const r=Uo(n,e);l.isCompleteForPath(r)&&(c=c.set(e,l.getNode().getChild(r)))})),Ua(e,t,n,c,i,o,a,s)}}(e,t,a.path,a.affectedTree,r,i,o)}else{if(n.type!==Bs.LISTEN_COMPLETE)throw h("Unknown operation type: "+n.type);s=function(e,t,n,r,i){const o=t.serverCache,s=ta(t,o.getNode(),o.isFullyInitialized()||jo(n),o.isFiltered());return La(e,s,n,r,Na,i)}(e,t,n.path,r,o)}const l=o.getChanges();return function(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=na(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(xs(na(t)))}}(t,s,l),{viewCache:s,changes:l}}function La(e,t,n,r,i,o){const s=t.eventCache;if(null!=ka(r,n))return t;{let a,l;if(jo(n))if(d(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=ra(t),i=Ea(r,n instanceof Is?n:Is.EMPTY_NODE);a=e.filter.updateFullNode(t.eventCache.getNode(),i,o)}else{const n=Ca(r,ra(t));a=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{const c=Do(n);if(".priority"===c){d(1===Lo(n),"Can't have a priority with additional path components");const i=s.getNode();l=t.serverCache.getNode();const o=Ta(r,n,i,l);a=null!=o?e.filter.updatePriority(i,o):s.getNode()}else{const u=zo(n);let d;if(s.isCompleteForChild(c)){l=t.serverCache.getNode();const e=Ta(r,n,s.getNode(),l);d=null!=e?s.getNode().getImmediateChild(c).updateChild(u,e):s.getNode().getImmediateChild(c)}else d=Sa(r,c,t.serverCache);a=null!=d?e.filter.updateChild(s.getNode(),c,d,u,i,o):s.getNode()}}return ea(t,a,s.isFullyInitialized()||jo(n),e.filter.filtersNodes())}}function za(e,t,n,r,i,o,s,a){const l=t.serverCache;let c;const u=s?e.filter:e.filter.getIndexedFilter();if(jo(n))c=u.updateFullNode(l.getNode(),r,null);else if(u.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,r);c=u.updateFullNode(l.getNode(),e,null)}else{const e=Do(n);if(!l.isCompleteForPath(n)&&Lo(n)>1)return t;const i=zo(n),o=l.getNode().getImmediateChild(e).updateChild(i,r);c=".priority"===e?u.updatePriority(l.getNode(),o):u.updateChild(l.getNode(),e,o,i,Na,null)}const d=ta(t,c,l.isFullyInitialized()||jo(n),u.filtersNodes());return La(e,d,n,i,new Oa(i,d,o),a)}function Ma(e,t,n,r,i,o,s){const a=t.eventCache;let l,c;const u=new Oa(i,t,o);if(jo(n))c=e.filter.updateFullNode(t.eventCache.getNode(),r,s),l=ea(t,c,!0,e.filter.filtersNodes());else{const i=Do(n);if(".priority"===i)c=e.filter.updatePriority(t.eventCache.getNode(),r),l=ea(t,c,a.isFullyInitialized(),a.isFiltered());else{const o=zo(n),c=a.getNode().getImmediateChild(i);let d;if(jo(o))d=r;else{const e=u.getCompleteChild(i);d=null!=e?".priority"===Mo(o)&&e.getChild(Fo(o)).isEmpty()?e:e.updateChild(o,r):Is.EMPTY_NODE}if(c.equals(d))l=t;else{l=ea(t,e.filter.updateChild(a.getNode(),i,d,o,u,s),a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function qa(e,t){return e.eventCache.isCompleteForChild(t)}function Fa(e,t,n){return n.foreach(((e,n)=>{t=t.updateChild(e,n)})),t}function Ua(e,t,n,r,i,o,s,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,c=t;l=jo(n)?r:new oa(null).setTree(n,r);const u=t.serverCache.getNode();return l.children.inorderTraversal(((n,r)=>{if(u.hasChild(n)){const l=Fa(0,t.serverCache.getNode().getImmediateChild(n),r);c=za(e,c,new No(n),l,i,o,s,a)}})),l.children.inorderTraversal(((n,r)=>{const l=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!u.hasChild(n)&&!l){const l=Fa(0,t.serverCache.getNode().getImmediateChild(n),r);c=za(e,c,new No(n),l,i,o,s,a)}})),c}class ja{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new As(n.getIndex()),i=(o=n).loadsAllData()?new As(o.getIndex()):o.hasLimit()?new Os(o):new Ns(o);var o;this.processor_=function(e){return{filter:e}}(i);const s=t.serverCache,a=t.eventCache,l=r.updateFullNode(Is.EMPTY_NODE,s.getNode(),null),c=i.updateFullNode(Is.EMPTY_NODE,a.getNode(),null),u=new Ys(l,s.isFullyInitialized(),r.filtersNodes()),d=new Ys(c,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Zs(d,u),this.eventGenerator_=new Js(this.query_)}get query(){return this.query_}}function Wa(e,t){const n=ra(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!jo(t)&&!n.getImmediateChild(Do(t)).isEmpty())?n.getChild(t):null}function Ha(e){return 0===e.eventRegistrations_.length}function Ba(e,t,n){const r=[];if(n){d(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach((e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)}))}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function Va(e,t,n,r){t.type===Bs.MERGE&&null!==t.source.queryId&&(d(ra(e.viewCache_),"We should always have a full cache before handling merges"),d(na(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=Da(e.processor_,i,t,n,r);var s,a;return s=e.processor_,a=o.viewCache,d(a.eventCache.getNode().isIndexed(s.filter.getIndex()),"Event snap not indexed"),d(a.serverCache.getNode().isIndexed(s.filter.getIndex()),"Server snap not indexed"),d(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,Qa(e,o.changes,o.viewCache.eventCache.getNode(),null)}function Qa(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){const i=[],o=[];return t.forEach((t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&o.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))})),Xs(e,i,"child_removed",t,r,n),Xs(e,i,"child_added",t,r,n),Xs(e,i,"child_moved",o,r,n),Xs(e,i,"child_changed",t,r,n),Xs(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}
/**
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
     */let $a,Ka;class Ga{constructor(){this.views=new Map}}function Ya(e,t,n,r){const i=t.source.queryId;if(null!==i){const o=e.views.get(i);return d(null!=o,"SyncTree gave us an op for an invalid query."),Va(o,t,n,r)}{let i=[];for(const o of e.views.values())i=i.concat(Va(o,t,n,r));return i}}function Ja(e,t,n,r,i){const o=t._queryIdentifier,s=e.views.get(o);if(!s){let e=Ca(n,i?r:null),o=!1;e?o=!0:r instanceof Is?(e=Ea(n,r),o=!1):(e=Is.EMPTY_NODE,o=!1);const s=Zs(new Ys(e,o,!1),new Ys(r,i,!1));return new ja(t,s)}return s}function Xa(e,t,n,r,i,o){const s=Ja(e,t,r,i,o);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,s),function(e,t){e.eventRegistrations_.push(t)}(s,n),function(e,t){const n=e.viewCache_.eventCache,r=[];n.getNode().isLeafNode()||n.getNode().forEachChild(fs,((e,t)=>{r.push(Ss(e,t))}));return n.isFullyInitialized()&&r.push(xs(n.getNode())),Qa(e,r,n.getNode(),t)}(s,n)}function Za(e,t,n,r){const i=t._queryIdentifier,o=[];let s=[];const a=il(e);if("default"===i)for(const[t,i]of e.views.entries())s=s.concat(Ba(i,n,r)),Ha(i)&&(e.views.delete(t),i.query._queryParams.loadsAllData()||o.push(i.query));else{const t=e.views.get(i);t&&(s=s.concat(Ba(t,n,r)),Ha(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||o.push(t.query)))}return a&&!il(e)&&o.push(new(d($a,"Reference.ts has not been loaded"),$a)(t._repo,t._path)),{removed:o,events:s}}function el(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function tl(e,t){let n=null;for(const r of e.views.values())n=n||Wa(r,t);return n}function nl(e,t){if(t._queryParams.loadsAllData())return ol(e);{const n=t._queryIdentifier;return e.views.get(n)}}function rl(e,t){return null!=nl(e,t)}function il(e){return null!=ol(e)}function ol(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}
/**
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
     */let sl=1;class al{constructor(e){this.listenProvider_=e,this.syncPointTree_=new oa(null),this.pendingWriteTree_={visibleWrites:sa.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ll(e,t,n,r,i){return function(e,t,n,r,i){d(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=aa(e.visibleWrites,t,n)),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r,i),i?gl(e,new Ks({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function cl(e,t,n=!1){const r=function(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t);if(va(e.pendingWriteTree_,t)){let t=new oa(null);return null!=r.snap?t=t.set(Oo(),!0):to(r.children,(e=>{t=t.set(new No(e),!0)})),gl(e,new Qs(r.path,t,n))}return[]}function ul(e,t,n){return gl(e,new Ks({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function dl(e,t,n,r,i=!1){const o=t._path,s=e.syncPointTree_.get(o);let a=[];if(s&&("default"===t._queryIdentifier||rl(s,t))){const l=Za(s,t,n,r);0===s.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(o));const c=l.removed;if(a=l.events,!i){const n=-1!==c.findIndex((e=>e._queryParams.loadsAllData())),i=e.syncPointTree_.findOnPath(o,((e,t)=>il(t)));if(n&&!i){const t=e.syncPointTree_.subtree(o);if(!t.isEmpty()){const n=function(e){return e.fold(((e,t,n)=>{if(t&&il(t)){return[ol(t)]}{let e=[];return t&&(e=el(t)),to(n,((t,n)=>{e=e.concat(n)})),e}}))}(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,o=yl(e,r);e.listenProvider_.startListening(Tl(i),bl(e,i),o.hashFn,o.onComplete)}}}if(!i&&c.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(Tl(t),n)}else c.forEach((t=>{const n=e.queryToTagMap.get(wl(t));e.listenProvider_.stopListening(Tl(t),n)}))}!function(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=wl(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,c)}return a}function hl(e,t,n,r){const i=Il(e,r);if(null!=i){const r=Cl(i),o=r.path,s=r.queryId,a=Wo(o,t);return El(e,o,new Ks(Vs(s),a,n))}return[]}function pl(e,t,n,r=!1){const i=t._path;let o=null,s=!1;e.syncPointTree_.foreachOnPath(i,((e,t)=>{const n=Wo(e,i);o=o||tl(t,n),s=s||il(t)}));let a,l=e.syncPointTree_.get(i);if(l?(s=s||il(l),o=o||tl(l,Oo())):(l=new Ga,e.syncPointTree_=e.syncPointTree_.set(i,l)),null!=o)a=!0;else{a=!1,o=Is.EMPTY_NODE;e.syncPointTree_.subtree(i).foreachChild(((e,t)=>{const n=tl(t,Oo());n&&(o=o.updateImmediateChild(e,n))}))}const c=rl(l,t);if(!c&&!t._queryParams.loadsAllData()){const n=wl(t);d(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=sl++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=Xa(l,t,n,_a(e.pendingWriteTree_,i),o,a);if(!c&&!s&&!r){const n=nl(l,t);u=u.concat(function(e,t,n){const r=t._path,i=bl(e,t),o=yl(e,n),s=e.listenProvider_.startListening(Tl(t),i,o.hashFn,o.onComplete),a=e.syncPointTree_.subtree(r);if(i)d(!il(a.value),"If we're adding a query, it shouldn't be shadowed");else{const t=a.fold(((e,t,n)=>{if(!jo(e)&&t&&il(t))return[ol(t).query];{let e=[];return t&&(e=e.concat(el(t).map((e=>e.query)))),to(n,((t,n)=>{e=e.concat(n)})),e}}));for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(Tl(r),bl(e,r))}}return s}
/**
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
     */(e,t,n))}return u}function fl(e,t,n){const r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,((e,n)=>{const r=tl(n,Wo(e,t));if(r)return r}));return Ia(r,t,i,n,!0)}function ml(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,((e,t)=>{const i=Wo(e,n);r=r||tl(t,i)}));let i=e.syncPointTree_.get(n);i?r=r||tl(i,Oo()):(i=new Ga,e.syncPointTree_=e.syncPointTree_.set(n,i));const o=null!=r,s=o?new Ys(r,!0,!1):null;return function(e){return na(e.viewCache_)}(Ja(i,t,_a(e.pendingWriteTree_,t._path),o?s.getNode():Is.EMPTY_NODE,o))}function gl(e,t){return _l(t,e.syncPointTree_,null,_a(e.pendingWriteTree_,Oo()))}function _l(e,t,n,r){if(jo(e.path))return vl(e,t,n,r);{const i=t.get(Oo());null==n&&null!=i&&(n=tl(i,Oo()));let o=[];const s=Do(e.path),a=e.operationForChild(s),l=t.children.get(s);if(l&&a){const e=n?n.getImmediateChild(s):null,t=Pa(r,s);o=o.concat(_l(a,l,e,t))}return i&&(o=o.concat(Ya(i,e,r,n))),o}}function vl(e,t,n,r){const i=t.get(Oo());null==n&&null!=i&&(n=tl(i,Oo()));let o=[];return t.children.inorderTraversal(((t,i)=>{const s=n?n.getImmediateChild(t):null,a=Pa(r,t),l=e.operationForChild(t);l&&(o=o.concat(vl(l,i,s,a)))})),i&&(o=o.concat(Ya(i,e,r,n))),o}function yl(e,t){const n=t.query,r=bl(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||Is.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?function(e,t,n){const r=Il(e,n);if(r){const n=Cl(r),i=n.path,o=n.queryId,s=Wo(i,t);return El(e,i,new $s(Vs(o),s))}return[]}(e,n._path,r):function(e,t){return gl(e,new $s({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return dl(e,n,null,r)}}}}function bl(e,t){const n=wl(t);return e.queryToTagMap.get(n)}function wl(e){return e._path.toString()+"$"+e._queryIdentifier}function Il(e,t){return e.tagToQueryMap.get(t)}function Cl(e){const t=e.indexOf("$");return d(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new No(e.substr(0,t))}}function El(e,t,n){const r=e.syncPointTree_.get(t);d(r,"Missing sync point for query tag that we're tracking");return Ya(r,n,_a(e.pendingWriteTree_,t),null)}function Tl(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(d(Ka,"Reference.ts has not been loaded"),Ka)(e._repo,e._path):e}class kl{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new kl(t)}node(){return this.node_}}class xl{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Uo(this.path_,e);return new xl(this.syncTree_,t)}node(){return fl(this.syncTree_,this.path_)}}const Sl=function(e,t,n){return e&&"object"==typeof e?(d(".sv"in e,"Unexpected leaf node or priority contents"),"string"==typeof e[".sv"]?Pl(e[".sv"],t,n):"object"==typeof e[".sv"]?Rl(e[".sv"],t):void d(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},Pl=function(e,t,n){if("timestamp"===e)return n.timestamp;d(!1,"Unexpected server value: "+e)},Rl=function(e,t,n){e.hasOwnProperty("increment")||d(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;"number"!=typeof r&&d(!1,"Unexpected increment value: "+r);const i=t.node();if(d(null!=i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return"number"!=typeof o?r:o+r},Al=function(e,t,n){return Nl(e,new kl(t),n)};function Nl(e,t,n){const r=e.getPriority().val(),i=Sl(r,t.getImmediateChild(".priority"),n);let o;if(e.isLeafNode()){const r=e,o=Sl(r.getValue(),t,n);return o!==r.getValue()||i!==r.getPriority().val()?new ps(o,Es(i)):e}{const r=e;return o=r,i!==r.getPriority().val()&&(o=o.updatePriority(new ps(i))),r.forEachChild(fs,((e,r)=>{const i=Nl(r,t.getImmediateChild(e),n);i!==r&&(o=o.updateImmediateChild(e,i))})),o}}
/**
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
     */class Ol{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function Dl(e,t){let n=t instanceof No?t:new No(t),r=e,i=Do(n);for(;null!==i;){const e=q(r.node.children,i)||{children:{},childCount:0};r=new Ol(i,r,e),n=zo(n),i=Do(n)}return r}function Ll(e){return e.node.value}function zl(e,t){e.node.value=t,jl(e)}function Ml(e){return e.node.childCount>0}function ql(e,t){to(e.node.children,((n,r)=>{t(new Ol(n,e,r))}))}function Fl(e,t,n,r){n&&!r&&t(e),ql(e,(e=>{Fl(e,t,!0,r)}))}function Ul(e){return new No(null===e.parent?e.name:Ul(e.parent)+"/"+e.name)}function jl(e){null!==e.parent&&function(e,t,n){const r=function(e){return void 0===Ll(e)&&!Ml(e)}(n),i=M(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,jl(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,jl(e))}
/**
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
     */(e.parent,e.name,e)}const Wl=/[\[\].#$\/\u0000-\u001F\u007F]/,Hl=/[\[\].#$\u0000-\u001F\u007F]/,Bl=10485760,Vl=function(e){return"string"==typeof e&&0!==e.length&&!Wl.test(e)},Ql=function(e){return"string"==typeof e&&0!==e.length&&!Hl.test(e)},$l=function(e,t,n){const r=n instanceof No?new Vo(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+$o(r));if("function"==typeof t)throw new Error(e+"contains a function "+$o(r)+" with contents = "+t.toString());if($i(t))throw new Error(e+"contains "+t.toString()+" "+$o(r));if("string"==typeof t&&t.length>Bl/3&&Y(t)>Bl)throw new Error(e+"contains a string greater than "+Bl+" utf8 bytes "+$o(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){let n=!1,i=!1;if(to(t,((t,o)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!Vl(t)))throw new Error(e+" contains an invalid key ("+t+") "+$o(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');!function(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=Y(t),Qo(e)}(r,t),$l(e,o,r),function(e){const t=e.parts_.pop();e.byteLength_-=Y(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)})),n&&i)throw new Error(e+' contains ".value" child '+$o(r)+" in addition to actual children.")}},Kl=function(e,t,n,r){if(!Ql(n))throw new Error(G(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},Gl=function(e,t){if(".info"===Do(t))throw new Error(e+" failed = Can't modify data under /.info/")},Yl=function(e,t){const n=t.path.toString();if("string"!=typeof t.repoInfo.host||0===t.repoInfo.host.length||!Vl(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Ql(e)}(n))throw new Error(G(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};
/**
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
     */
class Jl{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Xl(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],o=i.getPath();null===n||Ho(o,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:o}),n.events.push(i)}n&&e.eventLists_.push(n)}function Zl(e,t,n){Xl(e,n),tc(e,(e=>Ho(e,t)))}function ec(e,t,n){Xl(e,n),tc(e,(e=>Bo(e,t)||Bo(t,e)))}function tc(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){t(i.path)?(nc(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function nc(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();Ui&&Wi("event: "+n.toString()),oo(r)}}}
/**
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
     */class rc{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Jl,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Fs(),this.transactionQueueTree_=new Ol,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ic(e,t,n){if(e.stats_=bo(e.repoInfo_),e.forceRestClient_||("object"==typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new Ms(e.repoInfo_,((t,n,r,i)=>{ac(e,t,n,r,i)}),e.authTokenProvider_,e.appCheckProvider_),setTimeout((()=>lc(e,!0)),0);else{if(null!=n){if("object"!=typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{L(n)}catch(e){throw new Error("Invalid authOverride provided: "+e)}}e.persistentConnection_=new Yo(e.repoInfo_,t,((t,n,r,i)=>{ac(e,t,n,r,i)}),(t=>{lc(e,t)}),(t=>{!function(e,t){to(t,((t,n)=>{cc(e,t,n)}))}(e,t)}),e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener((t=>{e.server_.refreshAuthToken(t)})),e.appCheckProvider_.addTokenChangeListener((t=>{e.server_.refreshAppCheckToken(t.token)})),e.statsReporter_=function(e,t){const n=e.toString();return yo[n]||(yo[n]=t()),yo[n]}(e.repoInfo_,(()=>new Hs(e.stats_,e.server_))),e.infoData_=new qs,e.infoSyncTree_=new al({startListening:(t,n,r,i)=>{let o=[];const s=e.infoData_.getNode(t._path);return s.isEmpty()||(o=ul(e.infoSyncTree_,t._path,s),setTimeout((()=>{i("ok")}),0)),o},stopListening:()=>{}}),cc(e,"connected",!1),e.serverSyncTree_=new al({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,((n,r)=>{const o=i(n,r);ec(e.eventQueue_,t._path,o)})),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function oc(e){const t=e.infoData_.getNode(new No(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function sc(e){return(t=(t={timestamp:oc(e)})||{}).timestamp=t.timestamp||(new Date).getTime(),t;var t}function ac(e,t,n,r,i){e.dataUpdateCount++;const o=new No(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let s=[];if(i)if(r){const t=U(n,(e=>Es(e)));s=function(e,t,n,r){const i=Il(e,r);if(i){const r=Cl(i),o=r.path,s=r.queryId,a=Wo(o,t),l=oa.fromObject(n);return El(e,o,new Gs(Vs(s),a,l))}return[]}(e.serverSyncTree_,o,t,i)}else{const t=Es(n);s=hl(e.serverSyncTree_,o,t,i)}else if(r){const t=U(n,(e=>Es(e)));s=function(e,t,n){const r=oa.fromObject(n);return gl(e,new Gs({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,r))}(e.serverSyncTree_,o,t)}else{const t=Es(n);s=ul(e.serverSyncTree_,o,t)}let a=o;s.length>0&&(a=mc(e,o)),ec(e.eventQueue_,a,s)}function lc(e,t){cc(e,"connected",t),!1===t&&function(e){hc(e,"onDisconnectEvents");const t=sc(e),n=Fs();js(e.onDisconnect_,Oo(),((r,i)=>{const o=function(e,t,n,r){return Nl(t,new xl(n,e),r)}(r,i,e.serverSyncTree_,t);Us(n,r,o)}));let r=[];js(n,Oo(),((t,n)=>{r=r.concat(ul(e.serverSyncTree_,t,n));const i=bc(e,t);mc(e,i)})),e.onDisconnect_=Fs(),ec(e.eventQueue_,Oo(),r)}(e)}function cc(e,t,n){const r=new No("/.info/"+t),i=Es(n);e.infoData_.updateSnapshot(r,i);const o=ul(e.infoSyncTree_,r,i);ec(e.eventQueue_,r,o)}function uc(e){return e.nextWriteId_++}function dc(e,t,n,r,i){hc(e,"set",{path:t.toString(),value:n,priority:r});const o=sc(e),s=Es(n,r),a=fl(e.serverSyncTree_,t),l=Al(s,a,o),c=uc(e),u=ll(e.serverSyncTree_,t,l,c,!0);Xl(e.eventQueue_,u),e.server_.put(t.toString(),s.val(!0),((n,r)=>{const o="ok"===n;o||Qi("set at "+t+" failed: "+n);const s=cl(e.serverSyncTree_,c,!o);ec(e.eventQueue_,t,s),function(e,t,n,r){t&&oo((()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const o=new Error(i);o.code=e,t(o)}}))}(0,i,n,r)}));const d=bc(e,t);mc(e,d),ec(e.eventQueue_,d,[])}function hc(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),Wi(n,...t)}function pc(e,t,n){return fl(e.serverSyncTree_,t,n)||Is.EMPTY_NODE}function fc(e,t=e.transactionQueueTree_){if(t||yc(e,t),Ll(t)){const n=_c(e,t);d(n.length>0,"Sending zero length transaction queue");n.every((e=>0===e.status))&&function(e,t,n){const r=n.map((e=>e.currentWriteId)),i=pc(e,t,r);let o=i;const s=i.hash();for(let e=0;e<n.length;e++){const r=n[e];d(0===r.status,"tryToSendTransactionQueue_: items in queue should all be run."),r.status=1,r.retryCount++;const i=Wo(t,r.path);o=o.updateChild(i,r.currentOutputSnapshotRaw)}const a=o.val(!0),l=t;e.server_.put(l.toString(),a,(r=>{hc(e,"transaction put response",{path:l.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(cl(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push((()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved))),n[t].unwatcher();yc(e,Dl(e.transactionQueueTree_,t)),fc(e,e.transactionQueueTree_),ec(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)oo(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{Qi("transaction at "+l.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}mc(e,t)}}),s)}(e,Ul(t),n)}else Ml(t)&&ql(t,(t=>{fc(e,t)}))}function mc(e,t){const n=gc(e,t),r=Ul(n);return function(e,t,n){if(0===t.length)return;const r=[];let i=[];const o=t.filter((e=>0===e.status)),s=o.map((e=>e.currentWriteId));for(let o=0;o<t.length;o++){const l=t[o],c=Wo(n,l.path);let u,h=!1;if(d(null!==c,"rerunTransactionsUnderNode_: relativePath should not be null."),4===l.status)h=!0,u=l.abortReason,i=i.concat(cl(e.serverSyncTree_,l.currentWriteId,!0));else if(0===l.status)if(l.retryCount>=25)h=!0,u="maxretry",i=i.concat(cl(e.serverSyncTree_,l.currentWriteId,!0));else{const n=pc(e,l.path,s);l.currentInputSnapshot=n;const r=t[o].update(n.val());if(void 0!==r){$l("transaction failed: Data returned ",r,l.path);let t=Es(r);"object"==typeof r&&null!=r&&M(r,".priority")||(t=t.updatePriority(n.getPriority()));const o=l.currentWriteId,a=sc(e),c=Al(t,n,a);l.currentOutputSnapshotRaw=t,l.currentOutputSnapshotResolved=c,l.currentWriteId=uc(e),s.splice(s.indexOf(o),1),i=i.concat(ll(e.serverSyncTree_,l.path,c,l.currentWriteId,l.applyLocally)),i=i.concat(cl(e.serverSyncTree_,o,!0))}else h=!0,u="nodata",i=i.concat(cl(e.serverSyncTree_,l.currentWriteId,!0))}ec(e.eventQueue_,n,i),i=[],h&&(t[o].status=2,a=t[o].unwatcher,setTimeout(a,Math.floor(0)),t[o].onComplete&&("nodata"===u?r.push((()=>t[o].onComplete(null,!1,t[o].currentInputSnapshot))):r.push((()=>t[o].onComplete(new Error(u),!1,null)))))}var a;yc(e,e.transactionQueueTree_);for(let e=0;e<r.length;e++)oo(r[e]);fc(e,e.transactionQueueTree_)}(e,_c(e,n),r),r}function gc(e,t){let n,r=e.transactionQueueTree_;for(n=Do(t);null!==n&&void 0===Ll(r);)r=Dl(r,n),n=Do(t=zo(t));return r}function _c(e,t){const n=[];return vc(e,t,n),n.sort(((e,t)=>e.order-t.order)),n}function vc(e,t,n){const r=Ll(t);if(r)for(let e=0;e<r.length;e++)n.push(r[e]);ql(t,(t=>{vc(e,t,n)}))}function yc(e,t){const n=Ll(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,zl(t,n.length>0?n:void 0)}ql(t,(t=>{yc(e,t)}))}function bc(e,t){const n=Ul(gc(e,t)),r=Dl(e.transactionQueueTree_,t);return function(e,t){let n=e.parent;for(;null!==n;){if(t(n))return!0;n=n.parent}}(r,(t=>{wc(e,t)})),wc(e,r),Fl(r,(t=>{wc(e,t)})),n}function wc(e,t){const n=Ll(t);if(n){const r=[];let i=[],o=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?(d(o===t-1,"All SENT items should be at beginning of queue."),o=t,n[t].status=3,n[t].abortReason="set"):(d(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(cl(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===o?zl(t,void 0):n.length=o+1,ec(e.eventQueue_,Ul(t),i);for(let e=0;e<r.length;e++)oo(r[e])}}
/**
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
     */const Ic=function(e,t){const n=Cc(e),r=n.namespace;"firebase.com"===n.domain&&Vi(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||Vi("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Qi("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new mo(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new No(n.pathString)}},Cc=function(e){let t="",n="",r="",i="",o="",s=!0,a="https",l=443;if("string"==typeof e){let c=e.indexOf("//");c>=0&&(a=e.substring(0,c-1),e=e.substring(c+2));let u=e.indexOf("/");-1===u&&(u=e.length);let d=e.indexOf("?");-1===d&&(d=e.length),t=e.substring(0,Math.min(u,d)),u<d&&(i=function(e){let t="";const n=e.split("/");for(let e=0;e<n.length;e++)if(n[e].length>0){let r=n[e];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch(e){}t+="/"+r}return t}(e.substring(u,d)));const h=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Qi(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,d)));c=t.indexOf(":"),c>=0?(s="https"===a||"wss"===a,l=parseInt(t.substring(c+1),10)):c=t.length;const p=t.slice(0,c);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),o=r}"ns"in h&&(o=h.ns)}return{host:t,port:l,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}};
/**
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
     */
class Ec{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+L(this.snapshot.exportVal())}}class Tc{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}
/**
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
     */class kc{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return d(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}
/**
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
     */class xc{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return jo(this._path)?null:Mo(this._path)}get ref(){return new Sc(this._repo,this._path)}get _queryIdentifier(){const e=zs(this._queryParams),t=Zi(e);return"{}"===t?"default":t}get _queryObject(){return zs(this._queryParams)}isEqual(e){if(!((e=J(e))instanceof xc))return!1;const t=this._repo===e._repo,n=Ho(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}class Sc extends xc{constructor(e,t){super(e,t,new Ds,!1)}get parent(){const e=Fo(this._path);return null===e?null:new Sc(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Pc{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new No(e),n=Ac(this.ref,e);return new Pc(this._node.getChild(t),n,fs)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;return!!this._node.forEachChild(this._index,((t,n)=>e(new Pc(n,Ac(this.ref,t),fs))))}hasChild(e){const t=new No(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Rc(e,t){return(e=J(e))._checkNotDeleted("ref"),void 0!==t?Ac(e._root,t):e._root}function Ac(e,t){var n,r,i;return null===Do((e=J(e))._path)?(n="child",r="path",(i=t)&&(i=i.replace(/^\/*\.info(\/|$)/,"/")),Kl(n,r,i)):Kl("child","path",t),new Sc(e._repo,Uo(e._path,t))}function Nc(e,t){e=J(e),Gl("set",e._path),function(e,t,n){$l(G(e,"value"),t,n)}("set",t,e._path);const n=new k;return dc(e._repo,e._path,t,null,n.wrapCallback((()=>{}))),n.promise}function Oc(e){e=J(e);const t=new kc((()=>{})),n=new Dc(t);return function(e,t,n){const r=ml(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then((r=>{const i=Es(r).withIndex(t._queryParams.getIndex());let o;if(pl(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())o=ul(e.serverSyncTree_,t._path,i);else{const n=bl(e.serverSyncTree_,t);o=hl(e.serverSyncTree_,t._path,i,n)}return ec(e.eventQueue_,t._path,o),dl(e.serverSyncTree_,t,n,null,!0),i}),(n=>(hc(e,"get for query "+L(t)+" failed: "+n),Promise.reject(new Error(n)))))}(e._repo,e,n).then((t=>new Pc(t,new Sc(e._repo,e._path),e._queryParams.getIndex())))}class Dc{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new Ec("value",this,new Pc(e.snapshotNode,new Sc(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Tc(this,e,t):null}matches(e){return e instanceof Dc&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}function Lc(e,t,n,r,i){const o=new kc(n,void 0),s=new Dc(o);return function(e,t,n){let r;r=".info"===Do(t._path)?pl(e.infoSyncTree_,t,n):pl(e.serverSyncTree_,t,n),Zl(e.eventQueue_,t._path,r)}(e._repo,e,s),()=>function(e,t,n){let r;r=".info"===Do(t._path)?dl(e.infoSyncTree_,t,n):dl(e.serverSyncTree_,t,n),Zl(e.eventQueue_,t._path,r)}(e._repo,e,s)}!function(e){d(!$a,"__referenceConstructor has already been defined"),$a=e}(Sc),function(e){d(!Ka,"__referenceConstructor has already been defined"),Ka=e}(Sc);
/**
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
     */
const zc={};let Mc=!1;function qc(e,t,n,r,i){let o=r||e.options.databaseURL;void 0===o&&(e.options.projectId||Vi("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Wi("Using default host for project ",e.options.projectId),o=`${e.options.projectId}-default-rtdb.firebaseio.com`);let s,a=Ic(o,i),l=a.repoInfo;"undefined"!=typeof process&&process.env&&(s=process.env.FIREBASE_DATABASE_EMULATOR_HOST),s?(o=`http://${s}?ns=${l.namespace}`,a=Ic(o,i),l=a.repoInfo):a.repoInfo.secure;const c=new lo(e.name,e.options,t);Yl("Invalid Firebase Database URL",a),jo(a.path)||Vi("Database URL must point to the root of a Firebase Database (not including a child path).");const u=function(e,t,n,r){let i=zc[t.name];i||(i={},zc[t.name]=i);let o=i[e.toURLString()];o&&Vi("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return o=new rc(e,Mc,n,r),i[e.toURLString()]=o,o}(l,e,c,new ao(e.name,n));return new Fc(u,e)}class Fc{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ic(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Sc(this._repo,Oo())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=zc[t];n&&n[e.key]===e||Vi(`Database ${t}(${e.repoInfo_}) has already been deleted.`),function(e){e.persistentConnection_&&e.persistentConnection_.interrupt("repo_interrupt")}(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&Vi("Cannot call "+e+" on a deleted database.")}}Yo.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Yo.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)},
/**
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
     */
function(e){!function(e){Ri=e}(dt),st(new X("database",((e,{instanceIdentifier:t})=>qc(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t)),"PUBLIC").setMultipleInstances(!0)),ft(Si,Pi,e),ft(Si,Pi,"esm2017")}();const Uc=jc;function jc(e,t){const n=Vc();return(jc=function(e,t){return n[e-=116]})(e,t)}!function(e){const t=jc,n=e();for(;;)try{if(429230===parseInt(t(120))/1*(-parseInt(t(122))/2)+parseInt(t(125))/3+parseInt(t(121))/4+parseInt(t(130))/5*(parseInt(t(118))/6)+parseInt(t(126))/7+parseInt(t(132))/8*(parseInt(t(128))/9)+-parseInt(t(116))/10)break;n.push(n.shift())}catch(e){n.push(n.shift())}}(Vc);const Wc=ht({apiKey:Uc(124),authDomain:"moodlequizdatascraping.firebaseapp.com",databaseURL:Uc(127),projectId:Uc(129),storageBucket:Uc(131),messagingSenderId:Uc(123),appId:"1:782692660220:web:8258d30da03e338f4c3879"}),Hc=function(e=pt()){const t=at(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=at(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(j(n.getOptions(),null!=t?t:{}))return e;At(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:bi,persistence:[Mr,br,Ir]}),r=T("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(i=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Ei)return;const r=null==t?void 0:t.token;Ti!==r&&(Ti=r,await fetch(i,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){J(e).beforeAuthStateChanged(t,n)}(n,t,(()=>t(n.currentUser))),function(e,t,n,r){J(e).onIdTokenChanged(t,n,r)}(n,(e=>t(e)))}}var i;const o=C("auth");return o&&Kn(n,`http://${o}`),n}(Wc),Bc=function(e=pt(),t){const n=at(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=(e=>{const t=C(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]})("database");e&&function(e,t,n,r={}){e=J(e),e._checkNotDeleted("useEmulator"),e._instanceStarted&&Vi("Cannot call useEmulator() after instance has already been initialized.");const i=e._repoInternal;let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Vi('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new co(co.OWNER);else if(r.mockUserToken){const t="string"==typeof r.mockUserToken?r.mockUserToken:function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[_(JSON.stringify({alg:"none",type:"JWT"})),_(JSON.stringify(o)),""].join(".")}(r.mockUserToken,e.app.options.projectId);o=new co(t)}!function(e,t,n,r){e.repoInfo_=new mo(`${t}:${n}`,!1,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0),r&&(e.authTokenProvider_=r)}(i,t,n,o)}(n,...e)}return n}(Wc);function Vc(){const e=["5911080rBmvhp","database","228CcRarE","autenticacion","193319eHNHZw","1929796YdKFHC","2GpDLXm","782692660220","AIzaSyANIA0nk7P3RTo33P86jmW3GM6jMxxdoAs","90942gtIoIF","2035929BpawkH","https://moodlequizdatascraping-default-rtdb.firebaseio.com","2971197fGUlpB","moodlequizdatascraping","10515YKRupj","moodlequizdatascraping.appspot.com","8kXLUGj"];return(Vc=function(){return e})()}window[Uc(119)]=Hc,window[Uc(117)]=Bc;s("\r\n\r\n /* Estilos para el contenedor principal */\r\n .contenedor-login-autoquizfillapp {\r\n    width: 90%;\r\n    max-width: 400px;\r\n    /* Limitar el ancho máximo */\r\n    padding: 20px;\r\n    box-sizing: border-box;\r\n    background-color: #ffffff;\r\n    border-radius: 8px;\r\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    position: absolute;\r\n    top: 25%;\r\n    /* Centra verticalmente en la mitad superior */\r\n    left: 50%;\r\n    transform: translate(-50%, -25%);\r\n    font-family: 'Poppins', sans-serif;\r\n    /* Aplicar fuente Poppins */\r\n}\r\n\r\n/* Estilos para el título */\r\n.contenedor-titulo-autoquizfillapp h2 {\r\n    font-family: 'Poppins', sans-serif;\r\n    /* Asegurar que el título también use Poppins */\r\n    font-size: 32px;\r\n    color: #333;\r\n    margin-bottom: 20px;\r\n    text-align: center;\r\n}\r\n\r\n\r\n#titulo-verified {\r\n    font-family: 'Poppins', sans-serif;\r\n    /* Asegurar que el título también use Poppins */\r\n    font-size: 18px;\r\n    margin-bottom: 20px;\r\n    text-align: center;\r\n    font-weight: 600;\r\n    color: #34495e;\r\n    margin: 0;\r\n\r\n}\r\n\r\n/* Estilos para los inputs */\r\n.contenedor-inputs-autoquizfillapp {\r\n    width: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-entrada-autoquizfillapp {\r\n    width: 100%;\r\n    padding: 10px;\r\n    font-size: 16px;\r\n    border: 1px solid #bdc3c7;\r\n    border-radius: 5px;\r\n    box-sizing: border-box;\r\n    font-family: 'Poppins', sans-serif;\r\n    /* Aplicar fuente Poppins a los inputs */\r\n}\r\n\r\n.login-entrada-autoquizfillapp:focus {\r\n    border-color: #3498db;\r\n    outline: none;\r\n    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);\r\n}\r\n\r\n/* Estilos para el botón */\r\n.contenedor-boton-autoquizfillapp {\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.login-boton-autoquizfillapp {\r\n    width: 100%;\r\n    padding: 10px;\r\n    background-color: #3498db;\r\n    color: white;\r\n    font-size: 16px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s ease;\r\n    font-family: 'Poppins', sans-serif;\r\n    /* Aplicar fuente Poppins al botón */\r\n}\r\n\r\n.login-boton-autoquizfillapp:hover {\r\n    background-color: #2980b9;\r\n}");s("/* Título centrado */\r\n#titulo-autofillquizapp {\r\n    font-size: 22px;\r\n    /* Tamaño más grande para el título */\r\n    font-weight: 600;\r\n    color: #34495e;\r\n    /* Un color más oscuro y elegante */\r\n    text-align: center;\r\n    flex-grow: 1;\r\n    /* Ocupar el espacio disponible */\r\n    margin-left: 20px;\r\n    /* Ajuste para crear espacio entre el botón y el título */\r\n}\r\n\r\n/* Ajuste para asegurarse de que el botón tiene el espacio adecuado */\r\n#boton-hamburguesa-autofillquizapp {\r\n    background-color: #0073e6;\r\n    /* Fondo blanco */\r\n    color: #ffffff;\r\n    /* Azul moderno para el icono */\r\n    border: 2px solid #0073e6;\r\n    /* Bordes sutiles con el mismo color que el icono */\r\n    border-radius: 5px;\r\n    /* Botón redondo */\r\n    cursor: pointer;\r\n    /* Cambia el cursor a mano */\r\n    font-size: 24px;\r\n    /* Tamaño del icono */\r\n    width: 40px;\r\n    /* Ancho fijo */\r\n    height: 40px;\r\n    /* Alto fijo */\r\n    display: inline-flex;\r\n    /* Usar flexbox para alinear */\r\n    justify-content: center;\r\n    /* Centrar horizontalmente el icono */\r\n    align-items: center;\r\n    /* Centrar verticalmente el icono */\r\n    padding: 0;\r\n    /* Eliminar padding */\r\n    margin: 0;\r\n    /* Eliminar márgenes */\r\n    position: relative;\r\n    /* Mantener la posición en su contenedor */\r\n    z-index: 1000;\r\n    /* Asegura que el botón esté por encima de otros elementos */\r\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r\n    /* Sombra suave para darle profundidad */\r\n    transition: all 0.3s ease;\r\n    /* Transición suave para el hover */\r\n}\r\n\r\n/* Hover para darle efecto */\r\n#boton-hamburguesa-autofillquizapp:hover {\r\n    background-color: #002c67;\r\n    /* Fondo azul al hacer hover */\r\n    color: #ffffff;\r\n    /* Color blanco para el icono en hover */\r\n    border: 2px solid #002c67;\r\n    /* Bordes sutiles con el mismo color que el icono */\r\n\r\n    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);\r\n    /* Aumenta ligeramente la sombra en hover */\r\n    transform: translateY(-2px);\r\n    /* Levanta el botón ligeramente en hover */\r\n}\r\n\r\n/* Icono del botón de hamburguesa */\r\n#boton-hamburguesa-autofillquizapp i {\r\n    pointer-events: none;\r\n    /* Asegura que el icono no interfiera con el clic */\r\n}\r\n\r\n\r\n/* Contenido principal ocupará el resto del espacio */\r\n\r\n\r\n/* Ocultar barra de desplazamiento en navegadores basados en WebKit */\r\n#contenido-principal::-webkit-scrollbar {\r\n    display: none;\r\n    /* Ocultar barra de desplazamiento */\r\n}\r\n\r\n    /* Cabecera del panel: botón a la izquierda, título centrado */\r\n    .panel-header {\r\n        display: flex;\r\n        justify-content: flex-start; /* Alinear el botón y el título */\r\n        align-items: center;\r\n        padding: 15px 20px; /* Mayor espacio para una mejor sensación */\r\n        background-color: #ffffff; /* Fondo blanco limpio para el header */\r\n        border-bottom: 1px solid #e1e4e8; /* Borde inferior suave */\r\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra ligera */\r\n        position: relative;\r\n        border-radius: 4px 4px 0 0; /* Redondea solo los bordes superiores */\r\n\r\n    }\r\n\r\n    #panel-autofillquizapp {\r\n        display: block;\r\n        border-radius: 4px;\r\n        width: 100%; /* Ocupa todo el ancho del contenedor */\r\n        height: 100vh; /* O ajustado al contenedor padre */\r\n        overflow-y: hidden; /* Deshabilita el desplazamiento vertical */\r\n        box-sizing: border-box;\r\n    }\r\n    \r\n    #contenido-principal {\r\n        width: 100%;\r\n        height: calc(100% - 60px); /* Por ejemplo, ajusta el espacio si hay un header */\r\n        padding: 20px;\r\n        background-color: #ffffff;\r\n        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\r\n        overflow-y: auto; /* Permitir scroll si el contenido es largo */\r\n        -ms-overflow-style: none; /* Ocultar barra en IE y Edge */\r\n        scrollbar-width: none; /* Ocultar barra en Firefox */\r\n        border-radius: 0 0 8px 8px;\r\n        box-sizing: border-box;\r\n    }\r\n    ");function Qc(e,t){var n=$c();return(Qc=function(e,t){return n[e-=376]})(e,t)}function $c(){var e=["989127HQFZuh","19317410HfTNmW",'\n     <div class="body-autoquiz">\n\n<div class="container-autoquiz">\n\n    <div class="users">\n\n        \x3c!-- Columna para mostrar el nombre de usuario actual con icono de usuario --\x3e\n        <div class="usuario-actual">\n            <i class="fa-solid fa-user"></i>\n            <span id="nombre-usuario-actual" class="nombre-usuario"></span>\n        </div>\n\n<select id="siguiente-usuario" class="select-siguiente-usuario" >\n</select>\n\n<button id="boton-siguiente-usuario" class="boton-siguiente-usuario">\n    <i class="fa-solid fa-angles-right"></i>\n</button>\n\n    </div>\n\n\n    \x3c!-- Contenedor Principal --\x3e\n    <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">\n\n        \x3c!-- Contenedor para Ruta y Ciclo apilados verticalmente --\x3e\n        <div class="ruta-ciclo-container">\n\n            \x3c!-- Ruta --\x3e\n            <div id="ruta-configruta" class="title-configruta-ruta">\n                <span class="label-configruta">Ruta:</span>\n            </div>\n\n            \x3c!-- Ciclo --\x3e\n            <div id="ciclo-configruta" class="title-configruta-ciclo">\n                <span class="label-configruta">Ciclo:</span>\n            </div>\n\n        </div>\n    </div>\n\n            \x3c!-- Contenedor para Subject Dinamic --\x3e\n<div id="container-ruta-dinamica" class="subcontainer-autoquiz-autosavereview" style="display: none;" >\n\n\n        <div class="header-autoquiz">\n            \x3c!-- Título y Switch --\x3e\n            <h3 id="titulo-autoquiz-subject-dinamic">Ruta Dinámica</h3>\n\n            <label class="switch-autoquiz">\n                <input type="checkbox" id="switch-ruta-dinamica">\n                <span class="slider round"></span>\n            </label>\n\n        </div>\n\n        <div id="body-autoquiz-autosavereview-subject-dinamic" class="body-autoquiz">\n\n<div id="selects-subject-dinamic" >\n</div>\n\n        </div>\n    </div>\n\n\n    \x3c!-- Nuevo contenedor para AutoFill--\x3e\n    <div id="container-autofill" class="subcontainer-autoquiz-autofill" style="display: none;">\n\n        <div class="header-autoquiz">\n            <h2 id="titulo-autoquiz">AutoFill</h2>\n\n            <label class="switch-autoquiz">\n                <input type="checkbox" id="switch-autofill">\n                <span class="slider round"></span>\n            </label>\n        </div>\n\n        \x3c!-- Contenido de AutoFill--\x3e\n        <div id="body-autoquiz-autofill" class="body-autoquiz" style="display: none;">\n\n            \x3c!-- Contenedor dinámico para las preguntas generadas --\x3e\n            <div id="contenedor-preguntas" class="contenedor-preguntas">\n                \x3c!-- Aquí se insertarán dinámicamente los detalles de cada pregunta --\x3e\n            </div>\n\n        </div>\n    </div>\n\n    \x3c!-- Contenedor para AutoSave --\x3e\n    <div id="container-autosave" class="subcontainer-autoquiz-autosave" style="display: none;">\n\n        <div class="header-autoquiz">\n            \x3c!-- Título y Switch --\x3e\n            <h2 id="titulo-autoquiz">AutoSave</h2>\n            <label class="switch-autoquiz">\n                <input type="checkbox" id="switch-autosave">\n                <span class="slider round"></span>\n            </label>\n        </div>\n\n        \x3c!-- Contenido de AutoSave --\x3e\n        <div id="body-autoquiz-autosave" class="body-autoquiz">\n\n            <div class="dato-autoquiz">\n                <div>\n                    <span id="respuestasautosave"></span>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n\n    \x3c!-- Contenedor para AutoSaveReview --\x3e\n    <div id="container-autosavereview" class="subcontainer-autoquiz-autosavereview" style="display: none;">\n\n        <div class="header-autoquiz">\n            \x3c!-- Título y Switch --\x3e\n            <h3 id="titulo-autoquiz">AutoSaveReview</h3>\n            <label class="switch-autoquiz">\n                <input type="checkbox" id="switch-autosavereview">\n                <span class="slider round"></span>\n            </label>\n        </div>\n\n        \x3c!-- Contenido de AutoSaveReview --\x3e\n        <div id="body-autoquiz-autosavereview" class="body-autoquiz">\n\n            <div class="dato-autoquiz">\n                <div>\n                    <span id="respuestasautosavereview"></span>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    \x3c!-- Contenedor Verified --\x3e\n    <div id="container-verified" class="subcontainer-autoquiz-verified" style="display: none;">\n\n        \x3c!-- Head Verified --\x3e\n        <div class="header-autoquiz">\n        <h4 id="titulo-autoquiz">Verificar Preguntas</h4>\n\n        </div>\n\n        \x3c!-- Body Verified --\x3e\n        <div id="body-autoquiz-verified" class="body-autoquiz">\n\n        </div>\n    </div>\n\n</div>\n\n</div>\n',"373679PqdKGg","466110gwYciP","16zksmOU","1677912bQBWck","15519mKIMtQ","2022uthLmt","6UXpdnb","63086hDfchW"];return($c=function(){return e})()}function Kc(e,t){const n=Gc();return(Kc=function(e,t){return n[e-=347]})(e,t)}function Gc(){const e=["[AutoQuizFill] Creando main-panel","243313TzMKqs","flex","span","AutoFillQuiz App","menu-autofillquizapp","426813OuvcLm","classList","contenido-principal","contenido-principal-autofillquizapp","845gFZRNd","13988007WjjuDb","error","log","panel-autofillquizapp","La función opcionAutoQuiz_js no está definida.","add","6812YiYDNg","click","6846xVkbCo","div","appendChild","8SbzNiL","style","warn","getElementById","function","72WWlrAZ","button","1192kfwOvh","boton-hamburguesa-autofillquizapp","37667yjVPjC","display","10NcTerP","innerHTML","createElement","46968rsZlUL","addEventListener","962190dzabFv"];return(Gc=function(){return e})()}function Yc(e){const t=Kc;console[t(378)](t(365));const n=document[t(361)](t(385));n.id=t(379),n[t(372)][t(381)](t(379)),n[t(349)][t(358)]="none";const r=document[t(361)](t(385));r[t(372)].add("panel-header");const i=document.createElement(t(354));i.id=t(356),i[t(372)][t(381)](t(356)),i[t(360)]='<i class="fa-solid fa-bars"></i>';const o=document[t(361)](t(368));o.id="titulo-autofillquizapp",o[t(372)][t(381)]("titulo-autofillquizapp"),o[t(360)]=t(369);const s=document[t(361)]("div");return s.id=t(373),s[t(372)][t(381)](t(374)),s[t(360)]=Qc(378),r[t(347)](i),r[t(347)](o),n[t(347)](r),n[t(347)](s),e[t(347)](n),setTimeout((()=>{const e=t;typeof opcionAutoQuiz_js===e(352)?opcionAutoQuiz_js():console[e(350)](e(380))}),100),i[t(363)](t(383),(()=>{const e=t,n=document[e(351)](e(370));n?n.style.display=e(367):console[e(377)]("El menú no se encontró en el DOM.")})),n}s('.dynamic-select {\r\n    width: 100%; /* Ocupar todo el ancho del contenedor */\r\n    padding: 0.5rem 1rem; /* Espaciado interno */\r\n    font-size: 1rem; /* Tamaño de fuente */\r\n    color: #333; /* Texto en gris oscuro */\r\n    background-color: #fff; /* Fondo blanco */\r\n    border: 1px solid #ccc; /* Borde tenue */\r\n    border-radius: 4px; /* Bordes redondeados */\r\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */\r\n    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transición en foco */\r\n}\r\n\r\n/* Estilo al pasar el mouse por encima */\r\n.dynamic-select:hover {\r\n    border-color: #888; /* Borde más visible */\r\n}\r\n\r\n/* Estilo al enfocar el select */\r\n.dynamic-select:focus {\r\n    border-color: #007bff; /* Azul para el foco */\r\n    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra azul */\r\n    outline: none; /* Quitar borde predeterminado */\r\n}\r\n\r\n/* Estilo para las opciones dentro del select */\r\n.dynamic-select option {\r\n    font-size: 1rem; /* Tamaño de fuente uniforme */\r\n    color: #333; /* Color del texto */\r\n    padding: 0.5rem; /* Espaciado interno */\r\n}\r\n\r\n/* Estilo específico para pantallas pequeñas */\r\n@media (max-width: 600px) {\r\n    .dynamic-select {\r\n        font-size: 0.9rem; /* Ajustar tamaño de fuente */\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n                .autosavereview-verified {\r\n            display: inline-block;\r\n            background-color: LimeGreen;\r\n            color: white;\r\n            padding: 5px 10px;\r\n            margin-left: 10px;\r\n            border-radius: 5px;\r\n            font-weight: 600;\r\n    font-size: 14px;\r\n        }\r\n\r\n                .autosavereview-no-verified-correct {\r\n            display: inline-block;\r\n            background-color: LimeGreen;\r\n            color: white;\r\n            padding: 5px 10px;\r\n            margin-left: 10px;\r\n            border-radius: 5px;\r\n            font-weight: 600;\r\n    font-size: 14px;\r\n        }\r\n\r\n                        .autosavereview-no-verified {\r\n            display: inline-block;\r\n            background-color: Red;\r\n            color: white;\r\n            padding: 5px 10px;\r\n            margin-left: 10px;\r\n            border-radius: 5px;\r\n            font-weight: 600;\r\n    font-size: 14px;\r\n        }\r\n\r\n.autosavereview-contestar {\r\n            display: inline-block;\r\n            background-color: red;\r\n            color: white;\r\n            padding: 5px 10px;\r\n            margin-left: 10px;\r\n            border-radius: 5px;\r\n            font-weight: 600;\r\n    font-size: 14px;\r\n        }\r\n\r\n.select-siguiente-usuario {\r\n    font-size: 14px;              /* Tamaño de fuente para el texto seleccionado */\r\n    font-weight: 600;             /* Grosor de la fuente para el texto seleccionado */\r\n    color: #34495e;               /* Color del texto seleccionado */\r\n    border: none;                 /* Elimina el borde del select */\r\n    background-color: transparent;/* Fondo transparente */\r\n    outline: none;                /* Elimina el borde de enfoque */\r\n    appearance: none;             /* Quita el estilo predeterminado del navegador */\r\n    cursor: pointer;              /* Cambia el cursor a pointer */\r\n    text-align: right;            /* Alinea el texto seleccionado a la derecha */\r\n    padding-right: 0px;           /* Espacio entre el texto y el borde derecho */\r\n    direction: rtl;               /* Alinea el desplegable hacia la derecha */\r\n}\r\n\r\n/* Estilo de las opciones dentro del select */\r\n.select-siguiente-usuario option {\r\n    font-size: 12px;              /* Tamaño de fuente más pequeño para las opciones desplegables */\r\n    padding: 10px;            /* Espacio alrededor del texto en cada opción */\r\n    text-align: right;           /* Centra el texto dentro de las opciones */\r\n    direction: ltr;               /* Restablece la dirección del texto para que se lea correctamente */\r\n}\r\n\r\n/* Limita la altura del desplegable para mostrar un número reducido de opciones */\r\n.select-siguiente-usuario {\r\n    max-height: 30px;             /* Reduce la altura visible del select */\r\n    overflow-y: auto;             /* Habilita la barra de desplazamiento vertical */\r\n}\r\n\r\n/* Personalización de la barra de desplazamiento */\r\n.select-siguiente-usuario::-webkit-scrollbar {\r\n    width: 2px;                   /* Reduce la anchura de la barra de desplazamiento */\r\n}\r\n\r\n.select-siguiente-usuario::-webkit-scrollbar-thumb {\r\n    background-color: rgba(52, 73, 94, 0.2); /* Barra de desplazamiento más transparente */\r\n    border-radius: 10px;          /* Bordes redondeados para la barra */\r\n}\r\n\r\n.select-siguiente-usuario::-webkit-scrollbar-track {\r\n    background-color: transparent;/* Fondo transparente para la pista de la barra */\r\n}\r\n\r\n/* Destacar la opción seleccionada incluso al pasar el mouse */\r\n/* Nota: Debido a limitaciones, esto solo funciona en algunos navegadores */\r\n.select-siguiente-usuario option:checked {\r\n    background-color: #dcdde1;    /* Fondo diferente para la opción seleccionada */\r\n    font-weight: bold;            /* Fuente en negrita para la opción seleccionada */\r\n}\r\n\r\n/* Evitar que el hover cambie el estilo de la opción seleccionada */\r\n.select-siguiente-usuario option:hover {\r\n    background-color: #f1f2f6;    /* Fondo al pasar el mouse */\r\n}\r\n\r\n/* Mantener el estilo de la opción seleccionada al hacer hover */\r\n.select-siguiente-usuario option:hover:checked {\r\n    background-color: #dcdde1;    /* Mantiene el fondo de la opción seleccionada */\r\n}\r\n\r\n\r\n\r\n/* Estilos para los checkboxes de AutoQuiz */\r\n.autoquiz-checkbox {\r\n    accent-color: #0072c5; /* Color por defecto para checkboxes habilitados */\r\n    width: 20px; /* Tamaño opcional */\r\n    height: 20px; /* Tamaño opcional */\r\n}\r\n\r\n/* Cambiar el color del checkbox cuando está deshabilitado */\r\n.autoquiz-checkbox:disabled {\r\n    accent-color: green; /* Cambia a verde cuando está deshabilitado */\r\n    cursor: not-allowed; /* Cambiar el cursor para indicar que está deshabilitado */\r\n}\r\n\r\n/* Opcional: Mejorar la apariencia general de los checkboxes */\r\n.checkbox-item {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-bottom: 8px; /* Espaciado entre los items */\r\n}\r\n\r\n.checkbox-verified {\r\n    margin-right: 8px; /* Espaciado entre el checkbox y el label */\r\n}\r\n\r\n\r\n.boton-siguiente-usuario {\r\n    margin-top: 0;\r\n    margin-bottom: 0;           /* Establece el margen superior a 0 */\r\n    font-weight: 600;       /* Hace el texto del botón más negrito (600) */\r\n    border: none;           /* Elimina cualquier borde */\r\n    background-color: transparent; /* Fondo transparente */\r\n    cursor: pointer;        /* Cambia el cursor a pointer para indicar que es interactivo */\r\n    padding: 0px 3px;      /* Espaciado interno opcional */\r\n}\r\n\r\n.boton-siguiente-usuario i {\r\n    font-size: 0.90em;       /* Ajusta el tamaño del ícono dentro del botón */\r\n    color: #34495e;         /* Color del ícono */\r\n}\r\n\r\n              /* Estilos básicos para los checkboxes */\r\n        .checkbox-item {\r\n            display: flex;\r\n            align-items: center;\r\n            margin-top: 5px;\r\n        }\r\n        .checkbox-item label {\r\n            margin-left: 8px;\r\n            margin-bottom: 0px;\r\n            margin-top: 0px;\r\n        }\r\n\r\n\r\n      .boton-verificar {\r\n        width: 100%;\r\n        padding: 12px;\r\n        background-color: #0072c5;\r\n        color: white;\r\n        border: none;\r\n        border-radius: 5px;\r\n        font-size: 16px;\r\n        cursor: pointer;\r\n        box-shadow: 0 2px 5px rgba(0,0,0,0.1);\r\n        transition: background-color 0.3s ease, box-shadow 0.3s ease;\r\n    }\r\n\r\n    /* Efecto hover en los botones */\r\n    .boton-verificar:hover {\r\n        background-color: #002c67;\r\n        box-shadow: 0 4px 10px rgba(0,0,0,0.2);\r\n    }\r\n.buttons-container-verificar {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 5px; /* Espacio entre los botones */\r\n    margin-bottom: 10px; /* Espacio debajo de los botones */\r\n}\r\n\r\n\r\n\r\n        /* Estilos para el contenedor de Verificar */\r\n        .subcontainer-autoquiz-verificar {\r\n            margin-top: 10px; /* Espaciado superior para separar del contenido anterior */\r\n            margin-bottom: 10px; /* Espaciado inferior */\r\n            background-color: #f4f4f4; /* Color de fondo suave */\r\n            padding: 10px 15px; /* Relleno interno */\r\n            border-radius: 8px; /* Bordes redondeados */\r\n            border: 1px solid #dcdcdc; /* Borde suave */\r\n            overflow-y: auto; /* Habilitar desplazamiento si es necesario */\r\n            max-height: 100px; /* Limitar la altura máxima a 100px */\r\n        }\r\n\r\n        /* Estilos para el botón "Verificar Preguntas" */\r\n        .boton-verified {\r\n            width: 100%; /* Asegurarse de que ocupe todo el ancho disponible */\r\n            padding: 12px;\r\n            background-color: #0072c5; /* Color de fondo */\r\n            color: white; /* Color del texto */\r\n            border: none; /* Sin bordes */\r\n            border-radius: 5px; /* Bordes redondeados */\r\n            font-size: 16px; /* Tamaño de la fuente */\r\n            cursor: pointer; /* Cambiar el cursor al pasar sobre el botón */\r\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */\r\n            transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transiciones suaves */\r\n              margin-top: -4px; /* Margen inferior */\r\n              margin-bottom: 6px; /* Margen inferior */\r\n        }\r\n\r\n        /* Efecto hover en el botón "Verificar Preguntas" */\r\n        .boton-verified:hover {\r\n            background-color: #002c67; /* Cambio de color de fondo al pasar el cursor */\r\n            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el cursor */\r\n        }\r\n\r\n        /* Estilos para el contenedor de cada pregunta */\r\n        .question-container-autoquiz {\r\n            display: flex;\r\n            flex-direction: column;\r\n            justify-content: flex-start;\r\n            align-items: flex-start;\r\n            padding: 0;\r\n            color: #34495e;\r\n            flex-wrap: wrap;\r\n            width: 100%;\r\n            word-wrap: break-word;\r\n            word-break: break-word;\r\n            margin-bottom: 7px; /* Espacio entre preguntas */\r\n        }\r\n\r\n        /* Estilos para el título de la pregunta */\r\n        .question-title-autoquiz {\r\n            color: #333;\r\n            font-size: 13px;\r\n            font-weight: 500;\r\n            margin-bottom: -1px; /* Espacio después del título */\r\n        }\r\n\r\n        /* Contenedor para agrupar cada par de etiqueta-valor (Estado y Similitud) */\r\n        .question-data-group {\r\n            display: flex; /* Asegura que los elementos se alineen horizontalmente */\r\n            flex-direction: row; /* Coloca la etiqueta y el valor en una sola línea */\r\n            justify-content: flex-start;\r\n            align-items: center; /* Alinea verticalmente el contenido al centro */\r\n            margin: 0 0 -4px 0px; /* Eliminar margen adicional */\r\n            padding: 0; /* Eliminar padding adicional */\r\n        }\r\n\r\n        /* Estilos para los elementos de etiqueta como Estado, Similitud */\r\n        .question-label-autoquiz {\r\n            color: #333;\r\n            font-size: 13px;\r\n            font-weight: 500;\r\n            margin-right: 3px; /* Espacio entre la etiqueta y el valor */\r\n        }\r\n\r\n        /* Estilos para los valores correspondientes a Estado y Similitud */\r\n        /* Estilos para los valores correspondientes a Estado, Similitud, Respuestas */\r\n        .question-value-autoquiz {\r\n            color: #333;\r\n            font-size: 12px;\r\n            font-weight: 400;\r\n            font-style: normal;\r\n            line-height: 1.2; /* Ajuste para eliminar el espacio entre líneas */\r\n        }\r\n\r\n\r\n        /* Estilo para el contenedor específico de las respuestas */\r\n        .responses-container {\r\n            margin: 0px; /* Sin margen adicional */\r\n        }\r\n\r\n        .responses-container .question-label-autoquiz {\r\n            display: block; /* Mantiene la etiqueta "Respuestas" en una sola línea */\r\n            margin-bottom: 0px; /* Sin espacio adicional debajo de la etiqueta */\r\n            margin-top: 0px; /* Sin espacio adicional debajo de la etiqueta */\r\n        }\r\n\r\n        .responses-container .question-value-autoquiz {\r\n            display: block; /* Asegura que las respuestas aparezcan en una nueva línea */\r\n            margin-top: -2px; /* Sin margen adicional arriba de las respuestas */\r\n            padding-left: 0px; /* Alineación directa debajo de la etiqueta */\r\n        }\r\n\r\n\r\n           /* Estilos para el contenedor principal que ocupa toda la ventana */\r\n        .container-autoquiz {\r\n            height: 100vh;\r\n            display: flex;\r\n            flex-direction: column;\r\n            justify-content: flex-start;\r\n            padding: 10px;\r\n            box-sizing: border-box;\r\n            font-family: \'Poppins\', sans-serif;\r\n            overflow-y: auto; /* Permite el desplazamiento vertical */\r\n            -ms-overflow-style: none; /* Ocultar en Internet Explorer y Edge */\r\n            scrollbar-width: none; /* Ocultar en Firefox */\r\n        }\r\n\r\n        /* Ocultar la barra de desplazamiento en Chrome, Safari y Opera */\r\n        .container-autoquiz::-webkit-scrollbar {\r\n            display: none;\r\n        }\r\n\r\n\r\n            /* Estilo para el contenedor que muestra los usuarios actuales y siguientes */\r\n            .users {\r\n                display: flex;\r\n                justify-content: space-between;\r\n                align-items: center;\r\n                width: 100%;\r\n                box-sizing: border-box;\r\n                margin-bottom: 15px ;\r\n            }\r\n\r\n            /* Estilo para el nombre de usuario */\r\n            .nombre-usuario, .nombre-siguiente-usuario {\r\n                font-size: 14px;\r\n                font-weight: 600;\r\n                color: #34495e;\r\n                margin: 0 5px;\r\n            }\r\n\r\n            /* Sección de usuario actual alineada a la izquierda */\r\n            .usuario-actual {\r\n                display: flex;\r\n                align-items: center;\r\n                justify-content: flex-start;\r\n                flex: 1;\r\n            }\r\n\r\n\r\n\r\n        /* Botón para el siguiente usuario sin fondo ni bordes */\r\n        .boton-simple-autoquiz {\r\n            background: none;\r\n            border: none;\r\n            color: #34495e;\r\n            font-size: 14px;\r\n            font-weight: 600;\r\n            cursor: pointer;\r\n            display: inline-flex; /* Cambiamos a inline-flex para respetar el ancho del texto */\r\n            align-items: center;\r\n            justify-content: flex-start; /* Alinea el texto y el ícono de forma continua */\r\n            width: auto; /* Ajusta el ancho según el contenido */\r\n            white-space: normal; /* Permite el quiebre del texto si el ancho es pequeño */\r\n            padding: 0;\r\n            margin: 0;\r\n        }\r\n\r\n        /* Alinear el ícono justo después del texto */\r\n        .boton-simple-autoquiz i {\r\n            margin-left: 5px; /* Añade un pequeño margen para separar el ícono del texto */\r\n            flex-shrink: 0; /* Evita que el ícono se reduzca en tamaños pequeños */\r\n            margin-bottom: 5px;\r\n        }\r\n\r\n        /* Efecto al hacer clic o al enfocarse */\r\n        .boton-simple-autoquiz:focus,\r\n        .boton-simple-autoquiz:active {\r\n            outline: none;\r\n            color: #2c3e50;\r\n            background: none;\r\n        }\r\n\r\n            /* Estilo para la ruta configurada */\r\n            .ruta-config {\r\n                margin-top: 10px;\r\n                font-size: 10px;\r\n                color: #34495e;\r\n            }\r\n\r\n        /* Ajuste para que el contenedor AutoSave ocupe todo el espacio restante */\r\n        .subcontainer-autoquiz-autofill {\r\n                margin-top: 10px;\r\n            margin-bottom: 10px;\r\n            background-color: #f4f4f4;\r\n            padding: 10px 15px;\r\n            border-radius: 8px;\r\n            border: 1px solid #dcdcdc;\r\n            overflow-y: auto; /* Habilitar desplazamiento si es necesario */\r\n            max-height: 300px; /* Limitar la altura máxima a 350px */\r\n\r\n        }\r\n        /* Estilos personalizados para la barra de desplazamiento */\r\n        .subcontainer-autoquiz-autofill::-webkit-scrollbar {\r\n            width: 3px; /* Ancho del scrollbar */\r\n        height: 3px; /* Alto del scrollbar horizontal */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autofill::-webkit-scrollbar-track {\r\n            background: transparent; /* Fondo del track transparente */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autofill::-webkit-scrollbar-thumb {\r\n            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */\r\n            border-radius: 10px; /* Bordes redondeados */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autofill::-webkit-scrollbar-thumb:hover {\r\n            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */\r\n        }\r\n\r\n        /* Ajuste para que el contenedor AutoSave ocupe todo el espacio restante */\r\n        .subcontainer-autoquiz-autosave {\r\n            margin-top: 10px;\r\n            margin-bottom: 10px;\r\n            background-color: #f4f4f4;\r\n            padding: 10px 15px;\r\n            border-radius: 8px;\r\n            border: 1px solid #dcdcdc;\r\n            overflow-y: auto; /* Habilitar desplazamiento si es necesario */\r\n            max-height: 300px; /* Limitar la altura máxima a 350px */\r\n        }\r\n\r\n        /* Estilos personalizados para la barra de desplazamiento */\r\n        .subcontainer-autoquiz-autosave::-webkit-scrollbar {\r\n            width: 3px; /* Ancho del scrollbar */\r\n            height: 3px; /* Alto del scrollbar horizontal */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosave::-webkit-scrollbar-track {\r\n            background: transparent; /* Fondo del track transparente */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosave::-webkit-scrollbar-thumb {\r\n            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */\r\n            border-radius: 10px; /* Bordes redondeados */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosave::-webkit-scrollbar-thumb:hover {\r\n            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */\r\n        }\r\n\r\n        .subcontainer-autoquiz-verified {\r\n            margin-top: 10px;\r\n            margin-bottom: 10px;\r\n            background-color: #f4f4f4;\r\n            padding: 10px 15px;\r\n            border-radius: 8px;\r\n            border: 1px solid #dcdcdc;\r\n            overflow-y: auto; /* Habilitar desplazamiento si es necesario */\r\n            max-height: 350px; /* Limitar la altura máxima a 350px */\r\n        }\r\n\r\n        /* Estilos personalizados para la barra de desplazamiento */\r\n        .subcontainer-autoquiz-verified::-webkit-scrollbar {\r\n            width: 3px; /* Ancho del scrollbar */\r\n            height: 3px; /* Alto del scrollbar horizontal */\r\n        }\r\n\r\n        .subcontainer-autoquiz-verified::-webkit-scrollbar-track {\r\n            background: transparent; /* Fondo del track transparente */\r\n        }\r\n\r\n        .subcontainer-autoquiz-verified::-webkit-scrollbar-thumb {\r\n            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */\r\n            border-radius: 10px; /* Bordes redondeados */\r\n        }\r\n\r\n        .subcontainer-autoquiz-verified::-webkit-scrollbar-thumb:hover {\r\n            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosavereview {\r\n            margin-top: 10px;\r\n            margin-bottom: 10px;\r\n            background-color: #f4f4f4;\r\n            padding: 10px 15px;\r\n            border-radius: 8px;\r\n            border: 1px solid #dcdcdc;\r\n            overflow-y: auto; /* Habilitar desplazamiento si es necesario */\r\n            max-height: 350px; /* Limitar la altura máxima a 350px */\r\n        }\r\n\r\n        /* Estilos personalizados para la barra de desplazamiento */\r\n        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar {\r\n            width: 3px; /* Ancho del scrollbar */\r\n            height: 3px; /* Alto del scrollbar horizontal */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-track {\r\n            background: transparent; /* Fondo del track transparente */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-thumb {\r\n            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */\r\n            border-radius: 10px; /* Bordes redondeados */\r\n        }\r\n\r\n        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-thumb:hover {\r\n            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */\r\n        }\r\n\r\n            /* Estilo común para el header que contiene el título y el switch */\r\n        .header-autoquiz {\r\n            margin-top: 5px;\r\n            display: flex;\r\n            justify-content: space-between;\r\n            align-items: center;\r\n            margin-bottom: 5px;\r\n        }\r\n\r\n        /* Estilo para el título */\r\n        .header-autoquiz h2 {\r\n            font-size: 22px;\r\n            font-weight: 600;\r\n            color: #34495e;\r\n            margin: 0;\r\n        }\r\n\r\n        .header-autoquiz h3 {\r\n            font-size: 20px;\r\n            font-weight: 600;\r\n            color: #34495e;\r\n            margin: 0;\r\n\r\n        }\r\n\r\n         .header-autoquiz h4 {\r\n         width: 100%;\r\n         display: flex;\r\n    justify-content: center;\r\n            font-size: 22px;\r\n            font-weight: 600;\r\n            color: #34495e;\r\n            margin: 0;\r\n            text-align: center;\r\n        }\r\n\r\n        /* Estilo para el switch */\r\n        .switch-autoquiz {\r\n            position: relative;\r\n            display: inline-block;\r\n            width: 34px;\r\n            height: 20px;\r\n        }\r\n\r\n        .switch-autoquiz input {\r\n            opacity: 0;\r\n            width: 0;\r\n            height: 0;\r\n        }\r\n\r\n        .slider {\r\n            position: absolute;\r\n            cursor: pointer;\r\n            top: 0;\r\n            left: 0;\r\n            right: 0;\r\n            bottom: 0;\r\n            background-color: #ccc;\r\n            transition: 0.4s;\r\n            border-radius: 20px;\r\n        }\r\n\r\n        .slider:before {\r\n            position: absolute;\r\n            content: "";\r\n            height: 12px;\r\n            width: 12px;\r\n            border-radius: 50%;\r\n            left: 4px;\r\n            bottom: 4px;\r\n            background-color: white;\r\n            transition: 0.4s;\r\n        }\r\n\r\n        input:checked + .slider {\r\n            background-color: #3498db;\r\n        }\r\n\r\n        input:checked + .slider:before {\r\n            transform: translateX(14px);\r\n        }\r\n\r\n        /* Estilo para el contenido dentro de los contenedores de AutoFill y AutoSave */\r\n        .body-autoquiz {\r\n            display: flex;\r\n            flex-direction: column;\r\n            gap: 0px;\r\n            font-size: 16px;\r\n            width: 100%; /* Para que ocupe el 100% del ancho del contenedor padre */\r\n        }\r\n\r\n        /* Estilo para cada línea de dato en AutoFill y AutoSave */\r\n        .dato-autoquiz {\r\n            display: flex;\r\n            justify-content: flex-start;\r\n            align-items: center;\r\n            padding: 0;\r\n            color: #34495e;\r\n            flex-wrap: wrap; /* Permitir que el contenido se ajuste si es muy largo */\r\n            width: 100%; /* Para que ocupe todo el ancho del contenedor */\r\n            word-wrap: break-word; /* Romper palabras si son muy largas */\r\n            word-break: break-word; /* Para manejar palabras largas en el texto */\r\n        }\r\n\r\n\r\n        /* Si la ruta no es válida, oculta los contenedores */\r\n        #container-autofill[style*="display: none"],\r\n            #container-autosave[style*="display: none"] {\r\n                display: none;\r\n            }\r\n\r\n        /* Estilo para el contenedor oculto que se muestra al hacer clic */\r\n        #container-viewquestion {\r\n            margin-top: 0;\r\n            padding: 10px;\r\n            font-size: 14px;\r\n            background-color: #f8f8f8;\r\n            border: 1px solid #ddd;\r\n            border-radius: 5px;\r\n        }\r\n\r\n        /* Estilos para la pregunta */\r\n        .preguntaautosave {\r\n            color: #333; /* Color casi negro */\r\n            font-size: 13px; /* Puedes ajustar el tamaño de la fuente aquí */\r\n            font-weight: 500;\r\n            margin-top: 5px;\r\n            /* Grosor modificable: 100 (fino), 400 (normal), 700 (grueso), etc. */\r\n        }\r\n\r\n        /* Estilos para las respuestas */\r\n        .respuestasautosave {\r\n            color: #333; /* Color casi negro, igual que las preguntas */\r\n            font-size: 12px; /* Tamaño de la fuente, ajustable */\r\n            font-weight: 400; /* Eliminar negritas */\r\n            font-style: normal; /* Eliminar la cursiva */\r\n        }\r\n\r\n        /* Estilos para la pregunta */\r\n        .preguntaautosavereview {\r\n            color: #333; /* Color casi negro */\r\n            font-size: 13px; /* Puedes ajustar el tamaño de la fuente aquí */\r\n            font-weight: 500;\r\n            margin-top: 5px;\r\n            /* Grosor modificable: 100 (fino), 400 (normal), 700 (grueso), etc. */\r\n        }\r\n\r\n        /* Estilos para las respuestas */\r\n        .respuestasautosavereview {\r\n            color: #333; /* Color casi negro, igual que las preguntas */\r\n            font-size: 12px; /* Tamaño de la fuente, ajustable */\r\n            font-weight: 400; /* Eliminar negritas */\r\n            font-style: normal; /* Eliminar la cursiva */\r\n        }\r\n\r\n'),function(e){for(var t=Qc,n=e();;)try{if(401295===-parseInt(t(379))/1+-parseInt(t(386))/2*(-parseInt(t(385))/3)+parseInt(t(381))/4*(-parseInt(t(380))/5)+-parseInt(t(384))/6*(parseInt(t(383))/7)+-parseInt(t(382))/8+parseInt(t(376))/9+parseInt(t(377))/10)break;n.push(n.shift())}catch(e){n.push(n.shift())}}($c),function(e){const t=Kc,n=e();for(;;)try{if(656884===parseInt(t(366))/1*(-parseInt(t(359))/2)+parseInt(t(371))/3*(-parseInt(t(348))/4)+parseInt(t(375))/5*(-parseInt(t(384))/6)+parseInt(t(357))/7*(parseInt(t(355))/8)+parseInt(t(353))/9*(parseInt(t(364))/10)+-parseInt(t(376))/11+-parseInt(t(362))/12*(-parseInt(t(382))/13))break;n.push(n.shift())}catch(e){n.push(n.shift())}}(Gc);s("/* Estilos para el menú lateral */\r\n#menu-autofillquizapp {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0; /* Posicionar el menú a la izquierda */\r\n    min-width: 350px; /* Ancho de 350px */\r\n    max-width: 500px;\r\n    height: 100vh; /* Ocupar toda la altura de la pantalla */\r\n    background-color: #2c3e50; /* Fondo oscuro elegante */\r\n    color: #ecf0f1; /* Texto claro */\r\n    z-index: 10000;\r\n    display: none; /* Oculto por defecto */\r\n    flex-direction: column;\r\n    padding-top: 20px;\r\n    border-radius: 0 5px 5px 0; /* Borde redondeado en los lados derecho */\r\n    overflow-y: hidden; /* Ocultar barra de desplazamiento vertical */\r\n    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2); /* Sombra suave */\r\n    font-family: 'Poppins', sans-serif; /* Aplicar Poppins a todo el menú */\r\n}\r\n\r\n\r\n/* Contenedor del botón cerrar y la palabra Menú */\r\n.contenedor-header-menu {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between; /* Alinear título a la izquierda y botón a la derecha */\r\n    padding: 10px;\r\n    position: relative;\r\n}\r\n\r\n/* Botón para cerrar el menú, alineado a la derecha */\r\n#boton-cerrar-menu-autofillquizapp {\r\n    background-color: #e74c3c; /* Fondo rojo típico de los botones de cerrar */\r\n    color: #fff;\r\n    border: none;\r\n    font-size: 18px;\r\n    cursor: pointer;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 5px;\r\n    position: absolute;\r\n    right: 25px; /* Posicionar a la derecha */\r\n}\r\n\r\n#boton-cerrar-menu-autofillquizapp:hover {\r\n    background-color: #c0392b; /* Cambio de color en hover */\r\n}\r\n\r\n/* Título \"Menú\", alineado a la izquierda */\r\n.titulo-menu {\r\n    font-size: 22px;\r\n    font-weight: bold;\r\n    color: #ecf0f1;\r\n    font-family: 'Poppins', sans-serif; /* Aplicar Poppins al título */\r\n    text-align: left;\r\n    flex-grow: 1; /* Ocupa el espacio disponible */\r\n    margin-left: 10px; /* Separación desde el borde izquierdo */\r\n}\r\n\r\n/* Contenedor de las opciones */\r\n.contenedor-opciones-menu {\r\n    margin-top: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    overflow-y: auto; /* Activar desplazamiento vertical */\r\n    scrollbar-width: thin; /* Barra delgada para navegadores compatibles con Firefox */\r\n    scrollbar-color: transparent transparent; /* Barra y pista transparentes */\r\n}\r\n\r\n/* Estilo personalizado para la barra de desplazamiento en navegadores basados en Webkit (Chrome, Edge, Safari) */\r\n.contenedor-opciones-menu::-webkit-scrollbar {\r\n    width: 6px; /* Ancho de la barra de desplazamiento */\r\n}\r\n\r\n.contenedor-opciones-menu::-webkit-scrollbar-thumb {\r\n    background-color: rgba(255, 255, 255, 0.3); /* Barra de desplazamiento semitransparente */\r\n    border-radius: 10px; /* Borde redondeado */\r\n}\r\n\r\n.contenedor-opciones-menu::-webkit-scrollbar-track {\r\n    background: transparent; /* Pista transparente */\r\n}\r\n\r\n\r\n/* Opciones del menú */\r\n.opcion-menu-autofillquizapp {\r\n    width: 100%;\r\n    padding: 15px 20px;\r\n    background: none;\r\n    border: none;\r\n    color: #ecf0f1;\r\n    font-size: 18px;\r\n    text-align: left;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    font-family: 'Poppins', sans-serif; /* Aplicar Poppins a las opciones */\r\n    transition: background-color 0.3s ease, padding-left 0.3s ease;\r\n}\r\n\r\n.opcion-menu-autofillquizapp:hover {\r\n    background-color: rgba(255, 255, 255, 0.1); /* Efecto hover */\r\n    padding-left: 30px; /* Animación de desplazamiento */\r\n}\r\n\r\n.opcion-menu-autofillquizapp i {\r\n    margin-right: 15px; /* Espacio entre el icono y el texto */\r\n}\r\n\r\n/* Contenedor para el botón de cerrar sesión */\r\n.contenedor-cerrar-sesion {\r\n    margin-top: auto; /* Poner el botón de cerrar sesión al final del menú */\r\n    padding: 20px;\r\n}\r\n\r\n/* Botón para cerrar sesión */\r\n.boton-cerrar-sesion {\r\n    width: 100%;\r\n    padding: 12px;\r\n    background-color: #e74c3c;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 5px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    text-align: center;\r\n    box-shadow: 0 2px 5px rgba(0,0,0,0.1);\r\n    transition: background-color 0.3s ease, box-shadow 0.3s ease;\r\n    font-family: 'Poppins', sans-serif; /* Aplicar Poppins al botón de cerrar sesión */\r\n}\r\n\r\n.boton-cerrar-sesion:hover {\r\n    background-color: #c0392b;\r\n    box-shadow: 0 4px 10px rgba(0,0,0,0.2);\r\n}\r\n");function Jc(){const e=ru,t=localStorage.getItem(e(259)),n=localStorage.getItem(e(281));if(console[e(233)]("Valores obtenidos de localStorage:",{configRuta:t,ciclo:n}),t&&n){console[e(233)](e(248));const r=document[e(224)](e(237));r&&(r[e(276)].display=e(222),console.log(e(214),r));const i=document[e(300)](e(241));i&&(i.remove(),console[e(233)](e(230)));const o=document[e(300)](e(286)),s=document[e(300)](e(260));o&&s&&(o[e(199)]=e(217)+t,s[e(199)]=e(197)+n,console[e(233)](e(301)+t+e(234)+n))}else{console[e(233)](e(256)),localStorage[e(302)](e(196),e(294)),localStorage.setItem("autosave-autoquizfillapp",e(294)),console[e(233)](e(211));const t=document[e(228)]("div");t[e(194)]=e(252),t.style[e(263)]=e(311),t[e(276)][e(218)]=e(309),t.style.fontSize=e(267),t.style.textAlign="left",t.style[e(235)]=e(297),t.id=e(241);const n=document[e(224)](e(237)),r=document.getElementById("ultima-ruta-configruta");r&&!document[e(300)](e(241))&&(r[e(255)](t),n&&(n[e(276)].display=e(250),console.log(e(243),n)),console[e(233)](e(201)))}}s("\r\n/* Estilo para el Contenedor Principal */\r\n#titulo-configruta {\r\n    margin-bottom: 5px;\r\n    margin-top: 0;\r\n    display: flex;\r\n    color: #34495e;\r\n    padding: 0; /* Opcional: padding interno */\r\n    font-family: 'Poppins', sans-serif;\r\n    font-size: 1.5rem; /* Tamaño de fuente de 1rem */\r\n}\r\n\r\n/* Estilo para Ruta y Ciclo (apilados verticalmente) */\r\n.ruta-ciclo-container {\r\n    display: flex;\r\n    flex-direction: column; /* Cambiado a columna para apilar */\r\n    align-items: flex-start; /* Alinea los elementos al inicio horizontalmente */\r\n    margin-bottom: 0; /* Espacio entre Ciclo y Mensaje Combinado */\r\n    color: #34495e;\r\n}\r\n\r\n/* Estilo para Ruta */\r\n.title-configruta-ruta {\r\n    padding: 0; /* Espacio vertical entre Ruta y Ciclo */\r\n    font-size: 14px; /* Tamaño de fuente para Ruta */\r\n    color: #333; /* Color del texto */\r\n    font-family: 'Poppins', sans-serif;\r\n    margin-bottom: -5px;\r\n}\r\n\r\n/* Estilo para Ciclo */\r\n.title-configruta-ciclo {\r\n    padding: 5px 0; /* Espacio vertical */\r\n    font-size: 14px; /* Tamaño de fuente para Ciclo */\r\n    font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n.label-configruta {\r\n    font-weight: 600;\r\n    color: #34495e; /* Color más oscuro para destacar */\r\n    font-size: 14px; /* Ligero aumento en tamaño */\r\n}\r\n\r\n.ciclo-configruta,\r\n.ruta-configruta {\r\n    font-weight: 600;\r\n    color: #34495e; /* Color más oscuro para destacar */\r\n    font-size: 14px; /* Ligero aumento en tamaño */\r\n}\r\n\r\n/* Título estilizado */\r\n.title-optionmenu {\r\n    font-size: 22px;\r\n    font-weight: 700;\r\n    color: #34495e;\r\n    margin-bottom: 20px;\r\n    text-align: left;\r\n}\r\n\r\n/* Contenedores de elementos */\r\n.estilo-configruta-item {\r\n    margin-bottom: 10px;\r\n    font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n/* Estilo para el Mensaje Combinado */\r\n.title-configruta-no-seleccionado {\r\n    display: none; /* Oculto por defecto */\r\n    width: 100%;\r\n    text-align: center;\r\n    margin-top: 10px;\r\n    color: red; /* Color del mensaje */\r\n    font-family: 'Poppins', sans-serif;\r\n    font-size: 10px; /* Tamaño de fuente para el mensaje combinado */\r\n}\r\n\r\n/* Opcional: Mostrar el mensaje cuando ambos no están seleccionados */\r\n.no-seleccionado .title-configruta-no-seleccionado {\r\n    display: block;\r\n}\r\n\r\n/* Estilos para los selects */\r\n.estilo-configruta-select {\r\n    width: 100%; /* Asegurarse de que ocupe todo el ancho disponible */\r\n    padding: 12px;\r\n    font-size: 16px;\r\n    font-family: 'Poppins', sans-serif;\r\n    border: 1px solid #bdc3c7;\r\n    border-radius: 4px;\r\n    background-color: #ffffff; /* Fondo blanco */\r\n    color: #2c3e50; /* Texto oscuro para mayor legibilidad */\r\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */\r\n    transition: border 0.3s ease, box-shadow 0.3s ease; /* Transición suave */\r\n}\r\n\r\n/* Efecto hover y foco en los selects */\r\n.estilo-configruta-select:hover,\r\n.estilo-configruta-select:focus {\r\n    border-color: #0072c5;\r\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n    outline: none;\r\n}\r\n\r\n/* Botones estilizados */\r\n.estilo-configruta-boton {\r\n    width: 100%;\r\n    padding: 12px;\r\n    background-color: #0072c5;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 5px;\r\n    font-size: 16px;\r\n    font-family: 'Poppins', sans-serif; /* Aplica la fuente Poppins */\r\n    cursor: pointer;\r\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\r\n    transition: background-color 0.3s ease, box-shadow 0.3s ease;\r\n}\r\n\r\n\r\n/* Efecto hover en los botones */\r\n.estilo-configruta-boton:hover {\r\n    background-color: #002c67;\r\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\r\n}"),function(e){const t=ru,n=e();for(;;)try{if(530474===parseInt(t(198))/1*(parseInt(t(242))/2)+parseInt(t(279))/3+parseInt(t(206))/4+parseInt(t(215))/5+-parseInt(t(208))/6*(-parseInt(t(299))/7)+parseInt(t(244))/8+-parseInt(t(261))/9)break;n.push(n.shift())}catch(e){n.push(n.shift())}}(Zc);let Xc=1;function Zc(){const e=["data-level","selects-configruta","style","estilo-configruta-item","Ejecutando opcionConfigRuta_js...","2537316glfWTD","setAttribute","ciclo","join","parse","map","select-universidad-configruta","ruta-configruta","Error al obtener datos de Firebase para '","click","className","No se puede guardar ruta, debido a que una opción no está seleccionada.","includes","Error al obtener datos de Firebase:","div","desactivado","addEventListener","Ejecutando SelectUniversidad_ConfigRuta...","10px","parentElement","7JacEnk","getElementById","Valores asignados: Ruta = ","setItem","ciclo:","forEach","stringify","label","length","estilo-configruta-select","500","getItem","red",'No se encontró el contenedor con id "selects-configruta"',"textContent","change","autofill-autoquizfillapp",'<span class="ciclo-configruta">Ciclo:</span> ',"13WlGmJf","innerHTML","error","Mensaje de advertencia añadido al contenido principal.","Estado de los selects desde localStorage:","value","object","Guardando estado en localStorage:","4160452vIXmMK","Universidad","795738jwvWTu","removeChild","Procesando ","Autofill y autosave desactivados en localStorage."," en adelante","toUpperCase","Elemento ruta-ciclo-container mostrado:","4158195Xholjv","val",'<span class="ruta-configruta">Ruta:</span> ',"fontWeight","filter","slice","Seleccione una opción","block","Hubo un error al cargar las configuraciones.","querySelector","seleccion","ConfigRuta/universidad","from","createElement","find","Mensaje de advertencia eliminado.","target","select","log",", Ciclo = ","marginBottom","startsWith",".ruta-ciclo-container","split","charAt","dispatchEvent","mensaje-ruta-invalida","152298hWxDrG","Elemento ruta-ciclo-container ocultado:","3804008PAAFZU","select-","keys","Limpiando selects desde nivel ","configRuta y ciclo están definidos. Mostrando contenedores.","querySelectorAll","none","hasOwnProperty","No ha seleccionado una ruta o ciclo","ConfigRuta/opciones/","data-path","appendChild","configRuta o ciclo no están definidos.","getAttribute",'No se encontró el botón con id "boton-guardar-configruta"',"configRuta","ciclo-configruta","34065999AyxAQy","estadoSelects","color","selected","disabled","option","0.9em","string","parentNode",'\n    <div class="contenido-configruta">\n        <h3 id="titulo-configruta">Configuración de Ruta</h3>\n\n    \x3c!-- Contenedor Principal --\x3e\n        <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">\n\n            \x3c!-- Contenedor para Ruta y Ciclo apilados verticalmente --\x3e\n            <div class="ruta-ciclo-container">\n\n                \x3c!-- Ruta --\x3e\n                <div id="ruta-configruta" class="title-configruta-ruta">\n                    <span class="label-configruta">Ruta:</span>\n                </div>\n\n                \x3c!-- Ciclo --\x3e\n                <div id="ciclo-configruta" class="title-configruta-ciclo">\n                    <span class="label-configruta">Ciclo:</span>\n                </div>\n\n            </div>\n        </div>\n\n        \x3c!-- Contenedor Selects Dinamicos --\x3e\n        <div id="selects-configruta">\n            \x3c!-- Aquí puedes agregar más contenido o elementos dinámicos --\x3e\n        </div>\n\n        <button id="boton-guardar-configruta" class="estilo-configruta-boton guardar">Guardar Ruta</button>\n    </div>\n    '," con valor: ","Opción seleccionada en ","options"];return(Zc=function(){return e})()}function eu(){const e=ru,t=document[e(300)](e(275)),n=Array[e(227)](t[e(249)](e(232)))[e(284)]((t=>({nivel:t[e(257)](e(274)),id:t.id,ruta:t[e(257)](e(254)),seleccion:t[e(203)]})));console.log(e(205),n),localStorage[e(302)](e(262),JSON[e(305)](n))}async function tu(){const e=ru;console.log(e(296));const t=e(226),n=Rc(Bc,t),r=document[e(300)](e(275));if(r){r[e(199)]="",console.log("Contenedor 'selects-configruta' limpiado."),Xc=1;try{const i=(await Oc(n)).val();if(i){const n=document[e(228)]("label");n[e(280)]("for",e(285)),n[e(194)]=e(207),n[e(289)]=e(277);const o=document.createElement(e(232));o.id=e(285),o[e(289)]=e(308),o.setAttribute(e(274),Xc),o[e(280)](e(254),e(226)),o[e(276)][e(235)]=e(297);const s=document.createElement(e(266));s[e(203)]="",s.textContent=e(221),s[e(265)]=!0,s[e(264)]=!0,o[e(255)](s);for(const t in i)if(i[e(251)](t)){const n=document[e(228)](e(266));n[e(203)]=t,n.textContent=typeof i[t]===e(268)?i[t]:t,o[e(255)](n)}o.addEventListener("change",(async n=>{const r=e,i=n[r(231)].value;s[r(269)]&&o[r(209)](s),await su(2),i&&await nu(i,t,2,i),eu()})),r[e(255)](n),r.appendChild(o),await async function(){const e=ru,t=JSON[e(283)](localStorage.getItem("estadoSelects"));if(console[e(233)](e(202),t),!t||0===t[e(307)])return void console.log("No hay datos en el estado de los selects.");for(let n of t){const{id:t,seleccion:r}=n;console[e(233)](e(210)+t+e(271)+r),await ou(t,r)}}()}}catch(t){console[e(200)](e(292),t);const n=document[e(228)]("p");n[e(194)]=e(223),r[e(255)](n)}}else console[e(200)](e(312))}async function nu(e,t,n,r){const i=ru;let o;o=2===n?t+"/"+e:i(253)+r;const s=Rc(Bc,o);try{const t=(await Oc(s))[i(216)]();let o=[];if(t&&"object"==typeof t&&(o=2===n?Object.keys(t):Object.keys(t)[i(219)]((t=>t[i(236)](e)))),o[i(307)]>0){await su(n+1);for(let e of o)await iu(e,r,n+1)}else console[i(233)]("No se encontraron opciones para generar nuevos selects.")}catch(e){console.error(i(287)+o+"':",e)}}function ru(e,t){const n=Zc();return(ru=function(e,t){return n[e-=194]})(e,t)}async function iu(e,t,n){const r=ru,i="ConfigRuta/opciones/"+t+"/"+e,o=Rc(Bc,i),s=document[r(300)](r(275));try{const a=(await Oc(o)).val();if(a&&typeof a===r(204)&&Object[r(246)](a)[r(307)]>0){const o=document.createElement(r(293));o.className=r(277),o[r(280)](r(254),i);const l=document[r(228)](r(306));l.setAttribute("for",r(245)+e),l[r(194)]=function(e){const t=ru;return e[t(238)]("-")[t(220)](1)[t(284)]((e=>e[t(239)](0)[t(213)]()+e[t(220)](1)))[t(282)](" ")}(e),l[r(289)]=r(277);const c=document[r(228)](r(232));c.id=r(245)+e,c[r(289)]=r(308),c[r(280)]("data-level",n),c[r(280)](r(254),i);const u=document[r(228)]("option");u[r(203)]="",u[r(194)]="Seleccione una opción",u.disabled=!0,u[r(264)]=!0,c[r(255)](u);for(const e in a)if(a[r(251)](e)){const t=document[r(228)](r(266));t[r(203)]=e,t[r(194)]=a[e]?a[e]:e,c[r(255)](t)}c[r(295)]("change",(async e=>{const i=r,o=e[i(231)].value;u[i(269)]&&c[i(209)](u),await su(n+1),o&&await nu(o,i(253)+t,n+1,t),eu()})),o.appendChild(l),o[r(255)](c),s[r(255)](o)}}catch(e){console[r(200)]("Error al obtener opciones de Firebase para '"+i+"':",e)}}function ou(e,t){return new Promise((n=>{const r=setInterval((()=>{const i=ru,o=document[i(300)](e);if(o){clearInterval(r);const s=Array[i(227)](o[i(273)])[i(229)]((e=>e.value===t));s&&(o.value=s[i(203)],console[i(233)](i(272)+e+": "+s[i(194)].trim()),o[i(240)](new Event(i(195)))),n()}}),100)}))}async function su(e){const t=ru;console[t(233)](t(247)+e+t(212));const n=document.getElementById(t(275));Array.from(n[t(249)](t(232)))[t(304)]((n=>{const r=t;if(parseInt(n.getAttribute(r(274)),10)>=e){const e=n[r(298)];if(e){const t=e.querySelector(r(306));t&&t.remove(),n.remove()}}})),Xc=e-1}function au(){const e=ru;eu();const t=JSON[e(283)](localStorage[e(310)](e(262)))||[];if(t.some((t=>""===t[e(225)])))return void alert(e(290));let n="",r="";t[e(304)]((t=>{const i=e;let o=t.seleccion[i(291)](":")?t[i(225)][i(238)](":")[i(220)](1)[i(282)](":"):t[i(225)];t.id[i(291)](i(281))?r=o:n+=o+"/"})),n=n[e(220)](0,-1),localStorage[e(302)]("configRuta",n),localStorage[e(302)](e(281),r),console[e(233)]("configRuta:",n),console[e(233)](e(303),r),Jc()}function lu(){const e=["contenedor-header-menu","opcionConfigRuta_html","6197805LUVfNH","classList","createElement","Gestión de Usuarios","div","none","Error al ejecutar opcionAutoQuiz_js:","id-card",'<i class="fa-solid fa-times"></i>',"opcion-menu-autofillquizapp","boton-cerrar-menu-autofillquizapp","add","4960512yrNgMA","Generar PDF de preguntas","Menú","click","innerText","span","AutoFill","addEventListener","button","opcionAutoQuiz_js","display","contenido-principal",'"></i> ',"boton-cerrar-sesion","appendChild","ultimoJs","toLowerCase","replace","6182648cnCmeT","edit","Configuración de Ruta","forEach",'<i class="fa-solid fa-',"log","ultimoHtml","setItem","1076xleqbT","2886902YutFXE","Cerrar Sesión","database","opcionAutoQuiz_html","166309sCazin","[AutoQuizFill] Creando main-menu","contenedor-cerrar-sesion","circle","opcionConfigRuta_js","2721033XolKBZ","innerHTML","opcionGenerarPDF_html","menu-autofillquizapp","opcionGestionUsuarios_js","opcionGestionUsuarios_html","style","174sWHUUb","contenedor-opciones-menu","error"];return(lu=function(){return e})()}function cu(e,t){const n=lu();return(cu=function(e,t){return n[e-=131]})(e,t)}function uu(){const e=cu;console[e(162)](e(171));const t=document[e(189)](e(131));t.id=e(178),t[e(188)][e(138)](e(178)),t[e(181)][e(149)]="none";const n=document[e(189)](e(131));n[e(188)][e(138)](e(185));const r=document[e(189)](e(144));r[e(188)][e(138)]("titulo-menu"),r[e(143)]=e(141);const i=document[e(189)](e(147));i.id="boton-cerrar-menu-autofillquizapp",i[e(188)][e(138)](e(137)),i[e(176)]=e(135),i[e(146)](e(142),(()=>{const n=e;t.style[n(149)]="none"})),n.appendChild(i),n[e(153)](r);const o=document[e(189)](e(131));o[e(188)].add(e(183));[e(145),e(159),e(140),e(190)][e(160)]((n=>{const r=e,i=document[r(189)](r(147));let s;switch(i.id="opcion-"+n[r(155)]()[r(156)](/ /g,"-")+"-autofillquizapp",i.classList.add(r(136)),n){case r(145):s=r(158);break;case"Configuración de Ruta":s=r(168);break;case r(140):s="file-pdf";break;case r(190):s=r(134);break;default:s=r(173)}i[r(176)]=r(161)+s+r(151)+n,i[r(146)](r(142),(async()=>{const e=r,i=document.getElementById(e(150));if(i){if(n===e(145)){localStorage[e(164)](e(163),e(169)),localStorage[e(164)](e(154),e(148)),i.innerHTML=opcionAutoQuiz_html();try{await opcionAutoQuiz_js()}catch(t){console[e(184)](e(133),t)}}else"Configuración de Ruta"===n?(localStorage[e(164)](e(163),e(186)),localStorage[e(164)]("ultimoJs",e(174)),i.innerHTML=ru(270),async function(){const e=ru;Jc(),console.log(e(278)),await tu();const t=document[e(300)]("boton-guardar-configruta");t?t.addEventListener(e(288),au):console[e(200)](e(258))}()):n===e(140)?(localStorage[e(164)](e(163),e(177)),localStorage[e(164)]("ultimoJs","opcionGenerarPDF_js"),i[e(176)]=opcionGenerarPDF_html(),opcionGenerarPDF_js()):n===e(190)&&(localStorage[e(164)](e(163),e(180)),localStorage[e(164)](e(154),e(179)),i[e(176)]=opcionGestionUsuarios_html(),opcionGestionUsuarios_js());t.style.display="none"}})),o[r(153)](i)}));const s=document[e(189)](e(131));s[e(188)][e(138)](e(172));const a=document[e(189)](e(147));return a.id=e(152),a[e(188)][e(138)]("boton-cerrar-sesion"),a.innerText=e(167),a[e(146)]("click",(()=>{const n=e;cerrarSesionAutoQuiz(),t[n(181)].display=n(132)})),s[e(153)](a),t[e(153)](n),t[e(153)](o),t[e(153)](s),t}!function(e){const t=cu,n=e();for(;;)try{if(825063===-parseInt(t(170))/1+-parseInt(t(166))/2+parseInt(t(182))/3*(-parseInt(t(165))/4)+parseInt(t(187))/5+parseInt(t(139))/6+-parseInt(t(175))/7+parseInt(t(157))/8)break;n.push(n.shift())}catch(e){n.push(n.shift())}}(lu);const du=[];for(let e=0;e<256;++e)du.push((e+256).toString(16).slice(1));let hu;const pu=new Uint8Array(16);var fu={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function mu(e,t,n){if(fu.randomUUID&&!t&&!e)return fu.randomUUID();const r=(e=e||{}).random??e.rng?.()??function(){if(!hu){if("undefined"==typeof crypto||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");hu=crypto.getRandomValues.bind(crypto)}return hu(pu)}();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=15&r[6]|64,r[8]=63&r[8]|128,function(e,t=0){return(du[e[t+0]]+du[e[t+1]]+du[e[t+2]]+du[e[t+3]]+"-"+du[e[t+4]]+du[e[t+5]]+"-"+du[e[t+6]]+du[e[t+7]]+"-"+du[e[t+8]]+du[e[t+9]]+"-"+du[e[t+10]]+du[e[t+11]]+du[e[t+12]]+du[e[t+13]]+du[e[t+14]]+du[e[t+15]]).toLowerCase()}(r)}const gu=_u;function _u(e,t){const n=Au();return(_u=function(e,t){return n[e-=459]})(e,t)}!function(e){const t=_u,n=e();for(;;)try{if(242196===-parseInt(t(483))/1+parseInt(t(536))/2*(parseInt(t(494))/3)+-parseInt(t(462))/4*(parseInt(t(515))/5)+parseInt(t(529))/6+-parseInt(t(522))/7+parseInt(t(539))/8*(-parseInt(t(516))/9)+-parseInt(t(469))/10*(-parseInt(t(535))/11))break;n.push(n.shift())}catch(e){n.push(n.shift())}}(Au),console.log(gu(517));const vu=gu(489),yu=gu(502),bu=gu(473),wu="fake-form";console.log("[AutoQuizFill] Script cargado.");let Iu=null;function Cu(e,t){const n=gu;console[n(511)]('[AutoQuizFill] toggleElementById: Intentando mostrar "'+e+'" - '+t);const r=document[n(481)](e);r?(r.style[n(531)]=n(t?505:525),console[n(511)]('[AutoQuizFill] toggleElementById: Elemento "'+e+'" '+n(t?466:479)+".")):console[n(538)](n(510)+e+n(503))}function Eu(e){const t=gu;console[t(511)](t(508));const n=document[t(475)](t(513));n.id=yu,n[t(544)][t(531)]=t(525),n.innerHTML=t(504)+wu+'" \n          required\n        >\n        <input \n          type="password" \n          id="login-contrasena-autoquizfillapp" \n          class="login-entrada-autoquizfillapp" \n          placeholder="Contraseña"\n          autocomplete="current-password" \n          form="'+wu+t(520)+wu+t(485),e.appendChild(n),console[t(511)](t(500));const r=document[t(481)](t(468)),i=document[t(481)](t(542)),o=document[t(481)](t(519));if(r&&i&&o){console[t(511)]("[AutoQuizFill] CrearFormularioLogin: Elementos del formulario de login encontrados correctamente.");const e=()=>{const e=t;console[e(511)]("[AutoQuizFill] CrearFormularioLogin: Handler de inicio de sesión activado."),function(e,t){const n=gu;console[n(511)](n(495)+e+'".'),gr(Hc,e,t)[n(493)]((e=>{const t=n;console[t(511)]("[AutoQuizFill] IniciarSesionAutoQuiz: Sesión exitosa.");const r=e[t(527)];console[t(511)](t(524)+r[t(488)]+", Email: "+r[t(467)]),Tu(r[t(488)]),Su()})).catch((e=>{const t=n;(function(e){const t=gu;console[t(477)](t(523)+e),alert(t(486)+e)})(e.message),console[t(477)](t(484)+e.code+": "+e[t(540)])}))}(r[e(541)],i[e(541)])};i[t(507)]("keydown",(n=>{const r=t;n[r(543)]===r(482)&&(console[r(511)](r(514)),e())})),o.addEventListener(t(545),(()=>{console.log("[AutoQuizFill] CrearFormularioLogin: Botón de inicio de sesión clickeado."),e()}))}else console.error(t(492))}function Tu(e){const t=gu;console[t(511)](t(474)+e);const n=mu();Iu=n,console[t(511)](t(537)+n);const r=Rc(Bc,t(496)+e+"/currentSession");Nc(r,n)[t(493)]((()=>{const e=t;console.log(e(530)),function(e,t){Lc(e,0,t)}(r,(t=>{const n=e,r=t.val();console.log(n(532)+r),r!==Iu&&(console.warn(n(498)),ku())}))}))[t(463)]((e=>{const n=t;console.error("[AutoQuizFill] ConfigurarSesion: Error al actualizar ID de sesión - "+e[n(460)]+": "+e[n(540)])}))}function ku(){const e=gu;var t;console.log(e(534)),(t=Hc,J(t).signOut())[e(493)]((()=>{const t=e;console[t(511)](t(528));const n=Hc[t(461)];if(n){(function(e){return Gl("remove",e._path),Nc(e,null)})(Rc(Bc,"users/"+n[t(488)]+t(526))).then((()=>{console[t(511)]("[AutoQuizFill] CerrarSesionAutoQuiz: currentSession eliminado de la base de datos.")}))[t(463)]((e=>{const n=t;console[n(477)]("[AutoQuizFill] CerrarSesionAutoQuiz: Error al eliminar currentSession - "+e.code+": "+e[n(540)])}))}xu()}))[e(463)]((t=>{const n=e;console[n(477)](n(490)+t[n(460)]+": "+t[n(540)])}))}function xu(){console[gu(511)]("[AutoQuizFill] MostrarLogin: Mostrando formulario de login y ocultando panel principal."),Cu(yu,!0),Cu(bu,!1)}function Su(){const e=gu;console[e(511)](e(476)),Cu(yu,!1),Cu(bu,!0),console.log(e(472))}function Pu(){const e=gu;console.log(e(512)),function(e,t,n,r){J(e).onAuthStateChanged(t,n,r)}(Hc,(t=>{const n=e;t?(console[n(511)](n(518)+t.uid+", Email: "+t[n(467)]),Tu(t.uid),Su()):(console[n(511)](n(506)),xu())}))}function Ru(){const e=gu;console[e(511)](e(471));const t=document.getElementById(vu);if(!t)return void console[e(477)]('[AutoQuizFill] Init: No se encontró el elemento con ID "'+vu+e(478));console.log(e(499)),Eu(t),Pu(),console[e(511)](e(521)),Yc(t);const n=uu();n?(t[e(509)](n),console[e(511)](e(533))):console[e(477)]("[AutoQuizFill] Init: Error al crear el menú de AutoQuizFill."),function(){const e=gu;console[e(511)](e(465));const t=document.getElementById(e(491));t?(t.addEventListener("click",(()=>{console.log("[AutoQuizFill] ConfigurarEventos: Botón de cerrar sesión clickeado."),ku()})),console[e(511)]("[AutoQuizFill] ConfigurarEventos: Evento de cierre de sesión configurado.")):console[e(538)](e(546))}(),console[e(511)](e(464))}function Au(){const e=["[AutoQuizFill] MostrarPanel: Panel principal mostrado correctamente.","panel-autofillquizapp","[AutoQuizFill] ConfigurarSesion: Configurando sesión para UID: ","createElement","[AutoQuizFill] MostrarPanel: Mostrando panel principal y ocultando formulario de login.","error",'". Abortando inicialización.',"ocultado","DOMContentLoaded","getElementById","Enter","290679rqZBMJ","[AutoQuizFill] IniciarSesionAutoQuiz: Error al iniciar sesión - ",'" style="display: none;"></form>\n  ',"Error en inicio de sesión: ","[AutoQuizFill] DOMContentLoaded: DOM cargado. Iniciando aplicación.","uid","barra-lateral-autoquizfillapp","[AutoQuizFill] CerrarSesionAutoQuiz: Error al cerrar sesión - ","botonCerrarSesion","[AutoQuizFill] CrearFormularioLogin: No se encontraron todos los elementos del formulario de login.","then","3jemafC",'[AutoQuizFill] IniciarSesionAutoQuiz: Intentando iniciar sesión con correo "',"users/","loading","[AutoQuizFill] ConfigurarSesion: Sesión inválida detectada. Cerrando sesión.","[AutoQuizFill] Init: Elemento de barra lateral encontrado.","[AutoQuizFill] CrearFormularioLogin: Formulario de login añadido a la barra lateral.","readyState","login-autoquizfillapp",'" no encontrado.','\n    <div class="contenedor-login-autoquizfillapp">\n      <div class="contenedor-titulo-autoquizfillapp">\n        <h2 class="title-login-autoquizfillapp">AutoQuizFill App</h2>\n      </div>\n      <div class="contenedor-inputs-autoquizfillapp">\n        <input \n          type="email" \n          id="login-correo-autoquizfillapp" \n          class="login-entrada-autoquizfillapp" \n          placeholder="Correo electrónico"\n          autocomplete="email" \n          form="',"block","[AutoQuizFill] VerificarSesionUsuario: No hay usuario autenticado. Mostrando formulario de login.","addEventListener","[AutoQuizFill] CrearFormularioLogin: Iniciando creación del formulario de login.","appendChild",'[AutoQuizFill] toggleElementById: Elemento con ID "',"log","[AutoQuizFill] VerificarSesionUsuario: Verificando estado de autenticación del usuario.","div","[AutoQuizFill] CrearFormularioLogin: Tecla Enter presionada en el campo de contraseña.","50IkPREe","81sJntHW","[AutoQuizFill] Iniciando login-auth","[AutoQuizFill] VerificarSesionUsuario: Usuario autenticado - UID: ","login-boton-autoquizfillapp",'" \n          required\n        >\n      </div>\n      <div class="contenedor-boton-autoquizfillapp">\n        <button \n          id="login-boton-autoquizfillapp" \n          class="login-boton-autoquizfillapp"\n        >\n          Iniciar sesión\n        </button>\n      </div>\n    </div>\n    <form id="',"[AutoQuizFill] Init: Inicializando panel y menú de AutoQuizFill.","619234geGkxA","[AutoQuizFill] Error: ","[AutoQuizFill] IniciarSesionAutoQuiz: Usuario autenticado - UID: ","none","/currentSession","user","[AutoQuizFill] CerrarSesionAutoQuiz: Sesión cerrada correctamente.","1263420SknMXr","[AutoQuizFill] ConfigurarSesion: ID de sesión actualizado en la base de datos.","display","[AutoQuizFill] ConfigurarSesion: currentSession desde DB: ","[AutoQuizFill] Init: Menú de AutoQuizFill añadido a la barra lateral.","[AutoQuizFill] CerrarSesionAutoQuiz: Intentando cerrar sesión.","242DRsQsX","76192YSagVj","[AutoQuizFill] ConfigurarSesion: Nuevo ID de sesión generado - ","warn","303576dLkynx","message","value","login-contrasena-autoquizfillapp","key","style","click","[AutoQuizFill] ConfigurarEventos: No se encontró el botón de cerrar sesión para configurar el evento.","cerrarSesionAutoQuiz","code","currentUser","47156tWCdBS","catch","[AutoQuizFill] Init: Aplicación inicializada correctamente.","[AutoQuizFill] ConfigurarEventos: Configurando eventos de la aplicación.","mostrado","email","login-correo-autoquizfillapp","378220txGQrY","[AutoQuizFill] DOM ya está cargado. Iniciando aplicación.","[AutoQuizFill] Init: Inicializando aplicación."];return(Au=function(){return e})()}function Nu(){var e=["4091112EQhKnC","23277717oklXDv","265097izuFmp","2rHfqQx","8IOwLcF","976668pjJvXW","981844ZsTXAU","453375NPEfqq","3321111GPJROB"];return(Nu=function(){return e})()}function Ou(e,t){var n=Nu();return(Ou=function(e,t){return n[e-=484]})(e,t)}document[gu(501)]===gu(497)?document[gu(507)](gu(480),(()=>{const e=gu;console[e(511)](e(487)),Ru()})):(console[gu(511)](gu(470)),Ru()),window[gu(459)]=ku,function(e){for(var t=Ou,n=e();;)try{if(729039===-parseInt(t(485))/1+parseInt(t(486))/2*(-parseInt(t(491))/3)+parseInt(t(489))/4+parseInt(t(490))/5+-parseInt(t(492))/6+-parseInt(t(488))/7+-parseInt(t(487))/8*(-parseInt(t(484))/9))break;n.push(n.shift())}catch(e){n.push(n.shift())}}(Nu)}();
