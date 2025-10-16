import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-orden',
  templateUrl: './filtro-orden.component.html',
  styleUrls: ['./filtro-orden.component.css']
})
export class FiltroOrdenComponent {

  @Input() orderControl!: FormControl;
  @Input() orderOptions: { label: string; value: string }[] = [];  
  @Output() orderChange = new EventEmitter<string>();

  onOrderChange() {
    this.orderChange.emit(this.orderControl.value);
  }
}
