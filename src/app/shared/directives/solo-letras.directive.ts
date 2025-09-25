import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloLetras]'
})
export class SoloLetrasDirective {

  private regex: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const char = event.key;
    if (!this.regex.test(char)) {
      event.preventDefault();
    }
  }
}
