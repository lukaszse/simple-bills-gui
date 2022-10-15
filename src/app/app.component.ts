import {Component} from '@angular/core';
import {OAuth2Service} from "../service/oAuth2Service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor() { }

  ngOnInit(): void {
  }

}
