"use client";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-photo-album/rows.css";
import React, {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import {Image, RowsPhotoAlbum} from "react-photo-album";
import renderNextImage from "@/components/ui/NextImage";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

export default function PhotoGallery(
    props: Readonly<{
        photos: Array<string>;
    }>,
) {
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const convertedPhotos: Image[] = props.photos.map((src, index) => ({
        src,
        alt: `photo ${index}`,
        width: 1024,
        height: 768
    }));
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
                    <div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <RowsPhotoAlbum photos={convertedPhotos}
                                        render={{image: renderNextImage}}
                                        defaultContainerWidth={1216}
                                        onClick={({index}) => handlePhotoClick(index)}
                        />
                    </div>
                </div>
            </section>
            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    plugins={[Fullscreen, Zoom, Captions]}
                    slides={props.photos.map((src) => ({src}))}
                    index={photoIndex}
                />
            )}
        </>
    );
}
