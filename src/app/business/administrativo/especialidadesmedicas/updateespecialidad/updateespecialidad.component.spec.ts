import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateespecialidadComponent } from './updateespecialidad.component';

describe('UpdateespecialidadComponent', () => {
  let component: UpdateespecialidadComponent;
  let fixture: ComponentFixture<UpdateespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateespecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
