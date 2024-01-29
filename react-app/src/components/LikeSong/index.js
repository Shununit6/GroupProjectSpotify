import './LikeSong.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongLikes,createLike, deleteLike } from '../../store/likes';
import { getSongDetails } from '../../store/songs';

function LikeSong({songId, userId}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    songId = parseInt(songId);
    const likes = useSelector(state => state.likesReducer.likes);
    const alllikes = useSelector(state => state.likesReducer);
    const numofl=  Object.values(alllikes).filter((curr)=> (curr.song_id == songId)).length;

    const currLike = Object.values(likes).filter((curr)=> (curr.user_id == userId && curr.song_id == songId))
    // console.log("currLike", currLike);

    const[isliked, setIsLiked] = useState(currLike.length==true);

    useEffect(() => {
      dispatch(getSongDetails(songId)).then(()=>dispatch(getSongLikes(songId))).then(() => setIsLoading(false));
    }, [dispatch, songId]);

  if (isLoading) return (<>Loading...</>);


  const handleClick = () => {
      if(isliked == 1 ){
      let likeId;
      if(currLike.length){
        likeId = currLike[0].id;
      }

      dispatch(deleteLike(likeId, songId))

    }
    if(isliked == 0)
    {

    const addlike = {"user_id" : userId,
      "song_id" : songId };
    dispatch(createLike(addlike, songId))

    }
    setIsLiked(!isliked);
  };


  if(!isliked)

    return (
    <>
      <button onClick={handleClick}>like</button>
      <div>{numofl} liked this song</div>
    </>
      )
  return (
    <>
      <button onClick={handleClick}>like</button>
      <div>{numofl} liked this song</div>
    </>
  )
}

export default LikeSong
