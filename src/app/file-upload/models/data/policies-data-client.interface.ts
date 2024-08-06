import { Observable } from 'rxjs';
import { PolicyDto } from './policy-dto.interface';

export interface PoliciesDataClient {
  sendPolicyData(data: PolicyDto[]): Observable<string>;
}
