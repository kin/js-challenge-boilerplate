import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TableEmptyStateComponent } from '../table-empty-state/table-empty-state.component';

interface Policy {
  policyNumber: number;
  isValid: boolean;
}

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrl: './policy-table.component.scss',
  standalone: true,
  imports: [CommonModule, TableEmptyStateComponent],
})
export class PolicyTableComponent implements OnChanges {
  @Input() policies: string[] = [];

  processedPolicies: Policy[] = [];
  submissionStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  submissionId: number | null = null;

  constructor(private http: HttpClient) {}

  // Reset state when Input changes
  ngOnChanges(): void {
    this.processedPolicies = this.policies.map((p) => ({
      policyNumber: parseInt(p, 10),
      isValid: this.isValid(p),
    }));
    this.submissionStatus = 'idle';
    this.submissionId = null;
  }

  submitPolicies(): void {
    this.submissionStatus = 'loading';
    this.http
      .post<{
        id: number;
      }>('https://jsonplaceholder.typicode.com/posts', this.processedPolicies)
      .subscribe({
        next: (response) => {
          this.submissionStatus = 'success';
          this.submissionId = response.id;
        },
        error: () => {
          this.submissionStatus = 'error';
        },
      });
  }

  // CheckSum operation to see if policy number is valid
  // According to instructions, checksum assigns a place number (d) based on reverse order (so final
  // number is d1, and it increases as you move back through the set). From there it is as follows:
  // (d1+(2*d2)+(3*d3)+...+(9*d9)) mod 11 = 0

  private isValid(policy: string): boolean {
    // Reverse number so that it is simpler to assign place (d)
    const checksumArr = policy.split('').reverse();
    const productArr = [];

    for (let i = 0; i < checksumArr.length; i++) {
      const char = checksumArr[i];
      const num = parseInt(char, 10);
      if (isNaN(num)) {
        return false;
      }

      const product = num * (i + 1);
      productArr.push(product);
    }

    const sum = productArr.reduce((acc, val) => acc + val, 0);

    return sum % 11 === 0;
  }
}
