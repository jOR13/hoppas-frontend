import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QRCode from "qrcode.react";
import { UpcScan } from "react-bootstrap-icons";

function Qrs() {
    const url = process.env.REACT_APP_API_URL;
    const [qrs, setQrs] = useState({})
    const [qrCode, setQrCode] = useState('')
    const [user, setUser] = useState({})
    const [pets, setPets] = useState({})
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
        getQrs()
        getPets()
    }, [])

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
            console.log(respuesta.data.data)
            const filtro = res.filter((f) => f.userID ? f.userID._id === u.user._id : null)
            console.log(filtro);
            setPets(filtro);
        } catch (error) {
            console.error(error);
        }
    }

    const updateQR = async () => {
        // console.log(user)
        if (qrCode != "") {
            try {
                const data = {
                    status: "signed",
                    userID: user.user._id
                }
                const res = await axios.put(url + 'api/qrs/' + qrCode, data);
                console.log(res.data.data);
                setUpdate(true)
                getQrs()
            } catch (error) {
                console.error(error);
            }
        }
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
                        <button onClick={() => updateQR()} className="btn btn-outline-success rounded-pill ms-2 btn-sm">Agregar</button></div>
                </div>

                {qrs.length > 0 ? (
                    qrs.map((qr) =>
                        <div key={qr._id} className="col-sm-6 col-md-3 align-self-center justify-content-center d-flex ">
                            <div className="ms-1 me-1 card border-0 shadow mt-2 mb-5" style={{ borderRadius: '20px', maxHeight: '350px', maxWidth: '300px', minWidth: '170px' }} >
                                <div className="card-body text-center d-grid gap-2 d-md-block">
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

                                            <h3 className="h5">{qr.mascotaID.name}</h3>
                                            <div className="" style={{ backgroundColor: '#red' }}>
                                                <button className="btn btn-outline-danger  btn-sm">Desvincular</button>
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
                                                    <select className="form-select mb-2" id="inputGroupSelect01">
                                                        <option defaultValue>Choose...</option>
                                                        {pets.length > 0 ? (
                                                            pets.map((p) =>
                                                                <option key={p._id}>{p.name}</option>
                                                            )) : null
                                                        }
                                                    </select> :  <h1 style={{ color: 'tomato' }} className="spinner-border"></h1>}
                                                <div className="" style={{ backgroundColor: '#red' }}>
                                                    <button className="btn btn-outline-success  btn-sm">Vincular</button>
                                                </div>
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
