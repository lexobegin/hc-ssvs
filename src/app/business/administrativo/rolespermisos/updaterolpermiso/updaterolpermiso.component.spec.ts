import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterolpermisoComponent } from './updaterolpermiso.component';

describe('UpdaterolpermisoComponent', () => {
  let component: UpdaterolpermisoComponent;
  let fixture: ComponentFixture<UpdaterolpermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdaterolpermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdaterolpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
