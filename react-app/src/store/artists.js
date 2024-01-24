export const GET_ALL_ARTISTS = 'artists/GET_ALL_artistS'
export const GET_ARTIST = 'artists/GET_artist'
export const RECEIVE_ARTIST = "artists/RECEIVE_ARTIST";
export const UPDATE_ARTIST = "artists/UPDATE_ARTIST";



/**Action Creators: */

const getAllArtists = (artists) => ({
  type: GET_ALL_ARTISTS,
  artists,
})

const getArtist = (artist) => ({
  type: GET_ARTIST,
  artist,
});

export const receiveArtist = (artist) => ({
  type: RECEIVE_ARTIST,
  artist,
});

export const editArtist = (artist) => ({
  type: UPDATE_ARTIST,
  artist,
});


/** Thunk Action Creators: */
export const fetchAllArtists = () => async (dispatch) => {
  const response = await fetch('/api/artists');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllArtists(data.artists));
  }
};

export const fetchArtistById = (artistId) => async (dispatch) => {
  const response = await fetch(`/api/artists/${artistId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getArtist(data));
  }
};

export const createArtist = (payload) => async (dispatch) => {
  const res = await fetch("/api/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
  });
  if (res.ok) {
      const data = await res.json();
      dispatch(receiveArtist(data));
      return data;
  }
  return res;
};

export const updateArtist = (artist) => async (dispatch) => {
  const res = await fetch(`/api/artists/${artist.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artist),
  });
  if (res.ok) {
      const data = await res.json();
      dispatch(editArtist(data));
      return data;
  }
  return res;
};

const artistsReducer = (state = {artists:{}, currArtist: {}}, action) => {
  switch (action.type) {
    case GET_ALL_ARTISTS:
      const artistsState = {};
      action.artists.forEach((artist) => {
        artistsState[artist.id] = artist;
      });
      return {...state, artists: artistsState};

    case GET_ARTIST:
      return {
        ...state,
        currentArtist: action.artist,
      };

    case RECEIVE_ARTIST:
        return { ...state, [action.artist.id]: action.artist };

    case UPDATE_ARTIST:
        return { ...state };

    default:
      return state;
  }
};

export default artistsReducer;
