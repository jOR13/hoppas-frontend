import React, { useState, useEffect } from 'react'
import { Facebook, Instagram, CameraFill, PencilFill } from "react-bootstrap-icons";



function Profile(props) {

    const [user, setUser] = useState({})





    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
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
                    <div className="row">
                        <div className="mt-3 col-xs-12 profile rounded-soft rounded-bottom-0 position-relative" style={{ height: 300, }}>
                            <CameraFill size={30} className="position-absolute rounded-circle hoverIcon" style={{ right: "4px", top: "4px", width: "40px" }} />
                            <div className="card ms-3 text-center border-0" style={{ backgroundColor: 'transparent', marginTop: 110 }}>
                                {user.user.SignUpType === "Google" || user.user.SignUpType === "Facebook" ? (
                                    <>
                                        <div className="position-relative">
                                            <img src={user.user.image} className="position-absolute mt-5 rounded-circle img-thumbnail shadow" alt="" style={{ left: "0px", top: "-6px", width: "150px" }} />
                                            <PencilFill className="position-absolute rounded-circle  hoverIcon img-thumbnail" style={{ left: "116px", top: "155px", width: "30px" }} />
                                        </div>
                                    </>
                                ) : (
                                    <img src={process.env.REACT_APP_API_URL + user.user.image} alt="" className=" mt-5 card-img-top align-self-center rounded-circle w-50" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 shadow">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card border-0 text-center" style={{ backgroundColor: 'transparent' }}>
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
