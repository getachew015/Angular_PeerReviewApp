import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/user.model';


@Injectable({providedIn: 'root'})
export class UserService {
    userData = new EventEmitter<UserModel>();
    private users: UserModel[] = [];

    constructor( private http: HttpClient ){ 
        this.http.get<UserModel[]>('https://peerreviewapp-203bf.firebaseio.com/user.json').subscribe(
            usersData => {
              this.users=Object.values(usersData);
            }
          );
    }
    
    saveUserData(user: UserModel){
        this.createAuthentication(user.email, user.password).subscribe(
            resData => {console.log(resData)},
            error => {console.log(error)}
        );

         this.http.post('https://peerreviewapp-203bf.firebaseio.com/user.json',user).subscribe();
    }

    createAuthentication(email: string, password: string){
        return this.http.post ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCGPJYqKCees7StHPUUGVHvNv_J-D92qQM',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }
    getUsersData( ){
        return this.users;
    }
    getUserData( email: string){
        let user: UserModel;
        user = this.users.find(user => user.email === email);
        this.userData.emit(user);
        return user;
    }
    getUsersByRole(role: string){
        let users: UserModel[];
        users = this.users.filter(user => user.role===role);
        return users;
    }

}