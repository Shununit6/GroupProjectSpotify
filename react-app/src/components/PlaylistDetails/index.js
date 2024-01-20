import './PlaylistDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistById } from '../../store/playlists';


const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const playlist = useSelector(state => state.playlistsReducer.currentPlaylist);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId)).then(() => setIsLoading(false));
  }, [dispatch, playlistId]);
  if (isLoading || !playlist) return (<>Loading...</>);
  const {user_id, artist_id, title, lyrics, url, duration, release_date} = playlist;
  return (
    <div className='grid-container'>
      <p className='title'>{title}</p>
      <p className='lyrics'>{lyrics}</p>
      <p className='duration'>{duration}</p>
      <p className='release_date'>{release_date}</p>
    </div>
  )
};

export default PlaylistDetails;
