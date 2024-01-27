import './PlaylistDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistById } from '../../store/playlists';
import DeletePlaylistModal from '../DeletePlaylistModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const playlist = useSelector(state => state.playlistsReducer.currentPlaylist);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId)).then(() => setIsLoading(false));
  }, [dispatch, playlistId]);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  if (isLoading || !playlist) return <>Loading...</>;

  const { user_id, title, url, description, songs } = playlist;

  const canDeletePlaylist = sessionUser && sessionUser.id === user_id;

  return (
    <>
      <div className='grid-container'>
        <p className='title'>{title}</p>
        {description !== null && (
          <p className='description'>{description}</p>
        )}
        <p className='url'>{url}</p>
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
      </div>

      {canDeletePlaylist && (
        <button>
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeletePlaylistModal playlist={playlist} />}
          />
        </button>
      )}
    </>
  );
};

export default PlaylistDetails;
