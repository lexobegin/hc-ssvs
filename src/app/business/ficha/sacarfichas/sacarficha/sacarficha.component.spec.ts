import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarfichaComponent } from './sacarficha.component';

describe('SacarfichaComponent', () => {
  let component: SacarfichaComponent;
  let fixture: ComponentFixture<SacarfichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SacarfichaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SacarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
