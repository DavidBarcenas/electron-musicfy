import React, { useState } from 'react';
import { Grid, Icon, Image, Progress } from 'semantic-ui-react';

const songData = {
  image:
    'https://firebasestorage.googleapis.com/v0/b/musicfy-5cc74.appspot.com/o/album%2F6a035d03-35a9-4fc3-974c-1280d6d975e7?alt=media&token=a479fdcd-710a-4aca-9867-e88158e7b817',
  name: 'Un día en suburbia',
};

export const Player = () => {
  const [playerSeconds, setPlayerSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);

  const onStart = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            {playing ? (
              <Icon name="pause circle outline" onClick={onPause} />
            ) : (
              <Icon name="play circle outline" onClick={onStart} />
            )}
          </div>
          <Progress
            Progress="value"
            value={playerSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={4} className="right">
          Right
        </Grid.Column>
      </Grid>
    </div>
  );
};
