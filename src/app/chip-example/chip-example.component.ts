import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chip-example',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule, // Import MatChipsModule
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-chip-list #chipList>
        <mat-chip *ngFor="let item of items; let i = index" (removed)="removeItem(i)">
          {{ item }}
          <button matChipRemove>
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip>
        <input
          [matChipInputFor]="chipList"
          (matChipInputTokenEnd)="addItem($event)"
          placeholder="Add item..."
        />
      </mat-chip-list>
    </mat-form-field>
  `,
  styles: [
    `
    mat-form-field {
      width: 100%;
    }

    mat-chip {
      margin: 2px;
    }
    `,
  ],
})
export class ChipExampleComponent {
  items: string[] = ['Apple', 'Banana', 'Orange']; // Predefined items

  // Add an item
  addItem(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.items.push(value);
      event.chipInput!.clear(); // Clear the input
    }
  }

  // Remove an item
  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}