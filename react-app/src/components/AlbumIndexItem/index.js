import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumDetails } from "../../store/albums";
import { Link } from 'react-router-dom';
import "./AlbumIndexItem.css";
const AlbumIndexItem = ({ album }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { id, title, url} = album;
    const sessionUserId = sessionUser ? sessionUser.id : null;

    return (
        <Link id="albumlinkwithtext" to={`/albums/${id}`} key={`${id}`}>
            <hr />
            <div id="albumgrid1">
                <div id="albumitem1">
                    <img id="albumImage" src={url} alt="album" />
                </div>
                <div id="albumitem2">
                    <h1>{title}</h1>
                </div>
            </div>
        </Link>


    );
}

export default AlbumIndexItem;
