import './SongIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';

const SongIndex = ({num}) => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songsReducer.songs);
  // console.log("This is songs:", songs);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllSongs()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ul className='landingSongIndex'>
        {num !== 5 &&songs.map((song) => (
            <SongIndexItem className='songSongIndex' song={song} />
        ))}
        {num === 5 &&songs.slice(0,5).map((song) => (
            <SongIndexItem className='songSongIndex' song={song} />
        ))}
      </ul>
    </div>
  );
};

export default SongIndex;
