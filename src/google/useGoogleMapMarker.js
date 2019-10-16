import { useEffect, useState } from "react";

const eventMapping = {
  onClick: "click",
  onDoubleClick: "dblclick"
};

export default function useGoogleMapMarker({
  position,
  type,
  maps,
  map,
  events,
  title,
  showInfoWindow = true
}) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    // const styles = markerStyle(type);
    const marker = new maps.Marker({
      position,
      map,
      title
    });
    Object.keys(events).forEach(eventName =>
      marker.addListener(eventMapping[eventName], events[eventName])
    );

    if (showInfoWindow) {
      const InfoWindow = new maps.InfoWindow({
        content: `<div id="content">
                    <button id="onBtn" class="btn btn-sm">
                      ${title}
                    </button>
                  </div>`
      });
      marker.addListener("click", () => {
        InfoWindow.open(map, marker);
      });
    }

    setMarker(marker);
  }, []);

  return marker;
}
