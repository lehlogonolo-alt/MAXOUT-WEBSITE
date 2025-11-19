import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authedGet, authedPatch, authedDelete } from "../lib/api";

export default function AdminReports() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // ✅ control how many per page

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await authedGet(
        `/admin/reports?search=${search}&page=${page}&pageSize=${pageSize}`
      );
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (id: string, status: "open" | "in_progress" | "resolved") => {
    try {
      await authedPatch(`/admin/reports/${id}`, { status });
      // ✅ Optimistic update
      setItems(prev => prev.map(i => (i._id === id ? { ...i, status } : i)));
    } catch (err) {
      console.error("Failed to update report:", err);
    }
  };

  const deleteReport = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await authedDelete(`/admin/reports/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error("Failed to delete report:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [search, page]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Bug Reports</h1>

      {/* ✅ Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by type, user, or message..."
          value={search}
          onChange={(e) => {
            setPage(1);
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
            {items.map(r => (
              <div key={r._id} className="bg-zinc-900 border border-gray-800 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Type: {r.type}</p>
                    <p className="text-sm text-gray-400">User: {r.userId || "Anonymous"}</p>
                    <p className="mt-2 text-gray-300">{r.message}</p>
                    {r.meta && (
                      <p className="text-xs text-gray-500 mt-2">
                        Meta: {JSON.stringify(r.meta)}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <span
                      className={`block px-2 py-1 rounded text-xs ${
                        r.status === "open"
                          ? "bg-brand"
                          : r.status === "in_progress"
                          ? "bg-yellow-600"
                          : "bg-zinc-700"
                      }`}
                    >
                      {r.status}
                    </span>
                    <div className="space-x-2">
                      <button
                        className="text-sm hover:text-brand"
                        onClick={() => setStatus(r._id, "in_progress")}
                      >
                        In progress
                      </button>
                      <button
                        className="text-sm hover:text-brand"
                        onClick={() => setStatus(r._id, "resolved")}
                      >
                        Resolved
                      </button>
                      <button
                        className="text-sm text-red-500 hover:text-red-700"
                        onClick={() => deleteReport(r._id)}
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
