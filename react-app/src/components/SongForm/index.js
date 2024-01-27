import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSong, updateSong } from '../../store/songs';
import { fetchAllArtists } from '../../store/artists';
import MenuLibrary from '../MenuLibrary';
import './SongForm.css';

const SongForm = ({ song, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [artistName, setArtistName] = useState(song?.artist_name || '');
  const [title, setTitle] = useState(song?.title || '');
  const [lyrics, setLyrics] = useState(song?.lyrics || '');
  const [url, setUrl] = useState(song?.url || '');
  const [duration, setDuration] = useState(song?.duration || '');
  const [release_date, setReleaseDate] = useState(song?.release_date || '');
  const [song_file, setSongFile] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formTitle = formType === 'Create Song' ? 'Create a New Song' : 'Update Your Song';
  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!artistName || artistName.trim() === '') {
      newErrors.artistName = 'Artist Name is required';
    }
    if (!title || title.trim() === '') {
      newErrors.title = 'Title is required';
    }
    if (!lyrics || lyrics.trim() === '') {
      newErrors.lyrics = 'Lyrics is required';
    }
    if (!isValidUrl(url)) {
      newErrors.url = 'Invalid URL format';
    }
    if (!duration || duration.trim() === '') {
      newErrors.duration = 'Duration is required';
    }
    if (!release_date || release_date.trim() === '') {
      newErrors.release_date = 'Release Date is required';
    }
    if (!song_file || song_file.trim() === '') {
      newErrors.song_file = 'Song File is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Song prop in SongForm:", song);
    setErrors({});
    const isFormValid = validateForm();
    const formData = new FormData();
    formData.append("song_file", song_file);
    formData.append("artist_name", artistName);
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("url", url);
    formData.append("duration", duration);
    formData.append("release_date", release_date);
    setSongLoading(true);
    if (isFormValid){
      try {
        if (formType === 'Update Song') {
          await dispatch(updateSong(song));
        } else if (formType === 'Create Song') {
          await dispatch(createSong(song));
        }
        history.push('/songs');
      } catch (error) {
        console.error("Error:", error);
        if (error instanceof TypeError) {
          console.error("Error: res.json is not a function");
        }
      }
    }
  };

  const artistNameError = errors.artistName ? 'Artist Name: ' + errors.artistName : null;
  const titleError = errors.title ? 'Title: ' + errors.title : null;
  const lyricsError = errors.lyrics ? 'Lyrics: ' + errors.lyrics : null;
  const urlError = errors.url ? 'URL: ' + errors.url : null;
  const durationError = errors.duration ? 'Duration: ' + errors.duration : null;
  const releaseDateError = errors.release_date ? 'Release Date: ' + errors.release_date : null;
  const songFileError = errors.song_file ? 'Song File: ' + errors.song_file : null;

    try {
      let action;
      if (formType === 'Update Song') {
        action = updateSong;
      } else if (formType === 'Create Song') {
        action = createSong;
      }

      console.log("This is form data:", formData)
      console.log("This is the action:", action)
      const response = await dispatch(action(formData, song.id));

      // Check if response.song is defined
      if (response && response.song) {
        console.log("Dispatching RECEIVE_SONG action with song:", response.song);
        dispatch({ type: 'songs/RECEIVE_SONG', song: response.song });
        // Log the song ID to the console
        console.log("Redirecting to song ID:", response.song.id);

        // Redirect to the new or updated song page
        history.push(`/songs/${response.song.id}`);
      }

    } catch (error) {
      if (error && error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setSongLoading(false);
      history.push(`/songs`);
    }
  };


  const renderError = (error) => error ? <ul>{`${error}: ${errors[error]}`}</ul> : null;

  return (
    <div className='songformwrapper'>
      <div className="songform-1">
        <MenuLibrary />
      </div>
      <div className="songform-2">
      <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
        <p className='formHeading'>{formTitle}</p>
        {/* <div className="songform-1">
          <MenuLibrary/>
        </div> */}
        <div className='errors'>
          <ul>{artistNameError}</ul>
          <ul>{titleError}</ul>
          <ul>{lyricsError}</ul>
          <ul>{urlError}</ul>
          <ul>{durationError}</ul>
          <ul>{releaseDateError}</ul>
          <ul>{songFileError}</ul>
        </div>
        <p className='formSubheading'>Want to share your song?</p>
        <p className='nomal'>Some details about your song.</p>
        <div className='formNormal'>
          <label>
            Artist Name<br />
            <input type="text" value={artistName} placeholder="Artist Name" onChange={(e) => setArtistName(e.target.value)} /><br />
          </label>
          <label>
            Song Title<br />
            <input type="text" value={title} placeholder="Song Title" onChange={(e) => setTitle(e.target.value)} /><br />
          </label>
          <label>
            Lyrics<br />
            <input type="text" value={lyrics} placeholder="Lyrics" onChange={(e) => setLyrics(e.target.value)} /><br />
          </label>
          <label>
            Song Image URL<br />
            <input type="text" value={url} placeholder="Song Image URL" onChange={(e) => setUrl(e.target.value)} /><br />
          </label>
          <label>
            Song Duration<br />
            <input type="text" value={duration} placeholder="Song Duration" onChange={(e) => setDuration(e.target.value)} />
          </label>
          <label>
            Release Date<br />
            <input type="text" value={release_date} placeholder="Release Date" onChange={(e) => setReleaseDate(e.target.value)} /><br />
          </label>
          <label>
            Upload Song File<br />
            <input type="file" accept="audio/*" placeholder="Upload Song File" onChange={(e) => setSongFile(e.target.files[0])} /><br />
          </label>
        </div>
        <button className='submitFormButton' type="submit">{formType}</button>
        {songLoading && <p>Loading...</p>}
      </form>
      </div>
    </div>
  );
};

export default SongForm;
