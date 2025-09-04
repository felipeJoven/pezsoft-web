import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-btn-agregar',
    templateUrl: './btn-agregar.component.html',
    styleUrls: ['./btn-agregar.component.css']
})
export class BtnAgregarComponent { 
    
    @Output() clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }
}