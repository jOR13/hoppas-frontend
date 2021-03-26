import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QRCode from "qrcode.react";
import { UpcScan } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Qrs() {
    const url = process.env.REACT_APP_API_URL;
    const [qrs, setQrs] = useState({})
    const [qrCode, setQrCode] = useState('')
    const [user, setUser] = useState({})
    const [pets, setPets] = useState({})
    const [update, setUpdate] = useState(false)
    const [selected, setSelected] = useState({})

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
        getQrs()
        getPets()
    }, [update])

    const getQrs = async () => {
        try {
            const u = JSON.parse(localStorage.getItem("session"));
            // console.log(u)
            const respuesta = await axios.get(url + 'api/qrs/');
            const res = respuesta.data.data;
            // console.log(respuesta.data.data)
            const filtro = res.filter((f) => f.userID ? f.userID._id === u.user._id : null)
            // console.log(filtro);
            setQrs(filtro);
        } catch (error) {
            console.error(error);
        }
    }

    const getPets = async () => {
        try {
            const u = JSON.parse(localStorage.getItem("session"));
            const respuesta = await axios.get(url + 'api/pets/');
            const res = respuesta.data.data;
            // console.log(respuesta.data.data)
            const filtro = res.filter((f) => f.userID ? f.userID._id === u.user._id : null)
            const filtro2 = filtro.filter((f) => f.qrID ? f.qrID === "null" : null)
            console.log(filtro2);
            setPets(filtro2);
        } catch (error) {
            console.error(error);
        }
    }

    const agregarQR = async () => {
        // console.log(user)
        if (qrCode != "") {
            try {
                const data = {
                    status: "asigned",
                    userID: user.user._id
                }
                const res = await axios.put(url + 'api/qrs/addqr/' + qrCode, data);
                console.log(res);
                setQrCode("")
                setUpdate(!update)
                // getQrs()
            } catch (error) {
                console.error(error);
            }
        }
    }

    const updatePET = async (id) => {
        // e.preventDefault();
        console.log(selected)
        if (selected != "empty" && selected != "" && selected != {}) {
            try {
                const data = {
                    status: "vincular",
                    mascotaID: selected
                }

                const res = await axios.put(url + 'api/qrs/' + id, data);
                // console.log({ res });

                const res2 = await axios.put(url + 'api/pets/' + selected, { qrID: id });
                // console.log({ res2 });


                setSelected("")
                setQrCode("")
                setUpdate(!update)
                // getQrs()
            } catch (error) {
                console.error(error);
            }
        } else console.log("no se peude agregar")
    }

    const desvincularPET = async (qr) => {
        // e.preventDefault();
        console.log(qr)
        const { _id, mascotaID } = qr;

        try {
            const data = {
                status: "desvincular",
                mascotaID: ""
            }
            const res = await axios.put(url + 'api/qrs/' + _id, data);
            console.log(res)

            const data2 = {
                qrID: "null",
            }

            const res2 = await axios.put(url + 'api/pets/' + mascotaID._id, data2);
            console.log({ res2 });

            setQrCode("")
            // setSelected("")
            setUpdate(!update)
            // getQrs()
        } catch (error) {
            console.error(error);
        }
    }

    const onChangeValues = e => {
        e.preventDefault();
        setSelected(e.target.value)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 ">
                    <label className="form-label mt-5"><UpcScan className="iconos" /> ID del QR</label>
                    <div className="d-flex"><input
                        className="border-info rounded-pill  form-control"
                        type="text"
                        placeholder="Ej. BLVS-7F2A0DE0"
                        value={qrCode}
                        name="code"
                        onChange={(e) => setQrCode(e.target.value)}
                    />
                        <button onClick={() => agregarQR()} className="btn btn-outline-success rounded-pill ms-2 btn-sm">Agregar</button></div>
                </div>

                {qrs.length > 0 ? (
                    qrs.map((qr) =>
                        <div key={qr._id} className="col-sm-6 col-md-3 align-self-center justify-content-center d-flex ">
                            <div className="ms-1 me-1 card border-0 shadow mt-2 mb-5" style={{ borderRadius: '20px', maxHeight: '350px', maxWidth: '300px', minWidth: '170px' }} >
                                <div className="card-body text-center d-grid gap-2 d-md-block position-relative">
                                    {qr.mascotaID ? (
                                        <>
                                            <QRCode
                                                className="card-img-top mt-3 " 
                                                value={url + qr._id}
                                                size={200}
                                                bgColor={"#ffffff"}
                                                fgColor={"#00C6D3"}
                                                level={"L"}
                                                includeMargin={false}
                                                renderAs={"svg"}
                                                imageSettings={{
                                                    src: url + qr.mascotaID.imageID,
                                                    x: null,
                                                    y: null,
                                                    height: 30,
                                                    width: 30,
                                                    excavate: true,
                                                }}
                                            />
                                            <h1 style={{ color: '#00A400', right: 0, top: 0 }} className="spinner-grow mt-2 position-absolute"></h1>
                                            <h3 className="h5 mt-2 ">{qr.mascotaID.name}</h3>
                                            <div className="" style={{ backgroundColor: '#red' }}>
                                                <button onClick={e => desvincularPET(qr)} className="btn btn-outline-danger  btn-sm">Desvincular</button>
                                                <Link
                                                    className="btn btn-outline-info  btn-sm"

                                                    to={`./qr/${qr._id}`}
                                                >
                                                    Vista previa
                                                </Link>
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <QRCode
                                                    className="card-img-top mt-3 "
                                                    value={url + qr._id}
                                                    size={200}
                                                    bgColor={"#ffffff"}
                                                    fgColor={"#00C6D3"}
                                                    level={"L"}
                                                    includeMargin={false}
                                                    renderAs={"svg"}

                                                />
                                                {pets.length > 0 ?
                                                    <>
                                                        <select onChange={e => onChangeValues(e)} className="form-select mb-2 mt-2" id="inputGroupSelect01">
                                                            <option value="empty" >Choose...</option>
                                                            {pets.length > 0 ? (
                                                                pets.map((p) =>
                                                                    <option value={p._id} key={p._id}>{p.name}</option>
                                                                )) : null
                                                            }
                                                        </select>
                                                        <div className="" style={{ backgroundColor: '#red' }}>
                                                            <button onClick={e => updatePET(qr._id)} className="btn btn-outline-success  btn-sm">Vincular</button>
                                                        </div>
                                                    </>
                                                    : <>


                                                    </>
                                                }
                                            </>
                                        )}

                                </div>
                            </div>
                        </div>
                    )

                ) : (
                    <div className="d-flex mt-5 justify-content-center align-content-center">
                        <h1 style={{ color: 'tomato' }} className="spinner-border"></h1>

                    </div>
                )}

            </div>

        </div>
    )
}

export default Qrs
