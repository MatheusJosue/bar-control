import { Router } from "express";
import { buildAlertMessage, computeStatus } from "../lib/prepStatus.js";
import type { PrepRow } from "../lib/mapPrep.js";

export const alertsRouter = Router();

alertsRouter.get("/", async (req, res) => {
  const { data, error } = await req.supabase
    .from("preps")
    .select("*")
    .eq("lifecycle_status", "active")
    .order("expires_at", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const alerts = (data as PrepRow[])
    .map((row) => {
      const { status, daysRemaining } = computeStatus({
        lifecycleStatus: row.lifecycle_status,
        expiresAt: row.expires_at,
      });

      return { row, status, daysRemaining };
    })
    .filter(({ status }) => status === "expired" || status === "expires_today" || status === "expires_soon")
    .map(({ row, status, daysRemaining }) => ({
      id: row.id,
      productName: row.name,
      message: buildAlertMessage(status, daysRemaining, row.expires_at),
      area: row.area,
      status,
      responsible: row.responsible,
    }));

  res.json(alerts);
});
