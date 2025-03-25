'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HotelImage({ src, alt }) {
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState("/hotel-placeholder.jpg");
  
  // Only update the image source after the component has mounted
  useEffect(() => {
    setMounted(true);
    if (src) {
      setImgSrc(src);
    }
  }, [src]);
  
  // If not mounted yet, render a placeholder div to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-gray-300"></div>
      </div>
    );
  }
  
  return (
    <Image 
      src={imgSrc} 
      alt={alt || "Hotel image"}
      fill
      style={{ objectFit: 'cover' }}
      onError={() => setImgSrc("/hotel-placeholder.jpg")}
    />
  );
} 