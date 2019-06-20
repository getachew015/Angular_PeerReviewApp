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
  traineeList: UserModel[] = [];
  selectedFiles: FileList;
  currentWorkPackage: WorkPackage;

  constructor(private userService: UserService,
              private workPackageService: WorkPackageService) {
  }

  ngOnInit() {

    this.userService.userData.subscribe((user: UserModel) => {
      this.userData = user;
    });
    this.traineeList = this.userService.getUsersByRole('Trainee');
  }

  onFilesDetected(event){
    this.selectedFiles = event.target.files;
  }

  onSubmit(form: NgForm){

    const file = this.selectedFiles.item(0);
    this.currentWorkPackage = new WorkPackage(file);
    this.currentWorkPackage.title = form.value.title;
    this.currentWorkPackage.description = form.value.description;
    this.currentWorkPackage.dateCreated = form.value.dateCreated;
    this.currentWorkPackage.expectedCompletionDate = form.value.completionDate;
    this.workPackageService.pushUpload(this.currentWorkPackage);
    form.reset();

  }

}
