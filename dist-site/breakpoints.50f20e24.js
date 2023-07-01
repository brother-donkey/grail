// document.documentElement.classList.add("debug");
/* eslint-disable @typescript-eslint/no-use-before-define */ function $e9274bcb6dcba339$export$7ae0af140e650b26(container = document.body) {
    container.addEventListener("toggle", (event)=>{
        const targetPopover = event.target instanceof Element && event.target.closest("details.popover") || event.target instanceof Element && event.target.shadowRoot?.activeElement?.closest("details.popover");
        if (!targetPopover || !targetPopover.open) return;
        const keyHandler = (event)=>{
            if (event.key === "Escape") closePopovers();
        };
        const checkTarget = (event)=>{
            if (!(event.target instanceof Element)) return;
            if (!targetPopover?.contains(event.target)) closePopovers();
            if (event.type === "click" && event.target.closest("[data-popover-close]")) closePopovers();
        };
        const blurHandler = ()=>{
            if (document.activeElement?.nodeName?.toLowerCase() === "iframe") closePopovers();
        };
        const closePopovers = ()=>{
            container.removeEventListener("focus", checkTarget, true);
            container.removeEventListener("click", checkTarget);
            container.removeEventListener("touchstart", checkTarget);
            container.removeEventListener("keydown", keyHandler);
            window.removeEventListener("blur", blurHandler);
            if (targetPopover?.open) targetPopover.removeAttribute("open");
        };
        container.addEventListener("focus", checkTarget, true);
        container.addEventListener("click", checkTarget);
        container.addEventListener("touchstart", checkTarget);
        container.addEventListener("keydown", keyHandler);
        window.addEventListener("blur", blurHandler);
    }, true);
}


let $e3a2cc0cb932e19e$var$snapScrollUpdating = false;
function $e3a2cc0cb932e19e$export$4b58943ac722c0ed() {
    // slide card when the button is clicked
    $e3a2cc0cb932e19e$var$initSnapScrollClickListeners();
    // update when slide scrolls into the view
    const snapScrolls = Array.from(document.querySelectorAll("[data-snap-scroll]"));
    for (const snapScroll of snapScrolls)$e3a2cc0cb932e19e$export$3f1703e6cdd6d4ee(snapScroll);
}
function $e3a2cc0cb932e19e$export$3f1703e6cdd6d4ee(element) {
    const slideContainer = element.querySelector("[data-snap-scroll-slides]");
    if (!slideContainer) throw new Error('Your snap scroll element must contain a scrollable element with "data-snap-scroll-slides" attribute.');
    const slides = Array.from(slideContainer.querySelectorAll("[data-snap-scroll-slide]"));
    const options = {
        root: slideContainer,
        rootMargin: "0px",
        threshold: 0.8
    };
    const observer = new IntersectionObserver((entries)=>{
        if ($e3a2cc0cb932e19e$var$snapScrollUpdating) return;
        if (entries[0].isIntersecting === true) {
            const step = entries[0].target.getAttribute("data-snap-scroll-slide");
            if (!step) throw new Error("The [data-snap-scroll-slide] clicked does not correspond to a [data-snap-scroll-nav-item]");
            const anchor = element.querySelector(`[data-snap-scroll-nav-item="${step}"]`);
            if (!anchor) throw new Error("Anchor missing from snap scroll container");
            $e3a2cc0cb932e19e$var$updatePaginationState(element, anchor);
        }
    }, options);
    slides.forEach((slide)=>observer.observe(slide));
}
function $e3a2cc0cb932e19e$var$initSnapScrollClickListeners() {
    window.addEventListener("click", (event)=>{
        const target = event.target instanceof Element && event.target.closest("[data-snap-scroll-nav-item]");
        if (!target) return;
        const parentElement = target.closest("[data-snap-scroll]");
        if (!parentElement) return;
        const snapScrollId = target.dataset.snapScrollNavItem;
        if (!snapScrollId) throw new Error('You need to add a value to the parent of your snap scroll: [data-snap-scroll="id-goes-here")');
        $e3a2cc0cb932e19e$var$snapScrollUpdating = true;
        event.preventDefault();
        const slide = parentElement.querySelector(`[data-snap-scroll-slide="${snapScrollId}"]`);
        $e3a2cc0cb932e19e$var$updatePaginationState(parentElement, target);
        slide.scrollIntoView({
            behavior: "auto",
            block: "nearest",
            inline: "start"
        });
        setTimeout(()=>$e3a2cc0cb932e19e$var$snapScrollUpdating = false, 500);
    });
}
function $e3a2cc0cb932e19e$var$updatePaginationState(parentElement, activeAnchor) {
    // remove is current from all anchors in this container
    const anchors = Array.from(parentElement.querySelectorAll("[data-snap-scroll-nav-item]"));
    for (const a of anchors)a.classList.remove("is-current");
    // add one back
    activeAnchor.classList.add("is-current");
}


let $dead31fa3111bc23$var$nextId = 0;
function $dead31fa3111bc23$export$cfe7bad09682ff51() {
    return `bx-${$dead31fa3111bc23$var$nextId++}`;
}
function $dead31fa3111bc23$export$4e2d767d23cc93ee(str) {
    return str.replace(/-./g, (x)=>x[1].toUpperCase());
}


const $c361dea830e4f878$export$74d1e9f4105a478b = {
    contentHasChanged: "Content has changed, please reload the page to get the latest changes.",
    inputMaxLength: "{inputLabel} cannot be longer than {maxLength} characters.",
    inputMinLength: "{inputLabel} must be at least {minLength} characters.",
    inputRequired: "{inputLabel} is required.",
    pleaseFixTheFollowingIssues: "Please fix the following issues to continue:",
    thereAreNoEditsToSubmit: "There are no edits to submit.",
    weEncounteredAnUnexpectedError: "We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
};
class $c361dea830e4f878$export$eff824212e04ca3f extends HTMLElement {
    submitting = false;
    initialData = new FormData();
    toDispose = [];
    isDirty = false;
    commitTimeout = 0;
    locStrings = Object.assign({}, $c361dea830e4f878$export$74d1e9f4105a478b, Array.from(this.attributes).filter((a)=>a.name.startsWith("loc-")).reduce((map, a)=>{
        map[(0, $dead31fa3111bc23$export$4e2d767d23cc93ee)(a.name.substring(4))] = a.value;
        return map;
    }, {}));
    validators = [
        this.validateMinLength.bind(this),
        this.validateRequired.bind(this),
        this.validateMaxLength.bind(this)
    ];
    constructor(){
        super();
        this.locStrings = this.locStrings;
    }
    get canSave() {
        return this.isDirty || this.isNew;
    }
    get form() {
        return this.closest(`form`);
    }
    // disable browser message when leaving page
    get hideUnloadMessage() {
        return this.hasAttribute("nounload");
    }
    // use the new attribute when you want to ignore isDirty validation (for example, if the only user action on the form is to click a button)
    get isNew() {
        return this.hasAttribute("new");
    }
    connectedCallback() {
        const form = this.parentElement;
        if (!(form instanceof HTMLFormElement)) return;
        form.setAttribute("novalidate", "");
        const errorSummaryContainer = document.createElement("div");
        errorSummaryContainer.setAttribute("data-form-error-container", "");
        this.insertAdjacentElement("afterend", errorSummaryContainer);
        this.initialData = new FormData(form);
        if (this.ownerDocument.readyState === "loading") this.ownerDocument.addEventListener("readystatechange", ()=>this.initialData = new FormData(form));
        this.subscribe(form, "input", this);
        this.subscribe(form, "change", this);
        this.subscribe(form, "submit", this);
        this.subscribe(window, "beforeunload", this);
    }
    disconnectedCallback() {
        for (const dispose of this.toDispose)dispose();
    }
    subscribe(target, type, listener) {
        target.addEventListener(type, listener);
        this.toDispose.push(()=>target.removeEventListener(type, listener));
    }
    setDirty() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const initial = new URLSearchParams(this.initialData).toString();
        const current = new URLSearchParams(// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new FormData(this.parentElement)).toString();
        this.isDirty = current !== initial;
    }
    handleEvent(event) {
        switch(event.type){
            case "submit":
                this.handleSubmitEvent(event);
                break;
            case "beforeunload":
                this.handleUnloadEvent(event);
                break;
            case "input":
                this.clearValidationErrors(event.target);
                this.scheduleCommit(event);
                break;
            case "change":
                this.clearValidationErrors(event.target);
                this.commit(event);
                break;
            default:
                throw new Error(`Unexpected event ${event.type}.`);
        }
    }
    navigate(href) {
        const navigate = $c361dea830e4f878$export$7aa55fd9657ff73(href, this.getAttribute("navigation"));
        return navigate;
    }
    scheduleCommit(event) {
        clearTimeout(this.commitTimeout);
        setTimeout(this.commit, 300, event);
    }
    commit = (event)=>{
        if (!$c361dea830e4f878$var$isValueElement(event.target, this.form) || !event.target?.form || event.target?.form !== this.parentElement) return;
        clearTimeout(this.commitTimeout);
        if (event.type === "change") $c361dea830e4f878$var$normalizeInputValue(event.target);
        this.setDirty();
    };
    async handleUnloadEvent(event) {
        this.setDirty();
        if (!this.isDirty || this.hideUnloadMessage) return;
        event.preventDefault();
        event.returnValue = "You have unsaved work."; // browser overrides this text
    }
    async handleSubmitEvent(event) {
        event.preventDefault();
        if (this.submitting) return;
        const form = event.currentTarget;
        // reject the submit if no edits have been made (overridable with the new attribute)
        if (!this.canSave) {
            this.showNoChangesMessage(form);
            const validationErrorEvent = new CustomEvent("form-validating", {
                detail: {
                    form: form
                },
                bubbles: true
            });
            this.dispatchEvent(validationErrorEvent);
            return;
        }
        let isNavigating = false;
        try {
            this.submitting = true;
            $c361dea830e4f878$var$setBusySubmitButton(form, this.submitting);
            const result = await this.validateForm(form);
            if (!result.valid) return;
            const url = $c361dea830e4f878$var$handleSubmitButtonAction(event) ?? form.action;
            const params = new URL(url).searchParams;
            const formData = new FormData(form);
            // set and read headers:
            const headers = new Headers();
            headers.set("content-type", "application/json");
            for (const { name: name , value: value  } of this.attributes)if (name.startsWith("header-")) headers.set(name.substring(7), value);
            // form.method does not support PUT or DELETE events, use method queryParam if it exists.
            const method = params.get("_method") || form.method || "GET";
            const init = {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: headers
            };
            const beforeSubmitEvent = new CustomEvent("beforesubmit", {
                detail: {
                    url: url,
                    init: init,
                    form: form
                },
                bubbles: true,
                cancelable: true
            });
            const cancelled = !this.dispatchEvent(beforeSubmitEvent);
            if (cancelled) return;
            const request = new Request(beforeSubmitEvent.detail.url, beforeSubmitEvent.detail.init);
            const response = await fetch(request);
            if (response.ok) {
                this.removeAttribute("new");
                this.initialData = formData;
                this.setDirty();
                this.dispatchEvent(new CustomEvent("aftersubmit", {
                    detail: {
                        request: request,
                        response: response
                    },
                    bubbles: true
                }));
                isNavigating = this.navigate(response.headers.get("location") ?? this.getAttribute("navigation-href"));
            } else {
                const { errorAlert: errorAlert , errorList: errorList  } = this.getErrorAlert(form);
                const errorText = document.createElement("li");
                errorText.innerText = this.locStrings.weEncounteredAnUnexpectedError;
                // custom text for version mismatch
                if (response.status === 412) errorText.innerText = this.locStrings.contentHasChanged;
                this.dispatchEvent(new CustomEvent("submission-error", {
                    detail: {
                        form: form,
                        request: request,
                        response: response
                    },
                    bubbles: true
                }));
                errorList.appendChild(errorText);
                errorAlert.hidden = false;
                errorAlert.focus();
            }
        } finally{
            this.submitting = isNavigating;
            $c361dea830e4f878$var$setBusySubmitButton(form, this.submitting);
        }
    }
    createErrorAlert(form) {
        const formLayout = form.querySelector("[data-form-error-container]") || form;
        const alertId = (0, $dead31fa3111bc23$export$cfe7bad09682ff51)();
        const errorAlert = document.createElement("div");
        errorAlert.className = "help help-danger background-color-danger-light border border-color-danger border-radius padding-xs margin-bottom-sm";
        errorAlert.setAttribute("data-form-error-alert", "");
        errorAlert.setAttribute("role", "alert");
        errorAlert.setAttribute("aria-labelledby", alertId);
        errorAlert.setAttribute("tabindex", "-1");
        errorAlert.hidden = true;
        const alertText = document.createElement("p");
        alertText.id = alertId;
        alertText.className = "font-size-md font-weight-semibold margin-bottom-xs display-inline-flex";
        alertText.innerText = this.locStrings.pleaseFixTheFollowingIssues;
        const errorList = document.createElement("ul");
        errorList.setAttribute("aria-label", "Validation errors");
        errorList.classList.add("margin-left-sm-tablet");
        errorAlert.append(alertText, errorList);
        formLayout.appendChild(errorAlert);
        return {
            errorAlert: errorAlert,
            errorList: errorList
        };
    }
    getErrorAlert(form) {
        const errorAlert = form.querySelector("[data-form-error-alert]");
        if (errorAlert) return {
            errorAlert: errorAlert,
            errorList: errorAlert.lastElementChild
        };
        return this.createErrorAlert(form);
    }
    validateRequired(input, label) {
        if (input.validity.valueMissing) return `${this.locStrings.inputRequired.replace("{inputLabel}", customElements.get(input.localName) ? `A selection for "${label}"` : label)}`;
        return null;
    }
    validateMinLength(input, label) {
        if ((input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) && (input.validity.tooShort || input.minLength > 0 && input.value.length < input.minLength)) return `${this.locStrings.inputMinLength.replace("{inputLabel}", label).replace("{minLength}", input.minLength.toString())}`;
        return null;
    }
    validateMaxLength(input, label) {
        if ((input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) && (input.validity.tooLong || input.maxLength > 0 && input.value.length > input.maxLength)) return `${this.locStrings.inputMaxLength.replace("{inputLabel}", label).replace("{maxLength}", input.maxLength.toString())}`;
        return null;
    }
    async validateForm(form, displayValidity = true, scope = form) {
        const errors = [];
        const { errorAlert: errorAlert , errorList: errorList  } = this.getErrorAlert(form);
        if (displayValidity) {
            errorAlert.hidden = true;
            errorList.innerHTML = "";
        }
        const customElements1 = $c361dea830e4f878$export$6fdbe88c041d855d(form);
        for (const input of [
            ...form.elements,
            ...customElements1
        ]){
            if (!scope.contains(input) || !$c361dea830e4f878$var$canValidate(input, form)) continue;
            if (input.hasAttribute("aria-hidden") === true) continue;
            // Don't check combobox
            if (input.getAttribute("role") === "combobox") continue;
            // Don't check elements that are part of markdown editor
            if (input.closest("docs-markdown-editor")) continue;
            if (input.hasAttribute("data-skip-validation")) {
                const validationErrorEvent = new CustomEvent("form-validating", {
                    detail: {
                        errors: errors,
                        form: form
                    },
                    bubbles: true
                });
                this.dispatchEvent(validationErrorEvent);
                continue;
            }
            const isCustomElement = !!customElements1.find((el)=>el === input);
            this.runBasicValidation(input, displayValidity, errors, errorList, isCustomElement);
            const validationErrorEvent1 = new CustomEvent("form-validating", {
                detail: {
                    errors: errors,
                    form: form
                },
                bubbles: true
            });
            this.dispatchEvent(validationErrorEvent1);
        }
        if (errors.length === 0) return {
            valid: true
        };
        if (displayValidity) {
            errorAlert.hidden = false;
            errorAlert.focus();
        }
        return {
            valid: false,
            errors: errors
        };
    }
    clearValidationErrors(target) {
        if (!$c361dea830e4f878$var$canValidate(target, this.form)) return;
        $c361dea830e4f878$var$clearInputErrorBorder(target);
        $c361dea830e4f878$export$e0ddcd48746f2dd9(target, "");
        $c361dea830e4f878$export$2c9b3f539cb25b05(target).classList.remove("errored");
        if (target.form) {
            const { errorAlert: errorAlert , errorList: errorList  } = this.getErrorAlert(target.form);
            errorList.querySelectorAll(`a[href="#${target.id}"]`).forEach((a)=>a.parentElement?.remove());
            // clear no edits error if it exists as well
            errorList.querySelector("#no-edits-error")?.remove();
            if (!errorList.firstElementChild) errorAlert.hidden = true;
        }
        const clearValidationEvent = new CustomEvent("clear-validation-errors", {
            detail: {
                target: target
            },
            bubbles: true
        });
        this.dispatchEvent(clearValidationEvent);
    }
    showNoChangesMessage(form) {
        const { errorAlert: errorAlert , errorList: errorList  } = this.getErrorAlert(form);
        if (errorList.childElementCount > 0) {
            while(errorList.firstChild)errorList.lastChild?.remove();
            // clear no edits error if it exists as well
            errorList.querySelector("#no-edits-error")?.remove();
        }
        const errorText = document.createElement("li");
        errorText.id = "no-edits-error";
        errorText.innerText = this.locStrings.thereAreNoEditsToSubmit;
        errorList.appendChild(errorText);
        errorAlert.hidden = false;
        errorAlert.focus();
    }
    runBasicValidation(input, displayValidity = true, errors, errorList, isCustomElement) {
        if (!$c361dea830e4f878$var$canValidate(input, this.form)) return;
        const label = $c361dea830e4f878$export$236350842f3cd9bc(input);
        const group = $c361dea830e4f878$export$2c9b3f539cb25b05(input);
        if (displayValidity) {
            $c361dea830e4f878$export$e0ddcd48746f2dd9(input, "");
            group.classList.remove("errored");
        }
        for (const validator of this.validators){
            const message = validator(input, label);
            if (!message) {
                if (!isCustomElement) $c361dea830e4f878$var$clearInputErrorBorder(input);
                continue;
            }
            errors.push({
                input: input,
                message: message
            });
            if (displayValidity) {
                if (!input.id) continue;
                $c361dea830e4f878$export$e0ddcd48746f2dd9(input, message);
                group.classList.add("errored");
                const child = document.createElement("li");
                child.classList.add("margin-bottom-xs");
                const a = document.createElement("a");
                a.href = `#${input.id}`;
                a.textContent = message;
                a.classList.add("help", "help-danger");
                // ensure focus is set on the custom element
                a.addEventListener("click", (e)=>{
                    if (isCustomElement) {
                        const target = e.target.getAttribute("href");
                        if (target) document.querySelector(target).focus();
                    }
                });
                child.appendChild(a);
                errorList.appendChild(child);
                if (!isCustomElement) input.classList.add(`${input.localName}-danger`);
            }
            break;
        }
    }
}
if (!window.customElements.get("form-behavior")) {
    window.FormBehaviorElement = $c361dea830e4f878$export$eff824212e04ca3f;
    window.customElements.define("form-behavior", $c361dea830e4f878$export$eff824212e04ca3f);
}
// Check if the required value related properties exist rather than an instance of a form related element.
function $c361dea830e4f878$var$isValueElement(target, form) {
    const element = target;
    if (element) return element instanceof HTMLElement && "form" in element && element.form === form && "validity" in element && element.validity instanceof ValidityState && "value" in element && typeof element.value === "string" && "type" in element && typeof element.type === "string" && ![
        "button",
        "submit"
    ].includes(element.type);
    return false;
}
function $c361dea830e4f878$var$normalizeInputValue(target) {
    if (target instanceof HTMLTextAreaElement) target.value = target.value.trim();
    else if (target instanceof HTMLInputElement && (target.type === "text" || target.type === "email")) target.value = target.value.trim();
}
function $c361dea830e4f878$var$setBusySubmitButton(form, isLoading) {
    Array.from(form.elements).forEach((element)=>{
        if (element instanceof HTMLButtonElement && element.type === "submit") element.classList.toggle("is-loading", isLoading);
    });
}
function $c361dea830e4f878$export$236350842f3cd9bc(input) {
    const label = input.labels && input.labels.length ? input.labels[0].textContent : input.getAttribute("aria-label");
    if (!label) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" has no associated label.`);
    return label.trim();
}
function $c361dea830e4f878$export$2c9b3f539cb25b05(input) {
    const group = input.closest(".field");
    if (!group) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field`);
    return group;
}
function $c361dea830e4f878$export$52dd50fe747c85c8(input) {
    const body = input.closest(".field-body");
    if (!body) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field-body`);
    return body;
}
function $c361dea830e4f878$var$createErrorNote(input) {
    const note = document.createElement("p");
    note.id = (0, $dead31fa3111bc23$export$cfe7bad09682ff51)();
    input.setAttribute("aria-describedby", `${note.id} ${input.getAttribute("aria-describedby") || ""}`);
    note.classList.add("field-error");
    note.setAttribute("data-field-error", "");
    $c361dea830e4f878$export$52dd50fe747c85c8(input).after(note);
    return note;
}
function $c361dea830e4f878$export$e0ddcd48746f2dd9(element, message) {
    const group = $c361dea830e4f878$export$2c9b3f539cb25b05(element);
    const note = group.querySelector("[data-field-error]") || $c361dea830e4f878$var$createErrorNote(element);
    note.textContent = message;
}
function $c361dea830e4f878$var$canValidate(target, form) {
    return $c361dea830e4f878$var$isValueElement(target, form) && target.type !== "hidden";
}
function $c361dea830e4f878$export$7aa55fd9657ff73(href, navigationStep) {
    switch(navigationStep){
        case null:
            // do nothing.
            return false;
        case "follow":
            if (href) {
                location.href = href;
                return true;
            }
            return false;
        case "hash-reload":
            if (href) {
                const search = href.includes("?") ? "" : window.location.search;
                if (href !== search + window.location.hash) {
                    const state = history.state || {};
                    window.history.pushState(state, document.title, window.location.pathname + search + href); // prevents scrolling to spot until reload
                }
                location.reload();
                return true;
            }
            return false;
        case "replace":
            if (href) {
                location.replace(href);
                return true;
            }
            return false;
        case "reload":
            location.reload();
            return true;
        default:
            throw new Error(`Unexpected navigation attribute value.`);
    }
}
function $c361dea830e4f878$export$6fdbe88c041d855d(form) {
    // Compare FormData with form.elements to find missing elements.
    const formData = Object.fromEntries(new FormData(form));
    const customElementList = [];
    const customElements1 = Object.keys(formData).filter((key)=>{
        return !form.elements.namedItem(key);
    });
    customElements1.forEach((name)=>{
        const element = form.querySelector(`[name="${name}"]`);
        if (element) customElementList.push(element);
    });
    return customElementList;
}
function $c361dea830e4f878$var$clearInputErrorBorder(input) {
    input.classList.remove(`${input.localName}-danger`);
}
function $c361dea830e4f878$var$handleSubmitButtonAction(event) {
    const submitter = event.submitter;
    const formAction = submitter instanceof HTMLButtonElement && submitter.formAction !== window.location.href ? submitter.formAction : null;
    return formAction;
}





$e9274bcb6dcba339$export$7ae0af140e650b26();
if (hljs) hljs.highlightAll();
document.addEventListener("keydown", (e)=>{
    if (e.ctrlKey || e.metaKey) document.documentElement.classList.add("debug");
});
document.addEventListener("keyup", ()=>{
    document.documentElement.classList.remove("debug");
});
const $67eb8c286a25d58c$var$burger = document.querySelector(".burger");
$67eb8c286a25d58c$var$burger.onclick = ()=>{
    $67eb8c286a25d58c$var$burger.classList.toggle("burger-expanded");
};
class $67eb8c286a25d58c$var$ModalTriggerElement extends HTMLElement {
    get modal() {
        if (!this.sharedId) return null;
        return document.querySelector(`[controlled-by="${this.sharedId}"`);
    }
    sharedId = this.getAttribute("for");
    connectedCallback() {
        this.addEventListener("click", ()=>{
            this.modal.hidden = !this.modal.hidden;
            // being lazy here, I admit
            if (this.modal.hidden) document.documentElement.style.cssText = "";
            else document.documentElement.style.overflow = "hidden";
        });
    }
}
class $67eb8c286a25d58c$var$ModalElement extends HTMLElement {
    static get observedAttributes() {
        return [
            "hidden"
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "hidden") console.log("Custom square element attributes changed.");
    }
    constructor(){
        super();
    }
    get controlledBy() {
        if (!this.sharedId) return null;
        return document.querySelector(`[for="${this.sharedId}"`);
    }
    sharedId = this.getAttribute("controlled-by");
    connectedCallback() {
        window.addEventListener("CloseModals", ()=>{
            const burger = document.querySelector(".burger");
            burger.classList.toggle("burger-expanded");
            this.hidden = true;
        });
    // this.addEventListener("click", (e) => {
    //   console.log({ sharedId: this.sharedId, controlledBy: this.controlledBy });
    // });
    }
}
if (!window.customElements.get("modal-element")) {
    window.ModalElement = $67eb8c286a25d58c$var$ModalElement;
    window.customElements.define("modal-element", $67eb8c286a25d58c$var$ModalElement);
}
if (!window.customElements.get("modal-trigger")) {
    window.ModalTriggerElement = $67eb8c286a25d58c$var$ModalTriggerElement;
    window.customElements.define("modal-trigger", $67eb8c286a25d58c$var$ModalTriggerElement);
}
window.addEventListener("click", (e)=>{
    const content = e.target instanceof Element && e.target.closest(".modal-content");
    if (content) return;
    const target = e.target instanceof Element && e.target.closest("modal-element");
    if (!target) return;
    console.log("CloseModals");
    window.dispatchEvent(new CustomEvent("CloseModals"));
});


//# sourceMappingURL=breakpoints.50f20e24.js.map
