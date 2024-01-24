import './AlbumDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetails} from '../../store/albums';
import DeleteAlbumModal from '../DeleteAlbumModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


const AlbumDetails = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  console.log("This is albumId:", albumId)
  const sessionUser = useSelector(state => state.session.user);
  const album = useSelector(state => state.albumsReducer[albumId]);
  console.log("this is album:" ,album)
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getAlbumDetails(albumId)).then(() => setIsLoading(false));
  }, [dispatch, albumId]);
  if (isLoading || !album) return (<>Loading...</>);
  const {user_id, artist_id, title, lyrics, url, duration, release_date} = album;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  return (
    <>
    <div className='grid-container'>
      <p className='title'>{title}</p>
      <p className='lyrics'>{lyrics}</p>
      <p className='duration'>{duration}</p>
      <p className='release_date'>{release_date}</p>
    </div>
    <button>
        <OpenModalMenuItem
          itemText="Delete"
          onItemClick={closeMenu}
          modalComponent={<DeleteAlbumModal album = {album}/>}
        />
      </button>
    </>
  )
};

export default AlbumDetails;
