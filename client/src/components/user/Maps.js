import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: props,
      activeMarker: marker
    });
  };

  onInfoWindowClose = () => {
    //
  };

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      });
    }
  };

  componentDidMount() {
    //
  }

  render() {
    const style = {
      width: "80vw",
      height: "400px"
    };

    const locations = {
      denver: { lat: 39.742043, lng: -104.991531 },
      vegas: { lat: 36.114647, lng: -115.172813 },
      chicago: { lat: 41.881832, lng: -87.623177 },
      atlanta: { lat: 33.749, lng: -84.388 },
      sdakota: { lat: 43.9695, lng: -99.9018 }
    };

    const infoWindowStyle = {
      height: "200px",
      width: "100px",
      backgroundColor: "#fff",
      color: "#000"
    };

    if (this.props.google) {
      return (
        <div className="topMargin leftMargin">
          <h2>Google Maps</h2>
          <Map
            item
            xs={12}
            style={style}
            google={this.props.google}
            onClick={this.onMapClick}
            zoom={4}
            initialCenter={locations.denver}
            clickableIcons={false}
          >
            {/* DENVER MARKER */}
            <Marker
              onClick={this.onMarkerClick}
              title={"Clinical Rotations in Denver, CO"}
              position={locations.denver}
              name={"Denver, CO"}
              key={1}
              id={1}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visibile={this.state.showingInfoWindow}
              style={infoWindowStyle}
            >
              <p>INFO WINDOW</p>
            </InfoWindow>

            {/* VEGAS MARKER */}
            <Marker
              onClick={this.onMarkerClick}
              title={"Clinical Rotations in Las Vegas, NV"}
              position={locations.vegas}
              name={"Las Vegas, NV"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visibile={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>

            {/* CHICAGO MARKER */}
            <Marker
              onClick={this.onMarkerClick}
              title={"Clinical Rotations in Chicago, IL"}
              position={locations.chicago}
              name={"Chicago, IL"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visibile={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>

            {/* ATLANTA MARKER */}
            <Marker
              onClick={this.onMarkerClick}
              title={"Clinical Rotations in Atlanta"}
              position={locations.atlanta}
              name={"Atlanta, GA"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visibile={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>

            {/* SOUTH DEKOTA MARKER */}
            <Marker
              onClick={this.onMarkerClick}
              title={"Clinical Rotations in South Dakota"}
              position={locations.sdakota}
              name={"South Dakota"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visibile={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
    console.log("Google not yet loaded");
    return (
      <div>
        <h2>Loading Google Maps API...</h2>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAEd6T_24C9aaGyhYmoiC7ZsbkZCCZXT1E"
})(MapContainer);

// export default GoogleApiWrapper(props => ({
//   apiKey: props.apiKey,
//   language: props.language
// }))(MapContainer);
