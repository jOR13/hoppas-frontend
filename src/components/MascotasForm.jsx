import React, { useState, useEffect } from 'react'
import { ArrowRight, PersonCircle, Envelope, House, Lock, Phone } from "react-bootstrap-icons";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function MascotasForm(props) {

    
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorConsulta, setErrorConsulta] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const [user, setUser] = useState({});
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
    }, [])
    
    console.log(user)

    const registarUser = async (values) => {

        const { name, type, race, address, description, contact, userID, qrID, reward } = values;
        console.log(selectedFile)
        console.log(values)

        let formData = new FormData();


        


        formData.append("name", name);
        formData.append("type", type);
        formData.append("race", race);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("contact", contact);
        formData.append("userID", user.user._id);
        // formData.append("qrID", "");
        formData.append("reward", reward);
        formData.append("imageID", selectedFile);



        try {
            const resultado = await axios.post(`${process.env.REACT_APP_API_URL}api/pets/createPet`, formData, {
                headers: {
                    // 'Authorization': `Basic ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
            console.log(resultado);
            setLoading(false);
          

        } catch (error) {
            console.log(error);
            setErrorConsulta(true);
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '', type: '', race: '', address: '', description: '', contact: ''
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
            registarUser(values);
        },
    });



    return (
        <div>
            {!loading ? (<div className="card border-0">

                <div className="card-body text-center">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h1 style={{ color: "gray" }}>Registrar</h1>
                            <hr />
                            {errorConsulta ? <h5 style={{ color: "red", background_color: 'orange' }}><i>Revice sus datos, hubo un error al tratar de registrarse. </i></h5> : null}
                            <label className="form-label mt-3"><PersonCircle className="iconos" /> Nombre</label>
                            <input
                                className="border-info rounded-pill  mb-2 form-control"
                                type="text"
                                placeholder="Ej. Rocky"
                                name={"name"}
                                // onChange={actualizarState}
                                // value={fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.fullName && formik.errors.name ? (
                                <div className="validar">{formik.errors.name}</div>
                            ) : null}
                            <hr />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><House className="iconos" /> Tipo</label>
                            <input
                                className="border-success rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. Pitbull"
                                name={"type"}
                                // onChange={actualizarState}
                                // value={address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.type}
                            ></input>
                            {formik.touched.type && formik.errors.type ? (
                                <div className="validar">{formik.errors.type}</div>
                            ) : null}
                            <hr />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><House className="iconos" /> Raza</label>
                            <input
                                className="border-success rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. Pitbull"
                                name={"race"}
                                // onChange={actualizarState}
                                // value={address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.race}
                            ></input>
                            {formik.touched.race && formik.errors.race ? (
                                <div className="validar">{formik.errors.race}</div>
                            ) : null}
                            <hr />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><Phone className="iconos" /> Direccion</label>
                            <input
                                className="border-danger rounded-pill  mb-2   form-control"
                                type="text"
                                placeholder="Ej. 656 1 23 45 67"
                                name={"address"}
                                // onChange={actualizarState}
                                // value={phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            ></input>
                            {formik.touched.address && formik.errors.address ? (
                                <div className="validar">{formik.errors.address}</div>
                            ) : null}
                            <hr />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><Lock className="iconos" /> Descripcion</label>
                            <textarea
                                name={"description"}
                                className="border-secondary rounded-pill mb-3 form-control"
                                type="text"
                                rows="3"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}

                            ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <div className="validar">{formik.errors.description}</div>
                            ) : null}
                            <hr />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><Lock className="iconos" /> Contacto</label>
                            <input
                                name={"contact"}
                                className="border-secondary rounded-pill mb-3 form-control"
                                type="text"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contact}
                            ></input>
                            {formik.touched.contact && formik.errors.contact ? (
                                <div className="validar">{formik.errors.contact}</div>
                            ) : null}
                            <hr />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><Lock className="iconos" /> Recompensa</label>
                            <input
                                name={"reward"}
                                className="border-secondary rounded-pill mb-3 form-control"
                                type="number"
                                placeholder="Ej. Se me perdio ayer"
                                // onChange={actualizarState}
                                // value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.reward}
                            ></input>
                            {formik.touched.reward && formik.errors.reward ? (
                                <div className="validar">{formik.errors.reward}</div>
                            ) : null}
                            <hr />
                        </div>

                        <div className="mb-3">
                            <input accept="image/*" onLoad={() => setBtnDisable(false)}
                                onChange={(e) => setSelectedFile(e.target.files[0])} id="icon-button-file" style={{ display: 'none' }} type="file" />
                            <label htmlFor="icon-button-file"> <i>Selecciona una foto de perfil para completar tu registro</i>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <hr />

                        </div>

                        <div className="mb-3">
                            {selectedFile != null ? (<button
                                className="btn btn-outline-dark form-control  rounded-pill"
                                type="submit"
                                disabled={false}
                            >
                                Registrar <ArrowRight />
                            </button>) : <button
                                className="btn btn-outline-dark form-control  rounded-pill"
                                type="submit"
                                disabled={true}
                            >
                                Registrar <ArrowRight />
                            </button>}
                        </div>

                    </form>
                </div>
            </div>) : (<CircularProgress style={{ marginTop: "30vh", color: "aqua" }} />)}
        </div>

    )
}

export default MascotasForm
