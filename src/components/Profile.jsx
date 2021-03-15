import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ArrowRight from '@material-ui/icons/ArrowRight';
import axios from 'axios'


function Profile(props) {

    const [datos, setDatos] = useState({
        fullName: "",
        email: "",
        address: "",
        phone: "",
        password: "default",
        image: "",
        SignUpType: "Google"
    });




    const [dis, setDis] = useState(true);

    // lee los inputs
    const actualizarState = (e) => {
        console.log(datos)
        // setDatos({
        //     ...datos,
        //     [e.target.name]: e.target.value,

        // });

        setDatos({
            ...datos,
            fullName: props.location.datosGoogle.datosGoogle.name,
            email: props.location.datosGoogle.datosGoogle.email,
            image: props.location.datosGoogle.datosGoogle.imageUrl,
            [e.target.name]: e.target.value
        })

        if (address != "" && phone != "") {
            setDis(!dis)
        }
    };

    // extraer los valores
    const { fullName, email, address, phone, password } = datos;

    const completeRegister = async () => {


        try {
            const resultado = await axios.post(`${process.env.REACT_APP_API_URL}api/user/registerGoogle`, datos);

            // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
            console.log(resultado);
            // setLoading(false);
            if (resultado.status === 200) {
                props.history.push("/");
            }

        } catch (error) {
            console.log(error);
            // setErrorConsulta(true);
            // setLoading(false);
        }
    }


    return (
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-lg-12 justify-content-center d-flex fondo" style={{ height: 300, }}>

                    {props.location.datosGoogle != undefined ? (<div className="card border-0 " style={{ width: '30rem', backgroundColor: 'transparent', marginTop: "5%" }}>
                        <PhotoCamera style={{ position: 'absolute' }} />
                        <img src={props.location.datosGoogle.datosGoogle.imageUrl} className=" mt-5 card-img-top align-self-center rounded-circle w-50" alt="..." />
                        <h3 className="mt-3">{props.location.datosGoogle.datosGoogle.name} </h3>
                        <div className="card-body">
                            <div className="mb-3">
                                <p className="card-text">Parece que te faltan algunos datos por llenar</p>
                                <i style={{ color: "gray" }}>No te preocupes, estos datos solo tienes que llenarlos esta vez.</i>
                                <input
                                    className="border-info rounded-pill mt-3 mb-2 text-center form-control"
                                    type="text"
                                    placeholder="Correo electronico"
                                    name="Nombre"
                                    disabled={true}
                                    value={props.location.datosGoogle.datosGoogle.name}
                                ></input>
                                <input
                                    className="border-info rounded-pill mt-3 mb-2 text-center form-control"
                                    type="text"
                                    placeholder="Correo electronico"
                                    name="Email"
                                    disabled={true}
                                    value={props.location.datosGoogle.datosGoogle.email}
                                ></input>
                                <input
                                    className="border-info rounded-pill mt-3 mb-2 text-center form-control"
                                    type="text"
                                    placeholder="Escribe tu dirección"
                                    name="address"
                                    onChange={actualizarState}
                                    value={address}
                                ></input>
                                <input
                                    className="border-info rounded-pill mt-3 mb-2 text-center form-control"
                                    type="text"
                                    placeholder="Escribe tu telefono"
                                    name="phone"
                                    onChange={actualizarState}
                                    value={phone}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <button
                                    className="btn btn-outline-primary form-control  rounded-pill"
                                    type="submit"
                                    disabled={dis}
                                    onClick={completeRegister}
                                >
                                    Guardar <ArrowRight />
                                </button>
                            </div>
                        </div>

                    </div>) : (<h4 className="mt-5">Hubo un error al cargar su perfil</h4>)}

                </div>

            </div>
        </div>
    )
}

export default Profile
