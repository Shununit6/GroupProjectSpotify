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
    if (!song_file) {
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
    if (isFormValid) {
    const formData = new FormData();
    formData.append("song_file", song_file);
    formData.append("artist_name", artistName);
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("url", url);
    formData.append("duration", duration);
    formData.append("release_date", release_date);
    console.log("This is formdata after appending everything", formData)
    setSongLoading(true);
      try {
        if (formType === 'Update Song') {
          await dispatch(updateSong(formData));
        } else if (formType === 'Create Song') {
          await dispatch(createSong(formData));
        }
        history.push('/songs');
      } catch (error) {
        console.error("Error:", error);
        if (error instanceof TypeError) {
          console.error("Error: res.json is not a function");
        }
      } finally {
        setSongLoading(false);
        history.push('/songs');
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

  return (
    <div className='songformwrapper'>
      <div className="songform-1">
        <MenuLibrary />
      </div>
      <div className="songform-2">
        <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
          <p className='formHeading'>{formTitle}</p>
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
