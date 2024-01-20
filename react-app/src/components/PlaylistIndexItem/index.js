import './PlaylistIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeletePlaylistModal from '../DeletePlaylistModal/index';

const PlaylistItem = ({ playlist }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {title, user_id, url} = playlist;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === user_id ? true : false;
  return (
    <div className='playlistTile'>
      <span className='tooltip'>{title}</span>
      <Link to={`/playlists/${playlist.id}`}><p className='title'>{title}</p></Link>
      {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeletePlaylistModal playlist={playlist}/>}/>}
    </div>
  );
};

export default PlaylistItem;
