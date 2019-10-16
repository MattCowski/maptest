import React, { useState } from "react";
// import Map from "./google/Map";
// import Marker from "./google/Marker";
// import TransitLayer from "./google/TransitLayer";
// import getPlaces from "./utils/getPlaces";
// import console = require("console");

import { useEffect, useRef } from "react";
const apiKey = "AIzaSyCVBthtEmWi0Ul8mejDQrBlOULXB1kTB3I";

export default function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className };
  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options);
    onMount && onMount(map);
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.google.com/maps/api/js?key=` + apiKey;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });

  return (
    <div
      {...props}
      style={{ height: `70vh`, margin: `1em 0`, borderRadius: `0.5em` }}
    />
  );
}

Map.defaultProps = {
  options: {
    center: { lat: 37.87221, lng: -122.25948 },
    zoom: 14
  }
};
