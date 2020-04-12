import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
                    | UrlTree
                    | Observable<boolean
                    | UrlTree>
                    | Promise<boolean | UrlTree> {
   if (!this.auth.currentUser$.value) {
      this.router.navigateByUrl('/login');
    }

    return this.auth.currentUser$.value !== null;
    }

}

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
