import { Component, computed, inject, Signal } from '@angular/core';
import { DeviceFlags } from '@shared/models';
import { DeviceFlagsService } from '@shared/providers';

@Component({
  standalone: true,
  template: ''
})
export class DeviceComponent {
  public device = computeDevice();
  public orientation = computeOrientation();
  public Device = DeviceFlags;
}

function computeDevice(): Signal<number | undefined> {
  const svc = inject(DeviceFlagsService);

  return computed(() => svc.flags() & ~DeviceFlags.AnyOrientation);
}

function computeOrientation(): Signal<number> {
  const svc = inject(DeviceFlagsService);

  return computed(() => svc.flags() & ~DeviceFlags.AnyDevice);
}
