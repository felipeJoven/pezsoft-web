import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent {
  
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Output() closed = new EventEmitter<void>();

  onClose() {    
    this.closed.emit();
  }
}
