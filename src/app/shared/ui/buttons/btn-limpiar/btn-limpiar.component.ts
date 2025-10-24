import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-btn-limpiar',
    templateUrl: './btn-limpiar.component.html',
    styleUrls: ['./btn-limpiar.component.css']
})
export class BtnLimpiarComponent { 
    
    @Output() clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }
}