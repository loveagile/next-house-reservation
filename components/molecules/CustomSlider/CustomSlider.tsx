import React, { useState, useEffect } from "react";
import Image from "next/image";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./CustomSlider.css";

interface CustomCarouselProps {
  imgs: string[];
}

const CustomSlider: React.FC<CustomCarouselProps> = ({ imgs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      const id = setTimeout(() => {
        slideNext();
        setSlideDone(true);
      }, 4000);
      setTimeID(id);
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => (val >= imgs.length - 1 ? 0 : val + 1));
  };

  const slidePrev = () => {
    setActiveIndex((val) => (val <= 0 ? imgs.length - 1 : val - 1));
  };

  const AutoPlayStop = () => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {imgs.map((imgUrl, index) => (
        <div
          className={`slider__item slider__item-active-${activeIndex + 1}`}
          key={index}
        >
          <Image
            src={imgUrl}
            width={640}
            height={480}
            objectFit="cover"
            className="aspect-[4/3] object-cover object-center w-full h-auto"
            alt={`img-${index}`}
          />
        </div>
      ))}

      <div className="container__slider__links">
        {imgs.map((_, index) => (
          <button
            key={index}
            className={
              activeIndex === index
                ? "container__slider__links-small container__slider__links-small-active"
                : "container__slider__links-small"
            }
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          ></button>
        ))}
      </div>

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        <ArrowForwardIosIcon />
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        <ArrowBackIosIcon />
      </button>
    </div>
  );
};

export default CustomSlider;
