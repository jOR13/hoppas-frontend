import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios';
import MascotasForm from './MascotasForm';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { UserContext } from "../context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Mascotas() {

    const [mascotas, setMascotas] = useState({});
    const [editMascota, setEditMascota] = useState([]);
    const [update, setUpdate] = useState(false);
    const inputEl = useRef(null);

    const { value, setValue } = useContext(UserContext);

    useEffect(() => {

        getMascotas();
    }, [value])

    const editarMascota = (id) => {
        inputEl.current.scrollIntoView();
        const filtro = mascotas.filter((m) => m._id === id);
        setEditMascota({ mascotas: filtro, editando: true });
    }

    const getMascotas = async () => {
        const u = JSON.parse(localStorage.getItem("session"));
        const respuesta = await axios.get(process.env.REACT_APP_API_URL + "api/pets/");
        const filtro = respuesta.data.data.filter((m) => m.userID ? m.userID._id === u.user._id : null);
        setMascotas(filtro);
        console.log(u.user._id)
    }

    const eliminatMascota = async (id) => {
        const respuesta = await axios.delete(process.env.REACT_APP_API_URL + "api/pets/" + id);
        console.log(respuesta)
        setUpdate(!update)
        setValue({ ...value, update: true })
        if (respuesta.status === 200) {
            toast.warn('Se ha eliminado con exito', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-md-12">
                    <div className="mt-5">
                        <h2 className="mt-5">Dispositivos</h2>
                        <button className="btn btn-outline-dark rounded-pill mb-2 mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFormPets" aria-expanded="false" aria-controls="collapseFormPets">
                            Agregar <ArrowRight />
                        </button>
                        <div className="collapse" id="collapseFormPets">
                            <div ref={inputEl} className="card card-body">
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
                                        <button onClick={(e) => eliminatMascota(m._id)} className="btn btn-outline-danger  btn-sm">Eliminar</button>
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

