// components/ImageWithDescription.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import bg_image1 from "../public/bg_img.jpg"
import bg_image2 from "../public/bg_img2.jpeg"
import bg_image3 from "../public/bg_img3.jpeg"
import bg_image4 from "../public/events1.jpeg"
import { useSwipeable } from 'react-swipeable';

const images = [
  {
    src: bg_image3,
    description: 'This is the description for Image 1',
    bgColor: '#000000', // Yellow
  },
  {
    src: bg_image3,
    description: 'This is the description for Image 2',
    bgColor: '#3F3F3F', // Red
  },
  {
    src: bg_image3,
    description: 'This is the description for Image 3',
    bgColor: '#706129', // Blue
  },
];

export default function Collabs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentImage(images[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 30); 

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setProgress(0);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Swipeable handler for mobile swipe functionality
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    trackMouse: true, // Enable for desktop swipe simulation
    trackTouch: true, // Enable for mobile touch
    onSwiping: (event) => event.event.preventDefault(), // Manually prevent default behavior
  });

  return (
    <motion.div
      className="w-full h-screen flex flex-col justify-center items-center text-center bg-[#1a1a1a] px-4"
      animate={{ backgroundColor: currentImage.bgColor }}
      transition={{ duration: 1.5 }}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 justify-center lg:justify-start pt-[5vh]">
        <p className="text-[#c2a85b] text-center px-8 py-1 rounded-2xl text-sm tracking-wider">
          See What We Do
        </p>
        <div className="flex items-center justify-center">
          <div className="h-[2px] w-16 bg-gray-400 mr-4"></div>
          <h1 className="text-white text-center text-3xl lg:text-6xl">
            Collaborations
          </h1>
          <div className="h-[2px] w-16 bg-gray-400 ml-4"></div>
        </div>
      </div>

      {/* Image and Description Section */}
      <div {...handlers} className="relative mt-8 w-full flex justify-center">
        <Image
          src={currentImage.src}
          alt="Current Image"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-4 w-4 rounded-full cursor-pointer ${
                index === currentIndex ? 'bg-[#c2a85b]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <motion.p
        className="text-gray-300 mt-12 text-lg font-light max-w-[600px]"
        key={currentImage.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {currentImage.description}
      </motion.p>
    </motion.div>
  );
}
