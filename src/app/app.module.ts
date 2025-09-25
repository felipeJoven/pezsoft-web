import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { SeparadorDecimalesDirective } from './shared/directives/separador-decimales.directive';

@NgModule({
  declarations: [
    AppComponent,
    // SeparadorDecimalesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
