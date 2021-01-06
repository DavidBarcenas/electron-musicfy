import React from 'react';
import Slider from 'react-slick';

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
  return <div>{item.name}</div>;
}
