import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, take } from 'rxjs';
import {
  PoliciesDataClient as DataClient,
  PolicyDto
} from '@file-upload/models';

const url = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({ providedIn: 'root' })
export class PoliciesDataClient implements DataClient {
  public sendPolicyData = sendPolicyDataFn();
}

function sendPolicyDataFn(): (data: PolicyDto[]) => Observable<string> {
  const http = inject(HttpClient);

  return function (data: PolicyDto[]): Observable<string> {
    return http.post<{ id: string; }>(url, data).pipe(
      map(x => x.id),
      take(1)
    );
  };
}
