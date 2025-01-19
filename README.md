# Profile Explorer

A modern web application for managing and viewing professional profiles with interactive maps and dynamic filtering capabilities.

## Features

- **Profile Management**

  - View detailed profile information
  - Interactive map integration with Leaflet
  - Add new profiles
  - Edit existing profiles
  - Delete profiles
  - Session-based data persistence

- **Advanced Filtering**

  - Search by name and description
  - Filter by location
  - Filter by interests
  - Real-time search results
  - Clear filter options

- **Admin Mode**

  - Toggle admin functionality
  - Secure profile management
  - Add/Edit/Delete capabilities
  - Form validation

- **Interactive Maps**

  - Location visualization using Leaflet
  - Custom markers for each profile
  - Address popup information
  - Responsive map controls

- **Responsive Design**
  - Mobile-friendly interface
  - Grid layout adaptation
  - Smooth transitions
  - Loading states and animations

## Technology Stack

- **Frontend Framework**: React 18.3
- **Routing**: React Router DOM 7.1
- **Mapping**: Leaflet 1.9
- **Styling**:
  - TailwindCSS 3.4
  - Lucide React (Icons)
- **Build Tool**: Vite 6.0
- **State Management**: React Hooks
- **Form Handling**: Native React Forms

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd profile-map-app

```

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

4. Build for production:

npm run build

Project Structure

profile-map-app/
├── src/
│ ├── components/
│ │ ├── common/
│ │ │ ├── LeafletMapComponents.jsx
│ │ │ ├── LoadingSpinner.jsx
│ │ │ └── MapPlaceholder.jsx
│ │ ├── Layout/
│ │ │ └── AdminControls.jsx
│ │ ├── profile/
│ │ │ ├── ProfileCard.jsx
│ │ │ ├── ProfileGrid.jsx
│ │ │ └── ProfileSearch.jsx
│ │ ├── AddProfileForm.jsx
│ │ └── Header.jsx
│ ├── data/
│ │ └── mockData.js
│ ├── hooks/
│ │ └── useProfiles.js
│ ├── pages/
│ │ └── ProfileDetailsPage.jsx
│ └── App.jsx

Features in Detail:

Profile Management-

Create new profiles with detailed information
Edit existing profile details
Delete profiles with confirmation
View detailed profile information on a separate page

Search and Filtering-

Real-time search functionality
Multiple filter criteria
Location-based filtering
Interest-based filtering
Clear and reset filter options

Map Integration-

Interactive map display for each profile
Custom markers with popup information
Responsive map controls
Loading states for map initialization

Admin Features-

Toggle admin mode for management functions
Secure profile editing capabilities
Form validation for new profiles
Error handling and user feedback

Contributing-

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

License-

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments-

Leaflet for map integration
TailwindCSS for styling
React Router for navigation
Lucide React for icons
Similar code found with 3 license types - View matches
