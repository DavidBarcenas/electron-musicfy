import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

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
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {artists.map((artist) => (
          <Grid.Column key={artist.id} mobile={8} table={4} computer={3}>
            <Artist artist={artist} />
          </Grid.Column>
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
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artists-item">
        <div
          className="artists-avatar"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
}
