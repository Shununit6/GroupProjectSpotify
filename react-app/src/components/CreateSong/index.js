import SongForm from '../SongForm/index';

const CreateSong = () => {
  const song = {
    user_id:'',
    artist_id: '',
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
