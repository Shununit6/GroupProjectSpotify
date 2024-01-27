import SongForm from '../SongForm/index';

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