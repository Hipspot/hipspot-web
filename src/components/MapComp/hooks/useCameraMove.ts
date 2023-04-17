import { FlyToOptions, LngLatLike } from 'mapbox-gl';
import useMap from './useMap';

export type CameraStateType = {
  center: LngLatLike;
  pitch: number;
  bearing: number;
  markerClicked: boolean;
  zoom: number;
};
interface C extends FlyToOptions, Partial<CameraStateType> {}

export type CameraMoveFunctionType = (coordinate: LngLatLike, option?: CameraMoveOptions) => void;
export type CameraMoveOptions = Omit<C, 'center'>; // 옵션에서는 좌표값 받아오지 않게 처리

const defaultCameraState: CameraStateType = {
  center: [127.0770389, 37.6257614],
  pitch: 0,
  bearing: 0,
  markerClicked: false,
  zoom: 17,
};

/**
 * 이전 카메라, 이후 카메라 위치 및 옵션 저장 객체
 */
const currentCameraState: { current: CameraStateType } = { current: { ...defaultCameraState } };
const prevCameraState: { current: CameraStateType } = { current: { ...defaultCameraState } };

function useCameraMove() {
  const mapRef = useMap();

  const flyTo: CameraMoveFunctionType = (coordinate, option) => {
    const map = mapRef.current;
    if (!map) return;
    prevCameraState.current = currentCameraState.current;
    const nextState: CameraStateType = { ...prevCameraState.current, center: coordinate, ...option };
    currentCameraState.current = nextState;
    map.flyTo(nextState);
  };

  const tiltFlyTo: CameraMoveFunctionType = (coordinate, option) => {
    const map = mapRef.current;
    if (!map) return;

    prevCameraState.current = currentCameraState.current;
    const nextState = { ...prevCameraState.current, ...tiltNextState({ coordinate }), ...option };
    currentCameraState.current = nextState;

    map.flyTo(nextState);
  };

  const flyToPrev = () => {
    const map = mapRef.current;
    if (!map) return;
    currentCameraState.current = prevCameraState.current;
    map.flyTo({
      ...currentCameraState.current,
      duration: 500,
    });
  };

  const savePrevPostion: CameraMoveFunctionType = (coordinate, option) => {
    currentCameraState.current = { ...prevCameraState.current, center: coordinate, ...option };
  };

  return { flyTo, tiltFlyTo, flyToPrev, savePrevPostion };
}

export default useCameraMove;

const tiltNextState = ({ coordinate }: { coordinate: LngLatLike }): FlyToOptions => {
  // const RAD = 15;
  const DURATION = 500;
  // const PITCH = 50;

  return {
    center: coordinate,
    // bearing: -2 * RAD - 3,
    // pitch: PITCH,
    duration: DURATION,
    zoom: 18,
  };
};
