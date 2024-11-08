import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterusuarioComponent } from './registerusuario.component';

describe('RegisterusuarioComponent', () => {
  let component: RegisterusuarioComponent;
  let fixture: ComponentFixture<RegisterusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
