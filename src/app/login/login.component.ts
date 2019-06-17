import { UserService } from './../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';

interface LoginResponse{
  idToken:	string;	
  kind:	string	;
  email:	string;	
  refreshToken:	string;
  expiresIn:	string;
  localId:	string	;
  registered:	boolean;	
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpClient]
})
export class LoginComponent implements OnInit {
    
  
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email= form.value.email;
    const password= form.value.password;
    form.reset();
    return this.http.post<LoginResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCGPJYqKCees7StHPUUGVHvNv_J-D92qQM', {
      email: email,
      password: password,
      returnSecureToken: true
    }).subscribe(
      resData => {
        console.log(resData);
        if(this.userService.getUserData(email).role==='Faculty')
          this.router.navigate(['/faculty']);
        if(this.userService.getUserData(email).role==='Trainee')
          this.router.navigate(['/batch']);
      }, 
      error => {console.log(error)});     
  }


}
