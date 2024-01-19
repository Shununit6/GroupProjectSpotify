const GET_ALL_PLAYLISTS = 'playlists/GET_ALL_PLAYLISTS'
const GET_PLAYLIST = 'playlists/GET_PLAYLIST'
const ADD_SONG_TO_PLAYLIST = 'playlists/ADD_SONG_TO_PLAYLIST'
const REMOVE_SONG_FROM_PLAYLIST = 'playlists/REMOVE_SONG_FROM_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'


/**Action Creators: */

const getAllPlaylists = (playlists) => ({
  type: GET_ALL_PLAYLISTS,
  playlists,
})

const getPlaylist = (playlist) => ({
  type: GET_PLAYLIST,
  playlist,
});

const addSongToPlaylist = (message) => ({
  type: ADD_SONG_TO_PLAYLIST,
  message,
});

const removeSongFromPlaylist = (message) => ({
  type: REMOVE_SONG_FROM_PLAYLIST,
  message,
});

const deletePlaylist = (message) => ({
  type: DELETE_PLAYLIST,
  message,
});

/** Thunk Action Creators: */
export const fetchAllPlaylists = () => async (dispatch) => {
  const response = await fetch('/api/playlists');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllPlaylists(data.playlists));
  }
};

export const fetchPlaylistById = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getPlaylist(data));
  }
};

export const addSongToPlaylistThunk = (playlistId, songId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
    method: "POST",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSongToPlaylist(data));
    return data;
  }
  return response;
};

export const removeSongFromPlaylistThunk = (playlistId, songId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeSongFromPlaylist(data));
    return data;
  }
  return response;
};

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deletePlaylist(data));
    return data;
  }
  return response;
};



const playlistsReducer = (state = {playlists:{}, currPlaylist: {}}, action) => {
  switch (action.type) {
    case GET_ALL_PLAYLISTS:
      const playlistsState = {};
      action.playlists.forEach((playlist) => {
        playlistsState[playlist.id] = playlist;
      });
      return {...state, playlists: playlistsState};

    case GET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.playlist,
      };

    case ADD_SONG_TO_PLAYLIST:{
      const playlists = { ...state.playlists }
      playlists[action.payload.id] = action.payload
      return { ...state, playlists };
    }
    case REMOVE_SONG_FROM_PLAYLIST:{
      const playlists = { ...state.playlists }
      playlists[action.payload.id] = action.payload
      return { ...state, playlists };
    }

    case DELETE_PLAYLIST:
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;

    default:
      return state;
  }
};

export default playlistsReducer;
