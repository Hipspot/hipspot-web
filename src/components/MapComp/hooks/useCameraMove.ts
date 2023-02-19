import { FlyToOptions, LngLatLike } from 'mapbox-gl';
import useMap from './useMap';

export interface CameraStateType {
  center: LngLatLike;
  pitch: number;
  bearing: number;
  markerClicked: boolean;
  zoom: number;
}

export type CameraMoveFunctionType = (coordinate: LngLatLike, option?: CameraMoveOptions) => void;

type CameraMoveOptions = Omit<FlyToOptions, 'center'>;

const defaultCameraState: CameraStateType = {
  center: [127.0582071, 37.5447481],
  pitch: 0,
  bearing: 0,
  markerClicked: false,
  zoom: 17,
};

const currentCameraState = { current: { ...defaultCameraState } };
const prevCameraState = { current: { ...defaultCameraState } };

function useCameraMove() {
  const mapRef = useMap();

  const flyTo: CameraMoveFunctionType = (coordinate, option) => {
    const map = mapRef.current;
    if (!map) return;
    prevCameraState.current = currentCameraState.current;
    const nextState: CameraStateType = { ...prevCameraState.current, center: coordinate, ...option };
    currentCameraState.current = nextState;
    // console.log('flyTo', prevCameraState.current, '->', nextState);
    map.flyTo(nextState);
  };

  const tiltFlyTo: CameraMoveFunctionType = (coordinate, option) => {
    const map = mapRef.current;
    if (!map) return;

    prevCameraState.current = currentCameraState.current;
    const nextState = { ...prevCameraState.current, ...tiltNextState({ coordinate }), ...option };
    currentCameraState.current = nextState;

    map.flyTo(nextState);
    // console.log('flyTo', prevCameraState.current, '->', nextState);
  };

  const flyToPrev = () => {
    const map = mapRef.current;
    if (!map) return;
    currentCameraState.current = prevCameraState.current;
    // console.log('flyToPrev', currentCameraState.current, prevCameraState.current);
    map.flyTo({
      ...currentCameraState.current,
    });
  };

  const savePrevPostion: CameraMoveFunctionType = (coordinate, option) => {
    currentCameraState.current = { ...prevCameraState.current, center: coordinate, ...option };
    // console.log('save -->', { ...prevCameraState.current, center: coordinate, ...option });
  };

  return { flyTo, tiltFlyTo, flyToPrev, savePrevPostion };
}

export default useCameraMove;

const tiltNextState = ({ coordinate }: { coordinate: LngLatLike }): FlyToOptions => {
  const RAD = 15;
  const DURATION = 500;
  const PITCH = 50;

  return {
    center: coordinate,
    bearing: -2 * RAD - 3,
    pitch: PITCH,
    duration: DURATION,
    zoom: 18,
  };
};
