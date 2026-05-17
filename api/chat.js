export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "ANTHROPIC_API_KEY not set. Create .env.local with your key (or set it in Vercel env vars)." }));
    return;
  }

  let body = req.body;
  if (!body || typeof body === "string") {
    body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => {
        try { resolve(JSON.parse(data || "{}")); } catch (e) { reject(e); }
      });
      req.on("error", reject);
    });
  }

  const { messages, system } = body;

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: [
          { type: "text", text: system, cache_control: { type: "ephemeral" } },
        ],
        messages,
      }),
    });

    const data = await upstream.json();
    res.statusCode = upstream.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (e) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: e.message }));
  }
}
