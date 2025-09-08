import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'catalogo', loadChildren: () => import('./features/catalogo/catalogo.module').then(m => m.CatalogoModule) },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'inicio' }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
