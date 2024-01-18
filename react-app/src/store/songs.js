export const LOAD_SONGS = 'songs/LOAD_SONGS';
export const RECEIVE_SONG = 'songs/RECEIVE_SONG';
export const UPDATE_SONG = 'songs/UPDATE_SONG';
export const REMOVE_SONG = 'songs/REMOVE_SONG';

export const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs,
  });
  export const receiveSong = (song) => ({
    type: RECEIVE_SONG,
    song,
  });
  export const editSong = (song) => ({
    type: UPDATE_SONG,
    song,
  });
  export const removeSong = (songId) => ({
    type: REMOVE_SONG,
    songId,
  });

  export const getAllSongs = () => async (dispatch) => {
    const res = await fetch('/api/songs');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSongs(data));
      return data;
    }
    return res;
  };
  export const getMySongs = () => async (dispatch) => {
    const res = await fetch('/api/songs/current');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSongs(data));
      return data;
    }
    return res;
  };
  export const getSongDetails = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveSong(data));
      return data;
    }
    return res;
  };
  export const createSong = (payload) => async (dispatch) => {
    const res = await fetch('/api/songs/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveSong(data));
      return data;
    }
    return res;
  };
  export const updateSong = (payload) => async (dispatch) => {
    const res = await fetch(`/api/songs/${payload.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(editSong(data));
      return data;
    }
    return res;
  };
  export const deleteSong = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(removeSong(songId));
      return data;
    }
    return res;
  };

  const songsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_SONGS:
        const songsState = {...state};
        action.songs.Songs.forEach((song) => {
           if (!songsState[song.id]) {
            songsState[song.id] = song;
          }
        });
        return {...songsState};
      case RECEIVE_SONG:
        return { ...state, [action.song.id]: action.song };
      case UPDATE_SONG:
        return { ...state, [action.song.id]: action.song };
      case REMOVE_SONG:
        const newState = { ...state };
        delete newState[action.songId];
        return newState;
      default:
        return state;
    }
  };

  export default songsReducer;
