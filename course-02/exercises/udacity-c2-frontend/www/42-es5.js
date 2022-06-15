(function () {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42], {
    /***/
    "8Mb5":
    /*!***********************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-virtual-scroll.entry.js ***!
      \***********************************************************************/

    /*! exports provided: ion_virtual_scroll */

    /***/
    function Mb5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_virtual_scroll", function () {
        return VirtualScroll;
      });
      /* harmony import */


      var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-e806d1f6.js */
      "A36C");

      var CELL_TYPE_ITEM = 'item';
      var CELL_TYPE_HEADER = 'header';
      var CELL_TYPE_FOOTER = 'footer';
      var NODE_CHANGE_NONE = 0;
      var NODE_CHANGE_POSITION = 1;
      var NODE_CHANGE_CELL = 2;
      var MIN_READS = 2;

      var updateVDom = function updateVDom(dom, heightIndex, cells, range) {
        // reset dom
        var _iterator = _createForOfIteratorHelper(dom),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            node.change = NODE_CHANGE_NONE;
            node.d = true;
          } // try to match into exisiting dom

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var toMutate = [];
        var end = range.offset + range.length;

        var _loop = function _loop(i) {
          var cell = cells[i];
          var node = dom.find(function (n) {
            return n.d && n.cell === cell;
          });

          if (node) {
            var top = heightIndex[i];

            if (top !== node.top) {
              node.top = top;
              node.change = NODE_CHANGE_POSITION;
            }

            node.d = false;
          } else {
            toMutate.push(cell);
          }
        };

        for (var i = range.offset; i < end; i++) {
          _loop(i);
        } // needs to append


        var pool = dom.filter(function (n) {
          return n.d;
        });

        var _loop2 = function _loop2() {
          var cell = _toMutate[_i];
          var node = pool.find(function (n) {
            return n.d && n.cell.type === cell.type;
          });
          var index = cell.i;

          if (node) {
            node.d = false;
            node.change = NODE_CHANGE_CELL;
            node.cell = cell;
            node.top = heightIndex[index];
          } else {
            dom.push({
              d: false,
              cell: cell,
              visible: true,
              change: NODE_CHANGE_CELL,
              top: heightIndex[index]
            });
          }
        };

        for (var _i = 0, _toMutate = toMutate; _i < _toMutate.length; _i++) {
          _loop2();
        }

        dom.filter(function (n) {
          return n.d && n.top !== -9999;
        }).forEach(function (n) {
          n.change = NODE_CHANGE_POSITION;
          n.top = -9999;
        });
      };

      var doRender = function doRender(el, nodeRender, dom, updateCellHeight) {
        var children = Array.from(el.children).filter(function (n) {
          return n.tagName !== 'TEMPLATE';
        });
        var childrenNu = children.length;
        var child;

        for (var i = 0; i < dom.length; i++) {
          var node = dom[i];
          var cell = node.cell; // the cell change, the content must be updated

          if (node.change === NODE_CHANGE_CELL) {
            if (i < childrenNu) {
              child = children[i];
              nodeRender(child, cell, i);
            } else {
              var newChild = createNode(el, cell.type);
              child = nodeRender(newChild, cell, i) || newChild;
              child.classList.add('virtual-item');
              el.appendChild(child);
            }

            child['$ionCell'] = cell;
          } else {
            child = children[i];
          } // only update position when it changes


          if (node.change !== NODE_CHANGE_NONE) {
            child.style.transform = "translate3d(0,".concat(node.top, "px,0)");
          } // update visibility


          var visible = cell.visible;

          if (node.visible !== visible) {
            if (visible) {
              child.classList.remove('virtual-loading');
            } else {
              child.classList.add('virtual-loading');
            }

            node.visible = visible;
          } // dynamic height


          if (cell.reads > 0) {
            updateCellHeight(cell, child);
            cell.reads--;
          }
        }
      };

      var createNode = function createNode(el, type) {
        var template = getTemplate(el, type);

        if (template && el.ownerDocument) {
          return el.ownerDocument.importNode(template.content, true).children[0];
        }

        return null;
      };

      var getTemplate = function getTemplate(el, type) {
        switch (type) {
          case CELL_TYPE_ITEM:
            return el.querySelector('template:not([name])');

          case CELL_TYPE_HEADER:
            return el.querySelector('template[name=header]');

          case CELL_TYPE_FOOTER:
            return el.querySelector('template[name=footer]');
        }
      };

      var getViewport = function getViewport(scrollTop, vierportHeight, margin) {
        return {
          top: Math.max(scrollTop - margin, 0),
          bottom: scrollTop + vierportHeight + margin
        };
      };

      var getRange = function getRange(heightIndex, viewport, buffer) {
        var topPos = viewport.top;
        var bottomPos = viewport.bottom; // find top index

        var i = 0;

        for (; i < heightIndex.length; i++) {
          if (heightIndex[i] > topPos) {
            break;
          }
        }

        var offset = Math.max(i - buffer - 1, 0); // find bottom index

        for (; i < heightIndex.length; i++) {
          if (heightIndex[i] >= bottomPos) {
            break;
          }
        }

        var end = Math.min(i + buffer, heightIndex.length);
        var length = end - offset;
        return {
          offset: offset,
          length: length
        };
      };

      var getShouldUpdate = function getShouldUpdate(dirtyIndex, currentRange, range) {
        var end = range.offset + range.length;
        return dirtyIndex <= end || currentRange.offset !== range.offset || currentRange.length !== range.length;
      };

      var findCellIndex = function findCellIndex(cells, index) {
        var max = cells.length > 0 ? cells[cells.length - 1].index : 0;

        if (index === 0) {
          return 0;
        } else if (index === max + 1) {
          return cells.length;
        } else {
          return cells.findIndex(function (c) {
            return c.index === index;
          });
        }
      };

      var inplaceUpdate = function inplaceUpdate(dst, src, offset) {
        if (offset === 0 && src.length >= dst.length) {
          return src;
        }

        for (var i = 0; i < src.length; i++) {
          dst[i + offset] = src[i];
        }

        return dst;
      };

      var _calcCells = function calcCells(items, itemHeight, headerHeight, footerHeight, headerFn, footerFn, approxHeaderHeight, approxFooterHeight, approxItemHeight, j, offset, len) {
        var cells = [];
        var end = len + offset;

        for (var i = offset; i < end; i++) {
          var item = items[i];

          if (headerFn) {
            var value = headerFn(item, i, items);

            if (value != null) {
              cells.push({
                i: j++,
                type: CELL_TYPE_HEADER,
                value: value,
                index: i,
                height: headerHeight ? headerHeight(value, i) : approxHeaderHeight,
                reads: headerHeight ? 0 : MIN_READS,
                visible: !!headerHeight
              });
            }
          }

          cells.push({
            i: j++,
            type: CELL_TYPE_ITEM,
            value: item,
            index: i,
            height: itemHeight ? itemHeight(item, i) : approxItemHeight,
            reads: itemHeight ? 0 : MIN_READS,
            visible: !!itemHeight
          });

          if (footerFn) {
            var _value = footerFn(item, i, items);

            if (_value != null) {
              cells.push({
                i: j++,
                type: CELL_TYPE_FOOTER,
                value: _value,
                index: i,
                height: footerHeight ? footerHeight(_value, i) : approxFooterHeight,
                reads: footerHeight ? 0 : MIN_READS,
                visible: !!footerHeight
              });
            }
          }
        }

        return cells;
      };

      var _calcHeightIndex = function calcHeightIndex(buf, cells, index) {
        var acum = buf[index];

        for (var i = index; i < buf.length; i++) {
          buf[i] = acum;
          acum += cells[i].height;
        }

        return acum;
      };

      var resizeBuffer = function resizeBuffer(buf, len) {
        if (!buf) {
          return new Uint32Array(len);
        }

        if (buf.length === len) {
          return buf;
        } else if (len > buf.length) {
          var newBuf = new Uint32Array(len);
          newBuf.set(buf);
          return newBuf;
        } else {
          return buf.subarray(0, len);
        }
      };

      var positionForIndex = function positionForIndex(index, cells, heightIndex) {
        var cell = cells.find(function (c) {
          return c.type === CELL_TYPE_ITEM && c.index === index;
        });

        if (cell) {
          return heightIndex[cell.i];
        }

        return -1;
      };

      var virtualScrollCss = "ion-virtual-scroll{display:block;position:relative;width:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-virtual-scroll>.virtual-loading{opacity:0}ion-virtual-scroll>.virtual-item{position:absolute !important;top:0 !important;right:0 !important;left:0 !important;-webkit-transition-duration:0ms;transition-duration:0ms;will-change:transform}";

      var VirtualScroll = /*#__PURE__*/function () {
        function VirtualScroll(hostRef) {
          var _this = this;

          _classCallCheck(this, VirtualScroll);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.range = {
            offset: 0,
            length: 0
          };
          this.viewportHeight = 0;
          this.cells = [];
          this.virtualDom = [];
          this.isEnabled = false;
          this.viewportOffset = 0;
          this.currentScrollTop = 0;
          this.indexDirty = 0;
          this.lastItemLen = 0;
          this.totalHeight = 0;
          /**
           * It is important to provide this
           * if virtual item height will be significantly larger than the default
           * The approximate height of each virtual item template's cell.
           * This dimension is used to help determine how many cells should
           * be created when initialized, and to help calculate the height of
           * the scrollable area. This height value can only use `px` units.
           * Note that the actual rendered size of each cell comes from the
           * app's CSS, whereas this approximation is used to help calculate
           * initial dimensions before the item has been rendered.
           */

          this.approxItemHeight = 45;
          /**
           * The approximate height of each header template's cell.
           * This dimension is used to help determine how many cells should
           * be created when initialized, and to help calculate the height of
           * the scrollable area. This height value can only use `px` units.
           * Note that the actual rendered size of each cell comes from the
           * app's CSS, whereas this approximation is used to help calculate
           * initial dimensions before the item has been rendered.
           */

          this.approxHeaderHeight = 30;
          /**
           * The approximate width of each footer template's cell.
           * This dimension is used to help determine how many cells should
           * be created when initialized, and to help calculate the height of
           * the scrollable area. This height value can only use `px` units.
           * Note that the actual rendered size of each cell comes from the
           * app's CSS, whereas this approximation is used to help calculate
           * initial dimensions before the item has been rendered.
           */

          this.approxFooterHeight = 30;

          this.onScroll = function () {
            _this.updateVirtualScroll();
          };
        }

        _createClass(VirtualScroll, [{
          key: "itemsChanged",
          value: function itemsChanged() {
            this.calcCells();
            this.updateVirtualScroll();
          }
        }, {
          key: "connectedCallback",
          value: function () {
            var _connectedCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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

                      console.error('<ion-virtual-scroll> must be used inside an <ion-content>');
                      return _context.abrupt("return");

                    case 4:
                      _context.next = 6;
                      return contentEl.getScrollElement();

                    case 6:
                      this.scrollEl = _context.sent;
                      this.contentEl = contentEl;
                      this.calcCells();
                      this.updateState();

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
          key: "componentDidUpdate",
          value: function componentDidUpdate() {
            this.updateState();
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            this.scrollEl = undefined;
          }
        }, {
          key: "onResize",
          value: function onResize() {
            this.calcCells();
            this.updateVirtualScroll();
          }
          /**
           * Returns the position of the virtual item at the given index.
           */

        }, {
          key: "positionForItem",
          value: function positionForItem(index) {
            return Promise.resolve(positionForIndex(index, this.cells, this.getHeightIndex()));
          }
          /**
           * This method marks a subset of items as dirty, so they can be re-rendered. Items should be marked as
           * dirty any time the content or their style changes.
           *
           * The subset of items to be updated can are specifing by an offset and a length.
           */

        }, {
          key: "checkRange",
          value: function () {
            var _checkRange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(offset) {
              var len,
                  length,
                  cellIndex,
                  cells,
                  _args2 = arguments;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      len = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : -1;

                      if (this.items) {
                        _context2.next = 3;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 3:
                      length = len === -1 ? this.items.length - offset : len;
                      cellIndex = findCellIndex(this.cells, offset);
                      cells = _calcCells(this.items, this.itemHeight, this.headerHeight, this.footerHeight, this.headerFn, this.footerFn, this.approxHeaderHeight, this.approxFooterHeight, this.approxItemHeight, cellIndex, offset, length);
                      this.cells = inplaceUpdate(this.cells, cells, cellIndex);
                      this.lastItemLen = this.items.length;
                      this.indexDirty = Math.max(offset - 1, 0);
                      this.scheduleUpdate();

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function checkRange(_x) {
              return _checkRange.apply(this, arguments);
            }

            return checkRange;
          }()
          /**
           * This method marks the tail the items array as dirty, so they can be re-rendered.
           *
           * It's equivalent to calling:
           *
           * ```js
           * virtualScroll.checkRange(lastItemLen);
           * ```
           */

        }, {
          key: "checkEnd",
          value: function () {
            var _checkEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (this.items) {
                        this.checkRange(this.lastItemLen);
                      }

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));

            function checkEnd() {
              return _checkEnd.apply(this, arguments);
            }

            return checkEnd;
          }()
        }, {
          key: "updateVirtualScroll",
          value: function updateVirtualScroll() {
            // do nothing if virtual-scroll is disabled
            if (!this.isEnabled || !this.scrollEl) {
              return;
            } // unschedule future updates


            if (this.timerUpdate) {
              clearTimeout(this.timerUpdate);
              this.timerUpdate = undefined;
            } // schedule DOM operations into the stencil queue


            Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["f"])(this.readVS.bind(this));
            Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this.writeVS.bind(this));
          }
        }, {
          key: "readVS",
          value: function readVS() {
            var contentEl = this.contentEl,
                scrollEl = this.scrollEl,
                el = this.el;
            var topOffset = 0;
            var node = el;

            while (node && node !== contentEl) {
              topOffset += node.offsetTop;
              node = node.offsetParent;
            }

            this.viewportOffset = topOffset;

            if (scrollEl) {
              this.viewportHeight = scrollEl.offsetHeight;
              this.currentScrollTop = scrollEl.scrollTop;
            }
          }
        }, {
          key: "writeVS",
          value: function writeVS() {
            var dirtyIndex = this.indexDirty; // get visible viewport

            var scrollTop = this.currentScrollTop - this.viewportOffset;
            var viewport = getViewport(scrollTop, this.viewportHeight, 100); // compute lazily the height index

            var heightIndex = this.getHeightIndex(); // get array bounds of visible cells base in the viewport

            var range = getRange(heightIndex, viewport, 2); // fast path, do nothing

            var shouldUpdate = getShouldUpdate(dirtyIndex, this.range, range);

            if (!shouldUpdate) {
              return;
            }

            this.range = range; // in place mutation of the virtual DOM

            updateVDom(this.virtualDom, heightIndex, this.cells, range); // Write DOM
            // Different code paths taken depending of the render API used

            if (this.nodeRender) {
              doRender(this.el, this.nodeRender, this.virtualDom, this.updateCellHeight.bind(this));
            } else if (this.domRender) {
              this.domRender(this.virtualDom);
            } else if (this.renderItem) {
              Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["j"])(this);
            }
          }
        }, {
          key: "updateCellHeight",
          value: function updateCellHeight(cell, node) {
            var _this2 = this;

            var update = function update() {
              if (node['$ionCell'] === cell) {
                var style = window.getComputedStyle(node);
                var height = node.offsetHeight + parseFloat(style.getPropertyValue('margin-bottom'));

                _this2.setCellHeight(cell, height);
              }
            };

            if (node && node.componentOnReady) {
              node.componentOnReady().then(update);
            } else {
              update();
            }
          }
        }, {
          key: "setCellHeight",
          value: function setCellHeight(cell, height) {
            var index = cell.i; // the cell might changed since the height update was scheduled

            if (cell !== this.cells[index]) {
              return;
            }

            if (cell.height !== height || cell.visible !== true) {
              cell.visible = true;
              cell.height = height;
              this.indexDirty = Math.min(this.indexDirty, index);
              this.scheduleUpdate();
            }
          }
        }, {
          key: "scheduleUpdate",
          value: function scheduleUpdate() {
            var _this3 = this;

            clearTimeout(this.timerUpdate);
            this.timerUpdate = setTimeout(function () {
              return _this3.updateVirtualScroll();
            }, 100);
          }
        }, {
          key: "updateState",
          value: function updateState() {
            var shouldEnable = !!(this.scrollEl && this.cells);

            if (shouldEnable !== this.isEnabled) {
              this.enableScrollEvents(shouldEnable);

              if (shouldEnable) {
                this.updateVirtualScroll();
              }
            }
          }
        }, {
          key: "calcCells",
          value: function calcCells() {
            if (!this.items) {
              return;
            }

            this.lastItemLen = this.items.length;
            this.cells = _calcCells(this.items, this.itemHeight, this.headerHeight, this.footerHeight, this.headerFn, this.footerFn, this.approxHeaderHeight, this.approxFooterHeight, this.approxItemHeight, 0, 0, this.lastItemLen);
            this.indexDirty = 0;
          }
        }, {
          key: "getHeightIndex",
          value: function getHeightIndex() {
            if (this.indexDirty !== Infinity) {
              this.calcHeightIndex(this.indexDirty);
            }

            return this.heightIndex;
          }
        }, {
          key: "calcHeightIndex",
          value: function calcHeightIndex() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            // TODO: optimize, we don't need to calculate all the cells
            this.heightIndex = resizeBuffer(this.heightIndex, this.cells.length);
            this.totalHeight = _calcHeightIndex(this.heightIndex, this.cells, index);
            this.indexDirty = Infinity;
          }
        }, {
          key: "enableScrollEvents",
          value: function enableScrollEvents(shouldListen) {
            var _this4 = this;

            if (this.rmEvent) {
              this.rmEvent();
              this.rmEvent = undefined;
            }

            var scrollEl = this.scrollEl;

            if (scrollEl) {
              this.isEnabled = shouldListen;
              scrollEl.addEventListener('scroll', this.onScroll);

              this.rmEvent = function () {
                scrollEl.removeEventListener('scroll', _this4.onScroll);
              };
            }
          }
        }, {
          key: "renderVirtualNode",
          value: function renderVirtualNode(node) {
            var _node$cell = node.cell,
                type = _node$cell.type,
                value = _node$cell.value,
                index = _node$cell.index;

            switch (type) {
              case CELL_TYPE_ITEM:
                return this.renderItem(value, index);

              case CELL_TYPE_HEADER:
                return this.renderHeader(value, index);

              case CELL_TYPE_FOOTER:
                return this.renderFooter(value, index);
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _this5 = this;

            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              style: {
                height: "".concat(this.totalHeight, "px")
              }
            }, this.renderItem && Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(VirtualProxy, {
              dom: this.virtualDom
            }, this.virtualDom.map(function (node) {
              return _this5.renderVirtualNode(node);
            })));
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
              "itemHeight": ["itemsChanged"],
              "headerHeight": ["itemsChanged"],
              "footerHeight": ["itemsChanged"],
              "items": ["itemsChanged"]
            };
          }
        }]);

        return VirtualScroll;
      }();

      var VirtualProxy = function VirtualProxy(_ref, children, utils) {
        var dom = _ref.dom;
        return utils.map(children, function (child, i) {
          var node = dom[i];
          var vattrs = child.vattrs || {};
          var classes = vattrs["class"] || '';
          classes += 'virtual-item ';

          if (!node.visible) {
            classes += 'virtual-loading';
          }

          return Object.assign(Object.assign({}, child), {
            vattrs: Object.assign(Object.assign({}, vattrs), {
              "class": classes,
              style: Object.assign(Object.assign({}, vattrs.style), {
                transform: "translate3d(0,".concat(node.top, "px,0)")
              })
            })
          });
        });
      };

      VirtualScroll.style = virtualScrollCss;
      /***/
    }
  }]);
})();
//# sourceMappingURL=42-es5.js.map