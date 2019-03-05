import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email = new FormControl(null, [Validators.required, Validators.email]);
password = new FormControl(null, [Validators.required]);
  constructor(private httpService: HttpService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  getErrorForEmail() {
    return this.email.hasError('required') ? 'This field is required' : 
    this.email.hasError('email')? 'Please provide valid email' : '';
  }
  getErrorForPassword() {
    return this.email.hasError('required') ? 'This field is required' : '';
  }

  login() {
    var user = {
      email: this.email.value,
      password: this.password.value
    }
    var contentBody = { url: "/login", body: user }
  this.httpService.httpPost(contentBody, false).subscribe(response => {
    console.log("success ", response);
    // this.spinnerService.hide();
    localStorage.setItem('token', response["token"]);
    this.openSnackBar(response["message"]);
    this.router.navigate(['home/masters/controltest'])

  }, error => {
    console.log("error ", error);
    // this.spinnerService.hide();
    this.openSnackBar(error.error.message);
  })
}
openSnackBar(message: string) {
  this.snackbar.open(message, null, {
    duration: 2000
  });
 }

}
