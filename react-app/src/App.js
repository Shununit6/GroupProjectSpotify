import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateSong from './components/CreateSong';
import UpdateSong from './components/UpdateSong';
import ManageSongs from './components/ManageSongs';
import ManageAlbums from './components/ManageAlbums';
import ManagePlaylists from './components/ManagePlaylists';
import SongIndex from './components/SongIndex';
import SongDetails from './components/SongDetails';
import Albums from "./components/Albums";
import AlbumDetails from "./components/AlbumDetails";
import UpdateAlbum from "./components/UpdateAlbum"
import CreateAlbum from "./components/CreateAlbum";
import PlaylistIndex from './components/PlaylistIndex';
import PlaylistDetails from './components/PlaylistDetails';
import Home from './components/Home';
// import LikeSong from "./components/LikeSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>

          <Route path="/albums" exact={true}>
            <Albums/>
          </Route>
          <Route path="/albums/:albumId(\d+)" exact={true}>
            <AlbumDetails/>
          </Route>
          <Route path="/albums/:albumId/edit" exact={true}>
            <UpdateAlbum/>
          </Route>
          <Route exact path="/albums/new" component={CreateAlbum}/>
          <Route exact path="/songs/current" component={ManageSongs}/>
          <Route exact path="/songs/new" component={CreateSong}/>
          <Route exact path="/songs/:songId(\d+)/edit" component={UpdateSong}/>
          {/* <Route exact path="/songs/:songId(\d+)/likes" component={LikeSong}/> */}
          <Route exact path="/songs/:songId(\d+)" component={SongDetails}/>
          <Route exact path="/songs" component={SongIndex}/>
          <Route exact path="/playlists/current" component={ManagePlaylists}/>
          <Route exact path="/playlists/:playlistId(\d+)" component={PlaylistDetails}/>
          <Route exact path="/playlists" component={PlaylistIndex}/>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
