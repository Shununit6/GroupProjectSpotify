import './PlaylistIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from '../../store/playlists';
import PlaylistIndexItem from '../PlaylistIndexItem/index';

const PlaylistIndex = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlistsReducer.playlists);
  console.log(playlists);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAllPlaylists()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);
  return (
    <div>
      <ul className='landingPlaylistIndex'>
        {playlists.map((playlist) => (
          <li className='landingEachPlaylist' key={String(playlist.id)}>
            <PlaylistIndexItem playlist={playlist} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistIndex;
