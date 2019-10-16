import React, { useState } from "react";
import Map from "./google/Map";
import Marker from "./google/Marker";
import TransitLayer from "./google/TransitLayer";
import getPlaces from "./utils/getPlaces";
// import console = require("console");

export default function CreateTrip() {
  const places = getPlaces();
  const [placeIndex, setPlaceIndex] = useState(0);
  const [bound, setBound] = useState({});
  const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);

  return (
    <div>
      <h3>Basic google maps with React hooks </h3>
      <Map
        zoom={10}
        center={{ lat: places[placeIndex].lat, lng: places[placeIndex].lng }}
        events={{ onBoundsChangerd: arg => setBound(arg) }}
      >
        <TransitLayer enabled={transitLayerEnabled} />
        {places.map((m, index) => (
          <Marker
            key={m.id}
            active={placeIndex === index}
            title={"marker id: " + m.id}
            position={{ lat: m.lat, lng: m.lng }}
            events={{
              onClick: e => {
                console.log(e);
                window.alert(`marker ${index} clicked ${m.last_trip}`);
              }
            }}
            isLast={m.last_trip}
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
        onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
      >
        view all
      </button>
      <button
        className="btn"
        onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
      >
        Add address from search
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
    </div>
  );
}
