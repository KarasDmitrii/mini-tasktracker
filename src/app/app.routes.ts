import { Routes } from '@angular/router';
import { MtHomeComponent } from "./home/home.component";
import { MtHeaderComponent } from "./header/header.component";
import { MtTaskPageResolver } from "./task-page/shared/task-page.resolver";
import { MtTaskPageComponent } from "./task-page/task-page.component";

export const routes: Routes = [
//   {
//   path: "",
//   component: MtHeaderComponent,
//   outlet: 'header'
// },
  {
  path: "",
  component: MtHomeComponent,
}, {
  path: "task/:id",
  component: MtTaskPageComponent,
  resolve: { task: MtTaskPageResolver }
}];
