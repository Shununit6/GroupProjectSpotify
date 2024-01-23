import './PlaylistIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeletePlaylistModal from '../DeletePlaylistModal/index';

const PlaylistItem = ({ playlist }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {id, title, user_id, url} = playlist;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === user_id ? true : false;
  return (
    // <div className='playlistTile'>
    //   <span className='tooltip'>{title}</span>
    //   <Link to={`/playlists/${playlist.id}`}><p className='title'>{title}</p></Link>
    //   {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeletePlaylistModal playlist={playlist}/>}/>}
    // </div>
    <div className='playlistTile'>
    <Link id="playlistlinkwithtext" to={`/playlists/${playlist.id}`}  key={`${id}`}>
      {/* <hr /> */}
      <div id="playlistgrid1">
          <div id="playlistitem1">
              <img id ="playlistImage" src={url} alt="playlist"/>
          </div>
          <div id="playlistitem2">
              {title}
          </div>
      </div>
    </Link>
  </div>
  );
};

export default PlaylistItem;
