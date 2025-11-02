"use client";
import { useEffect, useState } from "react";

type Prospect = { id: string; name: string; phone: string; service: string; city: string; };

export default function FindLeadPage() {
  const [items, setItems] = useState<Prospect[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/find-lead");
      setItems(await res.json());
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Find a Lead</h1>
      <p className="text-gray-600">Pre-filtered local job requests (demo data).</p>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(i => (
          <div key={i.id} className="rounded-lg border bg-white p-4">
            <div className="font-medium">{i.name}</div>
            <div className="text-sm text-gray-600">{i.service} • {i.city}</div>
            <div className="mt-2 text-sm">{i.phone}</div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-md border px-3 py-1">Call</button>
              <button className="rounded-md border px-3 py-1">Text</button>
              <button className="rounded-md border px-3 py-1">Save Lead</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-gray-500">No prospects yet.</div>
        )}
      </div>
    </div>
  );
}
