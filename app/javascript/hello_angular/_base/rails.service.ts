import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RailsService {
  resources: string;

  constructor(private http: HttpClient) { }

  all(path) {
    return this.http.get('/' + path);
  }

  getDataForTable(path, attrs) {
    return this.http.get('/' + path, { params: attrs });
  }

  create(path, attrs) {
    return this.http.post('/' + path, attrs);
  }

  find(path, id) {
    return this.http.get('/' + path + '/' + id);
  }

  update(path, id, attrs) {
    return this.http.put('/' + path + '/' + id, attrs);
  }

  delete(path, id) {
    return this.http.delete('/' + path + '/' + id);
  }

  signIn(path, attrs) {
    return this.http.post('/' + path, attrs);
  }

  signOut(path) {
    return this.http.delete('/' + path);
  }
}
