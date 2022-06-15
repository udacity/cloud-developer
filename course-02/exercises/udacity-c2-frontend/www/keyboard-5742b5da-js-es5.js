(function () {
  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["keyboard-5742b5da-js"], {
    /***/
    "nGaW":
    /*!****************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/keyboard-5742b5da.js ***!
      \****************************************************************/

    /*! exports provided: KEYBOARD_DID_CLOSE, KEYBOARD_DID_OPEN, copyVisualViewport, keyboardDidClose, keyboardDidOpen, keyboardDidResize, resetKeyboardAssist, setKeyboardClose, setKeyboardOpen, startKeyboardAssist, trackViewportChanges */

    /***/
    function nGaW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "KEYBOARD_DID_CLOSE", function () {
        return KEYBOARD_DID_CLOSE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "KEYBOARD_DID_OPEN", function () {
        return KEYBOARD_DID_OPEN;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "copyVisualViewport", function () {
        return copyVisualViewport;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "keyboardDidClose", function () {
        return keyboardDidClose;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "keyboardDidOpen", function () {
        return keyboardDidOpen;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "keyboardDidResize", function () {
        return keyboardDidResize;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "resetKeyboardAssist", function () {
        return resetKeyboardAssist;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setKeyboardClose", function () {
        return setKeyboardClose;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setKeyboardOpen", function () {
        return setKeyboardOpen;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "startKeyboardAssist", function () {
        return startKeyboardAssist;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "trackViewportChanges", function () {
        return trackViewportChanges;
      });

      var KEYBOARD_DID_OPEN = 'ionKeyboardDidShow';
      var KEYBOARD_DID_CLOSE = 'ionKeyboardDidHide';
      var KEYBOARD_THRESHOLD = 150;
      var previousVisualViewport = {};
      var currentVisualViewport = {};
      var keyboardOpen = false;
      /**
       * This is only used for tests
       */

      var resetKeyboardAssist = function resetKeyboardAssist() {
        previousVisualViewport = {};
        currentVisualViewport = {};
        keyboardOpen = false;
      };

      var startKeyboardAssist = function startKeyboardAssist(win) {
        startNativeListeners(win);

        if (!win.visualViewport) {
          return;
        }

        currentVisualViewport = copyVisualViewport(win.visualViewport);

        win.visualViewport.onresize = function () {
          trackViewportChanges(win);

          if (keyboardDidOpen() || keyboardDidResize(win)) {
            setKeyboardOpen(win);
          } else if (keyboardDidClose(win)) {
            setKeyboardClose(win);
          }
        };
      };
      /**
       * Listen for events fired by native keyboard plugin
       * in Capacitor/Cordova so devs only need to listen
       * in one place.
       */


      var startNativeListeners = function startNativeListeners(win) {
        win.addEventListener('keyboardDidShow', function (ev) {
          return setKeyboardOpen(win, ev);
        });
        win.addEventListener('keyboardDidHide', function () {
          return setKeyboardClose(win);
        });
      };

      var setKeyboardOpen = function setKeyboardOpen(win, ev) {
        fireKeyboardOpenEvent(win, ev);
        keyboardOpen = true;
      };

      var setKeyboardClose = function setKeyboardClose(win) {
        fireKeyboardCloseEvent(win);
        keyboardOpen = false;
      };
      /**
       * Returns `true` if the `keyboardOpen` flag is not
       * set, the previous visual viewport width equal the current
       * visual viewport width, and if the scaled difference
       * of the previous visual viewport height minus the current
       * visual viewport height is greater than KEYBOARD_THRESHOLD
       *
       * We need to be able to accommodate users who have zooming
       * enabled in their browser (or have zoomed in manually) which
       * is why we take into account the current visual viewport's
       * scale value.
       */


      var keyboardDidOpen = function keyboardDidOpen() {
        var scaledHeightDifference = (previousVisualViewport.height - currentVisualViewport.height) * currentVisualViewport.scale;
        return !keyboardOpen && previousVisualViewport.width === currentVisualViewport.width && scaledHeightDifference > KEYBOARD_THRESHOLD;
      };
      /**
       * Returns `true` if the keyboard is open,
       * but the keyboard did not close
       */


      var keyboardDidResize = function keyboardDidResize(win) {
        return keyboardOpen && !keyboardDidClose(win);
      };
      /**
       * Determine if the keyboard was closed
       * Returns `true` if the `keyboardOpen` flag is set and
       * the current visual viewport height equals the
       * layout viewport height.
       */


      var keyboardDidClose = function keyboardDidClose(win) {
        return keyboardOpen && currentVisualViewport.height === win.innerHeight;
      };
      /**
       * Dispatch a keyboard open event
       */


      var fireKeyboardOpenEvent = function fireKeyboardOpenEvent(win, nativeEv) {
        var keyboardHeight = nativeEv ? nativeEv.keyboardHeight : win.innerHeight - currentVisualViewport.height;
        var ev = new CustomEvent(KEYBOARD_DID_OPEN, {
          detail: {
            keyboardHeight: keyboardHeight
          }
        });
        win.dispatchEvent(ev);
      };
      /**
       * Dispatch a keyboard close event
       */


      var fireKeyboardCloseEvent = function fireKeyboardCloseEvent(win) {
        var ev = new CustomEvent(KEYBOARD_DID_CLOSE);
        win.dispatchEvent(ev);
      };
      /**
       * Given a window object, create a copy of
       * the current visual and layout viewport states
       * while also preserving the previous visual and
       * layout viewport states
       */


      var trackViewportChanges = function trackViewportChanges(win) {
        previousVisualViewport = Object.assign({}, currentVisualViewport);
        currentVisualViewport = copyVisualViewport(win.visualViewport);
      };
      /**
       * Creates a deep copy of the visual viewport
       * at a given state
       */


      var copyVisualViewport = function copyVisualViewport(visualViewport) {
        return {
          width: Math.round(visualViewport.width),
          height: Math.round(visualViewport.height),
          offsetTop: visualViewport.offsetTop,
          offsetLeft: visualViewport.offsetLeft,
          pageTop: visualViewport.pageTop,
          pageLeft: visualViewport.pageLeft,
          scale: visualViewport.scale
        };
      };
      /***/

    }
  }]);
})();
//# sourceMappingURL=keyboard-5742b5da-js-es5.js.map