import PlaylistForm from '../PlaylistForm/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylistDetails } from '../../store/playlists';

const UpdatePlaylist = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const playlist = useSelector(state => state.playlistsReducer[playlistId]);
  useEffect(() => {
    dispatch(getPlaylistDetails(playlistId));
  }, [dispatch, playlistId]);
  if (!playlist) return(<></>);
  return (
    Object.keys(playlist).length > 1 && (
      <>
        <PlaylistForm playlist={playlist} formType="Update Playlist"/>
      </>
    )
  );
};

export default UpdatePlaylist;
