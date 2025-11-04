"use client";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Something went wrong</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
        {error.stack && (
          <details>
            <summary>Stack</summary>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
          </details>
        )}
      </body>
    </html>
  );
}
