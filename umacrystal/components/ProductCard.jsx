"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Info } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ImageGallery from "@/components/ImageGallery";

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getWhatsAppLink = (message) => {
    return `https://wa.me/919510010383?text=${encodeURIComponent(message)}`;
  };

  // Handle both old single-image format and new multi-media format
  const media = product.media || (product.image ? [{ type: "image", url: product.image }] : []);
  const primaryImage = media[0]?.url || product.image;

  return (
    <>
      {/* Product Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-100 transition duration-300 ease-in-out flex flex-col h-full group">
        <div 
          className="relative aspect-square overflow-hidden bg-background cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {media.length > 1 && (
            <div className="absolute top-3 right-3 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-semibold z-10">
              +{media.length - 1}
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-heading font-bold text-xl text-text mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gold font-semibold text-lg mb-3">
            ₹ {product.price} <span className="text-sm font-normal text-gray-400">/ Piece</span>
          </p>
          
          <div className="space-y-1 mb-5 flex-grow">
            {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
              <p key={key} className="text-xs text-gray-500 flex justify-between">
                <span>{key}:</span>
                <span className="font-medium text-gray-700">{value}</span>
              </p>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-3 bg-background hover:bg-light/30 text-primary rounded-lg text-sm font-medium transition-colors border border-light/50 flex justify-center items-center"
            >
              <Info className="w-4 h-4 mr-1.5" />
              Details
            </button>
            <a 
              href={getWhatsAppLink(product.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors flex justify-center items-center shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 mr-1.5" />
              Quote
            </a>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 opacity-100">
          <div 
            className="absolute inset-0 bg-text/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all flex flex-col md:flex-row">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-600 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-background p-4 flex flex-col justify-between">
              <div>
                <ImageGallery media={media} productName={product.name} />
              </div>
              <div className="hidden md:block pt-6 mt-6 border-t border-gray-100">
                <a 
                  href={getWhatsAppLink(product.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#1EBE5D] hover:bg-[#25D366] hover:text-white hover:border-transparent rounded-full font-body font-semibold tracking-wider text-xs uppercase transition-all duration-300 flex justify-center items-center shadow-sm hover:shadow-[0_4px_15px_rgba(37,211,102,0.15)] hover:-translate-y-0.5 group"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Request Quote via WhatsApp
                </a>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Clicking this button will open WhatsApp with a pre-filled message.
                </p>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="mb-2 uppercase text-xs font-semibold tracking-wider text-secondary">
                {product.id.split('-').join(' ')}
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
                {product.name}
              </h2>
              <div className="text-2xl font-bold text-gold mb-6 border-b pb-6">
                ₹ {product.price} <span className="text-lg font-normal text-gray-500">/ Piece</span>
              </div>
              
              <h4 className="font-semibold text-text mb-3">Specifications</h4>
              <div className="bg-background rounded-lg p-4 mb-6 space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium text-text text-right">{value}</span>
                  </div>
                ))}
              </div>
              
              {product.description && (
                <div className="mb-6">
                  <h4 className="font-semibold text-text mb-3">Description</h4>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 rounded-lg p-4 border border-gray-100 max-h-60 overflow-y-auto">
                    {product.description}
                  </div>
                </div>
              )}
              
              <div className="mt-auto pt-4 block md:hidden">
                <a 
                  href={getWhatsAppLink(product.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#1EBE5D] hover:bg-[#25D366] hover:text-white hover:border-transparent rounded-full font-body font-semibold tracking-wider text-xs uppercase transition-all duration-300 flex justify-center items-center shadow-sm hover:shadow-[0_4px_15px_rgba(37,211,102,0.15)] hover:-translate-y-0.5 group"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Request Quote via WhatsApp
                </a>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Clicking this button will open WhatsApp with a pre-filled message.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
