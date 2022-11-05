import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { BillsComponent } from './content/bills/bills.component';
import { ContactComponent } from './content/category/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule, DatePipe, DecimalPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbdSortableHeader } from "../utils/sortableComponents/sortable.directive";
import { BillCreationComponent } from './content/bill-creation/bill-creation.component';
import { BillPlanCreationComponent } from './content/bill-plan-creation/bill-plan-creation.component';
import { CategoryManagementComponent } from './content/category-management/category-management.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LimitChartsComponent } from './content/limit-charts/limit-charts.component';


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
    BillCreationComponent,
    BillPlanCreationComponent,
    CategoryManagementComponent,
    LimitChartsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxChartsModule
  ],
  providers: [DecimalPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
