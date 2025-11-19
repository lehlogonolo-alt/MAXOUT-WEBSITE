import React, { ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AdminRoute({ children }: { children: ReactElement }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [claims, setClaims] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        setClaims(null);
        return;
      }

      try {
        // 🔑 Force refresh token
        await user.getIdToken(true);
        const result = await user.getIdTokenResult();
        console.log("Claims:", result.claims);
        setClaims(result.claims);
        setAllowed(result.claims.role === "admin");
      } catch (err) {
        console.error("Error fetching claims:", err);
        setAllowed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (allowed === null) {
    return <div className="p-6 text-gray-400">Checking access…</div>;
  }

  if (!allowed) {
    return (
      <div className="p-6 text-red-400">
        Access denied. Your claims:
        <pre className="mt-3 bg-zinc-900 p-4 rounded border border-gray-800 text-white">
          {JSON.stringify(claims, null, 2)}
        </pre>
      </div>
    );
  }

  return children;
}





