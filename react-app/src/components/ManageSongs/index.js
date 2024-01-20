import './ManageSongs.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMySongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';

const ManageSongs = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songsReducer.songs);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMySongs()).then(() => setIsLoading(false));
    }, [dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    if (isLoading) return (<>Loading...</>);
    const songsByUser = songs? songs.filter(song => song.user_id === sessionUser.id) : [];
    const hasSongs = songsByUser.length > 0;
    return (
        <div>
            <p className='title'>Manage Songs</p>
            {!hasSongs && <Link to={'/songs/new'}><button className='createSongButton'>Create a New Song</button></Link>}
            {hasSongs && <ul className='manageSongIndex'>
                {songsByUser.map((song) => (
                    <li className='manageEachSong' key={String(song.id)}>
                        <SongIndexItem song={song}/>
                    </li>
                ))}
             </ul>}
        </div>
    );
};

export default ManageSongs;
