import './ManageAlbums.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAlbums } from '../../store/albums';
import AlbumIndexItem from '../AlbumIndexItem/index';

const ManageAlbums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => Object.values(state.albumsReducer));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getMyAlbums()).then(() => setIsLoading(false));
    }, [dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    if (isLoading) return (<>Loading...</>);
    const albumsByUser = albums ? albums.filter(album => album.user_id === sessionUser.id) : [];
    const hasAlbums = albumsByUser.length > 0;
    return (
        <div>
            <p className='title'>Manage Albums</p>
            {/* {!hasAlbums && <Link to={'/albums/new'}><button className='createAlbumButton'>Create a New Album</button></Link>} */}
            {hasAlbums && <ul className='manageAlbumIndex'>
                {albumsByUser.map((album) => (
                    <li className='manageEachAlbum' key={String(album.id)}>
                        <AlbumIndexItem album={album}/>
                    </li>
                ))}
             </ul>}
        </div>
    );
};

export default ManageAlbums;
