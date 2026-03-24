import { useState, useEffect, useRef } from "react";
import { allUsers, MockUser } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { Search, MapPin, Navigation, Filter, Star, BadgeCheck, Phone, MessageSquare, X, ChevronDown, Layers, Clock, Flame, Users } from "lucide-react";

function ProviderPin({ user, onClick }: { user: MockUser; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
      style={{
        left: `${((user.lng - 36.65) / 0.5) * 100}%`,
        top: `${((-user.lat + -1.1) / 0.4) * 100}%`,
      }}
    >
      <div className={`w-8 h-8 rounded-full border-2 ${user.isOnline ? "border-primary redbee-glow" : "border-muted-foreground"} overflow-hidden bg-card`}>
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      </div>
      {user.isOnline && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full status-online animate-pulse-dot" />}
      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border border-border rounded-lg p-2 shadow-xl w-40 z-20">
        <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
        <p className="text-[10px] text-primary">{user.service || "User"}</p>
        <p className="text-[10px] text-muted-foreground">{user.location}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 text-secondary fill-secondary" />
          <span className="text-[10px] text-foreground">{user.rating}</span>
        </div>
      </div>
    </button>
  );
}

export default function DiscoverView() {
  const { navigate } = useView();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceMode, setServiceMode] = useState<"comes-to-me" | "i-go">("comes-to-me");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [providers, setProviders] = useState(allUsers.filter(u => u.role !== "user"));
  const [nearbyUsers, setNearbyUsers] = useState(allUsers.slice(0, 10));
  const [userLocation] = useState("Nairobi CBD");

  // Rotate nearby suggestions every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyUsers(allUsers.sort(() => Math.random() - 0.5).slice(0, 10));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredProviders = providers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-[calc(100vh-var(--nav-h))] overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-muted">
        <div className="relative w-full h-full" style={{ background: "radial-gradient(circle at 50% 50%, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)" }}>
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={`h${i}`} className="absolute w-full border-t border-foreground/10" style={{ top: `${(i + 1) * 5}%` }} />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={`v${i}`} className="absolute h-full border-l border-foreground/10" style={{ left: `${(i + 1) * 5}%` }} />
            ))}
          </div>

          {/* Provider pins */}
          {filteredProviders.map(user => (
            <ProviderPin key={user.id} user={user} onClick={() => setSelectedUser(user)} />
          ))}

          {/* User location pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 rounded-full bg-primary redbee-glow animate-pulse" />
            <div className="absolute -inset-4 rounded-full bg-primary/10 animate-ping" />
          </div>
        </div>
      </div>

      {/* Search Panel (top-left, Google Maps style) */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto sm:w-96 z-30 space-y-3">
        <div className="bg-card rounded-xl border border-border shadow-xl p-3">
          {/* Your location */}
          <div className="flex items-center gap-2 pb-2 border-b border-border mb-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <input
              value={userLocation}
              readOnly
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Your Location (auto-detected)"
            />
            <Navigation className="w-4 h-4 text-primary cursor-pointer" />
          </div>

          {/* Service search */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Search service or destination..."
            />
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Service mode toggle */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setServiceMode("comes-to-me")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${serviceMode === "comes-to-me" ? "redbee-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              🏠 Provider comes to me
            </button>
            <button
              onClick={() => setServiceMode("i-go")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${serviceMode === "i-go" ? "redbee-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              🚶 I go to provider
            </button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:border-primary flex items-center gap-1">
            <Flame className="w-3 h-3 text-primary" /> Popular near you
          </button>
          <button className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:border-primary flex items-center gap-1">
            <Star className="w-3 h-3 text-secondary" /> Top rated
          </button>
          <button className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:border-primary flex items-center gap-1">
            <Clock className="w-3 h-3" /> Available now
          </button>
          <button onClick={() => setFilterOpen(!filterOpen)} className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:border-primary flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filters
          </button>
        </div>

        {/* Nearby suggestions */}
        <div className="bg-card rounded-xl border border-border shadow-xl max-h-64 overflow-y-auto">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1"><Users className="w-3 h-3 text-primary" /> Near You</span>
            <span className="text-[10px] text-muted-foreground">{nearbyUsers.length} found</span>
          </div>
          {nearbyUsers.map(user => (
            <button key={user.id} onClick={() => setSelectedUser(user)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent text-left border-b border-border/50 last:border-0">
              <div className="relative shrink-0">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                {user.isOnline && <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full status-online border border-card" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-foreground truncate">{user.name}</span>
                  {user.isVerified && <BadgeCheck className="w-3 h-3 text-primary fill-primary/20 shrink-0" />}
                </div>
                <p className="text-[10px] text-primary">{user.service}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" /><span className="text-[10px] text-foreground">{user.rating}</span></div>
                <span className="text-[10px] text-muted-foreground">{user.location}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected user panel */}
      {selectedUser && (
        <div className="absolute bottom-20 md:bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30">
          <div className="bg-card rounded-xl border border-border shadow-xl p-4">
            <button onClick={() => setSelectedUser(null)} className="absolute top-2 right-2 p-1 rounded-lg hover:bg-accent">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <img src={selectedUser.avatar} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">{selectedUser.name}</span>
                  {selectedUser.isVerified && <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />}
                </div>
                <p className="text-sm text-primary">{selectedUser.service}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" />{selectedUser.rating}</span>
                  <span><MapPin className="w-3 h-3 inline" /> {selectedUser.location}</span>
                  <span>ETA: ~{Math.floor(Math.random() * 30) + 5} min</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate("provider-page", { userId: selectedUser.id })}
                className="flex-1 py-2 rounded-lg redbee-gradient-bg text-primary-foreground text-sm font-semibold">
                View Profile
              </button>
              <button className="contact-btn bg-primary/10 text-primary"><Phone className="w-4 h-4" /></button>
              <button className="contact-btn bg-green-500/10 text-green-400"><MessageSquare className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <button className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-accent text-lg font-bold">+</button>
        <button className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-accent text-lg font-bold">−</button>
        <button className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent">
          <Layers className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
}
