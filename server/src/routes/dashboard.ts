import { Router } from "express";
import { computeStatus } from "../lib/prepStatus.js";
import type { LifecycleStatus } from "../lib/prepStatus.js";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", async (req, res) => {
  const { data, error } = await req.supabase
    .from("preps")
    .select("expires_at, lifecycle_status")
    .eq("lifecycle_status", "active");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const summary = { expired: 0, expiresToday: 0, expiresSoon: 0, valid: 0 };

  for (const row of data as { expires_at: string; lifecycle_status: LifecycleStatus }[]) {
    const { status } = computeStatus({ lifecycleStatus: row.lifecycle_status, expiresAt: row.expires_at });

    if (status === "expired") summary.expired += 1;
    else if (status === "expires_today") summary.expiresToday += 1;
    else if (status === "expires_soon") summary.expiresSoon += 1;
    else if (status === "valid") summary.valid += 1;
  }

  res.json(summary);
});
