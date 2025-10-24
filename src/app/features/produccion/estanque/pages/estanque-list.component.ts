import { Component } from '@angular/core';
import { Estanque } from '../model/estanque.model';
import { EstanqueService } from '../services/estanque.service';

@Component({
  selector: 'app-estanque-list',
  templateUrl: './estanque-list.component.html',
  styleUrls: ['./estanque-list.component.css']
})
export class EstanqueListComponent {

  estanques: Estanque[] = [];
  showModal = false;
  selectedEstanque: Estanque | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private estanqueService: EstanqueService) { }

  ngOnInit(): void {
    this.cargarEstanques();
  }

  cargarEstanques(): void {
    this.estanqueService.obtenerEstanques().subscribe({
      next: (data) => {
        this.estanques = data,
        this.isLoading = false;
        this.errorMessage = '';
        console.log("Estanques: ", this.estanques);
      },
      error: (e) => {
        console.log("Error cargando estanques: ", e);      
        this.isLoading = false;
      }
    });
  }

  openModal(estanque?: Estanque): void {
    this.selectedEstanque = estanque ?? null;
    console.log("Datos del estanque seleccionado: ", this.selectedEstanque);    
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEstanque = null;
  }

  onSave(): void {
    this.closeModal();
    this.cargarEstanques();
  }

  borrarEstanque(id: number): void {
    this.estanqueService.eliminarEstanque(id).subscribe({
      next: () => this.cargarEstanques(),
      error: (e) => console.log("Error eliminando el estanque: ", e)      
    });
  }
}
