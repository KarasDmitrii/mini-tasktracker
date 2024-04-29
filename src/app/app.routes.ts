import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MtHeaderComponent } from "./header/header.component";
import { MtHomeResolver } from "./home/shared/home.resolver";

export const routes: Routes = [{
  path: "",
  component: MtHeaderComponent,
  outlet: 'header'
}, {
  path: "",
  component: HomeComponent,
  resolve: { taskList: MtHomeResolver }
}];
