import './LikeSong.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongLikes,getAllLikes,createLike, deleteLike } from '../../store/likes';
import { getSongDetails } from '../../store/songs';

function LikeSong({songId, userId}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    songId = parseInt(songId);
    // const likes = useSelector(state => state.likesReducer.likes);
    const alllikes = useSelector(state => state.likesReducer);
    const numofl=  Object.values(alllikes).filter((curr)=> (curr.song_id == songId)).length;

    let currLike = Object.values(alllikes).filter((curr)=> (curr.song_id == songId && curr.user_id == sessionUser.id));
    // console.log("currLike", currLike);
    // .filter((curr)=> (curr.song_id == songId));

    const[isliked, setIsLiked] = useState(currLike.length==true);

    useEffect(() => {
      dispatch(getSongDetails(songId)).then(()=>dispatch(getAllLikes())).then(()=>dispatch(getSongLikes(songId))).then(() => setIsLoading(false));
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


  if(!isliked){
    return (
      <>
        <button onClick={handleClick}>like</button>
        <div>{numofl} liked this song</div>
      </>
        )
  }else{
    return (
      <>
        <button onClick={handleClick}>unlike</button>
        <div>{numofl} liked this song</div>
      </>
    )
  }

}

export default LikeSong
