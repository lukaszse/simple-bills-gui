import { Component, OnInit } from '@angular/core';
import {Observable, tap} from "rxjs";
import {SimpleBillsClientService} from "../../../service/simpleBillsClient.service";


interface User {
  preferredUsername: string;
  name: string
  givenName: string
  familyName: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private static userEndpoint: string = "/user/user-info";
  user$: Observable<User>;

  constructor(private simpleBillsClientService: SimpleBillsClientService) { }

  ngOnInit(): void {
    this.user$ = this.getUser();
  }

  getUser(): Observable<User> {
    return this.simpleBillsClientService
      .get(HomeComponent.userEndpoint).pipe(
        tap(console.log)
      )
  }
}
