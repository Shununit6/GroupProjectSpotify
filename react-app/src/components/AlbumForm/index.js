import './AlbumForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAlbum, updateAlbum } from '../../store/albums';

const AlbumForm = ({ album, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(album?.title);
  const [url, setUrl] = useState(album?.url);
  const [releaseDate, setReleaseDate] = useState(album?.release_date);
  const [copyright, setCopyright] = useState(album?.copyright || '');
  const [errors, setErrors] = useState({});

  const formTitle = formType === 'Create Album' ? 'Create a New Album' : 'Update Your Album';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    album = { ...album, title, releaseDate, url, copyright };

    if (formType === 'Update Album') {
      dispatch(updateAlbum(album))
        .then((newAlbum) => history.push(`/albums/${newAlbum.id}`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else if (formType === 'Create Album') {
      dispatch(createAlbum(album))
        .then((newAlbum) => history.push(`/albums/${newAlbum.id}`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  const titleError = errors.title ? 'Title: ' + errors.title : null;
  const urlError = errors.url ? 'URL: ' + errors.url : null;
  const durationError = errors.duration ? 'Duration: ' + errors.duration : null;
  const releaseDateError = errors.releaseDate ? 'Release Date: ' + errors.releaseDate : null;
  const copyrightError = errors.copyright ? 'Copyright: ' + errors.copyright : null;

  return (
    <div className='body'>
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
            <input type="text" value={releaseDate} placeholder="Release Date" onChange={(e) => setReleaseDate(e.target.value)} /><br />
          </label>
          <label>
            Copyright<br />
            <input type="text" value={copyright} placeholder="Copyright" onChange={(e) => setCopyright(e.target.value)} /><br /> {/* Add if needed */}
          </label>
        </div>
        <button className='submitFormButton' type="submit">{formType}</button>
      </form>
    </div>
  );
};

export default AlbumForm;
