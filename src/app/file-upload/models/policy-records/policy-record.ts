import { getter, ObjectProps, prop } from '@shared/models';
import { PolicyNumber, policyNumber } from '../domain';
import { PolicyRecord } from './policy-record.interface';

export function policyRecord(rawPolicyNumber: number): PolicyRecord {
  const thisPolicyRecord = {} as PolicyRecord;
  const internals = initializeInternals(rawPolicyNumber);

  Object.defineProperties(thisPolicyRecord, {
    policyNumber: prop(getter(getPolicyNumber))
  } as ObjectProps<PolicyRecord>);

  return Object.seal(thisPolicyRecord);

  function getPolicyNumber(): number {
    return internals.policyNumber ? internals.policyNumber() : rawPolicyNumber;
  }
}

interface Internals {
  policyNumber?: PolicyNumber;
}

function initializeInternals(rawPolicyNumber: number): Internals {
  try {
    return {
      policyNumber: policyNumber(rawPolicyNumber),
    };
  } catch (_e) {
    return {};
  }
}