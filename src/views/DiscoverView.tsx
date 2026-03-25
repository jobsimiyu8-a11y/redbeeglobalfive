import { useState, useEffect } from "react";
import { allUsers, MockUser } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import {
  Search, MapPin, Navigation, Filter, Star, BadgeCheck, Phone, MessageSquare, X,
  Layers, Clock, Flame, Users, Video, Calendar, DollarSign, Home, Building, Hotel,
  Thermometer, Route, Zap
} from "lucide-react";
import ProfileHoverCard from "@/components/ProfileHoverCard";

function ProviderPin({ user, onClick }: { user: MockUser; onClick: () => void }) {
  const serviceIcons: Record<string, string> = {
    Plumber: "🔧", Electrician: "⚡", "Hair Stylist": "💇", Mechanic: "🔩",
    Tutor: "📚", Cleaner: "🧹", Chef: "🍳", Photographer: "📸",
    "Fitness Trainer": "🏋️", Driver: "🚗", Nurse: "🏥", Tailor: "✂️",
  };

  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
      style={{
        left: `${((user.lng - 36.55) / 0.6) * 100}%`,
        top: `${((-user.lat + -1.05) / 0.5) * 100}%`,
      }}
    >
      <div className={`w-9 h-9 rounded-full border-2 ${user.isOnline ? "border-primary redbee-glow" : "border-muted-foreground"} overflow-hidden bg-card transition-transform group-hover:scale-125`}>
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      </div>
      {user.isOnline && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full status-online animate-pulse-dot" />}
      {/* Hover tooltip */}
      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border border-border rounded-lg p-2.5 shadow-xl w-48 z-20">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
          {user.isVerified && <BadgeCheck className="w-3 h-3 text-primary fill-primary/20" />}
        </div>
        <p className="text-[10px] text-primary">{serviceIcons[user.service || ""] || "🔹"} {user.service || "User"}</p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{user.location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" /><span className="text-[10px] text-foreground">{user.rating}</span></span>
          <span className="text-[10px] text-muted-foreground">ETA: ~{Math.floor(Math.random() * 30) + 5}min</span>
        </div>
        <p className="text-[10px] text-secondary font-medium mt-1">KES {(Math.floor(Math.random() * 5) + 1) * 1000}</p>
      </div>
    </button>
  );
}

function HeatmapDot({ x, y, intensity }: { x: number; y: number; intensity: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${20 + intensity * 30}px`,
        height: `${20 + intensity * 30}px`,
        background: `radial-gradient(circle, hsl(0 80% 55% / ${intensity * 0.4}) 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default function DiscoverView() {
  const { navigate } = useView();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceMode, setServiceMode] = useState<"comes-to-me" | "i-go">("comes-to-me");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [providers, setProviders] = useState(allUsers.filter(u => u.role !== "user"));
  const [nearbyUsers, setNearbyUsers] = useState(allUsers.slice(0, 12));
  const [userLocation] = useState("Nairobi CBD");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Rotate nearby every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyUsers(allUsers.sort(() => Math.random() - 0.5).slice(0, 12));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulate provider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setProviders(prev => prev.map(p => ({
        ...p,
        lat: p.lat + (Math.random() - 0.5) * 0.005,
        lng: p.lng + (Math.random() - 0.5) * 0.005,
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredProviders = providers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === "available") return u.isOnline;
    if (activeFilter === "top-rated") return u.rating >= 4.5;
    return true;
  });

  const heatmapPoints = [
    { x: 45, y: 40, intensity: 0.9 }, { x: 55, y: 50, intensity: 0.7 },
    { x: 30, y: 60, intensity: 0.5 }, { x: 70, y: 35, intensity: 0.6 },
    { x: 50, y: 55, intensity: 0.8 }, { x: 35, y: 45, intensity: 0.4 },
    { x: 60, y: 65, intensity: 0.5 }, { x: 40, y: 30, intensity: 0.3 },
  ];

  return (
    <div className="relative h-[calc(100vh-var(--nav-h))] overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-muted">
        <div className="relative w-full h-full" style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)",
          transform: `scale(${zoom})`,
          transition: "transform 0.3s ease"
        }}>
          {/* Grid */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={`h${i}`} className="absolute w-full border-t border-foreground/10" style={{ top: `${(i + 1) * 5}%` }} />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={`v${i}`} className="absolute h-full border-l border-foreground/10" style={{ left: `${(i + 1) * 5}%` }} />
            ))}
          </div>

          {/* Heatmap overlay */}
          {showHeatmap && heatmapPoints.map((p, i) => (
            <HeatmapDot key={i} x={p.x} y={p.y} intensity={p.intensity} />
          ))}

          {/* Provider pins */}
          {filteredProviders.map(user => (
            <ProviderPin key={user.id} user={user} onClick={() => setSelectedUser(user)} />
          ))}

          {/* User location pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-5 h-5 rounded-full bg-primary redbee-glow animate-pulse" />
            <div className="absolute -inset-4 rounded-full bg-primary/10 animate-ping" />
          </div>

          {/* Area labels */}
          <div className="absolute left-[20%] top-[25%] text-[10px] text-muted-foreground/50 font-medium">Ruiru</div>
          <div className="absolute left-[65%] top-[30%] text-[10px] text-muted-foreground/50 font-medium">Thika</div>
          <div className="absolute left-[40%] top-[60%] text-[10px] text-muted-foreground/50 font-medium">Westlands</div>
          <div className="absolute left-[55%] top-[70%] text-[10px] text-muted-foreground/50 font-medium">Kilimani</div>
          <div className="absolute left-[30%] top-[75%] text-[10px] text-muted-foreground/50 font-medium">Karen</div>
          <div className="absolute left-[70%] top-[55%] text-[10px] text-muted-foreground/50 font-medium">Kasarani</div>
        </div>
      </div>

      {/* Search Panel */}
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

          {/* Service type icons */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border">
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Building className="w-4 h-4" />
              <span className="text-[9px]">Agency</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Hotel className="w-4 h-4" />
              <span className="text-[9px]">Hotel</span>
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button onClick={() => setShowSchedule(!showSchedule)}
                className="p-1.5 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
              <button onClick={() => setShowHeatmap(!showHeatmap)}
                className={`p-1.5 rounded-lg transition-colors ${showHeatmap ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:text-primary"}`}>
                <Thermometer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule panel */}
        {showSchedule && (
          <div className="bg-card rounded-xl border border-border shadow-xl p-3">
            <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> Schedule Booking</h4>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-muted-foreground mb-1 block">Date</label>
                <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)}
                  className="w-full bg-muted rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-muted-foreground mb-1 block">Time</label>
                <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)}
                  className="w-full bg-muted rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 py-1.5 rounded-lg redbee-gradient-bg text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" /> Book Now
              </button>
              <button className="flex-1 py-1.5 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-accent flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" /> Book Later
              </button>
            </div>
          </div>
        )}

        {/* Quick filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveFilter(activeFilter === "popular" ? null : "popular")}
            className={`shrink-0 px-3 py-1.5 rounded-full bg-card border text-xs font-medium flex items-center gap-1 transition-colors ${activeFilter === "popular" ? "border-primary text-primary" : "border-border text-foreground hover:border-primary"}`}>
            <Flame className="w-3 h-3 text-primary" /> Popular near you
          </button>
          <button onClick={() => setActiveFilter(activeFilter === "top-rated" ? null : "top-rated")}
            className={`shrink-0 px-3 py-1.5 rounded-full bg-card border text-xs font-medium flex items-center gap-1 transition-colors ${activeFilter === "top-rated" ? "border-primary text-primary" : "border-border text-foreground hover:border-primary"}`}>
            <Star className="w-3 h-3 text-secondary" /> Top rated
          </button>
          <button onClick={() => setActiveFilter(activeFilter === "available" ? null : "available")}
            className={`shrink-0 px-3 py-1.5 rounded-full bg-card border text-xs font-medium flex items-center gap-1 transition-colors ${activeFilter === "available" ? "border-primary text-primary" : "border-border text-foreground hover:border-primary"}`}>
            <Clock className="w-3 h-3" /> Available now
          </button>
          <button onClick={() => setFilterOpen(!filterOpen)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground hover:border-primary flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filters
          </button>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="bg-card rounded-xl border border-border shadow-xl p-3 space-y-3">
            <h4 className="text-xs font-semibold text-foreground">Advanced Filters</h4>
            <div>
              <label className="text-[10px] text-muted-foreground mb-1 block">Radius (km)</label>
              <input type="range" min="1" max="50" defaultValue="10" className="w-full accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground"><span>1km</span><span>50km</span></div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground mb-1 block">Price Range (KES)</label>
              <div className="flex gap-2">
                <input placeholder="Min" className="flex-1 bg-muted rounded px-2 py-1 text-xs text-foreground" />
                <input placeholder="Max" className="flex-1 bg-muted rounded px-2 py-1 text-xs text-foreground" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[3, 3.5, 4, 4.5, 5].map(r => (
                  <button key={r} className="px-2 py-1 rounded bg-muted text-[10px] text-foreground hover:bg-primary/10 hover:text-primary">{r}+</button>
                ))}
              </div>
            </div>
            <button className="w-full py-1.5 rounded-lg redbee-gradient-bg text-primary-foreground text-xs font-semibold">Apply Filters</button>
          </div>
        )}

        {/* Nearby suggestions */}
        <div className="bg-card rounded-xl border border-border shadow-xl max-h-64 overflow-y-auto">
          <div className="p-3 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1"><Users className="w-3 h-3 text-primary" /> Near You</span>
            <span className="text-[10px] text-muted-foreground">{nearbyUsers.length} found</span>
          </div>
          {nearbyUsers.map(user => (
            <ProfileHoverCard key={user.id} user={user}>
              <button onClick={() => setSelectedUser(user)}
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
                  <span className="text-[10px] text-muted-foreground">{user.location.split(" ")[0]}</span>
                </div>
              </button>
            </ProfileHoverCard>
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
                </div>
              </div>
            </div>

            {/* ETA & Price */}
            <div className="flex items-center gap-3 mb-3 p-2.5 rounded-lg bg-muted/50">
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Route className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{(Math.random() * 8 + 1).toFixed(1)}km</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Distance</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-1 text-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold">~{Math.floor(Math.random() * 30) + 5}min</span>
                </div>
                <span className="text-[10px] text-muted-foreground">ETA</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-1 text-secondary">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">KES {(Math.floor(Math.random() * 5) + 1) * 1000}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Est. Price</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground mr-auto">{selectedUser.phone}</span>
              <a href={`tel:${selectedUser.phone.replace(/\s/g, "")}`} className="contact-btn bg-primary/10 text-primary"><Phone className="w-3 h-3" /></a>
              <a href={`https://wa.me/${selectedUser.phone.replace(/[\s+]/g, "")}`} target="_blank" rel="noreferrer" className="contact-btn bg-green-500/10 text-green-400"><MessageSquare className="w-3 h-3" /></a>
              <button className="contact-btn bg-blue-500/10 text-blue-400"><Video className="w-3 h-3" /></button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => navigate("provider-page", { userId: selectedUser.id })}
                className="flex-1 py-2 rounded-lg redbee-gradient-bg text-primary-foreground text-sm font-semibold">
                View Profile
              </button>
              <button onClick={() => navigate("messenger", { chatWith: selectedUser.id })}
                className="flex-1 py-2 rounded-lg bg-muted text-foreground text-sm font-semibold hover:bg-accent">
                DM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-accent text-lg font-bold">+</button>
        <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-accent text-lg font-bold">−</button>
        <button onClick={() => setShowHeatmap(!showHeatmap)}
          className={`w-10 h-10 rounded-lg bg-card border shadow-lg flex items-center justify-center hover:bg-accent ${showHeatmap ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
          <Layers className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 md:bottom-4 right-4 z-30">
        <div className="bg-card rounded-lg border border-border shadow-lg p-2 text-[10px] space-y-1">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full status-online" /> Online</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full status-away" /> Away</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full status-offline" /> Offline</div>
          {showHeatmap && <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary/50" /> High demand</div>}
        </div>
      </div>
    </div>
  );
}
