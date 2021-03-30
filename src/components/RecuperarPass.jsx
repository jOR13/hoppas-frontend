import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecuperarPass = (props) => {

    const url = process.env.REACT_APP_API_URL;


    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(!false);


    const restablecerPW = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            const respuesta = await axios.post(url + 'api/user/resetPw', { email });
            console.log(respuesta);
            if (respuesta.status === 200) {
                setLoading(false);
                toast.success('🥳¡Te hemos enviado un correo con tu contraseña temporal!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                props.history.push("/");
            }
        } catch (error) {

        }
    }

    return (
        <div className="container">
            <div className="row">
                {!loading ? (
                    <div className="col-md-12">
                        <h3 className="text-center mt-4">Recupera tu contraseña</h3>
                        <form >
                            <div className="mb-4">
                                <label className="form-label mt-3">Escribe tu correo electronico</label>
                                <input
                                    className="border-info rounded-pill  mb-2 text-center form-control"
                                    type="email"
                                    placeholder="Ej. nombre@dominio.com"
                                    name={"fullName"}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button
                                    onClick={e => restablecerPW(e)}
                                    className="btn btn-outline-dark  rounded-pill"
                                    type="submit"
                                >Enviar
                                </button>
                            </div>
                        </form>
                    </div>) : (
                    <>
                       
                        <div style={{ marginTop: "25vh" }} className="col-md-4 d-flex justify-content-center">
                            <b>Espera un poco...</b>
                        </div>
                        <div style={{ marginTop: "5vh" }} className="col-md-8 d-flex justify-content-center">
                            <h1 style={{ color: 'tomato' }} className="spinner-border"></h1>
                        </div>
                    </>

                )}
            </div>
        </div>
    )
}

export default RecuperarPass
