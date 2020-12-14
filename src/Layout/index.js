import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../routes';
import { Grid } from 'semantic-ui-react';
import { MenuLeft } from '../components/MenuLeft';
import { Topbar } from '../components/Topbar';

export const LoggedLayout = ({ user, setReloadApp }) => {
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="logged-layout-main" width={13}>
            <Topbar user={user} />
            <Routes user={user} setReloadApp={setReloadApp} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <h2>Player</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
};
