import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snake: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    // alert("submit");
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user is required');
      this.snake.open('Username is required', '', {
        duration: 3000,
        // verticalPosition: 'top',
        // horizontalPosition: 'right',
      });
      return;
    }

    // addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        // alert('success');
        Swal.fire('Success', 'User ID is ' + data.id, 'success');
      },
      (error) => {
        //error
        console.log(error);
        // alert('something went wrong');
        this.snake.open('something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }
}
