!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){e.forEach(e=>t.appendChild(e))}function o(e,t){const n=document.createElement(e);return t&&n.classList.add(t),n}n.r(t),function(){const e=o("input","search"),t=o("div","wrapper"),n=o("div","resultWindow"),u=o("h1"),i=o("h2"),c=o("img"),l=document.querySelector("body"),s=[];for(let e=0;e<5;e++)s.push(o("div"));c.setAttribute("src","../src/img/logo.png"),e.placeholder="I'm looking for...",u.innerText="Welcome to Citysearch",i.innerText="Choose a City",r([u,t,c],l),r([i,e,n],t),r(s,n)}(),function(){const e=document.querySelector(".search");let t;const n=document.querySelectorAll(".resultWindow div");function r(e){const r=e.target.value,o=t(r);n.forEach((e,t)=>{e.innerText=o[t]||""})}fetch("../cities/cities.json").then(e=>e.json()).then(e=>t=function(e){return function(t){if(!t)return[];const n=[],r=`^${t.toLowerCase()}`;for(let t=0;t<e.length&&5!==n.length;t++)e[t].toLowerCase().match(r)&&n.push(e[t]);return n}}(e)).then(()=>e.addEventListener("input",r))}()}]);