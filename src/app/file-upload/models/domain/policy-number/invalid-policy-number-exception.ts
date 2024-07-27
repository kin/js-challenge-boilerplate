export class InvalidPolicyNumberException extends Error {
  public constructor(invalidPolicyNumber: number) {
    super(`${invalidPolicyNumber} is not a valid Policy Number`);
    this.name = 'InvalidPolicyNumberException';
  }
}
