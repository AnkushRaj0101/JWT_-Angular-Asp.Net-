import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }
  loginFormData = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  isUserValid: boolean = false;

  loginSubmit() {
    console.log("Login Form Trigger");
    this.authService.loginUser(this.loginFormData.value)
      .subscribe(res => {
        console.log(res);
        if (res == "Login Success") {
          console.log("Internal Server Error");
        }
        else if (res == "Failed to LoginIn") {
          this.isUserValid = false;
          alert("Invalid Credentials")
        }
        else {
          this.isUserValid = true;
          this.authService.setToken(res);
          this.route.navigateByUrl('/home')
          alert("Login Success")
        }
      })
  }
}
