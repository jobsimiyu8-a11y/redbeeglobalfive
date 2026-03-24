import { useState } from "react";
import { TrendingUp, Users, Calendar, Star, Eye, DollarSign, ArrowUp, ArrowDown, BarChart3, Activity, Target, Bell } from "lucide-react";

const stats = [
  { label: "Total Views", value: "12,847", change: "+14%", up: true, icon: Eye },
  { label: "Followers", value: "2,341", change: "+8%", up: true, icon: Users },
  { label: "Bookings", value: "156", change: "+22%", up: true, icon: Calendar },
  { label: "Rating", value: "4.8", change: "+0.2", up: true, icon: Star },
  { label: "Revenue", value: "KES 245K", change: "-3%", up: false, icon: DollarSign },
  { label: "Engagement", value: "67%", change: "+5%", up: true, icon: Activity },
];

export default function DashboardView() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex bg-muted rounded-lg p-0.5">
          {(["week", "month", "year"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all capitalize ${period === p ? "redbee-gradient-bg text-primary-foreground" : "text-muted-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stats.map(stat => (
          <div key={stat.label} className="redbee-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-online" : "text-destructive"}`}>
                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="redbee-card p-6 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Performance Overview</h3>
        <div className="h-48 flex items-end gap-2">
          {Array.from({ length: 12 }, (_, i) => {
            const height = 30 + Math.random() * 70;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md redbee-gradient-bg transition-all" style={{ height: `${height}%` }} />
                <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="redbee-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Recent Activity</h3>
        <div className="space-y-3">
          {[
            { text: "New booking from Grace Wanjiku", time: "2h ago", icon: Calendar },
            { text: "5-star review received", time: "5h ago", icon: Star },
            { text: "Profile viewed 47 times today", time: "8h ago", icon: Eye },
            { text: "New follower: David Ochieng", time: "12h ago", icon: Users },
            { text: "Revenue milestone: KES 200K", time: "1d ago", icon: Target },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="flex-1 text-sm text-foreground">{item.text}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
