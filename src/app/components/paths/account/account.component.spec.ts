import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountComponent } from './account.component';
import { AuthService } from '../../../services/auth.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register with correct arguments on form submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.returnValue(true); // Espiar el método register y simular que devuelve true
  
    // Simula el llenado del formulario
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
  
    component.onSubmit();
  
    expect(authService.register).toHaveBeenCalledOnceWith('Test User', 'test@example.com', 'password123');
  });
  
});
