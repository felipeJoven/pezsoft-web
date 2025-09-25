import { Component } from '@angular/core';
import { Especie } from '../model/especie.model';
import { EspecieService } from '../services/especie.service';

@Component({
  selector: 'app-especie-list',
  templateUrl: './especie-list.component.html',
  styleUrls: ['./especie-list.component.css']
})
export class EspecieListComponent {

  especies: Especie[] = [];
  showModal = false;
  selectedEspecie: Especie | null = null;

  constructor(private especieService: EspecieService) { }

  ngOnInit(): void {
    this.cargarEspecies();
  }

  cargarEspecies(): void {
    this.especieService.obtenerEspecies().subscribe({
      next: (data) => {
        this.especies = data,
        console.log("Especies: ", this.especies);      
      },
      error: (e) => console.log("Error cargando especies: ", e)      
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
      error: (e) => console.log("Error eliminando la especie ", e)      
    });
  }
}
