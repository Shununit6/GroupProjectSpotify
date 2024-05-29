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
    const alllikes = useSelector(state => state.likesReducer);
    const numofl=  Object.values(alllikes).filter((curr)=> (!(curr.song_id - songId))).length - 1;

    let currLike = Object.values(alllikes).filter((curr)=> (!(curr.song_id - songId) && !(curr.user_id - sessionUser.id)));
    const[isliked, setIsLiked] = useState(currLike[0] && Object.keys(currLike[0]).length && currLike[0].user_id==sessionUser.id);

    useEffect(() => {
      dispatch(getSongDetails(songId)).then(()=>dispatch(getAllLikes())).then(()=>dispatch(getSongLikes(songId))).then(() => setIsLoading(false));
    }, [dispatch, songId]);

  if (isLoading) return (<>Loading...</>);


  const handleClick = () => {
    if(isliked){
      let likeId;
      if(currLike && currLike.length){
        likeId = currLike[0].id;
      }

      dispatch(deleteLike(likeId, songId))

    }
    if(!isliked)
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
        <div className="likediv" onClick={handleClick}><i id="regularheart" className="fa-regular fa-heart"></i></div>
        <div>{numofl} liked this song</div>
      </>
        )
  }else{
    return (
      <>
        <div className="likediv" onClick={handleClick}><i id="solidheart" className="fa-solid fa-heart"></i></div>
        <div>{numofl} liked this song</div>
      </>
    )
  }

}

export default LikeSong
