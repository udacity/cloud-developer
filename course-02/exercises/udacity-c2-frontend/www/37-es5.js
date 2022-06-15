(function () {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37], {
    /***/
    "TpdJ":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js ***!
      \**************************************************************/

    /*! exports provided: ion_tab, ion_tabs */

    /***/
    function TpdJ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_tab", function () {
        return Tab;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_tabs", function () {
        return Tabs;
      });
      /* harmony import */


      var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-e806d1f6.js */
      "A36C");
      /* harmony import */


      var _framework_delegate_4584ab5a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./framework-delegate-4584ab5a.js */
      "ZaV5");

      var tabCss = ":host(.tab-hidden){display:none !important}";

      var Tab = /*#__PURE__*/function () {
        function Tab(hostRef) {
          _classCallCheck(this, Tab);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.loaded = false;
          /** @internal */

          this.active = false;
        }

        _createClass(Tab, [{
          key: "componentWillLoad",
          value: function () {
            var _componentWillLoad = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!this.active) {
                        _context.next = 3;
                        break;
                      }

                      _context.next = 3;
                      return this.setActive();

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function componentWillLoad() {
              return _componentWillLoad.apply(this, arguments);
            }

            return componentWillLoad;
          }()
          /** Set the active component for the tab */

        }, {
          key: "setActive",
          value: function () {
            var _setActive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.prepareLazyLoaded();

                    case 2:
                      this.active = true;

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function setActive() {
              return _setActive.apply(this, arguments);
            }

            return setActive;
          }()
        }, {
          key: "changeActive",
          value: function changeActive(isActive) {
            if (isActive) {
              this.prepareLazyLoaded();
            }
          }
        }, {
          key: "prepareLazyLoaded",
          value: function prepareLazyLoaded() {
            if (!this.loaded && this.component != null) {
              this.loaded = true;

              try {
                return Object(_framework_delegate_4584ab5a_js__WEBPACK_IMPORTED_MODULE_1__["a"])(this.delegate, this.el, this.component, ['ion-page']);
              } catch (e) {
                console.error(e);
              }
            }

            return Promise.resolve(undefined);
          }
        }, {
          key: "render",
          value: function render() {
            var tab = this.tab,
                active = this.active,
                component = this.component;
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              role: "tabpanel",
              "aria-hidden": !active ? 'true' : null,
              "aria-labelledby": "tab-button-".concat(tab),
              "class": {
                'ion-page': component === undefined,
                'tab-hidden': !active
              }
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
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
              "active": ["changeActive"]
            };
          }
        }]);

        return Tab;
      }();

      Tab.style = tabCss;
      var tabsCss = ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner{position:relative;-ms-flex:1;flex:1;contain:layout size style}";

      var Tabs = /*#__PURE__*/function () {
        function Tabs(hostRef) {
          var _this = this;

          _classCallCheck(this, Tabs);

          Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionNavWillLoad = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionNavWillLoad", 7);
          this.ionTabsWillChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionTabsWillChange", 3);
          this.ionTabsDidChange = Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionTabsDidChange", 3);
          this.transitioning = false;
          /** @internal */

          this.useRouter = false;

          this.onTabClicked = function (ev) {
            var _ev$detail = ev.detail,
                href = _ev$detail.href,
                tab = _ev$detail.tab;

            if (_this.useRouter && href !== undefined) {
              var router = document.querySelector('ion-router');

              if (router) {
                router.push(href);
              }
            } else {
              _this.select(tab);
            }
          };
        }

        _createClass(Tabs, [{
          key: "componentWillLoad",
          value: function () {
            var _componentWillLoad2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var tabs;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!this.useRouter) {
                        this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
                      }

                      if (this.useRouter) {
                        _context3.next = 6;
                        break;
                      }

                      tabs = this.tabs;

                      if (!(tabs.length > 0)) {
                        _context3.next = 6;
                        break;
                      }

                      _context3.next = 6;
                      return this.select(tabs[0]);

                    case 6:
                      this.ionNavWillLoad.emit();

                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));

            function componentWillLoad() {
              return _componentWillLoad2.apply(this, arguments);
            }

            return componentWillLoad;
          }()
        }, {
          key: "componentWillRender",
          value: function componentWillRender() {
            var tabBar = this.el.querySelector('ion-tab-bar');

            if (tabBar) {
              var tab = this.selectedTab ? this.selectedTab.tab : undefined;
              tabBar.selectedTab = tab;
            }
          }
          /**
           * Select a tab by the value of its `tab` property or an element reference.
           *
           * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
           */

        }, {
          key: "select",
          value: function () {
            var _select = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tab) {
              var selectedTab;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      selectedTab = _getTab(this.tabs, tab);

                      if (this.shouldSwitch(selectedTab)) {
                        _context4.next = 3;
                        break;
                      }

                      return _context4.abrupt("return", false);

                    case 3:
                      _context4.next = 5;
                      return this.setActive(selectedTab);

                    case 5:
                      _context4.next = 7;
                      return this.notifyRouter();

                    case 7:
                      this.tabSwitch();
                      return _context4.abrupt("return", true);

                    case 9:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));

            function select(_x) {
              return _select.apply(this, arguments);
            }

            return select;
          }()
          /**
           * Get a specific tab by the value of its `tab` property or an element reference.
           *
           * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
           */

        }, {
          key: "getTab",
          value: function () {
            var _getTab2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(tab) {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      return _context5.abrupt("return", _getTab(this.tabs, tab));

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));

            function getTab(_x2) {
              return _getTab2.apply(this, arguments);
            }

            return getTab;
          }()
          /**
           * Get the currently selected tab.
           */

        }, {
          key: "getSelected",
          value: function getSelected() {
            return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
          }
          /** @internal */

        }, {
          key: "setRouteId",
          value: function () {
            var _setRouteId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
              var _this2 = this;

              var selectedTab;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      selectedTab = _getTab(this.tabs, id);

                      if (this.shouldSwitch(selectedTab)) {
                        _context6.next = 3;
                        break;
                      }

                      return _context6.abrupt("return", {
                        changed: false,
                        element: this.selectedTab
                      });

                    case 3:
                      _context6.next = 5;
                      return this.setActive(selectedTab);

                    case 5:
                      return _context6.abrupt("return", {
                        changed: true,
                        element: this.selectedTab,
                        markVisible: function markVisible() {
                          return _this2.tabSwitch();
                        }
                      });

                    case 6:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));

            function setRouteId(_x3) {
              return _setRouteId.apply(this, arguments);
            }

            return setRouteId;
          }()
          /** @internal */

        }, {
          key: "getRouteId",
          value: function () {
            var _getRouteId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var tabId;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      tabId = this.selectedTab && this.selectedTab.tab;
                      return _context7.abrupt("return", tabId !== undefined ? {
                        id: tabId,
                        element: this.selectedTab
                      } : undefined);

                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));

            function getRouteId() {
              return _getRouteId.apply(this, arguments);
            }

            return getRouteId;
          }()
        }, {
          key: "setActive",
          value: function setActive(selectedTab) {
            if (this.transitioning) {
              return Promise.reject('transitioning already happening');
            }

            this.transitioning = true;
            this.leavingTab = this.selectedTab;
            this.selectedTab = selectedTab;
            this.ionTabsWillChange.emit({
              tab: selectedTab.tab
            });
            selectedTab.active = true;
            return Promise.resolve();
          }
        }, {
          key: "tabSwitch",
          value: function tabSwitch() {
            var selectedTab = this.selectedTab;
            var leavingTab = this.leavingTab;
            this.leavingTab = undefined;
            this.transitioning = false;

            if (!selectedTab) {
              return;
            }

            if (leavingTab !== selectedTab) {
              if (leavingTab) {
                leavingTab.active = false;
              }

              this.ionTabsDidChange.emit({
                tab: selectedTab.tab
              });
            }
          }
        }, {
          key: "notifyRouter",
          value: function notifyRouter() {
            if (this.useRouter) {
              var router = document.querySelector('ion-router');

              if (router) {
                return router.navChanged('forward');
              }
            }

            return Promise.resolve(false);
          }
        }, {
          key: "shouldSwitch",
          value: function shouldSwitch(selectedTab) {
            var leavingTab = this.selectedTab;
            return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
          }
        }, {
          key: "render",
          value: function render() {
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              onIonTabButtonClick: this.onTabClicked
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "top"
            }), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "tabs-inner"
            }, Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "bottom"
            }));
          }
        }, {
          key: "tabs",
          get: function get() {
            return Array.from(this.el.querySelectorAll('ion-tab'));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);

        return Tabs;
      }();

      var _getTab = function _getTab(tabs, tab) {
        var tabEl = typeof tab === 'string' ? tabs.find(function (t) {
          return t.tab === tab;
        }) : tab;

        if (!tabEl) {
          console.error("tab with id: \"".concat(tabEl, "\" does not exist"));
        }

        return tabEl;
      };

      Tabs.style = tabsCss;
      /***/
    }
  }]);
})();
//# sourceMappingURL=37-es5.js.map