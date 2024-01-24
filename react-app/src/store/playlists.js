const GET_ALL_PLAYLISTS = 'playlists/GET_ALL_PLAYLISTS'
const GET_PLAYLIST = 'playlists/GET_PLAYLIST'
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
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

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  playlist,
});

const editPlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
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

export const getMyPlaylists = () => async (dispatch) => {
  const res = await fetch('/api/playlists/current');
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllPlaylists(data));
    return data;
  }
  return res;
};

export const createNewPlaylist = (payload) => async (dispatch) => {
  const res = await fetch("/api/playlists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createPlaylist(data.playlist));
    return data;
  }
  return res;
};

export const updatePlaylist = (playlist) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlist.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlist),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editPlaylist(data.playlist));
    return data;
  }
  return res;
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

const playlistsReducer = (state = { playlists: {}, currPlaylist: {} }, action) => {
  switch (action.type) {
    case GET_ALL_PLAYLISTS:
      return { ...state, playlists: action.playlists };

    case GET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.playlist,
      };

    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist.id]: action.playlist },
      };

    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist.id]: action.playlist },
      };

    case ADD_SONG_TO_PLAYLIST: {
      const playlists = { ...state.playlists };
      playlists[action.message.id] = action.message;
      return { ...state, playlists };
    }

    case REMOVE_SONG_FROM_PLAYLIST: {
      const playlists = { ...state.playlists };
      playlists[action.message.id] = action.message;
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
