import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authedGet } from "../lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 🔑 Backend should support ?search & ?page query params
      const data = await authedGet(`/admin/users?search=${search}&page=${page}`);
      setUsers(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {/* ✅ Centered, shorter search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by email or UID..."
          value={search}
          onChange={(e) => {
            setPage(1); // reset to first page when searching
            setSearch(e.target.value);
          }}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:border-brand focus:ring-2 focus:ring-brand outline-none"
        />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <>
          <div className="grid gap-4">
            {users.map((u) => (
              <div
                key={u.uid}
                className="bg-zinc-900 border border-gray-800 p-4 rounded-lg"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{u.email || "No email"}</p>
                    <p className="text-sm text-gray-400">UID: {u.uid}</p>
                    <p className="text-sm text-gray-400">Role: {u.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Created: {u.createdAt}</p>
                    <p className="text-xs text-gray-500">Last sign-in: {u.lastSignIn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Pagination controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-3 py-1 rounded ${
                page <= 1
                  ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white border border-gray-700"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-3 py-1 rounded ${
                page >= totalPages
                  ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white border border-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

