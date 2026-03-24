import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Policy {
  policyNumber: number;
  isValid: boolean;
}

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrl: './policy-table.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class PolicyTableComponent implements OnChanges {
  @Input() policies: string[] = [];

  processedPolicies: Policy[] = [];

  ngOnChanges(): void {
    this.processedPolicies = this.policies.map((p) => ({
      policyNumber: parseInt(p, 10),
      isValid: this.isValid(p),
    }));
  }

  private isValid(policy: string): boolean {
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
