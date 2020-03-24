import { AppPage } from './app.po';
describe('new App', function () {
    var page;
    beforeEach(function () {
        page = new AppPage();
    });
    describe('default screen', function () {
        beforeEach(function () {
            page.navigateTo('/home');
        });
        it('should have a title saying Home', function () {
            page.getPageOneTitleText().then(function (title) {
                expect(title).toEqual('Home');
            });
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map