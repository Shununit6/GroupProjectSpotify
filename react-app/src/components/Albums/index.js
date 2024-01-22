import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums } from '../../store/albums';
import AlbumIndexItem from '../AlbumIndexItem';
import "./albums.css";

function Albums() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const albums = useSelector((state) => state.albumsReducer);
    console.log("this is albums:", albums)
    useEffect(()=>{
      dispatch(getAllAlbums()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }

  if(isLoaded){
  return (
    <div class="albumslistgrid">
      <ul class="viewalbums">
            {Object.values(albums).map((album, index) => (
                  <AlbumIndexItem class="albumAlbumIndex" album={album} key={index}/>
            ))}
      </ul>
    </div>
  );}
}

export default Albums;
