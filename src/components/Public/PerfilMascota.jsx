import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Map from "./Map";

function PerfilMascota() {
    const [params] = useState(useParams()); 
    const [qr, setQR] = useState([]);
    const [parametros, setParametros] = useState([]);

    const [showMap, setShowMap] = useState(false);

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
  
      
      // Metodos2.QrCoordenadas(params.id, lat, long, dateTime).then(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (error) => {
      //     const _content =
      //       (error.response && error.response && error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //   }
      // );
    }

    function error(error) {
      console.warn("ERROR(" + error.code + "): " + error.message);
    }

    const getQR = async (id) => {
        try {
            const respuesta = await axios.get(process.env.REACT_APP_API_URL + 'api/qrs/'+id);
            console.log(respuesta.data.data);
            setQR(respuesta.data.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        {qr.mascotaID ? (
          <div className="container">
            <header className="jumbotron">
              <h3 className="text-center">
                {/* Me encontraste? 🎉 ayudame! 🙏😻😺😿 */}
              </h3>
              <div className="card">
                <img
                  className="card-img-top"
                  src={process.env.REACT_APP_API_URL+qr.mascotaID.imageID}
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
                    ☎ Contacta a: {qr.mascotaID.contact} Telefono:{" "}
                    {/* {qr[0].mascotas_id[0].phone} */}
                  </p>
                  <p className="card-text">
                    💰 Recompensa: ${qr.mascotaID.reward}
                  </p>
                  {/* <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p> */}
                </div>
                <a href="#" className="btn btn-primary">
                  Contactarme
                </a>
              </div>
            </header>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h4 className="alert alert-danger" role="alert">
                El peril de este QR no existe o no tiene ninguna mascota asignada
              </h4>
              <img src="https://image.freepik.com/vector-gratis/plantilla-web-error-404-gato-gracioso_23-2147763339.jpg" />
            </div>
          </div>
        )}
        {showMap ? (
          <Map
            parametros={parametros}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAP}`}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "300px" }} />}
            loadingElement={<p className="mb-5">Cargando</p>}
          />
        ) : null}
      </>
    );
  };
  
  export default PerfilMascota;
  