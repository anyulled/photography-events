"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

export default function PhotoGallery(
  props: Readonly<{
    photos: Array<string>;
  }>,
) {
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const handlePhotoClick = (index: React.SetStateAction<number>) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {props.photos.map((photo, index) => (
              <button
                key={index + photo.length}
                className={`overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                  ${index % 5 === 0 ? "col-span-2 row-span-2" : ""}
                  ${index % 7 === 0 ? "col-span-2" : ""}
                  ${index % 11 === 0 ? "row-span-2" : ""}
                `}
                onClick={() => handlePhotoClick(index)}
                aria-label={`View photo ${index + 1}`}
              >
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={props.photos.map((src) => ({ src }))}
          index={photoIndex}
        />
      )}
    </>
  );
}
