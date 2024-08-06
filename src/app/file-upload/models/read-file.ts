import { fromEvent, map, Observable, take } from 'rxjs';

export function readFile(file: File): Observable<string[]> {
  const reader = new FileReader();

  try {
    return fromEvent(reader, 'load').pipe(
      map((e: any) => e.target!.result),
      map((x: string) => x.split(',')),
      take(1)
    );
  } finally {
    reader.readAsText(file, 'utf-8');
  }
}
