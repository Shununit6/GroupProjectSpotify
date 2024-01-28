import './AddSongToPlaylistModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyPlaylists, addSongToPlaylistThunk } from '../../store/playlists';

const AddSongToPlaylistModal = ({song}) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlistsReducer.playlists);
    // const playlists = useSelector(state => state.playlistsReducer);
    console.log('playlists', playlists);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const {closeModal} = useModal();

    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setIsLoading(false));
      }, [dispatch]);

    const handleAddSong = async (playlistId) => {
        dispatch(addSongToPlaylistThunk(playlistId, songId))
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
            <p className='heading'>Which playlist would you like to add this song to?</p>
            <ul>
                {Object.values(playlists.playlists).map((playlist) => (
                    <li key={playlist.id}>
                        <button className='addSongToPlaylist' onClick={() => handleAddSong(playlist.id)}>{playlist.title}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddSongToPlaylistModal;
