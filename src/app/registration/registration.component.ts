import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserModel } from '../model/user.model';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  user:UserModel;
  userId: number;
  @Output() viewSelected = new EventEmitter<string>();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = Math.round(Math.random()*999);

  }
  onSubmit(form: NgForm){
    this.user = new UserModel(this.userId,form.value.name, form.value.email, form.value.password, form.value.role);
    this.userService.saveUserData(this.user);
    form.reset();
  }
  onClickButton(view: string){
    this.viewSelected.emit(view);
  }
}
