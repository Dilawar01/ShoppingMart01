import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  { path: "login", component:LoginComponent },
  { path: "signup" , component: SignupFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
