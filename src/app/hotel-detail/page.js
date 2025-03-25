import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Function to fetch hotel data by ID
async function fetchHotelDetail(id) {
  if (!id) return { success: false, error: "Hotel ID is required" };
  
  try {
    const response = await fetch(`https://ota-gin.onrender.com/api/v1/hotels/${id}`, { 
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      return { 
        success: false, 
        error: `API error: ${response.status} ${response.statusText}`,
        statusCode: response.status
      };
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    return { success: false, error: "Failed to fetch hotel data" };
  }
}

export default async function HotelDetailPage({ searchParams }) {
  const hotelId = searchParams.id;
  
  // For demo purposes, we'll use static data since the API might not be available
  const hotel = {
    id: hotelId || 1,
    name: "Hilton Garden Inn",
    address: "Jl. Taman Palem Lestari No.1 Blok B13, West Cengkareng, Cengkareng, West Jakarta City, Jakarta 11730",
    star: 5,
    description: "Berlokasi di Cengkareng, Jakarta Barat, Hilton Garden Inn Jakarta Taman Palem menawarkan kamar dengan gaya menenangkan perpaduan yang nyaman ditingkatkan dengan layanan hospitality 24 jam dan fasilitas hebat.",
    facilities: [
      "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang", 
      "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang",
      "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang", "Kolam Renang"
    ],
    rooms: [
      {
        id: 1,
        name: "Kamar, 2 Tempat Tidur Twin",
        price: 999999999,
        bed_type: "Twin Bed",
        size: 24,
        guest_capacity: 2,
        is_breakfast_included: true,
        available_rooms: 5
      },
      {
        id: 2,
        name: "Kamar Suite",
        price: 999999999,
        bed_type: "Twin Bed",
        size: 42,
        guest_capacity: 2,
        is_breakfast_included: true,
        available_rooms: 3
      }
    ],
    policy: "Check-in time: 14:00, Check-out time: 12:00. No pets allowed.",
    city: {
      name: "Jakarta",
      country: "Indonesia"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">STAYKUY</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:block">My Booking</a>
            <a href="#" className="hidden sm:block">Wishlist</a>
            <a href="#" className="hidden sm:block">Blog</a>
            <a href="#" className="hidden sm:block">Help</a>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span>T</span>
            </div>
            <span className="hidden sm:block">ID</span>
          </div>
        </div>
      </nav>

      {/* Search Form Summary */}
      <div className="border-b shadow-sm">
        <div className="container mx-auto py-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            <div className="grid grid-cols-3 w-full gap-4 border-r pr-4">
              <div className="border-r pr-4">
                <div className="text-xs text-gray-500">Kota/Nama Hotel/ Destinasi</div>
                <div className="font-medium">Jakarta</div>
              </div>
              <div className="border-r pr-4">
                <div className="text-xs text-gray-500">Tanggal Menginap</div>
                <div className="font-medium">12 Mar - 14 Mar 2025</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Jumlah Tamu dan Kamar</div>
                <div className="font-medium">2 Tamu 2 Kamar</div>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm">
              Ubah Pencarian
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Detail */}
      <div className="container mx-auto py-6">
        {/* Hotel Name and Rating */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{hotel.name}</h1>
          <div className="flex items-center mt-1">
            {Array.from({ length: hotel.star }).map((_, i) => (
              <span key={i} className="text-yellow-400">⭐</span>
            ))}
          </div>
          <p className="text-sm mt-2 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{hotel.address}</span>
          </p>
        </div>

        {/* Hotel Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
          <div className="col-span-2 row-span-2 relative h-80">
            <Image 
              src="/image-hotel-dummy.webp" 
              alt={hotel.name} 
              fill 
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative h-40">
              <Image 
                src="/image-hotel-dummy.webp" 
                alt={`${hotel.name} image ${i}`} 
                fill 
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Hotel Description */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Tentang Hotel</h2>
          <p className="text-sm text-gray-700">{hotel.description}</p>
          <p className="text-sm text-gray-700 mt-2">
            Kamar ber-AC dengan desain modern dan menenangkan yang dilengkapi dengan TV layar datar, meja kerja, dan kursi yang nyaman. Kamar mandi dilengkapi dengan shower.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Restoran Garden Grille & Bar menyediakan berbagai pilihan makanan fresh, dengan konsep to-order, dan cocktail pada bar. Pilihan Restoran yang terletak dekat dengan skywalk menuju Mall Taman Palem dan Transmart Carrefour. Selain itu, para pengunjung juga dapat menikmati kopi Starbucks yang merupakan bagian dari amenities di dalam hotel.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Lokasi hotel strategis di Bandara Soekarno Hatta karena 9.0 km dari hotel. Tidak ada shuttle yang menuju Bandara Hotel adalah Pilihan Bagi Wisatawan, Keluarga, dan Tamu Korporasi.
          </p>
        </div>

        {/* Hotel Facilities */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Fasilitas Hotel</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {hotel.facilities.map((facility, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{facility}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="text-blue-500 text-sm">Tampilkan Semua Fasilitas</button>
          </div>
        </div>

        {/* Room Types */}
        <div>
          <h2 className="font-bold mb-4">Tipe dan Harga Kamar</h2>
          
          {hotel.rooms.map((room, index) => (
            <div key={room.id} className={`mb-6 ${index > 0 ? 'pt-6 border-t' : ''}`}>
              {index % 2 === 0 && (
                <div className="flex mb-4">
                  <div className="w-40 h-40 relative mr-4">
                    <Image 
                      src="/image-hotel-dummy.webp" 
                      alt={room.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{room.bed_type}</h3>
                    <p className="text-sm">{room.size}m²</p>
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Breakfast</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Refundable</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">2 Tamu</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Tidak termasuk sarapan</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm">1 Twin Bed</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <span className="text-sm">Wifi gratis</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      IDR {room.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500">/malam</div>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                    Pilih Kamar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Section */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-bold mb-4">Review Hotel</h2>
          <p className="text-sm text-gray-600">Belum ada review untuk hotel ini</p>
        </div>

        {/* Location Section */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-bold mb-4">Lokasi Hotel</h2>
          <div className="bg-gray-200 h-64 rounded-lg mb-4 relative">
            <Image 
              src="/image-hotel-dummy.webp" 
              alt="Hotel location map" 
              fill 
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <p className="text-sm font-medium">Jalan Taman Palem Lestari Blok B.13 no.1, Cengkareng, Jakarta Barat</p>
          
          <div className="mt-4 space-y-2">
            <h3 className="font-medium text-sm">Jarak dengan:</h3>
            {[
              { name: "Stasiun Kereta Palem", distance: "1.5 km" },
              { name: "Bandara Soekarno-Hatta", distance: "9.0 km" },
              { name: "Mall Taman Palem", distance: "0.2 km" },
              { name: "Rumah Sakit Mitra Keluarga", distance: "1.0 km" },
              { name: "Kawasan Kuliner Anda", distance: "0.5 km" },
              { name: "Stasiun Kereta Kota", distance: "12.5 km" },
              { name: "MRT", distance: "15.0 km" }
            ].map((location, index) => (
              <div key={index} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Dekat dengan {location.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Policies */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-bold mb-4">Kebijakan Hotel</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">Property Check-in</h3>
              <p className="text-sm">Check-in 14:00-23:59</p>
              <p className="text-sm">Check-out sebelum 12:00</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Deposit</h3>
              <p className="text-sm">Tamu perlu membayar deposit saat check-in.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Sarapan</h3>
              <p className="text-sm">06:00-10:00 (Senin-Jumat), 06:00-10:30 (Sabtu-Minggu)</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Kebijakan Anak</h3>
              <p className="text-sm">Anak di bawah 6 tahun dapat menginap tanpa biaya tambahan.</p>
              <p className="text-sm">Anak di atas 6 tahf yang memerlukan tempat tidur akan dikenakan biaya tambahan. Jika terlanjur, kamu mungkin akan dikenakan biaya tambahan saat check-in.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Deposit</h3>
              <p className="text-sm">Tamu perlu membayar deposit saat check-in.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Tamu perlu menunjukkan kartu identifikasi saat check-in.</h3>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Tamu perlu menunjukkan bukti telah divaksin.</h3>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Lainnya</h3>
              <p className="text-sm">Properti ini menerima pembayaran dengan kartu kredit.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Merokok</h3>
              <p className="text-sm">Dilarang merokok di semua area.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">Hewan</h3>
              <p className="text-sm">Hewan peliharaan tidak diperbolehkan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 