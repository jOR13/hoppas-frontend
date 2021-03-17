import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ArrowRight from '@material-ui/icons/ArrowRight';
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

                {mascotas.length >= 0 ? (
                    <div className="col-md-12 justify-content-center d-flex">

                        <div className="">
                            {mascotas.map((m) =>
                                <div key={m.id} className="card mt-5 text-center mb-5" style={{ width: '18rem' }}>
                                    <img src={process.env.REACT_APP_API_URL+m.imageID} class="card-img-top" alt=""/>
                                    <div className="card-body">
                                        <h5 className="card-title">{m.name}</h5>
                                        {/* <h2>{process.env.REACT_APP_API_URL+m.imageID}</h2> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}



export default Mascotas

