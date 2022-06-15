(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15], {
    /***/
    "ercB":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-input.entry.js ***!
      \**************************************************************/

    /*! exports provided: ion_input */

    /***/
    function ercB(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_input", function () {
        return Input;
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


      var _theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./theme-ff3fc52f.js */
      "74mu");

      var inputIosCss = ".sc-ion-input-ios-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--background:transparent;--color:initial;display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;width:100%;padding:0 !important;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}ion-item.sc-ion-input-ios-h:not(.item-label),ion-item:not(.item-label) .sc-ion-input-ios-h{--padding-start:0}.ion-color.sc-ion-input-ios-h{color:var(--ion-color-base)}.native-input.sc-ion-input-ios{border-radius:var(--border-radius);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;-ms-flex:1;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.native-input.sc-ion-input-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-input.sc-ion-input-ios::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-ios:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-ios:invalid{-webkit-box-shadow:none;box-shadow:none}.native-input.sc-ion-input-ios::-ms-clear{display:none}.native-input[disabled].sc-ion-input-ios{opacity:0.4}.cloned-input.sc-ion-input-ios{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-input-ios .cloned-input.sc-ion-input-ios,[dir=rtl].sc-ion-input-ios-h .cloned-input.sc-ion-input-ios,[dir=rtl] .sc-ion-input-ios-h .cloned-input.sc-ion-input-ios{left:unset;right:unset;right:0}.input-clear-icon.sc-ion-input-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;visibility:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}.input-clear-icon.sc-ion-input-ios:focus{opacity:0.5}.has-value.sc-ion-input-ios-h .input-clear-icon.sc-ion-input-ios{visibility:visible}.has-focus.sc-ion-input-ios-h{pointer-events:none}.has-focus.sc-ion-input-ios-h input.sc-ion-input-ios,.has-focus.sc-ion-input-ios-h a.sc-ion-input-ios,.has-focus.sc-ion-input-ios-h button.sc-ion-input-ios{pointer-events:auto}.sc-ion-input-ios-h{--padding-top:10px;--padding-end:10px;--padding-bottom:10px;--padding-start:0;font-size:inherit}.item-label-stacked.sc-ion-input-ios-h,.item-label-stacked .sc-ion-input-ios-h,.item-label-floating.sc-ion-input-ios-h,.item-label-floating .sc-ion-input-ios-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0px}.input-clear-icon.sc-ion-input-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-step-600,%20%23666666)'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");width:30px;height:30px;background-size:18px}";
      var inputMdCss = ".sc-ion-input-md-h{--placeholder-color:initial;--placeholder-font-style:initial;--placeholder-font-weight:initial;--placeholder-opacity:.5;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--background:transparent;--color:initial;display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;width:100%;padding:0 !important;background:var(--background);color:var(--color);font-family:var(--ion-font-family, inherit);z-index:2}ion-item.sc-ion-input-md-h:not(.item-label),ion-item:not(.item-label) .sc-ion-input-md-h{--padding-start:0}.ion-color.sc-ion-input-md-h{color:var(--ion-color-base)}.native-input.sc-ion-input-md{border-radius:var(--border-radius);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:inline-block;-ms-flex:1;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:none;background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.native-input.sc-ion-input-md{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.native-input.sc-ion-input-md::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::-moz-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.native-input.sc-ion-input-md:-webkit-autofill{background-color:transparent}.native-input.sc-ion-input-md:invalid{-webkit-box-shadow:none;box-shadow:none}.native-input.sc-ion-input-md::-ms-clear{display:none}.native-input[disabled].sc-ion-input-md{opacity:0.4}.cloned-input.sc-ion-input-md{left:0;top:0;position:absolute;pointer-events:none}[dir=rtl].sc-ion-input-md .cloned-input.sc-ion-input-md,[dir=rtl].sc-ion-input-md-h .cloned-input.sc-ion-input-md,[dir=rtl] .sc-ion-input-md-h .cloned-input.sc-ion-input-md{left:unset;right:unset;right:0}.input-clear-icon.sc-ion-input-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;background-position:center;border:0;outline:none;background-color:transparent;background-repeat:no-repeat;visibility:hidden;-webkit-appearance:none;-moz-appearance:none;appearance:none}.input-clear-icon.sc-ion-input-md:focus{opacity:0.5}.has-value.sc-ion-input-md-h .input-clear-icon.sc-ion-input-md{visibility:visible}.has-focus.sc-ion-input-md-h{pointer-events:none}.has-focus.sc-ion-input-md-h input.sc-ion-input-md,.has-focus.sc-ion-input-md-h a.sc-ion-input-md,.has-focus.sc-ion-input-md-h button.sc-ion-input-md{pointer-events:auto}.sc-ion-input-md-h{--padding-top:10px;--padding-end:0;--padding-bottom:10px;--padding-start:8px;font-size:inherit}.item-label-stacked.sc-ion-input-md-h,.item-label-stacked .sc-ion-input-md-h,.item-label-floating.sc-ion-input-md-h,.item-label-floating .sc-ion-input-md-h{--padding-top:8px;--padding-bottom:8px;--padding-start:0}.input-clear-icon.sc-ion-input-md{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><polygon%20fill='var(--ion-color-step-600,%20%23666666)'%20points='405,136.798%20375.202,107%20256,226.202%20136.798,107%20107,136.798%20226.202,256%20107,375.202%20136.798,405%20256,285.798%20375.202,405%20405,375.202%20285.798,256'/></svg>\");width:30px;height:30px;background-size:22px}";

      var Input = /*#__PURE__*/function () {
        function Input(hostRef) {
          var _this = this;

          _classCallCheck(this, Input);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionInput = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionInput", 7);
          this.ionChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionChange", 7);
          this.ionBlur = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionBlur", 7);
          this.ionFocus = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionFocus", 7);
          this.ionStyle = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionStyle", 7);
          this.inputId = "ion-input-".concat(inputIds++);
          this.didBlurAfterEdit = false;
          this.inheritedAttributes = {};
          /**
           * This is required for a WebKit bug which requires us to
           * blur and focus an input to properly focus the input in
           * an item with delegatesFocus. It will no longer be needed
           * with iOS 14.
           *
           * @internal
           */

          this.fireFocusEvents = true;
          this.hasFocus = false;
          /**
           * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
           */

          this.autocapitalize = 'off';
          /**
           * Indicates whether the value of the control can be automatically completed by the browser.
           */

          this.autocomplete = 'off';
          /**
           * Whether auto correction should be enabled when the user is entering/editing the text value.
           */

          this.autocorrect = 'off';
          /**
           * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
           */

          this.autofocus = false;
          /**
           * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
           */

          this.clearInput = false;
          /**
           * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
           */

          this.debounce = 0;
          /**
           * If `true`, the user cannot interact with the input.
           */

          this.disabled = false;
          /**
           * The name of the control, which is submitted with the form data.
           */

          this.name = this.inputId;
          /**
           * If `true`, the user cannot modify the value.
           */

          this.readonly = false;
          /**
           * If `true`, the user must fill in a value before submitting a form.
           */

          this.required = false;
          /**
           * If `true`, the element will have its spelling and grammar checked.
           */

          this.spellcheck = false;
          /**
           * The type of control to display. The default type is text.
           */

          this.type = 'text';
          /**
           * The value of the input.
           */

          this.value = '';

          this.onInput = function (ev) {
            var input = ev.target;

            if (input) {
              _this.value = input.value || '';
            }

            _this.ionInput.emit(ev);
          };

          this.onBlur = function (ev) {
            _this.hasFocus = false;

            _this.focusChanged();

            _this.emitStyle();

            if (_this.fireFocusEvents) {
              _this.ionBlur.emit(ev);
            }
          };

          this.onFocus = function (ev) {
            _this.hasFocus = true;

            _this.focusChanged();

            _this.emitStyle();

            if (_this.fireFocusEvents) {
              _this.ionFocus.emit(ev);
            }
          };

          this.onKeydown = function (ev) {
            if (_this.shouldClearOnEdit()) {
              // Did the input value change after it was blurred and edited?
              // Do not clear if user is hitting Enter to submit form
              if (_this.didBlurAfterEdit && _this.hasValue() && ev.key !== 'Enter') {
                // Clear the input
                _this.clearTextInput();
              } // Reset the flag


              _this.didBlurAfterEdit = false;
            }
          };

          this.clearTextOnEnter = function (ev) {
            if (ev.key === 'Enter') {
              _this.clearTextInput(ev);
            }
          };

          this.clearTextInput = function (ev) {
            if (_this.clearInput && !_this.readonly && !_this.disabled && ev) {
              ev.preventDefault();
              ev.stopPropagation(); // Attempt to focus input again after pressing clear button

              _this.setFocus();
            }

            _this.value = '';
            /**
             * This is needed for clearOnEdit
             * Otherwise the value will not be cleared
             * if user is inside the input
             */

            if (_this.nativeInput) {
              _this.nativeInput.value = '';
            }
          };
        }

        _createClass(Input, [{
          key: "debounceChanged",
          value: function debounceChanged() {
            this.ionChange = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.ionChange, this.debounce);
          }
        }, {
          key: "disabledChanged",
          value: function disabledChanged() {
            this.emitStyle();
          }
          /**
           * Update the native input element when the value changes
           */

        }, {
          key: "valueChanged",
          value: function valueChanged() {
            this.emitStyle();
            this.ionChange.emit({
              value: this.value == null ? this.value : this.value.toString()
            });
          }
        }, {
          key: "componentWillLoad",
          value: function componentWillLoad() {
            this.inheritedAttributes = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["i"])(this.el, ['tabindex', 'title']);
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            this.emitStyle();
            this.debounceChanged();
            {
              document.dispatchEvent(new CustomEvent('ionInputDidLoad', {
                detail: this.el
              }));
            }
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            {
              document.dispatchEvent(new CustomEvent('ionInputDidUnload', {
                detail: this.el
              }));
            }
          }
          /**
           * Sets focus on the native `input` in `ion-input`. Use this method instead of the global
           * `input.focus()`.
           */

        }, {
          key: "setFocus",
          value: function () {
            var _setFocus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (this.nativeInput) {
                        this.nativeInput.focus();
                      }

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function setFocus() {
              return _setFocus.apply(this, arguments);
            }

            return setFocus;
          }()
          /**
           * Sets blur on the native `input` in `ion-input`. Use this method instead of the global
           * `input.blur()`.
           * @internal
           */

        }, {
          key: "setBlur",
          value: function () {
            var _setBlur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (this.nativeInput) {
                        this.nativeInput.blur();
                      }

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function setBlur() {
              return _setBlur.apply(this, arguments);
            }

            return setBlur;
          }()
          /**
           * Returns the native `<input>` element used under the hood.
           */

        }, {
          key: "getInputElement",
          value: function getInputElement() {
            return Promise.resolve(this.nativeInput);
          }
        }, {
          key: "shouldClearOnEdit",
          value: function shouldClearOnEdit() {
            var type = this.type,
                clearOnEdit = this.clearOnEdit;
            return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
          }
        }, {
          key: "getValue",
          value: function getValue() {
            return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
          }
        }, {
          key: "emitStyle",
          value: function emitStyle() {
            this.ionStyle.emit({
              'interactive': true,
              'input': true,
              'has-placeholder': this.placeholder != null,
              'has-value': this.hasValue(),
              'has-focus': this.hasFocus,
              'interactive-disabled': this.disabled
            });
          }
        }, {
          key: "focusChanged",
          value: function focusChanged() {
            // If clearOnEdit is enabled and the input blurred but has a value, set a flag
            if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
              this.didBlurAfterEdit = true;
            }
          }
        }, {
          key: "hasValue",
          value: function hasValue() {
            return this.getValue().length > 0;
          }
        }, {
          key: "render",
          value: function render() {
            var _Object,
                _this2 = this;

            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var value = this.getValue();
            var labelId = this.inputId + '-lbl';
            var label = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["f"])(this.el);

            if (label) {
              label.id = labelId;
            }

            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "aria-disabled": this.disabled ? 'true' : null,
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color, (_Object = {}, _defineProperty(_Object, mode, true), _defineProperty(_Object, 'has-value', this.hasValue()), _defineProperty(_Object, 'has-focus', this.hasFocus), _Object))
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("input", Object.assign({
              "class": "native-input",
              ref: function ref(input) {
                return _this2.nativeInput = input;
              },
              "aria-labelledby": labelId,
              disabled: this.disabled,
              accept: this.accept,
              autoCapitalize: this.autocapitalize,
              autoComplete: this.autocomplete,
              autoCorrect: this.autocorrect,
              autoFocus: this.autofocus,
              enterKeyHint: this.enterkeyhint,
              inputMode: this.inputmode,
              min: this.min,
              max: this.max,
              minLength: this.minlength,
              maxLength: this.maxlength,
              multiple: this.multiple,
              name: this.name,
              pattern: this.pattern,
              placeholder: this.placeholder || '',
              readOnly: this.readonly,
              required: this.required,
              spellcheck: this.spellcheck,
              step: this.step,
              size: this.size,
              type: this.type,
              value: value,
              onInput: this.onInput,
              onBlur: this.onBlur,
              onFocus: this.onFocus,
              onKeyDown: this.onKeydown
            }, this.inheritedAttributes)), this.clearInput && !this.readonly && !this.disabled && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
              "aria-label": "reset",
              type: "button",
              "class": "input-clear-icon",
              onTouchStart: this.clearTextInput,
              onMouseDown: this.clearTextInput,
              onKeyDown: this.clearTextOnEnter
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
              "debounce": ["debounceChanged"],
              "disabled": ["disabledChanged"],
              "value": ["valueChanged"]
            };
          }
        }]);

        return Input;
      }();

      var inputIds = 0;
      Input.style = {
        ios: inputIosCss,
        md: inputMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=15-es5.js.map