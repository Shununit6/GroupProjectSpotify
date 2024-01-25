// /** Action Type Constants: */
export const LOAD_LIKES = "likes/LOAD_LIKES";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

// /**  Action Creators: */
export const loadLikes = (likes) => ({
    type: LOAD_LIKES,
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
export const getAllLikes = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`);

    if (res.ok) {
        const data = await res.json();
        console.log("likedata", data);
        dispatch(loadLikes(data));
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

export const deleteLike = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeLike(songId));
        return data;
    }
    return res;
};

const likesReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_LIKES:
            console.log(action)
            return {...state, ...action.likes}
            // const likesState = {...state};
            // console.log(action)
            // action.likes.forEach((like) => {
            //     if(!likesState[like.id]) {likesState[like.id] = like;}
            // });
            // return {...likesState};
        case RECEIVE_LIKE:
            return { ...state, [action.like.id]: action.like };
        case REMOVE_LIKE:{
            const likeState = { ...state };
            delete likeState[action.songId];
            return likeState;
        }
        default:
            return state;
    }
};

export default likesReducer;
