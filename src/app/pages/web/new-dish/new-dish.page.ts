import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

import { HttpClient } from '@angular/common/http';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FILE } from 'src/app/interfaces/file';
import { FirebaseApp } from '@angular/fire';



@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  name: string = "";
  des: string = "";
  salad: number = 0;
  bread: number = 0;
  soup: number = 0;
  picture: number = 0;
  pictureURL: string = "";
  filestoragepathLocal = "";
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";


  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  pathforImgOnline: string = "";
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;



  constructor(private http: HttpClient, private user: UserService, private resService: RestServiceService, private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage) {
    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();

    //this.filesDownload();
  }


  ngOnInit() {

  }


  async save() {
    console.log("save");

    if (this.name != "" && this.des != "") {
      if (this.des.includes("|")) {
        alert("Nije dopuštena upotreba | znaka u opisu.");
        return;
      }

      await this.getFileLink(this.filestoragepathLocal); //sprema link u pictureURL
      if (this.pictureURL == "") {
        alert("Dogodila se pogreška, pokušajte ponovno");
        return;
      }
      this.http.post(this.url, {
        "db": "Food",
        "queries": [
          {
            "query": "spDishAzur",
            "params": {
              "action": "insert",
              "companyid": this.user.user.companyId,
              "name": this.name,
              "soup": this.soup,
              "salad": this.salad,
              "bread": this.bread,
              "description": this.pictureURL + "|" + this.des,
              "userid": this.user.user.userId
            }
          }
        ]
      }).subscribe((res: any) => {
        this.resService.initCompanyUsers(); // pozove sve dishove, ordere i sve potrebno da se obnovi menu page
        this.name="";
        this.des="";
        this.salad=0;
        this.soup=0;
        this.bread=0;
        this.pictureURL="";
        this.picture=0;
      });
    }
    else {
      alert("prazni argumenti");
    }
  }


  async getFileLink(path: string) {
    console.log("cao");

    await this.angularFireStorage.storage.ref(path).getDownloadURL().then(rez => {
      if (rez) {
        this.pictureURL = rez;
        console.log();
      }
      else {
        this.pictureURL = "";
      }
    }).catch(rez => {
      console.log(rez);
    });
  }


  fileUpload(event: any) {
    console.log(event);
    if(event==null || event==undefined) return;
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;


    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    this.filestoragepathLocal = fileStoragePath;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);
    console.log("image ref:" + fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

    this.isImgUploading = false;
    this.isImgUploaded = true;

    this.progressNum = this.ngFireUploadTask.percentageChanges();

    console.log("oj2");

    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(

      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();


        this.fileUploadedPath.subscribe(resp => {
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.FileSize
          });
          // this.isImgUploading = false;
          // this.isImgUploaded = true;

        }, error => {
          console.log(error);
        })
      }),
      tap(snap => {
        this.FileSize = snap.totalBytes;

      })
    );


  }


  fileStorage(image: FILE) {
    const ImgId = this.angularFirestore.createId();

    this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
      console.log(data);

    }).catch(error => {
      console.log(error);
    });
  }




}

