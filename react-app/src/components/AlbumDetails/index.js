import './AlbumDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetails} from '../../store/albums';


const AlbumDetails = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  console.log("This is albumId:", albumId)
  const sessionUser = useSelector(state => state.session.user);
  const album = useSelector(state => state.albumsReducer[albumId]);
  console.log("this is album:" ,album)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAlbumDetails(albumId)).then(() => setIsLoading(false));
  }, [dispatch, albumId]);
  if (isLoading || !album) return (<>Loading...</>);
  const {user_id, artist_id, title, lyrics, url, duration, release_date} = album;
  return (
    <div className='grid-container'>
      <p className='title'>{title}</p>
      <p className='lyrics'>{lyrics}</p>
      <p className='duration'>{duration}</p>
      <p className='release_date'>{release_date}</p>
    </div>
  )
};

export default AlbumDetails;
