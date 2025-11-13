'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';

interface ImageModalProps {
  images: string[];
  videos?: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ images, videos = [], initialIndex = 0, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const allMedia = [...images, ...videos];
  const currentMedia = allMedia[currentIndex];
  const isImage = currentIndex < images.length;

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, zoom]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleNext = () => {
    if (currentIndex < allMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  if (!isOpen || allMedia.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
              {/* Header avec contrôles */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md rounded-lg px-4 py-2">
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {allMedia.length}
                  </span>
                </div>

                {/* Contrôles de zoom */}
                {isImage && (
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md rounded-lg px-2 py-2">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoom <= 0.5}
                      className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Zoom out (-)"
                    >
                      <MagnifyingGlassMinusIcon className="w-5 h-5" />
                    </button>
                    <span className="text-white text-sm font-medium min-w-[60px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoom >= 3}
                      className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Zoom in (+)"
                    >
                      <MagnifyingGlassPlusIcon className="w-5 h-5" />
                    </button>
                    {zoom > 1 && (
                      <button
                        onClick={handleResetZoom}
                        className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors ml-2 text-xs"
                        title="Reset zoom"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                )}

                {/* Bouton fermer */}
                <button
                  onClick={onClose}
                  className="p-2 bg-black/70 backdrop-blur-md text-white hover:bg-white/20 rounded-lg transition-colors"
                  title="Fermer (Esc)"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Contenu média */}
              <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                {/* Bouton précédent */}
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 z-10 p-3 bg-black/70 backdrop-blur-md text-white hover:bg-white/20 rounded-full transition-colors"
                    title="Précédent (←)"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                )}

                {/* Média */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  style={{
                    cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                >
                  {isImage ? (
                    <motion.div
                      animate={{
                        scale: zoom,
                        x: position.x,
                        y: position.y,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="relative max-w-full max-h-full"
                      style={{
                        transformOrigin: 'center center',
                      }}
                    >
                      <Image
                        src={currentMedia}
                        alt={`Image ${currentIndex + 1}`}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        unoptimized
                        priority
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  ) : (
                    <div className="relative w-full max-w-5xl aspect-video">
                      <video
                        src={currentMedia}
                        controls
                        className="w-full h-full rounded-lg"
                        autoPlay
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.parentElement?.remove();
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Bouton suivant */}
                {currentIndex < allMedia.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-4 z-10 p-3 bg-black/70 backdrop-blur-md text-white hover:bg-white/20 rounded-full transition-colors"
                    title="Suivant (→)"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Miniatures en bas */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md rounded-lg px-4 py-2 overflow-x-auto max-w-[90vw] scrollbar-hide">
                    {allMedia.map((media, index) => {
                      const isMediaImage = index < images.length;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentIndex(index);
                            setZoom(1);
                            setPosition({ x: 0, y: 0 });
                          }}
                          className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            currentIndex === index
                              ? 'border-blue-500 scale-110'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          {isMediaImage ? (
                            <Image
                              src={media}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <span className="text-white text-xs">🎥</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-md rounded-lg px-4 py-2 text-white text-xs">
                <div className="space-y-1">
                  <div>← → Navigation</div>
                  {isImage && <div>+ - Zoom | Ctrl+Molette</div>}
                  <div>Esc Fermer</div>
                </div>
              </div>
            </div>
          </motion.div>

          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

