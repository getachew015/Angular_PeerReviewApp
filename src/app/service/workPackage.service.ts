import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/storage';
import { WorkPackage } from '../model/WorkPackage.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class WorkPackageService{



    private filePath:string = '/workPackages';

    constructor(private angFire: AngularFirestore, private db: AngularFireDatabase, private http: HttpClient){

    }

    pushUpload(workPackage: WorkPackage){
        // let storageRef = firebase.storage().ref();
        // let uploadTask = storageRef.child(`${this.filePath}/${workPackage.file.name}`).put(workPackage.file);
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        //     (snapshot) =>  {
        //       // upload in progress
        //       workPackage.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     },
        //     (error) => {
        //       // upload failed
        //       console.log(error);
        //     },
        //     () => {
        //       // upload success
        //       workPackage.url = uploadTask.snapshot.downloadURL;
        //       this.saveFileData(workPackage);
        //     }
        //   );
          console.log(workPackage.title);
          this.saveFileData(workPackage);
    }

    saveFileData(workPackage: WorkPackage){
        // this.db.list(`${this.filePath}`).push(workPackage);
        console.log(workPackage.title);
        this.http.post('https://peerreviewapp-203bf.firebaseio.com/workPackage.json',workPackage).subscribe();

    }



    deleteworkPackage(workPackage: WorkPackage) {
        this.deleteWorkPackage(workPackage.$key)
        .catch(error => console.log(error));
    }
    
    deleteWorkPackage(key: string) {
        return this.db.list(`${this.filePath}/`).remove(key);
    }
    
}