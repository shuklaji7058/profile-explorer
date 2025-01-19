export const initialProfiles = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Frontend Developer with a passion for design",
    address: "789 Creative Blvd, Austin, TX",
    image: "/images/alice.png", // Update path
    coordinates: { lat: 30.2672, lng: -97.7431 },
    interests: ["Design", "JavaScript", "Traveling"],
    contact: {
      email: "alice@example.com",
      phone: "(555) 111-2222",
    },
  },
  {
    id: 2,
    name: "Bob Williams",
    description: "Backend Developer specializing in Node.js",
    address: "123 Backend St, Denver, CO",
    image: "/images/bob.png", // Update path
    coordinates: { lat: 39.7392, lng: -104.9903 },
    interests: ["Node.js", "APIs", "Mountain Biking"],
    contact: {
      email: "bob@example.com",
      phone: "(555) 333-4444",
    },
  },
  // ... update other profile image paths similarly
];
