import './RemoveSongFromPlaylistModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyPlaylists, removeSongFromPlaylistThunk } from '../../store/playlists';
import { useHistory } from 'react-router-dom';

const RemoveSongFromPlaylistModal = ({ song }) => {
    const songId = song.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const playlists = useSelector(state => Object.values(state.playlistsReducer.playlists.playlists || {}));
    const sessionUser = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setIsLoading(false));
    }, [dispatch]);

    const isSongInPlaylist = (playlist) => playlist.songs.some((s) => s.id === songId);

    const playlistsByUser = playlists ? playlists.filter(playlist => playlist.user_id === sessionUser?.id) : [];

    const handleRemoveSong = async (playlistId, playlistTitle) => {
        try {
            await dispatch(removeSongFromPlaylistThunk(playlistId, songId));
            // Manually update the state after removing the song
            await dispatch(getMyPlaylists()).then(() => {
                closeModal();
                window.confirm(`Song successfully removed from "${playlistTitle}"`);
                history.push(`/playlists/${playlistId}`)
            });
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };

    if (isLoading) return (<>Loading...</>);

    return (
        <div>
            <p className='heading'>Which playlist would you like to delete this song from?</p>
            <ul>
                {playlistsByUser.map((playlist) => (
                    isSongInPlaylist(playlist) && (
                        <li key={playlist.id}>
                            <button className='deleteSongFromPlaylist' onClick={() => handleRemoveSong(playlist.id, playlist.title)}>
                                {playlist.title}
                            </button>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}

export default RemoveSongFromPlaylistModal;
