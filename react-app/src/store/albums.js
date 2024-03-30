// /** Action Type Constants: */
export const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
export const LOAD_ALBUM_DETAILS = "albums/LOAD_ALBUM_DETAILS";
export const RECEIVE_ALBUM = "albums/RECEIVE_ALBUM";
export const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
export const REMOVE_ALBUM = "albums/REMOVE_ALBUM";
export const RECEIVE_ALBUM_SONG = "albums/RECEIVE_ALBUM_SONG";
export const REMOVE_ALBUM_SONG = "albums/REMOVE_ALBUM_SONG";

// /**  Action Creators: */
export const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    albums,
});

export const loadAlbumDetails = (album) => ({
    type: LOAD_ALBUM_DETAILS,
    album,
});

export const receiveAlbum = (album) => ({
    type: RECEIVE_ALBUM,
    album,
});

export const editAlbum = (album) => ({
    type: UPDATE_ALBUM,
    album,
});

export const removeAlbum = (album) => ({
    type: REMOVE_ALBUM,
    album,
});

export const receiveAlbumSong = (albumSong) => ({
    type: RECEIVE_ALBUM_SONG,
    albumSong,
});

export const removeAlbumSong = (albumId, songId) => ({
    type: REMOVE_ALBUM_SONG,
    albumId,
    songId,
});

// /** Thunk Action Creators: */
export const getAllAlbums = () => async (dispatch) => {
    const res = await fetch(`/api/albums`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbums(data));
        return data;
    }
    return res;
};

export const getAlbumDetails = (albumId) => async dispatch => {
    const res = await fetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbumDetails(data));
        return data;
    }
    return res;
};

export const getMyAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbums(data));
        return data;
    }
    return res;
};

export const createAlbum = (payload) => async (dispatch) => {
    const res = await fetch("/api/albums/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveAlbum(data));
        return data;
    }
    return res;
};

export const updateAlbum = (album) => async (dispatch) => {
    const res = await fetch(`/api/albums/${album.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editAlbum(data));
        return data;
    }
    return res;
};

export const deleteAlbum = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeAlbum(albumId));
        return data;
    }
    return res;
};

export const createAlbumSong = (albumId, songId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
        method: "POST",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveAlbumSong(data));
        return data;
    }
    return res;
};

export const deleteAlbumSong = (albumId, songId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(removeAlbumSong(albumId, songId));
        return data;
    }
    return res;
};

const albumsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            const albumsState = { ...state };
            action.albums.albums.forEach((album) => {
                if (!albumsState[album.id]) { albumsState[album.id] = album; }
            });
            return albumsState;
        };
        case LOAD_ALBUM_DETAILS: {
            return { ...state, [action.album.id]: action.album };
        };
        case RECEIVE_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case UPDATE_ALBUM:
            return { ...state };
        case REMOVE_ALBUM: {
            const albumState = { ...state };
            delete albumState[action.album];
            return albumState;
        };
        case RECEIVE_ALBUM_SONG: {
            const albumState = { ...state };
            return albumState;
        };
        case REMOVE_ALBUM_SONG: {
            const albumState = { ...state };
            return albumState;
        };
        default:
            return state;
    }
};

export default albumsReducer;
