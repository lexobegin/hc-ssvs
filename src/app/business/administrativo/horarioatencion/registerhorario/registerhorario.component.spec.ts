import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhorarioComponent } from './registerhorario.component';

describe('RegisterhorarioComponent', () => {
  let component: RegisterhorarioComponent;
  let fixture: ComponentFixture<RegisterhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterhorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
