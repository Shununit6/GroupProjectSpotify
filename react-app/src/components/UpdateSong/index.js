import SongForm from '../SongForm/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';

const UpdateSong = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector(state => state.songsReducer[songId]);
  useEffect(() => {
    dispatch(getSongDetails(songId));
  }, [dispatch, songId]);
  if (!song) return(<></>);
  return (
    Object.keys(song).length > 1 && (
      <>
        <SongForm song={song} formType="Update Song"/>
      </>
    )
  );
};

export default UpdateSong;
