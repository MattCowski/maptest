import { useEffect, useState } from "react";

const eventMapping = {
  onClick: "click",
  onDoubleClick: "dblclick"
};

export default function useGoogleMapMarker({
  position,
  type,
  maps,
  marker,
  map,
  events,
  title,
  showInfoWindow = true
}) {
  const [infoWindow, setInfoWindow] = useState();

  useEffect(() => {
    const InfoWindow = new maps.InfoWindow({
      content: `<div id="content">
                  <button id="onBtn" class="btn btn-sm">
                    ${title}
                  </button>
                </div>`
    });

    Object.keys(events).forEach(eventName =>
      infoWindow.addListener(eventMapping[eventName], events[eventName])
    );

    setInfoWindow(InfoWindow);
    // InfoWindow.open(map, marker);
  }, []);

  return infoWindow;
}
