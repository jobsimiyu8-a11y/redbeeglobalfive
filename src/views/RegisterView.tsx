import { useState } from "react";
import { useView } from "@/lib/view-context";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, ArrowLeft, Mail, User, Lock, MapPin } from "lucide-react";

export default function RegisterView() {
  const { navigate } = useView();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"user" | "provider" | "agency">("user");
  const [formData, setFormData] = useState({ displayName: "", email: "", username: "", password: "", location: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    register({ ...formData, role } as any);
    navigate("feed");
  };

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center justify-center px-4 pb-20 md:pb-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl redbee-gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-display font-bold text-xl">RB</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Join RedBee</h1>
          <p className="text-sm text-muted-foreground mt-1">Create your free account</p>
        </div>

        <div className="redbee-card p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Choose your account type:</h3>
              {(["user", "provider", "agency"] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${role === r ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"}`}>
                  <span className="text-sm font-semibold text-foreground capitalize">{r === "user" ? "👤 Regular User (Free)" : r === "provider" ? "🔧 Service Provider" : "🏢 Agency"}</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {r === "user" ? "Browse and book services, connect with providers" :
                     r === "provider" ? "Offer services, get bookings, grow your business" :
                     "Manage multiple providers, team dashboard"}
                  </p>
                </button>
              ))}
              <button onClick={() => setStep(2)}
                className="w-full py-3 rounded-full redbee-gradient-bg text-primary-foreground font-semibold mt-4">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={formData.displayName} onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">@</span>
                  <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-muted rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="username" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email"
                    className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-muted rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="City or area" />
                </div>
              </div>
              <button onClick={handleRegister}
                className="w-full py-3 rounded-full redbee-gradient-bg text-primary-foreground font-semibold">
                Create Account
              </button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <button onClick={() => navigate("login")} className="text-primary font-semibold hover:underline">Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}
