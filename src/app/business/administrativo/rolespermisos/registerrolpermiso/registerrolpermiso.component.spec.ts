import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterrolpermisoComponent } from './registerrolpermiso.component';

describe('RegisterrolpermisoComponent', () => {
  let component: RegisterrolpermisoComponent;
  let fixture: ComponentFixture<RegisterrolpermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterrolpermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterrolpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
