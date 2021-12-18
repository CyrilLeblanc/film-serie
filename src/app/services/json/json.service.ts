import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  constructor(private http: HttpClient) {}

  getProducts(type: string, filter: string, page: number): Observable<any> {
    return this.http.get(
      `https://www.omdbapi.com/?apikey=cda8e640&s=${filter}&type=${type}&page=${page}`
    );
  }

  getInfo(imdbID: string): Observable<any> {
    return this.http.get(
      `https://www.omdbapi.com/?apikey=cda8e640&i=${imdbID}&plot=full`
    );
  }
}
