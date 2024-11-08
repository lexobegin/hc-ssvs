import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepacienteComponent } from './updatepaciente.component';

describe('UpdatepacienteComponent', () => {
  let component: UpdatepacienteComponent;
  let fixture: ComponentFixture<UpdatepacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatepacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatepacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
