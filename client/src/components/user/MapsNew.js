import React, { Component } from "react";
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
// const demoFancyMapStyles = require("./demoFancyMapStyles.json");

class NewMap extends Component {
  state = {
    denver: { lat: 39.742043, lng: -104.991531 },
    vegas: { lat: 36.114647, lng: -115.172813 },
    chicago: { lat: 41.881832, lng: -87.623177 },
    atlanta: { lat: 33.749, lng: -84.388 },
    sdakota: { lat: 43.9695, lng: -99.9018 }
  };

  render() {
    const SinoMap = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAEd6T_24C9aaGyhYmoiC7ZsbkZCCZXT1E",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: this.state.denver
      }),
      withStateHandlers(
        () => ({
          isOpen: false
        }),
        {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen
          })
        }
      ),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={props.center}
        // defaultOptions={{ styles: demoFancyMapStyles }}
      >
        <InfoBox
          defaultPosition={
            new window.google.maps.LatLng(props.center.lat, props.center.lng)
          }
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div
            style={{
              backgroundColor: `yellow`,
              opacity: 0.75,
              padding: `12px`
            }}
          >
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Taipei!
            </div>
          </div>
        </InfoBox>
        <Marker
          position={{ lat: 22.6273, lng: 120.3014 }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && (
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div
                style={{
                  backgroundColor: `yellow`,
                  opacity: 0.75,
                  padding: `12px`
                }}
              >
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  Hello, Kaohsiung!
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      </GoogleMap>
    ));

    return (
      <div>
        <SinoMap />
      </div>
    );
  }
}

export default NewMap;
