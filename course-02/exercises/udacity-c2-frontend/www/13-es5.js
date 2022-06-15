(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13], {
    /***/
    "wHD8":
    /*!************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-img.entry.js ***!
      \************************************************************/

    /*! exports provided: ion_img */

    /***/
    function wHD8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_img", function () {
        return Img;
      });
      /* harmony import */


      var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-e806d1f6.js */
      "A36C");
      /* harmony import */


      var _ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ionic-global-9d5c8ee3.js */
      "Zgba");

      var imgCss = ":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}";

      var Img = /*#__PURE__*/function () {
        function Img(hostRef) {
          var _this = this;

          _classCallCheck(this, Img);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionImgWillLoad = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionImgWillLoad", 7);
          this.ionImgDidLoad = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionImgDidLoad", 7);
          this.ionError = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionError", 7);

          this.onLoad = function () {
            _this.ionImgDidLoad.emit();
          };

          this.onError = function () {
            _this.ionError.emit();
          };
        }

        _createClass(Img, [{
          key: "srcChanged",
          value: function srcChanged() {
            this.addIO();
          }
        }, {
          key: "componentDidLoad",
          value: function componentDidLoad() {
            this.addIO();
          }
        }, {
          key: "addIO",
          value: function addIO() {
            var _this2 = this;

            if (this.src === undefined) {
              return;
            }

            if (typeof window !== 'undefined' && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'isIntersecting' in window.IntersectionObserverEntry.prototype) {
              this.removeIO();
              this.io = new IntersectionObserver(function (data) {
                // because there will only ever be one instance
                // of the element we are observing
                // we can just use data[0]
                if (data[0].isIntersecting) {
                  _this2.load();

                  _this2.removeIO();
                }
              });
              this.io.observe(this.el);
            } else {
              // fall back to setTimeout for Safari and IE
              setTimeout(function () {
                return _this2.load();
              }, 200);
            }
          }
        }, {
          key: "load",
          value: function load() {
            this.loadError = this.onError;
            this.loadSrc = this.src;
            this.ionImgWillLoad.emit();
          }
        }, {
          key: "removeIO",
          value: function removeIO() {
            if (this.io) {
              this.io.disconnect();
              this.io = undefined;
            }
          }
        }, {
          key: "render",
          value: function render() {
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this)
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
              decoding: "async",
              src: this.loadSrc,
              alt: this.alt,
              onLoad: this.onLoad,
              onError: this.loadError,
              part: "image"
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
              "src": ["srcChanged"]
            };
          }
        }]);

        return Img;
      }();

      Img.style = imgCss;
      /***/
    }
  }]);
})();
//# sourceMappingURL=13-es5.js.map