import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Avatar from '@material-ui/core/Avatar';
import MascotasForm from './MascotasForm';
function Mascotas() {

    const [mascotas, setMascotas] = useState({});


    useEffect(() => {
        getMascotas();
    }, [])


    const getMascotas = async () => {
        const respuesta = await axios.get(process.env.REACT_APP_API_URL + "api/pets/");
        setMascotas(respuesta.data.data)
        console.log(respuesta.data.data)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="mt-5">
                        <h2 className="mt-5">Dispositivos</h2>
                        <button className="btn btn-outline-dark rounded-pill mb-2 mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Agregar <ArrowRight />
                        </button>
                        <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                                <MascotasForm />
                            </div>
                        </div>
                    </div>
                </div>
                {mascotas.length > 0 ? (
                    mascotas.map((m) =>
                        <div className="col-sm-6 col-md-3 align-self-center justify-content-center d-flex">
                            <div className="card border-0 shadow mt-4 ms-4 CusCard-left" style={{ borderRadius: '20px', maxHeight: '300px', maxWidth: '300px', minWidth: '170px'}} >
                                <img className="card-img-top p-3" src={process.env.REACT_APP_API_URL + m.imageID} alt={m.name} style={{maxHeight: '200px', minHeight: '200px'}} />
                                <div className="card-body py-4 text-center">
                                    <h3 className="h5">{m.name}</h3>
                                </div>
                            </div>
                        </div>
                    )
                ) : null}



            </div>
        </div>
    )
}



export default Mascotas

