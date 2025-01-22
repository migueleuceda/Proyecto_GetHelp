import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnusuperiorComponent } from './mnusuperior.component';

describe('MnusuperiorComponent', () => {
  let component: MnusuperiorComponent;
  let fixture: ComponentFixture<MnusuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MnusuperiorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MnusuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
