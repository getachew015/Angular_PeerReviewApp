import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  providers: [UserService]
})
export class FacultyComponent implements OnInit {
  private userData:UserModel;
  private traineeList: UserModel[] = [];
  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    this.userService.userData.subscribe((user:UserModel) => {
      this.userData = user;
    });
    this.traineeList = this.userService.getUsersByRole('Trainee');
    console.log(this.traineeList);
  }
  
}
