import { cameraStateAtom, CameraStateType } from '@states/infoWindow';
import { FlyToOptions, LngLatLike } from 'mapbox-gl';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import useMap from './useMap';

function useCameraMove() {
  const mapRef = useMap();
  const setCameraState = useSetRecoilState(cameraStateAtom);
  const prevCameraState = useRef<CameraStateType>({
    center: [127.0582071, 37.5447481],
    pitch: 0,
    bearing: 0,
    markerClicked: false,
    zoom: 17,
  });

  const flyTo = (coordinate: LngLatLike) => {
    const map = mapRef.current;
    if (!map) return;
    setCameraState((prev) => {
      prevCameraState.current = prev;
      return { ...prev, center: coordinate };
    });
    map.flyTo({
      center: coordinate,
    });
  };

  const tiltFlyTo = (coordinate: LngLatLike) => {
    const map = mapRef.current;
    if (!map) return;
    const options = markerFlytoOption({ coordinate });
    setCameraState((prev) => {
      prevCameraState.current = prev;
      return { ...prev, ...options, center: coordinate };
    });
    map.flyTo(options);
  };

  const flyToPrev = () => {
    const map = mapRef.current;
    if (!map) return;
    setCameraState({ ...prevCameraState.current });
    map.flyTo({
      center: prevCameraState.current.center,
    });
  };

  return { flyTo, tiltFlyTo, flyToPrev };
}

export default useCameraMove;

const markerFlytoOption = ({ coordinate }: { coordinate: LngLatLike }): FlyToOptions => {
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

// useEffect(() => {
//   const map = mapRef.current;
//   if (!map) {
//     return;
//   }
//   // const { pitch, bearing, center, zoom } = cameraState;
//   // map.flyTo({
//   //   pitch,
//   //   bearing,
//   //   center,
//   //   duration: 500,
//   //   zoom,
//   // });
//   // cameraRef.current = {
//   //   ...cameraState,
//   // };
//   // tiltFlyTo()
// }, [cameraState]);
