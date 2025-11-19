import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { authedGet } from "../lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [openMessages, setOpenMessages] = useState(0);
  const [openReports, setOpenReports] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // track menu open state

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    user.getIdToken(true).then(() =>
      user.getIdTokenResult().then((result) => {
        setIsAdmin(result.claims.role === "admin");
      })
    );

    // 🔎 Fetch unresolved messages count
    authedGet("/admin/messages")
      .then((msgs) => {
        const openCount = msgs.items
          ? msgs.items.filter((m: any) => m.status === "open").length
          : msgs.filter((m: any) => m.status === "open").length;
        setOpenMessages(openCount);
      })
      .catch((err) => console.error("Failed to fetch messages:", err));

    // 🔎 Fetch unresolved reports count
    authedGet("/admin/reports")
      .then((reports) => {
        const openCount = reports.items
          ? reports.items.filter((r: any) => r.status === "open").length
          : reports.filter((r: any) => r.status === "open").length;
        setOpenReports(openCount);
      })
      .catch((err) => console.error("Failed to fetch reports:", err));
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* ✅ Top Navbar */}
      <header className="flex items-center justify-between bg-zinc-900 border-b border-gray-800 px-6 py-3">
        <h1 className="text-xl font-bold text-brand">MaxOut</h1>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <span className="px-2 py-1 text-xs rounded bg-brand/20 text-brand font-semibold">
              Admin
            </span>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700"
            >
              ☰ Menu
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-700 rounded-lg shadow-lg">
                <Link to="/admin/users" className="block px-4 py-2 hover:bg-zinc-800">
                  👥 Users
                </Link>
                <Link
                  to="/admin/messages"
                  className="flex justify-between px-4 py-2 hover:bg-zinc-800"
                >
                  📩 Messages
                  {openMessages > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-600 text-white">
                      {openMessages}
                    </span>
                  )}
                </Link>
                <Link
                  to="/admin/reports"
                  className="flex justify-between px-4 py-2 hover:bg-zinc-800"
                >
                  🐞 Reports
                  {openReports > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-600 text-white">
                      {openReports}
                    </span>
                  )}
                </Link>
                <Link to="/admin/chatlogs" className="block px-4 py-2 hover:bg-zinc-800">
                  💬 Chat Logs
                </Link>
                {/* ➕ NEW Workouts link */}
                <Link to="/admin/workouts" className="block px-4 py-2 hover:bg-zinc-800">
                  🏋️ Workouts
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}



