import { Observable } from 'rxjs';
import { SearchBody } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';
import { SearchResult } from './search.interface';

export interface SearchGrpcService {
  indexMedia(payload: SearchBody): Observable<{ statusCode: number }>;
  search(payload: SearchArgs): Observable<{ res: SearchResult[] }>;
  update(payload: SearchBody): Observable<{ statusCode: number }>;
  remove(payload: DeleteArgs): Observable<{ statusCode: number }>;
  clearIndex(payload: any): Observable<{ statusCode: number }>;
}
