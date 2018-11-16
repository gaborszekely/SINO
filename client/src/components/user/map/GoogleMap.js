import React, { Component } from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import InfoWindow from "./InfoWindow";

class GoogleMap extends Component {
  state = {};

  createInfoWindow = (e, map) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.addListener("domready", e => {
      ReactDOM.render(<InfoWindow />, document.getElementById("infoWindow"));
    });
    infoWindow.open(map);
  };

  render() {
    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 39.742043, lng: -104.991531 },
          zoom: 4
        }}
        onMapLoad={map => {
          const marker = new window.google.maps.Marker({
            position: { lat: 39.742043, lng: -104.991531 },
            map: map,
            title: "Hello Denver!"
          });
          marker.addListener("click", e => {
            this.createInfoWindow(e, map);
          });
        }}
      />
    );
  }
}

export default GoogleMap;
