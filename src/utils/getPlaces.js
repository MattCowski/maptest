const base = { lat: 37.87221, lng: -122.25948 };

export default function getMarkers() {
  const cnt = 10;
  const markers = [];
  for (let i = 0; i < cnt; i++) {
    markers.push({
      id: i,
      title: "marker: " + i,
      lat: base.lat + 0.04 * i,
      lng: base.lng + 0.04 * i,
      last_trip: Math.random() >= 0.5
    });
  }
  return markers;
}
