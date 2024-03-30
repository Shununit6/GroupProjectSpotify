import './SongIndex.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/songs';
import SongIndexItem from '../SongIndexItem/index';
import MenuLibrary from '../MenuLibrary';

const SongIndex = ({num}) => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songsReducer?.songs);
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
          {num !== 4 && Object.values(songs).map((song, index) => (
              <SongIndexItem song={song} key={index}/>
          ))}
          {num === 4 && Object.values(songs).slice(0,4).map((song, index) => (
              <SongIndexItem song={song} key={index}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongIndex;
