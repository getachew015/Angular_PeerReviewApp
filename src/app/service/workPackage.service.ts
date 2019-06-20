import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { WorkPackage } from '../model/WorkPackage.model';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn:'root'})
export class WorkPackageService{

    private filePath = '/workPackages';
    private myUrl : String;
    private workPackages: WorkPackage [] = [];

    constructor(private angFire: AngularFirestore,
                private db: AngularFireDatabase,
                private http: HttpClient){

    }

    pushUpload(workPackage: WorkPackage){
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.filePath}/${workPackage.file.name}`).put(workPackage.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>  {
              // upload in progress
              workPackage.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              // upload failed
              console.log(error);
            },
            () => {
              // On upload success
              this.myUrl = uploadTask.snapshot.downloadURL;
              storageRef.child(`${this.filePath}/${workPackage.file.name}`)
                        .getDownloadURL().then(url => {
                workPackage.url = url;
                this.saveFileData(workPackage);
              });
            }
          );
    }

    saveFileData(workPackage: WorkPackage){
        this.db.list(`${this.filePath}`).push(workPackage);
    }

    retriveWorkPackages(){
      this.db.list(`${this.filePath}`).valueChanges().subscribe(workPackages =>{
        console.log(workPackages);
      });
    }

    deleteworkPackage(workPackage: WorkPackage) {
        this.deleteWorkPackage(workPackage.title)
        .catch(error => console.log(error));
    }

    deleteWorkPackage(key: string) {
        return this.db.list(`${this.filePath}/`).remove(key);
    }

}
