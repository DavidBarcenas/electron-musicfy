import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

export const Player = () => {
  const songData = {
    image:
      'https://firebasestorage.googleapis.com/v0/b/musicfy-5cc74.appspot.com/o/album%2F6a035d03-35a9-4fc3-974c-1280d6d975e7?alt=media&token=a479fdcd-710a-4aca-9867-e88158e7b817',
    name: 'Un día en suburbia',
  };
  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
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
