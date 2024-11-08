import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusuarioComponent } from './updateusuario.component';

describe('UpdateusuarioComponent', () => {
  let component: UpdateusuarioComponent;
  let fixture: ComponentFixture<UpdateusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
