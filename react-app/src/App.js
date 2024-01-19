import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateSong from './components/CreateSong';
import ManageSongs from './components/ManageSongs';
import SongDetails from './components/SongDetails';
import SongIndex from './components/SongIndex';
import UpdateSong from './components/UpdateSong';

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
          <Route exact path="/songs/current" component={ManageSongs}/>
          <Route exact path="/songs/new" component={CreateSong}/>
          <Route exact path="/songs/:songId/edit" component={UpdateSong}/>
          <Route exact path="/songs/:songId(\d+)" component={SongDetails}/>
          <Route exact path="/songs" component={SongIndex}/>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
