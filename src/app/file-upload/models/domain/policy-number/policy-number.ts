import { method, ObjectProps, prop } from '@shared/models';
import { InvalidPolicyNumberException } from './invalid-policy-number-exception';
import { PolicyNumber, ValidPolicyNumber } from './policy-number.type';

const pattern = '\\d{9}';
const test = new RegExp(pattern, 'gm');

export function policyNumber(candidatePolicyNumber: any): PolicyNumber {
  const thisPolicyNumber = getRawValue as PolicyNumber;
  const internals = initializeInternals(candidatePolicyNumber);

  Object.defineProperties(thisPolicyNumber, {
    equals: prop(method(equals)),
  } as ObjectProps<PolicyNumber>);

  return Object.seal(thisPolicyNumber);

  function equals(other: PolicyNumber): boolean {
    if (!other || !other.equals || typeof other !== 'function') {
      return false;
    }
    return internals.policyNumber === other();
  }

  function getRawValue(): ValidPolicyNumber {
    return internals.policyNumber;
  }
}

policyNumber.validate = validatePolicyNumber;
policyNumber.pattern = pattern;

function validatePolicyNumber(candidate: any): ValidPolicyNumber | undefined {
  if (candidate && !isNaN(candidate) && candidate.toString().match(test)) {
    return +candidate as ValidPolicyNumber;
  }
  return undefined;
}

interface Internals {
  policyNumber: ValidPolicyNumber;
}

function initializeInternals(rawPolicyNumber: number): Internals {
  const validPolicyNumber = policyNumber.validate(rawPolicyNumber);

  if (!validPolicyNumber) {
    throw new InvalidPolicyNumberException(rawPolicyNumber);
  }

  return {
    policyNumber: validPolicyNumber
  };
}
