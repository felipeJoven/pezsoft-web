import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css'
})
export class AppModalComponent {
  
  @Input() title: string = '';
  @Input() show: boolean = false;
  @Output() closed = new EventEmitter<void>();

  onClose() {    
    this.closed.emit();
  }
}
