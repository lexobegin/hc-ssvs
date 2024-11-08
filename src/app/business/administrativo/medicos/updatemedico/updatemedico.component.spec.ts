import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemedicoComponent } from './updatemedico.component';

describe('UpdatemedicoComponent', () => {
  let component: UpdatemedicoComponent;
  let fixture: ComponentFixture<UpdatemedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatemedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatemedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
