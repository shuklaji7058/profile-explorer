import React from "react";

const ProfileDetails = ({ profile }) => {
  const handleViewDetails = () => {
    const detailsWindow = window.open("", "_blank");
    detailsWindow.document.write(`
      <html>
        <head>
          <title>${profile.name} - Details</title>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <style>
            
            .map-container {
              position: relative;
              height: 400px; 
              width: 100%;
              border-radius: 0.5rem;
              overflow: hidden;
            }
            
            #map {
              height: 100% !important;
              width: 100% !important;
            }
            
            .content-section {
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              padding: 1.5rem;
              margin-bottom: 1.5rem;
            }
          </style>
        </head>
        <body class="bg-gray-50">
          <div id="loading-overlay" class="loader-container">
            <div class="text-center">
              <div class="loader mb-4"></div>
              <p class="text-gray-600 font-medium">Loading profile details...</p>
            </div>
          </div>

          <div id="content-container" class="content-container">
            <div class="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
              <h2 class="text-2xl font-semibold">${profile.name}</h2>
              <button 
                onclick="window.close()" 
                class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>

            <div class="container mx-auto p-6 max-w-5xl">
              <div class="content-section mb-6">
                <div class="flex items-start gap-6">
                  <img 
                    src="${profile.image}" 
                    alt="${profile.name}" 
                    class="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 class="text-xl font-semibold mb-2">${profile.name}</h3>
                    <p class="text-gray-600 mb-4">${profile.description}</p>
                  </div>
                </div>
              </div>

              <div class="content-section">
                <h3 class="text-xl font-semibold mb-4">Location</h3>
                <div class="map-container">
                  <div id="map"></div>
                </div>
                <p class="mt-4 text-gray-600">
                  <span class="font-medium">Address:</span> ${profile.address}
                </p>
              </div>

              <div class="content-section">
                <h3 class="text-xl font-semibold mb-4">Contact Information</h3>
                <div class="space-y-2">
                  <p class="flex items-center">
                    <span class="font-medium w-20">Email:</span>
                    <span class="text-gray-600">${profile.contact.email}</span>
                  </p>
                  <p class="flex items-center">
                    <span class="font-medium w-20">Phone:</span>
                    <span class="text-gray-600">${profile.contact.phone}</span>
                  </p>
                </div>
              </div>

              <div class="content-section">
                <h3 class="text-xl font-semibold mb-4">Interests</h3>
                <div class="flex flex-wrap gap-2">
                  ${profile.interests
                    .map(
                      (interest) => `
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        ${interest}
                      </span>
                    `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>

          <script>
            async function init() {
              try {
                await new Promise((resolve, reject) => {
                  const script = document.createElement('script');
                  script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
                  script.onload = resolve;
                  script.onerror = reject;
                  document.head.appendChild(script);
                });

                const map = L.map('map').setView([${profile.coordinates.lat}, ${
      profile.coordinates.lng
    }], 13);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                
                L.marker([${profile.coordinates.lat}, ${
      profile.coordinates.lng
    }])
                  .addTo(map)
                  .bindPopup("${profile.address}")
                  .openPopup();

                map.whenReady(() => {
                  document.getElementById('loading-overlay').style.display = 'none';
                  document.getElementById('content-container').classList.add('loaded');
                  map.invalidateSize();
                });
              } catch (error) {
                console.error('Error loading map:', error);
                document.getElementById('loading-overlay').innerHTML = \`
                  <div class="text-center">
                    <p class="text-red-600">Error loading map. Please try again.</p>
                    <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      Retry
                    </button>
                  </div>
                \`;
              }
            }

            window.addEventListener('load', init);
          </script>
        </body>
      </html>
    `);
    detailsWindow.document.close();
  };

  return (
    <button
      onClick={handleViewDetails}
      className="px-4 py-2 rounded border border-gray-500 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
    >
      View Details
    </button>
  );
};
export default ProfileDetails;
