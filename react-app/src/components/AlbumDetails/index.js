import './AlbumDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetails } from '../../store/albums';
import DeleteAlbumModal from '../DeleteAlbumModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import MenuLibrary from '../MenuLibrary';

const AlbumDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  console.log("This is albumId:", albumId)
  const sessionUser = useSelector(state => state.session.user);
  const album = useSelector(state => state.albumsReducer[albumId]);
  console.log("this is album:", album)
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getAlbumDetails(albumId)).then(() => setIsLoading(false));
  }, [dispatch, albumId]);
  if (isLoading || !album) return (<>Loading...</>);
  const { user_id, title, url, release_date, songs, copyright } = album;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };
  const handleEditClick = () => {
    // Navigate to the edit page for the current playlist
    history.push(`/albums/${albumId}/edit`);
  };

  const ownsAlbum = sessionUser && sessionUser.id === user_id;

  return (
    <>
      <div className='albumDetailwrapper'>
        <div className='albumDetailitem-1'>
          <MenuLibrary />
        </div>
        <div className='albumDetailitem-2'>
          <p className='title'>{title}</p>
          <p className='release_date'>{release_date}</p>
          <p className='url'>{url}</p>
          {copyright !== null && (
            <p className='copyright'>{copyright}</p>
          )}
          {songs && songs.length > 0 && (
            <div>
              <p className='songs'>Songs:</p>
              <ul>
                {songs.map((song, index) => (
                  <li key={index}>{song.title}</li>
                ))}
              </ul>
            </div>
          )}
          {ownsAlbum && (
            <button>
              <OpenModalMenuItem
                itemText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteAlbumModal album={album} />}
              />
            </button>
          )}
          {ownsAlbum && (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </>
  )
};

export default AlbumDetails;
