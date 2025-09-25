import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProveedor } from './tipo-proveedor.model';

@Injectable({
    providedIn: 'root'
})
export class TipoProveedorService {

    private apiUrl = 'http://localhost:8080/pezsoft/v1/tipo-proveedor';

    constructor(private http: HttpClient) { }

    obtenerTiposProveedor(): Observable<TipoProveedor[]> {
        return this.http.get<TipoProveedor[]>(this.apiUrl);
    }
}