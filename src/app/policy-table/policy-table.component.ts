import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrl: './policy-table.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class PolicyTableComponent {
  @Input() policies: string[] = [];
}
