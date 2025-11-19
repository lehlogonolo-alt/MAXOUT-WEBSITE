import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  UserCredential,
  User
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import pinkMaxoutLogo from "./images/pinkMaxoutLogo.png"; // ✅ logo import

function SignupPage() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user: User = userCredential.user;

      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(db, "users", user.uid), { uid: user.uid, fullName, email });

      navigate("/dashboard");
    } catch (error: any) {
      alert("Signup failed: " + error.message);
    }
  };

  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email
      });

      navigate("/dashboard");
    } catch (error: any) {
      alert("Google signup failed: " + error.message);
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


          <h2 className="text-3xl font-bold text-center mb-6 text-brand">Sign Up</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:border-brand focus:ring-2 focus:ring-brand outline-none"
            />
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
              onClick={signup}
              className="w-full bg-brand hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-glow transition-all"
            >
              Sign Up
            </Button>
            <Button
              onClick={googleSignup}
              variant="outline"
              className="w-full border border-brand text-brand hover:bg-brand/10 font-semibold py-3 rounded-lg transition-all"
            >
              Sign Up with Google
            </Button>
          </div>
          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-brand hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;



