import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Estanque } from '../model/estanque.model';
import { TipoEstanque } from '../tipo-estanque/tipo-estanque.model';

import { EstanqueService } from '../services/estanque.service';
import { TipoEstanqueService } from '../tipo-estanque/tipo-estanque.service';

@Component({
  selector: 'app-estanque-form',
  templateUrl: './estanque-form.component.html',
  styleUrls: ['./estanque-form.component.css']
})
export class EstanqueFormComponent implements OnInit, OnChanges {

  @Input() estanque: Estanque | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  estanqueForm: FormGroup;
  tipoEstanque: TipoEstanque[] = [];

  constructor(
    private fb: FormBuilder,
    private estanqueService: EstanqueService,
    private tipoEstanqueService: TipoEstanqueService
  ) {
    this.estanqueForm = this.fb.group({
      estanque: ['', Validators.required],
      coordenadas: ['', Validators.required],
      largo: [0, [Validators.required, Validators.min(1)]],
      ancho: [0, [Validators.required, Validators.min(1)]],
      profundidad: [0, [Validators.required, Validators.min(1)]],
      tipoEstanqueId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTiposEstanque();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estanque'] && this.estanque) {
      this.estanqueForm.patchValue(this.estanque);
    } else {
      this.estanqueForm.reset();
    }
  }

  calcularArea(): string {
    const largoStr = this.estanqueForm.get('largo')?.value;
    const anchoStr = this.estanqueForm.get('ancho')?.value;

    const largo = parseFloat(largoStr?.toString().replace(',', '.'));
    const ancho = parseFloat(anchoStr?.toString().replace(',', '.'));

    if (!isNaN(largo) && !isNaN(ancho)) {
      const area = (largo * ancho).toFixed(2);
      return area.replace('.', ',') + ' m²';
    }
    return '';
  }

  private cargarTiposEstanque(): void {
    this.tipoEstanqueService.obtenerTiposEstanque().subscribe({
      next: (data) => {
        console.log("Respuesta del backend:", data);
        this.tipoEstanque = data
      },
      error: (e) => console.log("Error cargando tipos de estanque: ", e)

    });
  }

  onSubmit(): void {
    if (this.estanqueForm.valid) {
      const formValue = this.estanqueForm.value;
      const id = this.estanque?.id;

      this.estanqueService.guardarEstanque(formValue, id).subscribe({
        next: () => this.guardado.emit(),
        error: (e) => console.error("Error guardando estanque: ", e)
      });
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }
}
