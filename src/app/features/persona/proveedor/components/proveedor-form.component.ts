import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Proveedor } from '../model/proveedor.model';
import { TipoIdentificacion } from '../../tipo-identificacion/tipo-identificacion.model';
import { TipoProveedor } from '../tipo-proveedor/tipo-proveedor.model';
import { ProveedorService } from '../services/proveedor.service';
import { TipoIdentificacionService } from '../../tipo-identificacion/tipo-identificacion.service';
import { TipoProveedorService } from '../tipo-proveedor/tipo-proveedor.service';
import { ProveedorValidators } from '../validators/proveedor-validators';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit, OnChanges {

  @Input() proveedor: Proveedor | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  proveedorForm: FormGroup;
  tipoIdentificacion: TipoIdentificacion[] = [];
  tipoProveedor: TipoProveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private tipoProveedorService: TipoProveedorService,
  ) {
    this.proveedorForm = this.fb.group({
      razonSocial: ['', Validators.required],
      numeroIdentificacion: ['', ProveedorValidators.numeroIdentificacion],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, ProveedorValidators.celular]],
      telefono: ['', ProveedorValidators.telefono],
      correo: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.(com|co)$/i)]],
      direccion: ['', Validators.required],
      tipoIdentificacionId: [null, Validators.required],
      tipoProveedorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTiposIdentificacion();
    this.cargarTiposProveedor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proveedor'] && this.proveedor) {
      this.proveedorForm.patchValue(this.proveedor);
      this.proveedorForm.markAsPristine();
      this.proveedorForm.markAsUntouched();
    } else {
      this.proveedorForm.reset();
      this.proveedorForm.markAsPristine();
      this.proveedorForm.markAsUntouched();
    }
  }

  private cargarTiposIdentificacion() {
    this.tipoIdentificacionService.obtenerTiposIdentificacion().subscribe({
      next: (data) => {
        console.log("Respuesta del backend", data),
          this.tipoIdentificacion = data
      },
      error: (e) => console.log("Error cargando tipos de identificación: ", e)

    });
  }

  private cargarTiposProveedor() {
    this.tipoProveedorService.obtenerTiposProveedor().subscribe({
      next: (data) => {
        console.log("Respuesta del backend", data),
          this.tipoProveedor = data
      },
      error: (e) => console.log("Error cargando tipos de proveedor: ", e)
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const formValue = this.proveedorForm.value;
      const id = this.proveedor?.id;

      this.proveedorService.guardarProveedor(formValue, id).subscribe({
        next: () => this.guardado.emit(),
        error: (e) => console.log("Error guardando proveedor", e)
      });
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }
}
