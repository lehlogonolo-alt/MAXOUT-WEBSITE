import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
import pinkMakoutLogo from "../images/pinkMaxoutLogo.png";

function Navbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-4 bg-zinc-950 border-b border-gray-800 flex justify-between items-center">
      {/* Branding / Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={pinkMakoutLogo} // ✅ use imported logo
          alt="MaxOut Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-2xl font-bold text-brand">MaxOut</span>
      </div>

      {userEmail ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand"
            onClick={() => setOpen(!open)}
          >
            {userEmail}
            <ChevronDown className="w-4 h-4" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-700 rounded-md shadow-lg z-50">
              <ul className="text-sm text-white">
                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={() => {navigate("/"); setOpen(false);}}>Home</li>
                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={() => {navigate("/dashboard"); setOpen(false);}}>Dashboard</li>
                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={() => {navigate("/nutrition"); setOpen(false);}}>Nutrition</li>
                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={() => {navigate("/about"); setOpen(false);}}>About</li>
                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer" onClick={() => {navigate("/contact"); setOpen(false);}}>Contact Us</li>
                <li
                  className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
                  onClick={async () => {
                    await auth.signOut();
                    setUserEmail(null);
                    setOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className="flex gap-8 text-sm font-medium">
          <li><a href="/" className="hover:text-brand transition-colors">Home</a></li>
          <li><a href="/login" className="hover:text-brand transition-colors">Login</a></li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="bg-brand text-white px-4 py-2 rounded-md font-semibold hover:bg-pink-600 transition-all"
            >
              Get Started
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;




