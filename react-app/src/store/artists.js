const GET_ALL_ARTISTS = 'artists/GET_ALL_artistS'
const GET_ARTIST = 'artists/GET_artist'



/**Action Creators: */

const getAllArtists = (artists) => ({
  type: GET_ALL_ARTISTS,
  artists,
})

const getArtist = (artist) => ({
  type: GET_ARTIST,
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

    default:
      return state;
  }
};

export default artistsReducer;
