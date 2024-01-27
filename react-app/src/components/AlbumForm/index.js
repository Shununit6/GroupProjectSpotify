import './AlbumForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAlbum, updateAlbum } from '../../store/albums';
import MenuLibrary from '../MenuLibrary';

const AlbumForm = ({ album, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(album?.title ||'');
  const [url, setUrl] = useState(album?.url || '');
  const [release_date, setReleaseDate] = useState(album?.release_date|| '');
  const [copyright, setCopyright] = useState(album?.copyright || '');
  const [errors, setErrors] = useState({});

  const formTitle = formType === 'Create Album' ? 'Create a New Album' : 'Update Your Album';

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
    if (!release_date || release_date.trim() === '') {
      newErrors.release_date = 'Release Date is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const isFormValid = validateForm();
    album = { ...album, title, release_date, url, copyright };
    if (isFormValid){

      try {
        if (formType === 'Update Album') {
          await dispatch(updateAlbum(album));
        } else if (formType === 'Create Album') {
          await dispatch(createAlbum(album));
        }

        // Redirect to the "/albums" page
        history.push('/albums');
      } catch (error) {
        // Handle error
        console.error("Error:", error);

        if (error instanceof TypeError) {
          // Handle specific error if needed
          console.error("Error: res.json is not a function");
        }
      }
    }
  };

  const titleError = errors.title ? 'Title: ' + errors.title : null;
  const urlError = errors.url ? 'URL: ' + errors.url : null;
  const durationError = errors.duration ? 'Duration: ' + errors.duration : null;
  const releaseDateError = errors.releaseDate ? 'Release Date: ' + errors.releaseDate : null;
  const copyrightError = errors.copyright ? 'Copyright: ' + errors.copyright : null;

  return (
    <div className='albumformwrapper'>
      <div className="albumform-1">
        <MenuLibrary />
      </div>
      <div className='errors'>
        <ul>
          {errors.title && <li>{'Title: ' + errors.title}</li>}
          {errors.url && <li>{'URL: ' + errors.url}</li>}
          {errors.duration && <li>{'Duration: ' + errors.duration}</li>}
          {errors.releaseDate && <li>{'Release Date: ' + errors.releaseDate}</li>}
        </ul>
      </div>
      <div className="albumform-2">
        <form className='form' onSubmit={handleSubmit}>
          <p className='formHeading'>{formTitle}</p>
          <div className='errors'>
            <ul>{titleError}</ul>
            <ul>{urlError}</ul>
            <ul>{durationError}</ul>
            <ul>{releaseDateError}</ul>
          </div>
          <p className='formSubheading'>Want to share your album?</p>
          <p className='nomal'>Some details about your album.</p>
          <div className='formNormal'>
            <label>
              Album Title<br />
              <input type="text" value={title} placeholder="Album Title" onChange={(e) => setTitle(e.target.value)} /><br />
            </label>
            <label>
              Album Image URL<br />
              <input type="text" value={url} placeholder="Album Image URL" onChange={(e) => setUrl(e.target.value)} /><br />
            </label>
            <label>
              Release Date<br />
              <input type="text" value={release_date} placeholder="Release Date" onChange={(e) => setReleaseDate(e.target.value)} /><br />
            </label>
            <label>
              Copyright<br />
              <input type="text" value={copyright} placeholder="Copyright" onChange={(e) => setCopyright(e.target.value)} /><br />
            </label>
          </div>
          <button className='submitFormButton' type="submit">{formType}</button>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;
