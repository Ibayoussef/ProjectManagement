import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  signupFailure,
  signupRequest,
  signupSuccess,
} from '../actions/user.actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { AuthHttpService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';

@Injectable()
export class AuthService {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      exhaustMap((action) =>
        this.authHttpService.loginService(action.email, action.password).pipe(
          map(({ token }) => {
            return loginSuccess({ token: token });
          }),
          catchError(async (error) => loginFailure({ errors: error.message }))
        )
      )
    )
  );
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupRequest),
      exhaustMap((action) =>
        this.authHttpService.signupService(action.email, action.password).pipe(
          map(() => {
            return signupSuccess();
          }),
          tap(() =>
            this.notifyService.showSuccess(
              'Account Created Successfully !!',
              ''
            )
          ),
          tap(() => this.router.navigate(['/login'])),
          catchError(async (error) => {
            this.notifyService.showError('Account Creation Failed !!', '');
            return signupFailure({ errors: error?.error?.$values });
          })
        )
      )
    )
  );

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsersRequest),
      exhaustMap(() =>
        this.authHttpService.fetchUsersService().pipe(
          map((res) => {
            return fetchUsersSuccess({ users: res.$values });
          }),
          catchError(async (error) => {
            return signupFailure({ errors: error?.error?.$values });
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() =>
          this.notifyService.showSuccess('Logged In Successfully !!', '')
        ),
        tap(() => this.router.navigate(['/dashboard/projects']))
      ),
    { dispatch: false }
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  constructor(
    private notifyService: NotificationService,
    private authHttpService: AuthHttpService,
    private actions$: Actions,
    private store: Store,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.store.dispatch(loginRequest({ email, password }));
  }
  signup(email: string, password: string) {
    this.store.dispatch(signupRequest({ email, password }));
  }
  logout() {
    this.store.dispatch(logout());
  }
  fetchUsers() {
    this.store.dispatch(fetchUsersRequest());
  }
}
