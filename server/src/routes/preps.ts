import { Router } from "express";
import { z } from "zod";
import { addDaysIso } from "../lib/formatDate.js";
import { toPrepResponse, type PrepRow } from "../lib/mapPrep.js";

export const prepsRouter = Router();

const PREP_CATEGORIES = ["Syrup", "Puree", "Juice", "Garnish", "BatchCocktail", "Other"] as const;

const createPrepSchema = z.object({
  name: z.string().trim().min(1),
  category: z.enum(PREP_CATEGORIES),
  area: z.string().trim().min(1),
  responsible: z.string().trim().min(1),
  madeAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "madeAt must be YYYY-MM-DD"),
  validityDays: z.coerce.number().int().positive(),
  quantity: z.coerce.number().positive().optional(),
  unit: z.string().trim().min(1).optional(),
  notes: z.string().trim().optional(),
});

const updateStatusSchema = z.object({
  lifecycleStatus: z.enum(["active", "consumed", "discarded"]),
});

prepsRouter.get("/", async (req, res) => {
  const { data, error } = await req.supabase
    .from("preps")
    .select("*")
    .order("expires_at", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json((data as PrepRow[]).map(toPrepResponse));
});

prepsRouter.post("/", async (req, res) => {
  const parsed = createPrepSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { name, category, area, responsible, madeAt, validityDays, quantity, unit, notes } = parsed.data;
  const expiresAt = addDaysIso(madeAt, validityDays);

  const { data, error } = await req.supabase
    .from("preps")
    .insert({
      name,
      category,
      area,
      responsible,
      made_at: madeAt,
      expires_at: expiresAt,
      lifecycle_status: "active",
      quantity: quantity ?? null,
      unit: unit ?? null,
      notes: notes ?? null,
    })
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(toPrepResponse(data as PrepRow));
});

prepsRouter.patch("/:id/status", async (req, res) => {
  const parsed = updateStatusSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { data, error } = await req.supabase
    .from("preps")
    .update({ lifecycle_status: parsed.data.lifecycleStatus })
    .eq("id", req.params.id)
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(toPrepResponse(data as PrepRow));
});
