'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ recipe }) => {
  const data = recipe.instructions.map(
    (instruction) => instruction.instruction
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInfiniteScroll = () => {
    if (currentIndex === data.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       carouselInfiniteScroll();
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   });
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => {
            if (currentIndex === 0) {
              return setCurrentIndex(data.length - 1);
            }
            return setCurrentIndex(currentIndex - 1);
          }}
        >
          <ChevronLeft />
        </button>
        <div className="flex flex-nowrap overflow-hidden m-6">
          {data.map((item, index) => {
            return (
              <p
                className="text-justify text-lg min-w-full flex items-center justify-center transition-all"
                style={{ transform: `translate(-${currentIndex * 100}%)` }}
                key={index}
              >
                {item}
              </p>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (currentIndex === data.length - 1) {
              return setCurrentIndex(0);
            }
            return setCurrentIndex(currentIndex + 1);
          }}
        >
          <ChevronRight />
        </button>
      </div>
      <h1 className="text-lg flex justify-center mt-3">{`Step ${
        currentIndex + 1
      } of ${data.length}`}</h1>
    </>
  );
};

export default Carousel;
