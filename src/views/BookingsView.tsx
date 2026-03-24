import { useState } from "react";
import { Calendar, Clock, MapPin, Star, Check, X, Filter, Plus } from "lucide-react";
import { allUsers } from "@/lib/mock-data";

interface Booking {
  id: string;
  provider: typeof allUsers[0];
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: string;
}

const mockBookings: Booking[] = allUsers.slice(0, 8).map((u, i) => ({
  id: `b${i}`,
  provider: u,
  service: u.service || "General Service",
  date: `Mar ${20 + i}, 2026`,
  time: `${9 + i}:00 AM`,
  status: i < 3 ? "upcoming" : i < 6 ? "completed" : "cancelled",
  price: `KES ${(Math.floor(Math.random() * 5) + 1) * 1000}`,
}));

export default function BookingsView() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const filtered = mockBookings.filter(b => b.status === activeTab);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="font-display text-2xl font-bold text-foreground">My Bookings</h1>
        <button className="px-4 py-2 rounded-full redbee-gradient-bg text-primary-foreground text-sm font-semibold flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="flex border-b border-border mb-6 overflow-x-auto scrollbar-hide">
        {(["upcoming", "completed", "cancelled"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "feed-tab feed-tab-active capitalize" : "feed-tab capitalize"}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
            No {activeTab} bookings.
          </div>
        )}
        {filtered.map(booking => (
          <div key={booking.id} className="redbee-card p-4">
            <div className="flex items-center gap-3">
              <img src={booking.provider.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{booking.provider.name}</h3>
                <p className="text-xs text-primary">{booking.service}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{booking.provider.location}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-foreground">{booking.price}</span>
                <div className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  booking.status === "upcoming" ? "bg-primary/10 text-primary" :
                  booking.status === "completed" ? "bg-online/10 text-online" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {booking.status}
                </div>
              </div>
            </div>
            {booking.status === "upcoming" && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 py-2 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-accent">Reschedule</button>
                <button className="flex-1 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20">Cancel</button>
              </div>
            )}
            {booking.status === "completed" && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 py-2 rounded-lg redbee-gradient-bg text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1"><Star className="w-3 h-3" /> Rate</button>
                <button className="flex-1 py-2 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-accent">Book Again</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
