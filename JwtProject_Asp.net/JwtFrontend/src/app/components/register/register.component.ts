import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    firstname:new FormControl(""),
    lastname:new FormControl(""),
    email:new FormControl(""),
    mobilenumber:new FormControl(""),
    gender:new FormControl(""),
    passsword:new FormControl(""),
    confirmPassword:new FormControl(""),
  });

  registerSubmit()
  {
    if(this.registerForm.value.passsword===this.registerForm.value.confirmPassword){
      this.authService.registerUser(this.registerForm.value).subscribe(res=>{
        console.log(res);
        if(res==null)
        alert("Something went wrong")
        else if(res!=null){
        alert("Registerd SuccessFully");
        this.route.navigateByUrl('/login')
      }
        else
        alert("Another Problem")


      })
    }
    else
    alert("Password Should Match");
  }

}
