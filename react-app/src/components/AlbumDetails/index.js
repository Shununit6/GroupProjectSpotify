import './AlbumDetails.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
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
    dispatch(fetchAllArtists()).then(()=>{dispatch(getAlbumDetails(albumId))}).then(() => setIsLoading(false));
  }, [dispatch, albumId]);
  if (isLoading || !album || !artists) return (<>Loading...</>);
  const { user_id, title, url, release_date, copyright } = album;

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

  const getArtistName = (album, artists) =>{
    const arr = [];
    album.songs.forEach((song) => {
      arr.push(Object.values((Object.values(artists)[0])).filter(((artist)=>(artist.id==song.artist_id)))[0].name);
    })
    return arr;
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
          {album.songs && album.songs.length > 0 && (
            <div>
              <p className='songs'>Songs:</p>
              <ul>
                <div key={album.songs.id+"grid"} className='songgrid'>
                <div key={album.songs.id+"index"} className='songgridindex'>#{" "}Title</div>
                <div key={album.songs.id+"artist"} className='songgridartist'>Artist</div>
                <div key={album.songs.id+"update"} className='songgridupdate'>Song Modified</div>
                <div key={album.songs.id+"clock"} className='songgridclock'><i id="faregularfaclock" className="fa-regular fa-clock"></i></div>
                </div>

                {album.songs.map((song, index) => (
                  <div key={index+"gridone"} className='songgridone'>
                  <div key={index+"indexone"} className='songgridindexone'>{index+1}{". "}<Link id="songlinkwithtext" to={`/songs/${song.id}`}  key={`${song.id}`}><img id="playlistsongimage" src={song.url}></img>{song.title}</Link></div>
                  <div key={index+"artistone"} className='songgridartistone'>{getArtistName(album, artists)[index]}</div>
                  <div key={index+"updateone"} className='songgridupdateone'>{song.updated_at.slice(7,12)}{song.updated_at.slice(4,7)},{song.updated_at.slice(11,16)}</div>
                  <div key={index+"clockone"} className='songgridclockone'>{convertDuration(song.duration)}</div>
                  </div>
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
