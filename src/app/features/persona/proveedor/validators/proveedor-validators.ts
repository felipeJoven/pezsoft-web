import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class ProveedorValidators {

    static numeroIdentificacion(control: AbstractControl): ValidationErrors | null {
        
        const value = control.value;

        if (!value) return { required: true };
        if (!/^\d/.test(value)) return null;
        if (!/^[0-9]+(-[0-9])?$/.test(value)) return { invalidFormat: true };
        // if (value.endsWith('-')) return { invalidFormat: true };
        
        const digits = value.replace(/-/g, '');
        if (digits.length < 6 || digits.length > 12) return { leng6a12: true };

        return null;
    }

    static celular(control: AbstractControl): ValidationErrors | null {
        
        const value = control.value;

        if (!value) return { required: true };
        if (!/^\d/.test(value)) return null;
        if (!value.startsWith('3')) return { startWith3: true };      
        if (value.length !== 10) return { length10: true };
        
        return null;
    }

    static telefono(control: AbstractControl): ValidationErrors | null{
        
        const value = control.value;

        if (!value) return null;
        if (!/^\d/.test(value)) return null;
        if (!value.startsWith('60')) return { startWith60: true };        
        if (value.length !== 10) return { length10: true };
        
        return null;
    }
}
