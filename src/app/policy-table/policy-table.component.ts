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

  /**
   * Checks if a given policy number is valid based on the checksum algorithm.
   * The algorithm multiplies each digit of the policy number by its position (starting
   * from 1 for the last digit), sums these products, and checks if the total is divisible by 11.
   *
   * NOTE: The instructions do not state whether we can safely assume all numbers will be
   * 9 digits so this function is designed to handle any length of policy number.
   *
   * @param policy The policy number as a string to be validated.
   * @returns A boolean indicating whether the policy number is valid (true) or not (false).
   */
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
