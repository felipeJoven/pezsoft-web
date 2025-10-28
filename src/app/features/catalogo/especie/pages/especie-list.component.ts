import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Especie } from '../model/especie.model';
import { EspecieService } from '../services/especie.service';
import { normalizeString } from '../../../../shared/utils/string-utils';

@Component({
  selector: 'app-especie-list',
  templateUrl: './especie-list.component.html',
  styleUrls: ['./especie-list.component.css']
})
export class EspecieListComponent implements OnInit, OnDestroy {

  especies: Especie[] = [];
  especiesPaginadas: any[] = [];
  especieSeleccionada: Especie | null = null;
  
  searchControl = new FormControl('');
  isLoading = true;
  isFiltering = false;
  showModal = false;
  errorMessage = '';
  skeletonRows: number[] = [];

  columns = Array.from({ length: 3 });

  private searchSubscription!: Subscription;

  constructor(private especieService: EspecieService) { }

  ngOnInit(): void {
    this.loadSpecies();

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((filter) => {
          this.isLoading = true;
          this.isFiltering = !!filter;
          this.errorMessage = '';

          const cantidad = this.especiesPaginadas?.length > 0 ? this.especiesPaginadas.length : 5;
          this.skeletonRows = Array.from({ length: cantidad });

          return this.especieService.obtenerEspecies(filter || '').pipe(
            catchError((e) => {
              this.errorMessage = e.error?.message || 'No se encontraron especies.';
              return of([]);
            })
          );
        })
      )
      .subscribe((data) => {
        setTimeout(() => {
          this.isLoading = false;

          const normalizedFilter = normalizeString(this.searchControl.value || '');
          this.especies = data.filter(e =>
            normalizeString(e.especie).includes(normalizedFilter)
          );
        }, 300);
      });
  }

  loadSpecies(): void {
    this.isLoading = true;
    this.isFiltering = false;
    this.skeletonRows = Array.from({ length: 5 });

    this.especieService.obtenerEspecies().subscribe({
      next: (data) => {
        console.log('Especies:', data);
        this.especies = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 800);
      },
      error: (error) => {
        console.log('Error cargando especies:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(data: any[]) {
    this.especiesPaginadas = data;
  }

  clearSearch(): void {
    this.searchControl.reset('');
    this.loadSpecies();
  }

  openModal(especie?: Especie): void {
    this.especieSeleccionada = especie ?? null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.especieSeleccionada = null;
  }

  onSave(): void {
    this.closeModal();
    this.loadSpecies();
  }

  deleteSpecies(id: number): void {
    this.especieService.eliminarEspecie(id).subscribe({
      next: () => this.loadSpecies(),
      error: (error) => console.log('Error eliminando la especie ', error)
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
