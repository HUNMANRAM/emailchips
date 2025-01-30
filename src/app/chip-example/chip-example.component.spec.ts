import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipExampleComponent } from './chip-example.component';

describe('ChipExampleComponent', () => {
  let component: ChipExampleComponent;
  let fixture: ComponentFixture<ChipExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
