function e(e){var t=!0,n=!1,o=null,i={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function d(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function s(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function r(e){t=!1}function c(){document.addEventListener("mousemove",u),document.addEventListener("mousedown",u),document.addEventListener("mouseup",u),document.addEventListener("pointermove",u),document.addEventListener("pointerdown",u),document.addEventListener("pointerup",u),document.addEventListener("touchmove",u),document.addEventListener("touchstart",u),document.addEventListener("touchend",u)}function u(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mousedown",u),document.removeEventListener("mouseup",u),document.removeEventListener("pointermove",u),document.removeEventListener("pointerdown",u),document.removeEventListener("pointerup",u),document.removeEventListener("touchmove",u),document.removeEventListener("touchstart",u),document.removeEventListener("touchend",u))}document.addEventListener("keydown",(function(n){n.metaKey||n.altKey||n.ctrlKey||(d(e.activeElement)&&s(e.activeElement),t=!0)}),!0),document.addEventListener("mousedown",r,!0),document.addEventListener("pointerdown",r,!0),document.addEventListener("touchstart",r,!0),document.addEventListener("visibilitychange",(function(e){"hidden"===document.visibilityState&&(n&&(t=!0),c())}),!0),c(),e.addEventListener("focus",(function(e){var n,o,r;d(e.target)&&(t||(n=e.target,o=n.type,"INPUT"===(r=n.tagName)&&i[o]&&!n.readOnly||"TEXTAREA"===r&&!n.readOnly||n.isContentEditable))&&s(e.target)}),!0),e.addEventListener("blur",(function(e){var t;d(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout((function(){n=!1}),100),(t=e.target).hasAttribute("data-focus-visible-added")&&(t.classList.remove("focus-visible"),t.removeAttribute("data-focus-visible-added")))}),!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document);const n="classList",o="querySelector",i=()=>{const e=document[o](".header")?.offsetHeight;return document.documentElement.style.setProperty("--header-height",`${e}px`),e};window.addEventListener("resize",i),i();let d=((e,t=250)=>{let n=!1,o=null,i=null;return function d(...s){if(n)return o=s,void(i=this);e.apply(this,s),n=!0,setTimeout((()=>{n=!1,i&&(d.apply(i,o),i=null,o=null)}),t)}})((()=>{let e=.01*window.innerHeight;document.querySelector(":root").style.setProperty("--vh",`${e}px`)}));d(),window.addEventListener("resize",d),$(".form__select select").select2({minimumResultsForSearch:-1,width:"100%"}),$(".form-history__select select").select2({minimumResultsForSearch:-1,width:"100%"});const s=document.querySelector(".range__drag"),r=document.querySelector(".range__text"),c=()=>{const e=s.value;s.style.setProperty("--percent",`${e}%`)};(s||r)&&(s.addEventListener("input",c),r.addEventListener("input",c),c());document[o](".referal__copy")?.addEventListener("click",(e=>{const t=e.currentTarget,i=e.currentTarget.querySelector(".referal__copy-link").innerText;navigator.clipboard.writeText(i),navigator.clipboard.writeText(i)&&(t.querySelector(".copy").classList.add("copied"),setTimeout((()=>{var e,t;e=".copy",t="copied",document[o](e)?.[n].remove(t)}),5e3))})),document[o](".burger")?.addEventListener("click",(e=>{var t,i;e.target.matches(".burger")&&(t=".page",i="page--menu",document[o](t)?.[n].toggle(i))})),document[o]("span.nav__link")?.addEventListener("click",(e=>{e.target.classList.toggle("nav__link--hover")}));
//# sourceMappingURL=account.49094863.js.map
