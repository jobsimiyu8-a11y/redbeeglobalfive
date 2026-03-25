import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useView } from "@/lib/view-context";
import {
  User, Bell, Shield, Eye, Globe, Palette, LogOut, ChevronRight, Moon, Sun,
  Lock, Mail, MapPin, Camera, Trash2, HelpCircle, Info, CreditCard, Users, Volume2,
  Gift, Languages, Wifi, Share2, Download, FileText, Flag, Heart, Smartphone, Database, Key
} from "lucide-react";

export default function SettingsView() {
  const { user, logout, updateProfile } = useAuth();
  const { navigate } = useView();
  const [activeSection, setActiveSection] = useState("general");

  const sections = [
    { id: "general", label: "General", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "account", label: "Account", icon: Lock },
    { id: "billing", label: "Billing & Premium", icon: CreditCard },
    { id: "language", label: "Language & Region", icon: Languages },
    { id: "data", label: "Data & Storage", icon: Database },
    { id: "devices", label: "Devices & Sessions", icon: Smartphone },
    { id: "gifts", label: "Gifts & Rewards", icon: Gift },
    { id: "referral", label: "Refer & Earn", icon: Share2 },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "about", label: "About RedBee", icon: Info },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 md:pb-8">
      <h1 className="font-display text-2xl font-bold text-foreground mt-4 mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="redbee-card p-2 space-y-0.5 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}>
                <s.icon className="w-4 h-4" />
                <span>{s.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-40" />
              </button>
            ))}
            <hr className="border-border my-2" />
            <button onClick={() => { logout(); navigate("login"); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === "general" && (
            <div className="space-y-4">
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Display Name</label>
                    <input defaultValue={user?.displayName} className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Username</label>
                    <input defaultValue={`@${user?.username}`} className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Bio</label>
                    <textarea defaultValue={user?.bio} rows={3} className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                    <input defaultValue={user?.email} type="email" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Location</label>
                    <input defaultValue="Nairobi CBD" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Latitude</label>
                      <input defaultValue="-1.2921" type="number" step="0.0001" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Longitude</label>
                      <input defaultValue="36.8219" type="number" step="0.0001" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-full redbee-gradient-bg text-primary-foreground text-sm font-semibold">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Notification Preferences</h3>
              {[
                { label: "Push Notifications", desc: "Receive push notifications on your device" },
                { label: "Email Notifications", desc: "Get email updates about activity" },
                { label: "New Messages", desc: "Notify when you receive a new DM" },
                { label: "Booking Updates", desc: "Notify about booking changes" },
                { label: "New Followers", desc: "Notify when someone follows you" },
                { label: "Promotional", desc: "Receive promotional content and offers" },
                { label: "Sound", desc: "Play sounds for notifications" },
                { label: "Nearby Providers", desc: "Alert when new providers are near you" },
                { label: "Price Drops", desc: "Notify about service discounts" },
                { label: "Review Reminders", desc: "Remind to review completed bookings" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-primary/20 relative transition-colors">
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Privacy & Security</h3>
              {[
                { label: "Profile Visibility", desc: "Who can see your profile", value: "Everyone" },
                { label: "Online Status", desc: "Show when you're active", value: "Visible" },
                { label: "Phone Number", desc: "Who can see your phone number", value: "Verified users only" },
                { label: "Location Sharing", desc: "Share your location on the map", value: "While using app" },
                { label: "Message Requests", desc: "Who can send you DMs", value: "Everyone" },
                { label: "Two-Factor Auth", desc: "Add extra security to your account", value: "Disabled" },
                { label: "Activity Status", desc: "Show last seen information", value: "Everyone" },
                { label: "Contact Info", desc: "Who can see your contact details", value: "Followers only" },
                { label: "Search Visibility", desc: "Appear in search results", value: "Enabled" },
                { label: "Data Sharing", desc: "Share usage data for improvements", value: "Enabled" },
                { label: "Block List", desc: "Manage blocked users", value: "0 blocked" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Appearance</h3>
              <div className="flex gap-3">
                <button className="flex-1 p-4 rounded-xl border-2 border-primary bg-primary/5 text-center">
                  <Moon className="w-6 h-6 mx-auto mb-2 text-foreground" />
                  <span className="text-sm font-medium text-foreground">Dark</span>
                </button>
                <button className="flex-1 p-4 rounded-xl border border-border text-center hover:border-muted-foreground">
                  <Sun className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Light</span>
                </button>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Font Size</label>
                <input type="range" min="12" max="20" defaultValue="14" className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Theme Color</label>
                <div className="flex gap-3">
                  {["hsl(0,80%,55%)", "hsl(220,80%,55%)", "hsl(142,70%,45%)", "hsl(280,80%,55%)", "hsl(35,90%,55%)"].map((c, i) => (
                    <button key={i} className={`w-8 h-8 rounded-full border-2 ${i === 0 ? "border-foreground" : "border-transparent"}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Card Style</label>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 rounded-xl border-2 border-primary bg-primary/5 text-center text-xs font-medium text-foreground">Glass</button>
                  <button className="flex-1 p-3 rounded-xl border border-border text-center text-xs font-medium text-muted-foreground">Solid</button>
                  <button className="flex-1 p-3 rounded-xl border border-border text-center text-xs font-medium text-muted-foreground">Minimal</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "account" && (
            <div className="space-y-4">
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Account Management</h3>
                <div className="space-y-3">
                  {[
                    { icon: Lock, label: "Change Password" },
                    { icon: Mail, label: "Change Email" },
                    { icon: Users, label: "Linked Accounts" },
                    { icon: Key, label: "API Keys" },
                    { icon: Download, label: "Download My Data" },
                    { icon: FileText, label: "Export Activity Log" },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent">
                      <div className="flex items-center gap-3"><item.icon className="w-4 h-4 text-muted-foreground" /> <span className="text-sm text-foreground">{item.label}</span></div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="redbee-card p-6 border-destructive/30">
                <h3 className="font-display font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-xs text-muted-foreground mb-3">These actions cannot be undone.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20">Deactivate Account</button>
                  <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="space-y-4">
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Billing & Subscription</h3>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                  <span className="text-xs text-primary font-semibold uppercase">Current Plan</span>
                  <h4 className="font-display text-lg font-bold text-foreground mt-1">Free Plan</h4>
                  <p className="text-xs text-muted-foreground mt-1">Upgrade for verified badge and premium features</p>
                  <button className="mt-3 px-4 py-2 rounded-full redbee-gradient-bg text-primary-foreground text-sm font-semibold">Upgrade to Premium – KES 1,000/mo</button>
                </div>
              </div>
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Premium Features</h3>
                <div className="space-y-2">
                  {[
                    "✅ Verified badge on your profile",
                    "✅ Priority in search results",
                    "✅ Direct Call Enabled badge",
                    "✅ Advanced analytics dashboard",
                    "✅ Unlimited DM to customers",
                    "✅ Profile boost (3x visibility)",
                    "✅ Custom branding themes",
                    "✅ Priority customer support",
                  ].map((f, i) => (
                    <p key={i} className="text-sm text-foreground">{f}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "language" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Language & Region</h3>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Language</label>
                <select className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                  <option>English</option><option>Swahili</option><option>French</option><option>Arabic</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Region</label>
                <select className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                  <option>Kenya</option><option>Uganda</option><option>Tanzania</option><option>Nigeria</option><option>South Africa</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Currency</label>
                <select className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                  <option>KES (Kenyan Shilling)</option><option>USD (US Dollar)</option><option>UGX (Ugandan Shilling)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Time Zone</label>
                <select className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                  <option>EAT (UTC+3)</option><option>WAT (UTC+1)</option><option>CAT (UTC+2)</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === "data" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Data & Storage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">Cache Size</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">24.5 MB</span>
                    <button className="text-xs text-primary font-medium hover:underline">Clear</button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">Auto-download Media</span>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Wi-Fi only</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">Save Original Photos</span>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Enabled</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">Offline Mode</span>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Enabled</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "devices" && (
            <div className="redbee-card p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Active Sessions</h3>
              {[
                { device: "Chrome on macOS", location: "Nairobi, KE", time: "Active now", current: true },
                { device: "Safari on iPhone", location: "Nairobi, KE", time: "2h ago", current: false },
                { device: "Firefox on Windows", location: "Mombasa, KE", time: "3d ago", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.device}</p>
                      <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                    </div>
                  </div>
                  {s.current ? (
                    <span className="text-xs text-primary font-medium">Current</span>
                  ) : (
                    <button className="text-xs text-destructive font-medium hover:underline">Revoke</button>
                  )}
                </div>
              ))}
              <button className="text-sm text-destructive font-medium hover:underline">Log out all other devices</button>
            </div>
          )}

          {activeSection === "gifts" && (
            <div className="space-y-4">
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-secondary" /> Gifts & Rewards</h3>
                <div className="p-4 rounded-xl redbee-gold text-center mb-4">
                  <p className="text-2xl font-bold text-background">250 Points</p>
                  <p className="text-xs text-background/70">Your current balance</p>
                </div>
                <div className="space-y-3">
                  {[
                    { reward: "Free Booking (up to KES 2,000)", points: 500 },
                    { reward: "Profile Boost (7 days)", points: 300 },
                    { reward: "Verified Badge (1 month)", points: 1000 },
                    { reward: "Premium Theme Pack", points: 150 },
                    { reward: "Priority Support (30 days)", points: 200 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-foreground">{r.reward}</span>
                      <button className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">{r.points} pts</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-3">How to Earn Points</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🎯 Complete a booking: +50 pts</p>
                  <p>⭐ Leave a review: +20 pts</p>
                  <p>👥 Refer a friend: +100 pts</p>
                  <p>📝 Post content: +10 pts</p>
                  <p>✅ Get verified: +200 pts</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "referral" && (
            <div className="redbee-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Share2 className="w-5 h-5 text-primary" /> Refer & Earn</h3>
              <p className="text-sm text-muted-foreground mb-4">Invite friends to RedBee and earn 100 points per referral!</p>
              <div className="p-4 bg-muted rounded-xl mb-4">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Your Referral Code</label>
                <div className="flex gap-2">
                  <input readOnly value="REDBEE-JD2026" className="flex-1 bg-card rounded-lg px-3 py-2 text-sm text-foreground font-mono" />
                  <button className="px-4 py-2 rounded-lg redbee-gradient-bg text-primary-foreground text-sm font-semibold">Copy</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-primary/5">
                  <p className="text-xl font-bold text-foreground">12</p>
                  <p className="text-[10px] text-muted-foreground">Invited</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/5">
                  <p className="text-xl font-bold text-foreground">8</p>
                  <p className="text-[10px] text-muted-foreground">Joined</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/5">
                  <p className="text-xl font-bold text-foreground">800</p>
                  <p className="text-[10px] text-muted-foreground">Points Earned</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "help" && (
            <div className="redbee-card p-6 space-y-3">
              <h3 className="font-display font-semibold text-foreground mb-4">Help & Support</h3>
              {["FAQ", "Contact Support", "Report a Bug", "Community Forum", "Terms of Service", "Privacy Policy", "Safety Center", "Accessibility", "Developer API Docs"].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent">
                  <span className="text-sm text-foreground">{item}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}

          {activeSection === "about" && (
            <div className="redbee-card p-6 text-center">
              <div className="w-16 h-16 rounded-2xl redbee-gradient-bg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-display font-bold text-2xl">RB</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">RedBee Platform</h3>
              <p className="text-sm text-muted-foreground mt-2">Version 2.0.0</p>
              <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
                RedBee is a social service marketplace connecting providers, agencies, and customers in real-time with location-aware discovery, seamless booking, and multi-channel communication.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button className="text-xs text-primary hover:underline">Rate Us ⭐</button>
                <button className="text-xs text-primary hover:underline">Share RedBee</button>
                <button className="text-xs text-primary hover:underline">Open Source</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
