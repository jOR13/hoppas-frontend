import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";

const Map = ({ parametros }) => {
  console.log(parametros);
  return (
    <div>
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: parametros.latitude, lng: parametros.longitude }}
      />
      <Marker
        position={{ lat: parametros.latitude, lng: parametros.longitude }}
      />
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
