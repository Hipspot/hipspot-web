import { useEffect } from 'react';
import useMap from './useMap';
import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import useCameraMove from './useCameraMove';
import drawPulsingDotMarker from '../eventHandler/drawPulsingDotMarker';
import { FindMyLocationEvent } from '@libs/types/customEvents';

function useMyLocationMarker() {
  const mapRef = useMap();
  const { flyTo } = useCameraMove();
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    DOMTargetList[DOMID_MAP_COMPONENT] = document.getElementById(DOMID_MAP_COMPONENT);
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    mapElem?.addEventListener(EVENT_FIND_MY_LOCATION, (e: FindMyLocationEvent) => {
      drawPulsingDotMarker({ map, coordinates: e.coordinates });
      flyTo(e.coordinates);
    });
  }, []);
}
export default useMyLocationMarker;
