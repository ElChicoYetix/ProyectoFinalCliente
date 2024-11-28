import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liga-beta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './liga-beta.component.html',
  styleUrls: ['./liga-beta.component.scss']
})
export class LigaBetaComponent {
  createLeagueForm: FormGroup;
  leagueId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.createLeagueForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      weeks: ['', [Validators.required, Validators.min(1)]],
      players: ['', [Validators.required, Validators.min(5), Validators.max(11)]],
    });
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  onSubmit(): void {
    if (this.createLeagueForm.valid) {
      this.leagueId = this.generateRandomId();
      console.log('Liga creada con ID:', this.leagueId);
      // Aquí puedes manejar la lógica adicional, como enviar los datos al servidor
    } else {
      this.createLeagueForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
}