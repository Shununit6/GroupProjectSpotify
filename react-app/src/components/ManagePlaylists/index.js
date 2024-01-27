import './ManagePlaylists.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPlaylists } from '../../store/playlists';
import PlaylistIndexItem from '../PlaylistIndexItem/index';

const ManagePlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => Object.values(state.playlistsReducer.playlists.playlists||[]));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setIsLoading(false));
    }, [dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    if (isLoading) return (<>Loading...</>);
    const playlistsByUser = playlists ? playlists.filter(playlist => playlist.user_id === sessionUser.id) : [];
    const hasPlaylists = playlistsByUser.length > 0;
    return (
        <div>
            <p className='title'>Manage Playlists</p>
            {!hasPlaylists && <Link to={'/playlists/new'}><button className='createPlaylistButton'>Create a New Playlist</button></Link>}
            {hasPlaylists && <ul className='managePlaylistIndex'>
                {playlistsByUser.map((playlist) => (
                    <ul className='manageEachPlaylist' key={String(playlist.id)}>
                        {playlist && <PlaylistIndexItem playlist={playlist}/>}
                    </ul>
                ))}
             </ul>}
        </div>
    );
};

export default ManagePlaylists;
