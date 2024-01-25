// import './LikeSong.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLikes, createLike, deleteLike } from '../../store/likes';
// import {AiFillLike, AiFillDislike} from 'react-icons/ai'

function LikeSong({songId, userId}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    console.log(parseInt(songId))
    songId = parseInt(songId);
    // const like = useSelector(state => state.likesReducer.likes);
    // // console.log(Object.values(like)[0].user_id);
    // console.log(like);
    useEffect(() => {
        (dispatch(getAllLikes(songId))).then(() => setIsLoading(false));
      }, [dispatch, userId]);

  const[isliked, setIsLiked] = useState(false);
  if (isLoading) return (<>Loading...</>);
  const handleClick = () => {
    setIsLiked(!isliked);
  };
  console.log(isliked)

  if(isliked)
  {
    dispatch(deleteLike(songId))
    }else{
    dispatch(createLike(songId))}

  if(isliked)
    return (<button
    onClick={handleClick}>like</button>
      )
  return (<button
  onClick={handleClick}>unike</button>)
}

export default LikeSong

// const LikeSong = ({songId, userId}) => {
//   const dispatch = useDispatch();
// //   const like = useSelector(state => state.likesReducer.likes);
// //   console.log("this is like:", like)
//   let LikeState = false;
//   useEffect(() => {
//             dispatch(createLike(songId));
//           }, [dispatch, songId, userId]);
// LikeState = true;

//  dispatch(createLike(songId));

//   const checklike = async (LikeState) =>{
//   if(!LikeState){
//     useEffect(() => {
//         dispatch(createLike(songId)).then(() => setIsLoading());
//       }, [dispatch, songId, userId]);
//     LikeState = true;
//   }else{
//     useEffect(() => {
//         dispatch(deleteLike(songId)).then(() => setIsLoading());
//       }, [dispatch, songId, userId]);
//     LikeState = false;
//   }}

//   const closeMenu = (e) => {
//     if (!ulRef.current?.contains(e.target)) {
//       setShowMenu(false);
//     }
//   };

//   return (
//     <>
//       <button onClick={LikeSong}>like</button>
//       {LikeState}
//     </>
//   )
// };

// export default LikeSong;
