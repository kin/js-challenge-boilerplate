export enum DeviceFlags {
  None = 0,
  Portrait = 1 << 0,
  Landscape = 1 << 1,
  Handset = 1 << 2,
  Tablet = 1 << 3,
  Web = 1 << 4,
  AnyOrientation = Portrait | Landscape,
  AnyDevice = Handset | Tablet | Web,
}
