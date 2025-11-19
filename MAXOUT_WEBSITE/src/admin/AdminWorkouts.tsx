import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authedGet, authedPost, authedDelete } from "../lib/api";

export default function AdminWorkouts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function loadWorkouts(p = page, s = search) {
    setLoading(true);
    try {
      const data = await authedGet(
        `/admin/workouts?search=${encodeURIComponent(s)}&page=${p}&pageSize=10`
      );
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function handleAdd() {
    if (!title.trim() || !details.trim()) {
      alert("Please fill in title and details");
      return;
    }
    try {
      await authedPost("/admin/workouts", { title, details, imageUrl });
      setTitle("");
      setDetails("");
      setImageUrl("");
      loadWorkouts();
    } catch (err) {
      alert("❌ Failed to add workout");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await authedDelete(`/admin/workouts/${id}`);
      loadWorkouts();
    } catch (err) {
      alert("❌ Failed to delete workout");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Workouts</h1>

      {/* Add Workout Form */}
      <div className="space-y-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Workout title"
          className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
        />
        <input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Workout details"
          className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-brand text-white rounded hover:bg-pink-600"
        >
          ➕ Add Workout
        </button>
      </div>

      {/* Search */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workouts..."
          className="flex-1 px-3 py-2 rounded bg-zinc-800 text-white"
        />
        <button
          onClick={() => loadWorkouts(1, search)}
          className="px-4 py-2 bg-brand text-white rounded hover:bg-pink-600"
        >
          Search
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-400">No workouts found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((w) => (
            <div
              key={w._id}
              className="bg-zinc-900 border border-gray-800 p-4 rounded-lg"
            >
              <p className="font-semibold">{w.title}</p>
              <p className="text-sm text-gray-400">{w.details}</p>
              {w.imageUrl && (
                <img
                  src={w.imageUrl}
                  alt={w.title}
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => handleDelete(w._id)}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => loadWorkouts(page - 1, search)}
              className="px-3 py-1 bg-zinc-800 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => loadWorkouts(page + 1, search)}
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
