export interface SlideUpWindowEvent extends Event {
  currentTop: number;
}

export interface FindMyLocationEvent extends Event {
  coordinates: [number, number];
}
