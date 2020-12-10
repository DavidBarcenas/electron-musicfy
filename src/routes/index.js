import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';

export const Routes = () => {
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
          <h2>Configuraciones</h2>
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
