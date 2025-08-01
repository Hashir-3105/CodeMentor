import { Clerk } from "@clerk/clerk-sdk-node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

  try {
    const clerkUsers = await clerk.users.getUserList();

    const usersToInsert = clerkUsers.map((user) => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      first_name: user.firstName || "",
      last_name: user.lastName || "",
    }));

    await supabase.from("clerk_users").upsert(usersToInsert);

    return res.status(200).json({ message: "Users synced successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to sync users" });
  }
}
