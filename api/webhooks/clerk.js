import { Webhook } from "svix";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const config = {
  api: { bodyParser: false }, // Required for Svix verification
};

export default async function handler(req, res) {
  console.log("📩 Webhook endpoint hit!", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  // Get raw body for signature verification
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

  // Handle user.created event
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
