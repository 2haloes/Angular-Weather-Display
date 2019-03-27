import { DefaultComponent } from './default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: ':key/:lat/:lon', component : HomeComponent},
  {path: '', component : DefaultComponent},
  {path: ':key', component : DefaultComponent},
  {path: ':key/:lat', component : DefaultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
