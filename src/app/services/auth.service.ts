// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private token: string | null = null;
  private currentUser: any = null;
  private apiUrl = 'http://localhost:5001/api/users'; // URL de tu API

  constructor(private router: Router) {
    this.token = localStorage.getItem('authToken');
    this.isAuthenticated.next(!!this.token);
  }

  login(email: string, password: string): boolean {
    const storedUser = environment.users.find(user => user.email === email);
    if (storedUser && storedUser.password === password) {
      this.token = this.generateToken();
      localStorage.setItem('authToken', this.token);
      this.currentUser = storedUser;
      this.isAuthenticated.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    const userExists = environment.users.find(user => user.email === email);
    if (userExists) {
      return false;
    }
    
    const newUser = { name, email, password };
    environment.users.push(newUser);
    this.token = this.generateToken();
    localStorage.setItem('authToken', this.token);
    this.currentUser = newUser;
    this.isAuthenticated.next(true);
    this.router.navigate(['/home']);
    return true;
  }

  logout(): void {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  generateToken(): string {
    return Math.random().toString(36).substr(2);
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): any {
    return this.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}

/*
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private token: string | null = null;
  private currentUser: any = null;
  private apiUrl = 'http://localhost:5001/api/users'; // URL de tu API

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('authToken');
    this.isAuthenticated.next(!!this.token);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.token = response.token;
        if (this.token) {
          localStorage.setItem('authToken', this.token);
        }
        this.currentUser = response.user;
        this.isAuthenticated.next(true);
        this.router.navigate(['/home']);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap((response: any) => {
        this.token = response.token;
        if (this.token) {
          localStorage.setItem('authToken', this.token);
        }
        this.currentUser = response.user;
        this.isAuthenticated.next(true);
        this.router.navigate(['/home']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.token = null;
    this.currentUser = null;
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): any {
    return this.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
*/