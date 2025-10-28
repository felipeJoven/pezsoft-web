import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.css']
})
export class FiltroBusquedaComponent {

  @Input() searchControl!: FormControl;
  @Input() placeholder: string = '';
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchText: string = '';

  onSearchChange() {
    this.searchChange.emit(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.clear.emit();
  }
}
