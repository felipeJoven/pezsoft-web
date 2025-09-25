import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'estanque',
    loadChildren: () =>
      import('./estanque/estanque.module').then(m => m.EstanqueModule)
  }
 /*  {
    path: 'lote',
    loadChildren: () =>
      import('./producto/producto.module').then(m => m.ProductoModule)
  } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
