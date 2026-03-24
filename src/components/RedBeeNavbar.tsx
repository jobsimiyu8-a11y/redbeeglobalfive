import { useView, ViewName } from "@/lib/view-context";
import { useAuth } from "@/lib/auth-context";
import { Search, Bell, MessageCircle, Settings, Menu, X, ChevronDown, LogOut, User, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function RedBeeNavbar() {
  const { navigate, currentView } = useView();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [messageCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems: { label: string; view: ViewName }[] = [
    { label: "Feed", view: "feed" },
    { label: "Discover", view: "discover" },
    { label: "Bookings", view: "bookings" },
    { label: "Dashboard", view: "dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-h)] bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <button onClick={() => navigate("feed")} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg redbee-gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">RB</span>
          </div>
          <span className="font-display font-bold text-lg redbee-gradient-text hidden sm:block">RedBee</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.view
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={`${searchOpen ? "flex" : "hidden"} md:flex items-center flex-1 max-w-md mx-4`}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search providers, services..."
              className="w-full bg-muted rounded-full pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded-lg hover:bg-accent">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {isAuthenticated && (
            <>
              <button onClick={() => navigate("messenger")} className="relative p-2 rounded-lg hover:bg-accent">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                {messageCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 redbee-gradient-bg rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {messageCount}
                  </span>
                )}
              </button>
              <button onClick={() => { setNotifications(0); }} className="relative p-2 rounded-lg hover:bg-accent">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 redbee-gradient-bg rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>
              <button onClick={() => navigate("settings")} className="p-2 rounded-lg hover:bg-accent hidden sm:block">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent"
                >
                  <div className="relative">
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=me`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary/30 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card status-online" />
                  </div>
                  <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl border border-border shadow-xl py-2 z-50">
                    <button onClick={() => { navigate("my-profile"); setProfileDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent text-left">
                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button onClick={() => { navigate("settings"); setProfileDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent text-left">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button onClick={() => { navigate("discover"); setProfileDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent text-left">
                      <MapPin className="w-4 h-4" /> Discover Map
                    </button>
                    <hr className="border-border my-1" />
                    <button onClick={() => { logout(); setProfileDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-accent text-left">
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("login")} className="px-4 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Login
              </button>
              <button onClick={() => navigate("register")} className="px-4 py-1.5 text-sm font-medium rounded-full redbee-gradient-bg text-primary-foreground">
                Sign Up
              </button>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-accent">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border py-2 px-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => { navigate(item.view); setMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentView === item.view ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate("settings"); setMenuOpen(false); }}
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent"
          >
            Settings
          </button>
        </div>
      )}
    </nav>
  );
}
