import { SearchBody } from './search.model';

export interface Source {
  _source: SearchBody;
}

export interface Hit {
  total: number;
  hits: Source[];
}

export interface SearchResult {
  hits: Hit;
}