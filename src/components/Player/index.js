import React from 'react';
import { Grid } from 'semantic-ui-react';

export const Player = () => {
  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          Left
        </Grid.Column>
        <Grid.Column width={8} className="center">
          Center
        </Grid.Column>
        <Grid.Column width={4} className="right">
          Right
        </Grid.Column>
      </Grid>
    </div>
  );
};
