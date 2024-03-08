import './PlaylistForm.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewPlaylist, updatePlaylist } from '../../store/playlists';
import MenuLibrary from '../MenuLibrary';

const PlaylistForm = ({ playlist, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(playlist?.title || '');
  const [url, setUrl] = useState(playlist?.url);
  const [description, setDescription] = useState(playlist?.description);
  const [errors, setErrors] = useState({});
  const formTitle = formType === 'Create Playlist' ? 'Create a New Playlist' : 'Update Your Playlist';

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

    if (!title || title.trim() === '') {
      newErrors.title = 'Title is required';
    }
    if (!isValidUrl(url)) {
      newErrors.url = 'Invalid URL format';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const isFormValid = validateForm();
    playlist = { ...playlist, title, url, description };

    if (isFormValid) {
      try {
        let newPlaylist;

        if (formType === 'Update Playlist') {
          newPlaylist = await dispatch(updatePlaylist(playlist));
        } else if (formType === 'Create Playlist') {
          const res = await dispatch(createNewPlaylist(playlist));

          if (!res.ok) {
            // Handle non-OK response
            console.error("Server response is not OK:", res);
            return;
          }

          // Parse the response
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            newPlaylist = data.playlist;
          } else {
            // Handle non-JSON response
            console.error("Server response is not in JSON format");
            return;
          }
        }

        // Redirect to the "/playlists" page
        history.push('/playlists/');
      } catch (error) {
        // Handle general error
        console.error("Error:", error);
        history.push('/playlists/');

        if (error instanceof TypeError) {
          // Handle specific error when res.json is not a function
          console.error("Error: res.json is not a function");
          // Additional error handling if needed
        }
      }finally {
        history.push(`/playlists`);
      }
    }
  };
  const titleError = errors.title ? 'Title: ' + errors.title : null;
  const urlError = errors.url ? 'URL: ' + errors.url : null;
  return (
    <div className='playlistformwrapper'>
      <div className="playlistformitem-1">
        <MenuLibrary />
      </div>
      <div className="playlistformitem-2">
        <form className='form' onSubmit={handleSubmit}>
          <p className='formHeading'>{formTitle}</p>
          <div className='errors'>
            <ul>{titleError}</ul>
            <ul>{urlError}</ul>
            </div>
          <p className='formSubheading'>Want to share your playlist?</p>
          <p className='nomal'>Some details about your playlist.</p>
          <div className='formNormal'>
            <label>
              Playlist Title<br />
              <input type="text" value={title} placeholder="Playlist Title" onChange={(e) => setTitle(e.target.value)} /><br />
            </label>
            <label>
              Playlist Image URL<br />
              <input type="text" value={url} placeholder="Playlist Image URL" onChange={(e) => setUrl(e.target.value)} /><br />
            </label>
            <label>
              Playlist Description(Optional)<br />
              <input type="text" value={description} placeholder="Playlist Description" onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
          <button className='submitFormButton' type="submit">{formType}</button>
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;
