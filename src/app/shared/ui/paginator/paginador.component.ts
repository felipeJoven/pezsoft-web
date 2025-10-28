import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnChanges {
  
  @Input() data: any[] = [];
  @Input() itemsPerPage = 5;
  
  @Output() paginatedDataChange  = new EventEmitter<any[]>(); 

  currentPage = 1;
  totalPages = 1;
  options = [5, 10, 15, 20];
  visiblePages: number[] = [];

  ngOnChanges() {
    this.updatePagination();
  }

  private updatePagination() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    this.pageChange(this.currentPage);
  }

  changeItemsPerPage(event: Event) {
    const valor = +(event.target as HTMLSelectElement).value;
    this.itemsPerPage = valor;
    this.currentPage = 1;
    this.updatePagination();
  }

  pageChange(pagina: number) {
    this.currentPage = pagina;
    const inicio = (pagina - 1) * this.itemsPerPage;
    const fin = inicio + this.itemsPerPage;
    const dataPaginada = this.data.slice(inicio, fin);

    this.paginatedDataChange .emit(dataPaginada); 

    const range = 2;
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);
    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  prevPage() {
    if (this.currentPage > 1) this.pageChange(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.pageChange(this.currentPage + 1);
  }

  firstPage() {
    this.pageChange(1);
  }

  lastPage() {
    this.pageChange(this.totalPages);
  }
}
