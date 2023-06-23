import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url
  JwtHelperService = new JwtHelperService();

  constructor(private route: Router,
    private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  registerUser(data: any) {
    console.log(data);
    return this.http.post(this.baseUrl + "/api/user/register", data)
  }

  loginUser(data: any) {
    console.log(data);
    return this.http.post(this.baseUrl + "/api/user/login", data, { responseType: 'text' })
  }

  setToken(token: string) {
    localStorage.setItem("token", token)
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem("token");
    const userInfo = token != null ? this.JwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      id: userInfo.id,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      mobilenumber: userInfo.mobilenumber,
      gender: userInfo.gender
    } : null
    console.log(data);
    this.currentUser.next(data);
  }

  //canActivte ke liye use kia .
  isLogeedIn(): boolean {
    return localStorage.getItem("token") ? true : false
  }
  removeToken() {
    localStorage.removeItem("token")
    this.route.navigateByUrl('/login')
  }
}
