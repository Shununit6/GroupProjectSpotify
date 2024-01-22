import './SongIndexItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSongModal from '../DeleteSongModal/index';

const SongItem = ({ song }) => {
  console.log("Song in SongIndexItem:", song);
  console.log("Title:", song.title);
  console.log("User ID:", song.user_id);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {id, title, url, user_id} = song;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const checkUserVSOwner = sessionUserId === user_id ? true : false;
  return (
    <div className='songTile'>
      <Link id="songlinkwithtext" to={`/songs/${song.id}`}  key={`${id}`}>
        {/* <hr /> */}
        <div id="songgrid1">
            <div id="songitem1">
                <img id ="songImage" src={url} alt="song"/>
            </div>
            <div id="songitem2">
                {title}
            </div>
        </div>
      </Link>
    </div>
  );
};

export default SongItem;
