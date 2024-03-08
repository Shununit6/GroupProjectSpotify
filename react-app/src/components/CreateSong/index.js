import SongForm from '../SongForm/index';
import React  from 'react';
const CreateSong = () => {
  const song = {
    artist_name:'',
    title: '',
    lyrics: '',
    url: '',
    duration: '',
    release_date: '',
    song_file:'',
  };
  return (
    <SongForm song={song} formType="Create Song"/>
  );
};

export default CreateSong;
