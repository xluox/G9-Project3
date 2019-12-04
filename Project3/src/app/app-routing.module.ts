import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component'

const routes: Routes = [ 
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home', component: HomeComponent},
{path:'about',component: AboutComponent},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
