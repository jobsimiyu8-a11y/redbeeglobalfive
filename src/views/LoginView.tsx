import { useState } from "react";
import { useView } from "@/lib/view-context";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginView() {
  const { navigate } = useView();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login(email, password);
    navigate("feed");
  };

  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center justify-center px-4 pb-20 md:pb-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl redbee-gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-display font-bold text-xl">RB</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your RedBee account</p>
        </div>

        <div className="redbee-card p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@email.com" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full bg-muted rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" /> Remember me
            </label>
            <button className="text-primary hover:underline text-sm">Forgot password?</button>
          </div>
          <button onClick={handleLogin}
            className="w-full py-3 rounded-full redbee-gradient-bg text-primary-foreground font-semibold">
            Sign In
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button onClick={() => navigate("register")} className="text-primary font-semibold hover:underline">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
