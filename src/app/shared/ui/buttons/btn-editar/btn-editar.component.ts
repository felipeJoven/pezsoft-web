import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-btn-editar',
    templateUrl: './btn-editar.component.html',
    styleUrls: ['./btn-editar.component.css']
})
export class BtnEditarComponent { 
    
    @Output() clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }
}