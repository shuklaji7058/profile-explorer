import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AdminControls from "./components/layout/AdminControls";
import ProfileGrid from "./components/profile/ProfileGrid";
import { useProfiles } from "./hooks/useProfiles";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";

const App = () => {
  const {
    profiles,
    isAdminMode,
    isLoading,
    filters,
    setFilters,
    availableInterests,
    availableLocations,
    setIsAdminMode,
    handleDelete,
    addProfile,
    handleUpdateProfile,
  } = useProfiles();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <main className="container mx-auto px-4 py-8">
                <Header
                  isAdminMode={isAdminMode}
                  setIsAdminMode={setIsAdminMode}
                  filters={filters}
                  setFilters={setFilters}
                  availableInterests={availableInterests}
                  availableLocations={availableLocations}
                />

                {isAdminMode && <AdminControls onAddProfile={addProfile} />}

                <ProfileGrid
                  profiles={profiles}
                  isLoading={isLoading}
                  isAdminMode={isAdminMode}
                  onDelete={handleDelete}
                  onUpdateProfile={handleUpdateProfile} // Add this
                />
              </main>
            }
          />
          <Route
            path="/profile/:id"
            element={<ProfileDetailsPage profiles={profiles} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
