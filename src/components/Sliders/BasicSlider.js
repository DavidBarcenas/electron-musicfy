import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import firebase from '../../utils/firebase';
import 'firebase/storage';

export const BasicSlider = ({ title, data }) => {
  const settings = {
    dots: false,
    infinity: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: 'basic-slider-list',
  };

  return (
    <div className="basic-slider">
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
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${item.banner}`)
      .getDownloadURL()
      .then((url) => setImageURL(url));
  }, [item]);

  return (
    <div className="basic-slider-item">
      <div
        className="basic-slider-item-img"
        style={{ backgroundImage: `url(${imageURL})` }}
      ></div>
      <h3>{item.name}</h3>
    </div>
  );
}
