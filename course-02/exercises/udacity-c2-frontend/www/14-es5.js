(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14], {
    /***/
    "2lz6":
    /*!**************************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2.entry.js ***!
      \**************************************************************************/

    /*! exports provided: ion_infinite_scroll, ion_infinite_scroll_content */

    /***/
    function lz6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_infinite_scroll", function () {
        return InfiniteScroll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_infinite_scroll_content", function () {
        return InfiniteScrollContent;
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


      var _index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./index-9e3fe806.js */
      "39oe");

      var infiniteScrollCss = "ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}";

      var InfiniteScroll = /*#__PURE__*/function () {
        function InfiniteScroll(hostRef) {
          var _this = this;

          _classCallCheck(this, InfiniteScroll);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionInfinite = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionInfinite", 7);
          this.thrPx = 0;
          this.thrPc = 0;
          this.didFire = false;
          this.isBusy = false;
          this.isLoading = false;
          /**
           * The threshold distance from the bottom
           * of the content to call the `infinite` output event when scrolled.
           * The threshold value can be either a percent, or
           * in pixels. For example, use the value of `10%` for the `infinite`
           * output event to get called when the user has scrolled 10%
           * from the bottom of the page. Use the value `100px` when the
           * scroll is within 100 pixels from the bottom of the page.
           */

          this.threshold = '15%';
          /**
           * If `true`, the infinite scroll will be hidden and scroll event listeners
           * will be removed.
           *
           * Set this to true to disable the infinite scroll from actively
           * trying to receive new data while scrolling. This is useful
           * when it is known that there is no more data that can be added, and
           * the infinite scroll is no longer needed.
           */

          this.disabled = false;
          /**
           * The position of the infinite scroll element.
           * The value can be either `top` or `bottom`.
           */

          this.position = 'bottom';

          this.onScroll = function () {
            var scrollEl = _this.scrollEl;

            if (!scrollEl || !_this.canStart()) {
              return 1;
            }

            var infiniteHeight = _this.el.offsetHeight;

            if (infiniteHeight === 0) {
              // if there is no height of this element then do nothing
              return 2;
            }

            var scrollTop = scrollEl.scrollTop;
            var scrollHeight = scrollEl.scrollHeight;
            var height = scrollEl.offsetHeight;
            var threshold = _this.thrPc !== 0 ? height * _this.thrPc : _this.thrPx;
            var distanceFromInfinite = _this.position === 'bottom' ? scrollHeight - infiniteHeight - scrollTop - threshold - height : scrollTop - infiniteHeight - threshold;

            if (distanceFromInfinite < 0) {
              if (!_this.didFire) {
                _this.isLoading = true;
                _this.didFire = true;

                _this.ionInfinite.emit();

                return 3;
              }
            } else {
              _this.didFire = false;
            }

            return 4;
          };
        }

        _createClass(InfiniteScroll, [{
          key: "thresholdChanged",
          value: function thresholdChanged() {
            var val = this.threshold;

            if (val.lastIndexOf('%') > -1) {
              this.thrPx = 0;
              this.thrPc = parseFloat(val) / 100;
            } else {
              this.thrPx = parseFloat(val);
              this.thrPc = 0;
            }
          }
        }, {
          key: "disabledChanged",
          value: function disabledChanged() {
            var disabled = this.disabled;

            if (disabled) {
              this.isLoading = false;
              this.isBusy = false;
            }

            this.enableScrollEvents(!disabled);
          }
        }, {
          key: "connectedCallback",
          value: function () {
            var _connectedCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              var contentEl;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      contentEl = this.el.closest('ion-content');

                      if (contentEl) {
                        _context.next = 4;
                        break;
                      }

                      console.error('<ion-infinite-scroll> must be used inside an <ion-content>');
                      return _context.abrupt("return");

                    case 4:
                      _context.next = 6;
                      return contentEl.getScrollElement();

                    case 6:
                      this.scrollEl = _context.sent;
                      this.thresholdChanged();
                      this.disabledChanged();

                      if (this.position === 'top') {
                        Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
                          if (_this2.scrollEl) {
                            _this2.scrollEl.scrollTop = _this2.scrollEl.scrollHeight - _this2.scrollEl.clientHeight;
                          }
                        });
                      }

                    case 10:
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
            this.enableScrollEvents(false);
            this.scrollEl = undefined;
          }
          /**
           * Call `complete()` within the `ionInfinite` output event handler when
           * your async operation has completed. For example, the `loading`
           * state is while the app is performing an asynchronous operation,
           * such as receiving more data from an AJAX request to add more items
           * to a data list. Once the data has been received and UI updated, you
           * then call this method to signify that the loading has completed.
           * This method will change the infinite scroll's state from `loading`
           * to `enabled`.
           */

        }, {
          key: "complete",
          value: function () {
            var _complete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this3 = this;

              var scrollEl, prev;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      scrollEl = this.scrollEl;

                      if (!(!this.isLoading || !scrollEl)) {
                        _context2.next = 3;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 3:
                      this.isLoading = false;

                      if (this.position === 'top') {
                        /**
                         * New content is being added at the top, but the scrollTop position stays the same,
                         * which causes a scroll jump visually. This algorithm makes sure to prevent this.
                         * (Frame 1)
                         *    - complete() is called, but the UI hasn't had time to update yet.
                         *    - Save the current content dimensions.
                         *    - Wait for the next frame using _dom.read, so the UI will be updated.
                         * (Frame 2)
                         *    - Read the new content dimensions.
                         *    - Calculate the height difference and the new scroll position.
                         *    - Delay the scroll position change until other possible dom reads are done using _dom.write to be performant.
                         * (Still frame 2, if I'm correct)
                         *    - Change the scroll position (= visually maintain the scroll position).
                         *    - Change the state to re-enable the InfiniteScroll.
                         *    - This should be after changing the scroll position, or it could
                         *    cause the InfiniteScroll to be triggered again immediately.
                         * (Frame 3)
                         *    Done.
                         */
                        this.isBusy = true; // ******** DOM READ ****************
                        // Save the current content dimensions before the UI updates

                        prev = scrollEl.scrollHeight - scrollEl.scrollTop; // ******** DOM READ ****************

                        requestAnimationFrame(function () {
                          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function () {
                            // UI has updated, save the new content dimensions
                            var scrollHeight = scrollEl.scrollHeight; // New content was added on top, so the scroll position should be changed immediately to prevent it from jumping around

                            var newScrollTop = scrollHeight - prev; // ******** DOM WRITE ****************

                            requestAnimationFrame(function () {
                              Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
                                scrollEl.scrollTop = newScrollTop;
                                _this3.isBusy = false;
                              });
                            });
                          });
                        });
                      }

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function complete() {
              return _complete.apply(this, arguments);
            }

            return complete;
          }()
        }, {
          key: "canStart",
          value: function canStart() {
            return !this.disabled && !this.isBusy && !!this.scrollEl && !this.isLoading;
          }
        }, {
          key: "enableScrollEvents",
          value: function enableScrollEvents(shouldListen) {
            if (this.scrollEl) {
              if (shouldListen) {
                this.scrollEl.addEventListener('scroll', this.onScroll);
              } else {
                this.scrollEl.removeEventListener('scroll', this.onScroll);
              }
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _class;

            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var disabled = this.disabled;
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": (_class = {}, _defineProperty(_class, mode, true), _defineProperty(_class, 'infinite-scroll-loading', this.isLoading), _defineProperty(_class, 'infinite-scroll-enabled', !disabled), _class)
            });
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
              "threshold": ["thresholdChanged"],
              "disabled": ["disabledChanged"]
            };
          }
        }]);

        return InfiniteScroll;
      }();

      InfiniteScroll.style = infiniteScrollCss;
      var infiniteScrollContentIosCss = "ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}";
      var infiniteScrollContentMdCss = "ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}";

      var InfiniteScrollContent = /*#__PURE__*/function () {
        function InfiniteScrollContent(hostRef) {
          _classCallCheck(this, InfiniteScrollContent);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        }

        _createClass(InfiniteScrollContent, [{
          key: "componentDidLoad",
          value: function componentDidLoad() {
            if (this.loadingSpinner === undefined) {
              var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
              this.loadingSpinner = _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["c"].get('infiniteLoadingSpinner', _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["c"].get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _class2;

            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": (_class2 = {}, _defineProperty(_class2, mode, true), _defineProperty(_class2, "infinite-scroll-content-".concat(mode), true), _class2)
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "infinite-loading"
            }, this.loadingSpinner && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "infinite-loading-spinner"
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-spinner", {
              name: this.loadingSpinner
            })), this.loadingText && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "infinite-loading-text",
              innerHTML: Object(_index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_2__["s"])(this.loadingText)
            })));
          }
        }]);

        return InfiniteScrollContent;
      }();

      InfiniteScrollContent.style = {
        ios: infiniteScrollContentIosCss,
        md: infiniteScrollContentMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=14-es5.js.map