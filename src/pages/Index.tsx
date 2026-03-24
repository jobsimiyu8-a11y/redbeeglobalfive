import { ViewProvider, useView } from "@/lib/view-context";
import { AuthProvider } from "@/lib/auth-context";
import RedBeeNavbar from "@/components/RedBeeNavbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import SocialFeedView from "@/views/SocialFeedView";
import ProviderProfileView from "@/views/ProviderProfileView";
import AgencyProfileView from "@/views/AgencyProfileView";
import DiscoverView from "@/views/DiscoverView";
import BookingsView from "@/views/BookingsView";
import DashboardView from "@/views/DashboardView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import MessengerView from "@/views/MessengerView";
import SettingsView from "@/views/SettingsView";

function ViewRouter() {
  const { currentView } = useView();

  return (
    <div className="min-h-screen pt-[var(--nav-h)]">
      {currentView === "feed" && <SocialFeedView />}
      {currentView === "discover" && <DiscoverView />}
      {currentView === "provider-page" && <ProviderProfileView />}
      {currentView === "agency-page" && <AgencyProfileView />}
      {currentView === "bookings" && <BookingsView />}
      {currentView === "dashboard" && <DashboardView />}
      {currentView === "my-profile" && <ProviderProfileView />}
      {currentView === "register" && <RegisterView />}
      {currentView === "login" && <LoginView />}
      {currentView === "messenger" && <MessengerView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}

export default function Index() {
  return (
    <AuthProvider>
      <ViewProvider>
        <RedBeeNavbar />
        <ViewRouter />
        <MobileBottomNav />
      </ViewProvider>
    </AuthProvider>
  );
}
