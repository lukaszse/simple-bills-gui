import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../../service/user.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUsername: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedUsername = this.getUser();
  }

  getUser(): Observable<string> {
    return this.userService
      .getUser()
  }
}
