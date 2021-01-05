import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Grid, Icon, Image, Input, Progress } from 'semantic-ui-react';

const songData = {
  image:
    'https://firebasestorage.googleapis.com/v0/b/musicfy-5cc74.appspot.com/o/album%2F6a035d03-35a9-4fc3-974c-1280d6d975e7?alt=media&token=a479fdcd-710a-4aca-9867-e88158e7b817',
  name: 'Un día en suburbia',
  url: '',
};

export const Player = () => {
  const [playerSeconds, setPlayerSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const onStart = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onProgress = (data) => {
    setPlayerSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
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
          <Input
            type="range"
            name="volume"
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e, data) => setVolume(data.value)}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={playing}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
};
