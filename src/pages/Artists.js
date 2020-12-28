import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .get()
      .then((resp) => {
        const artistsTemp = [];
        resp?.docs.map((artist) => {
          return artistsTemp.push({ ...artist.data(), id: artist.id });
        });
        setArtists(artistsTemp);
      });
  }, []);

  return (
    <div>
      <h1>Artistas</h1>
      <Grid>
        {artists.map((artist) => (
          <Artist key={artist.id} artist={artist} />
        ))}
      </Grid>
    </div>
  );
};

function Artist({ artist }) {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artist.banner}`)
      .getDownloadURL()
      .then((url) => setBanner(url));
  }, [artist]);
  return <div>hola</div>;
}
