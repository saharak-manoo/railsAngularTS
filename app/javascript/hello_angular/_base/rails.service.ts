import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RailsService {
  resources: string;

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get('/' + this.resources);
  }

  getDataForTable(attrs) {
    return this.http.get('/' + this.resources, { params: attrs });
  }

  create(attrs) {
    return this.http.post('/' + this.resources, attrs);
  }

  find(id) {
    return this.http.get('/' + this.resources + '/' + id);
  }

  update(id, attrs) {
    return this.http.put('/' + this.resources + '/' + id, attrs);
  }

  delete(id) {
    return this.http.delete('/' + this.resources + '/' + id);
  }
}
