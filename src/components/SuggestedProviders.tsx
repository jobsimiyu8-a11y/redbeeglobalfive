import { suggestedProviders, MockUser } from "@/lib/mock-data";
import { useView } from "@/lib/view-context";
import { BadgeCheck, Star, MapPin, Phone, MessageSquare, Video as VideoIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function ProviderCard({ user }: { user: MockUser }) {
  const { navigate } = useView();
  const [following, setFollowing] = useState(false);

  return (
    <div className="redbee-card p-3 min-w-[200px] max-w-[200px] shrink-0">
      <button onClick={() => navigate("provider-page", { userId: user.id })} className="block w-full text-left">
        <div className="relative mb-2">
          <img src={user.avatar} alt={user.name} className="w-full h-24 rounded-lg object-cover bg-muted" />
          {user.isOnline && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full status-online animate-pulse-dot" />
          )}
          {user.isVerified && (
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-full bg-card/80 backdrop-blur flex items-center gap-0.5">
              <BadgeCheck className="w-3 h-3 text-primary fill-primary/20" />
              <span className="text-[9px] text-foreground font-medium">Verified</span>
            </div>
          )}
        </div>
        <h4 className="text-sm font-semibold text-foreground truncate">{user.name}</h4>
        <p className="text-xs text-primary font-medium">{user.service}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-secondary fill-secondary" />{user.rating}</span>
          <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{user.location}</span>
        </div>
      </button>
      <div className="flex gap-1 mt-2">
        <button onClick={() => setFollowing(!following)}
          className={`flex-1 py-1 rounded-md text-[10px] font-semibold transition-all ${following ? "bg-muted text-foreground" : "redbee-gradient-bg text-primary-foreground"}`}>
          {following ? "Following" : "Follow"}
        </button>
        <button className="p-1 rounded-md bg-muted hover:bg-accent"><Phone className="w-3 h-3 text-muted-foreground" /></button>
        <button className="p-1 rounded-md bg-muted hover:bg-accent"><MessageSquare className="w-3 h-3 text-green-400" /></button>
        <button className="p-1 rounded-md bg-muted hover:bg-accent"><VideoIcon className="w-3 h-3 text-blue-400" /></button>
      </div>
    </div>
  );
}

export default function SuggestedProviders() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [providers, setProviders] = useState(suggestedProviders);

  // Rotate providers every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProviders(prev => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="redbee-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-sm text-foreground">Suggested Providers</h3>
        <span className="text-xs text-muted-foreground">{providers.length} near you</span>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {providers.map(user => (
          <ProviderCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
