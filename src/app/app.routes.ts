import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MtHeaderComponent } from "./header/header.component";

export const routes: Routes = [{
  path: "",
  component: MtHeaderComponent,
  outlet: 'header'
}, {
  path: "",
  component: HomeComponent
}];
