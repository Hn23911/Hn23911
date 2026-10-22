export async function GET() {
  return new Response(
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
      <rect width="300" height="100" fill="pink"/>
      <text x="20" y="55" font-size="30">
        Hello Hn23911
      </text>
    </svg>
    `,
    {
      headers: {
        "Content-Type": "image/svg+xml"
      }
    }
  );
}