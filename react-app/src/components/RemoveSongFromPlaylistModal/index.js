import './RemoveSongFromPlaylistModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyPlaylists, removeSongFromPlaylistThunk } from '../../store/playlists';

const RemoveSongFromPlaylistModal = ({song}) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlistsReducer.playlists);
    // playlists that have this song:
    // const targetPlaylists = ;
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();

    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setIsLoading(false));
      }, [dispatch]);

    const handleDelete = async (playlistId) => {
        dispatch(removeSongFromPlaylistThunk(playlistId, songId))
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
            <p className='heading'>Which playlist would you like to delete this song from?</p>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <button className='deleteSongFromPlaylist' onClick={() => handleDelete(playlist.id)}>{playlist.title}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RemoveSongFromPlaylistModal;
