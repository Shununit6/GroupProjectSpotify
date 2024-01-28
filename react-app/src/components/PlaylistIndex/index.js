import './PlaylistIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from '../../store/playlists';
import PlaylistIndexItem from '../PlaylistIndexItem/index';
import MenuLibrary from '../MenuLibrary';

const PlaylistIndex = ({num}) => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlistsReducer.playlists);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAllPlaylists()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);
  return (
    <div className='playlistIndexwrapper'>
      {num !== 4 && <div className='playlistIndexitem-1'>
         <MenuLibrary />
      </div>}
      <div className='playlistIndexitem-2'>
        { num !== 4 && <h2>{" "} All Playlists:</h2>}
        <ul className='landingPlaylistIndex'>
          {num !== 4 && playlists.map((playlist) => (
            <PlaylistIndexItem playlist={playlist} />
          ))}
          {num === 4 && playlists.slice(0,4).map((playlist) => (
            <PlaylistIndexItem playlist={playlist} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistIndex;
