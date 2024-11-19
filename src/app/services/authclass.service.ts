import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthclassService {

  isLoggedIn(){
    return true;
  }

  constructor() { }
}
