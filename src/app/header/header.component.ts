import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userRole: string = "default";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userData.subscribe((user: UserModel) => {
      this.userRole = user.role;
    })
  }

  

}
