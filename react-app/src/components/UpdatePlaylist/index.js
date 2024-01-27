import PlaylistForm from '../PlaylistForm/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistById} from '../../store/playlists';

const UpdatePlaylist = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const playlist = useSelector((state) => state.playlistsReducer?.currentPlaylist);

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId));
  }, [dispatch, playlistId]);

  if (!playlist) return <>loading ////</>;

  return (
    Object.keys(playlist).length > 1 && (
      <>
        <PlaylistForm playlist={playlist} formType="Update Playlist" />
      </>
    )
  );
};


export default UpdatePlaylist;
