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
      {/* <Link to={`/songs/${song.id}`}><p className='title'>{title}</p></Link> */}
      {/* <span className='tooltip'>{title}</span>
      <img id="images" src={url} alt="song"/>
      <Link to={`/songs/${song.id}`}><p className='title'>{title}</p></Link>
      {checkUserVSOwner && <Link to={`/songs/${song.id}/edit`}><button className='updateSongButton'>Update</button></Link>}
      {checkUserVSOwner && <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteSongModal song={song}/>}/>} */}
      <Link id="songlinkwithtext" to={`/songs/${song.id}`}  key={`${id}`}>
        {/* <hr /> */}
        <div id="songgrid1">
            <div id="songitem1">
                <img id ="songImage" src={url} alt="song"/>
            </div>
            <div id="songitem2">
                <h1>{title}</h1>
            </div>
        </div>
        </Link>
    </div>
  );
};

export default SongItem;
