"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; alt?: string }
  | { type: "embed"; src: string; alt?: string };

export function ProjectMediaGallery({ media }: { media?: ProjectMedia[] }) {
  const slides =
    media && media.length > 0
      ? media
      : [
          {
            type: "image",
            src: "https://placehold.co/800x450?text=No+Media",
            alt: "No media",
          },
        ];

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
      <Swiper
        modules={[EffectCreative, Navigation, Pagination]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="flex items-center justify-center bg-black/80"
          >
            {item.type === "image" && (
              <img
                src={item.src}
                alt={item.alt || "Project image"}
                className="object-contain w-full h-full transition-transform duration-700 hover:scale-105"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            )}
            {item.type === "video" && (
              <video
                src={item.src}
                controls
                className="object-contain w-full h-full rounded-lg shadow-lg"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            )}
            {item.type === "embed" && (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  src={item.src}
                  title={item.alt || "Embedded media"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full min-h-[300px] rounded-lg shadow-lg"
                  style={{ aspectRatio: "16/9", border: 0 }}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
