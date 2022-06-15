(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "cABk":
/*!****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-loading.entry.js ***!
  \****************************************************************/
/*! exports provided: ion_loading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_loading", function() { return Loading; });
/* harmony import */ var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-e806d1f6.js */ "A36C");
/* harmony import */ var _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ionic-global-9d5c8ee3.js */ "Zgba");
/* harmony import */ var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers-90f46169.js */ "QPqR");
/* harmony import */ var _animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-54fe0237.js */ "z1RL");
/* harmony import */ var _index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index-9e3fe806.js */ "39oe");
/* harmony import */ var _hardware_back_button_4a6b37fb_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hardware-back-button-4a6b37fb.js */ "B4Jq");
/* harmony import */ var _overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./overlays-12c20431.js */ "oLNq");
/* harmony import */ var _theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./theme-ff3fc52f.js */ "74mu");









/**
 * iOS Loading Enter Animation
 */
const iosEnterAnimation = (baseEl) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const backdropAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  backdropAnimation
    .addElement(baseEl.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
    'pointer-events': 'none'
  })
    .afterClearStyles(['pointer-events']);
  wrapperAnimation
    .addElement(baseEl.querySelector('.loading-wrapper'))
    .keyframes([
    { offset: 0, opacity: 0.01, transform: 'scale(1.1)' },
    { offset: 1, opacity: 1, transform: 'scale(1)' }
  ]);
  return baseAnimation
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(200)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

/**
 * iOS Loading Leave Animation
 */
const iosLeaveAnimation = (baseEl) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const backdropAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  backdropAnimation
    .addElement(baseEl.querySelector('ion-backdrop'))
    .fromTo('opacity', 'var(--backdrop-opacity)', 0);
  wrapperAnimation
    .addElement(baseEl.querySelector('.loading-wrapper'))
    .keyframes([
    { offset: 0, opacity: 0.99, transform: 'scale(1)' },
    { offset: 1, opacity: 0, transform: 'scale(0.9)' }
  ]);
  return baseAnimation
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(200)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

/**
 * Md Loading Enter Animation
 */
const mdEnterAnimation = (baseEl) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const backdropAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  backdropAnimation
    .addElement(baseEl.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
    'pointer-events': 'none'
  })
    .afterClearStyles(['pointer-events']);
  wrapperAnimation
    .addElement(baseEl.querySelector('.loading-wrapper'))
    .keyframes([
    { offset: 0, opacity: 0.01, transform: 'scale(1.1)' },
    { offset: 1, opacity: 1, transform: 'scale(1)' }
  ]);
  return baseAnimation
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(200)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

/**
 * Md Loading Leave Animation
 */
const mdLeaveAnimation = (baseEl) => {
  const baseAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const backdropAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  const wrapperAnimation = Object(_animation_54fe0237_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
  backdropAnimation
    .addElement(baseEl.querySelector('ion-backdrop'))
    .fromTo('opacity', 'var(--backdrop-opacity)', 0);
  wrapperAnimation
    .addElement(baseEl.querySelector('.loading-wrapper'))
    .keyframes([
    { offset: 0, opacity: 0.99, transform: 'scale(1)' },
    { offset: 1, opacity: 0, transform: 'scale(0.9)' }
  ]);
  return baseAnimation
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(200)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

const loadingIosCss = ".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-lines.sc-ion-loading-ios,.spinner-lines-small.sc-ion-loading-ios,.spinner-bubbles.sc-ion-loading-ios,.spinner-circles.sc-ion-loading-ios,.spinner-crescent.sc-ion-loading-ios,.spinner-dots.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, #f9f9f9));--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600, #666666);--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);color:var(--ion-text-color, #000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding-left:34px;padding-right:34px;padding-top:24px;padding-bottom:24px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-wrapper.sc-ion-loading-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.loading-content.sc-ion-loading-ios{font-weight:bold}.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{margin-left:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}";

const loadingMdCss = ".sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-lines.sc-ion-loading-md,.spinner-lines-small.sc-ion-loading-md,.spinner-bubbles.sc-ion-loading-md,.spinner-circles.sc-ion-loading-md,.spinner-crescent.sc-ion-loading-md,.spinner-dots.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50, #f2f2f2);--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary, #3880ff);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);color:var(--ion-color-step-850, #262626);font-size:14px}.loading-wrapper.sc-ion-loading-md{border-radius:2px;padding-left:24px;padding-right:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0, 0, 0, 0.4);box-shadow:0 16px 20px rgba(0, 0, 0, 0.4)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-wrapper.sc-ion-loading-md{padding-left:unset;padding-right:unset;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px}}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{margin-left:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}";

const Loading = class {
  constructor(hostRef) {
    Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    this.didPresent = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionLoadingDidPresent", 7);
    this.willPresent = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionLoadingWillPresent", 7);
    this.willDismiss = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionLoadingWillDismiss", 7);
    this.didDismiss = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionLoadingDidDismiss", 7);
    this.presented = false;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    this.keyboardClose = true;
    /**
     * Number of milliseconds to wait before dismissing the loading indicator.
     */
    this.duration = 0;
    /**
     * If `true`, the loading indicator will be dismissed when the backdrop is clicked.
     */
    this.backdropDismiss = false;
    /**
     * If `true`, a backdrop will be displayed behind the loading indicator.
     */
    this.showBackdrop = true;
    /**
     * If `true`, the loading indicator will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    this.translucent = false;
    /**
     * If `true`, the loading indicator will animate.
     */
    this.animated = true;
    this.onBackdropTap = () => {
      this.dismiss(undefined, _overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["B"]);
    };
  }
  connectedCallback() {
    Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["e"])(this.el);
  }
  componentWillLoad() {
    if (this.spinner === undefined) {
      const mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
      this.spinner = _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["c"].get('loadingSpinner', _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["c"].get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
    }
  }
  /**
   * Present the loading overlay after it has been created.
   */
  async present() {
    await Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["d"])(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation, undefined);
    if (this.duration > 0) {
      this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
    }
  }
  /**
   * Dismiss the loading overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the loading.
   * This can be useful in a button handler for determining which button was
   * clicked to dismiss the loading.
   * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
   */
  dismiss(data, role) {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["f"])(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
  }
  /**
   * Returns a promise that resolves when the loading did dismiss.
   */
  onDidDismiss() {
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["g"])(this.el, 'ionLoadingDidDismiss');
  }
  /**
   * Returns a promise that resolves when the loading will dismiss.
   */
  onWillDismiss() {
    return Object(_overlays_12c20431_js__WEBPACK_IMPORTED_MODULE_6__["g"])(this.el, 'ionLoadingWillDismiss');
  }
  render() {
    const { message, spinner } = this;
    const mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
    return (Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], { onIonBackdropTap: this.onBackdropTap, tabindex: "-1", style: {
        zIndex: `${40000 + this.overlayIndex}`
      }, class: Object.assign(Object.assign({}, Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_7__["g"])(this.cssClass)), { [mode]: true, 'loading-translucent': this.translucent }) }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { tabindex: "0" }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-wrapper ion-overlay-wrapper", role: "dialog" }, spinner && (Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-spinner" }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-spinner", { name: spinner, "aria-hidden": "true" }))), message && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-content", innerHTML: Object(_index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__["s"])(message) })), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { tabindex: "0" })));
  }
  get el() { return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this); }
};
Loading.style = {
  ios: loadingIosCss,
  md: loadingMdCss
};




/***/ })

}]);
//# sourceMappingURL=18-es2015.js.map