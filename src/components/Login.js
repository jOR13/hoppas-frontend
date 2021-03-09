import React from "react";
import logo from "../assets/images/logo.png";
import userImage from "../assets/images/user.png";
import { ArrowRight, Facebook, Google } from "react-bootstrap-icons";
import "../App.scss";

function Login() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-4 justify-content-center d-flex">
        <div className="card" style={{ marginTop: "15vh" }}>
          <div className="text-center">
            <img src={userImage} className="rounded w-25 mt-4" alt="..." />
          </div>
          <div className="card-body ps-5 pe-5 text-center">
            <div className="mb-3">
              <h1 style={{ color: "gray" }}>Inicia sesion</h1>
              <input
                className="border-info rounded-pill mt-3 mb-2 text-center form-control"
                type="text"
                placeholder="Correo electronico"
              ></input>
            </div>
            <div className="mb-3">
              <input
                className="border-info rounded-pill text-center mb-3 form-control"
                type="password"
                placeholder="Contraseña"
              ></input>
            </div>

            <div className="mb-3">
              <button className="btn btn-outline-dark form-control  rounded-pill" type="button">
                Iniciar sesion <ArrowRight />
              </button>
            </div>
            <div className="mb-3">
            <i>Ó inicia con</i>
            </div>
            <div className="mb-3">
              <Facebook size={30} className="me-3 hover" />
              <Google size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
