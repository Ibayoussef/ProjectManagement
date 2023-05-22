import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  loginService(email: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:5071/api/Auth/Login',
      {
        email: email,
        password: password,
      }
    );
  }
  signupService(email: string, password: string) {
    return this.http.post<any>('http://localhost:5071/api/Auth/Register', {
      email: email,
      password: password,
    });
  }
  fetchUsersService() {
    return this.http.get<any>('http://localhost:5071/api/Auth/Users');
  }
}
