import { useEffect, useState } from "react";

export default function InfoWindow({ maps, map, marker, setMap }) {
  // const [transitLayer, setTransitLayer] = useState();
  const [infoWindow, setInfoWindow] = useState(null);

  // useEffect(
  //   () => {
  //     if (infoWindow) {
  //       enabled ?
  //         infoWindow.setMap(map)
  //       : infoWindow.setMap(null);
  //     }
  //   },
  //   [enabled, content]
  // );

  useEffect(() => {
    const googleMap = map;
    // if (!googleMap || !mapContainerRef.current) {
    //   return;
    // }

    const InfoWindow = new googleMap.maps.InfoWindow({
      content: `<div id="content">
                  <button id="onBtn" class="btn btn-sm">
                    按鈕
                  </button>
                </div>`
    });
    marker.addListener("click", () => {
      InfoWindow.open(map, marker);
    });
    setMap(map);
  }, [
    map
    // mapContainerRef
  ]);

  return null;
}

export const useMapInfoWindow = content => {
  const [infoWindowState, setInfoWindow] = useState(null);
  // const { googleMap } = useContext(MapContext)
  useEffect(() => {
    if (!content) {
      return;
    }

    if (infoWindowState) {
      return;
    }
    const infoWindowObj = new googleMap.maps.InfoWindow({ content });
    setInfoWindow(infoWindowObj);
    return () => {
      infoWindowObj.close();
    };
  }, [googleMap, content]);
  return infoWindowState;
};
