import './LikeSong.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLikes, getSongLikes,createLike, deleteLike } from '../../store/likes';
import { getSongDetails } from '../../store/songs';

function LikeSong({songId, userId}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    console.log("parseInt(songId)", parseInt(songId))
    songId = parseInt(songId);
    const likes = useSelector(state => state.likesReducer.likes);
    // console.log("Object.values(likes)[0].user_id", Object.values(likes)[0].user_id);
    const currLike = Object.values(likes).filter((curr, index)=> (curr.user_id == userId && curr.song_id == songId))
    // console.log("currLike", currLike);
    // console.log("currLike[0].id", currLike[0].id);
    // console.log("currLike.length", currLike.length);
    const[isliked, setIsLiked] = useState(currLike.length==true);
    useEffect(() => {
      dispatch(getSongDetails(songId)).then(()=>dispatch(getSongLikes(songId))).then(() => setIsLoading(false));
    }, [dispatch, songId, currLike.length]);

  if (isLoading) return (<>Loading...</>);
  const handleClick = () => {
      if(isliked == 1 ){
      let likeId;
      if(currLike.length){
        likeId = currLike[0].id;
      }
      // const likeId = currLike[0].id;
      console.log("deleteLikesongId", songId, likeId)
      dispatch(deleteLike(likeId, songId))
      console.log("like", currLike)
    }
    if(isliked == 0)
  {
    console.log("createLikesongId", songId, userId)
    const addlike = {"user_id" : userId,
      "song_id" : songId };
    dispatch(createLike(addlike, songId))
    console.log("like", currLike)
    }
    setIsLiked(!isliked);
  };
  console.log("isliked", isliked)

  if(!isliked)

    return (<button
    onClick={handleClick}>like</button>
      )
  return (<button
  onClick={handleClick}>unlike</button>)
}

export default LikeSong
