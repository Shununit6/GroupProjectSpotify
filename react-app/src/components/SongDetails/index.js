import './SongDetails.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';
import DropDownMenu from '../DropDownMenu'; // Import the DropdownMenu component
import LikeSong from '../LikeSong';
import MenuLibrary from '../MenuLibrary';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { fetchAllArtists } from '../../store/artists';

const SongDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songsReducer[songId]);
  const like = useSelector(state => state.likesReducer.likes);
  const [isLoading, setIsLoading] = useState(true);
  const allArtists = useSelector(state => state.artistsReducer);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getSongDetails(songId)).then(() => dispatch(fetchAllArtists())).then(() => setIsLoading(false));
  }, [dispatch, songId]);

  if (isLoading || !song) return (<>Loading...</>);

  const { user_id, artist_id, title, lyrics, url, duration, release_date } = song;
  const song_curr_artist = (Object.values(Object.values(allArtists)[0])).filter((curr) => (curr.id == artist_id))[0].name;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === user_id;

  const handleEditClick = () => {
    history.push(`/songs/${songId}/edit`);
  };

  const convertDuration = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    const newStr = `${min}:${sec}`;
    return newStr;
  };

  const formattedDuration = convertDuration(duration);

  return (
    <>
      <div className='songDetailwrapper'>
        <div className='songDetailitem-1'>
          <MenuLibrary />
        </div>
        <div className='songDetailitem-2'>
          <img id="songdetialimage" src={url} alt="songdetailimage" />
          <p className='title'> Title: {title}</p>
          <p >Artist: {song_curr_artist}</p>
          <p className='lyrics'>Lyrics: {lyrics}</p>
          <p className='duration'>Duration: {formattedDuration}</p>
          <p className='release_date'>Release Date: {release_date}</p>
          <div>
            {sessionUser && <LikeSong userId={user_id} songId={songId} />}
            {checkUserVSOwner && <DropDownMenu  yourSongObject={song} checkUserVSOwner={checkUserVSOwner} handleEditClick={handleEditClick} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SongDetails;
