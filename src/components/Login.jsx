import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImage from "../assets/images/user.png";
import { ArrowRight, Facebook, Google } from "react-bootstrap-icons";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
function Login(props) {

  const { value, setValue } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_API_URL)
  // }, []);


  if (JSON.parse(localStorage.getItem("session"))) {
    props.history.push("/Posts");
  }

  const urlProduction = process.env.REACT_APP_API_URL;
  // const urlDev = "http://localhost:3001/api/";
  const url = urlProduction;

  const onChangePass = (e) => {
    setPass(e.target.value);
  };
  const onChangeUser = (e) => {
    setUser(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user != "" && pass != "") {
      let data = {
        email: user,
        password: pass,
      };
      try {
        const resultado = await axios.post(url + "api/user/login", data, {
          headers: {
            // 'Authorization': `Basic ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(resultado)
        if (resultado.status === 200 && resultado.data.error != "Usuario no encontrado") {
          setValue(resultado.data);
          console.log(resultado.data);
          setLoading(false);
          // setter
          localStorage.setItem('session', JSON.stringify(resultado.data));
          props.history.push("/Posts");
        } else {
          setPass("")
          setUser("")
          toast.warn('El usuario que ingresaste no existe, por favor registrate.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }

      } catch (error) {
        toast.error('Ocurrio un error (' + error + ').', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      }
    } else {
      toast.error('Ingresa tu correo y contraseña', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const respuestaGoogle = async (respuesta) => {
    console.log(respuesta.profileObj)
    const datosGoogle = respuesta.profileObj;
    try {
      const datos = {
        email: datosGoogle.email,
        password: "default",
        fullName: datosGoogle.name,
        address: '',
        phone: '',
        SignUpType: 'Google',
        image: datosGoogle.imageUrl
      }
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/registerExternal`, datos);

      let data = {
        email: datosGoogle.email,
        password: "default",
      };
      if (res.data.error === "Email ya registrado" || res.status === 200) {
        const resultado = await axios.post(url + "api/user/login", data, { headers: { "Content-Type": "application/json", } });
        setValue(resultado.data);
        setLoading(false);
        localStorage.setItem('session', JSON.stringify(resultado.data));
        console.log(resultado)
        if (resultado.data.user.address = "" || resultado.data.user.phone === "") {
          toast.warn('Faltan algunos datos de tu perfil, seras redirigido a tu perfil por favor actualizalos.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            props.history.push("/Profile");
          }, 4500);
        }

        props.history.push("/Posts");
      }
    } catch (error) {
      console.error(error)
    }
  }
  const respuestaFacebook = async (datosFacebook) => {
    console.log(datosFacebook)
    try {
      const datos = {
        email: datosFacebook.email,
        password: "default",
        fullName: datosFacebook.name,
        address: '',
        phone: '',
        SignUpType: 'Facebook',
        image: datosFacebook.picture.data.url
      }
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/registerExternal`, datos);

      let data = {
        email: datosFacebook.email,
        password: "default",
      };
      if (res.data.error === "Email ya registrado" || res.status === 200) {
        const resultado = await axios.post(url + "api/user/login", data, { headers: { "Content-Type": "application/json", } });
        setValue(resultado.data);
        setLoading(false);
        localStorage.setItem('session', JSON.stringify(resultado.data));
        console.log(resultado)
        if (resultado.data.user.address = "" || resultado.data.user.phone === "") {
          toast.warn('Faltan algunos datos de tu perfil, seras redirigido a tu perfil por favor actualizalos.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            props.history.push("/Profile");
          }, 4500);
        }

        props.history.push("/Posts");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 justify-content-center d-flex">
          <div className="card ms-2" style={{ marginTop: "8vh" }}>
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
                  name="Email"
                  onChange={(e) => onChangeUser(e)}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  name={"Pass"}
                  className="border-info rounded-pill text-center mb-3 form-control"
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => onChangePass(e)}
                ></input>
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-outline-dark form-control  rounded-pill"
                  type="button"
                  onClick={(e) => login(e)}
                >
                  Iniciar sesion <ArrowRight />
                </button>
              </div>
              <div className="mb-3">
                <i><NavLink to={"/RecuperarPass"} >
                  ¿Perdiste tu contraseña?
                </NavLink></i>

                <i><NavLink to={"/Registro"} >
                  Registrate
                </NavLink>  Ó inicia con:</i>
              </div>
              <div className="mb-3">

                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_ID}
                  render={renderProps => (
                    <Google size={30} className="hover" onClick={renderProps.onClick} disabled={renderProps.disabled} />
                  )}
                  buttonText="Login"
                  onSuccess={respuestaGoogle}
                  onFailure={respuestaGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                  appId={process.env.REACT_APP_FB_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  icon={<Facebook size={30} />}
                  textButton=""
                  cssClass="btnFacebook hover"
                  callback={respuestaFacebook} />
                {/* <Facebook size={30} className="me-3 hover" onClick={renderProps.onClick} /> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
