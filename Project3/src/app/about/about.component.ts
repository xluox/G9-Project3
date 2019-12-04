import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from '../service/authentication.service'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})



export class AboutComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService ) { }

  ngOnInit() {
  }

  showUsername(){
    return this.authenticationService.currentUser;
  }

}
