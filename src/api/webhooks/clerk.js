import { Webhook } from "svix";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), headers);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (evt.type === "user.created") {
    const { id } = evt.data;

    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: "member" }, // Default role
    });
  }

  return res.json({ success: true });
}
