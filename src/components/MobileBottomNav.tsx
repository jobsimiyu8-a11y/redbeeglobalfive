import { useView, ViewName } from "@/lib/view-context";
import { Home, Compass, CalendarCheck, LayoutDashboard, User } from "lucide-react";

const items: { icon: typeof Home; label: string; view: ViewName }[] = [
  { icon: Home, label: "Feed", view: "feed" },
  { icon: Compass, label: "Discover", view: "discover" },
  { icon: CalendarCheck, label: "Bookings", view: "bookings" },
  { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" },
  { icon: User, label: "Profile", view: "my-profile" },
];

export default function MobileBottomNav() {
  const { currentView, navigate } = useView();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-xl border-t border-border h-[var(--bottom-nav-h)]">
      <div className="flex items-center justify-around h-full">
        {items.map(({ icon: Icon, label, view }) => (
          <button
            key={view}
            onClick={() => navigate(view)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
              currentView === view ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
