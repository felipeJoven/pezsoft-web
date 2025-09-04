import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-btn-eliminar',
    templateUrl: './btn-eliminar.component.html',
    styleUrls: ['./btn-eliminar.component.css']
})
export class BtnEliminarComponent { 
    
    @Output() clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }
}