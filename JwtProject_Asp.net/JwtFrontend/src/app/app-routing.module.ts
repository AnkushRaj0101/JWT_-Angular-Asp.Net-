import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
},{
  path:'register',
  component:RegisterComponent
},{
  path:'home',
  component:HomeComponent,
  canActivate:[AuthGuard]
},
{
  path:'',
  redirectTo:'/login',
  pathMatch: 'full'
},{
  path:'**',
  component:PagenotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
