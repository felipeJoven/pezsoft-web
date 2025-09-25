import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoIdentificacion } from './tipo-identificacion.model';

@Injectable({
    providedIn: 'root'
})
export class TipoIdentificacionService {

    private apiUrl = 'http://localhost:8080/pezsoft/v1/tipo-identificacion';

    constructor(private http: HttpClient) { }

    obtenerTiposIdentificacion(): Observable<TipoIdentificacion[]> {
        return this.http.get<TipoIdentificacion[]>(this.apiUrl);
    }
}