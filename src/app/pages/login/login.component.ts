import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  constructor(private snack: MatSnackBar, private login: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log('login form submitted.');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('username is required', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('password is required', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);

          //redirect if ADMIN then admin-dashboard else if NORMAL then normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            // admin dashboard
            window.location.href = '/admin';
          } else if (this.login.getUserRole() == 'NORMAL') {
            // normal user-dashboard
            window.location.href = '/user-dashboard';
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error');
        console.log(error);
        this.snack.open('Invalid credentials. Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
