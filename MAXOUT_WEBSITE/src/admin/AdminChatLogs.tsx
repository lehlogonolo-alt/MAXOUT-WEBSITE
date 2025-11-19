import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authedGet, authedDelete } from "../lib/api";

export default function AdminChatLogs() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function loadLogs(p = page, s = search) {
    setLoading(true);
    try {
      const data = await authedGet(`/admin/chatlogs?search=${encodeURIComponent(s)}&page=${p}&pageSize=10`);
      setItems(data.items || data); // backend may return {items,totalPages} or just array
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this chat log?")) return;
    try {
      await authedDelete(`/admin/chatlogs/${id}`);
      loadLogs(); // reload after delete
    } catch (err) {
      alert("Failed to delete chat log");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Chat Logs</h1>

      {/* Search bar */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by session, user, or message..."
          className="flex-1 px-3 py-2 rounded bg-zinc-800 border border-gray-700 text-white focus:border-brand"
        />
        <button
          onClick={() => loadLogs(1, search)}
          className="px-4 py-2 bg-brand text-white rounded hover:bg-pink-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-400">No chat logs found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((c) => (
            <div
              key={c._id}
              className="bg-zinc-900 border border-gray-800 p-4 rounded-lg hover:border-brand"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Session: {c.sessionId || "N/A"}</p>
                  <p className="text-sm text-gray-400">User: {c.userId || "Anonymous"}</p>
                  <p className="text-sm text-gray-400">Messages: {c.messages?.length || 0}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    Preview: {c.messages?.[0]?.text || "No messages"}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-xs text-gray-500">
                    Updated: {new Date(c.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex space-x-2 justify-end">
                    <a
                      href={`/admin/chatlogs/${c._id}`}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => loadLogs(page - 1, search)}
              className="px-3 py-1 bg-zinc-800 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => loadLogs(page + 1, search)}
              className="px-3 py-1 bg-zinc-800 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}


