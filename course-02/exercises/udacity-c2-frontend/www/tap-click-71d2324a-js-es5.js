(function () {
  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tap-click-71d2324a-js"], {
    /***/
    "zlY0":
    /*!*****************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/tap-click-71d2324a.js ***!
      \*****************************************************************/

    /*! exports provided: startTapClick */

    /***/
    function zlY0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "startTapClick", function () {
        return startTapClick;
      });
      /* harmony import */


      var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./helpers-90f46169.js */
      "QPqR");

      var startTapClick = function startTapClick(config) {
        var lastTouch = -MOUSE_WAIT * 10;
        var lastActivated = 0;
        var scrollingEl;
        var activatableEle;
        var activeRipple;
        var activeDefer;
        var useRippleEffect = config.getBoolean('animated', true) && config.getBoolean('rippleEffect', true);
        var clearDefers = new WeakMap();

        var isScrolling = function isScrolling() {
          return scrollingEl !== undefined && scrollingEl.parentElement !== null;
        }; // Touch Events


        var onTouchStart = function onTouchStart(ev) {
          lastTouch = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
          pointerDown(ev);
        };

        var onTouchEnd = function onTouchEnd(ev) {
          lastTouch = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev);
          pointerUp(ev);
        };

        var onMouseDown = function onMouseDown(ev) {
          var t = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;

          if (lastTouch < t) {
            pointerDown(ev);
          }
        };

        var onMouseUp = function onMouseUp(ev) {
          var t = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["n"])(ev) - MOUSE_WAIT;

          if (lastTouch < t) {
            pointerUp(ev);
          }
        };

        var cancelActive = function cancelActive() {
          clearTimeout(activeDefer);
          activeDefer = undefined;

          if (activatableEle) {
            removeActivated(false);
            activatableEle = undefined;
          }
        };

        var pointerDown = function pointerDown(ev) {
          if (activatableEle || isScrolling()) {
            return;
          }

          scrollingEl = undefined;
          setActivatedElement(getActivatableTarget(ev), ev);
        };

        var pointerUp = function pointerUp(ev) {
          setActivatedElement(undefined, ev);
        };

        var setActivatedElement = function setActivatedElement(el, ev) {
          // do nothing
          if (el && el === activatableEle) {
            return;
          }

          clearTimeout(activeDefer);
          activeDefer = undefined;

          var _Object = Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__["p"])(ev),
              x = _Object.x,
              y = _Object.y; // deactivate selected


          if (activatableEle) {
            if (clearDefers.has(activatableEle)) {
              throw new Error('internal error');
            }

            if (!activatableEle.classList.contains(ACTIVATED)) {
              addActivated(activatableEle, x, y);
            }

            removeActivated(true);
          } // activate


          if (el) {
            var deferId = clearDefers.get(el);

            if (deferId) {
              clearTimeout(deferId);
              clearDefers["delete"](el);
            }

            var delay = isInstant(el) ? 0 : ADD_ACTIVATED_DEFERS;
            el.classList.remove(ACTIVATED);
            activeDefer = setTimeout(function () {
              addActivated(el, x, y);
              activeDefer = undefined;
            }, delay);
          }

          activatableEle = el;
        };

        var addActivated = function addActivated(el, x, y) {
          lastActivated = Date.now();
          el.classList.add(ACTIVATED);
          var rippleEffect = useRippleEffect && getRippleEffect(el);

          if (rippleEffect && rippleEffect.addRipple) {
            removeRipple();
            activeRipple = rippleEffect.addRipple(x, y);
          }
        };

        var removeRipple = function removeRipple() {
          if (activeRipple !== undefined) {
            activeRipple.then(function (remove) {
              return remove();
            });
            activeRipple = undefined;
          }
        };

        var removeActivated = function removeActivated(smooth) {
          removeRipple();
          var active = activatableEle;

          if (!active) {
            return;
          }

          var time = CLEAR_STATE_DEFERS - Date.now() + lastActivated;

          if (smooth && time > 0 && !isInstant(active)) {
            var deferId = setTimeout(function () {
              active.classList.remove(ACTIVATED);
              clearDefers["delete"](active);
            }, CLEAR_STATE_DEFERS);
            clearDefers.set(active, deferId);
          } else {
            active.classList.remove(ACTIVATED);
          }
        };

        var doc = document;
        doc.addEventListener('ionScrollStart', function (ev) {
          scrollingEl = ev.target;
          cancelActive();
        });
        doc.addEventListener('ionScrollEnd', function () {
          scrollingEl = undefined;
        });
        doc.addEventListener('ionGestureCaptured', cancelActive);
        doc.addEventListener('touchstart', onTouchStart, true);
        doc.addEventListener('touchcancel', onTouchEnd, true);
        doc.addEventListener('touchend', onTouchEnd, true);
        doc.addEventListener('mousedown', onMouseDown, true);
        doc.addEventListener('mouseup', onMouseUp, true);
      };

      var getActivatableTarget = function getActivatableTarget(ev) {
        if (ev.composedPath) {
          var path = ev.composedPath();

          for (var i = 0; i < path.length - 2; i++) {
            var el = path[i];

            if (el.classList && el.classList.contains('ion-activatable')) {
              return el;
            }
          }
        } else {
          return ev.target.closest('.ion-activatable');
        }
      };

      var isInstant = function isInstant(el) {
        return el.classList.contains('ion-activatable-instant');
      };

      var getRippleEffect = function getRippleEffect(el) {
        if (el.shadowRoot) {
          var ripple = el.shadowRoot.querySelector('ion-ripple-effect');

          if (ripple) {
            return ripple;
          }
        }

        return el.querySelector('ion-ripple-effect');
      };

      var ACTIVATED = 'ion-activated';
      var ADD_ACTIVATED_DEFERS = 200;
      var CLEAR_STATE_DEFERS = 200;
      var MOUSE_WAIT = 2500;
      /***/
    }
  }]);
})();
//# sourceMappingURL=tap-click-71d2324a-js-es5.js.map