import React, { useState, useEffect } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ArrowRight from '@material-ui/icons/ArrowRight';
import axios from 'axios'
import { Facebook, Instagram, Camera, PencilFill } from "react-bootstrap-icons";



function Profile(props) {

    const [user, setUser] = useState({})





    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem("session")));
        console.log(user)

    }, [])




    // const completeRegister = async () => {


    //     try {
    //         const resultado = await axios.post(`${process.env.REACT_APP_API_URL}api/user/registerGoogle`, datos);

    //         // AsyncStorage.setItem('user', JSON.stringify(resultado.data));
    //         console.log(resultado);
    //         // setLoading(false);
    //         if (resultado.status === 200) {
    //             props.history.push("/");
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         // setErrorConsulta(true);
    //         // setLoading(false);
    //     }
    // }


    return (
        <>
            {user.user ? (
                <div className="container p-3">
                    <div className="row  ">
                        <div className="mt-3 col-xs-12 profile rounded-soft rounded-bottom-0" style={{ height: 300, }}>
                            <div className="d-flex align-items-end" style={{ position: 'absolute' }}>
                                <Camera size={20} />
                            </div>
                            <div className="card ms-3 text-center border-0" style={{ backgroundColor: 'transparent', marginTop: 110 }}>

                                {user.user.SignUpType === "Google" || user.user.SignUpType === "Facebook" ? (
                                    <>
                                        <div className="position-relative">


                                            <img src={user.user.image} className="position-absolute mt-5 rounded-circle img-thumbnail shadow" style={{ left: "0px", top: "-6px", width: "150px" }} />
                                            <PencilFill size={30} className="position-absolute rounded-circle img-thumbnail" style={{ left: "120px", top: "153px", weight: "auto" }} />
                                        </div>

                                    </>
                                ) : (
                                    <img src={process.env.REACT_APP_API_URL + user.user.image} className=" mt-5 card-img-top align-self-center rounded-circle w-50" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 shadow">
                            <div className="row">
                                <div className="col-md-6">
                                    <div clasName="card border-0 text-center" style={{ backgroundColor: 'transparent' }}>
                                        <div className="mt-5 card-body align-self-start">
                                            <h3 className="mt-3">{user.user.fullName}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-start border-top justify-content-md-end">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <a className="link" href="#"><h5 className="mt-3 link2 d-flex align-items-center me-1"><Facebook size={20} />Facebook</h5></a>
                                            <a className="link" href="#"><h5 className="mt-3 link2 d-flex align-items-center me-1"><Instagram size={20} />Instagram</h5></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h5 className="mt-5">Informacion de la cuenta</h5>
                        </div>
                    </div>
                </div >
            ) : <h1>Error al cargar el perfil </h1>
            }
        </>

    )
}

export default Profile
