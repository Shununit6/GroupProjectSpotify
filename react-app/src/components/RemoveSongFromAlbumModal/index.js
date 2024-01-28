import './RemoveSongFromAlbumModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyAlbums, deleteAlbumSong } from '../../store/albums';
import { useHistory } from 'react-router-dom';

const RemoveSongFromAlbumModal = ({ song }) => {
  const songId = song.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = useSelector(state => Object.values(state.albumsReducer || {}));
  const { closeModal } = useModal();

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getMyAlbums()).then(() => setIsLoading(false));
  }, [dispatch]);

  const isSongInAlbum = (album) => album.songs.some((s) => s.id === songId);

  const handleDelete = async (albumId, albumTitle) => {
    if (isSongInAlbum(albums.find(album => album.id === albumId))) {
      try {
        await dispatch(deleteAlbumSong(albumId, songId));
        // Manually update the state after removing the song
        await dispatch(getMyAlbums()).then(() => {
          closeModal();
          window.confirm(`Song successfully removed from "${albumTitle}"`);
          history.push(`/albums/${albumId}`)
        });
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    } else {
      window.alert('The selected album does not contain the specified song.');
    }
  };

  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <p className='heading'>Which album would you like to delete this song from?</p>
      <ul>
        {albums.map((album) => (
          isSongInAlbum(album) && (
            <li key={album.id}>
              <button className='deleteSongFromAlbum' onClick={() => handleDelete(album.id, album.title)}>
                {album.title}
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default RemoveSongFromAlbumModal;
