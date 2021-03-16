import Login from "./components/Login";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import "./App.css";
import React, { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import {
  Switch,
  Route,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Registro from "./components/Registro";

function App() {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("session"))
  );

  const url = process.env.REACT_APP_API;

  useEffect(() => {
    // getter
    // setValue();
  }, []);

  // console.log(value.user.image)

  const cerrarSesion = (e) => {
    localStorage.removeItem("session");
    setValue("");
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          value,
          setValue,
        }}
      >
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand">HIPERGAS</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to={"/"} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/Posts"} className="nav-link">
                      Inicio
                    </NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav ">
                  <li className="nav-item dropstart ">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {value ? (
                        <div className="d-flex align-items-center">
                          <Avatar alt="" src={url + value.user.image} />
                          <i className="ms-2 mb-0">
                            {value.user.fullName.toUpperCase()}
                          </i>
                        </div>
                      ) : null}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <NavLink
                          to={"/Profile"}
                          className="dropdown-item nav-link"
                        >
                          Perfil
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={(e) => cerrarSesion(e)}
                          to={"/"}
                          className="dropdown-item nav-link"
                        >
                          Cerrar sesion
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Posts" component={Posts} />
            <Route exact path="/Registro" component={Registro} />
            <Route exact path="/Profile" component={Profile} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
