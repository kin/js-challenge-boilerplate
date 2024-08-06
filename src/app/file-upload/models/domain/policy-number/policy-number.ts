import { method, ObjectProps, prop } from '@shared/models';
import { InvalidPolicyNumberException } from './invalid-policy-number-exception';
import { PolicyNumber, ValidPolicyNumber } from './policy-number.type';

const pattern = '\\d{9}';
const test = new RegExp(pattern, 'gm');
const validationMap = initializeValidationMap();

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

interface Internals {
  policyNumber: ValidPolicyNumber;
}

function initializeInternals(rawPolicyNumber: number): Internals {
  const validPolicyNumber = validate();

  if (!validPolicyNumber) {
    throw new InvalidPolicyNumberException(rawPolicyNumber);
  }

  return {
    policyNumber: validPolicyNumber
  };

  function validate(): ValidPolicyNumber | undefined {
    if (rawPolicyNumber) {
      if (isValid(rawPolicyNumber.toString())) {
        return +rawPolicyNumber as ValidPolicyNumber;
      }
    }
    return undefined;

    function isValid(candidataAsString: string): boolean {
      if (candidataAsString.match(test)) {
        const dividend = [...candidataAsString].reduce((d, char, idx) => {
          const fn = validationMap.get(idx)!;

          return d + fn(+char);
        }, 0);

        return dividend % 11 === 0;
      }
      return false;
    }
  }
}

function initializeValidationMap(): Map<number, (x: number) => number> {
  return new Map<number, (x: number) => number>([
    [0, (x: number) => 9 * x],
    [1, (x: number) => 8 * x],
    [2, (x: number) => 7 * x],
    [3, (x: number) => 6 * x],
    [4, (x: number) => 5 * x],
    [5, (x: number) => 4 * x],
    [6, (x: number) => 3 * x],
    [7, (x: number) => 2 * x],
    [8, (x: number) => 1 * x],
  ]);
}
