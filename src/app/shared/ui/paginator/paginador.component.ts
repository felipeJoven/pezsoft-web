import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() itemsPorPagina = 5;
  @Output() dataPaginadaChange = new EventEmitter<any[]>(); // 🔹 Envia los datos al padre

  paginaActual = 1;
  paginasTotales = 1;
  opciones = [5, 10, 15, 20];
  paginasVisibles: number[] = [];

  ngOnChanges() {
    this.actualizarPaginacion();
  }

  private actualizarPaginacion() {
    this.paginasTotales = Math.ceil(this.data.length / this.itemsPorPagina) || 1;
    if (this.paginaActual > this.paginasTotales) this.paginaActual = this.paginasTotales;
    this.cambiarPagina(this.paginaActual);
  }

  cambiarItemsPorPagina(event: Event) {
    const valor = +(event.target as HTMLSelectElement).value;
    this.itemsPorPagina = valor;
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    const dataPaginada = this.data.slice(inicio, fin);

    this.dataPaginadaChange.emit(dataPaginada); // 🔹 Emite los registros paginados

    const range = 2;
    const start = Math.max(1, this.paginaActual - range);
    const end = Math.min(this.paginasTotales, this.paginaActual + range);
    this.paginasVisibles = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  prevPage() {
    if (this.paginaActual > 1) this.cambiarPagina(this.paginaActual - 1);
  }

  nextPage() {
    if (this.paginaActual < this.paginasTotales) this.cambiarPagina(this.paginaActual + 1);
  }

  firstPage() {
    this.cambiarPagina(1);
  }

  lastPage() {
    this.cambiarPagina(this.paginasTotales);
  }
}
