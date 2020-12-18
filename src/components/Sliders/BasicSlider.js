import React from 'react';
import Slider from 'react-slick';

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
      <Slider {...settings}></Slider>
    </div>
  );
};
