import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (!this.auth.currentUser$.value) {
            this.router.navigateByUrl('/login');
        }
        return this.auth.currentUser$.value !== null;
    };
    AuthGuardService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            Router])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { Events } from '@ionic/angular';
// import { AmplifyService } from 'aws-amplify-angular';
// import { CognitoUser } from 'amazon-cognito-identity-js';
// import { AuthState } from 'aws-amplify-angular/dist/src/providers/auth.state';
// import { BehaviorSubject } from 'rxjs';
// import { Auth } from 'aws-amplify';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {
//   authState: AuthState;
//   loggedIn = false;
//   loggedInChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (this.loggedIn);
//   currentUser: CognitoUser;
//   constructor(
//     public router: Router,
//     public events: Events,
//     public amplify: AmplifyService
//     ) {
//       this.amplify.authStateChange$
//           .subscribe(async (authState) => {
//             if (authState) {
//               this.loggedIn = authState.state === 'signedIn';
//               this.loggedInChanged$.next(this.loggedIn);
//               this.authState = authState;
//               this.events.publish('data:AuthState', this.authState);
//               this.currentUser = await Auth.currentAuthenticatedUser();
//             }
//           });
//     }
//   retry() {
//   }
//   canActivate() {
//     if (!this.loggedIn) {
//       this.router.navigateByUrl('/signin');
//     }
//     return this.loggedIn;
//   }
//   signOut() {
//     return this.amplify.auth().signOut().then(() => {
//       window.location.href = '/#/signin';
//       // TODO maybe additional cleanup
//     });
//   }
//   init() {
//     return;
//   }
// }
//# sourceMappingURL=auth.guard.service.js.map