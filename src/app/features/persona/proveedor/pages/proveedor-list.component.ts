import { Component } from '@angular/core';
import { Proveedor } from '../model/proveedor.model';
import { ProveedorService } from '../services/proveedor.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent {

  proveedores: Proveedor[] = [];
  busquedaControl = new FormControl('');
  ordenControl = new FormControl('');
  showModal = false;
  selectedProveedor: Proveedor | null = null;

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.obtenerProveedores().subscribe({
      next: (data) => {
        this.proveedores = data,
        console.log("Proveedores: ", this.proveedores);        
      },
      error: (e) => console.log("Error cargando proveedores: ", e)      
    });
  }

  openModal(proveedor?: Proveedor): void {
    this.selectedProveedor = proveedor ?? null;
    this.showModal = true;
    console.log("Datos del proveedor seleccionado: ", this.selectedProveedor);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProveedor = null;
  }

  onSave(): void {
    this.closeModal();
    this.cargarProveedores();
  }

  borrarProveedor(id: number): void {
    this.proveedorService.eliminarProveedor(id).subscribe({
      next: () => this.cargarProveedores(),
      error: (e) => console.log("Error eliminando el proveedor: ", e)      
    });
  }
}
