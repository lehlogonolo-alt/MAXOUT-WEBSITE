import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authedGet, authedPatch, authedDelete } from "../lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // ✅ control how many per page

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await authedGet(
        `/admin/messages?search=${search}&page=${page}&pageSize=${pageSize}`
      );
      setMessages(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await authedPatch(`/admin/messages/${id}`, { status });
      // ✅ Optimistic update
      setMessages(prev =>
        prev.map(m => (m._id === id ? { ...m, status } : m))
      );
    } catch (err) {
      console.error("Failed to update message:", err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await authedDelete(`/admin/messages/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search, page]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      {/* ✅ Centered search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
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
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m._id}
                className="bg-zinc-900 border border-gray-800 p-4 rounded-lg"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      {m.name} ({m.email})
                    </p>
                    <p className="text-sm text-gray-400">
                      Subject: {m.subject || "No subject"}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">{m.message}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-xs text-gray-500">
                      Created: {new Date(m.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Status: {m.status}</p>
                    <div className="space-x-2">
                      {m.status === "open" ? (
                        <button
                          onClick={() => updateStatus(m._id, "resolved")}
                          className="px-3 py-1 rounded bg-brand hover:bg-pink-600 text-white text-sm"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(m._id, "open")}
                          className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-sm"
                        >
                          Reopen
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(m._id)}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                      >
                        Delete
                      </button>
                    </div>
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



