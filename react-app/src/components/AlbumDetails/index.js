import './AlbumDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetails } from '../../store/albums';
import DeleteAlbumModal from '../DeleteAlbumModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import MenuLibrary from '../MenuLibrary';
import { fetchAllArtists } from '../../store/artists';

const AlbumDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  // console.log("This is albumId:", albumId)
  const sessionUser = useSelector(state => state.session.user);
  const album = useSelector(state => state.albumsReducer[albumId]);
  const artists = useSelector(state => state.artistsReducer);
  // console.log("this is album:", album)
  // console.log("this is artists:", artists, Object.values(Object.values(artists)[0]).filter((artist=>(artist.id==6)))[0].name)
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getAlbumDetails(albumId)).then(()=>{dispatch(fetchAllArtists())}).then(() => setIsLoading(false));
  }, [dispatch, albumId]);
  if (isLoading || !album) return (<>Loading...</>);
  const { user_id, title, url, release_date, songs, copyright } = album;

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };
  const handleEditClick = () => {
    // Navigate to the edit page for the current playlist
    history.push(`/albums/${albumId}/edit`);
  };

  const ownsAlbum = sessionUser && sessionUser.id === user_id;

  const convertDuration = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    if(sec<10 && sec>=0){
      sec="0"+sec
    }
    const newStr = `${min}:${sec}`;
    return newStr;
  };
  return (
    <>
      <div className='albumDetailwrapper'>
        <div className='albumDetailitem-1'>
          <MenuLibrary />
        </div>
        <div className='albumDetailitem-2'>
          <p className='title'>Title: {title}</p>
          <img id ="albumdetialimage" src={url} alt="albumdetailimage"/>
          <p className='release_date'>Release Date: {release_date}</p>
          {copyright !== null && (
            <p className='copyright'>{copyright}</p>
          )}
          {songs && songs.length > 0 && (
            <div>
              <p className='songs'>Songs:</p>
              <ul>
                {songs.map((song, index) => (
                  <li key={index}>{song.title}</li>
                ))}
                <div> # Title Artist <i class="fa-regular fa-clock"></i> </div>

                {songs.map((song, index) => (
                  <div key={index}> {index+1} <img id="playlistsongimage" src={song.url}></img> {song.title}
                  {Object.values(Object.values(artists)[0]).filter((artist=>(artist.id==song.artist_id)))[0].name}
                  {convertDuration(song.duration)}</div>
                ))}
              </ul>
            </div>
          )}
          {ownsAlbum && (
            <button>
              <OpenModalMenuItem
                itemText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteAlbumModal album={album} />}
              />
            </button>
          )}
          {ownsAlbum && (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </>
  )
};

export default AlbumDetails;
