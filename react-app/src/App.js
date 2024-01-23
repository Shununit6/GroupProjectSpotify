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
import PlaylistIndex from './components/PlaylistIndex';
import PlaylistDetails from './components/PlaylistDetails';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/albums" exact={true}>
            <Albums/>
          </Route>
          <Route path="/albums/:albumId(\d+)" exact={true}>
            <AlbumDetails/>
          </Route>
          <Route exact path="/songs/current" component={ManageSongs}/>
          <Route exact path="/songs/new" component={CreateSong}/>
          <Route exact path="/songs/:songId/edit" component={UpdateSong}/>
          <Route exact path="/songs/:songId(\d+)" component={SongDetails}/>
          <Route exact path="/songs" component={SongIndex}/>
          <Route exact path="/playlists/current" component={ManagePlaylists}/>
          <Route exact path="/playlists/:playlistId(\d+)" component={PlaylistDetails}/>
          <Route exact path="/playlists" component={PlaylistIndex}/>
          <Route exact path="/albums/current" component={ManageAlbums}/>
          <Route exact path="/albums/:albumId(\d+)" component={AlbumDetails}/>
          <Route exact path="/albums" component={Albums}/>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
