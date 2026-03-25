import { useView, ViewName } from "@/lib/view-context";
import { useAuth } from "@/lib/auth-context";
import {
  Home, Compass, CalendarCheck, LayoutDashboard, User, MessageCircle, Settings,
  Bell, Bookmark, TrendingUp, Users, MapPin, Star, Shield, CreditCard, Gift, Zap, Heart
} from "lucide-react";

const mainNav: { icon: typeof Home; label: string; view: ViewName }[] = [
  { icon: Home, label: "Feed", view: "feed" },
  { icon: Compass, label: "Discover", view: "discover" },
  { icon: CalendarCheck, label: "Bookings", view: "bookings" },
  { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" },
  { icon: MessageCircle, label: "Messenger", view: "messenger" },
  { icon: User, label: "My Profile", view: "my-profile" },
  { icon: Settings, label: "Settings", view: "settings" },
];

const shortcuts = [
  { icon: Bookmark, label: "Saved Posts" },
  { icon: TrendingUp, label: "Trending" },
  { icon: Users, label: "Groups" },
  { icon: Star, label: "Favorites" },
  { icon: Gift, label: "Gifts & Rewards" },
  { icon: Heart, label: "Liked Posts" },
  { icon: Zap, label: "Go Premium" },
];

export default function LeftSidebar() {
  const { navigate, currentView } = useView();
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-[var(--nav-h)] h-[calc(100vh-var(--nav-h))] overflow-y-auto scrollbar-hide pb-8">
      {/* Profile card */}
      {isAuthenticated && (
        <button onClick={() => navigate("my-profile")} className="w-full flex items-center gap-3 p-4 hover:bg-accent rounded-xl transition-colors mb-2">
          <div className="relative">
            <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=me"} alt="" className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card status-online" />
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{user?.displayName}</p>
            <p className="text-xs text-muted-foreground">@{user?.username}</p>
          </div>
        </button>
      )}

      {/* Main nav */}
      <nav className="space-y-0.5 px-2">
        {mainNav.map(item => (
          <button key={item.view} onClick={() => navigate(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentView === item.view ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <hr className="border-border my-4 mx-4" />

      {/* Shortcuts */}
      <div className="px-4 mb-2">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Shortcuts</span>
      </div>
      <nav className="space-y-0.5 px-2">
        {shortcuts.map((item, i) => (
          <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 mt-6">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          RedBee Platform v1.0 © 2026<br />
          <span className="text-primary cursor-pointer hover:underline">Terms</span> · <span className="text-primary cursor-pointer hover:underline">Privacy</span> · <span className="text-primary cursor-pointer hover:underline">Help</span>
        </p>
      </div>
    </aside>
  );
}
