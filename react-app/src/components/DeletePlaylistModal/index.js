import './DeletePlaylist.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistThunk } from '../../store/playlists';
import { useHistory } from 'react-router-dom';

const DeletePlaylistModal = ({playlist}) => {
    const playlistId = playlist.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deletePlaylistThunk(playlistId))
        .then(() => closeModal())
        .then(() => history.push('/playlists'))
        // .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
        });
    };
    return (
        <div>
            <p className='heading'>Confirm Delete</p>
            <p className='subheading'>Are you sure you want to remove this playlist?</p>
            <button className='deletePlaylistYes' onClick={handleDelete}>Yes - Delete Playlist</button><br/>
            <button className='deletePlaylistNo' onClick={closeModal}>No - Keep Playlist</button>
        </div>
    );
}

export default DeletePlaylistModal;
