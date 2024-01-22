import './PlaylistIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from '../../store/playlists';
import PlaylistIndexItem from '../PlaylistIndexItem/index';

const PlaylistIndex = ({num}) => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlistsReducer.playlists);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAllPlaylists()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);
  return (
    <div>
      <ul className='landingPlaylistIndex'>
        {num !== 4 && playlists.map((playlist) => (
          <PlaylistIndexItem className='landingEachPlaylist' playlist={playlist} />
        ))}
        {num === 4 && playlists.slice(0,4).map((playlist) => (
          <PlaylistIndexItem className='landingEachPlaylist' playlist={playlist} />
        ))}

      </ul>
    </div>
  );
};

export default PlaylistIndex;
