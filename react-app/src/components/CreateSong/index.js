import SongForm from '../SongForm/index';

const CreateSong = () => {
  const song = {
    // artist_id: '',
    title: '',
    lyrics: '',
    url: '',
    duration: '',
    release_date: ''
  };
  return (
    <SongForm song={song} formType="Create Song"/>
  );
};

export default CreateSong;
