import React from 'react';
import { Routes } from '../routes';
import { Grid } from 'semantic-ui-react';
import { MenuLeft } from '../components/MenuLeft';

export const LoggedLayout = ({ user }) => {
  return (
    <Grid className="logged-layout">
      <Grid.Row>
        <Grid.Column width={3}>
          <MenuLeft user={user} />
        </Grid.Column>
        <Grid.Column className="logged-layout-main" width={13}>
          <h2>Main</h2>
          <Routes />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <h2>Player</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
