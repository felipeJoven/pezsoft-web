import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Output() closed = new EventEmitter<void>();

  onClose() {    
    this.closed.emit();
  }
}
