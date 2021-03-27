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
    <>
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: parametros.latitude, lng: parametros.longitude }}
      />
      <Marker
        position={{ lat: parametros.latitude, lng: parametros.longitude }}
      />
    </>
  );
};

export default withScriptjs(withGoogleMap(Map));
