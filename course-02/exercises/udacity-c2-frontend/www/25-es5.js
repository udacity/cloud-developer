(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25], {
    /***/
    "XGij":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-range.entry.js ***!
      \**************************************************************/

    /*! exports provided: ion_range */

    /***/
    function XGij(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_range", function () {
        return Range;
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

      var rangeIosCss = ":host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{left:0;top:calc((var(--height) - var(--knob-handle-size)) / 2);margin-left:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset;right:unset;right:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.range-knob-handle{margin-left:unset;-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2)}}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar{border-radius:var(--bar-border-radius);left:0;top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}[dir=rtl] .range-bar,:host-context([dir=rtl]) .range-bar{left:unset;right:unset;right:0}[dir=rtl] .range-bar,:host-context([dir=rtl]) .range-bar{left:unset}.range-knob{border-radius:var(--knob-border-radius);left:calc(50% - var(--knob-size) / 2);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset;right:unset;right:calc(50% - var(--knob-size) / 2)}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}:host{--knob-border-radius:50%;--knob-background:#ffffff;--knob-box-shadow:0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.13), 0 0 0 1px rgba(0, 0, 0, 0.02);--knob-size:28px;--bar-height:2px;--bar-background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.1);--bar-background-active:var(--ion-color-primary, #3880ff);--bar-border-radius:0;--height:42px;padding-left:16px;padding-right:16px;padding-top:8px;padding-bottom:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-tick-active{background:var(--ion-color-base)}::slotted([slot=start]){margin-left:0;margin-right:16px;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}}::slotted([slot=end]){margin-left:16px;margin-right:0;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}}:host(.range-has-pin){padding-top:20px}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-tick{margin-left:-1px;border-radius:0;position:absolute;top:18px;width:2px;height:8px;background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.1);pointer-events:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.range-tick{margin-left:unset;-webkit-margin-start:-1px;margin-inline-start:-1px}}.range-tick-active{background:var(--bar-background-active)}.range-pin{-webkit-transform:translate3d(0,  28px,  0) scale(0.01);transform:translate3d(0,  28px,  0) scale(0.01);padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;display:inline-block;position:relative;top:-20px;min-width:28px;-webkit-transition:-webkit-transform 120ms ease;transition:-webkit-transform 120ms ease;transition:transform 120ms ease;transition:transform 120ms ease, -webkit-transform 120ms ease;background:transparent;color:var(--ion-text-color, #000);font-size:12px;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.range-pin{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}.range-knob-pressed .range-pin{-webkit-transform:translate3d(0,  0,  0) scale(1);transform:translate3d(0,  0,  0) scale(1)}:host(.range-disabled){opacity:0.5}";
      var rangeMdCss = ":host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family, inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{left:0;top:calc((var(--height) - var(--knob-handle-size)) / 2);margin-left:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset;right:unset;right:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.range-knob-handle{margin-left:unset;-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2)}}[dir=rtl] .range-knob-handle,:host-context([dir=rtl]) .range-knob-handle{left:unset}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar{border-radius:var(--bar-border-radius);left:0;top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}[dir=rtl] .range-bar,:host-context([dir=rtl]) .range-bar{left:unset;right:unset;right:0}[dir=rtl] .range-bar,:host-context([dir=rtl]) .range-bar{left:unset}.range-knob{border-radius:var(--knob-border-radius);left:calc(50% - var(--knob-size) / 2);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset;right:unset;right:calc(50% - var(--knob-size) / 2)}[dir=rtl] .range-knob,:host-context([dir=rtl]) .range-knob{left:unset}:host(.range-pressed) .range-bar-active{will-change:left, right}:host(.in-item){width:100%}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}:host{--knob-border-radius:50%;--knob-background:var(--bar-background-active);--knob-box-shadow:none;--knob-size:18px;--bar-height:2px;--bar-background:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.26);--bar-background-active:var(--ion-color-primary, #3880ff);--bar-border-radius:0;--height:42px;--pin-background:var(--ion-color-primary, #3880ff);--pin-color:var(--ion-color-primary-contrast, #fff);padding-left:14px;padding-right:14px;padding-top:8px;padding-bottom:8px;font-size:12px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-end:14px;padding-inline-end:14px}}:host(.ion-color) .range-bar{background:rgba(var(--ion-color-base-rgb), 0.26)}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-knob,:host(.ion-color) .range-pin,:host(.ion-color) .range-pin::before,:host(.ion-color) .range-tick{background:var(--ion-color-base);color:var(--ion-color-contrast)}::slotted([slot=start]){margin-left:0;margin-right:14px;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:14px;margin-inline-end:14px}}::slotted([slot=end]){margin-left:14px;margin-right:0;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:0;margin-inline-end:0}}:host(.range-has-pin){padding-top:28px}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-knob{-webkit-transform:scale(0.67);transform:scale(0.67);-webkit-transition-duration:120ms;transition-duration:120ms;-webkit-transition-property:background-color, border, -webkit-transform;transition-property:background-color, border, -webkit-transform;transition-property:transform, background-color, border;transition-property:transform, background-color, border, -webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;z-index:2}.range-tick{position:absolute;top:calc((var(--height) - var(--bar-height)) / 2);width:var(--bar-height);height:var(--bar-height);background:var(--bar-background-active);z-index:1;pointer-events:none}.range-tick-active{background:transparent}.range-pin{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;border-radius:50%;-webkit-transform:translate3d(0,  0,  0) scale(0.01);transform:translate3d(0,  0,  0) scale(0.01);display:inline-block;position:relative;min-width:28px;height:28px;-webkit-transition:background 120ms ease, -webkit-transform 120ms ease;transition:background 120ms ease, -webkit-transform 120ms ease;transition:transform 120ms ease, background 120ms ease;transition:transform 120ms ease, background 120ms ease, -webkit-transform 120ms ease;background:var(--pin-background);color:var(--pin-color);text-align:center}.range-pin::before{left:50%;top:3px;margin-left:-13px;border-radius:50% 50% 50% 0;position:absolute;width:26px;height:26px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:background 120ms ease;transition:background 120ms ease;background:var(--pin-background);content:\"\";z-index:-1}[dir=rtl] .range-pin::before,:host-context([dir=rtl]) .range-pin::before{left:unset;right:unset;right:50%}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.range-pin::before{margin-left:unset;-webkit-margin-start:-13px;margin-inline-start:-13px}}[dir=rtl] .range-pin::before,:host-context([dir=rtl]) .range-pin::before{left:unset}.range-knob-pressed .range-pin{-webkit-transform:translate3d(0,  -24px,  0) scale(1);transform:translate3d(0,  -24px,  0) scale(1)}:host(:not(.range-has-pin)) .range-knob-pressed .range-knob{-webkit-transform:scale(1);transform:scale(1)}:host(.range-disabled) .range-bar-active,:host(.range-disabled) .range-bar,:host(.range-disabled) .range-tick{background-color:var(--ion-color-step-250, #bfbfbf)}:host(.range-disabled) .range-knob{-webkit-transform:scale(0.55);transform:scale(0.55);outline:5px solid #fff;background-color:var(--ion-color-step-250, #bfbfbf)}";

      var Range = /*#__PURE__*/function () {
        function Range(hostRef) {
          var _this = this;

          _classCallCheck(this, Range);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionChange", 7);
          this.ionStyle = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionStyle", 7);
          this.ionFocus = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionFocus", 7);
          this.ionBlur = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionBlur", 7);
          this.didLoad = false;
          this.noUpdate = false;
          this.hasFocus = false;
          this.ratioA = 0;
          this.ratioB = 0;
          /**
           * How long, in milliseconds, to wait to trigger the
           * `ionChange` event after each change in the range value.
           * This also impacts form bindings such as `ngModel` or `v-model`.
           */

          this.debounce = 0;
          /**
           * The name of the control, which is submitted with the form data.
           */

          this.name = '';
          /**
           * Show two knobs.
           */

          this.dualKnobs = false;
          /**
           * Minimum integer value of the range.
           */

          this.min = 0;
          /**
           * Maximum integer value of the range.
           */

          this.max = 100;
          /**
           * If `true`, a pin with integer value is shown when the knob
           * is pressed.
           */

          this.pin = false;
          /**
           * If `true`, the knob snaps to tick marks evenly spaced based
           * on the step property value.
           */

          this.snaps = false;
          /**
           * Specifies the value granularity.
           */

          this.step = 1;
          /**
           * If `true`, tick marks are displayed based on the step value.
           * Only applies when `snaps` is `true`.
           */

          this.ticks = true;
          /**
           * If `true`, the user cannot interact with the range.
           */

          this.disabled = false;
          /**
           * the value of the range.
           */

          this.value = 0;

          this.clampBounds = function (value) {
            return Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(_this.min, value, _this.max);
          };

          this.ensureValueInBounds = function (value) {
            if (_this.dualKnobs) {
              return {
                lower: _this.clampBounds(value.lower),
                upper: _this.clampBounds(value.upper)
              };
            } else {
              return _this.clampBounds(value);
            }
          };

          this.setupGesture = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var rangeSlider;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    rangeSlider = _this.rangeSlider;

                    if (!rangeSlider) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 4;
                    return Promise.resolve().then(__webpack_require__.bind(null,
                    /*! ./index-f49d994d.js */
                    "iWo5"));

                  case 4:
                    _this.gesture = _context.sent.createGesture({
                      el: rangeSlider,
                      gestureName: 'range',
                      gesturePriority: 100,
                      threshold: 0,
                      onStart: function onStart(ev) {
                        return _this.onStart(ev);
                      },
                      onMove: function onMove(ev) {
                        return _this.onMove(ev);
                      },
                      onEnd: function onEnd(ev) {
                        return _this.onEnd(ev);
                      }
                    });

                    _this.gesture.enable(!_this.disabled);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          this.handleKeyboard = function (knob, isIncrease) {
            var step = _this.step;
            step = step > 0 ? step : 1;
            step = step / (_this.max - _this.min);

            if (!isIncrease) {
              step *= -1;
            }

            if (knob === 'A') {
              _this.ratioA = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(0, _this.ratioA + step, 1);
            } else {
              _this.ratioB = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(0, _this.ratioB + step, 1);
            }

            _this.updateValue();
          };

          this.onBlur = function () {
            if (_this.hasFocus) {
              _this.hasFocus = false;

              _this.ionBlur.emit();

              _this.emitStyle();
            }
          };

          this.onFocus = function () {
            if (!_this.hasFocus) {
              _this.hasFocus = true;

              _this.ionFocus.emit();

              _this.emitStyle();
            }
          };
        }

        _createClass(Range, [{
          key: "debounceChanged",
          value: function debounceChanged() {
            this.ionChange = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.ionChange, this.debounce);
          }
        }, {
          key: "minChanged",
          value: function minChanged() {
            if (!this.noUpdate) {
              this.updateRatio();
            }
          }
        }, {
          key: "maxChanged",
          value: function maxChanged() {
            if (!this.noUpdate) {
              this.updateRatio();
            }
          }
        }, {
          key: "disabledChanged",
          value: function disabledChanged() {
            if (this.gesture) {
              this.gesture.enable(!this.disabled);
            }

            this.emitStyle();
          }
        }, {
          key: "valueChanged",
          value: function valueChanged(value) {
            if (!this.noUpdate) {
              this.updateRatio();
            }

            value = this.ensureValueInBounds(value);
            this.ionChange.emit({
              value: value
            });
          }
        }, {
          key: "componentDidLoad",
          value: function componentDidLoad() {
            this.setupGesture();
            this.didLoad = true;
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            this.updateRatio();
            this.debounceChanged();
            this.disabledChanged();
            /**
             * If we have not yet rendered
             * ion-range, then rangeSlider is not defined.
             * But if we are moving ion-range via appendChild,
             * then rangeSlider will be defined.
             */

            if (this.didLoad) {
              this.setupGesture();
            }
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            if (this.gesture) {
              this.gesture.destroy();
              this.gesture = undefined;
            }
          }
        }, {
          key: "getValue",
          value: function getValue() {
            var value = this.value || 0;

            if (this.dualKnobs) {
              if (typeof value === 'object') {
                return value;
              }

              return {
                lower: 0,
                upper: value
              };
            } else {
              if (typeof value === 'object') {
                return value.upper;
              }

              return value;
            }
          }
        }, {
          key: "emitStyle",
          value: function emitStyle() {
            this.ionStyle.emit({
              'interactive': true,
              'interactive-disabled': this.disabled
            });
          }
        }, {
          key: "onStart",
          value: function onStart(detail) {
            var rect = this.rect = this.rangeSlider.getBoundingClientRect();
            var currentX = detail.currentX; // figure out which knob they started closer to

            var ratio = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(0, (currentX - rect.left) / rect.width, 1);

            if (document.dir === 'rtl') {
              ratio = 1 - ratio;
            }

            this.pressedKnob = !this.dualKnobs || Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio) ? 'A' : 'B';
            this.setFocus(this.pressedKnob); // update the active knob's position

            this.update(currentX);
          }
        }, {
          key: "onMove",
          value: function onMove(detail) {
            this.update(detail.currentX);
          }
        }, {
          key: "onEnd",
          value: function onEnd(detail) {
            this.update(detail.currentX);
            this.pressedKnob = undefined;
          }
        }, {
          key: "update",
          value: function update(currentX) {
            // figure out where the pointer is currently at
            // update the knob being interacted with
            var rect = this.rect;
            var ratio = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(0, (currentX - rect.left) / rect.width, 1);

            if (document.dir === 'rtl') {
              ratio = 1 - ratio;
            }

            if (this.snaps) {
              // snaps the ratio to the current value
              ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
            } // update which knob is pressed


            if (this.pressedKnob === 'A') {
              this.ratioA = ratio;
            } else {
              this.ratioB = ratio;
            } // Update input value


            this.updateValue();
          }
        }, {
          key: "updateRatio",
          value: function updateRatio() {
            var value = this.getValue();
            var min = this.min,
                max = this.max;

            if (this.dualKnobs) {
              this.ratioA = valueToRatio(value.lower, min, max);
              this.ratioB = valueToRatio(value.upper, min, max);
            } else {
              this.ratioA = valueToRatio(value, min, max);
            }
          }
        }, {
          key: "updateValue",
          value: function updateValue() {
            this.noUpdate = true;
            var valA = this.valA,
                valB = this.valB;
            this.value = !this.dualKnobs ? valA : {
              lower: Math.min(valA, valB),
              upper: Math.max(valA, valB)
            };
            this.noUpdate = false;
          }
        }, {
          key: "setFocus",
          value: function setFocus(knob) {
            if (this.el.shadowRoot) {
              var knobEl = this.el.shadowRoot.querySelector(knob === 'A' ? '.range-knob-a' : '.range-knob-b');

              if (knobEl) {
                knobEl.focus();
              }
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _barStyle,
                _Object,
                _this2 = this;

            var min = this.min,
                max = this.max,
                step = this.step,
                el = this.el,
                handleKeyboard = this.handleKeyboard,
                pressedKnob = this.pressedKnob,
                disabled = this.disabled,
                pin = this.pin,
                ratioLower = this.ratioLower,
                ratioUpper = this.ratioUpper;
            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var barStart = "".concat(ratioLower * 100, "%");
            var barEnd = "".concat(100 - ratioUpper * 100, "%");
            var doc = document;
            var isRTL = doc.dir === 'rtl';
            var start = isRTL ? 'right' : 'left';
            var end = isRTL ? 'left' : 'right';

            var tickStyle = function tickStyle(tick) {
              return _defineProperty({}, start, tick[start]);
            };

            var barStyle = (_barStyle = {}, _defineProperty(_barStyle, start, barStart), _defineProperty(_barStyle, end, barEnd), _barStyle);
            var ticks = [];

            if (this.snaps && this.ticks) {
              for (var value = min; value <= max; value += step) {
                var ratio = valueToRatio(value, min, max);
                var tick = {
                  ratio: ratio,
                  active: ratio >= ratioLower && ratio <= ratioUpper
                };
                tick[start] = "".concat(ratio * 100, "%");
                ticks.push(tick);
              }
            }

            Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["d"])(true, el, this.name, JSON.stringify(this.getValue()), disabled);
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              onFocusin: this.onFocus,
              onFocusout: this.onBlur,
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color, (_Object = {}, _defineProperty(_Object, mode, true), _defineProperty(_Object, 'in-item', Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el)), _defineProperty(_Object, 'range-disabled', disabled), _defineProperty(_Object, 'range-pressed', pressedKnob !== undefined), _defineProperty(_Object, 'range-has-pin', pin), _Object))
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "start"
            }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "range-slider",
              ref: function ref(rangeEl) {
                return _this2.rangeSlider = rangeEl;
              }
            }, ticks.map(function (tick) {
              return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
                style: tickStyle(tick),
                role: "presentation",
                "class": {
                  'range-tick': true,
                  'range-tick-active': tick.active
                },
                part: tick.active ? 'tick-active' : 'tick'
              });
            }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "range-bar",
              role: "presentation",
              part: "bar"
            }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "range-bar range-bar-active",
              role: "presentation",
              style: barStyle,
              part: "bar-active"
            }), renderKnob(isRTL, {
              knob: 'A',
              pressed: pressedKnob === 'A',
              value: this.valA,
              ratio: this.ratioA,
              pin: pin,
              disabled: disabled,
              handleKeyboard: handleKeyboard,
              min: min,
              max: max
            }), this.dualKnobs && renderKnob(isRTL, {
              knob: 'B',
              pressed: pressedKnob === 'B',
              value: this.valB,
              ratio: this.ratioB,
              pin: pin,
              disabled: disabled,
              handleKeyboard: handleKeyboard,
              min: min,
              max: max
            })), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "end"
            }));
          }
        }, {
          key: "valA",
          get: function get() {
            return ratioToValue(this.ratioA, this.min, this.max, this.step);
          }
        }, {
          key: "valB",
          get: function get() {
            return ratioToValue(this.ratioB, this.min, this.max, this.step);
          }
        }, {
          key: "ratioLower",
          get: function get() {
            if (this.dualKnobs) {
              return Math.min(this.ratioA, this.ratioB);
            }

            return 0;
          }
        }, {
          key: "ratioUpper",
          get: function get() {
            if (this.dualKnobs) {
              return Math.max(this.ratioA, this.ratioB);
            }

            return this.ratioA;
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
              "min": ["minChanged"],
              "max": ["maxChanged"],
              "disabled": ["disabledChanged"],
              "value": ["valueChanged"]
            };
          }
        }]);

        return Range;
      }();

      var renderKnob = function renderKnob(isRTL, _ref3) {
        var knob = _ref3.knob,
            value = _ref3.value,
            ratio = _ref3.ratio,
            min = _ref3.min,
            max = _ref3.max,
            disabled = _ref3.disabled,
            pressed = _ref3.pressed,
            pin = _ref3.pin,
            handleKeyboard = _ref3.handleKeyboard;
        var start = isRTL ? 'right' : 'left';

        var knobStyle = function knobStyle() {
          var style = {};
          style[start] = "".concat(ratio * 100, "%");
          return style;
        };

        return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          onKeyDown: function onKeyDown(ev) {
            var key = ev.key;

            if (key === 'ArrowLeft' || key === 'ArrowDown') {
              handleKeyboard(knob, false);
              ev.preventDefault();
              ev.stopPropagation();
            } else if (key === 'ArrowRight' || key === 'ArrowUp') {
              handleKeyboard(knob, true);
              ev.preventDefault();
              ev.stopPropagation();
            }
          },
          "class": {
            'range-knob-handle': true,
            'range-knob-a': knob === 'A',
            'range-knob-b': knob === 'B',
            'range-knob-pressed': pressed,
            'range-knob-min': value === min,
            'range-knob-max': value === max
          },
          style: knobStyle(),
          role: "slider",
          tabindex: disabled ? -1 : 0,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-disabled": disabled ? 'true' : null,
          "aria-valuenow": value
        }, pin && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          "class": "range-pin",
          role: "presentation",
          part: "pin"
        }, Math.round(value)), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          "class": "range-knob",
          role: "presentation",
          part: "knob"
        }));
      };

      var ratioToValue = function ratioToValue(ratio, min, max, step) {
        var value = (max - min) * ratio;

        if (step > 0) {
          value = Math.round(value / step) * step + min;
        }

        return Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(min, value, max);
      };

      var valueToRatio = function valueToRatio(value, min, max) {
        return Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_2__["h"])(0, (value - min) / (max - min), 1);
      };

      Range.style = {
        ios: rangeIosCss,
        md: rangeMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=25-es5.js.map