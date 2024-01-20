import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumDetails } from "../../store/albums";
import { Link, Redirect } from 'react-router-dom';
import "./AlbumIndexItem.css";
const AlbumIndexItem = ({ album }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const albumData = useSelector((state) => state.albums[album.id]);
    // useEffect(() => {
    //     // dispatch(albumDetails(album.id)).then(()=>dispatch(getGroupIdEvents(group.id))).then(()=>setIsLoaded(true))
    //     dispatch(albumDetails(album.id)).then(()=>setIsLoaded(true))
    // }, [dispatch, album.id])

    // if(isLoaded && !groupData){
    //     return (<Redirect to="/groups"/>);
    // }

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }

    const {id, title, url} = albumData;

    if(isLoaded){
    return (
        <Link id="albumlinkwithtext" to={`/albums/${id}`}  key={`${id}`}>
        <hr />
        <div id="albumgrid1">
            <div id="albumitem1">
                <img id ="albumImage" src={url} alt="album"/>
            </div>
            <div id ="albumitem2">
            <h1>{title}</h1>
            </div>
        </div>
        </Link>


    );
    }
};

export default AlbumIndexItem;
