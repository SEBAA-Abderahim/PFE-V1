import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
function ShopScreen() {
    return (
        <div>
            Magasin
            <Carousel responsive={responsive}>

              <div>item 1</div>
              <div>item 2</div>
              <div>item 3</div>
              <div> item 4</div>
</Carousel>
            <MapContainer center={[36.71, 3.21]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[36.7229, 3.21441]}>
    <Popup>
      Shop
    </Popup>
  </Marker>
</MapContainer>
        </div>
    )
}

export default ShopScreen
