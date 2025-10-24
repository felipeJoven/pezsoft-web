import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { EspecieService } from '../services/especie.service';
import { Especie } from '../model/especie.model';
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
  resetSort = false;

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
            catchError((error) => {
              this.errorMessage = error.error?.message || 'No se encontraron especies.';
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
        this.especies = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 800);
      },
      error: (e) => {
        console.log('Error cargando especies:', e);
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
    this.resetSort = !this.resetSort;
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
      error: (e) => console.log('Error eliminando la especie ', e)
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
