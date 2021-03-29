import React, { useState, useEffect, useContext } from 'react'
import { ArrowRight, PersonCircle, Cash, House, JournalText, Asterisk, CircleHalf, Phone } from "react-bootstrap-icons";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../context/UserContext";

function MascotasForm({ mascotas }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorConsulta, setErrorConsulta] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const [user, setUser] = useState({});
    const [nombreM, setNombreM] = useState("");
    const [fotografia] = useState("");
    const [tipo, setTipo] = useState("");
    const [raza, setRaza] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [contacto, setContacto] = useState("");
    const [update, setUpdate] = useState(false);
    const { value, setValue } = useContext(UserContext);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
        if (mascotas.editando) {
            setNombreM('sdsdsdsd');
        }
    }, [update])


    const registarMascota = async (values) => {
        const { name, type, race, address, description, contact, userID, qrID, reward } = values;
        console.log(selectedFile)
        console.log(values)
        let formData = new FormData();

        try {
            // if (mascotas.editando) {
            formData.append("name", name);
            formData.append("type", type);
            formData.append("race", race);
            formData.append("address", address);
            formData.append("description", description);
            formData.append("contact", contact);
            formData.append("userID", user.user._id);
            formData.append("qrID", null);
            formData.append("reward", reward);
            formData.append("imageID", selectedFile);

            const resultado = await axios.post(`${process.env.REACT_APP_API_URL}api/pets/createPet`, formData, {
                headers: {
                    // 'Authorization': `Basic ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
            console.log(resultado);
            if (resultado.status === 200) {
                setUpdate(!update)
                toast.success('🥳¡Tu mascota se registro con exito!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
            setLoading(false);
            setValue({ ...value, update: true })
            setUpdate(!update)
            // } 
            // else {
            //     formData.append("name",  mascotas.mascotas[0].name);
            //     formData.append("type", mascotas.mascotas[0].type);
            //     formData.append("race", mascotas.mascotas[0].race);
            //     formData.append("address", mascotas.mascotas[0].address);
            //     formData.append("description", mascotas.mascotas[0].description);
            //     formData.append("contact", mascotas.mascotas[0].contact);
            //     formData.append("userID", user.user._id);
            //     formData.append("qrID", null);
            //     formData.append("reward", mascotas.mascotas[0].reward);
            //     formData.append("imageID", selectedFile);

            //     const resultado = await axios.post(`${process.env.REACT_APP_API_URL}api/pets/createPet`, formData, {
            //         headers: {
            //             // 'Authorization': `Basic ${token}`,
            //             'Content-Type': 'multipart/form-data'
            //         },
            //     });
            //     // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
            //     console.log(resultado);
            //     setLoading(false);
            // }



        } catch (error) {
            console.log(error);
            setErrorConsulta(true);
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: nombreM, type: tipo, race: raza, address: direccion, description: descripcion, contact: contacto
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, '* Debe ingresar su nombre').required('Campo requerido'),
            type: Yup.string().min(3, '* Debe ingresar el tipo de mascota').required('Campo requerido'),
            race: Yup.string().min(3, '* Escriba la raza de su mascota').required('Campo requerido'),
            address: Yup.string().min(10, '* Escriba su dirección completa').required('Campo requerido'),
            description: Yup.string().min(10, 'Escriba una breve descripcion de su mascota').required('Campo requerido'),
            contact: Yup.string().min(6, 'Escriba los datos de su contacto').required('Campo requerido'),
            // reward: Yup.number().min(1, 'La recompensa debe ').required('Campo requerido').positive().integer(),
        }),
        onSubmit: values => {
            setLoading(true);
            registarMascota(values);
        },
    });



    return (
        <div>
            <ToastContainer />
            {!loading ? (<div className="card border-0">
                <div className="card-body text-center">
                    <form className="row g-3" onSubmit={formik.handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label"><PersonCircle className="iconos" /> Nombre</label>
                            <input
                                className="border-info rounded-pill  mb-2 form-control"
                                type="text"
                                placeholder="Ej. Rocky"
                                name={"name"}
                                // onChange={actualizarState}
                                // value={fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].name : (formik.values.name)}
                            />
                            {formik.touched.fullName && formik.errors.name ? (
                                <div className="validar">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label"><Asterisk className="iconos" /> Tipo</label>
                            <input
                                className="border-info rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. Pitbull"
                                name={"type"}
                                // onChange={actualizarState}
                                // value={address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].type : (formik.values.type)}
                            ></input>
                            {formik.touched.type && formik.errors.type ? (
                                <div className="validar">{formik.errors.type}</div>
                            ) : null}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label"><CircleHalf className="iconos" /> Raza</label>
                            <input
                                className="border-info rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. Pitbull"
                                name={"race"}
                                // onChange={actualizarState}
                                // value={address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].race : (formik.values.race)}
                            ></input>
                            {formik.touched.race && formik.errors.race ? (
                                <div className="validar">{formik.errors.race}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><House className="iconos" /> Direccion</label>
                            <input
                                className="border-info rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. 656 1 23 45 67"
                                name={"address"}
                                // onChange={actualizarState}
                                // value={phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].address : (formik.values.address)}
                            ></input>
                            {formik.touched.address && formik.errors.address ? (
                                <div className="validar">{formik.errors.address}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"><JournalText className="iconos" /> Descripcion</label>
                            <textarea
                                name={"description"}
                                className="border-info rounded-pill mb-3 form-control"
                                type="text"
                                rows="3"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].description : (formik.values.description)}

                            ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <div className="validar">{formik.errors.description}</div>
                            ) : null}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label"><Phone className="iconos" /> Contacto</label>
                            <input
                                name={"contact"}
                                className="border-info rounded-pill mb-3 form-control"
                                type="text"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].contact : (formik.values.contact)}
                            ></input>
                            {formik.touched.contact && formik.errors.contact ? (
                                <div className="validar">{formik.errors.contact}</div>
                            ) : null}
                        </div>
                        <div className="col-md-2">
                            <label className="form-label"><Cash className="iconos" /> Recompensa</label>
                            <input
                                name={"reward"}
                                className="border-info rounded-pill mb-3 form-control"
                                type="number"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={mascotas.editando ? mascotas.mascotas[0].reward : (formik.values.reward)}
                            ></input>
                            {formik.touched.reward && formik.errors.reward ? (
                                <div className="validar">{formik.errors.reward}</div>
                            ) : null}
                        </div>
                        <div className="col-md-6">
                            <input accept="image/*" onLoad={() => setBtnDisable(false)}
                                onChange={(e) => setSelectedFile(e.target.files[0])} id="icon-button-file" style={{ display: 'none' }} type="file" />
                            <label className="mt-4" htmlFor="icon-button-file"> <i>Selecciona una foto de perfil para completar tu registro</i>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>
                        <div className="col-md-12">
                            {selectedFile != null ? (<button
                                className="btn btn-outline-dark form-control rounded-pill"
                                type="submit"
                                disabled={false}
                            >
                                {mascotas.editando ? <b>Editar</b> : <b>Registrar</b>}  < ArrowRight />
                            </button>) : <button
                                className="btn btn-outline-dark form-control  rounded-pill"
                                type="submit"
                                disabled={true}
                                data-bs-toggle="collapse" data-bs-target="#collapseFormPets"  aria-controls="collapseFormPets"
                            >
                                {mascotas.editando ? <b>Editar</b> : <b>Registrar</b>}  < ArrowRight />
                            </button>}
                        </div>
                        {/* <button onClick={() => setValue({...value, update: true})}>state</button> */}
                    </form>
                </div>
            </div >) : (<CircularProgress style={{ marginTop: "30vh", color: "aqua" }} />)
            }
        </div >

    )
}

export default MascotasForm
