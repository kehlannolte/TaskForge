"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600 }}>Page error</h2>
      <pre style={{ whiteSpace: "pre-wrap", color: "#991b1b", background: "#fee2e2", padding: 12, borderRadius: 8 }}>
        {error?.message || "Unknown error"}
      </pre>
      <button
        onClick={reset}
        style={{ marginTop: 16, padding: "8px 12px", borderRadius: 8, border: "1px solid #000" }}
      >
        Retry
      </button>
    </div>
  );
}
