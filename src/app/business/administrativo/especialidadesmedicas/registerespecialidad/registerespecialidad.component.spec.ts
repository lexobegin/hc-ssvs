import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterespecialidadComponent } from './registerespecialidad.component';

describe('RegisterespecialidadComponent', () => {
  let component: RegisterespecialidadComponent;
  let fixture: ComponentFixture<RegisterespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterespecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
