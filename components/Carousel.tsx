import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    src: 'https://img.freepik.com/free-vector/ancient-hunter-with-weapons-wild-animals-flat_1284-31555.jpg',
    altText: 'Slide 1',
    header: 'Hello!!! from SharingClan.',
    caption: 'Welcome to SharingClan.',
    key: 1,
  },
  {
    src: 'https://img.freepik.com/free-vector/ethnic-people-african-tribes-traditional-clothing-nature_1308-52417.jpg',
    altText: 'Slide 2',
    header: 'We welcome you.',
    caption: 'Be part of our clan.',
    key: 2,
  },
  {
    src: 'https://img.freepik.com/free-vector/ethnic-people-african-tribes-traditional-clothing-nature-background_1308-50079.jpg',
    altText: 'Slide 3',
    header: 'Our main motive.',
    caption: 'We value helping clan members grow.',
    key: 3,
  },
];

function SharingClanCarousel({args}: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: any) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          className='text-default'
          captionText={item.caption}
          captionHeader={item.header}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default SharingClanCarousel;