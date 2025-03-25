import Image from "next/image";
import { redirect } from "next/navigation";

// Mark the server action with "use server" directive
async function handleSearch(formData) {
  "use server";
  
  const destination = formData.get("destination");
  const date = formData.get("date");
  const guests = formData.get("guests") || "2 Tamu 2 Kamar";
  
  // Extract number of guests from the input
  const adultGuests = guests.split(" ")[0] || 2;
  
  // Format date for display (assuming input is in YYYY-MM-DD format)
  let formattedDate = date;
  try {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    formattedDate = `${day} ${month} - ${day + 2} ${month} ${year}`;
  } catch (e) {
    console.error("Date formatting error:", e);
  }
  
  // Create search params
  const searchParams = new URLSearchParams();
  if (destination) searchParams.set("destination", destination);
  searchParams.set("date", date);
  searchParams.set("adult_guests", adultGuests);
  searchParams.set("formatted_date", formattedDate);
  searchParams.set("guests", guests);
  
  // Redirect to search results page
  redirect(`/search?${searchParams.toString()}`);
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">STAYKUY</div>
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

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/lobby-center.png"
            alt="Hotel Lobby"
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom center' }}
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-0 py-16">
          {/* Heading */}
          <div className="text-white text-center mb-12">
            <h1 className="text-xl sm:text-2xl mb-4">
              Staycation menjadi lebih mudah hanya dengan satu klik dan dapatkan banyak promo menarik!
            </h1>
          </div>

          {/* Search Form */}
          <form action={handleSearch} className="bg-white rounded-lg p-6 w-full">
            <div className="flex flex-col md:flex-row items-end gap-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pilih Kota/Nama Hotel/ Destinasi</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Pilih nama hotel/destinasi/kota menginap"
                    className="w-full p-3 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Menginap</label>
                  <input
                    type="date"
                    name="date"
                    required
                    placeholder="Pilih tanggal menginap"
                    className="w-full p-3 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Tamu dan Kamar</label>
                  <input
                    type="text"
                    name="guests"
                    placeholder="Masukan jumlah tamu dan kamar"
                    defaultValue="2 Tamu 2 Kamar"
                    className="w-full p-3 border rounded-md text-sm"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="text-sm bg-blue-500 border border-blue-500 text-white px-6 py-3 rounded-md font-medium text-nowrap flex-shrink-0 md:mt-0 mt-4 w-full md:w-auto"
              >
                Cari Hotel
              </button>
            </div>
          </form>

          {/* Recent Searches Button */}
          <div className="mt-6 self-start">
            <button className="bg-blue-800 text-sm text-white px-4 py-2 rounded-md flex items-center">
              Lihat Pencarian Terakhir-mu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
