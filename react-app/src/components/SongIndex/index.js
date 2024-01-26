import './SongIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';
import MenuLibrary from '../MenuLibrary';

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
    <div className='songIndexwrapper'>
      {num !== 4 && <div className='songIndexitem-1'>
         <MenuLibrary />
      </div>}
      <div className='songIndexitem-2'>
        { num !== 4 && <h2>{" "} All Songs:</h2>}
        <ul className='landingSongIndex'>
          {num !== 4 &&songs.map((song) => (
              <SongIndexItem song={song} />
          ))}
          {num === 4 &&songs.slice(0,4).map((song) => (
              <SongIndexItem song={song} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongIndex;
