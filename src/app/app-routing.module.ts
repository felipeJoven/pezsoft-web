import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'produccion', loadChildren: () => import('./features/produccion/produccion.module').then(m => m.ProduccionModule) },
      { path: 'persona', loadChildren: () => import('./features/persona/persona.module').then(m => m.PersonaModule) },
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
