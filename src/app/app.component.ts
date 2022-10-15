import {Component} from '@angular/core';
import {OAuth2Service} from "../service/oAuth2Service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'simple-bills-gui';
  public isLogged: boolean = false;

  constructor(private _service: OAuth2Service) {
  }

  ngOnInit() {
    this.isLogged = this._service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLogged && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
    window.location.href =
      `${environment.keycloakHost}/realms/baeldung/protocol/openid-connect/auth?` +
      'response_type=code&scope=openid%20write%20read&client_id=' +
      this._service.clientId + '&redirect_uri=' + this._service.redirectUri;
  }

  logout() {
    this._service.logout();
  }
}
