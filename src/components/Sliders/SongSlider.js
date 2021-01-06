import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const SongSlider = ({ title, data }) => {
  const settings = {
    dots: false,
    infinity: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    centerMode: true,
    className: 'song-slider-list',
  };

  if (data.length < 5) {
    return null;
  }

  return (
    <div className="songs-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {data.map((item) => (
          <SliderItem key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

function SliderItem({ item }) {
  const [banner, setBanner] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('albums')
      .doc(item.album)
      .get()
      .then((res) => {
        setAlbum({ ...res.data(), id: res.id });
        getImage({ ...res.data() });
      });
  }, [item]);

  const getImage = (album) => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => setBanner(url));
  };
  return (
    <div className="song-item">
      <div className="avatar" style={{ backgroundImage: `url(${banner})` }}>
        <Icon name="play circle outline" />
      </div>
      <Link to={`/album/${album?.id}`}>
        <h3>{item.name}</h3>
      </Link>
    </div>
  );
}
