import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSoloNumeros]'
})
export class SoloNumerosDirective {

  @Input() allowHyphen: boolean = false;
  private control: any;

  constructor(private el: ElementRef, private controlDir: NgControl) {
    this.control = this.controlDir.control;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (this.allowHyphen) {
      // Dejar solo números y guiones
      value = value.replace(/[^0-9-]/g, '');

      const firstHyphenIndex = value.indexOf('-');

      if (firstHyphenIndex !== -1) {
        // Parte antes del guion
        let beforeHyphen = value.substring(0, firstHyphenIndex);
        // Parte después del guion, máximo 1 dígito
        let afterHyphen = value.substring(firstHyphenIndex + 1, firstHyphenIndex + 2);

        value = beforeHyphen + '-' + afterHyphen;
      }
    } else {
      // Solo números
      value = value.replace(/[^0-9]/g, '');
    }

    input.value = value;
    if (this.control?.value !== value) {
      this.control.setValue(value, { emitEvent: true });
    }
  }
}
