// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"vDvTb":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0cfa72cc76a3e1db";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"fImJM":[function(require,module,exports) {
// document.documentElement.classList.add("debug");
const atlasJs = require("@microsoft/atlas-js");
atlasJs.initPopover();
document.addEventListener("keydown", (e)=>{
    if (e.ctrlKey || e.metaKey) document.documentElement.classList.add("debug");
});
document.addEventListener("keyup", ()=>{
    document.documentElement.classList.remove("debug");
});
const burger = document.querySelector(".burger");
burger.onclick = ()=>{
    burger.classList.toggle("burger-expanded");
};
class ModalTriggerElement extends HTMLElement {
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
class ModalElement extends HTMLElement {
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
    window.ModalElement = ModalElement;
    window.customElements.define("modal-element", ModalElement);
}
if (!window.customElements.get("modal-trigger")) {
    window.ModalTriggerElement = ModalTriggerElement;
    window.customElements.define("modal-trigger", ModalTriggerElement);
}
window.addEventListener("click", (e)=>{
    const content = e.target instanceof Element && e.target.closest(".modal-content");
    if (content) return;
    const target = e.target instanceof Element && e.target.closest("modal-element");
    if (!target) return;
    console.log("CloseModals");
    window.dispatchEvent(new CustomEvent("CloseModals"));
});

},{"@microsoft/atlas-js":"7zbQR"}],"7zbQR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _popover = require("./behaviors/popover");
parcelHelpers.exportAll(_popover, exports);
var _snapScroll = require("./behaviors/snap-scroll");
parcelHelpers.exportAll(_snapScroll, exports);
var _formBehavior = require("./elements/form-behavior");
parcelHelpers.exportAll(_formBehavior, exports);
var _util = require("./utilities/util");
parcelHelpers.exportAll(_util, exports);

},{"./behaviors/popover":"e1UYa","./behaviors/snap-scroll":"3XZTn","./elements/form-behavior":"8jdLa","./utilities/util":"34H7Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e1UYa":[function(require,module,exports) {
/* eslint-disable @typescript-eslint/no-use-before-define */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initPopover", ()=>initPopover);
function initPopover(container = document.body) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3XZTn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Snap scroll behaviors to have a smooth transition from one card to another
 */ parcelHelpers.export(exports, "initSnapScroll", ()=>initSnapScroll);
parcelHelpers.export(exports, "initSnapScrollScrollListeners", ()=>initSnapScrollScrollListeners);
let snapScrollUpdating = false;
function initSnapScroll() {
    // slide card when the button is clicked
    initSnapScrollClickListeners();
    // update when slide scrolls into the view
    const snapScrolls = Array.from(document.querySelectorAll("[data-snap-scroll]"));
    for (const snapScroll of snapScrolls)initSnapScrollScrollListeners(snapScroll);
}
function initSnapScrollScrollListeners(element) {
    const slideContainer = element.querySelector("[data-snap-scroll-slides]");
    if (!slideContainer) throw new Error('Your snap scroll element must contain a scrollable element with "data-snap-scroll-slides" attribute.');
    const slides = Array.from(slideContainer.querySelectorAll("[data-snap-scroll-slide]"));
    const options = {
        root: slideContainer,
        rootMargin: "0px",
        threshold: 0.8
    };
    const observer = new IntersectionObserver((entries)=>{
        if (snapScrollUpdating) return;
        if (entries[0].isIntersecting === true) {
            const step = entries[0].target.getAttribute("data-snap-scroll-slide");
            if (!step) throw new Error("The [data-snap-scroll-slide] clicked does not correspond to a [data-snap-scroll-nav-item]");
            const anchor = element.querySelector(`[data-snap-scroll-nav-item="${step}"]`);
            if (!anchor) throw new Error("Anchor missing from snap scroll container");
            updatePaginationState(element, anchor);
        }
    }, options);
    slides.forEach((slide)=>observer.observe(slide));
}
function initSnapScrollClickListeners() {
    window.addEventListener("click", (event)=>{
        const target = event.target instanceof Element && event.target.closest("[data-snap-scroll-nav-item]");
        if (!target) return;
        const parentElement = target.closest("[data-snap-scroll]");
        if (!parentElement) return;
        const snapScrollId = target.dataset.snapScrollNavItem;
        if (!snapScrollId) throw new Error('You need to add a value to the parent of your snap scroll: [data-snap-scroll="id-goes-here")');
        snapScrollUpdating = true;
        event.preventDefault();
        const slide = parentElement.querySelector(`[data-snap-scroll-slide="${snapScrollId}"]`);
        updatePaginationState(parentElement, target);
        slide.scrollIntoView({
            behavior: "auto",
            block: "nearest",
            inline: "start"
        });
        setTimeout(()=>snapScrollUpdating = false, 500);
    });
}
function updatePaginationState(parentElement, activeAnchor) {
    // remove is current from all anchors in this container
    const anchors = Array.from(parentElement.querySelectorAll("[data-snap-scroll-nav-item]"));
    for (const a of anchors)a.classList.remove("is-current");
    // add one back
    activeAnchor.classList.add("is-current");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8jdLa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultMessageStrings", ()=>defaultMessageStrings);
// <form-behavior>
parcelHelpers.export(exports, "FormBehaviorElement", ()=>FormBehaviorElement);
parcelHelpers.export(exports, "getLabel", ()=>getLabel);
parcelHelpers.export(exports, "getField", ()=>getField);
parcelHelpers.export(exports, "getFieldBody", ()=>getFieldBody);
parcelHelpers.export(exports, "setValidationMessage", ()=>setValidationMessage);
parcelHelpers.export(exports, "navigateAfterSubmit", ()=>navigateAfterSubmit);
/* Custom elements are not included in HTMLFormControlsCollection so they can't be retrieved by form.elements */ parcelHelpers.export(exports, "collectCustomElementsByName", ()=>collectCustomElementsByName);
var _util = require("../utilities/util");
const defaultMessageStrings = {
    contentHasChanged: "Content has changed, please reload the page to get the latest changes.",
    inputMaxLength: "{inputLabel} cannot be longer than {maxLength} characters.",
    inputMinLength: "{inputLabel} must be at least {minLength} characters.",
    inputRequired: "{inputLabel} is required.",
    pleaseFixTheFollowingIssues: "Please fix the following issues to continue:",
    thereAreNoEditsToSubmit: "There are no edits to submit.",
    weEncounteredAnUnexpectedError: "We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
};
class FormBehaviorElement extends HTMLElement {
    submitting = false;
    initialData = new FormData();
    toDispose = [];
    isDirty = false;
    commitTimeout = 0;
    locStrings = Object.assign({}, defaultMessageStrings, Array.from(this.attributes).filter((a)=>a.name.startsWith("loc-")).reduce((map, a)=>{
        map[(0, _util.kebabToCamelCase)(a.name.substring(4))] = a.value;
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
        const navigate = navigateAfterSubmit(href, this.getAttribute("navigation"));
        return navigate;
    }
    scheduleCommit(event) {
        clearTimeout(this.commitTimeout);
        setTimeout(this.commit, 300, event);
    }
    commit = (event)=>{
        if (!isValueElement(event.target, this.form) || !event.target?.form || event.target?.form !== this.parentElement) return;
        clearTimeout(this.commitTimeout);
        if (event.type === "change") normalizeInputValue(event.target);
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
                    form
                },
                bubbles: true
            });
            this.dispatchEvent(validationErrorEvent);
            return;
        }
        let isNavigating = false;
        try {
            this.submitting = true;
            setBusySubmitButton(form, this.submitting);
            const result = await this.validateForm(form);
            if (!result.valid) return;
            const url = handleSubmitButtonAction(event) ?? form.action;
            const params = new URL(url).searchParams;
            const formData = new FormData(form);
            // set and read headers:
            const headers = new Headers();
            headers.set("content-type", "application/json");
            for (const { name , value  } of this.attributes)if (name.startsWith("header-")) headers.set(name.substring(7), value);
            // form.method does not support PUT or DELETE events, use method queryParam if it exists.
            const method = params.get("_method") || form.method || "GET";
            const init = {
                method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers
            };
            const beforeSubmitEvent = new CustomEvent("beforesubmit", {
                detail: {
                    url,
                    init,
                    form
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
                        request,
                        response
                    },
                    bubbles: true
                }));
                isNavigating = this.navigate(response.headers.get("location") ?? this.getAttribute("navigation-href"));
            } else {
                const { errorAlert , errorList  } = this.getErrorAlert(form);
                const errorText = document.createElement("li");
                errorText.innerText = this.locStrings.weEncounteredAnUnexpectedError;
                // custom text for version mismatch
                if (response.status === 412) errorText.innerText = this.locStrings.contentHasChanged;
                this.dispatchEvent(new CustomEvent("submission-error", {
                    detail: {
                        form,
                        request,
                        response
                    },
                    bubbles: true
                }));
                errorList.appendChild(errorText);
                errorAlert.hidden = false;
                errorAlert.focus();
            }
        } finally{
            this.submitting = isNavigating;
            setBusySubmitButton(form, this.submitting);
        }
    }
    createErrorAlert(form) {
        const formLayout = form.querySelector("[data-form-error-container]") || form;
        const alertId = (0, _util.generateElementId)();
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
            errorAlert,
            errorList
        };
    }
    getErrorAlert(form) {
        const errorAlert = form.querySelector("[data-form-error-alert]");
        if (errorAlert) return {
            errorAlert,
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
        const { errorAlert , errorList  } = this.getErrorAlert(form);
        if (displayValidity) {
            errorAlert.hidden = true;
            errorList.innerHTML = "";
        }
        const customElements1 = collectCustomElementsByName(form);
        for (const input of [
            ...form.elements,
            ...customElements1
        ]){
            if (!scope.contains(input) || !canValidate(input, form)) continue;
            if (input.hasAttribute("aria-hidden") === true) continue;
            // Don't check combobox
            if (input.getAttribute("role") === "combobox") continue;
            // Don't check elements that are part of markdown editor
            if (input.closest("docs-markdown-editor")) continue;
            if (input.hasAttribute("data-skip-validation")) {
                const validationErrorEvent = new CustomEvent("form-validating", {
                    detail: {
                        errors,
                        form
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
                    errors,
                    form
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
            errors
        };
    }
    clearValidationErrors(target) {
        if (!canValidate(target, this.form)) return;
        clearInputErrorBorder(target);
        setValidationMessage(target, "");
        getField(target).classList.remove("errored");
        if (target.form) {
            const { errorAlert , errorList  } = this.getErrorAlert(target.form);
            errorList.querySelectorAll(`a[href="#${target.id}"]`).forEach((a)=>a.parentElement?.remove());
            // clear no edits error if it exists as well
            errorList.querySelector("#no-edits-error")?.remove();
            if (!errorList.firstElementChild) errorAlert.hidden = true;
        }
        const clearValidationEvent = new CustomEvent("clear-validation-errors", {
            detail: {
                target
            },
            bubbles: true
        });
        this.dispatchEvent(clearValidationEvent);
    }
    showNoChangesMessage(form) {
        const { errorAlert , errorList  } = this.getErrorAlert(form);
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
        if (!canValidate(input, this.form)) return;
        const label = getLabel(input);
        const group = getField(input);
        if (displayValidity) {
            setValidationMessage(input, "");
            group.classList.remove("errored");
        }
        for (const validator of this.validators){
            const message = validator(input, label);
            if (!message) {
                if (!isCustomElement) clearInputErrorBorder(input);
                continue;
            }
            errors.push({
                input,
                message
            });
            if (displayValidity) {
                if (!input.id) continue;
                setValidationMessage(input, message);
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
    window.FormBehaviorElement = FormBehaviorElement;
    window.customElements.define("form-behavior", FormBehaviorElement);
}
// Check if the required value related properties exist rather than an instance of a form related element.
function isValueElement(target, form) {
    const element = target;
    if (element) return element instanceof HTMLElement && "form" in element && element.form === form && "validity" in element && element.validity instanceof ValidityState && "value" in element && typeof element.value === "string" && "type" in element && typeof element.type === "string" && ![
        "button",
        "submit"
    ].includes(element.type);
    return false;
}
function normalizeInputValue(target) {
    if (target instanceof HTMLTextAreaElement) target.value = target.value.trim();
    else if (target instanceof HTMLInputElement && (target.type === "text" || target.type === "email")) target.value = target.value.trim();
}
function setBusySubmitButton(form, isLoading) {
    Array.from(form.elements).forEach((element)=>{
        if (element instanceof HTMLButtonElement && element.type === "submit") element.classList.toggle("is-loading", isLoading);
    });
}
function getLabel(input) {
    const label = input.labels && input.labels.length ? input.labels[0].textContent : input.getAttribute("aria-label");
    if (!label) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" has no associated label.`);
    return label.trim();
}
function getField(input) {
    const group = input.closest(".field");
    if (!group) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field`);
    return group;
}
function getFieldBody(input) {
    const body = input.closest(".field-body");
    if (!body) throw new Error(`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field-body`);
    return body;
}
function createErrorNote(input) {
    const note = document.createElement("p");
    note.id = (0, _util.generateElementId)();
    input.setAttribute("aria-describedby", `${note.id} ${input.getAttribute("aria-describedby") || ""}`);
    note.classList.add("field-error");
    note.setAttribute("data-field-error", "");
    getFieldBody(input).after(note);
    return note;
}
function setValidationMessage(element, message) {
    const group = getField(element);
    const note = group.querySelector("[data-field-error]") || createErrorNote(element);
    note.textContent = message;
}
function canValidate(target, form) {
    return isValueElement(target, form) && target.type !== "hidden";
}
function navigateAfterSubmit(href, navigationStep) {
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
function collectCustomElementsByName(form) {
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
function clearInputErrorBorder(input) {
    input.classList.remove(`${input.localName}-danger`);
}
function handleSubmitButtonAction(event) {
    const submitter = event.submitter;
    const formAction = submitter instanceof HTMLButtonElement && submitter.formAction !== window.location.href ? submitter.formAction : null;
    return formAction;
}

},{"../utilities/util":"34H7Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"34H7Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateElementId", ()=>generateElementId);
parcelHelpers.export(exports, "kebabToCamelCase", ()=>kebabToCamelCase);
let nextId = 0;
function generateElementId() {
    return `bx-${nextId++}`;
}
function kebabToCamelCase(str) {
    return str.replace(/-./g, (x)=>x[1].toUpperCase());
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["vDvTb","fImJM"], "fImJM", "parcelRequire0be9")

//# sourceMappingURL=index.76a3e1db.js.map
