import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyDq3wxID35hh4tP0RPdxEGpgJYW9-zclMA",
      authDomain: "bookangular-af3dd.firebaseapp.com",
      databaseURL: "https://bookangular-af3dd.firebaseio.com",
      projectId: "bookangular-af3dd",
      storageBucket: "gs://bookangular-af3dd.appspot.com",
      messagingSenderId: "1056898956453"
    };
    firebase.initializeApp(config);
  }
}
