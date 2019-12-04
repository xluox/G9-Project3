import { Component, OnInit,Inject } from '@angular/core';
import {TestService} from "../test.service"
import { trigger, state, style, transition, animate } from '@angular/animations'; 
import { ApiService } from '../service/api.service';
import {Post} from '../models/post';
import {postdata} from '../models/postdata';
import {AuthenticationService} from '../service/authentication.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  posts : Post[] = [];
  headers: any;
  spresp: any;
  postdata: postdata = new postdata("", "");  
  set title(val:string){this.postdata.title=val;}

  // color='#FF0000';
  // info='this is the info';
  constructor(private apiService: ApiService, private authentication : AuthenticationService,public dialog: MatDialog) {

  }

  ngOnInit() {
		this.getAllPosts();
	}

  onClick() {

  }


  getAllPosts(){
    this.apiService.getAllPost()
    .subscribe(resp => {
      console.log(resp);
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
  
      for (const data of resp.body) {
        this.posts.push(data);
      }
      console.log(this.posts);
    });
  }

  addPost() {
    if(this.authentication.currentUserValue){
      var self=this;
      console.log(this.postdata);
  
      this.apiService
        .addPost(this.postdata)
        .subscribe(resp => {
          return self.posts.push(resp as Post);
        });
    }
    else{
      console.log("Did not login");
    }
  
    }
    
}
