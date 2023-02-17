import { calcInterpolation } from '@libs/utils/calc';
import mapboxgl from 'mapbox-gl';

export default class PulsingDot {
  width: number;

  height: number;

  size: number;

  data: Uint8Array | Uint8ClampedArray;

  context: CanvasRenderingContext2D | null;

  map: mapboxgl.Map;

  constructor(map: mapboxgl.Map) {
    this.size = 100;
    this.width = this.size;
    this.height = this.size;
    this.data = new Uint8Array(this.size * this.size * 4);
    this.context = null;
    this.map = map;
  }

  onAdd() {
    const canvas = document.createElement('canvas');
    canvas.width = this.size;
    canvas.height = this.size;
    this.context = canvas.getContext('2d', { willReadFrequently: true });
  }

  render() {
    if (!this.context) return;

    const { context, map, size } = this;

    const duration = 1800;
    const a = 3 / 4;
    const n = performance.now() % duration;
    const p = n > duration * a ? 1 : ((n / duration) * 1) / a;
    const radius = (size / 2) * 0.3;
    const i = calcInterpolation({ min: radius, max: radius * 3, ratio: p });

    context.clearRect(0, 0, size, size);

    // draw background
    context.beginPath();
    context.lineWidth = 0;
    context.arc(size / 2, size / 2, radius * 3, 0, Math.PI * 2);
    context.fillStyle = colorGenerator('background', 0.5);
    context.fill();
    context.closePath();

    // draw Pulsing Line
    context.beginPath();
    context.lineWidth = 6 * (1 - p);
    context.strokeStyle = colorGenerator('white', 1 - p);
    context.arc(size / 2, size / 2, i, 0, Math.PI * 2);
    context.stroke();
    context.closePath();

    // draw gradient
    const gradient = context.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, 30);
    gradient.addColorStop(0, colorGenerator('black', 0.2));
    gradient.addColorStop(0.7, colorGenerator('shadow', 0.1));
    gradient.addColorStop(1, colorGenerator('white', 0));
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    // draw black dot
    context.beginPath();
    context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    context.fillStyle = colorGenerator('black', 1);
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = 'white';
    context.stroke();
    context.closePath();

    this.data = context.getImageData(0, 0, size, size).data;

    map.triggerRepaint();

    // eslint-disable-next-line consistent-return
    return true;
  }
}

enum PulsingDotColor {
  background = 190,
  white = 255,
  shadow = 216,
  black = 13,
}

const colorGenerator = (colorType: keyof typeof PulsingDotColor, a: number) => {
  if (
    !Object.keys(PulsingDotColor)
      .filter((v) => !+v && v !== '0')
      .includes(colorType)
  )
    return `rgba(0,0,0,0)`;

  const v = PulsingDotColor[colorType];
  return `rgba(${v},${v},${v},${a})`;
};
