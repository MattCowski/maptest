import React, { useState } from "react";
import Map from "./google/Map";
import Marker from "./google/Marker";
import TransitLayer from "./google/TransitLayer";
import Polyline from "./google/Polyline";
import getPlaces from "./utils/getPlaces";
// import console = require("console");

const formatted = coords =>
  coords.map(c => {
    return {
      lat: Number(c.split(",")[0]),
      lng: Number(c.split(",")[1])
    };
  });

export default function Consumer({ data }) {
  // const places = getPlaces();

  const originalPath = formatted(data.original);
  const snappedPath = formatted(data.snapped);
  const places = originalPath;

  const [placeIndex, setPlaceIndex] = useState(0);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showSnapped, setShowSnapped] = useState(true);
  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState(originalPath[0]);

  const [bound, setBound] = useState({});
  const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);

  return (
    <div>
      <h3>Basic google maps with React hooks </h3>
      <Map
        // zoom={10}
        zoom={zoom} //default only
        center={{ lat: places[placeIndex].lat, lng: places[placeIndex].lng }}
        // center={center}
        events={{
          onBoundsChangerd: arg => setBound(arg),
          // onCenterChanged: e=> setCenter(e),
          onZoomChanged: v => setZoom(v)
        }}
      >
        <TransitLayer enabled={transitLayerEnabled} />
        <Polyline enabled={showOriginal} path={originalPath} />
        <Polyline enabled={showSnapped} path={snappedPath} diff />
        {places.map((m, index) => (
          <Marker
            key={m.id}
            active={placeIndex === index}
            title={"marker id: " + m.id}
            position={{ lat: m.lat, lng: m.lng }}
            events={{
              onClick: e => {
                console.log(e);
                // window.alert(`marker ${index} clicked ${m.last_trip}`);
                setPlaceIndex(index);
              }
            }}
            // isLast={m.last_trip}
          />
        ))}
      </Map>
      <button
        className="btn"
        onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
      >
        Next place
      </button>
      <button
        className="btn"
        onClick={() => setCenter(originalPath[originalPath.length - 1])}
      >
        center at end
      </button>
      <button className="btn" onClick={() => setCenter(originalPath[0])}>
        center at start
      </button>
      <button className="btn" onClick={() => setZoom(14)}>
        Zoom in
      </button>
      <button className="btn" onClick={() => setShowOriginal(!showOriginal)}>
        toggle original route
      </button>
      <button className="btn" onClick={() => setShowSnapped(!showSnapped)}>
        toggle snapped route
      </button>
      <br />
      <button
        className="btn"
        onClick={() => setTransitLayerEnabled(!transitLayerEnabled)}
      >
        Toggle transit layer
      </button>
      <br />
      Current place id: {places[placeIndex].id}
      <br />
      Map bounds: {bound.toString()}
      {JSON.stringify({ zoom })}
    </div>
  );
}
