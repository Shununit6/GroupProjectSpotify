import './SongForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSong, updateSong } from '../../store/songs';

const SongForm = ({ song, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [artistName, setArtistName] = useState(song?.artist_name);
  const [title, setTitle] = useState(song?.title);
  const [lyrics, setLyrics] = useState(song?.lyrics);
  const [url, setUrl] = useState(song?.url);
  const [duration, setDuration] = useState(song?.duration);
  const [releaseDate, setReleaseDate] = useState(song?.release_date);
  const [errors, setErrors] = useState({});
  const formTitle = formType === 'Create Song' ? 'Create a New Song' : 'Update Your Song';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    song = {...song, artistName, title, lyrics, url, duration, releaseDate};
    let newSong;
    if (formType === 'Update Song') {
      dispatch(updateSong(song))
      .then((newSong) => history.push(`/songs/${newSong.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    } else if (formType === 'Create Song') {
      dispatch(createSong(song))
      .then((newSong) => history.push(`/songs/${newSong.id}`))
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
      <p className='formSubheading'>Want to share your song?</p>
      <p className='nomal'>Some details about your song.</p>
      <div className='formNormal'>
      <label>
        Artist Name<br/>
        <input type="text" value={artistName} placeholder="Artist Name" onChange={(e) => setArtistName(e.target.value)}/><br/>
      </label>
      <label>
        Song Title<br/>
        <input type="text" value={title} placeholder="Song Title" onChange={(e) => setTitle(e.target.value)}/><br/>
      </label>
      <label>
        Lyrics<br/>
        <input type="text" value={lyrics} placeholder="Lyrics" onChange={(e) => setLyrics(e.target.value)}/><br/>
      </label>
      <label>
        Song Image URL<br/>
        <input type="text" value={url} placeholder="Song Image URL" onChange={(e) => setUrl(e.target.value)}/><br/>
      </label>
      <label>
        Song Duration<br/>
        <input type="text" value={duration} placeholder="Song Duration" onChange={(e) => setDuration(e.target.value)}/>
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

export default SongForm;
