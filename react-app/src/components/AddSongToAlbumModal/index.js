import './AddSongToAlbumModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyAlbums, createAlbumSong } from '../../store/albums';
import { useHistory } from 'react-router-dom';

const AddSongToAlbumModal = ({ song }) => {
  const songId = song.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = useSelector(state => Object.values(state.albumsReducer|| {}));
  const sessionUser = useSelector(state => state.session.user);

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getMyAlbums()).then(() => setIsLoading(false));
  }, [dispatch]);

  const isSongInAlbum = (album) => album.songs.some((s) => s.id === songId);

  const albumsByUser = albums ? albums.filter(album => album.user_id === sessionUser?.id) : [];

  const handleAddSong = async (albumId, albumTitle) => {
    try {
      await dispatch(createAlbumSong(albumId, songId));
      // Manually update the state after adding the song
      await dispatch(getMyAlbums()).then(() => {
        closeModal();
        window.confirm(`Song successfully added to "${albumTitle}"`);
        history.push(`/albums/${albumId}`)
      });
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    };
  };

  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <p className='heading'>Which album would you like to add this song to?</p>
      <ul>
        {albumsByUser.map((album) => (
          !isSongInAlbum(album) && (
            <li key={album.id}>
              <button className='addSongToAlbum' onClick={() => handleAddSong(album.id, album.title)}>
                {album.title}
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default AddSongToAlbumModal;
