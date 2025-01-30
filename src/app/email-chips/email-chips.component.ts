import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-chips',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    
  ],
  templateUrl: './email-chips.component.html',
  styleUrls: ['./email-chips.component.css'],
})
export class EmailChipsComponent implements OnInit {
  emailForm!: FormGroup;

  // Reference to the MatChipList
  @ViewChild('chipList') chipList!: MatChipListbox;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emails: this.fb.array([], [Validators.required, Validators.maxLength(5)]),
    });

    // Add the logged-in user's email as the first chip (read-only)
    this.addEmail('loggedInUser@example.com', true);
  }

  get emails(): FormArray {
    return this.emailForm.get('emails') as FormArray;
  }

  addEmail(email: string, isReadonly: boolean = false): void {
    if (this.emails.length < 5) {
      this.emails.push(this.fb.control({ value: email, disabled: isReadonly }, Validators.email));
    }
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && this.emails.length < 5) {
      this.addEmail(value);
      input.value = '';
    }
  }
}