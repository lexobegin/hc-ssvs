import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicodisponibleComponent } from './medicodisponible.component';

describe('MedicodisponibleComponent', () => {
  let component: MedicodisponibleComponent;
  let fixture: ComponentFixture<MedicodisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicodisponibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicodisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
