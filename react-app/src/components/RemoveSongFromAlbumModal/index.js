import './RemoveSongFromAlbumModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyAlbums, deleteAlbumSong } from '../../store/albums';

const RemoveSongFromAlbumModal = ({song}) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albumsReducer.albums);
    // albums that have this song:
    // const targetAlbums = ;
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();

    useEffect(() => {
        dispatch(getMyAlbums()).then(() => setIsLoading(false));
      }, [dispatch]);

    const handleDelete = async (albumId) => {
        dispatch(deleteAlbumSong(albumId, songId))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
        });
    };

    if (isLoading ) return (<>Loading...</>);

    return (
        <div>
            <p className='heading'>Which album would you like to delete this song from?</p>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        <button className='deleteSongFromAlbum' onClick={() => handleDelete(album.id)}>{album.title}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RemoveSongFromAlbumModal;
