import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Modal } from '@shared/models';

let componentDef: any;

@Injectable({ providedIn: 'root' })
export class FileUploadModal implements Modal {
  public static registerComponent(component: any) {
    componentDef = component;
  }
  public dismiss = dismissFn();
  public open = openFn();
}

function dismissFn(): () => void {
  const dialog = inject(Dialog);

  return function dismiss(): void {
    dialog.closeAll();
  };
}

function openFn(): () => void {
  const dialog = inject(Dialog);

  return function open(): void {
    dialog.open(componentDef, { disableClose: true });
  };
}
