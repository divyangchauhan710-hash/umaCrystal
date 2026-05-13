"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function ImageGallery({ media, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!media || media.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia.type === "video";

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsVideoPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsVideoPlaying(false);
  };

  return (
    <div className="w-full">
      {/* Main Display */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        {isVideo ? (
          <div className="w-full h-full relative">
            {!isVideoPlaying ? (
              <>
                <Image
                  src={currentMedia.thumbnail}
                  alt={productName}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-primary fill-primary" />
                  </div>
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
                {currentMedia.url.includes("youtube.com") || currentMedia.url.includes("youtu.be") ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentMedia.url.replace("watch?v=", "embed/")}
                    title={productName}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                ) : currentMedia.url.includes("sample-video.mp4") ? (
                  <div className="space-y-4">
                    <Play className="w-12 h-12 text-gold mx-auto opacity-50" />
                    <div>
                      <h4 className="text-white font-heading font-bold text-lg">Video Coming Soon</h4>
                      <p className="text-gray-400 text-sm mt-1">We are currently preparing an original product video for you.</p>
                    </div>
                    <button 
                      onClick={() => setIsVideoPlaying(false)}
                      className="text-gold text-sm font-medium hover:underline"
                    >
                      Back to Gallery
                    </button>
                  </div>
                ) : (
                  <video 
                    src={currentMedia.url} 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-full"
                    onError={() => {
                      // Fallback if local video fails to load
                      const el = document.getElementById('video-fallback');
                      if (el) el.style.display = 'flex';
                    }}
                  />
                )}
                <div id="video-fallback" className="hidden absolute inset-0 bg-gray-900 flex-col items-center justify-center p-6 text-center">
                   <div className="space-y-4">
                    <Play className="w-12 h-12 text-gold mx-auto opacity-50" />
                    <div>
                      <h4 className="text-white font-heading font-bold text-lg">Video Not Available</h4>
                      <p className="text-gray-400 text-sm mt-1">Sorry, this video file could not be loaded.</p>
                    </div>
                    <button 
                      onClick={() => setIsVideoPlaying(false)}
                      className="text-gold text-sm font-medium hover:underline"
                    >
                      Back to Gallery
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Image
            src={currentMedia.url}
            alt={productName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Media Type Badge */}
        {isVideo && (
          <div className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Play className="w-3 h-3 fill-white" />
            Video
          </div>
        )}

        {/* Counter */}
        {media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs font-medium">
            {currentIndex + 1} / {media.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsVideoPlaying(false);
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-primary"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {item.type === "video" ? (
                <>
                  <Image
                    src={item.thumbnail}
                    alt={`Thumbnail ${index}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </>
              ) : (
                <Image
                  src={item.url}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
