"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ fontFamily: "ui-sans-serif, system-ui", padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
        <pre style={{ whiteSpace: "pre-wrap", color: "#991b1b", background: "#fee2e2", padding: 12, borderRadius: 8 }}>
          {error?.message || "Unknown error"}
        </pre>
        <button
          onClick={reset}
          style={{ marginTop: 16, padding: "8px 12px", borderRadius: 8, border: "1px solid #000" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
