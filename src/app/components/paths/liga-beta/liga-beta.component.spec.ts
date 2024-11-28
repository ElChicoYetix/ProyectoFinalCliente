import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaBetaComponent } from './liga-beta.component';

describe('LigaBetaComponent', () => {
  let component: LigaBetaComponent;
  let fixture: ComponentFixture<LigaBetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigaBetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
