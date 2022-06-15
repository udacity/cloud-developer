(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "L3sA":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-toast.entry.js ***!
  \**************************************************************/
/*! exports provided: ion_toast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_toast", function() { return Toast; });
/* harmony import */ var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-e806d1f6.js */ "A36C");
/* harmony import */ var _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ionic-global-9d5c8ee3.js */ "Zgba");
/* harmony import */ var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers-90f46169.js */ "QPqR");
/* harmony import */ var _animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-54fe0237.js */ "z1RL");
/* harmony import */ var _index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index-9e3fe806.js */ "39oe");
/* harmony import */ var _hardware_back_button_4a6b37fb_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hardware-back-button-4a6b37fb.js */ "B4Jq");
/* harmony import */ var _overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./overlays-12c20431.js */ "oLNq");
/* harmony import */ var _theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./theme-ff3fc52f.js */ "74mu");









/**
 * iOS Toast Enter Animation
 */
const iosEnterAnimation = (baseEl, position) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const hostEl = baseEl.host || baseEl;
  const wrapperEl = baseEl.querySelector('.toast-wrapper');
  const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
  const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
  wrapperAnimation.addElement(wrapperEl);
  switch (position) {
    case 'top':
      wrapperAnimation.fromTo('transform', 'translateY(-100%)', `translateY(${top})`);
      break;
    case 'middle':
      const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
      wrapperEl.style.top = `${topPosition}px`;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      break;
    default:
      wrapperAnimation.fromTo('transform', 'translateY(100%)', `translateY(${bottom})`);
      break;
  }
  return baseAnimation
    .addElement(hostEl)
    .easing('cubic-bezier(.155,1.105,.295,1.12)')
    .duration(400)
    .addAnimation(wrapperAnimation);
};

/**
 * iOS Toast Leave Animation
 */
const iosLeaveAnimation = (baseEl, position) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const hostEl = baseEl.host || baseEl;
  const wrapperEl = baseEl.querySelector('.toast-wrapper');
  const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
  const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
  wrapperAnimation.addElement(wrapperEl);
  switch (position) {
    case 'top':
      wrapperAnimation.fromTo('transform', `translateY(${top})`, 'translateY(-100%)');
      break;
    case 'middle':
      wrapperAnimation.fromTo('opacity', 0.99, 0);
      break;
    default:
      wrapperAnimation.fromTo('transform', `translateY(${bottom})`, 'translateY(100%)');
      break;
  }
  return baseAnimation
    .addElement(hostEl)
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(300)
    .addAnimation(wrapperAnimation);
};

/**
 * MD Toast Enter Animation
 */
const mdEnterAnimation = (baseEl, position) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const hostEl = baseEl.host || baseEl;
  const wrapperEl = baseEl.querySelector('.toast-wrapper');
  const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
  const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
  wrapperAnimation.addElement(wrapperEl);
  switch (position) {
    case 'top':
      wrapperEl.style.top = top;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      break;
    case 'middle':
      const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
      wrapperEl.style.top = `${topPosition}px`;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      break;
    default:
      wrapperEl.style.bottom = bottom;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      break;
  }
  return baseAnimation
    .addElement(hostEl)
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(400)
    .addAnimation(wrapperAnimation);
};

/**
 * md Toast Leave Animation
 */
const mdLeaveAnimation = (baseEl) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const hostEl = baseEl.host || baseEl;
  const wrapperEl = baseEl.querySelector('.toast-wrapper');
  wrapperAnimation
    .addElement(wrapperEl)
    .fromTo('opacity', 0.99, 0);
  return baseAnimation
    .addElement(hostEl)
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(300)
    .addAnimation(wrapperAnimation);
};

const toastIosCss = ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:pre-wrap;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}[dir=rtl] .toast-wrapper,:host-context([dir=rtl]) .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50, #f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary, #3880ff);--color:var(--ion-color-step-850, #262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-middle{opacity:0.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color, opacity 100ms linear;transition:background-color, opacity 100ms linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.ion-activated{opacity:0.4}@media (any-hover: hover){.toast-button:hover{opacity:0.6}}";

const toastMdCss = ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:pre-wrap;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}[dir=rtl] .toast-wrapper,:host-context([dir=rtl]) .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-800, #333333);--border-radius:4px;--box-shadow:0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);--button-color:var(--ion-color-primary, #3880ff);--color:var(--ion-color-step-50, #f2f2f2);--max-width:700px;--start:8px;--end:8px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;opacity:0.01;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.toast-content{padding-left:16px;padding-right:16px;padding-top:14px;padding-bottom:14px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.toast-header{margin-bottom:2px;font-weight:500;line-height:20px}.toast-message{line-height:20px}.toast-button-group-start{margin-left:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-group-start{margin-left:unset;-webkit-margin-start:8px;margin-inline-start:8px}}.toast-button-group-end{margin-right:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-group-end{margin-right:unset;-webkit-margin-end:8px;margin-inline-end:8px}}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;font-family:var(--ion-font-family);font-size:14px;font-weight:500;letter-spacing:0.84px;text-transform:uppercase;overflow:hidden}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button-cancel{color:var(--ion-color-step-100, #e6e6e6)}.toast-button-icon-only{border-radius:50%;padding-left:9px;padding-right:9px;padding-top:9px;padding-bottom:9px;width:36px;height:36px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-icon-only{padding-left:unset;padding-right:unset;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px}}@media (any-hover: hover){.toast-button:hover{background-color:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.08)}.toast-button-cancel:hover{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.08)}}";

const Toast = class {
  constructor(hostRef) {
    Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    this.didPresent = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionToastDidPresent", 7);
    this.willPresent = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionToastWillPresent", 7);
    this.willDismiss = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionToastWillDismiss", 7);
    this.didDismiss = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionToastDidDismiss", 7);
    this.presented = false;
    /**
     * How many milliseconds to wait before hiding the toast. By default, it will show
     * until `dismiss()` is called.
     */
    this.duration = 0;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    this.keyboardClose = false;
    /**
     * The position of the toast on the screen.
     */
    this.position = 'bottom';
    /**
     * If `true`, the toast will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    this.translucent = false;
    /**
     * If `true`, the toast will animate.
     */
    this.animated = true;
    this.dispatchCancelHandler = (ev) => {
      const role = ev.detail.role;
      if (Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["i"])(role)) {
        const cancelButton = this.getButtons().find(b => b.role === 'cancel');
        this.callButtonHandler(cancelButton);
      }
    };
  }
  connectedCallback() {
    Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["e"])(this.el);
  }
  /**
   * Present the toast overlay after it has been created.
   */
  async present() {
    await Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["d"])(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
    if (this.duration > 0) {
      this.durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this.duration);
    }
  }
  /**
   * Dismiss the toast overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the toast.
   * This can be useful in a button handler for determining which button was
   * clicked to dismiss the toast.
   * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
   */
  dismiss(data, role) {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["f"])(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
  }
  /**
   * Returns a promise that resolves when the toast did dismiss.
   */
  onDidDismiss() {
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["g"])(this.el, 'ionToastDidDismiss');
  }
  /**
   * Returns a promise that resolves when the toast will dismiss.
   */
  onWillDismiss() {
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["g"])(this.el, 'ionToastWillDismiss');
  }
  getButtons() {
    const buttons = this.buttons
      ? this.buttons.map(b => {
        return (typeof b === 'string')
          ? { text: b }
          : b;
      })
      : [];
    return buttons;
  }
  async buttonClick(button) {
    const role = button.role;
    if (Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["i"])(role)) {
      return this.dismiss(undefined, role);
    }
    const shouldDismiss = await this.callButtonHandler(button);
    if (shouldDismiss) {
      return this.dismiss(undefined, role);
    }
    return Promise.resolve();
  }
  async callButtonHandler(button) {
    if (button && button.handler) {
      // a handler has been provided, execute it
      // pass the handler the values from the inputs
      try {
        const rtn = await Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["s"])(button.handler);
        if (rtn === false) {
          // if the return value of the handler is false then do not dismiss
          return false;
        }
      }
      catch (e) {
        console.error(e);
      }
    }
    return true;
  }
  renderButtons(buttons, side) {
    if (buttons.length === 0) {
      return;
    }
    const mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
    const buttonGroupsClasses = {
      'toast-button-group': true,
      [`toast-button-group-${side}`]: true
    };
    return (Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: buttonGroupsClasses }, buttons.map(b => Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { type: "button", class: buttonClass(b), tabIndex: 0, onClick: () => this.buttonClick(b), part: "button" }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "toast-button-inner" }, b.icon &&
      Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", { icon: b.icon, slot: b.text === undefined ? 'icon-only' : undefined, class: "toast-icon" }), b.text), mode === 'md' && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-ripple-effect", { type: b.icon !== undefined && b.text === undefined ? 'unbounded' : 'bounded' })))));
  }
  render() {
    const allButtons = this.getButtons();
    const startButtons = allButtons.filter(b => b.side === 'start');
    const endButtons = allButtons.filter(b => b.side !== 'start');
    const mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
    const wrapperClass = {
      'toast-wrapper': true,
      [`toast-${this.position}`]: true
    };
    return (Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], { style: {
        zIndex: `${60000 + this.overlayIndex}`,
      }, class: Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__["c"])(this.color, Object.assign(Object.assign({ [mode]: true }, Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__["g"])(this.cssClass)), { 'toast-translucent': this.translucent })), tabindex: "-1", onIonToastWillDismiss: this.dispatchCancelHandler }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: wrapperClass }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "toast-container", part: "container" }, this.renderButtons(startButtons, 'start'), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "toast-content" }, this.header !== undefined &&
      Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "toast-header", part: "header" }, this.header), this.message !== undefined &&
      Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "toast-message", part: "message", innerHTML: Object(_index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__["s"])(this.message) })), this.renderButtons(endButtons, 'end')))));
  }
  get el() { return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this); }
};
const buttonClass = (button) => {
  return Object.assign({ 'toast-button': true, 'toast-button-icon-only': button.icon !== undefined && button.text === undefined, [`toast-button-${button.role}`]: button.role !== undefined, 'ion-focusable': true, 'ion-activatable': true }, Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__["g"])(button.cssClass));
};
Toast.style = {
  ios: toastIosCss,
  md: toastMdCss
};




/***/ })

}]);
//# sourceMappingURL=40-es2015.js.map