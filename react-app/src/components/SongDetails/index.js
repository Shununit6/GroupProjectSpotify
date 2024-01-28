import './SongDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import { getMyAlbums, deleteAlbumSong } from '../../store/albums';
import { getMyPlaylists, removeSongFromPlaylistThunk } from '../../store/playlists';
import MenuLibrary from '../MenuLibrary';
import { fetchAllArtists } from '../../store/artists';



const SongDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songsReducer[songId]);
  const like = useSelector(state => state.likesReducer.likes);
  console.log("this is song:", song)
  console.log("this is like:", like)
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const allArtists = useSelector(state => state.artistsReducer);
  const ulRef = useRef();
  const albums = useSelector(state => state.albumsReducer);
  const playlists = useSelector(state => state.playlistsReducer.playlists);
  const hasAlbums = Object.keys(albums).length > 0;
  const hasPlaylists = Object.keys(playlists).length > 0;

  useEffect(() => {
    dispatch(getSongDetails(songId)).then(()=>dispatch(getAllLikes()))
    .then(()=>dispatch(getSongLikes(songId))).then(()=>dispatch(fetchAllArtists())).then(() => setIsLoading(false));
  }, [dispatch, songId]);
  if (isLoading || !song) return (<>Loading...</>);
  const { user_id, artist_id, title, lyrics, url, duration, release_date } = song;


  const song_curr_artist = (Object.values(Object.values(allArtists)[0])).filter((curr)=>(curr.id==artist_id))[0].name;
    // console.log(curr_artist)
  const sessionUserId = sessionUser ? sessionUser.id : null;
  //check Delete Song auth
  const checkUserVSOwner = sessionUserId === user_id ? true : false;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleEditClick = () => {
    // Navigate to the edit page for the current playlist
    history.push(`/songs/${songId}/edit`);
  };

  return (
    <>
      <div className='songDetailwrapper'>
      <div className='songDetailitem-1'>
         <MenuLibrary />
      </div>
      <div className='songDetailitem-2'>
        <img id ="songdetialimage" src={url} alt="songdetailimage"/>
        <p className='title'>{title}</p>
        <p >{song_curr_artist}</p>
        <p className='lyrics'>{lyrics}</p>
        <p className='duration'>{duration}</p>
        <p className='release_date'>{release_date}</p>
      {sessionUser && <LikeSong userId={user_id} songId={songId}/>}
      {checkUserVSOwner &&
      <button onClick={closeMenu}>
        <OpenModalMenuItem
          itemText="Delete Song"
          onItemClick={closeMenu}
          modalComponent={<DeleteSongModal song={song}/>}
        />
      </button>}
      {checkUserVSOwner &&(
      <button onClick={handleEditClick}>Edit</button>
      )}
      {sessionUserId && <button onClick={closeMenu}> <OpenModalMenuItem itemText="Add Song to Album" onItemClick={closeMenu} modalComponent={<AddSongToAlbumModal song = {song}/>}/> </button>}
      {sessionUserId && <button onClick={closeMenu}> <OpenModalMenuItem itemText="Add Song to Playlist" onItemClick={closeMenu} modalComponent={<AddSongToPlaylistModal song = {song}/>}/> </button>}
      {sessionUserId && <button onClick={closeMenu}> <OpenModalMenuItem itemText="Remove Song from Album" onItemClick={closeMenu} modalComponent={<RemoveSongFromAlbumModal song = {song}/>}/> </button>}
      {sessionUserId && <button onClick={closeMenu}> <OpenModalMenuItem itemText="Remove Song from Playlist" onItemClick={closeMenu} modalComponent={<RemoveSongFromPlaylistModal song = {song}/>}/> </button>}
      {/* {sessionUserId && hasAlbums && <button> <OpenModalMenuItem itemText="Remove Song from Album" onItemClick={closeMenu} modalComponent={<RemoveSongFromAlbumModal song = {song}/>}/> </button>}
      {sessionUserId && hasPlaylists && <button> <OpenModalMenuItem itemText="Remove Song from Playlist" onItemClick={closeMenu} modalComponent={<RemoveSongFromPlaylistModal song = {song}/>}/> </button>} */}
      </div>
      </div>
    </>
  )
};

export default SongDetails;
