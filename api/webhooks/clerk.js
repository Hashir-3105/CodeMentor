import { Webhook } from "svix";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  console.log("📩 Webhook request received");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log(
    "🔑 Webhook Secret:",
    process.env.CLERK_WEBHOOK_SECRET ? "Loaded" : "Missing"
  );

  const rawBody = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });

  console.log("📦 Raw body length:", rawBody.length);

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(rawBody, req.headers);
    console.log("✅ Webhook verified:", evt.type);

    if (evt.type === "user.created") {
      console.log("🛠 Updating role for:", evt.data.id);
      await clerkClient.users.updateUser(evt.data.id, {
        publicMetadata: { role: "member" },
      });
      console.log("✅ Role updated successfully");
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Webhook failed:", err.message);
    return res.status(400).json({ error: err.message });
  }
}
