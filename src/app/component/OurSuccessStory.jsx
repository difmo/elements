"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Image from "next/image"; // Import Image from Next.js
import img1 from "../assets/oursuccess1.png";
import img2 from "../assets/oursuccess2.png";
import img3 from "../assets/oursuccess3.png";

const OurSuccessStory = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef(null); // Ref for the scroll container

  const sections = [
    {
      title: "Improved Patient Outcomes With Predictive Analytics",
      description:
        "Using predictive analytics, a leading hospital in Virginia reduced hospital readmissions by 25%.",
      image: img1,
    },
    {
      title: "Optimized Diagnostics With AI",
      description:
        "AI-powered solutions improved diagnostic accuracy by 30% at a healthcare center.",
      image: img2,
    },
    {
      title: "Enhanced Patient Experience",
      description:
        "An integrated telehealth solution enhanced patient satisfaction by 50%.",
      image: img3,
    },
  ];

  // Function to automatically scroll to the next section
  const autoScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const sectionWidth = container.firstChild.offsetWidth;
      const currentScroll = container.scrollLeft;

      const nextScroll = currentScroll + sectionWidth;

      // If we've reached the end, reset to the beginning
      if (nextScroll >= container.scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = nextScroll;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(autoScroll, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16">
      {/* Title */}
      <div className="flex items-center justify-center w-full mt-8 sm:mt-12">
        <div
          className="flex items-center justify-center gap-3 px-4 py-2 text-center border border-opacity-0 rounded-full"
          style={{
            fontFamily: "Mulish",
            fontSize: "1.25rem",
            fontWeight: 500,
            lineHeight: "1.5rem",
          }}
        >
          OUR SUCCESS STORIES
        </div>
      </div>

      {/* Responsive Section */}
      <div className="flex items-center justify-center py-8">
        {/* For Larger Screens - Animated Layout */}
        <div className="hidden w-full h-full p-4 space-x-4 overflow-x-auto lg:flex">
          {sections.map((section, index) => {
            return (
              <motion.div
                key={index}
                initial={{ flex: 1 }}
                animate={{ flex: activeIndex === index ? 5 : 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 10 }}
                className={`overflow-hidden transition-all ${
                  activeIndex === index ? "rounded-[100px]" : "rounded-full"
                } bg-white cursor-pointer`}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`flex items-center w-full h-screen`}>
                  {/* Image */}
                  <div
                    className={`relative w-full h-full ${
                      activeIndex === index ? "opacity-100" : ""
                    } transition-all duration-300`}
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {activeIndex !== index && (
                    <div className="absolute inset-0 "></div>
                  )}

                  {/* Text Content */}
                  {activeIndex === index && (
                    <div className="flex flex-col justify-center w-[800px] px-6 py-4 text-left bg-white">
                      <h3 className="text-lg font-bold sm:text-xl md:text-2xl">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base">
                        {section.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div
          ref={scrollContainerRef} // Attach the ref to the container
          className="flex w-full h-full gap-3 p-4 overflow-x-auto lg:hidden scroll-smooth scrollbar-hidden"
        >
          {sections.map((section, index) => {
            return (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-lg w-[300px] sm:w-[300px] lg:w-[350px] flex-shrink-0"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-48 sm:h-64">
                    <Image
                      src={section.image}
                      alt={section.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full p-4 bg-white">
                    <h3 className="text-lg font-bold sm:text-xl">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurSuccessStory;
