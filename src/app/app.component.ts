import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: string[] = ['admin@slv.com']; // First chip is read-only
  emailControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.email, this.slvDomainValidator]
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.emailControl.valid) {
      this.emails.push(value);
      this.emailControl.reset(); // Clear input field
    }

    event.chipInput!.clear(); // Clear input UI field
  }

  remove(index: number): void {
    if (index !== 0) { // Prevent removal of the first chip
      this.emails.splice(index, 1);
    }
  }

  // Custom Validator: Only accept emails ending with @slv.com
  slvDomainValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@slv\.com$/; // Strict regex for @slv.com
    return control.value && !emailPattern.test(control.value) ? { invalidDomain: true } : null;
  }
}
