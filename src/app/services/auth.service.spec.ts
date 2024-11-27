import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should return true for valid login credentials', () => {
    const result = service.login('salamaleco@hotmail.com', 'Hola12345');

    expect(result).toBeTrue();
  });

  it('should return true for valid registration data', () => {
    const result = service.register('Test User', 'test@example.com', 'password123');

    expect(result).toBeTrue();
  });

});
