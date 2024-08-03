import { inject, Injectable, signal, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest, debounceTime, filter, map, tap } from 'rxjs';
import { DeviceFlags } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class DeviceFlagsService {
  public flags = flagsSignal();
}

function flagsSignal(): Signal<number> {
  const breakpoints = inject(BreakpointObserver);
  let currentFlags = DeviceFlags.None;
  const flags = signal<number>(currentFlags);

  combineLatest([
    breakpoints.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
    ]),
    breakpoints.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
    ]),
    breakpoints.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ]),
  ]).pipe(
    debounceTime(300),
    map(([handset, tablet, portrait]) => {
      return [
        handset.matches
          ? DeviceFlags.Handset
          : tablet.matches
            ? DeviceFlags.Tablet
            : DeviceFlags.Web,
        portrait.matches ? DeviceFlags.Portrait : DeviceFlags.Landscape
      ];
    }),
    map(([device, orientation]) => {
      const currentDevice = currentFlags & ~DeviceFlags.AnyOrientation;

      currentFlags = device > currentDevice
        ? device | orientation
        : currentDevice | orientation;

      return currentFlags;
    }),
  ).subscribe(x => {
    console.log(x);
    flags.set(x);
  });

  return flags;
}