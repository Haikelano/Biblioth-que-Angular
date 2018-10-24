import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {reject} from 'q';
import {promise} from 'selenium-webdriver';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  firebase.auth().onAuthStateChanged(
    (user) => {
      if(user) {
        this.isAuth = true;
          } else {
            this.isAuth = false;
          }
      }
  );
  }
onSignOut() {
    this.authService.signOut();
}
}
