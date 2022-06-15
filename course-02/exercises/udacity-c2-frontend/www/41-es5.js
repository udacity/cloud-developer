(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41], {
    /***/
    "IUOf":
    /*!***************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-toggle.entry.js ***!
      \***************************************************************/

    /*! exports provided: ion_toggle */

    /***/
    function IUOf(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_toggle", function () {
        return Toggle;
      });
      /* harmony import */


      var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-e806d1f6.js */
      "A36C");
      /* harmony import */


      var _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ionic-global-9d5c8ee3.js */
      "Zgba");
      /* harmony import */


      var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./helpers-90f46169.js */
      "QPqR");
      /* harmony import */


      var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./haptic-27b3f981.js */
      "qULd");
      /* harmony import */


      var _theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./theme-ff3fc52f.js */
      "74mu");

      var toggleIosCss = ":host{-webkit-box-sizing:content-box !important;box-sizing:content-box !important;display:inline-block;position:relative;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}label{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;opacity:0}[dir=rtl] label,:host-context([dir=rtl]) label{left:unset;right:unset;right:0}label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.toggle-icon-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;width:100%;height:100%;-webkit-transition:var(--handle-transition);transition:var(--handle-transition);will-change:transform}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;background:var(--background);pointer-events:none;overflow:inherit}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}.toggle-inner{left:var(--handle-spacing);border-radius:var(--handle-border-radius);position:absolute;width:var(--handle-width);height:var(--handle-height);max-height:var(--handle-max-height);-webkit-transition:var(--handle-transition);transition:var(--handle-transition);background:var(--handle-background);-webkit-box-shadow:var(--handle-box-shadow);box-shadow:var(--handle-box-shadow);contain:strict}[dir=rtl] .toggle-inner,:host-context([dir=rtl]) .toggle-inner{left:unset;right:unset;right:var(--handle-spacing)}:host(.toggle-checked) .toggle-icon-wrapper{-webkit-transform:translate3d(calc(100% - var(--handle-width)), 0, 0);transform:translate3d(calc(100% - var(--handle-width)), 0, 0)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-icon-wrapper,:host-context([dir=rtl]).toggle-checked .toggle-icon-wrapper{-webkit-transform:translate3d(calc(-100% + var(--handle-width)), 0, 0);transform:translate3d(calc(-100% + var(--handle-width)), 0, 0)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0);transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0);background:var(--handle-background-checked)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner,:host-context([dir=rtl]).toggle-checked .toggle-inner{-webkit-transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0);transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0)}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.088);--background-checked:var(--ion-color-primary, #3880ff);--border-radius:16px;--handle-background:#ffffff;--handle-background-checked:#ffffff;--handle-border-radius:25.5px;--handle-box-shadow:0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);--handle-height:calc(32px - (2px * 2));--handle-max-height:calc(100% - (var(--handle-spacing) * 2));--handle-width:calc(32px - (2px * 2));--handle-spacing:2px;--handle-transition:transform 300ms, width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms;width:51px;height:32px;contain:strict;overflow:hidden}:host(.ion-color.toggle-checked) .toggle-icon{background:var(--ion-color-base)}.toggle-icon{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-transition:background-color 300ms;transition:background-color 300ms}.toggle-inner{will-change:transform}:host(.toggle-activated) .toggle-icon::before,:host(.toggle-checked) .toggle-icon::before{-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0)}:host(.toggle-activated.toggle-checked) .toggle-inner::before{-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0)}:host(.toggle-activated) .toggle-inner{width:calc(var(--handle-width) + 6px)}:host(.toggle-activated.toggle-checked) .toggle-icon-wrapper{-webkit-transform:translate3d(calc(100% - var(--handle-width) - 6px), 0, 0);transform:translate3d(calc(100% - var(--handle-width) - 6px), 0, 0)}:host-context([dir=rtl]):host(.toggle-activated.toggle-checked) .toggle-icon-wrapper,:host-context([dir=rtl]).toggle-activated.toggle-checked .toggle-icon-wrapper{-webkit-transform:translate3d(calc(-100% + var(--handle-width) + 6px), 0, 0);transform:translate3d(calc(-100% + var(--handle-width) + 6px), 0, 0)}:host(.toggle-disabled){opacity:0.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:20px;padding-right:10px;padding-top:6px;padding-bottom:5px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:10px;padding-inline-end:10px}}:host(.in-item[slot=start]){padding-left:0;padding-right:16px;padding-top:6px;padding-bottom:5px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:0;padding-inline-start:0;-webkit-padding-end:16px;padding-inline-end:16px}}";
      var toggleMdCss = ":host{-webkit-box-sizing:content-box !important;box-sizing:content-box !important;display:inline-block;position:relative;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}label{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;opacity:0}[dir=rtl] label,:host-context([dir=rtl]) label{left:unset;right:unset;right:0}label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.toggle-icon-wrapper{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;width:100%;height:100%;-webkit-transition:var(--handle-transition);transition:var(--handle-transition);will-change:transform}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;background:var(--background);pointer-events:none;overflow:inherit}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}.toggle-inner{left:var(--handle-spacing);border-radius:var(--handle-border-radius);position:absolute;width:var(--handle-width);height:var(--handle-height);max-height:var(--handle-max-height);-webkit-transition:var(--handle-transition);transition:var(--handle-transition);background:var(--handle-background);-webkit-box-shadow:var(--handle-box-shadow);box-shadow:var(--handle-box-shadow);contain:strict}[dir=rtl] .toggle-inner,:host-context([dir=rtl]) .toggle-inner{left:unset;right:unset;right:var(--handle-spacing)}:host(.toggle-checked) .toggle-icon-wrapper{-webkit-transform:translate3d(calc(100% - var(--handle-width)), 0, 0);transform:translate3d(calc(100% - var(--handle-width)), 0, 0)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-icon-wrapper,:host-context([dir=rtl]).toggle-checked .toggle-icon-wrapper{-webkit-transform:translate3d(calc(-100% + var(--handle-width)), 0, 0);transform:translate3d(calc(-100% + var(--handle-width)), 0, 0)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0);transform:translate3d(calc(var(--handle-spacing) * -2), 0, 0);background:var(--handle-background-checked)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner,:host-context([dir=rtl]).toggle-checked .toggle-inner{-webkit-transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0);transform:translate3d(calc(var(--handle-spacing) * 2), 0, 0)}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.39);--background-checked:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.5);--border-radius:14px;--handle-background:#ffffff;--handle-background-checked:var(--ion-color-primary, #3880ff);--handle-border-radius:50%;--handle-box-shadow:0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);--handle-width:20px;--handle-height:20px;--handle-max-height:calc(100% + 6px);--handle-spacing:0;--handle-transition:transform 160ms cubic-bezier(0.4, 0, 0.2, 1), background-color 160ms cubic-bezier(0.4, 0, 0.2, 1);padding-left:12px;padding-right:12px;padding-top:12px;padding-bottom:12px;width:36px;height:14px;contain:strict}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}:host(.ion-color.toggle-checked) .toggle-icon{background:rgba(var(--ion-color-base-rgb), 0.5)}:host(.ion-color.toggle-checked) .toggle-inner{background:var(--ion-color-base)}.toggle-icon{-webkit-transition:background-color 160ms;transition:background-color 160ms}.toggle-inner{will-change:background-color, transform}:host(.toggle-disabled){opacity:0.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:16px;padding-right:0;padding-top:12px;padding-bottom:12px;cursor:pointer}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:0;padding-inline-end:0}}:host(.in-item[slot=start]){padding-left:2px;padding-right:18px;padding-top:12px;padding-bottom:12px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:18px;padding-inline-end:18px}}";

      var Toggle = /*#__PURE__*/function () {
        function Toggle(hostRef) {
          var _this = this;

          _classCallCheck(this, Toggle);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionChange", 7);
          this.ionFocus = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionFocus", 7);
          this.ionBlur = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionBlur", 7);
          this.ionStyle = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionStyle", 7);
          this.inputId = "ion-tg-".concat(toggleIds++);
          this.lastDrag = 0;
          this.activated = false;
          /**
           * The name of the control, which is submitted with the form data.
           */

          this.name = this.inputId;
          /**
           * If `true`, the toggle is selected.
           */

          this.checked = false;
          /**
           * If `true`, the user cannot interact with the toggle.
           */

          this.disabled = false;
          /**
           * The value of the toggle does not mean if it's checked or not, use the `checked`
           * property for that.
           *
           * The value of a toggle is analogous to the value of a `<input type="checkbox">`,
           * it's only used when the toggle participates in a native `<form>`.
           */

          this.value = 'on';

          this.onClick = function (ev) {
            ev.preventDefault();

            if (_this.lastDrag + 300 < Date.now()) {
              _this.checked = !_this.checked;
            }
          };

          this.onFocus = function () {
            _this.ionFocus.emit();
          };

          this.onBlur = function () {
            _this.ionBlur.emit();
          };
        }

        _createClass(Toggle, [{
          key: "checkedChanged",
          value: function checkedChanged(isChecked) {
            this.ionChange.emit({
              checked: isChecked,
              value: this.value
            });
          }
        }, {
          key: "disabledChanged",
          value: function disabledChanged() {
            this.emitStyle();

            if (this.gesture) {
              this.gesture.enable(!this.disabled);
            }
          }
        }, {
          key: "connectedCallback",
          value: function () {
            var _connectedCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Promise.resolve().then(__webpack_require__.bind(null,
                      /*! ./index-f49d994d.js */
                      "iWo5"));

                    case 2:
                      this.gesture = _context.sent.createGesture({
                        el: this.el,
                        gestureName: 'toggle',
                        gesturePriority: 100,
                        threshold: 5,
                        passive: false,
                        onStart: function onStart() {
                          return _this2.onStart();
                        },
                        onMove: function onMove(ev) {
                          return _this2.onMove(ev);
                        },
                        onEnd: function onEnd(ev) {
                          return _this2.onEnd(ev);
                        }
                      });
                      this.disabledChanged();

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function connectedCallback() {
              return _connectedCallback.apply(this, arguments);
            }

            return connectedCallback;
          }()
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            if (this.gesture) {
              this.gesture.destroy();
              this.gesture = undefined;
            }
          }
        }, {
          key: "componentWillLoad",
          value: function componentWillLoad() {
            this.emitStyle();
          }
        }, {
          key: "emitStyle",
          value: function emitStyle() {
            this.ionStyle.emit({
              'interactive-disabled': this.disabled
            });
          }
        }, {
          key: "onStart",
          value: function onStart() {
            this.activated = true; // touch-action does not work in iOS

            this.setFocus();
          }
        }, {
          key: "onMove",
          value: function onMove(detail) {
            if (shouldToggle(document, this.checked, detail.deltaX, -10)) {
              this.checked = !this.checked;
              Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
            }
          }
        }, {
          key: "onEnd",
          value: function onEnd(ev) {
            this.activated = false;
            this.lastDrag = Date.now();
            ev.event.preventDefault();
            ev.event.stopImmediatePropagation();
          }
        }, {
          key: "getValue",
          value: function getValue() {
            return this.value || '';
          }
        }, {
          key: "setFocus",
          value: function setFocus() {
            if (this.focusEl) {
              this.focusEl.focus();
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _Object2,
                _this3 = this;

            var activated = this.activated,
                color = this.color,
                checked = this.checked,
                disabled = this.disabled,
                el = this.el,
                inputId = this.inputId,
                name = this.name;
            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);

            var _Object = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["c"])(el, inputId),
                label = _Object.label,
                labelId = _Object.labelId,
                labelText = _Object.labelText;

            var value = this.getValue();
            Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["d"])(true, el, name, checked ? value : '', disabled);
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              onClick: this.onClick,
              "aria-labelledby": label ? labelId : null,
              "aria-checked": "".concat(checked),
              "aria-hidden": disabled ? 'true' : null,
              role: "switch",
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_4__["c"])(color, (_Object2 = {}, _defineProperty(_Object2, mode, true), _defineProperty(_Object2, 'in-item', Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_4__["h"])('ion-item', el)), _defineProperty(_Object2, 'toggle-activated', activated), _defineProperty(_Object2, 'toggle-checked', checked), _defineProperty(_Object2, 'toggle-disabled', disabled), _defineProperty(_Object2, 'interactive', true), _Object2))
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toggle-icon",
              part: "track"
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toggle-icon-wrapper"
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toggle-inner",
              part: "handle"
            }))), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("label", {
              htmlFor: inputId
            }, labelText), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("input", {
              type: "checkbox",
              role: "switch",
              "aria-checked": "".concat(checked),
              disabled: disabled,
              id: inputId,
              onFocus: function onFocus() {
                return _this3.onFocus();
              },
              onBlur: function onBlur() {
                return _this3.onBlur();
              },
              ref: function ref(focusEl) {
                return _this3.focusEl = focusEl;
              }
            }));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }], [{
          key: "watchers",
          get: function get() {
            return {
              "checked": ["checkedChanged"],
              "disabled": ["disabledChanged"]
            };
          }
        }]);

        return Toggle;
      }();

      var shouldToggle = function shouldToggle(doc, checked, deltaX, margin) {
        var isRTL = doc.dir === 'rtl';

        if (checked) {
          return !isRTL && margin > deltaX || isRTL && -margin < deltaX;
        } else {
          return !isRTL && -margin < deltaX || isRTL && margin > deltaX;
        }
      };

      var toggleIds = 0;
      Toggle.style = {
        ios: toggleIosCss,
        md: toggleMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=41-es5.js.map