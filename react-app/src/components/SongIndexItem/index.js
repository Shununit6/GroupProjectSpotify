import './SongIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSongModal from '../DeleteSongModal/index';

const SongItem = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {title, user_id} = song;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === user_id ? true : false;
  return (
    <div className='songTile'>
      <span className='tooltip'>{title}</span>
      <Link to={`/songs/${song.id}`}><p className='title'>{title}</p></Link>
      {checkUserVSOwner && <Link to={`/songs/${song.id}/edit`}><button className='updateSongButton'>Update</button></Link>}
      {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSongModal song={song}/>}/>}
    </div>
  );
};

export default SongItem;
