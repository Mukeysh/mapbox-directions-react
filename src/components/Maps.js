import { React, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const Maps = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  const mapContainer = useRef(null);
  //const map = useRef(null);
  // /console.log(map);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [78.9629, 20.5937], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
    });
    map.addControl(directions, "top-left");
    directions.on("route", (e) => {
      console.log(e);
      let route = e.route;
      route.map((item) => {
        let distance = item.distance / 1000;
        let distanceRound = Math.round(distance);
        console.log(distanceRound + "KM");
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Maps;
