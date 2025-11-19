import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAuth } from "firebase/auth";
import { API_URL } from "../lib/config";

export default function AdminChatLogDetail() {
  const { id } = useParams();
  const [log, setLog] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getAuth().currentUser?.getIdToken();
      const res = await fetch(`${API_URL}/admin/chatlogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setLog(await res.json());
    })();
  }, [id]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Chat log detail</h1>
      {!log ? <p className="text-gray-400">Loading…</p> : (
        <div className="space-y-2">
          {log.messages.map((m: any, idx: number) => (
            <div key={idx} className={`p-3 rounded-lg ${m.role === "user" ? "bg-zinc-800" : "bg-zinc-900 border border-gray-800"}`}>
              <p className="text-xs text-gray-500">{m.role} • {new Date(m.timestamp).toLocaleString()}</p>
              <p className="mt-1 text-gray-200">{m.text}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
