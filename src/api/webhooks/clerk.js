import { Webhook } from "svix";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const config = {
  api: {
    bodyParser: false, // Disable automatic parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const rawBody = await new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });

  const headers = req.headers;
  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(rawBody, headers);
    console.log("✅ Webhook verified:", evt.type);
  } catch (err) {
    console.error("❌ Signature verification failed:", err);
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
      console.error("❌ Role update failed:", err);
    }
  }

  return res.json({ success: true });
}
