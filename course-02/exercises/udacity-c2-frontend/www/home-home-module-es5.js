(function () {
  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"], {
    /***/
    "Qdjc":
    /*!********************************************************!*\
      !*** ./src/app/feed/services/feed.provider.service.ts ***!
      \********************************************************/

    /*! exports provided: FeedProviderService */

    /***/
    function Qdjc(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedProviderService", function () {
        return FeedProviderService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _api_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../api/api.service */
      "yZrb");

      var FeedProviderService = /*#__PURE__*/function () {
        function FeedProviderService(api) {
          _classCallCheck(this, FeedProviderService);

          this.api = api;
          this.currentFeed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        }

        _createClass(FeedProviderService, [{
          key: "getFeed",
          value: function getFeed() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var req, items;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.api.get('/feed');

                    case 2:
                      req = _context.sent;
                      items = req.rows;
                      this.currentFeed$.next(items);
                      return _context.abrupt("return", Promise.resolve(this.currentFeed$));

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "uploadFeedItem",
          value: function uploadFeedItem(caption, file) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var res, feed;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.api.upload('/feed', file, {
                        caption: caption,
                        url: file.name
                      });

                    case 2:
                      res = _context2.sent;
                      feed = [res].concat(_toConsumableArray(this.currentFeed$.value));
                      this.currentFeed$.next(feed);
                      return _context2.abrupt("return", res);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }]);

        return FeedProviderService;
      }();

      FeedProviderService.ɵfac = function FeedProviderService_Factory(t) {
        return new (t || FeedProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]));
      };

      FeedProviderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: FeedProviderService,
        factory: FeedProviderService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FeedProviderService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _api_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "aCSF":
    /*!*************************************************************************************!*\
      !*** ./src/app/feed/feed-upload/feed-upload-button/feed-upload-button.component.ts ***!
      \*************************************************************************************/

    /*! exports provided: FeedUploadButtonComponent */

    /***/
    function aCSF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedUploadButtonComponent", function () {
        return FeedUploadButtonComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _feed_upload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../feed-upload.component */
      "hlxW");
      /* harmony import */


      var src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/auth/services/auth.service */
      "N/25");

      var FeedUploadButtonComponent = /*#__PURE__*/function () {
        function FeedUploadButtonComponent(modalController, auth) {
          _classCallCheck(this, FeedUploadButtonComponent);

          this.modalController = modalController;
          this.auth = auth;
        }

        _createClass(FeedUploadButtonComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.auth.currentUser$.subscribe(function (user) {
              _this.isLoggedIn = user !== null;
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.loginSub) {
              this.loginSub.unsubscribe();
            }
          }
        }, {
          key: "presentUploadForm",
          value: function presentUploadForm(ev) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var modal;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.modalController.create({
                        component: _feed_upload_component__WEBPACK_IMPORTED_MODULE_3__["FeedUploadComponent"]
                      });

                    case 2:
                      modal = _context3.sent;
                      _context3.next = 5;
                      return modal.present();

                    case 5:
                      return _context3.abrupt("return", _context3.sent);

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return FeedUploadButtonComponent;
      }();

      FeedUploadButtonComponent.ɵfac = function FeedUploadButtonComponent_Factory(t) {
        return new (t || FeedUploadButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]));
      };

      FeedUploadButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: FeedUploadButtonComponent,
        selectors: [["app-feed-upload-button"]],
        decls: 2,
        vars: 1,
        consts: [["color", "primary", "type", "submit", 3, "disabled", "click"]],
        template: function FeedUploadButtonComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-button", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FeedUploadButtonComponent_Template_ion_button_click_0_listener($event) {
              return ctx.presentUploadForm($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Create a New Post\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.isLoggedIn);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonButton"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWVkLXVwbG9hZC1idXR0b24uY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FeedUploadButtonComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
          args: [{
            selector: 'app-feed-upload-button',
            templateUrl: './feed-upload-button.component.html',
            styleUrls: ['./feed-upload-button.component.scss']
          }]
        }], function () {
          return [{
            type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
          }, {
            type: src_app_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "ct+p":
    /*!*************************************!*\
      !*** ./src/app/home/home.module.ts ***!
      \*************************************/

    /*! exports provided: HomePageModule */

    /***/
    function ctP(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HomePageModule", function () {
        return HomePageModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _feed_feed_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../feed/feed.module */
      "xQww");
      /* harmony import */


      var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./home.page */
      "zpKS");

      var HomePageModule = function HomePageModule() {
        _classCallCheck(this, HomePageModule);
      };

      HomePageModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: HomePageModule
      });
      HomePageModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function HomePageModule_Factory(t) {
          return new (t || HomePageModule)();
        },
        imports: [[_feed_feed_module__WEBPACK_IMPORTED_MODULE_5__["FeedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([{
          path: '',
          component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
        }])]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HomePageModule, {
          declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]],
          imports: [_feed_feed_module__WEBPACK_IMPORTED_MODULE_5__["FeedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomePageModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_feed_feed_module__WEBPACK_IMPORTED_MODULE_5__["FeedModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([{
              path: '',
              component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
            }])],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "hlxW":
    /*!***********************************************************!*\
      !*** ./src/app/feed/feed-upload/feed-upload.component.ts ***!
      \***********************************************************/

    /*! exports provided: FeedUploadComponent */

    /***/
    function hlxW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedUploadComponent", function () {
        return FeedUploadComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/feed.provider.service */
      "Qdjc");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      function FeedUploadComponent_img_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 7);
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.previewDataUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        }
      }

      function FeedUploadComponent_a_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Select a Photo ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var FeedUploadComponent = /*#__PURE__*/function () {
        function FeedUploadComponent(feed, formBuilder, loadingController, modalController) {
          _classCallCheck(this, FeedUploadComponent);

          this.feed = feed;
          this.formBuilder = formBuilder;
          this.loadingController = loadingController;
          this.modalController = modalController;
        }

        _createClass(FeedUploadComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.uploadForm = this.formBuilder.group({
              caption: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
            });
          }
        }, {
          key: "setPreviewDataUrl",
          value: function setPreviewDataUrl(file) {
            var _this2 = this;

            var reader = new FileReader();

            reader.onloadend = function () {
              _this2.previewDataUrl = reader.result;
            };

            reader.readAsDataURL(file);
          }
        }, {
          key: "selectImage",
          value: function selectImage(event) {
            var file = event.srcElement.files;

            if (!file) {
              return;
            }

            this.file = file[0];
            this.setPreviewDataUrl(this.file);
          }
        }, {
          key: "onSubmit",
          value: function onSubmit($event) {
            var _this3 = this;

            $event.preventDefault();
            this.loadingController.create();

            if (!this.uploadForm.valid || !this.file) {
              return;
            }

            this.feed.uploadFeedItem(this.uploadForm.controls.caption.value, this.file).then(function (result) {
              _this3.modalController.dismiss();

              _this3.loadingController.dismiss();
            });
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }]);

        return FeedUploadComponent;
      }();

      FeedUploadComponent.ɵfac = function FeedUploadComponent_Factory(t) {
        return new (t || FeedUploadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__["FeedProviderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]));
      };

      FeedUploadComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: FeedUploadComponent,
        selectors: [["app-feed-upload"]],
        decls: 12,
        vars: 4,
        consts: [[3, "formGroup", "submit"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], ["style", "width:50px; height: 50px;", 3, "src", 4, "ngIf"], ["ion-button", "", "color", "secondary", 4, "ngIf"], ["position", "floating", "color", "primary"], ["type", "text", "formControlName", "caption", "required", ""], ["color", "primary", "type", "submit", 3, "disabled"], [2, "width", "50px", "height", "50px", 3, "src"], ["ion-button", "", "color", "secondary"]],
        template: function FeedUploadComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function FeedUploadComponent_Template_form_submit_0_listener($event) {
              return ctx.onSubmit($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "` ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FeedUploadComponent_Template_input_change_3_listener($event) {
              return ctx.selectImage($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, FeedUploadComponent_img_4_Template, 1, 1, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FeedUploadComponent_a_5_Template, 2, 0, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ion-label", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Caption");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "ion-input", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ion-button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Post ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.uploadForm);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.previewDataUrl);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.previewDataUrl);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.uploadForm.valid || !ctx.file);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonItem"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonLabel"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInput"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["TextValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["RequiredValidator"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonButton"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWVkLXVwbG9hZC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeedUploadComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-feed-upload',
            templateUrl: './feed-upload.component.html',
            styleUrls: ['./feed-upload.component.scss']
          }]
        }], function () {
          return [{
            type: _services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__["FeedProviderService"]
          }, {
            type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]
          }, {
            type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]
          }, {
            type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "jcpa":
    /*!*******************************************************!*\
      !*** ./src/app/feed/feed-item/feed-item.component.ts ***!
      \*******************************************************/

    /*! exports provided: FeedItemComponent */

    /***/
    function jcpa(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedItemComponent", function () {
        return FeedItemComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");

      function FeedItemComponent_ion_card_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-card", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ion-img", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ion-card-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.feedItem.url);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.feedItem.caption);
        }
      }

      var FeedItemComponent = /*#__PURE__*/function () {
        function FeedItemComponent() {
          _classCallCheck(this, FeedItemComponent);
        }

        _createClass(FeedItemComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return FeedItemComponent;
      }();

      FeedItemComponent.ɵfac = function FeedItemComponent_Factory(t) {
        return new (t || FeedItemComponent)();
      };

      FeedItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: FeedItemComponent,
        selectors: [["app-feed-item"]],
        inputs: {
          feedItem: "feedItem"
        },
        decls: 1,
        vars: 1,
        consts: [["class", "photo-card", 4, "ngIf"], [1, "photo-card"], [3, "src"]],
        template: function FeedItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FeedItemComponent_ion_card_0_Template, 5, 2, "ion-card", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.feedItem);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonCard"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonImg"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonCardContent"]],
        styles: [".photo-card[_ngcontent-%COMP%] {\n  max-width: 500px;\n  overflow: hidden;\n  background: var(--ion-color-primary-contrast);\n  margin: 30px 0px;\n}\n\n.photo-card[_ngcontent-%COMP%]   ion-img[_ngcontent-%COMP%] {\n  max-height: 532px;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlZWQtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2Q0FBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDRiIsImZpbGUiOiJmZWVkLWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGhvdG8tY2FyZHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgIG1hcmdpbjogMzBweCAwcHg7XG4gIH1cblxuLnBob3RvLWNhcmQgaW9uLWltZyB7XG4gIG1heC1oZWlnaHQ6IDUzMnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgIFxufVxuIl19 */"],
        changeDetection: 0
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeedItemComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-feed-item',
            templateUrl: './feed-item.component.html',
            styleUrls: ['./feed-item.component.scss'],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
          }]
        }], function () {
          return [];
        }, {
          feedItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }]
        });
      })();
      /***/

    },

    /***/
    "rMwG":
    /*!*******************************************************!*\
      !*** ./src/app/feed/feed-list/feed-list.component.ts ***!
      \*******************************************************/

    /*! exports provided: FeedListComponent */

    /***/
    function rMwG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedListComponent", function () {
        return FeedListComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/feed.provider.service */
      "Qdjc");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../feed-item/feed-item.component */
      "jcpa");

      function FeedListComponent_app_feed_item_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-feed-item", 2);
        }

        if (rf & 2) {
          var item_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("feedItem", item_r1);
        }
      }

      var FeedListComponent = /*#__PURE__*/function () {
        function FeedListComponent(feed) {
          _classCallCheck(this, FeedListComponent);

          this.feed = feed;
          this.subscriptions = [];
        }

        _createClass(FeedListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this4 = this;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      this.subscriptions.push(this.feed.currentFeed$.subscribe(function (items) {
                        _this4.feedItems = items;
                      }));
                      _context4.next = 3;
                      return this.feed.getFeed();

                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            var _iterator = _createForOfIteratorHelper(this.subscriptions),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var subscription = _step.value;
                subscription.unsubscribe();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }]);

        return FeedListComponent;
      }();

      FeedListComponent.ɵfac = function FeedListComponent_Factory(t) {
        return new (t || FeedListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__["FeedProviderService"]));
      };

      FeedListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: FeedListComponent,
        selectors: [["app-feed-list"]],
        inputs: {
          feedItems: "feedItems"
        },
        decls: 2,
        vars: 1,
        consts: [[1, "feed"], [3, "feedItem", 4, "ngFor", "ngForOf"], [3, "feedItem"]],
        template: function FeedListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, FeedListComponent_app_feed_item_1_Template, 1, 1, "app-feed-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.feedItems);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_4__["FeedItemComponent"]],
        styles: [".feed[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: var(--ion-color-light-tint);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlZWQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUNBQUE7QUFBSiIsImZpbGUiOiJmZWVkLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgLmZlZWQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcbiAgfSJdfQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FeedListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
          args: [{
            selector: 'app-feed-list',
            templateUrl: './feed-list.component.html',
            styleUrls: ['./feed-list.component.scss']
          }]
        }], function () {
          return [{
            type: _services_feed_provider_service__WEBPACK_IMPORTED_MODULE_2__["FeedProviderService"]
          }];
        }, {
          feedItems: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
          }]
        });
      })();
      /***/

    },

    /***/
    "xQww":
    /*!*************************************!*\
      !*** ./src/app/feed/feed.module.ts ***!
      \*************************************/

    /*! exports provided: FeedModule */

    /***/
    function xQww(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FeedModule", function () {
        return FeedModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./feed-list/feed-list.component */
      "rMwG");
      /* harmony import */


      var _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./feed-item/feed-item.component */
      "jcpa");
      /* harmony import */


      var _feed_upload_feed_upload_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./feed-upload/feed-upload.component */
      "hlxW");
      /* harmony import */


      var _feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./feed-upload/feed-upload-button/feed-upload-button.component */
      "aCSF");
      /* harmony import */


      var _services_feed_provider_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./services/feed.provider.service */
      "Qdjc");

      var entryComponents = [_feed_upload_feed_upload_component__WEBPACK_IMPORTED_MODULE_6__["FeedUploadComponent"]];
      var components = [_feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__["FeedListComponent"], _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_5__["FeedItemComponent"], _feed_upload_feed_upload_component__WEBPACK_IMPORTED_MODULE_6__["FeedUploadComponent"], _feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_7__["FeedUploadButtonComponent"]];

      var FeedModule = function FeedModule() {
        _classCallCheck(this, FeedModule);
      };

      FeedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: FeedModule
      });
      FeedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function FeedModule_Factory(t) {
          return new (t || FeedModule)();
        },
        providers: [_services_feed_provider_service__WEBPACK_IMPORTED_MODULE_8__["FeedProviderService"]],
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FeedModule, {
          declarations: [_feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__["FeedListComponent"], _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_5__["FeedItemComponent"], _feed_upload_feed_upload_component__WEBPACK_IMPORTED_MODULE_6__["FeedUploadComponent"], _feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_7__["FeedUploadButtonComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]],
          exports: [_feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__["FeedListComponent"], _feed_item_feed_item_component__WEBPACK_IMPORTED_MODULE_5__["FeedItemComponent"], _feed_upload_feed_upload_component__WEBPACK_IMPORTED_MODULE_6__["FeedUploadComponent"], _feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_7__["FeedUploadButtonComponent"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeedModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]],
            declarations: components,
            exports: components,
            entryComponents: entryComponents,
            providers: [_services_feed_provider_service__WEBPACK_IMPORTED_MODULE_8__["FeedProviderService"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zpKS":
    /*!***********************************!*\
      !*** ./src/app/home/home.page.ts ***!
      \***********************************/

    /*! exports provided: HomePage */

    /***/
    function zpKS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HomePage", function () {
        return HomePage;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../environments/environment */
      "AytR");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _feed_feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../feed/feed-upload/feed-upload-button/feed-upload-button.component */
      "aCSF");
      /* harmony import */


      var _feed_feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../feed/feed-list/feed-list.component */
      "rMwG");

      var HomePage = function HomePage() {
        _classCallCheck(this, HomePage);

        this.appName = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].appName;
      };

      HomePage.ɵfac = function HomePage_Factory(t) {
        return new (t || HomePage)();
      };

      HomePage.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: HomePage,
        selectors: [["app-home"]],
        decls: 3,
        vars: 0,
        template: function HomePage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-feed-upload-button");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-feed-list");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], _feed_feed_upload_feed_upload_button_feed_upload_button_component__WEBPACK_IMPORTED_MODULE_3__["FeedUploadButtonComponent"], _feed_feed_list_feed_list_component__WEBPACK_IMPORTED_MODULE_4__["FeedListComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyJ9 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomePage, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
          }]
        }], null, null);
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=home-home-module-es5.js.map