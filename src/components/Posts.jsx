import React, { useEffect, useState } from 'react'
// import { Camera } from '@material-ui/icons';
import { Camera, ArrowRight } from "react-bootstrap-icons";
import axios from 'axios';
import * as serviceWorker from './client';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CardMedia from '@material-ui/core/CardMedia';

function Posts() {
    const url = process.env.REACT_APP_API_URL;

    const [selectedFile, setSelectedFile] = useState(null);
    const [posts, setPosts] = useState({})
    const [update, setUpdate] = useState(false)
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("session")));
        getPosts()
    }, [update])





    const getPosts = async () => {
        try {
            const respuesta = await axios.get(url + 'api/posts/');
            // setPosts(respuesta.data.data);
            const order = respuesta.data.data .sort((a, b) => a > b ? 1 : -1)
            setPosts(order);
        } catch (error) {
            console.error(error);
        }
    }


    const postear = async (e) => {
        e.preventDefault();



        try {
            if (selectedFile != null) {

                let formData = new FormData();
                formData.append("userID", user.user._id);
                formData.append("message", message);
                formData.append("image", selectedFile);

                const respuesta = await axios.post(url + 'api/posts/createPost', formData, {
                    headers: {
                        // 'Authorization': `Basic ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                console.log(respuesta.data.data);
                setPosts(respuesta.data.data);
                setUpdate(!update);
                setSelectedFile(null)
            } else {
                const data = {
                    userID: user.user._id,
                    message,
                }
                const respuesta = await axios.post(url + 'api/posts/createSimplePost', data);
                console.log(respuesta.data.data);
                setPosts(respuesta.data.data);
                setUpdate(!update);
            }

        } catch (error) {
            console.error(error);
        }

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
                        <textarea className="form-control" onChange={e => setMessage(e.target.value)} rows="3"></textarea>
                        <div className="mt-1 d-grid gap-2 d-md-flex justify-content-md-end" role="group">
                            {/* <button type="button" className="btn btn-outline-secondary"><Camera size={22} /> Imagen  </button> */}
                            <input className="btn btn-outline-success" accept="image/*" onLoad={() => setBtnDisable(false)}
                                onChange={(e) => setSelectedFile(e.target.files[0])} id="icon-button-file" style={{ display: 'none' }} type="file" />
                            <label className="btn btn-outline-success" htmlFor="icon-button-file">
                                Imagen <PhotoCamera />
                            </label>
                            <button onClick={(e) => postear(e)} type="button" className="btn btn-outline-success"> Postear <ArrowRight size={22} /></button>
                        </div>
                    </form>
                </div>
                {posts.length > 0 ? (
                    posts.map((p, i) =>
                        <>
                            <List key={i} className="mt-4" >
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src={url + p.userID.image} />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={p.userID.fullName}
                                        secondary={
                                            <>

                                                <div className="row">
                                                    {p.image ?
                                                        <div className="col-md-12">
                                                            <img className="card-img-top m-1" src={url + p.image} style={{ maxHeight: '600px', maxWidth: '600px' }} />
                                                        </div>

                                                        : null}
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >
                                                        {p.message}
                                                    </Typography>
                                                    <div className="col-md-12">
                                                        <IconButton aria-label="add to favorites">
                                                            <ThumbUp />
                                                            {0}
                                                        </IconButton>
                                                        <IconButton aria-label="add like">
                                                            <FavoriteIcon />
                                                            {0}
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    />

                                </ListItem>
                                <Divider variant="inset" component="li" className="col-md-9" />
                            </List>
                        </>
                    )) : null}
            </div>
        </div>
    )
}

export default Posts
