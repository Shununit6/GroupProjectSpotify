// /** Action Type Constants: */
export const LOAD_LIKES = "likes/LOAD_LIKES";
export const LOAD_LIKE_DETAILS = "likes/LOAD_LIKE_DETAILS";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

// /**  Action Creators: */
export const loadLikes = (likes) => ({
    type: LOAD_LIKES,
    likes,
});

export const loadLikeDetails = (like) => ({
    type: LOAD_LIKE_DETAILS,
    like,
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
    const res = await fetch("/api/likes");

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadLikes(data));
        return data;
    }
    return res;
};

export const likeDetails = (likeId) => async dispatch => {
    const res = await fetch(`/api/likes/${likeId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadLikeDetails(data));
        return data;
    }
    return res;
}

export const createLike = (payload) => async (dispatch) => {
    const res = await fetch("/api/likes", {
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

export const deleteLike = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likeId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeLike(likeId));
        return data;
    }
    return res;
};

const likesReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_LIKES:
            const likesState = {...state};
            action.likes.Likes.forEach((like) => {
                if(!likesState[like.id]) {likesState[like.id] = like;}
            });
            return {...likesState};
        case LOAD_LIKE_DETAILS: {
            const likeState = {...state};
            if(action.likes){
                likeState[action.likes.id] = action.likes;
            }
            return likeState;
        }
        case RECEIVE_LIKE:
            return { ...state, [action.like.id]: action.like };
        case REMOVE_LIKE:{
            const likeState = { ...state };
            delete likeState[action.like.id];
            return likeState;
        }
        default:
            return state;
    }
};

export default likesReducer;
