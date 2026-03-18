import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() rows: string[] = [];
  @Input() indexHeader = '#';
  @Input() valueHeader = 'Value';
}
