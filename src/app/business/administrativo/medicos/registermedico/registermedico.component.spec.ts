import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermedicoComponent } from './registermedico.component';

describe('RegistermedicoComponent', () => {
  let component: RegistermedicoComponent;
  let fixture: ComponentFixture<RegistermedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistermedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistermedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
