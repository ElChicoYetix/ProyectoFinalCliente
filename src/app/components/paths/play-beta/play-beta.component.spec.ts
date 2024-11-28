import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBetaComponent } from './play-beta.component';

describe('PlayBetaComponent', () => {
  let component: PlayBetaComponent;
  let fixture: ComponentFixture<PlayBetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayBetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
