import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'especie',
    loadChildren: () =>
      import('./especie/especie.module').then(m => m.EspecieModule)
  }
 /*  {
    path: 'producto',
    loadChildren: () =>
      import('./producto/producto.module').then(m => m.ProductoModule)
  } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
