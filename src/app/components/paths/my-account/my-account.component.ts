import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})

export class MyAccountComponent implements OnInit {
  user: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}