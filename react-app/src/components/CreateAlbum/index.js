import AlbumForm from '../AlbumForm/index';

const CreateAlbum = () => {
  const album = {
    title: '',
    url: '',
    release_date: '',
    copyright: '',
  };
  return (
    <AlbumForm album={album} formType="Create Album"/>
  );
};

export default CreateAlbum;
