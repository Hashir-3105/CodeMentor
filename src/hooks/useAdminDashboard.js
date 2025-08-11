import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function useAdminDashboard() {
  const [requestCount, setRequestCount] = useState(0);
  const adminAsides = [
    { name: "Dashboard", redirect: "/admin/dashboard" },
    { name: "Requests", redirect: "/admin/management" },
    { name: "Test Catalog", redirect: "overview" },
  ];
  const fetchPendingCount = async () => {
    const { count } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .eq("status", "pending");

    if (count !== null) setRequestCount(count);
  };

  useEffect(() => {
    fetchPendingCount();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("contact-submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_submissions" },
        async (payload) => {
          console.log("INSERT EVENT /-/-/-/:", payload);
          if (payload.new.status === "pending") {
            await fetchPendingCount();
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "contact_submissions" },
        async (payload) => {
          console.log("UPDATE EVENT <><><><>:", payload);
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            await fetchPendingCount();
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return { adminAsides, requestCount };
}
