import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./content/home/home.component";
import {BillsComponent} from "./content/bills/bills.component";
import {ContactComponent} from "./content/contact/contact.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
