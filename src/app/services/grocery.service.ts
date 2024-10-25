import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGroceries(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
}
