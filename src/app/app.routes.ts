// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/paths/home/home.component';
import { AccountComponent } from './components/paths/account/account.component';
import { LoginComponent } from './components/paths/login/login.component';
import { MyAccountComponent } from './components/paths/my-account/my-account.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'account', component: AccountComponent},
    { path: 'login', component: LoginComponent},
    { path: 'my-account', component: MyAccountComponent}
];
