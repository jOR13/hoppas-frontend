import React, { useEffect, useState } from 'react'
// import { Camera } from '@material-ui/icons';
import { Camera, ArrowRight } from "react-bootstrap-icons";


function Posts() {

    const url =  process.env.REACT_APP_API;

    const [posts, setPosts] = useState({})

    useEffect(() => {
        
    }, [])


    const getPosts = () => {

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <h2 className="mt-2">POSTS</h2>
                </div>
                <div className="col-md-12">
                    <form>
                        <label className="form-label">¿Tienes algo importante que compartir? escribelo aqui 👇</label>
                        <textarea className="form-control" rows="3"></textarea>
                        <div className="mt-1 d-grid gap-2 d-md-flex justify-content-md-end" role="group">
                            <button type="button" className="btn btn-outline-secondary"><Camera size={22} /> Imagen  </button>

                            <button type="button" className="btn btn-outline-success"> Postear <ArrowRight size={22} /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Posts
