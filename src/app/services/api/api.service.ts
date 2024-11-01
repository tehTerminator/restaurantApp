import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private createUrl(prefix: string, urlData: string[] | string): string {
    let url = urlData;
    if (Array.isArray(urlData)) {
      url = urlData.join('/')
    }
    return `${environment.baseUrl}/${prefix}/${url}`;
  }

  fetch<T>(what: string | string[], payload?: {[key: string]: string}) {
    const url = this.createUrl('get', what);
    return this.http.get<T>(url, {params: payload});
  }

  create<T>(what: string | string[], payload: {[key: string]: any}): Observable<T>{
    const theUrl  = this.createUrl('create', what);
    return this.http.post<T>(theUrl, payload);
  }

  update<T>(what: string | string[], payload: {[key: string]: any}): Observable<T> {
    const theUrl  = this.createUrl('update', what);
    return this.http.put<T>(theUrl, payload);
  }

  delete<T>(what: string | string[], id: number): Observable<T> {
    const theUrl  = this.createUrl('destroy', what);
    return this.http.delete<T>(`${theUrl}/${id}`);
  }
}
