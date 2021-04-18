/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const CarouselStyle = styled.div`
  padding: 5%;
  overflow: hidden;
`;
const one = 2;
const Carousel = ({ recommendedTV, recommendedMovie, current }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <CarouselStyle>
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
    </CarouselStyle>
  );
};

export default Carousel;
