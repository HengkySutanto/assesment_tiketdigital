import Link from "next/link";
import { notFound } from "next/navigation";
import HotelImage from "../components/HotelImage";
import SearchResults from "../components/SearchResults";

// Function to fetch hotel data from API
async function fetchHotels(searchParams) {
  // Convert searchParams to a format we can use
  const date = searchParams.date;
  const adultGuests = searchParams.adult_guests || "2";
  
  if (!date) {
    return { success: false, error: "Date is required" };
  }
  
  // Construct API URL with query parameters
  const apiUrl = new URL("https://ota-gin.onrender.com/api/v1/hotels/search");
  apiUrl.searchParams.set("date", date);
  apiUrl.searchParams.set("adult_guests", adultGuests);
  
  // Add optional parameters if they exist
  const hotelId = searchParams.hotel_id;
  const cityId = searchParams.city_id;
  
  if (hotelId) apiUrl.searchParams.set("hotel_id", hotelId);
  if (cityId) apiUrl.searchParams.set("city_id", cityId);
  
  try {
    const response = await fetch(apiUrl.toString(), { next: { revalidate: 60 } });
    
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

export default async function SearchPage({ searchParams }) {
  const destination = searchParams.destination || "Jakarta";
  const formattedDate = searchParams.formatted_date || "12 Mar - 14 Mar 2025";
  const guests = searchParams.guests || "2 Tamu 2 Kamar";
  
  // Fetch hotel data
  const result = await fetchHotels(searchParams);
  
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
                <div className="font-medium">{destination}</div>
              </div>
              <div className="border-r pr-4">
                <div className="text-xs text-gray-500">Tanggal Menginap</div>
                <div className="font-medium">{formattedDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Jumlah Tamu dan Kamar</div>
                <div className="font-medium">{guests}</div>
              </div>
            </div>
            <Link href="/" className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm">
              Ubah Pencarian
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
          <h2 className="font-bold mb-4">Filter Pencarian</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Bintang Hotel</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(stars => (
                <div key={stars} className="flex items-center">
                  <input type="checkbox" id={`star${stars}`} className="mr-2" />
                  <label htmlFor={`star${stars}`} className="flex">
                    {Array.from({ length: stars }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Fasilitas</h3>
            <div className="space-y-2">
              {[
                { id: 'pool', label: 'Kolam Renang' },
                { id: 'parking', label: 'Parkir Gratis' },
                { id: 'restaurant', label: 'Pusat Kebugaran' },
                { id: 'spa', label: 'SPA' },
                { id: 'laundry', label: 'Mesin Cuci' }
              ].map(facility => (
                <div key={facility.id} className="flex items-center">
                  <input type="checkbox" id={facility.id} className="mr-2" />
                  <label htmlFor={facility.id}>{facility.label}</label>
                </div>
              ))}
            </div>
            <button className="text-blue-500 text-sm mt-2">+ Tampilkan lebih banyak</button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Harga</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">IDR 0</span>
              <span className="text-sm">IDR 999.999.999</span>
            </div>
            <input type="range" className="w-full" min="0" max="999999999" />
          </div>
        </div>
        
        {/* Results Section - Pass data to client component */}
        <SearchResults result={result} />
      </div>
    </div>
  );
} 