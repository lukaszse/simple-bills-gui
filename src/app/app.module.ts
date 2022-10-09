import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {HomeComponent} from './content/home/home.component';
import {BillsComponent} from './content/bills/bills.component';
import {ContactComponent} from './content/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {NgbdSortableHeader} from "./httpClient.service";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    BillsComponent,
    ContactComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
