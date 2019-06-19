import { WorkPackageService } from './../service/workPackage.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { WorkPackage } from '../model/workPackage.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  providers: [WorkPackageService]
})
export class FacultyComponent implements OnInit {

  private userData:UserModel;
  private traineeList: UserModel[] = [];
  private selectedFiles: FileList;
  private currentWorkPackage: WorkPackage;

  constructor(private userService: UserService, 
              private workPackageService: WorkPackageService) { 
  }

  ngOnInit() {

    this.userService.userData.subscribe((user:UserModel) => {
      this.userData = user;
    });
    this.traineeList = this.userService.getUsersByRole('Trainee');
    console.log(this.traineeList);
  }

  onFilesDetected(event){
    this.selectedFiles = event.target.files;
  }
  
  onFormSubmit(form: NgForm){
    let file = this.selectedFiles.item(0);
    this.currentWorkPackage = new WorkPackage(file);
    this.currentWorkPackage.title = form.value.title;
    this.currentWorkPackage.description = form.value.description;
    this.workPackageService.pushUpload(this.currentWorkPackage);
  }
  
}
