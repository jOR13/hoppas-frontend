import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import MascotasForm from './MascotasForm';
import ArrowRight from '@material-ui/icons/ArrowRight';


function Mascotas() {

    const [mascotas, setMascotas] = useState({});
    const [editMascota, setEditMascota] = useState([]);
    const inputEl = useRef(null);

    useEffect(() => {
        getMascotas();
    }, [])

    const editarMascota = (id) => {
        inputEl.current.scrollIntoView();
        const filtro = mascotas.filter((m) => m._id === id);
        setEditMascota({mascotas: filtro, editando: true});
    }

    const getMascotas = async () => {
        const respuesta = await axios.get(process.env.REACT_APP_API_URL + "api/pets/");
        setMascotas(respuesta.data.data)
        // console.log(respuesta.data.data)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="mt-5">
                        <h2 className="mt-5">Dispositivos</h2>
                        <button className="btn btn-outline-dark rounded-pill mb-2 mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFormPets" aria-expanded="false" aria-controls="collapseFormPets">
                            Agregar <ArrowRight />
                        </button>
                        <div  className="collapse" id="collapseFormPets">
                            <div ref={inputEl}  className="card card-body">
                                <MascotasForm mascotas={editMascota} />
                            </div>
                        </div>
                    </div>
                </div>
                {mascotas.length > 0 ? (
                    mascotas.map((m) =>
                        <div key={m._id} className="col-sm-6 col-md-3 align-self-center justify-content-center d-flex ">
                            <div className="card border-0 shadow mt-2 mb-5" style={{ borderRadius: '20px', maxHeight: '300px', maxWidth: '300px', minWidth: '170px' }} >
                                <img className="card-img-top p-3" src={process.env.REACT_APP_API_URL + m.imageID} alt={m.name} style={{ maxHeight: '200px', minHeight: '200px' }} />
                                <div className="card-body text-center d-grid gap-2 d-md-block">
                                    <h3 className="h5">{m.name}</h3>
                                    <div className="" style={{ backgroundColor: '#red' }}>
                                        <button onClick={() => editarMascota(m._id)} className="btn btn-outline-secondary  btn-sm" data-bs-toggle="collapse" data-bs-target="#collapseFormPets">Editar</button>
                                        <button  className="btn btn-outline-danger  btn-sm">Eliminar</button>
                                    </div>
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

