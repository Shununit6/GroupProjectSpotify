import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums } from '../../store/albums';
import AlbumIndexItem from '../AlbumIndexItem';
import "./albums.css";
import MenuLibrary from '../MenuLibrary';

function Albums({num}) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const albums = useSelector((state) => state.albumsReducer);
    // console.log("this is albums:", albums)
    useEffect(()=>{
      dispatch(getAllAlbums()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }

  if(isLoaded){
  return (
    <div className='albumwrapper'>
      {num !== 4 && <div className='albumitem-1'>
         <MenuLibrary />
      </div>}
      <div className='albumitem-2'>
        { num !== 4 && <h2>{" "} All Albums:</h2>}
        <ul className="viewalbums">
              { num !== 4 && Object.values(albums).map((album, index) => (
                    <AlbumIndexItem album={album} key={index}/>
              ))}
              { num === 4 && Object.values(albums).slice(0,4).map((album, index) => (
                <AlbumIndexItem album={album} key={index}/>
              ))}
        </ul>
      </div>
    </div>
  );}
}

export default Albums;
