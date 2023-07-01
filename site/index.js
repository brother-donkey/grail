// document.documentElement.classList.add("debug");

const atlasJs = require("@microsoft/atlas-js");
atlasJs.initPopover();

if (hljs) {
  hljs.highlightAll();
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    document.documentElement.classList.add("debug");
  }
});

document.addEventListener("keyup", () => {
  document.documentElement.classList.remove("debug");
});

const burger = document.querySelector(".burger");
burger.onclick = () => {
  burger.classList.toggle("burger-expanded");
};

class ModalTriggerElement extends HTMLElement {
  get modal() {
    if (!this.sharedId) {
      return null;
    }
    return document.querySelector(`[controlled-by="${this.sharedId}"`);
  }
  sharedId = this.getAttribute("for");

  connectedCallback() {
    this.addEventListener("click", () => {
      this.modal.hidden = !this.modal.hidden;
      // being lazy here, I admit
      if (this.modal.hidden) {
        document.documentElement.style.cssText = "";
      } else {
        document.documentElement.style.overflow = "hidden";
      }
    });
  }
}

class ModalElement extends HTMLElement {
  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "hidden") {
      console.log("Custom square element attributes changed.");
    }
  }

  constructor() {
    super();
  }
  get controlledBy() {
    if (!this.sharedId) {
      return null;
    }
    return document.querySelector(`[for="${this.sharedId}"`);
  }
  sharedId = this.getAttribute("controlled-by");

  connectedCallback() {
    window.addEventListener("CloseModals", () => {
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
  window.ModalElement = ModalElement;
  window.customElements.define("modal-element", ModalElement);
}

if (!window.customElements.get("modal-trigger")) {
  window.ModalTriggerElement = ModalTriggerElement;
  window.customElements.define("modal-trigger", ModalTriggerElement);
}

window.addEventListener("click", (e) => {
  const content =
    e.target instanceof Element && e.target.closest(".modal-content");
  if (content) {
    return;
  }
  const target =
    e.target instanceof Element && e.target.closest("modal-element");

  if (!target) {
    return;
  }
  console.log("CloseModals");
  window.dispatchEvent(new CustomEvent("CloseModals"));
});
