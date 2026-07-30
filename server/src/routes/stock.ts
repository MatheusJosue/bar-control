import { Router } from "express";
import { z } from "zod";
import { toStockItemResponse, type StockItemRow } from "../lib/mapStock.js";

export const stockRouter = Router();

const createStockItemSchema = z.object({
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  currentQuantity: z.coerce.number().min(0),
  minimumQuantity: z.coerce.number().min(0),
});

const adjustQuantitySchema = z.object({
  delta: z.coerce.number(),
});

stockRouter.get("/", async (req, res) => {
  const { data, error } = await req.supabase
    .from("stock_items")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json((data as StockItemRow[]).map(toStockItemResponse));
});

stockRouter.post("/", async (req, res) => {
  const parsed = createStockItemSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { name, category, unit, currentQuantity, minimumQuantity } = parsed.data;

  const { data, error } = await req.supabase
    .from("stock_items")
    .insert({
      name,
      category,
      unit,
      current_quantity: currentQuantity,
      minimum_quantity: minimumQuantity,
    })
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(toStockItemResponse(data as StockItemRow));
});

stockRouter.patch("/:id/quantity", async (req, res) => {
  const parsed = adjustQuantitySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { data: current, error: fetchError } = await req.supabase
    .from("stock_items")
    .select("current_quantity")
    .eq("id", req.params.id)
    .single();

  if (fetchError || !current) {
    res.status(404).json({ error: "Item nao encontrado" });
    return;
  }

  const nextQuantity = Math.max(0, Number(current.current_quantity) + parsed.data.delta);

  const { data, error } = await req.supabase
    .from("stock_items")
    .update({ current_quantity: nextQuantity })
    .eq("id", req.params.id)
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(toStockItemResponse(data as StockItemRow));
});
