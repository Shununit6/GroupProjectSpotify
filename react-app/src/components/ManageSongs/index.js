import './ManageSongs.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMySongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';

const ManageSongs = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => Object.values(state.songs));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMySongs()).then(() => setIsLoading(false));
    }, [dispatch]);
    if (isLoading) return (<>Loading...</>);
    const songsByUser = songs.filter(song => song.user_id === sessionUser.id);
    const hasSongs = songsByUser.length ? true : false;
    return (
        <div>
            <p className='title'>Manage Songs</p>
            {!hasSongs && <Link to={'/songs/new'}><button className='createSongButton'>Create a New Song</button></Link>}
            {hasSongs && <ul className='manageSongIndex'>
                {songsByUser.map((song) => (
                    <li className='manageEachSong' key={song.id}>
                        <SongIndexItem song={song} key={song.id}/>
                    </li>
                ))}
             </ul>}
        </div>
    );
};

export default ManageSongs;
