import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Especie } from '../model/especie.model';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  private apiUrl = 'http://localhost:8080/pezsoft/v1/especie';

  constructor(private http: HttpClient) { }

  obtenerEspecies(filtro?: string): Observable<Especie[]> {
    const url = filtro ? `${this.apiUrl}?filtro=${filtro}` : this.apiUrl;
    return this.http.get<Especie[]>(url).pipe(
      catchError((e) => {
        console.error("Error al filtrar especies: ", e);
        return throwError(() => e);
      })
    );
  }

  obtenerEspeciePorId(id: number): Observable<Especie> {
    return this.http.get<Especie>(this.apiUrl + `/${id}`);
  }

  guardarEspecie(postData: Especie, id?: number) {
    if (!id) {
      return this.http.post<Especie>(this.apiUrl, postData);
    } else {
      return this.http.put<Especie>(this.apiUrl + `/${id}`, postData);
    }
  }

  eliminarEspecie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
