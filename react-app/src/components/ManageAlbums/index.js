import './ManageAlbums.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAlbums } from '../../store/albums';
import AlbumIndexItem from '../AlbumIndexItem/index';
import MenuLibrary from '../MenuLibrary';

const ManageAlbums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => Object.values(state.albumsReducer || {}));
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getMyAlbums()).then(() => setIsLoading(false));
        }
    }, [dispatch, sessionUser]);

    if (isLoading) return <>Loading...</>;

    const albumsByUser = albums ? albums.filter(album => {
        return album.user_id === sessionUser?.id;
    }) : [];

    const hasAlbums = albumsByUser.length > 0;

    return (
        <div className='manageAlbumwrapper'>
            <div className='manageAlbumitem-1'>
                <MenuLibrary />
            </div>
            <div className='manageAlbumitem-2'>
            <p className='title'>Manage Albums</p>
            {!hasAlbums && <Link to={'/albums/new'}><button className='createAlbumButton'>Create a New Album</button></Link>}
            {hasAlbums && <ul className='manageAlbumIndex'>
                {albumsByUser.map((album) => (
                    <ul className='manageEachAlbum' key={String(album.id)}>
                        {album && <AlbumIndexItem album={album} />}
                    </ul>
                ))}
             </ul>}
            </div>
        </div>
    );
};

export default ManageAlbums;
