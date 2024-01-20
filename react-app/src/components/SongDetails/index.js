import './SongDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';


const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songsReducer[songId]);
  console.log("this is song:" ,song)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getSongDetails(songId)).then(() => setIsLoading(false));
  }, [dispatch, songId]);
  if (isLoading || !song) return (<>Loading...</>);
  const {user_id, artist_id, title, lyrics, url, duration, release_date} = song;
  return (
    <div className='grid-container'>
      <p className='title'>{title}</p>
      <p className='lyrics'>{lyrics}</p>
      <p className='duration'>{duration}</p>
      <p className='release_date'>{release_date}</p>
    </div>
  )
};

export default SongDetails;
