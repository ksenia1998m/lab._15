import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {PersonAddComponent} from "./person-add/person-add.component";


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'add', component: PersonAddComponent},
  {path: 'edit/:id', component: PersonAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
