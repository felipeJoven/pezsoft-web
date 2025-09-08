import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from './menu.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MenuService {

    private apiUrl = 'http://localhost:8080/pezsoft/v1/menu';

    constructor(private http: HttpClient) { }

    obtenerMenu(rol: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${this.apiUrl}/${rol}`);
    }
}
