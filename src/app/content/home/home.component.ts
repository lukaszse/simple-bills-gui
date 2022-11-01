import { Component, OnInit } from '@angular/core';
import { Observable, tap } from "rxjs";
import { UserService } from "../../../service/user.service";
import { map } from "rxjs/operators";


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

  user$: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.getUser();
  }

  getUser(): Observable<string> {
    return this.userService
      .getUser().pipe(
        map(response => response.body),
        tap(console.log),
        map(this.getShowUserName)
      )
  }

  getShowUserName(user: User): string {
    if (user.givenName) {
      return user.givenName;
    } else if (user.name) {
      return user.name;
    } else if (user.preferredUsername) {
      return user.preferredUsername;
    }
  }
}
