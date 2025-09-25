import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSeparadorMiles]'
})
export class SeparadorMilesDirective {

  private regex: RegExp = new RegExp(/^\d+$/);

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\./g, '');

    if (!this.regex.test(value) && value !== '') {
      value = value.replace(/\D/g, ''); 
    }

    if (value) {
      input.value = this.formatearMiles(value);
    }
  }

  private formatearMiles(valor: string): string {
    return valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
