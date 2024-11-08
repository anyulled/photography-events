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
    {photos, username}: Readonly<{
        photos: Array<string>;
        username: string;
    }>,
) {
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const convertedPhotos: Image[] = photos.map((src, index) => ({
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
            {/* Instagram embed */}

            <blockquote className="instagram-media"
                        data-instgrm-permalink={`https://www.instagram.com/${username}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                        data-instgrm-version="14"
            >
                <div><a
                    href={`https://www.instagram.com/${username}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                    target="_blank">
                    <div
                    >View
                        this profile on Instagram
                    </div>
                </a><p
                >
                    <a href={`https://www.instagram.com/${username}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                       target="_blank">Delaia González</a> (@<a
                    href={`https://www.instagram.com/${username}/?utm_source=ig_embed&amp;utm_campaign=loading`}

                    target="_blank">{username}</a>) • Instagram photos and
                    videos</p></div>
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    plugins={[Fullscreen, Zoom, Captions]}
                    slides={photos.map((src) => ({src}))}
                    index={photoIndex}
                />
            )}
        </>
    );
}
