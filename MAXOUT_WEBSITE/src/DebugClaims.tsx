// src/DebugClaims.tsx
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function DebugClaims() {
  const [claims, setClaims] = useState<any | null>(null);
  const [status, setStatus] = useState("Waiting for auth…");

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("No user logged in");
        setClaims(null);
        return;
      }
      setStatus("User detected, refreshing token…");
      try {
        await user.getIdToken(true);
        const r = await user.getIdTokenResult();
        setClaims(r.claims);
        setStatus("Claims loaded");
      } catch (e) {
        setStatus("Failed to load claims");
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Debug Claims</h1>
      <p className="mb-4 text-gray-400">{status}</p>
      <pre className="bg-zinc-900 p-4 rounded border border-gray-800">
        {JSON.stringify(claims, null, 2)}
      </pre>
    </div>
  );
}
