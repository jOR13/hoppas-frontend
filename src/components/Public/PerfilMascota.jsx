import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Map from "./Map";
import credentials from "./credentials";

function PerfilMascota() {
  const [params] = useState(useParams());
  const [qr, setQR] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  let options = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0,
  };

  const { latitude, longitude } = parametros;

  useEffect(() => {
    console.log(params.id)
    navigator.geolocation.getCurrentPosition(success, error, options);
    getQR(params.id);

   

  }, []);

 

  function success(position) {
    let coordenadas = position.coords;
    // console.log("Tu posición actual es:");
    // console.log("Latitud : " + coordenadas.latitude);
    // console.log("Longitud: " + coordenadas.longitude);
    // console.log("Más o menos " + coordenadas.accuracy + " metros.");
    setParametros({
      latitude: coordenadas.latitude,
      longitude: coordenadas.longitude,
    });
    setShowMap(true);

    const lat = coordenadas.latitude;
    const long = coordenadas.longitude;

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    const data = {
      longitude: long,
      latitude: lat,
      lastScan: dateTime
    }


    updateQRlocations(params.id, data)



  }


  const updateQRlocations = async (id, data) => {
    try {
      const res = await axios.put(url + 'api/qrs/' + id, data);
      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  }

  function error(error) {
    console.warn("ERROR(" + error.code + "): " + error.message);
  }

  const getQR = async (id) => {
    try {
      const respuesta = await axios.get(process.env.REACT_APP_API_URL + 'api/qrs/' + id);
      console.log(respuesta.data.data);
      setQR(respuesta.data.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>

      <div className="container">

        <div className="row">

          {qr.mascotaID ? (
            <>
              <div className="mt-5 col-md-12">
                <h3 className="text-center">
                  Me encontraste? 🎉 ayudame! 🙏😻😺😿
                </h3>
              </div>

              <div className="col-md-12 d-flex justify-content-center mt-5">

                <div className="card border-3 mb-5">
                  <img
                    className="align-self-sm-center align-self-center mt-5 mb-4 shape-inner circle card-img-top w-50"
                    src={process.env.REACT_APP_API_URL + qr.mascotaID.imageID}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    {qr.mascotaID.type.toUpperCase() === "GATO" ? (
                      <h5 className="card-title">
                        🐱 {qr.mascotaID.name.toUpperCase()}
                      </h5>
                    ) : null}
                    {qr.mascotaID.type.toUpperCase() === "PERRO" ? (
                      <h5 className="card-title">
                        🐶 {qr.mascotaID.name.toUpperCase()}
                      </h5>
                    ) : null}

                    <p className="card-text">
                      📃 Conoceme: {qr.mascotaID.description}
                    </p>
                    <p className="card-text">
                      🏠 Vivo en: {qr.mascotaID.address}
                    </p>
                    <p className="card-text">
                      ☎ Contacta a: {qr.mascotaID.contact}
                      {/* {qr[0].mascotas_id[0].phone} */}
                    </p>
                    <p className="card-text">
                      💰 Recompensa: ${qr.mascotaID.reward}
                    </p>
                    {/* <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p> */}
                  </div>

                  <a className="btn btn-outline-success btn-sm m-5 mb-2"
                    href="https://api.whatsapp.com/send?phone=+526566763854"
                    target="_blank"
                  >
                    Contactarme
                  </a>
                  {showMap ? (
                    <Map
                      parametros={parametros}
                      // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_MAP}`}
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`}
                      containerElement={<div style={{ height: 600 }} />}
                      mapElement={<div style={{ height: 600, }} />}
                      loadingElement={<p className="mb-5">Cargando</p>}
                    />
                  ) : null}

                </div>

              </div>

            </>

          ) : (

            <>
              <div className="col-md-12 d-flex mt-5 justify-content-center">
                <h4 className="alert alert-danger" role="alert">
                  El peril de este QR no existe o no tiene ninguna mascota asignada
                </h4>
              </div>
              <div className="col-md-12 mb-3 d-flex justify-content-center">
                <img src="https://image.freepik.com/vector-gratis/plantilla-web-error-404-gato-gracioso_23-2147763339.jpg" />
              </div>
            </>
          )}


        </div>
      </div>

    </>
  );
};

export default PerfilMascota;
