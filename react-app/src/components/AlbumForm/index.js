import './AlbumForm.css';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbum, updateAlbum } from '../../store/albums';
import MenuLibrary from '../MenuLibrary';

const AlbumForm = ({ album, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  // const albumId = album?.id;
  const albumuserId = album?.user_id;
  let [title, setTitle] = useState(album?.title ||'');
  let [url, setUrl] = useState(album?.url || '');
  let [release_date, setReleaseDate] = useState(album?.release_date|| '');
  let [copyright, setCopyright] = useState(album?.copyright || '');
  let [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formTitle = formType === 'Create Album' ? 'Create a New Album' : 'Update Your Album';

  useEffect(() => {
    const errors = { title: [], url: [], release_date: [],copyright:[] };
    if (!title.length) errors["title"].push("Title is required");
    if (!url.length) errors["url"].push("URL is required");
    if (!release_date.length) errors["release_date"].push("Release date is required");
    if (!copyright.length) errors["copyright"].push("Copyright is required");
    setValidationErrors(errors);
  }, [title, url, release_date, copyright]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    album = { ...album, title, release_date, url, copyright };
    let newAlbum;
    let errorCount = validationErrors.title.length + validationErrors.release_date.length
    + validationErrors.url.length + validationErrors.copyright.length;
    if (errorCount > 0){
      // console.log("has errors");
    }else{
        if (formType === 'Update Album') {
          if(sessionUser && albumuserId !== sessionUser.id){
            history.push(`/`);
            return;
          }
          newAlbum = await dispatch(updateAlbum(album));
        } else if (formType === 'Create Album') {
          newAlbum = await dispatch(createAlbum(album));
        }
        if (newAlbum.id) {
          // console.log("newAlbum.id", newAlbum.id);
          history.push(`/albums/${newAlbum.id}`);
        } else {
            const { validationErrors } = await newAlbum.json();
            setValidationErrors(validationErrors);
        }
      }
    }

    // const titleError = errors.title ? 'Title: ' + errors.title : null;
    // const urlError = errors.url ? 'URL: ' + errors.url : null;
    // const durationError = errors.duration ? 'Duration: ' + errors.duration : null;
    // const releaseDateError = errors.release_date ? 'Release Date: ' + errors.release_date : null;
    // const copyrightError = errors.copyright ? 'Copyright: ' + errors.copyright : null;

    return (
      <div className='albumformwrapper'>
      <div className="albumform-1">
        <MenuLibrary />
      </div>
      <div className="albumform-2">
        <form className='form' onSubmit={handleSubmit}>
          <p className='formHeading'>{formTitle}</p>

          <p className='formSubheading'>Want to share your album?</p>
          <p className='nomal'>Some details about your album.</p>
          <div className='formNormal'>
            <label>
              Album Title<br />
              <input type="text" value={title} placeholder="Album Title" onChange={(e) => setTitle(e.target.value)} /><br />
              {hasSubmitted && validationErrors.title.length > 0
                            && validationErrors.title.map((error, idx) => (
                              <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                            ))}
            </label>
            <label>
              Album Image URL<br />
              <input type="text" value={url} placeholder="Album Image URL" onChange={(e) => setUrl(e.target.value)} /><br />
              {hasSubmitted && validationErrors.url.length > 0
                            && validationErrors.url.map((error, idx) => (
                              <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                            ))}
            </label>
            <label>
              Release Date<br />
              <input type="text" value={release_date} placeholder="Release Date" onChange={(e) => setReleaseDate(e.target.value)} /><br />
              {hasSubmitted && validationErrors.release_date.length > 0
                            && validationErrors.release_date.map((error, idx) => (
                              <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                            ))}
            </label>
            <label>
              Copyright<br />
              <input type="text" value={copyright} placeholder="Copyright" onChange={(e) => setCopyright(e.target.value)} /><br />
              {hasSubmitted && validationErrors.copyright.length > 0
                            && validationErrors.copyright.map((error, idx) => (
                              <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                            ))}
            </label>
          </div>
          <button className='submitFormButton' type="submit">{formType}</button>
        </form>
      </div>
    </div>
  );
};

  export default AlbumForm;
