import SongForm from '../SongForm/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails } from '../../store/songs';
import { fetchAllArtists } from '../../store/artists';

const UpdateSong = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector(state => state.songsReducer[songId]);
  const allArtists = useSelector(state => state.artistsReducer);
  useEffect(() => {
    dispatch(getSongDetails(songId)).then(()=>{dispatch(fetchAllArtists())});
  }, [dispatch, songId]);
  let curr_artist;
  if(song){
    // curr_artist = Object.values(allArtists).filter((artist)=>(artist.id = song.artist_id).name;
    curr_artist = (Object.values(Object.values(allArtists)[0]));
    // .filter((artist)=>(artist.id = song.artist_id));
    console.log(curr_artist)
  }
  if (!song) return(<></>);
  return (
    Object.keys(song).length > 1 && (
      <>
        <SongForm song={song} formType="Update Song"/>
      </>
    )
  );
};

export default UpdateSong;
