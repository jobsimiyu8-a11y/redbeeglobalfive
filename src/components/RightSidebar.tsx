import { useState, useEffect } from "react";
import { allUsers, MockUser } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { BadgeCheck, Star, MapPin, Users, TrendingUp, Flame, Clock, RefreshCw } from "lucide-react";
import ProfileHoverCard from "./ProfileHoverCard";

function NearbyUserItem({ user }: { user: MockUser }) {
  const { navigate } = useView();
  return (
    <ProfileHoverCard user={user}>
      <button onClick={() => navigate("provider-page", { userId: user.id })}
        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left">
        <div className="relative shrink-0">
          <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
          {user.isOnline && <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full status-online border border-card" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-foreground truncate">{user.name}</span>
            {user.isVerified && <BadgeCheck className="w-3 h-3 text-primary fill-primary/20 shrink-0" />}
          </div>
          <p className="text-[10px] text-primary truncate">{user.service || "User"}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" /><span className="text-[10px]">{user.rating}</span></div>
          <span className="text-[10px] text-muted-foreground">{user.location.split(" ")[0]}</span>
        </div>
      </button>
    </ProfileHoverCard>
  );
}

export default function RightSidebar() {
  const [nearbyUsers, setNearbyUsers] = useState<MockUser[]>([]);
  const [trendingTopics] = useState([
    { tag: "#NairobiServices", posts: "2.4K" },
    { tag: "#RedBeeVerified", posts: "1.8K" },
    { tag: "#HomeRepairs", posts: "956" },
    { tag: "#TopProviders", posts: "743" },
    { tag: "#WeekendDeals", posts: "612" },
    { tag: "#NewOnRedBee", posts: "521" },
  ]);

  // Rotate nearby every 60s
  useEffect(() => {
    const shuffle = () => setNearbyUsers(allUsers.sort(() => Math.random() - 0.5).slice(0, 8));
    shuffle();
    const interval = setInterval(shuffle, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden xl:block w-72 shrink-0 sticky top-[var(--nav-h)] h-[calc(100vh-var(--nav-h))] overflow-y-auto scrollbar-hide pb-8 space-y-4 pt-4">
      {/* Trending */}
      <div className="redbee-card p-4">
        <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Trending on RedBee
        </h3>
        <div className="space-y-2.5">
          {trendingTopics.map((t, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary cursor-pointer hover:underline">{t.tag}</p>
                <p className="text-[10px] text-muted-foreground">{t.posts} posts</p>
              </div>
              <Flame className="w-3.5 h-3.5 text-secondary" />
            </div>
          ))}
        </div>
      </div>

      {/* Near You */}
      <div className="redbee-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Near You
          </h3>
          <button onClick={() => setNearbyUsers(allUsers.sort(() => Math.random() - 0.5).slice(0, 8))}>
            <RefreshCw className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
        <div className="space-y-0.5">
          {nearbyUsers.map(u => <NearbyUserItem key={u.id} user={u} />)}
        </div>
      </div>

      {/* Online now */}
      <div className="redbee-card p-4">
        <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Online Now
        </h3>
        <div className="flex flex-wrap gap-2">
          {allUsers.filter(u => u.isOnline).slice(0, 12).map(u => (
            <div key={u.id} className="relative" title={u.name}>
              <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-border cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full status-online border-2 border-card" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="px-2">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          <span className="cursor-pointer hover:text-primary">About</span> · <span className="cursor-pointer hover:text-primary">Careers</span> · <span className="cursor-pointer hover:text-primary">Developers</span> · <span className="cursor-pointer hover:text-primary">Advertise</span>
        </p>
      </div>
    </aside>
  );
}
