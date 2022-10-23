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
import {CommonModule, DatePipe, DecimalPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbdSortableHeader} from "../utils/sortableComponents/sortable.directive";
import { BillCreationComponent } from './content/bill-creation/bill-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    BillsComponent,
    ContactComponent,
    NgbdSortableHeader,
    BillCreationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [DecimalPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
