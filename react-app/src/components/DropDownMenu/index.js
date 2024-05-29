import React, { useState } from 'react';
import AddSongToAlbumModal from '../AddSongToAlbumModal'
import AddSongToPlaylistModal from '../AddSongToPlaylistModal';
import RemoveSongFromAlbumModal from '../RemoveSongFromAlbumModal';
import RemoveSongFromPlaylistModal from '../RemoveSongFromPlaylistModal';
import DeleteSongModal from '../DeleteSongModal';

const DropDownMenu = ({ yourSongObject, checkUserVSOwner, handleEditClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleAddComponent = (modalComponent) => {
    setSelectedModal(modalComponent);
  };


  const closeModal = () => {
    setSelectedModal(null);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Add Component
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={() => handleAddComponent(<AddSongToAlbumModal song={yourSongObject} />)}>Add Song to Album</button>
          <button onClick={() => handleAddComponent(<AddSongToPlaylistModal song={yourSongObject} />)}>Add Song to Playlist</button>
          <button onClick={() => handleAddComponent(<RemoveSongFromAlbumModal song={yourSongObject} />)}>Remove Song from Album</button>
          <button onClick={() => handleAddComponent(<RemoveSongFromPlaylistModal song={yourSongObject} />)}>Remove Song from Playlist</button>
          <button onClick={() => handleAddComponent(<DeleteSongModal song={yourSongObject} />)}>Delete Song</button>
          {checkUserVSOwner && (
            <button onClick={handleEditClick}>Edit Song</button>
          )}
        </div>
      )}
      {selectedModal && selectedModal}
    </div>
  );
};

export default DropDownMenu;
