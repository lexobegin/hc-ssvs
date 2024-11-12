import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialconsultaComponent } from './historialconsulta.component';

describe('HistorialconsultaComponent', () => {
  let component: HistorialconsultaComponent;
  let fixture: ComponentFixture<HistorialconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialconsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
