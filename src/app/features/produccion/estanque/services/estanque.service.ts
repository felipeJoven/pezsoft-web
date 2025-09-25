import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estanque } from '../model/estanque.model';

@Injectable({
  providedIn: 'root'
})
export class EstanqueService {

  private apiUrl = 'http://localhost:8080/pezsoft/v1/estanque';

  constructor(private http: HttpClient) { }

  obtenerEstanques(filtro?: string): Observable<Estanque[]> {
    return this.http.get<Estanque[]>(this.apiUrl);
  }

  obtenerEstanquePorId(id: number): Observable<Estanque> {
    return this.http.get<Estanque>(this.apiUrl + `/${id}`);
  }

  guardarEstanque(postData: Estanque, id?: number) {
    if (!id) {
      return this.http.post<Estanque>(this.apiUrl, postData);
    } else {
      return this.http.put<Estanque>(this.apiUrl + `/${id}`, postData);
    }
  }

  eliminarEstanque(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
