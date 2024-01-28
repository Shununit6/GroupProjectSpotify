import './AddSongToAlbumModal.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMyAlbums, createAlbumSong } from '../../store/albums';

const AddSongToAlbumModal = ({ song }) => {
  const songId = song.id;
  const dispatch = useDispatch();
  // const albums = useSelector(state => state.albumsReducer.albums);
  const albums = useSelector(state => state.albumsReducer);

  // console.log('albums', albums);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getMyAlbums()).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleAddSong = async (albumId) => {
    dispatch(createAlbumSong(albumId, songId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <p className='heading'>Which album would you like to add this song to?</p>
      <ul>
        {albums && Object.values(albums).map((album) => (
          <li key={album.id}>
            <button className='addSongToAlbum' onClick={() => handleAddSong(album.id)}>{album.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddSongToAlbumModal;
