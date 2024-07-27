import { ValueObject } from '@shared/models';

export type PolicyNumber = ValueObject<PolicyNumber, ValidPolicyNumber>;

export type ValidPolicyNumber = number;
