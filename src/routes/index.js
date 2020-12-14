import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Settings } from '../pages/Settings';

export const Routes = ({ user }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/artists">
          <h2>Artistas</h2>
        </Route>
        <Route exact path="/settings">
          <Settings user={user} />
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
