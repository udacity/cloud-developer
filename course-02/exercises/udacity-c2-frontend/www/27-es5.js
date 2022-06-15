(function () {
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27], {
    /***/
    "smMY":
    /*!******************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-reorder_2.entry.js ***!
      \******************************************************************/

    /*! exports provided: ion_reorder, ion_reorder_group */

    /***/
    function smMY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_reorder", function () {
        return Reorder;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_reorder_group", function () {
        return ReorderGroup;
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


      var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./haptic-27b3f981.js */
      "qULd");

      var reorderIosCss = ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}";
      var reorderMdCss = ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}";

      var Reorder = /*#__PURE__*/function () {
        function Reorder(hostRef) {
          _classCallCheck(this, Reorder);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        }

        _createClass(Reorder, [{
          key: "onClick",
          value: function onClick(ev) {
            var reorderGroup = this.el.closest('ion-reorder-group');
            ev.preventDefault(); // Only stop event propagation if the reorder is inside of an enabled
            // reorder group. This allows interaction with clickable children components.

            if (!reorderGroup || !reorderGroup.disabled) {
              ev.stopImmediatePropagation();
            }
          }
        }, {
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var reorderIcon = mode === 'ios' ? 'reorder-three-outline' : 'reorder-two-sharp';
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": mode
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-icon", {
              name: reorderIcon,
              lazy: false,
              "class": "reorder-icon",
              part: "icon"
            })));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);

        return Reorder;
      }();

      Reorder.style = {
        ios: reorderIosCss,
        md: reorderMdCss
      };
      var reorderGroupCss = ".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}";

      var ReorderGroup = /*#__PURE__*/function () {
        function ReorderGroup(hostRef) {
          _classCallCheck(this, ReorderGroup);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionItemReorder = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionItemReorder", 7);
          this.lastToIndex = -1;
          this.cachedHeights = [];
          this.scrollElTop = 0;
          this.scrollElBottom = 0;
          this.scrollElInitial = 0;
          this.containerTop = 0;
          this.containerBottom = 0;
          this.state = 0
          /* Idle */
          ;
          /**
           * If `true`, the reorder will be hidden.
           */

          this.disabled = true;
        }

        _createClass(ReorderGroup, [{
          key: "disabledChanged",
          value: function disabledChanged() {
            if (this.gesture) {
              this.gesture.enable(!this.disabled);
            }
          }
        }, {
          key: "connectedCallback",
          value: function () {
            var _connectedCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              var contentEl;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      contentEl = this.el.closest('ion-content');

                      if (!contentEl) {
                        _context.next = 5;
                        break;
                      }

                      _context.next = 4;
                      return contentEl.getScrollElement();

                    case 4:
                      this.scrollEl = _context.sent;

                    case 5:
                      _context.next = 7;
                      return Promise.resolve().then(__webpack_require__.bind(null,
                      /*! ./index-f49d994d.js */
                      "iWo5"));

                    case 7:
                      this.gesture = _context.sent.createGesture({
                        el: this.el,
                        gestureName: 'reorder',
                        gesturePriority: 110,
                        threshold: 0,
                        direction: 'y',
                        passive: false,
                        canStart: function canStart(detail) {
                          return _this.canStart(detail);
                        },
                        onStart: function onStart(ev) {
                          return _this.onStart(ev);
                        },
                        onMove: function onMove(ev) {
                          return _this.onMove(ev);
                        },
                        onEnd: function onEnd() {
                          return _this.onEnd();
                        }
                      });
                      this.disabledChanged();

                    case 9:
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
            this.onEnd();

            if (this.gesture) {
              this.gesture.destroy();
              this.gesture = undefined;
            }
          }
          /**
           * Completes the reorder operation. Must be called by the `ionItemReorder` event.
           *
           * If a list of items is passed, the list will be reordered and returned in the
           * proper order.
           *
           * If no parameters are passed or if `true` is passed in, the reorder will complete
           * and the item will remain in the position it was dragged to. If `false` is passed,
           * the reorder will complete and the item will bounce back to its original position.
           *
           * @param listOrReorder A list of items to be sorted and returned in the new order or a
           * boolean of whether or not the reorder should reposition the item.
           */

        }, {
          key: "complete",
          value: function complete(listOrReorder) {
            return Promise.resolve(this.completeSync(listOrReorder));
          }
        }, {
          key: "canStart",
          value: function canStart(ev) {
            if (this.selectedItemEl || this.state !== 0
            /* Idle */
            ) {
                return false;
              }

            var target = ev.event.target;
            var reorderEl = target.closest('ion-reorder');

            if (!reorderEl) {
              return false;
            }

            var item = findReorderItem(reorderEl, this.el);

            if (!item) {
              return false;
            }

            ev.data = item;
            return true;
          }
        }, {
          key: "onStart",
          value: function onStart(ev) {
            ev.event.preventDefault();
            var item = this.selectedItemEl = ev.data;
            var heights = this.cachedHeights;
            heights.length = 0;
            var el = this.el;
            var children = el.children;

            if (!children || children.length === 0) {
              return;
            }

            var sum = 0;

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              sum += child.offsetHeight;
              heights.push(sum);
              child.$ionIndex = i;
            }

            var box = el.getBoundingClientRect();
            this.containerTop = box.top;
            this.containerBottom = box.bottom;

            if (this.scrollEl) {
              var scrollBox = this.scrollEl.getBoundingClientRect();
              this.scrollElInitial = this.scrollEl.scrollTop;
              this.scrollElTop = scrollBox.top + AUTO_SCROLL_MARGIN;
              this.scrollElBottom = scrollBox.bottom - AUTO_SCROLL_MARGIN;
            } else {
              this.scrollElInitial = 0;
              this.scrollElTop = 0;
              this.scrollElBottom = 0;
            }

            this.lastToIndex = indexForItem(item);
            this.selectedItemHeight = item.offsetHeight;
            this.state = 1
            /* Active */
            ;
            item.classList.add(ITEM_REORDER_SELECTED);
            Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["a"])();
          }
        }, {
          key: "onMove",
          value: function onMove(ev) {
            var selectedItem = this.selectedItemEl;

            if (!selectedItem) {
              return;
            } // Scroll if we reach the scroll margins


            var scroll = this.autoscroll(ev.currentY); // // Get coordinate

            var top = this.containerTop - scroll;
            var bottom = this.containerBottom - scroll;
            var currentY = Math.max(top, Math.min(ev.currentY, bottom));
            var deltaY = scroll + currentY - ev.startY;
            var normalizedY = currentY - top;
            var toIndex = this.itemIndexForTop(normalizedY);

            if (toIndex !== this.lastToIndex) {
              var fromIndex = indexForItem(selectedItem);
              this.lastToIndex = toIndex;
              Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["b"])();
              this.reorderMove(fromIndex, toIndex);
            } // Update selected item position


            selectedItem.style.transform = "translateY(".concat(deltaY, "px)");
          }
        }, {
          key: "onEnd",
          value: function onEnd() {
            var selectedItemEl = this.selectedItemEl;
            this.state = 2
            /* Complete */
            ;

            if (!selectedItemEl) {
              this.state = 0
              /* Idle */
              ;
              return;
            }

            var toIndex = this.lastToIndex;
            var fromIndex = indexForItem(selectedItemEl);

            if (toIndex === fromIndex) {
              this.completeSync();
            } else {
              this.ionItemReorder.emit({
                from: fromIndex,
                to: toIndex,
                complete: this.completeSync.bind(this)
              });
            }

            Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["h"])();
          }
        }, {
          key: "completeSync",
          value: function completeSync(listOrReorder) {
            var selectedItemEl = this.selectedItemEl;

            if (selectedItemEl && this.state === 2
            /* Complete */
            ) {
                var children = this.el.children;
                var len = children.length;
                var toIndex = this.lastToIndex;
                var fromIndex = indexForItem(selectedItemEl);

                if (toIndex !== fromIndex && (listOrReorder === undefined || listOrReorder === true)) {
                  var ref = fromIndex < toIndex ? children[toIndex + 1] : children[toIndex];
                  this.el.insertBefore(selectedItemEl, ref);
                }

                if (Array.isArray(listOrReorder)) {
                  listOrReorder = reorderArray(listOrReorder, fromIndex, toIndex);
                }

                for (var i = 0; i < len; i++) {
                  children[i].style['transform'] = '';
                }

                selectedItemEl.style.transition = '';
                selectedItemEl.classList.remove(ITEM_REORDER_SELECTED);
                this.selectedItemEl = undefined;
                this.state = 0
                /* Idle */
                ;
              }

            return listOrReorder;
          }
        }, {
          key: "itemIndexForTop",
          value: function itemIndexForTop(deltaY) {
            var heights = this.cachedHeights;
            var i = 0; // TODO: since heights is a sorted array of integers, we can do
            // speed up the search using binary search. Remember that linear-search is still
            // faster than binary-search for small arrays (<64) due CPU branch misprediction.

            for (i = 0; i < heights.length; i++) {
              if (heights[i] > deltaY) {
                break;
              }
            }

            return i;
          }
          /********* DOM WRITE ********* */

        }, {
          key: "reorderMove",
          value: function reorderMove(fromIndex, toIndex) {
            var itemHeight = this.selectedItemHeight;
            var children = this.el.children;

            for (var i = 0; i < children.length; i++) {
              var style = children[i].style;
              var value = '';

              if (i > fromIndex && i <= toIndex) {
                value = "translateY(".concat(-itemHeight, "px)");
              } else if (i < fromIndex && i >= toIndex) {
                value = "translateY(".concat(itemHeight, "px)");
              }

              style['transform'] = value;
            }
          }
        }, {
          key: "autoscroll",
          value: function autoscroll(posY) {
            if (!this.scrollEl) {
              return 0;
            }

            var amount = 0;

            if (posY < this.scrollElTop) {
              amount = -SCROLL_JUMP;
            } else if (posY > this.scrollElBottom) {
              amount = SCROLL_JUMP;
            }

            if (amount !== 0) {
              this.scrollEl.scrollBy(0, amount);
            }

            return this.scrollEl.scrollTop - this.scrollElInitial;
          }
        }, {
          key: "render",
          value: function render() {
            var _class;

            var mode = Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": (_class = {}, _defineProperty(_class, mode, true), _defineProperty(_class, 'reorder-enabled', !this.disabled), _defineProperty(_class, 'reorder-list-active', this.state !== 0), _class)
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
              "disabled": ["disabledChanged"]
            };
          }
        }]);

        return ReorderGroup;
      }();

      var indexForItem = function indexForItem(element) {
        return element['$ionIndex'];
      };

      var findReorderItem = function findReorderItem(node, container) {
        var parent;

        while (node) {
          parent = node.parentElement;

          if (parent === container) {
            return node;
          }

          node = parent;
        }

        return undefined;
      };

      var AUTO_SCROLL_MARGIN = 60;
      var SCROLL_JUMP = 10;
      var ITEM_REORDER_SELECTED = 'reorder-selected';

      var reorderArray = function reorderArray(array, from, to) {
        var element = array[from];
        array.splice(from, 1);
        array.splice(to, 0, element);
        return array.slice();
      };

      ReorderGroup.style = reorderGroupCss;
      /***/
    }
  }]);
})();
//# sourceMappingURL=27-es5.js.map