import './SongIndexItem.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SongIndexItem = ({ song }) => {
  console.log("Song in SongIndexItem:", song);
  // console.log("Title:", song.title);
  // console.log("User ID:", song.user_id);
  const sessionUser = useSelector(state => state.session.user);
  const {id, title, url} = song;
  const sessionUserId = sessionUser ? sessionUser.id : null;
  // const checkUserVSOwner = sessionUserId === user_id ? true : false;
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

export default SongIndexItem;
