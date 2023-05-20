import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/state/effects/user.effect';
import { selectUserError } from 'src/app/state/selectors/userErrors.selector';
@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss'],
})
export class SignupformComponent {
  errors$: Observable<any | null>;
  user: User = { email: '', password: '' };

  constructor(private authService: AuthService, private store: Store) {
    this.errors$ = this.store.select(selectUserError);
  }

  onSubmit() {
    this.authService.signup(this.user.email, this.user.password);
  }
}
