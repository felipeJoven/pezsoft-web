import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstanqueListComponent } from './pages/estanque-list.component';

const routes: Routes = [
  { path: '', component: EstanqueListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstanqueRoutingModule { }
