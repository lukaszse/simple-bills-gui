import { Component, OnInit } from '@angular/core';
import {Observable, tap} from "rxjs";
import {UserService} from "../../../service/userService";
import {map} from "rxjs/operators";


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

  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.getUser();
  }

  getUser(): Observable<User> {
    return this.userService
      .getUser().pipe(
        map(response => response.body),
        tap(console.log)
      )
  }
}
