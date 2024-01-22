import './PlaylistForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPlaylist, updatePlaylist } from '../../store/playlists';

const PlaylistForm = ({ playlist, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [artistName, setArtistName] = useState(playlist?.artist_name);
  const [title, setTitle] = useState(playlist?.title);
  const [lyrics, setLyrics] = useState(playlist?.lyrics);
  const [url, setUrl] = useState(playlist?.url);
  const [duration, setDuration] = useState(playlist?.duration);
  const [releaseDate, setReleaseDate] = useState(playlist?.release_date);
  const [errors, setErrors] = useState({});
  const formTitle = formType === 'Create Playlist' ? 'Create a New Playlist' : 'Update Your Playlist';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    playlist = {...playlist, artistName, title, lyrics, url, duration, releaseDate};
    let newPlaylist;
    if (formType === 'Update Playlist') {
      dispatch(updatePlaylist(playlist))
      .then((newPlaylist) => history.push(`/playlists/${newPlaylist.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    } else if (formType === 'Create Playlist') {
      dispatch(createPlaylist(playlist))
      .then((newPlaylist) => history.push(`/playlists/${newPlaylist.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
  };
  const artistNameError = errors.artistName ? 'Artist Name: ' + errors.artistName : null;
  const titleError = errors.title ? 'Title: ' + errors.title : null;
  const lyricsError = errors.lyrics ? 'Lyrics: ' + errors.lyrics : null;
  const urlError = errors.url ? 'URL: ' + errors.url : null;
  const durationError = errors.duration ? 'Duration: ' + errors.duration : null;
  const releaseDateError = errors.releaseDate ? 'Release Date: ' + errors.releaseDate : null;
  return (
    <div className='body'>
    <form className='form' onSubmit={handleSubmit}>
      <p className='formHeading'>{formTitle}</p>
      <div className='errors'>
        <ul >{artistNameError}</ul>
        <ul>{titleError}</ul>
        <ul>{lyricsError}</ul>
        <ul>{urlError}</ul>
        <ul>{durationError}</ul>
        <ul>{releaseDateError}</ul>
      </div>
      <p className='formSubheading'>Want to share your playlist?</p>
      <p className='nomal'>Some details about your playlist.</p>
      <div className='formNormal'>
      <label>
        Artist Name<br/>
        <input type="text" value={artistName} placeholder="Artist Name" onChange={(e) => setArtistName(e.target.value)}/><br/>
      </label>
      <label>
        Playlist Title<br/>
        <input type="text" value={title} placeholder="Playlist Title" onChange={(e) => setTitle(e.target.value)}/><br/>
      </label>
      <label>
        Lyrics<br/>
        <input type="text" value={lyrics} placeholder="Lyrics" onChange={(e) => setLyrics(e.target.value)}/><br/>
      </label>
      <label>
        Playlist Image URL<br/>
        <input type="text" value={url} placeholder="Playlist Image URL" onChange={(e) => setUrl(e.target.value)}/><br/>
      </label>
      <label>
        Playlist Duration<br/>
        <input type="text" value={duration} placeholder="Playlist Duration" onChange={(e) => setDuration(e.target.value)}/>
      </label>
      <label>
        Release Date<br/>
        <input type="text" value={releaseDate} placeholder="Release Date" onChange={(e) => setReleaseDate(e.target.value)}/><br/>
      </label>
      </div>
      <button className='submitFormButton' type="submit">{formType}</button>
    </form>
    </div>
  );
};

export default PlaylistForm;
