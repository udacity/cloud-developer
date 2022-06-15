(function () {
  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["focus-visible-f4ad4f1a-js"], {
    /***/
    "Tsnu":
    /*!*********************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/focus-visible-f4ad4f1a.js ***!
      \*********************************************************************/

    /*! exports provided: startFocusVisible */

    /***/
    function Tsnu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "startFocusVisible", function () {
        return startFocusVisible;
      });

      var ION_FOCUSED = 'ion-focused';
      var ION_FOCUSABLE = 'ion-focusable';
      var FOCUS_KEYS = ['Tab', 'ArrowDown', 'Space', 'Escape', ' ', 'Shift', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];

      var startFocusVisible = function startFocusVisible() {
        var currentFocus = [];
        var keyboardMode = true;
        var doc = document;

        var setFocus = function setFocus(elements) {
          currentFocus.forEach(function (el) {
            return el.classList.remove(ION_FOCUSED);
          });
          elements.forEach(function (el) {
            return el.classList.add(ION_FOCUSED);
          });
          currentFocus = elements;
        };

        var pointerDown = function pointerDown() {
          keyboardMode = false;
          setFocus([]);
        };

        doc.addEventListener('keydown', function (ev) {
          keyboardMode = FOCUS_KEYS.includes(ev.key);

          if (!keyboardMode) {
            setFocus([]);
          }
        });
        doc.addEventListener('focusin', function (ev) {
          if (keyboardMode && ev.composedPath) {
            var toFocus = ev.composedPath().filter(function (el) {
              if (el.classList) {
                return el.classList.contains(ION_FOCUSABLE);
              }

              return false;
            });
            setFocus(toFocus);
          }
        });
        doc.addEventListener('focusout', function () {
          if (doc.activeElement === doc.body) {
            setFocus([]);
          }
        });
        doc.addEventListener('touchstart', pointerDown);
        doc.addEventListener('mousedown', pointerDown);
      };
      /***/

    }
  }]);
})();
//# sourceMappingURL=focus-visible-f4ad4f1a-js-es5.js.map