import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [SpinnerComponent, IconComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  @Input() isLoading = false;
  @Input() fileName = '';
  @Input() hasFile = false;

  @Output() fileSelected = new EventEmitter<File>();

  isDragging = false;

  openFilePicker(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
    // Reset so the same file can be re-selected after clearing
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
