import './DeleteSong.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSong } from '../../store/songs';
import { useHistory } from 'react-router-dom';

const DeleteSongModal = ({ song }) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await dispatch(deleteSong(songId));
            closeModal();
            history.push('/songs');
        } catch (error) {
            console.error('Error deleting song:', error);

            try {
                const data = await error.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
        }
    };

    return (
        <div>
            <p className='heading'>Confirm Delete</p>
            <p className='subheading'>Are you sure you want to remove this song?</p>
            <button className='deleteSongYes' onClick={handleDelete}>Yes - Delete Song</button><br />
            <button className='deleteSongNo' onClick={closeModal}>No - Keep Song</button>
        </div>
    );
}

export default DeleteSongModal;
