import PlaylistForm from '../PlaylistForm/index';

const CreatePlaylist = () => {
  const playlist = {
    title: '',
    url: '',
    description: '',
  };
  return (
    <PlaylistForm playlist={playlist} formType="Create Playlist"/>
  );
};

export default CreatePlaylist;
