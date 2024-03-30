// /** Action Type Constants: */
export const LOAD_LIKES = "likes/LOAD_LIKES";
export const LOAD_SONG_LIKES = "likes/LOAD_SONG_LIKES";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

// /**  Action Creators: */
export const loadLikes = (likes) => ({
    type: LOAD_LIKES,
    likes,
});

export const loadSongLikes = (likes) => ({
    type: LOAD_SONG_LIKES,
    likes,
});

export const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like,
});

export const removeLike = (like) => ({
    type: REMOVE_LIKE,
    like,
});

// /** Thunk Action Creators: */
export const getAllLikes = () => async (dispatch) => {
    const res = await fetch(`/api/songs/likes`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadLikes(data));
        return data;
    }
    return res;
};

export const getSongLikes = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSongLikes(data));
        return data;
    }
    return res;
};


export const createLike = (payload, songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveLike(data));
        return data;
    }
    return res;
};

export const deleteLike = (likeId, songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeLike(data.id));
        return data;
    }
    return res;
};

const likesReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_LIKES:
            const likesState = {...state};
            action.likes.likes.forEach((like) => {
                if(!likesState[like.id]) {likesState[like.id] = like;}
            });
            return {...likesState};
        case LOAD_SONG_LIKES:{
            return { ...state, ...action.likes };
        };
        case RECEIVE_LIKE:
            return { ...state, [action.like.id]: action.like};
        case REMOVE_LIKE:{
            const likeState = { ...state, ...action.likes};
            delete likeState[action.like];
            return likeState;
        }
        default:
            return state;
    }
};

export default likesReducer;
