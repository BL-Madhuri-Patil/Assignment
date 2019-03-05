import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ControltestComponent } from './components/controltest/controltest.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'home', component:NavbarComponent, children: [
    {path:'masters/controltest',component:ControltestComponent}
  ]},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
