/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
// import './_slick.scss';
// import './_slickTheme.scss';
const CarouselStyle = styled.div`
  padding: 5%;
  overflow: hidden;
`;

const Carousel = ({ recommended }) => {
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
          {recommended}
        </Slider>
      </div>
    </CarouselStyle>
  );
};

export default Carousel;
