import './SongDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';
import DeleteSongModal from '../DeleteSongModal';
import AddSongToAlbumModal from '../AddSongToAlbumModal';
import AddSongToPlaylistModal from '../AddSongToPlaylistModal';
import RemoveSongFromAlbumModal from '../RemoveSongFromAlbumModal';
import RemoveSongFromPlaylistModal from '../RemoveSongFromPlaylistModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getSongLikes, getAllLikes } from '../../store/likes';
import LikeSong from '../LikeSong';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songsReducer[songId]);
  const like = useSelector(state => state.likesReducer.likes);
  console.log("this is song:", song)
  console.log("this is like:", like)
  // let numofliked = 0;
  // const [numliked, setNumLiked] = useState(numofliked);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getSongDetails(songId)).then(()=>dispatch(getAllLikes())).then(()=>dispatch(getSongLikes(songId))).then(() => setIsLoading(false));
  }, [dispatch, songId]);
  if (isLoading || !song) return (<>Loading...</>);
  const { user_id, artist_id, title, lyrics, url, duration, release_date } = song;

  const sessionUserId = sessionUser ? sessionUser.id : null;
  //check Delete Song auth
  const checkUserVSOwner = sessionUserId === user_id ? true : false;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  // if(like){
  //   numofliked = like.length;
  //   setNumLiked(numofliked);
  // }

  return (
    <>
      <div className='grid-container'>
        <img id ="songdetialimage" src={url} alt="songdetailimage"/>
        <p className='title'>{title}</p>
        <p className='lyrics'>{lyrics}</p>
        <p className='duration'>{duration}</p>
        <p className='release_date'>{release_date}</p>
      </div>
      {sessionUser && <LikeSong userId={user_id} songId={songId}/>}
      {/* <p>{numliked} liked the song</p> */}
      {checkUserVSOwner &&
      <button onClick={closeMenu}>
        <OpenModalMenuItem
          itemText="Delete Song"
          onItemClick={closeMenu}
          modalComponent={<DeleteSongModal song={song}/>}
        />
      </button>}
      {sessionUserId && <button> <OpenModalMenuItem itemText="Add Song to Album" onItemClick={closeMenu} modalComponent={<AddSongToAlbumModal song = {song}/>}/> </button>}
      {sessionUserId && <button> <OpenModalMenuItem itemText="Add Song to Playlist" onItemClick={closeMenu} modalComponent={<AddSongToPlaylistModal song = {song}/>}/> </button>}
      {sessionUserId && <button> <OpenModalMenuItem itemText="Remove Song from Album" onItemClick={closeMenu} modalComponent={<RemoveSongFromAlbumModal song = {song}/>}/> </button>}
      {sessionUserId && <button> <OpenModalMenuItem itemText="Remove Song from Playlist" onItemClick={closeMenu} modalComponent={<RemoveSongFromPlaylistModal song = {song}/>}/> </button>}
    </>
  )
};

export default SongDetails;
