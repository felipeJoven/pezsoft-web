import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-orden',
  templateUrl: './filtro-orden.component.html',
  styleUrls: ['./filtro-orden.component.css']
})
export class FiltroOrdenComponent {  

  @Input() data: any[] = [];
  @Input() textField: string = '';
  @Input() dateField: string = '';
  
  @Output() sortedData = new EventEmitter<any[]>();

  orderControl = new FormControl('');

  constructor() {
    this.orderControl.valueChanges.subscribe(value => this.sortColumn(value));
  }

  sortColumn(value: string | null) {
    if (!this.data || !value) return;
    let sorted = [...this.data];

    switch (value) {
      case 'az':
        sorted.sort((a, b) => a[this.textField]?.localeCompare(b[this.textField]));
        break;
      case 'za':
        sorted.sort((a, b) => b[this.textField]?.localeCompare(a[this.textField]));
        break;
      case 'fecha-asc':
        sorted.sort((a, b) => new Date(a[this.dateField]).getTime() - new Date(b[this.dateField]).getTime());
        break;
      case 'fecha-desc':
        sorted.sort((a, b) => new Date(b[this.dateField]).getTime() - new Date(a[this.dateField]).getTime());
        break;
    }

    this.sortedData.emit(sorted);
  }
}
