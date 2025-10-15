import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { EspecieService } from '../services/especie.service';
import { Especie } from '../model/especie.model';

@Component({
  selector: 'app-especie-list',
  templateUrl: './especie-list.component.html',
  styleUrls: ['./especie-list.component.css']
})
export class EspecieListComponent implements OnInit, OnDestroy {

  especies: Especie[] = [];
  busquedaControl = new FormControl('');
  ordenControl = new FormControl('');
  showModal = false;
  isLoading = true;
  isFiltering = false;
  errorMessage = '';
  skeletonRows: number[] = [];

  private subscription!: Subscription;
  selectedEspecie: Especie | null = null;

  constructor(private especieService: EspecieService) { }

  ngOnInit(): void {
    this.cargarEspecies();

    this.subscription = this.busquedaControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((filtro) => {
          this.errorMessage = '';
          this.isLoading = true;
          this.isFiltering = !!filtro;

          const cantidad = this.especies?.length > 0 ? this.especies.length : 5;
          this.skeletonRows = Array.from({ length: cantidad });

          return this.especieService.obtenerEspecies(filtro || '').pipe(
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
          this.especies = data;
        }, 300);
      });
  }

  cargarEspecies(): void {
    this.isLoading = true;
    this.isFiltering = false;
    this.skeletonRows = Array.from({ length: 5 });

    this.especieService.obtenerEspecies().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.isLoading = false;
          this.especies = data;
        }, 800);
      },
      error: (e) => {
        console.log('Error cargando especies:', e);
        this.isLoading = false;
      }
    });
  }

  openModal(especie?: Especie): void {
    this.selectedEspecie = especie ?? null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEspecie = null;
  }

  onSave(): void {
    this.closeModal();
    this.cargarEspecies();
  }

  borrarEspecie(id: number): void {
    this.especieService.eliminarEspecie(id).subscribe({
      next: () => this.cargarEspecies(),
      error: (e) => console.log('Error eliminando la especie ', e)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
