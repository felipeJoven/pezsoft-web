import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl = 'http://localhost:8080/pezsoft/v1/proveedor';

  constructor(private http: HttpClient) { }

  obtenerProveedores(filtro?: string): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }
  
  obtenerProvedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.apiUrl +`/${id}`);
  }

  guardarProveedor(postData: Proveedor, id?: number) {
    if (!id){
      return this.http.post<Proveedor>(this.apiUrl, postData);
    } else {
      return this.http.put<Proveedor>(this.apiUrl + `/${id}`, postData);
    }
  }

  eliminarProveedor(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
