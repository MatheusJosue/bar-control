import "dotenv/config";
import cors from "cors";
import express from "express";
import { requireAuth } from "./middleware/requireAuth.js";
import { prepsRouter } from "./routes/preps.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { alertsRouter } from "./routes/alerts.js";
import { stockRouter } from "./routes/stock.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "bar-control-server" });
});

app.use("/api/preps", requireAuth, prepsRouter);
app.use("/api/dashboard", requireAuth, dashboardRouter);
app.use("/api/alerts", requireAuth, alertsRouter);
app.use("/api/stock", requireAuth, stockRouter);

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`bar-control-server listening on http://localhost:${port}`);
});
