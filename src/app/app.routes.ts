import { Routes } from '@angular/router';
import { HomeComponent } from './components/paths/home/home.component';
import { AccountComponent } from './components/paths/account/account.component';
import { LoginComponent } from './components/paths/login/login.component';
import { MyAccountComponent } from './components/paths/my-account/my-account.component';
import { authGuard } from './guards/auth.guard';
import { ChatComponent } from './components/layout/chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'account', component: AccountComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'my-account', component: MyAccountComponent},
    { path: 'chat', component:ChatComponent}
];
