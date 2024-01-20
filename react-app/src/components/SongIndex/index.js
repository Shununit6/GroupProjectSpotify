import './SongIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';

const SongIndex = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songsReducer.songs);
  console.log("This is songs:", songs);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllSongs()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);
  return (
    <div>
      <ul className='landingSongIndex'>
        {songs.map((song) => (
          <li className='landingEachSong' key={String(song.id)}>
            <SongIndexItem song={song} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongIndex;
