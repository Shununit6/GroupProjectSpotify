import './DeleteAlbum.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAlbum } from '../../store/albums';

const DeleteAlbumModal = ({album}) => {
    const albumId = album.id;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(albumId))
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
            <p className='subheading'>Are you sure you want to remove this album?</p>
            <button className='deleteAlbumYes' onClick={handleDelete}>Yes - Delete Album</button><br/>
            <button className='deleteAlbumNo' onClick={closeModal}>No - Keep Album</button>
        </div>
    );
}

export default DeleteAlbumModal;
