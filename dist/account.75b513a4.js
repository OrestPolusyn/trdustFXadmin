/**
 * Applies the :focus-visible polyfill at the given scope.
 * A scope in this case is either the top-level Document or a Shadow Root.
 *
 * @param {(Document|ShadowRoot)} scope
 * @see https://github.com/WICG/focus-visible
 */ function $02c44a70162568c4$var$applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;
    var inputTypesAllowlist = {
        text: true,
        search: true,
        url: true,
        tel: true,
        email: true,
        password: true,
        number: true,
        date: true,
        month: true,
        week: true,
        time: true,
        datetime: true,
        "datetime-local": true
    };
    /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   * @param {Element} el
   */ function isValidFocusTarget(el) {
        if (el && el !== document && el.nodeName !== "HTML" && el.nodeName !== "BODY" && "classList" in el && "contains" in el.classList) return true;
        return false;
    }
    /**
   * Computes whether the given element should automatically trigger the
   * `focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   * @param {Element} el
   * @return {boolean}
   */ function focusTriggersKeyboardModality(el) {
        var type = el.type;
        var tagName = el.tagName;
        if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) return true;
        if (tagName === "TEXTAREA" && !el.readOnly) return true;
        if (el.isContentEditable) return true;
        return false;
    }
    /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */ function addFocusVisibleClass(el) {
        if (el.classList.contains("focus-visible")) return;
        el.classList.add("focus-visible");
        el.setAttribute("data-focus-visible-added", "");
    }
    /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */ function removeFocusVisibleClass(el) {
        if (!el.hasAttribute("data-focus-visible-added")) return;
        el.classList.remove("focus-visible");
        el.removeAttribute("data-focus-visible-added");
    }
    /**
   * If the most recent user interaction was via the keyboard;
   * and the key press did not include a meta, alt/option, or control key;
   * then the modality is keyboard. Otherwise, the modality is not keyboard.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   * @param {KeyboardEvent} e
   */ function onKeyDown(e) {
        if (e.metaKey || e.altKey || e.ctrlKey) return;
        if (isValidFocusTarget(scope.activeElement)) addFocusVisibleClass(scope.activeElement);
        hadKeyboardEvent = true;
    }
    /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */ function onPointerDown(e) {
        hadKeyboardEvent = false;
    }
    /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */ function onFocus(e) {
        // Prevent IE from focusing the document or HTML element.
        if (!isValidFocusTarget(e.target)) return;
        if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) addFocusVisibleClass(e.target);
    }
    /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */ function onBlur(e) {
        if (!isValidFocusTarget(e.target)) return;
        if (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) {
            // To detect a tab/window switch, we look for a blur event followed
            // rapidly by a visibility change.
            // If we don't see a visibility change within 100ms, it's probably a
            // regular focus change.
            hadFocusVisibleRecently = true;
            window.clearTimeout(hadFocusVisibleRecentlyTimeout);
            hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
                hadFocusVisibleRecently = false;
            }, 100);
            removeFocusVisibleClass(e.target);
        }
    }
    /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */ function onVisibilityChange(e) {
        if (document.visibilityState === "hidden") {
            // If the tab becomes active again, the browser will handle calling focus
            // on the element (Safari actually calls it twice).
            // If this tab change caused a blur on an element with focus-visible,
            // re-apply the class when the user switches back to the tab.
            if (hadFocusVisibleRecently) hadKeyboardEvent = true;
            addInitialPointerMoveListeners();
        }
    }
    /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */ function addInitialPointerMoveListeners() {
        document.addEventListener("mousemove", onInitialPointerMove);
        document.addEventListener("mousedown", onInitialPointerMove);
        document.addEventListener("mouseup", onInitialPointerMove);
        document.addEventListener("pointermove", onInitialPointerMove);
        document.addEventListener("pointerdown", onInitialPointerMove);
        document.addEventListener("pointerup", onInitialPointerMove);
        document.addEventListener("touchmove", onInitialPointerMove);
        document.addEventListener("touchstart", onInitialPointerMove);
        document.addEventListener("touchend", onInitialPointerMove);
    }
    function removeInitialPointerMoveListeners() {
        document.removeEventListener("mousemove", onInitialPointerMove);
        document.removeEventListener("mousedown", onInitialPointerMove);
        document.removeEventListener("mouseup", onInitialPointerMove);
        document.removeEventListener("pointermove", onInitialPointerMove);
        document.removeEventListener("pointerdown", onInitialPointerMove);
        document.removeEventListener("pointerup", onInitialPointerMove);
        document.removeEventListener("touchmove", onInitialPointerMove);
        document.removeEventListener("touchstart", onInitialPointerMove);
        document.removeEventListener("touchend", onInitialPointerMove);
    }
    /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */ function onInitialPointerMove(e) {
        // Work around a Safari quirk that fires a mousemove on <html> whenever the
        // window blurs, even if you're tabbing out of the page. ??\_(???)_/??
        if (e.target.nodeName && e.target.nodeName.toLowerCase() === "html") return;
        hadKeyboardEvent = false;
        removeInitialPointerMoveListeners();
    }
    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    document.addEventListener("visibilitychange", onVisibilityChange, true);
    addInitialPointerMoveListeners();
    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener("focus", onFocus, true);
    scope.addEventListener("blur", onBlur, true);
    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) // Since a ShadowRoot is a special kind of DocumentFragment, it does not
    // have a root element to add a class to. So, we add this attribute to the
    // host element instead:
    scope.host.setAttribute("data-js-focus-visible", "");
    else if (scope.nodeType === Node.DOCUMENT_NODE) {
        document.documentElement.classList.add("js-focus-visible");
        document.documentElement.setAttribute("data-js-focus-visible", "");
    }
}
// It is important to wrap all references to global window and document in
// these checks to support server-side rendering use cases
// @see https://github.com/WICG/focus-visible/issues/199
if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = $02c44a70162568c4$var$applyFocusVisiblePolyfill;
    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var $02c44a70162568c4$var$event;
    try {
        $02c44a70162568c4$var$event = new CustomEvent("focus-visible-polyfill-ready");
    } catch (error) {
        // IE11 does not support using CustomEvent as a constructor directly:
        $02c44a70162568c4$var$event = document.createEvent("CustomEvent");
        $02c44a70162568c4$var$event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
    }
    window.dispatchEvent($02c44a70162568c4$var$event);
}
if (typeof document !== "undefined") // Apply the polyfill to the global document, so that no JavaScript
// coordination is required to use the polyfill in the top-level document:
$02c44a70162568c4$var$applyFocusVisiblePolyfill(document);




const $657b39eb6ff3d6b0$export$c6742064fd272eef = "document", $657b39eb6ff3d6b0$export$5ccb867f293e3c4c = "classList", $657b39eb6ff3d6b0$export$eb19ebbec1ff9510 = "add", $657b39eb6ff3d6b0$export$7be779bc7f76622c = "remove", $657b39eb6ff3d6b0$export$4b515c6f72c0fb7e = "toggle", $657b39eb6ff3d6b0$export$7a240564ed1f29c7 = "querySelectorAll", $657b39eb6ff3d6b0$export$242934abc2863db9 = "querySelector";


const $a47a85354d581c97$export$98ba287114e9d0c3 = ()=>{
    const headerHeight = document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](".header")?.offsetHeight;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    return headerHeight;
};
window.addEventListener("resize", $a47a85354d581c97$export$98ba287114e9d0c3);
$a47a85354d581c97$export$98ba287114e9d0c3();


const $6667b7547144472b$export$de363e709c412c8a = (func, delay = 250)=>{
    let isThrottled = false;
    let savedArgs = null;
    let savedThis = null;
    return function wrap(...args) {
        if (isThrottled) {
            savedArgs = args, savedThis = this;
            return;
        }
        func.apply(this, args);
        isThrottled = true;
        setTimeout(()=>{
            isThrottled = false;
            if (savedThis) {
                wrap.apply(savedThis, savedArgs);
                savedThis = null;
                savedArgs = null;
            }
        }, delay);
    };
};


const $6cc1eacb3c93609d$var$fixFullheight = ()=>{
    let vh = window.innerHeight * 0.01;
    document.querySelector(":root").style.setProperty("--vh", `${vh}px`);
};
let $6cc1eacb3c93609d$var$fixHeight = (0, $6667b7547144472b$export$de363e709c412c8a)($6cc1eacb3c93609d$var$fixFullheight);
$6cc1eacb3c93609d$var$fixHeight();
window.addEventListener("resize", $6cc1eacb3c93609d$var$fixHeight);




$(".form__select select").select2({
    minimumResultsForSearch: -1,
    width: "100%"
});
$(".form-history__select select").select2({
    minimumResultsForSearch: -1,
    width: "100%"
});


const $93f8c4064fa3925a$var$progressDrag = document.querySelector(".range__drag");
const $93f8c4064fa3925a$var$progressText = document.querySelector(".range__text");
const $93f8c4064fa3925a$var$rangeFill = ()=>{
    const value = $93f8c4064fa3925a$var$progressDrag.value;
    $93f8c4064fa3925a$var$progressDrag.style.setProperty("--percent", `${value}%`);
};
if ($93f8c4064fa3925a$var$progressDrag || $93f8c4064fa3925a$var$progressText) {
    $93f8c4064fa3925a$var$progressDrag.addEventListener("input", $93f8c4064fa3925a$var$rangeFill);
    $93f8c4064fa3925a$var$progressText.addEventListener("input", $93f8c4064fa3925a$var$rangeFill);
    $93f8c4064fa3925a$var$rangeFill();
}




const $6cd5a34147d3d71e$export$6e6f8e21af33b231 = (item, className)=>{
    document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](item)?.[0, $657b39eb6ff3d6b0$export$5ccb867f293e3c4c][0, $657b39eb6ff3d6b0$export$eb19ebbec1ff9510](className);
};
const $6cd5a34147d3d71e$export$21b4674b9a6e7161 = (item, className)=>{
    document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](item)?.[0, $657b39eb6ff3d6b0$export$5ccb867f293e3c4c][0, $657b39eb6ff3d6b0$export$7be779bc7f76622c](className);
};
const $6cd5a34147d3d71e$export$5401572fb47f69f8 = (item, className)=>{
    document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](item)?.[0, $657b39eb6ff3d6b0$export$5ccb867f293e3c4c][0, $657b39eb6ff3d6b0$export$4b515c6f72c0fb7e](className);
};


document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](".referal__copy")?.addEventListener("click", (e)=>{
    const btnCopy = e.currentTarget;
    const textContent = e.currentTarget.querySelector(".referal__copy-link").innerText;
    navigator.clipboard.writeText(textContent);
    if (navigator.clipboard.writeText(textContent)) {
        btnCopy.querySelector(".copy").classList.add("copied");
        setTimeout(()=>{
            (0, $6cd5a34147d3d71e$export$21b4674b9a6e7161)(".copy", "copied");
        }, 5000);
    }
});




document[0, $657b39eb6ff3d6b0$export$242934abc2863db9](".burger")?.addEventListener("click", (e)=>{
    if (!e.target.matches(".burger")) return;
    (0, $6cd5a34147d3d71e$export$5401572fb47f69f8)(".page", "page--menu");
});
document[0, $657b39eb6ff3d6b0$export$242934abc2863db9]("span.nav__link")?.addEventListener("click", (e)=>{
    e.target.classList.toggle("nav__link--hover");
});




if (null) null.accept();


//# sourceMappingURL=account.75b513a4.js.map
