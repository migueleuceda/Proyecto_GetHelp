import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResenyaComponent } from './resenya/resenya.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'resenya',component:ResenyaComponent},
  {path: 'SignUp', component: SignUpComponent},
  {path: 'LogIn', component: SignUpComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
