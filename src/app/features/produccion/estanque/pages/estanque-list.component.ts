import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Estanque } from '../model/estanque.model';
import { EstanqueService } from '../services/estanque.service';
import { normalizeString } from '../../../../shared/utils/string-utils';

@Component({
  selector: 'app-estanque-list',
  templateUrl: './estanque-list.component.html',
  styleUrls: ['./estanque-list.component.css']
})
export class EstanqueListComponent implements OnInit, OnDestroy {

  estanques: Estanque[] = [];
  estanquesPaginados: any[] = [];
  estanqueSeleccionado: Estanque | null = null;

  searchControl = new FormControl('');
  isLoading = true;
  isFiltering = false;
  showModal = false;
  errorMessage = '';
  skeletonRows: number[] = [];

  columns = Array.from({ length: 10 });

  private searchSubscription!: Subscription;

  constructor(private estanqueService: EstanqueService) { }

  ngOnInit(): void {
    this.loadPonds();

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((filter) => {
          this.isLoading = true;
          this.isFiltering = !!filter;
          this.errorMessage = '';

          const cantidad = this.estanquesPaginados?.length > 0 ? this.estanquesPaginados.length : 5;
          this.skeletonRows = Array.from({ length: cantidad });

          return this.estanqueService.obtenerEstanques(filter || '').pipe(
            catchError((e) => {
              this.errorMessage = e.error?.message || 'No se encontraron estanques.';
              return of([]);
            })
          );
        })
      )
      .subscribe((data) => {
        setTimeout(() => {
          this.isLoading = false;

          const normalizedFilter = normalizeString(this.searchControl.value || '');
          this.estanques = data.filter(e =>
            normalizeString(e.estanque).includes(normalizedFilter)
          );
        }, 300);
      });
  }

  loadPonds(): void {
    this.isLoading = true;
    this.isFiltering = false;
    this.skeletonRows = Array.from({ length: 5 });

    this.estanqueService.obtenerEstanques().subscribe({
      next: (data) => {
        console.log("Estanques: ", data);
        this.estanques = data,
        setTimeout(() => {
          this.isLoading = false;
        }, 800);  
      },
      error: (error) => {
        console.log("Error cargando estanques: ", error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(data: any[]) {
    this.estanquesPaginados = data;
  }

  clearSearch(): void {
    this.searchControl.reset('');
    this.loadPonds();
  }

  openModal(estanque?: Estanque): void {
    this.estanqueSeleccionado = estanque ?? null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.estanqueSeleccionado = null;
  }

  onSave(): void {
    this.closeModal();
    this.loadPonds();
  }

  deletePonds(id: number): void {
    this.estanqueService.eliminarEstanque(id).subscribe({
      next: () => this.loadPonds(),
      error: (error) => console.log("Error eliminando el estanque: ", error)
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
