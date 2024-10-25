// src/app/components/paths/account/account.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  registerForm: FormGroup;
  registrationError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      
      const isRegistered = this.authService.register(name, email, password);

      if (isRegistered) {
        console.log('Registro exitoso');
        // Aquí puedes redirigir al usuario a la página de login o mostrar un mensaje de éxito
      } else {
        this.registrationError = 'El usuario ya existe'; // Muestra un error si el registro falla
      }
    }
  }
}

/*
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  registerForm: FormGroup;
  registrationError: string = '';
  registrationSuccess: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        const response = await fetch('http://localhost:5001/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (response.ok) {
          this.registrationSuccess = 'Registro exitoso. Token: ' + result.token;
          this.registrationError = '';
          console.log('Registro exitoso:', result.message);
        } else {
          this.registrationError = result.message;
          this.registrationSuccess = '';
          console.error('Error de registro:', result.message);
        }
      } catch (error) {
        this.registrationError = 'Error al registrar el usuario';
        this.registrationSuccess = '';
        console.error('Error de registro:', error);
      }
    }
  }
}
*/

/*
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  registerForm: FormGroup;
  registrationError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      this.authService.register(name, email, password).subscribe({
        next: () => {
          console.log('Registro exitoso');
          // Redirigir al usuario a la página de login o mostrar un mensaje de éxito
        },
        error: (error) => {
          this.registrationError = 'El usuario ya existe'; // Muestra un error si el registro falla
          console.error('Error de registro:', error);
        }
      });
    }
  }
}
*/