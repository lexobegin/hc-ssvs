import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatehorarioComponent } from './updatehorario.component';

describe('UpdatehorarioComponent', () => {
  let component: UpdatehorarioComponent;
  let fixture: ComponentFixture<UpdatehorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatehorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatehorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
