import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-package',
  templateUrl: './work-package.component.html',
  styleUrls: ['./work-package.component.css']
})
export class WorkPackageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


}
