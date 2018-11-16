import React, { Component } from "react";

class Maps2 extends Component {
  state = {};

  componentDidMount() {
    // Initialize and add the map
    function initMap() {
      const denver = { lat: 39.742043, lng: -104.991531 };
      const vegas = { lat: 36.114647, lng: -115.172813 };
      const chicago = { lat: 41.881832, lng: -87.623177 };
      const atlanta = { lat: 33.749, lng: -84.388 };
      const sdakota = { lat: 43.9695, lng: -99.9018 };

      // Map options, including zoom level and centering
      const options = {
        zoom: 4,
        center: denver,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // The map, centered at Denver
      const map = new google.maps.Map(document.getElementById("map"), options);

      let markers = [];
      let infoWindows = [];

      // Call marker functions
      addMarker({
        coordinates: denver,
        iconImage: "http://www.codeshare.co.uk/images/blue-pin.png",
        content: `<div id="iw-container">
            <div class="iw-title">Denver, CO</div>
            <div class="iw-content">
              <div class="iw-subTitle">Available Rotations:</div>
              <p>
                <h4 class="core">Core</h4>
                  <ul>
                    <li>Emergency room</li><li>Urgent Care</li>
                    <li>Internal medicine</li><li>Psychiatry</li>
                    <li>OB/GYN</li>
                  </ul>
                <h4 class="electives">Electives</h4>
                  <ul>
                    <li>Geriatrics</li><li>General surgery</li>
                    <li>Radiology</li><li>Opthomology</li>
                  </ul>
              </p>
            </div>
            <div class="iw-bottom-gradient"></div>
            </div>`
      });
      addMarker({
        coordinates: vegas,
        content: `<div id="iw-container">
            <div class="iw-title">Las Vegas, NV</div>
            <div class="iw-content">
              <div class="iw-subTitle">Available Rotations:</div>
              <p>
                <h4 class="core">Core</h4>
                <ul>
                  <li>Emergency room</li><li>Urgent Care</li>
                  <li>Internal medicine</li>
                  <li>Psychiatry</li>
                  <li>OB/GYN</li>
                </ul>
                <h4 class="electives">Electives</h4>
                <ul>
                  <li>Geriatrics</li>
                  <li>General surgery</li>
                  <li>Radiology</li><li>Opthomology</li>
                </ul>
              </p>
            </div>
            <div class="iw-bottom-gradient"></div>
            </div>`
      });
      addMarker({
        coordinates: chicago,
        content: `<div id="iw-container">
            <div class="iw-title">Chicago, IL:</div>
              <div class="iw-content">
                <div class="iw-subTitle">Available Rotations:</div>
                <p>
                  <h4 class="core">Core</h4>
                  <ul>
                    <li>Emergency room</li>
                    <li>Urgent Care</li>
                    <li>Internal medicine</li>
                    <li>Psychiatry</li>
                    <li>OB/GYN</li>
                  </ul>
                  <h4 class="electives">Electives</h4>
                  <ul>
                    <li>Geriatrics</li>
                    <li>General surgery</li>
                    <li>Radiology</li>
                    <li>Opthomology</li>
                  </ul>
                </p>
            </div>
            <div class="iw-bottom-gradient"></div>
            </div>`
      });
      addMarker({
        coordinates: atlanta,
        content: `<div id="iw-container">
            <div class="iw-title">Atlanta, GA:</div>
              <div class="iw-content">
              <div class="iw-subTitle">Available Rotations</div>
              <p>
                <h4 class="core">Core</h4>
                <ul>
                  <li>Emergency room</li>
                  <li>Urgent Care</li>
                  <li>Internal medicine</li>
                  <li>Psychiatry</li>
                  <li>OB/GYN</li>
                </ul>
                <h4 class="electives">Electives</h4>
                <ul>
                  <li>Geriatrics</li>
                  <li>General surgery</li>
                  <li>Radiology</li>
                  <li>Opthomology</li>
                </ul>
              </p>
            </div>
            <div class="iw-bottom-gradient"></div>
          </div>`
      });
      addMarker({
        coordinates: sdakota,
        content: `<div id="iw-container">
            <div class="iw-title">South Dakota</div>
            <div class="iw-content">
              <div class="iw-subTitle">Available Rotations:</div>
              <p>
                <h4 class="core">Core</h4>
                <ul>
                  <li>Emergency room</li>
                  <li>Urgent Care</li>
                  <li>Internal medicine</li>
                  <li>Psychiatry</li>
                  <li>OB/GYN</li>
                </ul>
                <h4 class="electives">Electives</h4>
                <ul>
                  <li>Geriatrics</li>
                  <li>General surgery</li>
                  <li>Radiology</li>
                  <li>Opthomology</li>
                </ul>
              </p>
            </div>
            <div class="iw-bottom-gradient"></div>
            </div>`
      });

      // Add marker function
      function addMarker(props) {
        const marker = new google.maps.Marker({
          position: props.coordinates,
          map: map,
          animation: google.maps.Animation.DROP
        });

        // Check for custom icon
        if (props.iconImage) marker.setIcon(props.iconImage);

        // Check for info window content
        if (props.content) {
          // Set icon image
          var infoWindow = new google.maps.InfoWindow({
            content: props.content,
            maxWidth: 200
          });

          const toggleBounce = () => {
            if (marker.getAnimation() != null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          };

          const iwFadeIn = () => {
            infoWindows.forEach(item => {
              item.close();
            });
            toggleBounce();
            infoWindow.open(map, marker);
            setTimeout(toggleBounce, 1000);
            // iw-container
            // .gm-style-iw
            var iw_container = $(".gm-style-iw").parent();
            iw_container.stop().hide();
            iw_container.fadeIn(500);
          };

          google.maps.event.addListener(marker, "click", iwFadeIn);
          // () => {
          //   // infoWindows.forEach(item => {
          //   //   item.close();
          //   // });
          //   toggleBounce();
          //   infoWindow.open(map, marker);
          //   setTimeout(toggleBounce, 1000);
          // });

          // Event that closes the Info Window with a click on the map
          google.maps.event.addListener(map, "click", () => {
            infoWindow.close();
          });

          infoWindows.push(infoWindow);
        }

        markers.push(marker);

        /*
         * START INFOWINDOW CUSTOMIZE.
         * The google.maps.event.addListener() event expects
         * the creation of the infowindow HTML structure 'domready'
         * and before the opening of the infowindow, defined styles are applied.
         */
        google.maps.event.addListener(infoWindow, "domready", () => {
          // Reference to the DIV that wraps the bottom of infoWindow
          const iwOuter = $(".gm-style-iw");

          // iwOuter.addClass("opacity");

          /* Since this div is in a position prior to .gm-div style-iw.
           * We use jQuery and create a iwBackground variable,
           * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
           */
          const iwBackground = iwOuter.prev();

          // REMOVES BG SHADOW DIV
          iwBackground.children(":nth-child(2)").css({ display: "none" });

          // REMOVES WHITE BG DIV
          iwBackground.children(":nth-child(4)").css({ display: "none" });

          // MOVES INFOWINDOW 50PX TO THE RIGHT
          iwOuter
            .parent()
            .parent()
            .css({ left: "10px" });

          // MOVES ARROW SHADOW 76PX TO LEFT MARGIN
          iwBackground.children(":nth-child(1)").attr("style", (i, s) => {
            return s + "left: 106px !important;";
          });

          // MOVES ARROW 76PX TO LEFT MARGIN
          iwBackground.children(":nth-child(3)").attr("style", (i, s) => {
            return s + "left: 106px !important;";
          });

          // CHANGES DESIRED TAIL SHADOW COLOR
          iwBackground
            .children(":nth-child(3)")
            .find("div")
            .children()
            .css({
              "box-shadow": "rgba(72, 181, 233, 0.6) 0px 1px 6px",
              "z-index": "1"
            });

          // REFERENCE TO DIV THAT GROUPS CLOSE BUTTON ELEMENTS
          const iwCloseBtn = iwOuter.next();

          // APPLY DESIRED EFFECT TO CLOSE BUTTON
          iwCloseBtn.css({
            position: "absolute",
            opacity: ".7",
            right: "54px",
            top: "18px",
            color: "#000",
            border: "0px solid #3474B9",
            "font-weight": "bold"
            // "border-radius": "6px",
            // "box-shadow": "0 0 5px #3990B9"
          });

          iwCloseBtn.addClass("xbg");

          // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
          if ($(".iw-content").height() < 140) {
            $(".iw-bottom-gradient").css({ display: "none" });
          }

          // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
          iwCloseBtn.mouseout(() => {
            $(this).css({ opacity: "1" });
          });
        });
      }
    }

    google.maps.event.addDomListener(window, "load", initialize);
  }

  render() {
    return (
      <div>
        <h3>See Our Clerkship Locations Below:</h3>
        <div id="map" />
      </div>
    );
  }
}

export default Maps2;
