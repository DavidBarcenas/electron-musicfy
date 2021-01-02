import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Albums } from '../pages/Albums';
import { Artist } from '../pages/Artist';
import { Artists } from '../pages/Artists';
import { Home } from '../pages/Home';
import { Settings } from '../pages/Settings';

export const Routes = ({ user, setReloadApp }) => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/artists">
          <Artists />
        </Route>
        <Route exact path="/artist/:id">
          <Artist />
        </Route>
        <Route exact path="/albums">
          <Albums />
        </Route>
        <Route exact path="/settings">
          <Settings user={user} setReloadApp={setReloadApp} />
        </Route>
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      </Switch>
    </div>
  );
};
