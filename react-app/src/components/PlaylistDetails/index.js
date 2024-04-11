import './PlaylistDetails.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
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
    dispatch(fetchAllArtists()).then(()=>{dispatch(fetchPlaylistById(playlistId))}).then(() => setIsLoading(false));
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

  if (isLoading || !playlist || !artists) return <>Loading...</>;

  const { user_id, title, url, description } = playlist;

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

  const getArtistName = (playlist, artists) =>{
    const arr = []
    playlist.songs.forEach((song) => {
      arr.push(Object.values((Object.values(artists)[0])).filter(((artist)=>(artist.id==song.artist_id)))[0].name);
    })
    return arr;
  };

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

        {playlist.songs && playlist.songs.length > 0 && (
          <div>
            <p className='songs'>Songs:</p>
            <ul>
              <div key={playlist.songs.id+"o"} className='songgrid'>
              <div key={playlist.songs.id+"t"} className='songgridindex'>#{" "}Title</div>
              <div key={playlist.songs.id+"th"} className='songgridartist'>Artist</div>
              <div key={playlist.songs.id+"f"} className='songgridupdate'>Song Modified</div>
              <div key={playlist.songs.id+"fi"} className='songgridclock'><i id="faregularfaclock" className="fa-regular fa-clock"></i></div>
              </div>

              {playlist.songs.map((song, index) => (
                <div key={index+"one"} className='songgridone'>
                <div key={index+"two"} className='songgridindexone'>{index+1}{". "}<Link id="songlinkwithtext" to={`/songs/${song.id}`}  key={`${song.id}`}><img id="playlistsongimage" src={song.url}></img>{song.title}</Link></div>
                <div key={index+"three"} className='songgridartistone'>{getArtistName(playlist, artists)[index]}</div>
                <div key={index+"four"} className='songgridupdateone'>{song.updated_at.slice(7,12)}{song.updated_at.slice(4,7)},{song.updated_at.slice(11,16)}</div>
                <div key={index+"five"} className='songgridclockone'>{convertDuration(song.duration)}</div>
                </div>
              ))}
            </ul>
          </div>
        )}

      {ownsPlaylist && (
        <button className="button">
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeletePlaylistModal playlist={playlist} />}
          />
        </button>
      )}
      {ownsPlaylist &&(
      <button className="button" onClick={handleEditClick}>Edit</button>
      )}
      </div>
      </div>
    </>
  );
};

export default PlaylistDetails;
