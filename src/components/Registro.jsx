import React, { useState } from 'react'
import { ArrowRight, PersonCircle, Envelope, House, Lock, Phone } from "react-bootstrap-icons";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Registro(props) {

    //Crear state
    // const [datos, setDatos] = useState({
    //     fullName: "",
    //     email: "",
    //     address: "",
    //     phone: "",
    //     password: ""
    // });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorConsulta, setErrorConsulta] = useState(null);
    const [btnDisable, setBtnDisable] = useState(true);

    const url = "http://localhost:3001/";


    //lee los inputs
    // const actualizarState = (e) => {
    //     setDatos({
    //         ...datos,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    //extraer los valores
    // const { fullName, email, address, phone, password } = datos;


    const registarUser = async (values) => {

        const { fullName, email, address, phone, password } = values;
        console.log(selectedFile)
        console.log(values)

        let formData = new FormData();

        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("image", selectedFile);
        formData.append("SignUpType", "Manual");



        try {
            const resultado = await axios.post(`${url}api/user/register`, formData, {
                headers: {
                    // 'Authorization': `Basic ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
            console.log(resultado);
            setLoading(false);
            if (resultado.status === 200) {
                props.history.push("/");
            }

        } catch (error) {
            console.log(error);
            setErrorConsulta(true);
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            address: '',
            phone: null,
            password: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().min(6, '* Debe ingresar su nombre completo').required('Campo requerido'),
            email: Yup.string().email('* Escriba una direccion valida').required('Campo requerido'),
            address: Yup.string().min(10, '* Escriba su dirección completa').required('Campo requerido'),
            phone: Yup.number().min(10, 'El telefono debe de constar de 10 digitos').required('Campo requerido').positive().integer(),
            password: Yup.string().min(6, '* Must be 6 characters or more').required('Campo requerido'),

        }),
        onSubmit: values => {
            setLoading(true);
            registarUser(values);
        },
    });



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 justify-content-center d-flex">
                    {!loading ? (<div className="card mb-5" style={{ marginTop: "6vh" }}>
                        <div className="text-center">
                        </div>
                        <div className="card-body ps-5 pe-5 text-center">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <h1 style={{ color: "gray" }}>Registrar usuario </h1>
                                    <hr />
                                    {errorConsulta ? <h5 style={{ color: "red", background_color: 'orange' }}><i>Revice sus datos, hubo un error al tratar de registrarse. </i></h5> : null}
                                    <label className="form-label mt-3"><PersonCircle className="iconos" /> Nombre completo</label>
                                    <input
                                        className="border-info rounded-pill  mb-2 text-center form-control"
                                        type="text"
                                        placeholder="Ej. Benito Camelas Golondrinas"
                                        name={"fullName"}
                                        // onChange={actualizarState}
                                        // value={fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                    />
                                    {formik.touched.fullName && formik.errors.fullName ? (
                                        <div className="validar">{formik.errors.fullName}</div>
                                    ) : null}
                                    <hr />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><Envelope className="iconos" /> Correo electronico</label>
                                    <input
                                        className="border-warning rounded-pill  mb-2 text-center form-control"
                                        type="email"
                                        placeholder="Ej. benito@dominio.com"
                                        name={"email"}
                                        // onChange={actualizarState}
                                        // value={email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="validar">{formik.errors.email}</div>
                                    ) : null}
                                    <hr />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><House className="iconos" /> Direccion</label>
                                    <input
                                        className="border-success rounded-pill  mb-2 text-center form-control"
                                        type="text"
                                        placeholder="Ej. Calle Higo #6108"
                                        name={"address"}
                                        // onChange={actualizarState}
                                        // value={address}
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
                                    <label className="form-label"><Phone className="iconos" /> Telefono</label>
                                    <input
                                        className="border-danger rounded-pill  mb-2 text-center form-control"
                                        type="number"
                                        placeholder="Ej. 656 1 23 45 67"
                                        name={"phone"}
                                        // onChange={actualizarState}
                                        // value={phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    ></input>
                                    {formik.touched.phone && formik.errors.phone ? (
                                        <div className="validar">{formik.errors.phone}</div>
                                    ) : null}
                                    <hr />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"><Lock className="iconos" /> Contraseña</label>
                                    <input
                                        name={"password"}
                                        className="border-secondary rounded-pill text-center mb-3 form-control"
                                        type="password"
                                        placeholder="Ej. B3nit0.202!$3crt0"
                                        // onChange={actualizarState}
                                        // value={password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    ></input>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="validar">{formik.errors.password}</div>
                                    ) : null}
                                    <hr />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><Lock className="iconos" />Repetir contraseña</label>
                                    <input
                                        name="repeatPass"
                                        className="border-primary rounded-pill text-center mb-3 form-control"
                                        type="password"
                                        placeholder="Repite contraseña"
                                    ></input>
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
            </div>
        </div >
    )
}

export default Registro
