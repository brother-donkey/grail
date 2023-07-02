let e=0;function t(){return"bx-"+e++}const n={contentHasChanged:"Content has changed, please reload the page to get the latest changes.",inputMaxLength:"{inputLabel} cannot be longer than {maxLength} characters.",inputMinLength:"{inputLabel} must be at least {minLength} characters.",inputRequired:"{inputLabel} is required.",pleaseFixTheFollowingIssues:"Please fix the following issues to continue:",thereAreNoEditsToSubmit:"There are no edits to submit.",weEncounteredAnUnexpectedError:"We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."};class r extends HTMLElement{submitting=!1;initialData=new FormData;toDispose=[];isDirty=!1;commitTimeout=0;locStrings=Object.assign({},n,Array.from(this.attributes).filter((e=>e.name.startsWith("loc-"))).reduce(((e,t)=>{var n;return e[(n=t.name.substring(4),n.replace(/-./g,(e=>e[1].toUpperCase())))]=t.value,e}),{}));validators=[this.validateMinLength.bind(this),this.validateRequired.bind(this),this.validateMaxLength.bind(this)];constructor(){super(),this.locStrings=this.locStrings}get canSave(){return this.isDirty||this.isNew}get form(){return this.closest("form")}get hideUnloadMessage(){return this.hasAttribute("nounload")}get isNew(){return this.hasAttribute("new")}connectedCallback(){const e=this.parentElement;if(!(e instanceof HTMLFormElement))return;e.setAttribute("novalidate","");const t=document.createElement("div");t.setAttribute("data-form-error-container",""),this.insertAdjacentElement("afterend",t),this.initialData=new FormData(e),"loading"===this.ownerDocument.readyState&&this.ownerDocument.addEventListener("readystatechange",(()=>this.initialData=new FormData(e))),this.subscribe(e,"input",this),this.subscribe(e,"change",this),this.subscribe(e,"submit",this),this.subscribe(window,"beforeunload",this)}disconnectedCallback(){for(const e of this.toDispose)e()}subscribe(e,t,n){e.addEventListener(t,n),this.toDispose.push((()=>e.removeEventListener(t,n)))}setDirty(){const e=new URLSearchParams(this.initialData).toString(),t=new URLSearchParams(new FormData(this.parentElement)).toString();this.isDirty=t!==e}handleEvent(e){switch(e.type){case"submit":this.handleSubmitEvent(e);break;case"beforeunload":this.handleUnloadEvent(e);break;case"input":this.clearValidationErrors(e.target),this.scheduleCommit(e);break;case"change":this.clearValidationErrors(e.target),this.commit(e);break;default:throw new Error(`Unexpected event ${e.type}.`)}}navigate(e){const t=function(e,t){switch(t){case null:return!1;case"follow":return!!e&&(location.href=e,!0);case"hash-reload":if(e){const t=e.includes("?")?"":window.location.search;if(e!==t+window.location.hash){const n=history.state||{};window.history.pushState(n,document.title,window.location.pathname+t+e)}return location.reload(),!0}return!1;case"replace":return!!e&&(location.replace(e),!0);case"reload":return location.reload(),!0;default:throw new Error("Unexpected navigation attribute value.")}}(e,this.getAttribute("navigation"));return t}scheduleCommit(e){clearTimeout(this.commitTimeout),setTimeout(this.commit,300,e)}commit=e=>{var t;i(e.target,this.form)&&e.target?.form&&e.target?.form===this.parentElement&&(clearTimeout(this.commitTimeout),"change"===e.type&&(((t=e.target)instanceof HTMLTextAreaElement||t instanceof HTMLInputElement&&("text"===t.type||"email"===t.type))&&(t.value=t.value.trim())),this.setDirty())};async handleUnloadEvent(e){this.setDirty(),this.isDirty&&!this.hideUnloadMessage&&(e.preventDefault(),e.returnValue="You have unsaved work.")}async handleSubmitEvent(e){if(e.preventDefault(),this.submitting)return;const t=e.currentTarget;if(!this.canSave){this.showNoChangesMessage(t);const e=new CustomEvent("form-validating",{detail:{form:t},bubbles:!0});return void this.dispatchEvent(e)}let n=!1;try{this.submitting=!0,s(t,this.submitting);if(!(await this.validateForm(t)).valid)return;const r=function(e){const t=e.submitter;return t instanceof HTMLButtonElement&&t.formAction!==window.location.href?t.formAction:null}(e)??t.action,i=new URL(r).searchParams,o=new FormData(t),a=new Headers;a.set("content-type","application/json");for(const{name:e,value:t}of this.attributes)e.startsWith("header-")&&a.set(e.substring(7),t);const l={method:i.get("_method")||t.method||"GET",body:JSON.stringify(Object.fromEntries(o)),headers:a},d=new CustomEvent("beforesubmit",{detail:{url:r,init:l,form:t},bubbles:!0,cancelable:!0});if(!this.dispatchEvent(d))return;const c=new Request(d.detail.url,d.detail.init),u=await fetch(c);if(u.ok)this.removeAttribute("new"),this.initialData=o,this.setDirty(),this.dispatchEvent(new CustomEvent("aftersubmit",{detail:{request:c,response:u},bubbles:!0})),n=this.navigate(u.headers.get("location")??this.getAttribute("navigation-href"));else{const{errorAlert:e,errorList:n}=this.getErrorAlert(t),r=document.createElement("li");r.innerText=this.locStrings.weEncounteredAnUnexpectedError,412===u.status&&(r.innerText=this.locStrings.contentHasChanged),this.dispatchEvent(new CustomEvent("submission-error",{detail:{form:t,request:c,response:u},bubbles:!0})),n.appendChild(r),e.hidden=!1,e.focus()}}finally{this.submitting=n,s(t,this.submitting)}}createErrorAlert(e){const n=e.querySelector("[data-form-error-container]")||e,r=t(),i=document.createElement("div");i.className="help help-danger background-color-danger-light border border-color-danger border-radius padding-xs margin-bottom-sm",i.setAttribute("data-form-error-alert",""),i.setAttribute("role","alert"),i.setAttribute("aria-labelledby",r),i.setAttribute("tabindex","-1"),i.hidden=!0;const s=document.createElement("p");s.id=r,s.className="font-size-md font-weight-semibold margin-bottom-xs display-inline-flex",s.innerText=this.locStrings.pleaseFixTheFollowingIssues;const o=document.createElement("ul");return o.setAttribute("aria-label","Validation errors"),o.classList.add("margin-left-sm-tablet"),i.append(s,o),n.appendChild(i),{errorAlert:i,errorList:o}}getErrorAlert(e){const t=e.querySelector("[data-form-error-alert]");return t?{errorAlert:t,errorList:t.lastElementChild}:this.createErrorAlert(e)}validateRequired(e,t){return e.validity.valueMissing?`${this.locStrings.inputRequired.replace("{inputLabel}",customElements.get(e.localName)?`A selection for "${t}"`:t)}`:null}validateMinLength(e,t){return(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement)&&(e.validity.tooShort||e.minLength>0&&e.value.length<e.minLength)?`${this.locStrings.inputMinLength.replace("{inputLabel}",t).replace("{minLength}",e.minLength.toString())}`:null}validateMaxLength(e,t){return(e instanceof HTMLTextAreaElement||e instanceof HTMLInputElement)&&(e.validity.tooLong||e.maxLength>0&&e.value.length>e.maxLength)?`${this.locStrings.inputMaxLength.replace("{inputLabel}",t).replace("{maxLength}",e.maxLength.toString())}`:null}async validateForm(e,t=!0,n=e){const r=[],{errorAlert:i,errorList:s}=this.getErrorAlert(e);t&&(i.hidden=!0,s.innerHTML="");const o=function(e){const t=Object.fromEntries(new FormData(e)),n=[];return Object.keys(t).filter((t=>!e.elements.namedItem(t))).forEach((t=>{const r=e.querySelector(`[name="${t}"]`);r&&n.push(r)})),n}(e);for(const i of[...e.elements,...o]){if(!n.contains(i)||!d(i,e))continue;if(!0===i.hasAttribute("aria-hidden"))continue;if("combobox"===i.getAttribute("role"))continue;if(i.closest("docs-markdown-editor"))continue;if(i.hasAttribute("data-skip-validation")){const t=new CustomEvent("form-validating",{detail:{errors:r,form:e},bubbles:!0});this.dispatchEvent(t);continue}const a=!!o.find((e=>e===i));this.runBasicValidation(i,t,r,s,a);const l=new CustomEvent("form-validating",{detail:{errors:r,form:e},bubbles:!0});this.dispatchEvent(l)}return 0===r.length?{valid:!0}:(t&&(i.hidden=!1,i.focus()),{valid:!1,errors:r})}clearValidationErrors(e){if(!d(e,this.form))return;if(c(e),l(e,""),o(e).classList.remove("errored"),e.form){const{errorAlert:t,errorList:n}=this.getErrorAlert(e.form);n.querySelectorAll(`a[href="#${e.id}"]`).forEach((e=>e.parentElement?.remove())),n.querySelector("#no-edits-error")?.remove(),n.firstElementChild||(t.hidden=!0)}const t=new CustomEvent("clear-validation-errors",{detail:{target:e},bubbles:!0});this.dispatchEvent(t)}showNoChangesMessage(e){const{errorAlert:t,errorList:n}=this.getErrorAlert(e);if(n.childElementCount>0){for(;n.firstChild;)n.lastChild?.remove();n.querySelector("#no-edits-error")?.remove()}const r=document.createElement("li");r.id="no-edits-error",r.innerText=this.locStrings.thereAreNoEditsToSubmit,n.appendChild(r),t.hidden=!1,t.focus()}runBasicValidation(e,t=!0,n,r,i){if(!d(e,this.form))return;const s=function(e){const t=e.labels&&e.labels.length?e.labels[0].textContent:e.getAttribute("aria-label");if(!t)throw new Error(`${e.nodeName} name="${e.name}" id="${e.id}" has no associated label.`);return t.trim()}(e),a=o(e);t&&(l(e,""),a.classList.remove("errored"));for(const o of this.validators){const d=o(e,s);if(d){if(n.push({input:e,message:d}),t){if(!e.id)continue;l(e,d),a.classList.add("errored");const t=document.createElement("li");t.classList.add("margin-bottom-xs");const n=document.createElement("a");n.href=`#${e.id}`,n.textContent=d,n.classList.add("help","help-danger"),n.addEventListener("click",(e=>{if(i){const t=e.target.getAttribute("href");t&&document.querySelector(t).focus()}})),t.appendChild(n),r.appendChild(t),i||e.classList.add(`${e.localName}-danger`)}break}i||c(e)}}}function i(e,t){const n=e;return!!n&&(n instanceof HTMLElement&&"form"in n&&n.form===t&&"validity"in n&&n.validity instanceof ValidityState&&"value"in n&&"string"==typeof n.value&&"type"in n&&"string"==typeof n.type&&!["button","submit"].includes(n.type))}function s(e,t){Array.from(e.elements).forEach((e=>{e instanceof HTMLButtonElement&&"submit"===e.type&&e.classList.toggle("is-loading",t)}))}function o(e){const t=e.closest(".field");if(!t)throw new Error(`${e.nodeName} name="${e.name}" id="${e.id}" is not within a .field`);return t}function a(e){const n=document.createElement("p");return n.id=t(),e.setAttribute("aria-describedby",`${n.id} ${e.getAttribute("aria-describedby")||""}`),n.classList.add("field-error"),n.setAttribute("data-field-error",""),function(e){const t=e.closest(".field-body");if(!t)throw new Error(`${e.nodeName} name="${e.name}" id="${e.id}" is not within a .field-body`);return t}(e).after(n),n}function l(e,t){(o(e).querySelector("[data-field-error]")||a(e)).textContent=t}function d(e,t){return i(e,t)&&"hidden"!==e.type}function c(e){e.classList.remove(`${e.localName}-danger`)}window.customElements.get("form-behavior")||(window.FormBehaviorElement=r,window.customElements.define("form-behavior",r)),function(e=document.body){e.addEventListener("toggle",(t=>{const n=t.target instanceof Element&&t.target.closest("details.popover")||t.target instanceof Element&&t.target.shadowRoot?.activeElement?.closest("details.popover");if(!n||!n.open)return;const r=e=>{"Escape"===e.key&&o()},i=e=>{e.target instanceof Element&&(n?.contains(e.target)||o(),"click"===e.type&&e.target.closest("[data-popover-close]")&&o())},s=()=>{"iframe"===document.activeElement?.nodeName?.toLowerCase()&&o()},o=()=>{e.removeEventListener("focus",i,!0),e.removeEventListener("click",i),e.removeEventListener("touchstart",i),e.removeEventListener("keydown",r),window.removeEventListener("blur",s),n?.open&&n.removeAttribute("open")};e.addEventListener("focus",i,!0),e.addEventListener("click",i),e.addEventListener("touchstart",i),e.addEventListener("keydown",r),window.addEventListener("blur",s)}),!0)}(),document.addEventListener("keydown",(e=>{(e.ctrlKey||e.metaKey)&&document.documentElement.classList.add("debug")})),document.addEventListener("keyup",(()=>{document.documentElement.classList.remove("debug")}));const u=document.querySelector(".burger");u.onclick=()=>{u.classList.toggle("burger-expanded")};class m extends HTMLElement{get modal(){return this.sharedId?document.querySelector(`[controlled-by="${this.sharedId}"`):null}sharedId=this.getAttribute("for");connectedCallback(){this.addEventListener("click",(()=>{this.modal.hidden=!this.modal.hidden,this.modal.hidden?document.documentElement.style.cssText="":document.documentElement.style.overflow="hidden"}))}}class h extends HTMLElement{static get observedAttributes(){return["hidden"]}attributeChangedCallback(e,t,n){"hidden"===e&&console.log("Custom square element attributes changed.")}constructor(){super()}get controlledBy(){return this.sharedId?document.querySelector(`[for="${this.sharedId}"`):null}sharedId=this.getAttribute("controlled-by");connectedCallback(){window.addEventListener("CloseModals",(()=>{document.querySelector(".burger").classList.toggle("burger-expanded"),this.hidden=!0}))}}window.customElements.get("modal-element")||(window.ModalElement=h,window.customElements.define("modal-element",h)),window.customElements.get("modal-trigger")||(window.ModalTriggerElement=m,window.customElements.define("modal-trigger",m)),window.addEventListener("click",(e=>{if(e.target instanceof Element&&e.target.closest(".modal-content"))return;e.target instanceof Element&&e.target.closest("modal-element")&&(console.log("CloseModals"),window.dispatchEvent(new CustomEvent("CloseModals")))}));
//# sourceMappingURL=index.302fef65.js.map