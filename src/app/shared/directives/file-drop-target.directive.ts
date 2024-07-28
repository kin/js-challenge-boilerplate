import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[knFileDropTarget]',
  standalone: true,
})
export class FileDropTargetDirective {
  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleDrag(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  @HostListener('drop', ['$event'])
  public handleDrop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer) {
      this.fileDropped.emit(event.dataTransfer.files);
    }
  }

  public readonly fileDropped = output<FileList>();
}
