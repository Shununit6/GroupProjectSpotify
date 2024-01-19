import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumDetails } from "../../store/albums";
import { Link, Redirect } from 'react-router-dom';
import "./AlbumIndexItem.css";
const AlbumIndexItem = ({ album }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const albumData = useSelector((state) => state.albums[album.id]);
    useEffect(() => {
        // dispatch(albumDetails(album.id)).then(()=>dispatch(getGroupIdEvents(group.id))).then(()=>setIsLoaded(true))
        dispatch(albumDetails(album.id)).then(()=>setIsLoaded(true))
    }, [dispatch, album.id])

    // if(isLoaded && !groupData){
    //     return (<Redirect to="/groups"/>);
    // }

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }

    const {id, name, about, city, state} = albumData;

    const totalLaneCount = Math.ceil(about.length/59);
    let groupAboutArr=[];
    for(let i = 0; i <= totalLaneCount+1; i++){
        let j = 59;
        groupAboutArr.push(about.slice(j*i, j*i+59)+"\n");
        j += 59;
    };

    let isPrivate;
    if(group.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    let imageUrl ="";
    if(Object.values(group.GroupImages)){
        imageUrl = Object.values(group.GroupImages).find((image) => image.preview === 1 || image.preview === true).url;
    }
    // console.log("groupData", groupData);
    if(isLoaded){
    return (
        <Link id="grouplinkwithtext" to={`/groups/${id}`}  key={`${id}`}>
        <hr />
        <div id="groupgrid1">
            <div id="groupitem1">
                <img id ="groupImage" src={imageUrl} alt="group"/>
            </div>
            <div id ="groupitem2">
            <h1>{name}</h1>
                <p>{city}, {state}</p>
                <p>{groupAboutArr}</p>
                <p>{Object.values(groupData.Events|| {}).length} events ·  {isPrivate}</p>
            </div>
        </div>
        </Link>


    );
    }
};

export default AlbumIndexItem;
