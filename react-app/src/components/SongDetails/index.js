import './SongDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';
import DeleteSongModal from '../DeleteSongModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getAllLikes, createLike, deleteLike } from '../../store/likes';
import LikeSong from '../LikeSong';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songsReducer[songId]);
  const like = useSelector(state => state.likesReducer.likes);
  console.log("this is song:", song)
  console.log("this is like:", like)
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getSongDetails(songId)).then(()=>dispatch(getAllLikes(songId))).then(() => setIsLoading(false));
  }, [dispatch, songId]);
  if (isLoading || !song) return (<>Loading...</>);
  if (isLoading || !song) return (<>Loading...</>);
  const { user_id, artist_id, title, lyrics, url, duration, release_date } = song;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <div className='grid-container'>
        <img id ="songdetialimage" src={url} alt="songdetailimage"/>
        <p className='title'>{title}</p>
        <p className='lyrics'>{lyrics}</p>
        <p className='duration'>{duration}</p>
        <p className='release_date'>{release_date}</p>
      </div>
      <LikeSong userId={user_id} songId={songId}/>
      <button onClick={closeMenu}>
        <OpenModalMenuItem
          itemText="Delete"
          onItemClick={closeMenu}
          modalComponent={<DeleteSongModal song={song} />}
        />
      </button>
    </>
  )
};

export default SongDetails;
