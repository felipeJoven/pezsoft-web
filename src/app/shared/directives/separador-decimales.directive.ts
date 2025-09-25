import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSeparadorDecimales]'
})
export class SeparadorDecimalesDirective {

  constructor(private control: NgControl) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9.,]/; 
    const inputChar = event.key;

    if (!allowedChars.test(inputChar)) {
      event.preventDefault(); 
    }

    if ((inputChar === ',' || inputChar === '.') && event.target instanceof HTMLInputElement) {
      if (event.target.value.includes(',')) {
        event.preventDefault();
      }
    }
  }

  // Mientras el usuario escribe
  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value: string = event.target.value;

    // Reemplazar punto por coma para mostrar en pantalla
    value = value.replace('.', ',');

    // Actualizar lo que se ve en el input
    this.control.control?.setValue(value, { emitEvent: false });
  }

  // Cuando el campo pierde foco → convertir a punto para enviar al backend
  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    let value: string = event.target.value;

    if (value.includes(',')) {
      value = value.replace(',', '.');
    }

    this.control.control?.setValue(value, { emitEvent: true });
  }
}
