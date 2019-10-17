import { useEffect, useState } from "react";

export default function Polyline({
  enabled,
  maps,
  map,
  path = [],
  diff = false
}) {
  const [polyline, setPolyline] = useState();
  useEffect(() => {
    setPolyline(
      new maps.Polyline({
        path,
        geodesic: true,
        strokeColor: diff ? "#FF0000" : "blue",
        strokeOpacity: 0.5,
        strokeWeight: 4
        // editable: true
      })
    );
  }, []);

  useEffect(() => {
    if (polyline) {
      enabled ? polyline.setMap(map) : polyline.setMap(null);
    }
  });

  return null;
}
