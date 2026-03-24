import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useView } from "@/lib/view-context";
import {
  User, Bell, Shield, Eye, Globe, Palette, LogOut, ChevronRight, Moon, Sun,
  Lock, Mail, MapPin, Camera, Trash2, HelpCircle, Info, CreditCard, Users, Volume2
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
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "about", label: "About RedBee", icon: Info },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 md:pb-8">
      <h1 className="font-display text-2xl font-bold text-foreground mt-4 mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="redbee-card p-2 space-y-0.5">
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
            </div>
          )}

          {activeSection === "account" && (
            <div className="space-y-4">
              <div className="redbee-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Account Management</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent">
                    <div className="flex items-center gap-3"><Lock className="w-4 h-4 text-muted-foreground" /> <span className="text-sm text-foreground">Change Password</span></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent">
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /> <span className="text-sm text-foreground">Change Email</span></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent">
                    <div className="flex items-center gap-3"><Users className="w-4 h-4 text-muted-foreground" /> <span className="text-sm text-foreground">Linked Accounts</span></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
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
            <div className="redbee-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Billing & Subscription</h3>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                <span className="text-xs text-primary font-semibold uppercase">Current Plan</span>
                <h4 className="font-display text-lg font-bold text-foreground mt-1">Free Plan</h4>
                <p className="text-xs text-muted-foreground mt-1">Upgrade for verified badge and premium features</p>
                <button className="mt-3 px-4 py-2 rounded-full redbee-gradient-bg text-primary-foreground text-sm font-semibold">Upgrade to Premium</button>
              </div>
            </div>
          )}

          {activeSection === "help" && (
            <div className="redbee-card p-6 space-y-3">
              <h3 className="font-display font-semibold text-foreground mb-4">Help & Support</h3>
              {["FAQ", "Contact Support", "Report a Bug", "Community Forum", "Terms of Service", "Privacy Policy"].map((item, i) => (
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
              <p className="text-sm text-muted-foreground mt-2">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
                RedBee is a social service marketplace connecting providers, agencies, and customers in real-time with location-aware discovery and seamless booking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
