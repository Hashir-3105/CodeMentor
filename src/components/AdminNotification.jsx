import { useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";

export default function AdminNotification() {
  useEffect(() => {
    const channel = supabase
      .channel("contact-submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_submissions" },
        (payload) => {
          toast.info(`New contact submission from ${payload.new.full_name}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
