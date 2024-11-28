// src/app/component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { AccountComponent } from './components/paths/account/account.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './components/paths/my-account/my-account.component';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './components/layout/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AccountComponent, FooterComponent, ReactiveFormsModule, MyAccountComponent, AngularFireModule, HttpClientModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProyectoFinal';
}
