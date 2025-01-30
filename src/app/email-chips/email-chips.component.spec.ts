import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChipsComponent } from './email-chips.component';

describe('EmailChipsComponent', () => {
  let component: EmailChipsComponent;
  let fixture: ComponentFixture<EmailChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailChipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
