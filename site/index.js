// document.documentElement.classList.add("debug");

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
        this.querySelector("button")?.focus();
      } else {
        constrainFocus(this, this.modal);
        this.querySelector("button").focus();
        burger.setAttribute("aria-expanded", true);

        document.documentElement.style.overflow = "hidden";
      }
    });
  }
}

function constrainFocus(trigger, modal) {
  const focusableElements = [
    trigger.querySelector("button"),
    ...modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    ),
  ];

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const keyDownHandler = (e) => {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (
      document.activeElement !== trigger.querySelector("button") &&
      !focusableElements.includes(document.activeElement)
    ) {
      return;
    }

    if (!isTabPressed) {
      return;
    }

    const currentIndex = focusableElements.findIndex(
      (x) => x == document.activeElement
    );
    const isLastElement = currentIndex === focusableElements.length - 1;
    const isFirstElement = currentIndex === 0;

    if (currentIndex === -1) {
      throw new Error("Error finding currently focused element");
    }

    e.preventDefault();

    if (e.shiftKey && isFirstElement) {
      /* shift + tab */
      lastFocusableElement.focus();
    } else if (!e.shiftKey && isLastElement) {
      /* tab */
      firstFocusableElement.focus();
    } else if (e.shiftKey) {
      /* shift + tab */
      const destinationIndex = currentIndex - 1;
      focusableElements[destinationIndex].focus();
    } else {
      /* tab */
      focusableElements[currentIndex + 1].focus();
    }
  };

  window.addEventListener("keydown", keyDownHandler);

  window.addEventListener("CloseModals", () => {
    console.log("CloseModals removeEventListener");
    window.removeEventListener("keydown", keyDownHandler);
  });
  trigger.addEventListener("click", () => {
    console.log("trigger removeEventListener");
    window.removeEventListener("keydown", keyDownHandler);
  });
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
      burger.setAttribute("aria-expanded", false);
      this.controlledBy.querySelector("button")?.focus();
      this.hidden = true;
    });
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

window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") {
    return;
  }
  window.dispatchEvent(new CustomEvent("CloseModals"));
});

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
  window.dispatchEvent(new CustomEvent("CloseModals"));
});
