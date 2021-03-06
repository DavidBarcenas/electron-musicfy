import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../routes';
import { Grid } from 'semantic-ui-react';
import { MenuLeft } from '../components/MenuLeft';
import { Topbar } from '../components/Topbar';
import { Player } from '../components/Player';
import firebase from '../utils/firebase';
import 'firebase/storage';

export const LoggedLayout = ({ user, setReloadApp }) => {
  const [songData, setSongData] = useState(null);

  const playerSong = (albumImage, songName, songUrl) => {
    firebase
      .storage()
      .ref(`songs/${songUrl}`)
      .getDownloadURL()
      .then((url) => {
        setSongData({
          url: url,
          name: songName,
          image: albumImage,
        });
      });
  };

  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="logged-layout-main" width={13}>
            <Topbar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              playerSong={playerSong}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
};
