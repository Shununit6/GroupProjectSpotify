import './DeleteAlbum.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAlbum } from '../../store/albums';
import { useHistory } from 'react-router-dom';

const DeleteAlbumModal = ({album}) => {
    const albumId = album.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await dispatch(deleteAlbum(albumId));
            closeModal();
            await history.push('/albums');
        } catch (error) {
            console.error('Error deleting album:', error);

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
            <p className='subheading'>Are you sure you want to remove this album?</p>
            <button className='deleteAlbumYes' onClick={handleDelete}>Yes - Delete Album</button><br/>
            <button className='deleteAlbumNo' onClick={closeModal}>No - Keep Album</button>
        </div>
    );
}

export default DeleteAlbumModal;
