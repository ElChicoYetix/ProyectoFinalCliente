// src/app/components/paths/login/login.component.html
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private token: string | null = null;
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string): boolean {
    console.log('Intentando registrar usuario:', { name, email, password });
    const body = {
      "name": name,
      "email": email,
      "password": password
    };
    
    this.http.post<any>(`${this.apiUrl}/register`, body).subscribe(
      (response) => {
        if (response && response.token) {
          this.token = response.token;
          localStorage.setItem('authToken', this.token || ''); // Guardar el token en localStorage
          this.currentUser = response.user;
          this.isAuthenticated.next(true);
          console.log('Registro exitoso. Usuario:', this.currentUser);
          this.router.navigate(['/home']); // Navegar al inicio si el registro es exitoso
        } else {
          console.log('Registro fallido o sin token');
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  
    return true;
  }

  login(email: string, password: string): boolean {
    console.log('Intentando iniciar sesión:', { email, password });
    const body = {
      "email": email,
      "password": password
    };

    this.http.post<any>(`${this.apiUrl}/login`, body).subscribe(
      (response) => {
        if (response && response.token) {
          this.token = response.token;
          localStorage.setItem('authToken', this.token || ''); // Guardar el token en localStorage
          this.currentUser = response.user;
          this.isAuthenticated.next(true);
          console.log('Inicio de sesión exitoso. Usuario:', this.currentUser);
          this.router.navigate(['/home']); // Navegar al inicio si el inicio de sesión es exitoso
          return true;
        } else {
          console.log('Inicio de sesión fallido o sin token');
          return false;
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        return false;
      }
    );
    return true;
  }

  testing(value:string):boolean {
    if (value == 'si'){
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    console.log('Cerrando sesión del usuario:', this.currentUser);
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    console.log('Sesión cerrada y redireccionado a login');
  }

  getToken(): string | null {
    console.log('Obteniendo token:', this.token);
    return this.token;
  }

  getUser(): any {
    console.log('Obteniendo usuario actual:', this.currentUser);
    return this.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
    console.log('Consultando estado de autenticación');
    return this.isAuthenticated.asObservable();
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:3000/api/users/google';
  }  
  
}
