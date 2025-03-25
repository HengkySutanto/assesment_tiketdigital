'use client';

import HotelImage from "./HotelImage";
import { useRouter } from "next/navigation";

export default function SearchResults({ result }) {
  const router = useRouter();

  const handleViewDetail = (hotelId) => {
    router.push(`/hotel-detail?id=${hotelId}`);
  };
  
  return (
    <div className="w-full md:w-3/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Hasil Pencarian</h2>
        {result.success && result.data?.data?.data && (
          <span className="text-sm text-gray-500">{result.data.data.data.length} Hotel Ditemukan</span>
        )}
      </div>
      
      {/* Error Notification */}
      {!result.success && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{result.error}</p>
          <p className="text-sm">Silakan coba lagi atau ubah parameter pencarian Anda.</p>
        </div>
      )}
      
      {/* Empty Data Notification */}
      {result.success && (!result.data?.data?.data || result.data.data.data.length === 0) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Tidak ada hotel yang ditemukan</p>
          <p className="text-sm">Silakan coba dengan parameter pencarian yang berbeda.</p>
        </div>
      )}
      
      {/* Hotel List */}
      {result.success && result.data?.data?.data && result.data.data.data.length > 0 && (
        <div className="space-y-6">
          {result.data.data.data.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 relative">
                  <HotelImage 
                    src={hotel.images && hotel.images[0] ? hotel.images[0].replace(/[\[\]']/g, '').trim() : "/hotel-placeholder.jpg"} 
                    alt={hotel.name}
                  />
                </div>
                <div className="p-4 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{hotel.name}</h3>
                      <div className="flex">
                        {Array.from({ length: hotel.star || 0 }).map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm flex items-center text-gray-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {hotel.address}, {hotel.city?.name}, {hotel.city?.country}
                    </p>
                    
                    <div className="flex flex-wrap mt-3 gap-2">
                      {hotel.facilities && hotel.facilities.slice(0, 4).map((facility, i) => (
                        <div key={i} className="bg-gray-100 text-xs px-2 py-1 rounded">
                          {facility.replace(/[\[\]']/g, '').trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetail(hotel.id)}
                        className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded"
                      >
                        Lihat detail
                      </button>
                      <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded">Pilih kamar</button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        IDR {hotel.rooms && hotel.rooms[0] ? hotel.rooms[0].price.toLocaleString('id-ID') : '0'}
                      </div>
                      <div className="text-xs text-gray-500">/malam</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Pagination */}
          <div className="flex justify-end items-center mt-6">
            <span className="mr-4 text-sm">Halaman</span>
            <div className="flex space-x-1">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">1</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">2</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">3</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">4</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">5</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 