import AlbumForm from '../AlbumForm';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumDetails } from '../../store/albums';

const UpdateAlbum = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const album = useSelector(state => state.albumsReducer[albumId]);
  useEffect(() => {
    dispatch(getAlbumDetails(albumId));
  }, [dispatch, albumId]);
  if (!album) return(<></>);
  return (
    Object.keys(album).length > 1 && (
      <>
        <AlbumForm album={album} formType="Update Album"/>
      </>
    )
  );
};

export default UpdateAlbum;
