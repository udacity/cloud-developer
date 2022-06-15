(function () {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["input-shims-bc550f99-js"], {
    /***/
    "Snz7":
    /*!*******************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/input-shims-bc550f99.js ***!
      \*******************************************************************/

    /*! exports provided: startInputShims */

    /***/
    function Snz7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "startInputShims", function () {
        return startInputShims;
      });
      /* harmony import */


      var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./helpers-90f46169.js */
      "QPqR");

      var cloneMap = new WeakMap();

      var relocateInput = function relocateInput(componentEl, inputEl, shouldRelocate) {
        var inputRelativeY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        if (cloneMap.has(componentEl) === shouldRelocate) {
          return;
        }

        if (shouldRelocate) {
          addClone(componentEl, inputEl, inputRelativeY);
        } else {
          removeClone(componentEl, inputEl);
        }
      };

      var isFocused = function isFocused(input) {
        return input === input.getRootNode().activeElement;
      };

      var addClone = function addClone(componentEl, inputEl, inputRelativeY) {
        // this allows for the actual input to receive the focus from
        // the user's touch event, but before it receives focus, it
        // moves the actual input to a location that will not screw
        // up the app's layout, and does not allow the native browser
        // to attempt to scroll the input into place (messing up headers/footers)
        // the cloned input fills the area of where native input should be
        // while the native input fakes out the browser by relocating itself
        // before it receives the actual focus event
        // We hide the focused input (with the visible caret) invisible by making it scale(0),
        var parentEl = inputEl.parentNode; // DOM WRITES

        var clonedEl = inputEl.cloneNode(false);
        clonedEl.classList.add('cloned-input');
        clonedEl.tabIndex = -1;
        parentEl.appendChild(clonedEl);
        cloneMap.set(componentEl, clonedEl);
        var doc = componentEl.ownerDocument;
        var tx = doc.dir === 'rtl' ? 9999 : -9999;
        componentEl.style.pointerEvents = 'none';
        inputEl.style.transform = "translate3d(".concat(tx, "px,").concat(inputRelativeY, "px,0) scale(0)");
      };

      var removeClone = function removeClone(componentEl, inputEl) {
        var clone = cloneMap.get(componentEl);

        if (clone) {
          cloneMap["delete"](componentEl);
          clone.remove();
        }

        componentEl.style.pointerEvents = '';
        inputEl.style.transform = '';
      };

      var enableHideCaretOnScroll = function enableHideCaretOnScroll(componentEl, inputEl, scrollEl) {
        if (!scrollEl || !inputEl) {
          return function () {
            return;
          };
        }

        var scrollHideCaret = function scrollHideCaret(shouldHideCaret) {
          if (isFocused(inputEl)) {
            relocateInput(componentEl, inputEl, shouldHideCaret);
          }
        };

        var onBlur = function onBlur() {
          return relocateInput(componentEl, inputEl, false);
        };

        var hideCaret = function hideCaret() {
          return scrollHideCaret(true);
        };

        var showCaret = function showCaret() {
          return scrollHideCaret(false);
        };

        Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["a"])(scrollEl, 'ionScrollStart', hideCaret);
        Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["a"])(scrollEl, 'ionScrollEnd', showCaret);
        inputEl.addEventListener('blur', onBlur);
        return function () {
          Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["b"])(scrollEl, 'ionScrollStart', hideCaret);
          Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["b"])(scrollEl, 'ionScrollEnd', showCaret);
          inputEl.addEventListener('ionBlur', onBlur);
        };
      };

      var SKIP_SELECTOR = 'input, textarea, [no-blur]';

      var enableInputBlurring = function enableInputBlurring() {
        var focused = true;
        var didScroll = false;
        var doc = document;

        var onScroll = function onScroll() {
          didScroll = true;
        };

        var onFocusin = function onFocusin() {
          focused = true;
        };

        var onTouchend = function onTouchend(ev) {
          // if app did scroll return early
          if (didScroll) {
            didScroll = false;
            return;
          }

          var active = doc.activeElement;

          if (!active) {
            return;
          } // only blur if the active element is a text-input or a textarea


          if (active.matches(SKIP_SELECTOR)) {
            return;
          } // if the selected target is the active element, do not blur


          var tapped = ev.target;

          if (tapped === active) {
            return;
          }

          if (tapped.matches(SKIP_SELECTOR) || tapped.closest(SKIP_SELECTOR)) {
            return;
          }

          focused = false; // TODO: find a better way, why 50ms?

          setTimeout(function () {
            if (!focused) {
              active.blur();
            }
          }, 50);
        };

        Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["a"])(doc, 'ionScrollStart', onScroll);
        doc.addEventListener('focusin', onFocusin, true);
        doc.addEventListener('touchend', onTouchend, false);
        return function () {
          Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["b"])(doc, 'ionScrollStart', onScroll, true);
          doc.removeEventListener('focusin', onFocusin, true);
          doc.removeEventListener('touchend', onTouchend, false);
        };
      };

      var SCROLL_ASSIST_SPEED = 0.3;

      var getScrollData = function getScrollData(componentEl, contentEl, keyboardHeight) {
        var itemEl = componentEl.closest('ion-item,[ion-item]') || componentEl;
        return calcScrollData(itemEl.getBoundingClientRect(), contentEl.getBoundingClientRect(), keyboardHeight, componentEl.ownerDocument.defaultView.innerHeight);
      };

      var calcScrollData = function calcScrollData(inputRect, contentRect, keyboardHeight, platformHeight) {
        // compute input's Y values relative to the body
        var inputTop = inputRect.top;
        var inputBottom = inputRect.bottom; // compute visible area

        var visibleAreaTop = contentRect.top;
        var visibleAreaBottom = Math.min(contentRect.bottom, platformHeight - keyboardHeight); // compute safe area

        var safeAreaTop = visibleAreaTop + 15;
        var safeAreaBottom = visibleAreaBottom * 0.75; // figure out if each edge of the input is within the safe area

        var distanceToBottom = safeAreaBottom - inputBottom;
        var distanceToTop = safeAreaTop - inputTop; // desiredScrollAmount is the negated distance to the safe area according to our calculations.

        var desiredScrollAmount = Math.round(distanceToBottom < 0 ? -distanceToBottom : distanceToTop > 0 ? -distanceToTop : 0); // our calculations make some assumptions that aren't always true, like the keyboard being closed when an input
        // gets focus, so make sure we don't scroll the input above the visible area

        var scrollAmount = Math.min(desiredScrollAmount, inputTop - visibleAreaTop);
        var distance = Math.abs(scrollAmount);
        var duration = distance / SCROLL_ASSIST_SPEED;
        var scrollDuration = Math.min(400, Math.max(150, duration));
        return {
          scrollAmount: scrollAmount,
          scrollDuration: scrollDuration,
          scrollPadding: keyboardHeight,
          inputSafeY: -(inputTop - safeAreaTop) + 4
        };
      };

      var enableScrollAssist = function enableScrollAssist(componentEl, inputEl, contentEl, footerEl, keyboardHeight) {
        var coord;

        var touchStart = function touchStart(ev) {
          coord = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev);
        };

        var touchEnd = function touchEnd(ev) {
          // input cover touchend/mouseup
          if (!coord) {
            return;
          } // get where the touchend/mouseup ended


          var endCoord = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev); // focus this input if the pointer hasn't moved XX pixels
          // and the input doesn't already have focus

          if (!hasPointerMoved(6, coord, endCoord) && !isFocused(inputEl)) {
            ev.preventDefault();
            ev.stopPropagation(); // begin the input focus process

            jsSetFocus(componentEl, inputEl, contentEl, footerEl, keyboardHeight);
          }
        };

        componentEl.addEventListener('touchstart', touchStart, true);
        componentEl.addEventListener('touchend', touchEnd, true);
        return function () {
          componentEl.removeEventListener('touchstart', touchStart, true);
          componentEl.removeEventListener('touchend', touchEnd, true);
        };
      };

      var jsSetFocus = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(componentEl, inputEl, contentEl, footerEl, keyboardHeight) {
          var scrollData, scrollContentTimeout, scrollContent, doubleKeyboardEventListener, scrollEl, totalScrollAmount;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!contentEl && !footerEl)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  scrollData = getScrollData(componentEl, contentEl || footerEl, keyboardHeight);

                  if (!(contentEl && Math.abs(scrollData.scrollAmount) < 4)) {
                    _context2.next = 6;
                    break;
                  }

                  // the text input is in a safe position that doesn't
                  // require it to be scrolled into view, just set focus now
                  inputEl.focus();
                  return _context2.abrupt("return");

                case 6:
                  // temporarily move the focus to the focus holder so the browser
                  // doesn't freak out while it's trying to get the input in place
                  // at this point the native text input still does not have focus
                  relocateInput(componentEl, inputEl, true, scrollData.inputSafeY);
                  inputEl.focus();
                  /* tslint:disable-next-line */

                  if (!(typeof window !== 'undefined')) {
                    _context2.next = 21;
                    break;
                  }

                  scrollContent = /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              // clean up listeners and timeouts
                              if (scrollContentTimeout !== undefined) {
                                clearTimeout(scrollContentTimeout);
                              }

                              window.removeEventListener('ionKeyboardDidShow', doubleKeyboardEventListener);
                              window.removeEventListener('ionKeyboardDidShow', scrollContent); // scroll the input into place

                              if (!contentEl) {
                                _context.next = 6;
                                break;
                              }

                              _context.next = 6;
                              return contentEl.scrollByPoint(0, scrollData.scrollAmount, scrollData.scrollDuration);

                            case 6:
                              // the scroll view is in the correct position now
                              // give the native text input focus
                              relocateInput(componentEl, inputEl, false, scrollData.inputSafeY); // ensure this is the focused input

                              inputEl.focus();

                            case 8:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function scrollContent() {
                      return _ref2.apply(this, arguments);
                    };
                  }();

                  doubleKeyboardEventListener = function doubleKeyboardEventListener() {
                    window.removeEventListener('ionKeyboardDidShow', doubleKeyboardEventListener);
                    window.addEventListener('ionKeyboardDidShow', scrollContent);
                  };

                  if (!contentEl) {
                    _context2.next = 20;
                    break;
                  }

                  _context2.next = 14;
                  return contentEl.getScrollElement();

                case 14:
                  scrollEl = _context2.sent;

                  /**
                   * scrollData will only consider the amount we need
                   * to scroll in order to properly bring the input
                   * into view. It will not consider the amount
                   * we can scroll in the content element.
                   * As a result, scrollData may request a greater
                   * scroll position than is currently available
                   * in the DOM. If this is the case, we need to
                   * wait for the webview to resize/the keyboard
                   * to show in order for additional scroll
                   * bandwidth to become available.
                   */
                  totalScrollAmount = scrollEl.scrollHeight - scrollEl.clientHeight;

                  if (!(scrollData.scrollAmount > totalScrollAmount - scrollEl.scrollTop)) {
                    _context2.next = 20;
                    break;
                  }

                  /**
                   * On iOS devices, the system will show a "Passwords" bar above the keyboard
                   * after the initial keyboard is shown. This prevents the webview from resizing
                   * until the "Passwords" bar is shown, so we need to wait for that to happen first.
                   */
                  if (inputEl.type === 'password') {
                    // Add 50px to account for the "Passwords" bar
                    scrollData.scrollAmount += 50;
                    window.addEventListener('ionKeyboardDidShow', doubleKeyboardEventListener);
                  } else {
                    window.addEventListener('ionKeyboardDidShow', scrollContent);
                  }
                  /**
                   * This should only fire in 2 instances:
                   * 1. The app is very slow.
                   * 2. The app is running in a browser on an old OS
                   * that does not support Ionic Keyboard Events
                   */


                  scrollContentTimeout = setTimeout(scrollContent, 1000);
                  return _context2.abrupt("return");

                case 20:
                  scrollContent();

                case 21:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function jsSetFocus(_x, _x2, _x3, _x4, _x5) {
          return _ref.apply(this, arguments);
        };
      }();

      var hasPointerMoved = function hasPointerMoved(threshold, startCoord, endCoord) {
        if (startCoord && endCoord) {
          var deltaX = startCoord.x - endCoord.x;
          var deltaY = startCoord.y - endCoord.y;
          var distance = deltaX * deltaX + deltaY * deltaY;
          return distance > threshold * threshold;
        }

        return false;
      };

      var PADDING_TIMER_KEY = '$ionPaddingTimer';

      var enableScrollPadding = function enableScrollPadding(keyboardHeight) {
        var doc = document;

        var onFocusin = function onFocusin(ev) {
          setScrollPadding(ev.target, keyboardHeight);
        };

        var onFocusout = function onFocusout(ev) {
          setScrollPadding(ev.target, 0);
        };

        doc.addEventListener('focusin', onFocusin);
        doc.addEventListener('focusout', onFocusout);
        return function () {
          doc.removeEventListener('focusin', onFocusin);
          doc.removeEventListener('focusout', onFocusout);
        };
      };

      var setScrollPadding = function setScrollPadding(input, keyboardHeight) {
        if (input.tagName !== 'INPUT') {
          return;
        }

        if (input.parentElement && input.parentElement.tagName === 'ION-INPUT') {
          return;
        }

        if (input.parentElement && input.parentElement.parentElement && input.parentElement.parentElement.tagName === 'ION-SEARCHBAR') {
          return;
        }

        var el = input.closest('ion-content');

        if (el === null) {
          return;
        }

        var timer = el[PADDING_TIMER_KEY];

        if (timer) {
          clearTimeout(timer);
        }

        if (keyboardHeight > 0) {
          el.style.setProperty('--keyboard-offset', "".concat(keyboardHeight, "px"));
        } else {
          el[PADDING_TIMER_KEY] = setTimeout(function () {
            el.style.setProperty('--keyboard-offset', '0px');
          }, 120);
        }
      };

      var INPUT_BLURRING = true;
      var SCROLL_PADDING = true;

      var startInputShims = function startInputShims(config) {
        var doc = document;
        var keyboardHeight = config.getNumber('keyboardHeight', 290);
        var scrollAssist = config.getBoolean('scrollAssist', true);
        var hideCaret = config.getBoolean('hideCaretOnScroll', true);
        var inputBlurring = config.getBoolean('inputBlurring', true);
        var scrollPadding = config.getBoolean('scrollPadding', true);
        var inputs = Array.from(doc.querySelectorAll('ion-input, ion-textarea'));
        var hideCaretMap = new WeakMap();
        var scrollAssistMap = new WeakMap();

        var registerInput = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(componentEl) {
            var inputRoot, inputEl, scrollEl, footerEl, rmFn, _rmFn;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!componentEl.componentOnReady) {
                      _context3.next = 3;
                      break;
                    }

                    _context3.next = 3;
                    return componentEl.componentOnReady();

                  case 3:
                    inputRoot = componentEl.shadowRoot || componentEl;
                    inputEl = inputRoot.querySelector('input') || inputRoot.querySelector('textarea');
                    scrollEl = componentEl.closest('ion-content');
                    footerEl = !scrollEl ? componentEl.closest('ion-footer') : null;

                    if (inputEl) {
                      _context3.next = 9;
                      break;
                    }

                    return _context3.abrupt("return");

                  case 9:
                    if (!!scrollEl && hideCaret && !hideCaretMap.has(componentEl)) {
                      rmFn = enableHideCaretOnScroll(componentEl, inputEl, scrollEl);
                      hideCaretMap.set(componentEl, rmFn);
                    }

                    if ((!!scrollEl || !!footerEl) && scrollAssist && !scrollAssistMap.has(componentEl)) {
                      _rmFn = enableScrollAssist(componentEl, inputEl, scrollEl, footerEl, keyboardHeight);
                      scrollAssistMap.set(componentEl, _rmFn);
                    }

                  case 11:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function registerInput(_x6) {
            return _ref3.apply(this, arguments);
          };
        }();

        var unregisterInput = function unregisterInput(componentEl) {
          if (hideCaret) {
            var fn = hideCaretMap.get(componentEl);

            if (fn) {
              fn();
            }

            hideCaretMap["delete"](componentEl);
          }

          if (scrollAssist) {
            var _fn = scrollAssistMap.get(componentEl);

            if (_fn) {
              _fn();
            }

            scrollAssistMap["delete"](componentEl);
          }
        };

        if (inputBlurring && INPUT_BLURRING) {
          enableInputBlurring();
        }

        if (scrollPadding && SCROLL_PADDING) {
          enableScrollPadding(keyboardHeight);
        } // Input might be already loaded in the DOM before ion-device-hacks did.
        // At this point we need to look for all of the inputs not registered yet
        // and register them.


        for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
          var input = _inputs[_i];
          registerInput(input);
        }

        doc.addEventListener('ionInputDidLoad', function (ev) {
          registerInput(ev.detail);
        });
        doc.addEventListener('ionInputDidUnload', function (ev) {
          unregisterInput(ev.detail);
        });
      };
      /***/

    }
  }]);
})();
//# sourceMappingURL=input-shims-bc550f99-js-es5.js.map