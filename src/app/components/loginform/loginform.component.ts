import { Component } from '@angular/core';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/state/effects/user.effect';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginformComponent {
  user: User = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.user.email, this.user.password);
  }
}
