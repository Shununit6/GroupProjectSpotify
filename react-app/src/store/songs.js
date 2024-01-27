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
  console.log("this is res:", res)
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
  console.log("were here 1!!!!")
  const res = await fetch(`/api/songs/${songId}`);
  console.log("were here 2!!!!")
  console.log("This is res:", res)
  console.log("This is res.body:", res.body)
  if (res.ok) {
    console.log("were here 3!!!!")
    const data = await res.json();
    console.log("were here 4!!!!")
    dispatch(receiveSong(data));
    console.log("were here 5!!!!")
    return data;
  }
  return res;
};

export const createSong = (post) => async (dispatch) => {
  try {
    const res = await fetch('/api/songs/new', {
      method: 'POST',
      body: post,
    });

    // Log the entire response
    console.log("Full response from server:", res);

    if (res.ok) {
      const data = await res.json();
      console.log("Data received from server:", data);

      // Assuming the server sends the created song directly in the response
      dispatch(receiveSong(data));

      return data;
    }

    console.log("There was an error making your post song!");
    return null; // Return null or handle the error accordingly
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or handle the error accordingly
  }
};


export const updateSong = (formData, id) => async (dispatch) => {
  const res = await fetch(`/api/songs/${id}/edit`, {
    method: 'PUT',
    headers: {
      
    },
    // body: JSON.stringify(payload)
    body: formData
  });
  if (res.ok) {
    const { data } = await res.json();
    dispatch(editSong(data));
    return data;
  }
  console.log("There was an error making your put song!")
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
      return { ...state, ...action.songs }
    // const songsState = { ...state };
    // action.songs.forEach((song) => {
    //   if (!songsState[song.id]) { songsState[song.id] = song; }
    // });
    // return songsState;
    // return state; // Handle the case when action.songs or action.songs.Songs is undefined
    case RECEIVE_SONG:
      console.log("Received song action:", action);

      if (!action.song) {
        console.error("Error: action.song is undefined");
        return state;
      }

      // Check if action.song has the 'id' property
      if (!action.song.id) {
        console.error("Error: action.song.id is undefined");
        return state;
      }

      console.log("Updating state with received song:", action.song);
      return { ...state, [action.song.id]: action.song };
    case UPDATE_SONG:
      return { ...state, [action.song.id]: action.song };
    case REMOVE_SONG:
      const newState = { ...state };
      delete newState[action.songId];
      return newState;
    default:
      console.log("State not modified. Action type:", action.type);
      return state;
  }
};

export default songsReducer;
