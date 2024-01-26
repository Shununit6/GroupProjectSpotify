import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSong, updateSong } from '../../store/songs';
import MenuLibrary from '../MenuLibrary';

import './SongForm.css';

const SongForm = ({ song, formType }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append("song_file", song_file);
    formData.append("artist_name", artistName);
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("url", url);
    formData.append("duration", duration);
    formData.append("releaseDate", release_date);
    setSongLoading(true);

    try {
      let action;
      if (formType === 'Update Song') {
        action = updateSong;
      } else if (formType === 'Create Song') {
        action = createSong;
      }

      const response = await dispatch(action(formData));

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
        {/* <div className='errors'>
          {renderError('artistName')}
          {renderError('title')}
          {renderError('lyrics')}
          {renderError('url')}
          {renderError('duration')}
          {renderError('releaseDate')}
        </div> */}
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
