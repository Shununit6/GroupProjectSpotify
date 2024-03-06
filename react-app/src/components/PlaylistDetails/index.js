import './PlaylistDetails.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistById } from '../../store/playlists';
import DeletePlaylistModal from '../DeletePlaylistModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import MenuLibrary from '../MenuLibrary';
import { fetchAllArtists } from '../../store/artists';


const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const playlist = useSelector(state => state.playlistsReducer.currentPlaylist);
  const artists = useSelector(state => state.artistsReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId)).then(()=>{dispatch(fetchAllArtists())}).then(() => setIsLoading(false));
  }, [dispatch, playlistId]);

  const closeMenu = (e) => {
    if (!ulRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };
  const handleEditClick = () => {
    // Navigate to the edit page for the current playlist
    history.push(`/playlists/${playlistId}/edit`);
  };

  if (isLoading || !playlist) return <>Loading...</>;

  const { user_id, title, url, description, songs } = playlist;

  const ownsPlaylist = sessionUser && sessionUser.id === user_id;

  const convertDuration = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    if(sec<10 && sec>=0){
      sec="0"+sec
    }
    const newStr = `${min}:${sec}`;
    return newStr;
  };
  // const formattedDuration = convertDuration(duration);
  return (
    <>
    <div className='playlistDetailwrapper'>
      <div className='playlistDetailitem-1'>
         <MenuLibrary />
      </div>
      <div className='playlistDetailitem-2'>
        <p className='title'>Title: {title}</p>
        <img id ="playlistdetailimage" src={url} alt="playlistdetailimage"/>
        {description !== null && (
          <p className='description'>Description: {description}</p>
        )}
        {songs && songs.length > 0 && (
          <div>
            <p className='songs'>Songs:</p>
            <ul>
              <div className='songgrid'>
              <div className='songgridindex'>#</div>
              <div className='songgridtitle'>Title</div>
              <div className='songgridartist'>Artist</div>
              <div className='songgridclock'><i className="fa-regular fa-clock"></i></div>
              </div>
              {/* <div> # Title Artist <i className="fa-regular fa-clock"></i> </div> */}

              {songs.map((song, index) => (
                <div className='songgridone'>
                <div className='songgridindexone'>{index+1}</div>
                <div className='songgridimageone'><img id="playlistsongimage" src={song.url}></img>{song.title}</div>
                <div className='songgridtitleone'>{song.title}</div>
                <p>{(Object.values((Object.values(artists)[0])).filter(((artist)=>(artist.id==song.artist_id)))[0].name)}</p>
                {/* {(Object.values((Object.values(artists)[0])).filter(((artist)=>(artist.id==song.artist_id)))[0].name)} */}
                <div className='songgridclockone'>{convertDuration(song.duration)}</div>
                </div>
              ))}
            </ul>
          </div>
        )}


      {/* {ownsPlaylist && (
        <button>
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeletePlaylistModal playlist={playlist} />}
          />
        </button>
      )} */}
      {ownsPlaylist &&(
      <button onClick={handleEditClick}>Edit</button>
      )}
      </div>
      </div>
    </>
  );
};

export default PlaylistDetails;
