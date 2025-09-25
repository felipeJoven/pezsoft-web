import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEstanque } from './tipo-estanque.model';

@Injectable({
    providedIn: 'root'
})
export class TipoEstanqueService {

    private apiUrl = 'http://localhost:8080/pezsoft/v1/tipo-estanque';

    constructor(private http: HttpClient) { }

    obtenerTiposEstanque(): Observable<TipoEstanque[]> {
        return this.http.get<TipoEstanque[]>(this.apiUrl);
    }
}