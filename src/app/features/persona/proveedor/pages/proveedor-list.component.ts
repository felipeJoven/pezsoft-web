import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Proveedor } from '../model/proveedor.model';
import { ProveedorService } from '../services/proveedor.service';
import { normalizeString } from '../../../../shared/utils/string-utils';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[] = [];
  proveedoresPaginados: any[] = [];
  proveedorSeleccionado: Proveedor | null = null;

  searchControl = new FormControl('');
  isLoading = true;
  isFiltering = false;
  showModal = false;
  errorMessage = '';
  skeletonRows: number[] = [];
  resetSort = false;

  columns = Array.from({ length: 12 });

  private searchSubscription!: Subscription;

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.loadSuppliers();

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        switchMap((filter) => {
          this.isLoading = true;
          this.isFiltering = !!filter;
          this.errorMessage = '';

          const cantidad = this.proveedoresPaginados?.length > 0 ? this.proveedoresPaginados.length : 5;
          this.skeletonRows = Array.from({ length: cantidad });

          return this.proveedorService.obtenerProveedores(filter || '').pipe(
            catchError((e) => {
              this.errorMessage = e.error?.message || 'No se encontraron proveedores.';
              return of([]);
            })
          );
        })
      )
      .subscribe((data) => {
        setTimeout(() => {
          this.isLoading = false;

          const normalizedFilter = normalizeString(this.searchControl.value || '');
          this.proveedores = data.filter(p =>
            normalizeString(p.razonSocial).includes(normalizedFilter)
          );
        }, 300);
      });
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.isFiltering = false;
    this.skeletonRows = Array.from({ length: 5 });

    this.proveedorService.obtenerProveedores().subscribe({
      next: (data) => {
        console.log("Proveedores: ", data);
        this.proveedores = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 800);
      },
      error: (error) => {
        console.log("Error cargando proveedores: ", error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(data: any[]) {
    this.proveedoresPaginados = data;
  }

  clearSearch(): void {
    this.searchControl.reset('');
    this.loadSuppliers();
    this.resetSort = !this.resetSort;
  }

  openModal(proveedor?: Proveedor): void {
    this.proveedorSeleccionado = proveedor ?? null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.proveedorSeleccionado = null;
  }

  onSave(): void {
    this.closeModal();
    this.loadSuppliers();
  }

  deleteSuppliers(id: number): void {
    this.proveedorService.eliminarProveedor(id).subscribe({
      next: () => this.loadSuppliers(),
      error: (error) => console.log("Error eliminando el proveedor: ", error)
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}

