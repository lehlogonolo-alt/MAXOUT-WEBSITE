import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import pinkMaxoutLogo from "./images/pinkMaxoutLogo.png"; 

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // 🔑 Helper to redirect based on claims
  const redirectByRole = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await user.getIdToken(true); // force refresh
      const result = await user.getIdTokenResult();
      console.log("Claims:", result.claims);

      if (result.claims.role === "admin") {
        navigate("/admin/users"); // 🚀 admins go to admin panel
      } else {
        navigate("/dashboard");   // normal users go to dashboard
      }
    } catch (err) {
      console.error("Error fetching claims:", err);
      navigate("/dashboard"); // fallback
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await redirectByRole();
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await redirectByRole();
    } catch (error: any) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
      <Card className="w-full max-w-md bg-zinc-900 border border-gray-700 shadow-glow">
        <CardContent className="p-8">
          {/* ✅ Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={pinkMaxoutLogo}
              alt="MaxOut Logo"
              className="h-16 w-auto transition-all hover:drop-shadow-[0_0_12px_rgba(255,70,85,0.8)]"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6 text-brand">Login</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:border-brand focus:ring-2 focus:ring-brand outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:border-brand focus:ring-2 focus:ring-brand outline-none"
            />
            <Button
              onClick={login}
              className="w-full bg-brand hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-glow transition-all"
            >
              Login
            </Button>
            <Button
              onClick={googleLogin}
              variant="outline"
              className="w-full border border-brand text-brand hover:bg-brand/10 font-semibold py-3 rounded-lg transition-all"
            >
              Login with Google
            </Button>
          </div>
          <p className="mt-6 text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-brand hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;

