import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true
})

export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter<File[]>();

  constructor() { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files) {
      this.fileDropped.emit(Array.from(files));
    }
  }
}
