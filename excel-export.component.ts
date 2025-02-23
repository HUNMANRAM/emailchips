import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel-export',
  standalone: true,
  imports: [CommonModule],
  template: `<button (click)="exportToExcel()">Export to Excel</button>`,
})
export class ExcelExportComponent {
  private http = inject(HttpClient);

  exportToExcel() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos').subscribe(
      data => {
        if (data && data.length > 0) {
          this.generateExcel(data);
        } else {
          console.warn('No data available to export.');
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  generateExcel(data: any[]) {
    let workbook = new wjXlsx.Workbook();
    let sheet = new wjXlsx.WorkSheet();
    sheet.name = 'DataSheet';

    let headers = Object.keys(data[0] || {});

    // Add header row
    let headerRow = new wjXlsx.WorkbookRow();
    headers.forEach(header => {
      const cell = new wjXlsx.WorkbookCell();
      cell.value = header;
      headerRow.cells.push(cell);
    });
    sheet.rows.push(headerRow);

    // Add data rows
    data.forEach(rowData => {
      let row = new wjXlsx.WorkbookRow();
      headers.forEach(header => {
        let cell = new wjXlsx.WorkbookCell();
        cell.value = rowData[header];
        row.cells.push(cell);
      });
      sheet.rows.push(row);
    });

    workbook.sheets.push(sheet);

    // Save as Excel file asynchronously
    workbook.saveAsync('ExportedData.xlsx', 
      () => console.log('Excel file saved successfully.'),
      (error) => console.error('Error saving Excel file:', error)
    );
  }
}
