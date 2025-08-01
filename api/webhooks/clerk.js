import { Webhook } from "svix";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  console.log("📩 Webhook request received");

  if (!process.env.CLERK_SECRET_KEY) {
    console.error("❌ Missing CLERK_SECRET_KEY");
    return res
      .status(400)
      .json({ error: "Missing Clerk Secret Key or API Key" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const rawBody = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });

  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(rawBody, req.headers);
    console.log("✅ Webhook verified:", evt.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (evt.type === "user.created") {
    const { id } = evt.data;
    console.log("🛠 Updating role for:", id);

    try {
      await clerkClient.users.updateUser(id, {
        publicMetadata: { role: "member" },
      });
      console.log("✅ Role updated successfully");
    } catch (err) {
      console.error("❌ Role update failed:", err.message);
    }
  }

  return res.json({ success: true });
}
