(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8], {
    /***/
    "4fMi":
    /*!*****************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-checkbox.entry.js ***!
      \*****************************************************************/

    /*! exports provided: ion_checkbox */

    /***/
    function fMi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_checkbox", function () {
        return Checkbox;
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

      var checkboxIosCss = ":host{--background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-color){--background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}label{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;opacity:0}[dir=rtl] label,:host-context([dir=rtl]) label{left:unset;right:unset;right:0}label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.checkbox-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:1px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.23);--background:var(--ion-item-background, var(--ion-background-color, #fff));--size:26px;width:var(--size);height:var(--size)}:host(.checkbox-disabled){opacity:0.3}:host(.in-item){margin-left:0;margin-right:8px;margin-top:10px;margin-bottom:9px;display:block;position:static}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.in-item[slot=start]){margin-left:2px;margin-right:20px;margin-top:8px;margin-bottom:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:20px;margin-inline-end:20px}}";
      var checkboxMdCss = ":host{--background-checked:var(--ion-color-primary, #3880ff);--border-color-checked:var(--ion-color-primary, #3880ff);--checkmark-color:var(--ion-color-primary-contrast, #fff);--checkmark-width:1;--transition:none;display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-color){--background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}label{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;opacity:0}[dir=rtl] label,:host-context([dir=rtl]) label{left:unset;right:unset;right:0}label::-moz-focus-inner{border:0}input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}.checkbox-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:var(--checkmark-width);opacity:0}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:calc(var(--size) * .125);--border-width:2px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.51);--checkmark-width:3;--background:var(--ion-item-background, var(--ion-background-color, #fff));--transition:background 180ms cubic-bezier(0.4, 0, 0.2, 1);--size:18px;width:var(--size);height:var(--size)}.checkbox-icon path{stroke-dasharray:30;stroke-dashoffset:30}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{stroke-dashoffset:0;-webkit-transition:stroke-dashoffset 90ms linear 90ms;transition:stroke-dashoffset 90ms linear 90ms}:host(.checkbox-disabled){opacity:0.3}:host(.in-item){margin-left:0;margin-right:0;margin-top:18px;margin-bottom:18px;display:block;position:static}:host(.in-item[slot=start]){margin-left:4px;margin-right:36px;margin-top:18px;margin-bottom:18px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px}}";

      var Checkbox = /*#__PURE__*/function () {
        function Checkbox(hostRef) {
          var _this = this;

          _classCallCheck(this, Checkbox);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionChange", 7);
          this.ionFocus = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionFocus", 7);
          this.ionBlur = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionBlur", 7);
          this.ionStyle = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionStyle", 7);
          this.inputId = "ion-cb-".concat(checkboxIds++);
          /**
           * The name of the control, which is submitted with the form data.
           */

          this.name = this.inputId;
          /**
           * If `true`, the checkbox is selected.
           */

          this.checked = false;
          /**
           * If `true`, the checkbox will visually appear as indeterminate.
           */

          this.indeterminate = false;
          /**
           * If `true`, the user cannot interact with the checkbox.
           */

          this.disabled = false;
          /**
           * The value of the checkbox does not mean if it's checked or not, use the `checked`
           * property for that.
           *
           * The value of a checkbox is analogous to the value of an `<input type="checkbox">`,
           * it's only used when the checkbox participates in a native `<form>`.
           */

          this.value = 'on';

          this.onClick = function (ev) {
            ev.preventDefault();

            _this.setFocus();

            _this.checked = !_this.checked;
            _this.indeterminate = false;
          };

          this.onFocus = function () {
            _this.ionFocus.emit();
          };

          this.onBlur = function () {
            _this.ionBlur.emit();
          };
        }

        _createClass(Checkbox, [{
          key: "componentWillLoad",
          value: function componentWillLoad() {
            this.emitStyle();
          }
        }, {
          key: "checkedChanged",
          value: function checkedChanged(isChecked) {
            this.ionChange.emit({
              checked: isChecked,
              value: this.value
            });
            this.emitStyle();
          }
        }, {
          key: "disabledChanged",
          value: function disabledChanged() {
            this.emitStyle();
          }
        }, {
          key: "emitStyle",
          value: function emitStyle() {
            this.ionStyle.emit({
              'checkbox-checked': this.checked,
              'interactive-disabled': this.disabled
            });
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
                _this2 = this;

            var color = this.color,
                checked = this.checked,
                disabled = this.disabled,
                el = this.el,
                indeterminate = this.indeterminate,
                inputId = this.inputId,
                name = this.name,
                value = this.value;
            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);

            var _Object = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["c"])(el, inputId),
                label = _Object.label,
                labelId = _Object.labelId,
                labelText = _Object.labelText;

            Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["d"])(true, el, name, checked ? value : '', disabled);
            var path = indeterminate ? Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
              d: "M6 12L18 12",
              part: "mark"
            }) : Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
              d: "M5.9,12.5l3.8,3.8l8.8-8.8",
              part: "mark"
            });

            if (mode === 'md') {
              path = indeterminate ? Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
                d: "M2 12H22",
                part: "mark"
              }) : Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
                d: "M1.73,12.91 8.1,19.28 22.79,4.59",
                part: "mark"
              });
            }

            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              onClick: this.onClick,
              "aria-labelledby": label ? labelId : null,
              "aria-checked": "".concat(checked),
              "aria-hidden": disabled ? 'true' : null,
              role: "checkbox",
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__["c"])(color, (_Object2 = {}, _defineProperty(_Object2, mode, true), _defineProperty(_Object2, 'in-item', Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el)), _defineProperty(_Object2, 'checkbox-checked', checked), _defineProperty(_Object2, 'checkbox-disabled', disabled), _defineProperty(_Object2, 'checkbox-indeterminate', indeterminate), _defineProperty(_Object2, 'interactive', true), _Object2))
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
              "class": "checkbox-icon",
              viewBox: "0 0 24 24",
              part: "container"
            }, path), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("label", {
              htmlFor: inputId
            }, labelText), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("input", {
              type: "checkbox",
              "aria-checked": "".concat(checked),
              disabled: disabled,
              id: inputId,
              onFocus: function onFocus() {
                return _this2.onFocus();
              },
              onBlur: function onBlur() {
                return _this2.onBlur();
              },
              ref: function ref(focusEl) {
                return _this2.focusEl = focusEl;
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

        return Checkbox;
      }();

      var checkboxIds = 0;
      Checkbox.style = {
        ios: checkboxIosCss,
        md: checkboxMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=8-es5.js.map