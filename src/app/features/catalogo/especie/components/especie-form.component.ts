import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Especie } from '../model/especie.model';
import { EspecieService } from '../services/especie.service';

@Component({
  selector: 'app-especie-form',
  templateUrl: './especie-form.component.html',
  styleUrls: ['./especie-form.component.css']
})
export class EspecieFormComponent implements OnChanges {

  @Input() especie: Especie | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  especieForm: FormGroup;

  constructor(private fb: FormBuilder, private especieService: EspecieService) {
    this.especieForm = this.fb.group({
      especie: ['', Validators.required]
    });
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['especie'] && this.especie) {
      this.especieForm.patchValue(this.especie);
      this.especieForm.markAsPristine();
      this.especieForm.markAsUntouched();
    } else {
      this.especieForm.reset();
      this.especieForm.markAsPristine();
      this.especieForm.markAsUntouched();
    }
  }

  onSubmit(): void {
    if (this.especieForm.valid) {
      const formValue = this.especieForm.value;
      const id = this.especie?.id;

      this.especieService.guardarEspecie(formValue, id).subscribe({
        next: () => this.guardado.emit(),
        error: (e) => console.error('Error guardando especie: ', e)
      });
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }
}
