import './DeleteSong.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSong } from '../../store/songs';

const DeleteSongModal = ({song}) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteSong(songId))
        .then(closeModal)
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
            <p className='subheading'>Are you sure you want to remove this song?</p>
            <button className='deleteSongYes' onClick={handleDelete}>Yes - Delete Song</button><br/>
            <button className='deleteSongNo' onClick={closeModal}>No - Keep Song</button>
        </div>
    );
}

export default DeleteSongModal;
