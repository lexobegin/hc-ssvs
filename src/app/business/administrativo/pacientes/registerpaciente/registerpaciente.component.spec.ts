import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpacienteComponent } from './registerpaciente.component';

describe('RegisterpacienteComponent', () => {
  let component: RegisterpacienteComponent;
  let fixture: ComponentFixture<RegisterpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterpacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
