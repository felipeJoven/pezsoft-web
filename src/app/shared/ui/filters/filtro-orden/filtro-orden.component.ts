import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-orden',
  templateUrl: './filtro-orden.component.html',
  styleUrls: ['./filtro-orden.component.css']
})
export class FiltroOrdenComponent {
  
  @Input() data: any[] = [];
  @Input() campoTexto: string = '';
  @Input() campoFecha: string = '';
  @Input() resetSignal: boolean = false;
  @Output() sortedData = new EventEmitter<any[]>();


  ordenControl = new FormControl('');

  constructor() {
    this.ordenControl.valueChanges.subscribe(value => this.ordenar(value));
  }

  ordenar(value: string | null) {
    if (!this.data || !value) return;
    let sorted = [...this.data];

    switch (value) {
      case 'az':
        sorted.sort((a, b) => a[this.campoTexto]?.localeCompare(b[this.campoTexto]));
        break;
      case 'za':
        sorted.sort((a, b) => b[this.campoTexto]?.localeCompare(a[this.campoTexto]));
        break;
      case 'fecha-asc':
        sorted.sort((a, b) => new Date(a[this.campoFecha]).getTime() - new Date(b[this.campoFecha]).getTime());
        break;
      case 'fecha-desc':
        sorted.sort((a, b) => new Date(b[this.campoFecha]).getTime() - new Date(a[this.campoFecha]).getTime());
        break;
    }

    this.sortedData.emit(sorted);
  }
}
