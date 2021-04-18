/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ recommendedTV, recommendedMovie, current }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    accessibility: true,
  };

  // const next = () => {
  //   Slider.slickNext();
  // };

  // const previous = () => {
  //   Slider.slickPrev();
  // };

  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 37) {
  //     previous();
  //   } else if (e.keyCode === 39) {
  //     next();
  //   }
  // };

  return (
    <div>
      <Slider
        {...settings}
      >
        {
          current === 'Shows'
            ? recommendedTV
            : recommendedMovie
        }
      </Slider>
    </div>
  );
};

export default Carousel;
