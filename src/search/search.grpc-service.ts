import { Observable } from 'rxjs';
import { SearchBody } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';

export interface SearchGrpcService {
  indexMedia(payload: SearchBody): Observable<{ statusCode: number }>;
  search(payload: SearchArgs): Observable<{ res: SearchBody[] }>;
  update(payload: SearchBody): Observable<{ statusCode: number }>;
  remove(payload: DeleteArgs): Observable<{ statusCode: number }>;
  clearIndex(payload: any): Observable<{ statusCode: number }>;
}
