import { browser, by, element } from 'protractor';
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    AppPage.prototype.navigateTo = function (destination) {
        return browser.get(destination);
    };
    AppPage.prototype.getTitle = function () {
        return browser.getTitle();
    };
    AppPage.prototype.getPageOneTitleText = function () {
        return element(by.tagName('app-home')).element(by.deepCss('ion-title')).getText();
    };
    return AppPage;
}());
export { AppPage };
//# sourceMappingURL=app.po.js.map