"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pet")
      .then((res) => res.text())
      .then((data) => setSvg(data));
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🐱 Pet Widget</h1>
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p>Loading assets...</p>
      )}
    </main> 
  );
}